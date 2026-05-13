/**
 * 智能拆图核心算法
 * ----------------------------------------------------
 * 思路：
 *   1. 读取图像 ImageData（RGBA 数组）
 *   2. 基于 Alpha 通道（>= alphaThreshold 视为不透明）做连通域分析
 *   3. 使用迭代式 BFS（八邻域 / 四邻域可选），避免大图爆栈
 *   4. 记录每个连通域的包围盒（minX, minY, maxX, maxY）
 *   5. 过滤面积过小的连通域（基于 minRatio * 原图最长边）
 *   6. 把每个连通域裁剪成独立 PNG（保留原 alpha，可选 trim 透明边）
 *
 * 对外暴露：window.SmartSplitter.split(image, options) -> Promise<Array<{blob, dataUrl, width, height, index}>>
 */
(function (global) {
    'use strict';

    /**
     * 把 HTMLImageElement / Canvas 转 ImageData
     */
    function imageToImageData(image) {
        const w = image.naturalWidth || image.width;
        const h = image.naturalHeight || image.height;
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(image, 0, 0);
        return { imageData: ctx.getImageData(0, 0, w, h), canvas };
    }

    /**
     * 连通域分析（迭代 BFS，避免栈溢出）
     * @param imageData ImageData
     * @param alphaThreshold 0-255, 像素 alpha 大于此值视为前景
     * @param eightConn 是否使用八邻域
     * @returns Array<{minX, minY, maxX, maxY, area}>
     */
    function findConnectedComponents(imageData, alphaThreshold, eightConn) {
        const { width, height, data } = imageData;
        // 用 Uint8Array 标记访问过的像素，节省内存
        const visited = new Uint8Array(width * height);
        const components = [];

        // 邻居偏移
        const offsets = eightConn
            ? [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]
            : [[0, -1], [-1, 0], [1, 0], [0, 1]];

        // 队列复用，使用 Int32Array 存储扁平索引（y*w + x）
        const queue = new Int32Array(width * height);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const idx = y * width + x;
                if (visited[idx]) continue;
                const alpha = data[idx * 4 + 3];
                if (alpha <= alphaThreshold) {
                    visited[idx] = 1;
                    continue;
                }

                // 开始一个新的连通域
                let minX = x, minY = y, maxX = x, maxY = y, area = 0;
                let head = 0, tail = 0;
                queue[tail++] = idx;
                visited[idx] = 1;

                while (head < tail) {
                    const cur = queue[head++];
                    const cx = cur % width;
                    const cy = (cur - cx) / width;
                    area++;

                    if (cx < minX) minX = cx;
                    if (cy < minY) minY = cy;
                    if (cx > maxX) maxX = cx;
                    if (cy > maxY) maxY = cy;

                    for (let k = 0; k < offsets.length; k++) {
                        const nx = cx + offsets[k][0];
                        const ny = cy + offsets[k][1];
                        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
                        const nIdx = ny * width + nx;
                        if (visited[nIdx]) continue;
                        const nAlpha = data[nIdx * 4 + 3];
                        if (nAlpha <= alphaThreshold) {
                            visited[nIdx] = 1;
                            continue;
                        }
                        visited[nIdx] = 1;
                        queue[tail++] = nIdx;
                    }
                }

                components.push({ minX, minY, maxX, maxY, area });
            }
        }
        return components;
    }

    /**
     * 把指定区域裁剪为 PNG Blob（透明背景保留）
     */
    function cropToBlob(sourceCanvas, region, trimTransparent) {
        let { minX, minY, maxX, maxY } = region;
        const w = maxX - minX + 1;
        const h = maxY - minY + 1;

        const out = document.createElement('canvas');
        out.width = w;
        out.height = h;
        const octx = out.getContext('2d');
        octx.drawImage(sourceCanvas,
            minX, minY, w, h,
            0, 0, w, h
        );

        // 二次 trim（保险起见 - 一般包围盒已经是最紧的，此处可忽略，但留作防御）
        if (trimTransparent) {
            // 包围盒来自连通域，本身已紧凑。这里跳过二次 trim 节省时间。
        }

        return new Promise((resolve) => {
            out.toBlob((blob) => resolve({ blob, canvas: out, width: w, height: h }), 'image/png');
        });
    }

    /**
     * 主函数
     * @param {HTMLImageElement} image
     * @param {Object} options
     *  - minRatio: number  (0.001 - 0.1) 最小尺寸过滤比例（基于 max(width, height)）
     *  - alphaThreshold: number (0-50)  alpha 阈值
     *  - eightConn: boolean  是否使用八邻域
     *  - trimTransparent: boolean  是否切除透明边（包围盒已紧凑，此项主要用于将来扩展）
     *  - onProgress(stage, ratio): 进度回调
     */
    async function split(image, options) {
        const opts = Object.assign({
            minRatio: 0.005,
            alphaThreshold: 10,
            eightConn: true,
            trimTransparent: true,
            onProgress: null
        }, options || {});

        const report = (stage, r) => opts.onProgress && opts.onProgress(stage, r);

        report('reading', 0);
        const { imageData, canvas } = imageToImageData(image);

        report('analyzing', 0.1);
        // 让出主线程一帧，让 UI 更新
        await new Promise(r => setTimeout(r, 16));

        const components = findConnectedComponents(
            imageData,
            opts.alphaThreshold,
            opts.eightConn
        );

        report('filtering', 0.55);
        await new Promise(r => setTimeout(r, 16));

        const maxSide = Math.max(imageData.width, imageData.height);
        const minSize = Math.max(2, Math.floor(maxSide * opts.minRatio));

        // 过滤太小的，按面积或包围盒最大边衡量
        const filtered = components.filter(c => {
            const w = c.maxX - c.minX + 1;
            const h = c.maxY - c.minY + 1;
            return Math.max(w, h) >= minSize;
        });

        // 排序：按 y 主序、x 次序，让结果阅读顺序与图片自然一致
        filtered.sort((a, b) => {
            const cyA = (a.minY + a.maxY) / 2;
            const cyB = (b.minY + b.maxY) / 2;
            // 同行（y 中心差小于 a 的高度的一半）按 x 排序
            const rowTol = Math.max(8, (a.maxY - a.minY) * 0.5);
            if (Math.abs(cyA - cyB) < rowTol) return a.minX - b.minX;
            return cyA - cyB;
        });

        report('cropping', 0.6);

        const results = [];
        for (let i = 0; i < filtered.length; i++) {
            const comp = filtered[i];
            const { blob, canvas: outCanvas, width, height } =
                await cropToBlob(canvas, comp, opts.trimTransparent);
            const dataUrl = outCanvas.toDataURL('image/png');
            results.push({
                index: i,
                blob,
                dataUrl,
                width,
                height,
                area: comp.area,
                bbox: { x: comp.minX, y: comp.minY, w: comp.maxX - comp.minX + 1, h: comp.maxY - comp.minY + 1 }
            });
            if (i % 8 === 0) {
                report('cropping', 0.6 + 0.4 * (i / filtered.length));
                await new Promise(r => setTimeout(r, 0));
            }
        }

        report('done', 1);
        return results;
    }

    global.SmartSplitter = { split };
})(window);
