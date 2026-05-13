/**
 * 纯色抠图 UI 交互层
 * ----------------------------------------------------
 * 功能：
 *   - 文件上传（点击 / 拖拽 / 粘贴）
 *   - 在原图上点击吸取背景色（带跟随预览方块）
 *   - 调用 ColorKeyer.key 一键抠图 + spill 抑制
 *   - 在结果图上使用橡皮擦 / 恢复笔精修（基于 ImageData 操作）
 *   - 撤销 / 重做（最多 30 步）
 *   - 下载透明 PNG（支持自动 trim）
 *
 * 依赖：
 *   - ColorKeyer (./keyer.js)
 *   - UtilShared, UtilTopNav (../../shared.js, ../../components/topnav.js)
 */
(function () {
    'use strict';

    const { showToast, showLoading, hideLoading, formatBytes, getBaseName } = window.UtilShared;
    UtilTopNav.mount({ activeId: 'color-keyer', basePath: '../../' });

    const MAX_HISTORY = 30;

    // ===== 状态 =====
    const state = {
        srcImageData: null,    // 原图 ImageData
        srcCanvas: null,
        dstCanvas: null,       // 结果画布
        dstCtx: null,
        bgColor: [0, 255, 0],
        history: [],           // ImageData[] 历史快照
        historyIndex: -1,      // 当前位置
        baselineImageData: null, // 抠图后的初始结果（重置用）
        mode: 'pan',           // 'pan' | 'erase' | 'restore'
        brushSize: 30,
        brushHardness: 0.8,
        sourceFile: null
    };

    // ===== DOM =====
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => Array.from(document.querySelectorAll(sel));

    const fileInput = $('#fileInput');
    const uploadZone = $('#uploadZone');
    const uploadText = $('#uploadText');
    const fileInfo = $('#fileInfo');
    const workArea = $('#workArea');
    const paramCard = $('#paramCard');
    const srcCanvas = $('#srcCanvas');
    const dstCanvas = $('#dstCanvas');
    const srcStage = $('#srcStage');
    const dstStage = $('#dstStage');
    const pickerCursor = $('#pickerCursor');
    const pickerPreview = $('#pickerPreview');
    const brushCursor = $('#brushCursor');
    const brushControls = $('#brushControls');
    const emptyTip = $('#emptyTip');

    const colorPicker = $('#colorPicker');
    const swatchFill = $('#swatchFill');
    const colorCode = $('#colorCode');
    const eyedropperBtn = $('#eyedropperBtn');
    const toleranceSlider = $('#toleranceSlider');
    const toleranceBadge = $('#toleranceBadge');
    const featherSlider = $('#featherSlider');
    const featherBadge = $('#featherBadge');
    const trimChk = $('#trimChk');
    const despillChk = $('#despillChk');
    const keyBtn = $('#keyBtn');
    const downloadBtn = $('#downloadBtn');

    const modeGroup = $('#modeGroup');
    const undoBtn = $('#undoBtn');
    const redoBtn = $('#redoBtn');
    const resetBtn = $('#resetBtn');
    const brushSlider = $('#brushSlider');
    const brushBadge = $('#brushBadge');
    const hardnessSlider = $('#hardnessSlider');
    const hardnessBadge = $('#hardnessBadge');

    state.dstCtx = dstCanvas.getContext('2d', { willReadFrequently: true });

    // ============== 上传 ==============
    function loadFile(file) {
        if (!file) return;
        if (!/^image\/(png|jpe?g|webp)$/.test(file.type)) {
            showToast('仅支持 PNG / JPG / WEBP 格式');
            return;
        }
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            state.sourceFile = file;
            // 把原图绘制到 srcCanvas
            srcCanvas.width = img.naturalWidth;
            srcCanvas.height = img.naturalHeight;
            const sctx = srcCanvas.getContext('2d', { willReadFrequently: true });
            sctx.drawImage(img, 0, 0);
            state.srcImageData = sctx.getImageData(0, 0, srcCanvas.width, srcCanvas.height);

            // 同步 dstCanvas 尺寸
            dstCanvas.width = img.naturalWidth;
            dstCanvas.height = img.naturalHeight;
            state.dstCtx.clearRect(0, 0, dstCanvas.width, dstCanvas.height);

            // 自动从图片四个角取一个估计背景色（取角点平均值）
            autoPickBgColor();

            uploadZone.classList.add('has-file');
            uploadText.textContent = `已选择：${file.name}（点击或拖拽更换）`;
            fileInfo.textContent = `${file.name} (${formatBytes(file.size)})  ·  ${img.naturalWidth} × ${img.naturalHeight}`;
            workArea.hidden = false;
            paramCard.hidden = false;
            keyBtn.disabled = false;
            downloadBtn.disabled = true;
            emptyTip.hidden = false;

            // 重置历史
            state.history = [];
            state.historyIndex = -1;
            state.baselineImageData = null;
            updateUndoRedo();

            URL.revokeObjectURL(url);
        };
        img.onerror = () => showToast('图片加载失败');
        img.src = url;
    }

    function autoPickBgColor() {
        if (!state.srcImageData) return;
        const { width, height } = state.srcImageData;
        // 在四角各取 3px 平均值
        const points = [
            [2, 2], [width - 3, 2], [2, height - 3], [width - 3, height - 3]
        ];
        let r = 0, g = 0, b = 0, n = 0;
        points.forEach(([x, y]) => {
            const c = ColorKeyer.pickColorAvg(state.srcImageData, x, y, 2);
            r += c[0]; g += c[1]; b += c[2]; n++;
        });
        setBgColor([Math.round(r / n), Math.round(g / n), Math.round(b / n)]);
    }

    function setBgColor(rgb) {
        state.bgColor = rgb;
        const hex = ColorKeyer.rgbToHex(rgb).toUpperCase();
        colorPicker.value = hex.toLowerCase();
        swatchFill.style.background = hex;
        colorCode.textContent = `HEX: ${hex}    |    RGB: (${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        if (pickerPreview) pickerPreview.style.background = hex;
    }

    fileInput.addEventListener('change', (e) => {
        loadFile(e.target.files[0]);
        fileInput.value = '';
    });
    ['dragenter', 'dragover'].forEach(evt => {
        uploadZone.addEventListener(evt, (e) => {
            e.preventDefault();
            uploadZone.classList.add('dragover');
        });
    });
    ['dragleave', 'drop'].forEach(evt => {
        uploadZone.addEventListener(evt, (e) => {
            e.preventDefault();
            uploadZone.classList.remove('dragover');
        });
    });
    uploadZone.addEventListener('drop', (e) => {
        const file = e.dataTransfer.files && e.dataTransfer.files[0];
        if (file) loadFile(file);
    });
    window.addEventListener('paste', (e) => {
        const items = (e.clipboardData || {}).items;
        if (!items) return;
        for (const it of items) {
            if (it.type && it.type.startsWith('image/')) {
                const f = it.getAsFile();
                if (f) { loadFile(f); break; }
            }
        }
    });

    // ============== 颜色取色 ==============
    colorPicker.addEventListener('input', (e) => {
        setBgColor(ColorKeyer.hexToRgb(e.target.value));
    });

    // 浏览器原生 EyeDropper（可吸取屏幕任意像素）
    eyedropperBtn.addEventListener('click', async () => {
        if (!('EyeDropper' in window)) {
            showToast('当前浏览器不支持屏幕取色，请使用 Chrome 95+');
            return;
        }
        try {
            const ed = new window.EyeDropper();
            const res = await ed.open();
            setBgColor(ColorKeyer.hexToRgb(res.sRGBHex));
            showToast('已吸取颜色');
        } catch (_) { /* 用户取消 */ }
    });

    // 在原图 Canvas 上点击吸色
    function srcCanvasCoord(e) {
        const rect = srcCanvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (srcCanvas.width / rect.width);
        const y = (e.clientY - rect.top) * (srcCanvas.height / rect.height);
        return [Math.round(x), Math.round(y)];
    }

    srcCanvas.addEventListener('mousemove', (e) => {
        if (!state.srcImageData) return;
        pickerCursor.hidden = false;
        pickerCursor.style.left = e.clientX + 'px';
        pickerCursor.style.top = e.clientY + 'px';
        const [x, y] = srcCanvasCoord(e);
        const c = ColorKeyer.pickColorAvg(state.srcImageData, x, y, 1);
        pickerPreview.style.background = `rgb(${c[0]},${c[1]},${c[2]})`;
    });
    srcCanvas.addEventListener('mouseleave', () => { pickerCursor.hidden = true; });
    srcCanvas.addEventListener('click', (e) => {
        if (!state.srcImageData) return;
        const [x, y] = srcCanvasCoord(e);
        const c = ColorKeyer.pickColorAvg(state.srcImageData, x, y, 2);
        setBgColor([c[0], c[1], c[2]]);
        showToast(`已吸取背景色：${ColorKeyer.rgbToHex(c).toUpperCase()}`);
    });

    // ============== 滑块 ==============
    toleranceSlider.addEventListener('input', () => {
        toleranceBadge.textContent = toleranceSlider.value;
    });
    featherSlider.addEventListener('input', () => {
        featherBadge.textContent = featherSlider.value;
    });
    brushSlider.addEventListener('input', () => {
        state.brushSize = parseInt(brushSlider.value, 10);
        brushBadge.textContent = state.brushSize;
        updateBrushCursorSize();
    });
    hardnessSlider.addEventListener('input', () => {
        state.brushHardness = parseInt(hardnessSlider.value, 10) / 100;
        hardnessBadge.textContent = hardnessSlider.value + '%';
    });

    // ============== 抠图 ==============
    keyBtn.addEventListener('click', async () => {
        if (!state.srcImageData) {
            showToast('请先上传图片');
            return;
        }
        showLoading('正在分析像素…');
        // 让出主线程
        await new Promise(r => setTimeout(r, 16));
        try {
            const result = ColorKeyer.key(state.srcImageData, {
                bgColor: state.bgColor,
                tolerance: parseInt(toleranceSlider.value, 10),
                feather: parseInt(featherSlider.value, 10),
                despill: despillChk.checked
            });

            // 写入结果画布（按原图尺寸；trim 在下载时做以保持画布坐标稳定）
            dstCanvas.width = result.width;
            dstCanvas.height = result.height;
            state.dstCtx.putImageData(result, 0, 0);

            // 保存为 baseline + 入栈历史
            state.baselineImageData = result;
            state.history = [cloneImageData(result)];
            state.historyIndex = 0;
            updateUndoRedo();
            downloadBtn.disabled = false;
            emptyTip.hidden = true;
            brushControls.hidden = false;

            const visiblePx = countVisiblePixels(result);
            const total = result.width * result.height;
            const ratio = ((visiblePx / total) * 100).toFixed(1);
            showToast(`抠图完成，主体占比 ${ratio}%`);
        } catch (err) {
            console.error(err);
            showToast('抠图失败：' + err.message);
        } finally {
            hideLoading();
        }
    });

    function countVisiblePixels(imageData) {
        const d = imageData.data;
        let n = 0;
        for (let i = 3; i < d.length; i += 4) {
            if (d[i] > 0) n++;
        }
        return n;
    }

    function cloneImageData(src) {
        const out = new ImageData(src.width, src.height);
        out.data.set(src.data);
        return out;
    }

    // ============== 模式切换（橡皮擦 / 恢复笔 / 浏览） ==============
    modeGroup.addEventListener('click', (e) => {
        const btn = e.target.closest('.seg-btn');
        if (!btn) return;
        $$('.seg-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.mode = btn.dataset.mode;
        modeGroup.dataset.mode = state.mode;
        dstStage.dataset.mode = state.mode;
        // 显示/隐藏画笔光标
        if (state.mode === 'erase' || state.mode === 'restore') {
            brushCursor.hidden = false;
            updateBrushCursorSize();
            // 恢复笔需要 baseline，没有则禁用
            if (state.mode === 'restore' && !state.baselineImageData) {
                showToast('请先抠图后再使用恢复笔');
            }
        } else {
            brushCursor.hidden = true;
        }
    });

    function updateBrushCursorSize() {
        // 把画布坐标的笔刷尺寸换算到屏幕像素
        const rect = dstCanvas.getBoundingClientRect();
        const scale = rect.width / Math.max(1, dstCanvas.width);
        const px = Math.max(4, state.brushSize * scale);
        brushCursor.style.width = px + 'px';
        brushCursor.style.height = px + 'px';
    }

    // ============== 笔刷绘制（橡皮擦 / 恢复笔） ==============
    let drawing = false;
    let lastPoint = null;

    function dstCanvasCoord(e) {
        const rect = dstCanvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (dstCanvas.width / rect.width);
        const y = (e.clientY - rect.top) * (dstCanvas.height / rect.height);
        return [Math.round(x), Math.round(y)];
    }

    dstCanvas.addEventListener('mousemove', (e) => {
        if (state.mode !== 'erase' && state.mode !== 'restore') return;
        brushCursor.style.left = e.clientX + 'px';
        brushCursor.style.top = e.clientY + 'px';
        if (drawing) {
            const p = dstCanvasCoord(e);
            paintStroke(lastPoint || p, p);
            lastPoint = p;
        }
    });
    dstCanvas.addEventListener('mouseleave', () => {
        // 离开画布时光标隐藏
    });
    dstCanvas.addEventListener('mousedown', (e) => {
        if (state.mode !== 'erase' && state.mode !== 'restore') return;
        if (state.mode === 'restore' && !state.baselineImageData) return;
        drawing = true;
        lastPoint = dstCanvasCoord(e);
        paintStroke(lastPoint, lastPoint);
        e.preventDefault();
    });
    window.addEventListener('mouseup', () => {
        if (!drawing) return;
        drawing = false;
        lastPoint = null;
        commitHistory();
    });

    /** 在两点之间画一条由许多圆点组成的笔触 */
    function paintStroke(p0, p1) {
        const r = state.brushSize / 2;
        const hardness = state.brushHardness; // 0..1
        const dx = p1[0] - p0[0];
        const dy = p1[1] - p0[1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        const step = Math.max(1, r / 4);
        const steps = Math.max(1, Math.ceil(dist / step));

        for (let i = 0; i <= steps; i++) {
            const t = steps === 0 ? 0 : i / steps;
            const cx = p0[0] + dx * t;
            const cy = p0[1] + dy * t;
            paintDot(cx, cy, r, hardness);
        }
    }

    /** 在 (cx, cy) 画一个软边圆点 */
    function paintDot(cx, cy, radius, hardness) {
        const x0 = Math.max(0, Math.floor(cx - radius));
        const y0 = Math.max(0, Math.floor(cy - radius));
        const x1 = Math.min(dstCanvas.width - 1, Math.ceil(cx + radius));
        const y1 = Math.min(dstCanvas.height - 1, Math.ceil(cy + radius));
        if (x1 < x0 || y1 < y0) return;

        const w = x1 - x0 + 1;
        const h = y1 - y0 + 1;
        const region = state.dstCtx.getImageData(x0, y0, w, h);
        const d = region.data;

        const baseline = state.baselineImageData;
        const baseW = baseline ? baseline.width : 0;
        const baseD = baseline ? baseline.data : null;

        const r2 = radius * radius;
        const hardR2 = (radius * hardness) * (radius * hardness);
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const px = x + x0;
                const py = y + y0;
                const dx = px - cx;
                const dy = py - cy;
                const dd = dx * dx + dy * dy;
                if (dd > r2) continue;
                let strength;
                if (dd <= hardR2) strength = 1;
                else strength = 1 - (Math.sqrt(dd) - radius * hardness) / (radius - radius * hardness);
                strength = Math.max(0, Math.min(1, strength));

                const off = (y * w + x) * 4;

                if (state.mode === 'erase') {
                    // 降低 alpha
                    const oldA = d[off + 3];
                    const newA = Math.max(0, oldA - strength * 255);
                    d[off + 3] = newA;
                } else if (state.mode === 'restore' && baseD) {
                    // 把 baseline 对应像素混回来
                    const bOff = (py * baseW + px) * 4;
                    const bA = baseD[bOff + 3];
                    const oldA = d[off + 3];
                    const target = Math.max(oldA, bA);
                    const newA = oldA + (target - oldA) * strength;
                    d[off] = baseD[bOff];
                    d[off + 1] = baseD[bOff + 1];
                    d[off + 2] = baseD[bOff + 2];
                    d[off + 3] = newA;
                }
            }
        }
        state.dstCtx.putImageData(region, x0, y0);
    }

    // ============== 历史栈 ==============
    function commitHistory() {
        // 截掉 redo 部分
        if (state.historyIndex < state.history.length - 1) {
            state.history.length = state.historyIndex + 1;
        }
        const snap = state.dstCtx.getImageData(0, 0, dstCanvas.width, dstCanvas.height);
        state.history.push(snap);
        if (state.history.length > MAX_HISTORY) state.history.shift();
        state.historyIndex = state.history.length - 1;
        updateUndoRedo();
    }

    function applyHistoryState(idx) {
        const snap = state.history[idx];
        if (!snap) return;
        dstCanvas.width = snap.width;
        dstCanvas.height = snap.height;
        state.dstCtx.putImageData(snap, 0, 0);
        state.historyIndex = idx;
        updateUndoRedo();
    }

    function updateUndoRedo() {
        undoBtn.disabled = state.historyIndex <= 0;
        redoBtn.disabled = state.historyIndex < 0 || state.historyIndex >= state.history.length - 1;
    }

    undoBtn.addEventListener('click', () => {
        if (state.historyIndex > 0) applyHistoryState(state.historyIndex - 1);
    });
    redoBtn.addEventListener('click', () => {
        if (state.historyIndex < state.history.length - 1) applyHistoryState(state.historyIndex + 1);
    });
    resetBtn.addEventListener('click', () => {
        if (!state.baselineImageData) return;
        state.dstCtx.putImageData(state.baselineImageData, 0, 0);
        commitHistory();
        showToast('已重置为初次抠图结果');
    });

    document.addEventListener('keydown', (e) => {
        const ctrl = e.ctrlKey || e.metaKey;
        if (ctrl && e.key.toLowerCase() === 'z') {
            e.preventDefault();
            if (e.shiftKey) redoBtn.click();
            else undoBtn.click();
        } else if (ctrl && e.key.toLowerCase() === 'y') {
            e.preventDefault();
            redoBtn.click();
        }
    });

    // ============== 下载 ==============
    downloadBtn.addEventListener('click', async () => {
        if (!state.dstCtx) return;
        let canvas = dstCanvas;
        // 如果勾选了 trim，先做裁剪
        if (trimChk.checked) {
            const cur = state.dstCtx.getImageData(0, 0, dstCanvas.width, dstCanvas.height);
            const trimmed = ColorKeyer.trimImageData(cur, 0);
            const tmp = document.createElement('canvas');
            tmp.width = trimmed.imageData.width;
            tmp.height = trimmed.imageData.height;
            tmp.getContext('2d').putImageData(trimmed.imageData, 0, 0);
            canvas = tmp;
        }
        canvas.toBlob((blob) => {
            const a = document.createElement('a');
            const url = URL.createObjectURL(blob);
            const baseName = getBaseName(state.sourceFile && state.sourceFile.name) || 'image';
            a.href = url;
            a.download = `${baseName}_keyed.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            showToast('已导出 PNG');
        }, 'image/png');
    });

    // 窗口尺寸变化时刷新画笔光标
    window.addEventListener('resize', updateBrushCursorSize);

    // 初始化
    setBgColor([0, 255, 0]);
})();
