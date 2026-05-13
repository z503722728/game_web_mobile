/**
 * 纯色抠图算法
 * ----------------------------------------------------
 * 核心思路：
 *   1. 把目标背景色和每个像素都转换到 Lab 色空间
 *   2. 计算 Δ = ||lab_pixel - lab_bg||  (CIE76 距离，符合人眼感知)
 *   3. 当 Δ < tolerance - feather 时：完全透明
 *      Δ ≥ tolerance：完全保留
 *      之间：按距离做线性渐变 alpha (0..255)，用于边缘羽化
 *   4. （可选）spill 抑制：在保留区域内，把像素中"偏向背景色的分量"压制
 *      例如绿幕中：如果 G 通道 > max(R, B)，则 G = max(R, B)，去掉绿色反光
 *
 * 对外暴露：
 *   window.ColorKeyer.key(srcImageData, options) -> ImageData (新副本)
 *   window.ColorKeyer.rgbToLab([r,g,b]) -> [L, a, b]
 *   window.ColorKeyer.trimImageData(imageData, alphaThreshold?) -> { imageData, x, y, w, h }
 */
(function (global) {
    'use strict';

    /** sRGB -> Linear RGB */
    function srgbToLinear(c) {
        c /= 255;
        return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    }

    /** Linear RGB -> XYZ (D65) */
    function rgbToXyz(r, g, b) {
        const R = srgbToLinear(r);
        const G = srgbToLinear(g);
        const B = srgbToLinear(b);
        return [
            R * 0.4124 + G * 0.3576 + B * 0.1805,
            R * 0.2126 + G * 0.7152 + B * 0.0722,
            R * 0.0193 + G * 0.1192 + B * 0.9505
        ];
    }

    /** XYZ -> Lab (D65) */
    function xyzToLab(x, y, z) {
        // Reference white D65
        const Xn = 0.95047, Yn = 1.0, Zn = 1.08883;
        const f = (t) => t > 0.008856 ? Math.cbrt(t) : (7.787 * t + 16 / 18.92);
        const fx = f(x / Xn), fy = f(y / Yn), fz = f(z / Zn);
        return [
            116 * fy - 16,
            500 * (fx - fy),
            200 * (fy - fz)
        ];
    }

    function rgbToLab(rgb) {
        const xyz = rgbToXyz(rgb[0], rgb[1], rgb[2]);
        return xyzToLab(xyz[0], xyz[1], xyz[2]);
    }

    /**
     * 主抠图函数
     * @param {ImageData} src 源图 ImageData（不会修改）
     * @param {Object} options
     *   - bgColor: [r, g, b]   背景色（必填）
     *   - tolerance: number    容差（基于 Lab 空间，建议 5..50）
     *   - feather: number      羽化半径（Lab 距离单位，0..10）
     *   - despill: boolean     是否启用色溢出抑制
     * @returns {ImageData}     新建的 ImageData，alpha 已更新
     */
    function key(src, options) {
        const opts = Object.assign({
            bgColor: [0, 255, 0],
            tolerance: 30,
            feather: 1,
            despill: true
        }, options || {});

        const { width, height, data } = src;
        const out = new ImageData(width, height);
        const od = out.data;

        const bgLab = rgbToLab(opts.bgColor);
        const tol = opts.tolerance;
        const feather = Math.max(0, opts.feather);
        const fadeMin = Math.max(0, tol - feather);   // 距离 < fadeMin -> 完全透明
        const fadeMax = tol;                          // 距离 >= fadeMax -> 完全保留
        const fadeRange = Math.max(0.0001, fadeMax - fadeMin);

        const [bgR, bgG, bgB] = opts.bgColor;
        const bgIsGreen = bgG > bgR && bgG > bgB;
        const bgIsBlue = bgB > bgR && bgB > bgG;
        const bgIsRed = bgR > bgG && bgR > bgB;

        const len = width * height;
        for (let i = 0; i < len; i++) {
            const p = i * 4;
            const r = data[p], g = data[p + 1], b = data[p + 2], a = data[p + 3];

            // 完全透明像素直接复制
            if (a === 0) {
                od[p] = r; od[p + 1] = g; od[p + 2] = b; od[p + 3] = 0;
                continue;
            }

            // 计算 Lab 距离
            const lab = rgbToLab([r, g, b]);
            const dl = lab[0] - bgLab[0];
            const da = lab[1] - bgLab[1];
            const db = lab[2] - bgLab[2];
            const dist = Math.sqrt(dl * dl + da * da + db * db);

            // 计算新 alpha
            let newAlpha;
            if (dist <= fadeMin) newAlpha = 0;
            else if (dist >= fadeMax) newAlpha = a;
            else {
                const t = (dist - fadeMin) / fadeRange; // 0..1
                newAlpha = Math.round(a * t);
            }

            // 写入像素
            let nr = r, ng = g, nb = b;

            // Spill 抑制（保留下来的像素才需要处理）
            if (opts.despill && newAlpha > 0) {
                if (bgIsGreen) {
                    // 绿幕：把 G 限制到 max(R, B)
                    const cap = Math.max(nr, nb);
                    if (ng > cap) ng = cap;
                } else if (bgIsBlue) {
                    const cap = Math.max(nr, ng);
                    if (nb > cap) nb = cap;
                } else if (bgIsRed) {
                    const cap = Math.max(ng, nb);
                    if (nr > cap) nr = cap;
                }
            }

            od[p] = nr;
            od[p + 1] = ng;
            od[p + 2] = nb;
            od[p + 3] = newAlpha;
        }

        return out;
    }

    /**
     * 把 ImageData 透明边缘裁剪掉，返回更小的 ImageData + 偏移位置
     * @param {ImageData} src
     * @param {number} alphaThreshold 大于该值视为可见，默认 0
     * @returns {{ imageData: ImageData, x:number, y:number, w:number, h:number }}
     */
    function trimImageData(src, alphaThreshold = 0) {
        const { width, height, data } = src;
        let minX = width, minY = height, maxX = -1, maxY = -1;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const a = data[(y * width + x) * 4 + 3];
                if (a > alphaThreshold) {
                    if (x < minX) minX = x;
                    if (y < minY) minY = y;
                    if (x > maxX) maxX = x;
                    if (y > maxY) maxY = y;
                }
            }
        }
        if (maxX < 0) {
            // 全透明
            return { imageData: src, x: 0, y: 0, w: width, h: height };
        }
        const w = maxX - minX + 1;
        const h = maxY - minY + 1;
        const out = new ImageData(w, h);
        for (let y = 0; y < h; y++) {
            const srcOff = ((minY + y) * width + minX) * 4;
            const dstOff = (y * w) * 4;
            out.data.set(data.subarray(srcOff, srcOff + w * 4), dstOff);
        }
        return { imageData: out, x: minX, y: minY, w, h };
    }

    /** 从某个像素位置取色 */
    function pickColor(imageData, x, y) {
        const { width, height, data } = imageData;
        x = Math.max(0, Math.min(width - 1, x | 0));
        y = Math.max(0, Math.min(height - 1, y | 0));
        const p = (y * width + x) * 4;
        return [data[p], data[p + 1], data[p + 2], data[p + 3]];
    }

    /** 在 (x, y) 周围做一个 N×N 的均值采样（更稳定） */
    function pickColorAvg(imageData, x, y, radius = 2) {
        const { width, height, data } = imageData;
        let r = 0, g = 0, b = 0, count = 0;
        const x0 = Math.max(0, x - radius);
        const x1 = Math.min(width - 1, x + radius);
        const y0 = Math.max(0, y - radius);
        const y1 = Math.min(height - 1, y + radius);
        for (let yy = y0; yy <= y1; yy++) {
            for (let xx = x0; xx <= x1; xx++) {
                const p = (yy * width + xx) * 4;
                if (data[p + 3] === 0) continue;
                r += data[p];
                g += data[p + 1];
                b += data[p + 2];
                count++;
            }
        }
        if (!count) return pickColor(imageData, x, y);
        return [Math.round(r / count), Math.round(g / count), Math.round(b / count), 255];
    }

    /** rgb -> #rrggbb */
    function rgbToHex(rgb) {
        const h = (n) => n.toString(16).padStart(2, '0');
        return '#' + h(rgb[0]) + h(rgb[1]) + h(rgb[2]);
    }

    /** #rrggbb -> [r,g,b] */
    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
        const n = parseInt(hex, 16);
        return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
    }

    global.ColorKeyer = {
        key,
        trimImageData,
        pickColor,
        pickColorAvg,
        rgbToLab,
        rgbToHex,
        hexToRgb
    };
})(window);
