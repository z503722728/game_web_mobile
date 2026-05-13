/**
 * 智能拆图 UI 交互层
 * ----------------------------------------------------
 * 依赖：
 *   - SmartSplitter (./splitter.js)
 *   - UtilShared    (../../shared.js)  -> showToast / showLoading / formatBytes / sanitizeFilename / getBaseName
 *   - UtilTopNav    (../../components/topnav.js)
 *   - UTIL_TOOLS    (../../tools.config.js)
 *   - JSZip         (CDN)
 */
(function () {
    'use strict';

    const { showToast, showLoading, hideLoading, formatBytes, sanitizeFilename, getBaseName } = window.UtilShared;

    // 顶部导航：高亮"智能拆图"
    UtilTopNav.mount({ activeId: 'image-splitter', basePath: '../../' });

    // ===== 状态 =====
    const state = {
        sourceImage: null,
        sourceFile: null,
        splits: [],
        renameTargetIndex: -1
    };

    // ===== DOM =====
    const $ = (sel) => document.querySelector(sel);
    const fileInput = $('#fileInput');
    const uploadZone = $('#uploadZone');
    const uploadText = $('#uploadText');
    const previewBox = $('#previewBox');
    const fileInfo = $('#fileInfo');
    const ratioSlider = $('#ratioSlider');
    const ratioBadge = $('#ratioBadge');
    const alphaSlider = $('#alphaSlider');
    const alphaBadge = $('#alphaBadge');
    const trimChk = $('#trimChk');
    const diagChk = $('#diagChk');
    const splitBtn = $('#splitBtn');
    const downloadBtn = $('#downloadBtn');
    const resultGrid = $('#resultGrid');
    const resultHeader = $('#resultHeader');
    const resultCount = $('#resultCount');
    const selectAllBtn = $('#selectAllBtn');
    const invertSelectBtn = $('#invertSelectBtn');
    const renameAllBtn = $('#renameAllBtn');

    const renameModal = $('#renameModal');
    const renameInput = $('#renameInput');
    const renameTitle = $('#renameTitle');
    const renameTip = $('#renameTip');
    const renameConfirm = $('#renameConfirm');
    const renameCancel = $('#renameCancel');

    const previewModal = $('#previewModal');
    const previewImg = $('#previewImg');
    const previewClose = $('#previewClose');

    // ===== 上传处理 =====
    function loadFile(file) {
        if (!file) return;
        if (!/^image\/(png|jpe?g|webp)$/.test(file.type)) {
            showToast('仅支持 PNG / JPG / WEBP 格式');
            return;
        }
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            state.sourceImage = img;
            state.sourceFile = file;

            previewBox.innerHTML = '';
            previewBox.appendChild(img.cloneNode());
            fileInfo.textContent = `${file.name} (${formatBytes(file.size)})  ·  ${img.naturalWidth} × ${img.naturalHeight}`;
            uploadText.textContent = `已选择：${file.name}（点击或拖拽更换）`;
            splitBtn.disabled = false;

            state.splits = [];
            renderResults();
        };
        img.onerror = () => showToast('图片加载失败');
        img.src = url;
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

    // 全局粘贴上传
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

    // ===== 滑块 =====
    ratioSlider.addEventListener('input', () => {
        ratioBadge.textContent = parseFloat(ratioSlider.value).toFixed(3);
    });
    alphaSlider.addEventListener('input', () => {
        alphaBadge.textContent = alphaSlider.value;
    });

    // ===== 拆分 =====
    splitBtn.addEventListener('click', async () => {
        if (!state.sourceImage) {
            showToast('请先上传图片');
            return;
        }
        const minRatio = parseFloat(ratioSlider.value);
        const alphaThreshold = parseInt(alphaSlider.value, 10);
        const trimTransparent = trimChk.checked;
        const eightConn = diagChk.checked;

        showLoading('正在分析连通域…');
        try {
            const t0 = performance.now();
            const results = await SmartSplitter.split(state.sourceImage, {
                minRatio,
                alphaThreshold,
                trimTransparent,
                eightConn,
                onProgress: (stage, r) => {
                    const map = {
                        reading: '读取图像数据…',
                        analyzing: '分析连通域…',
                        filtering: '过滤小尺寸碎片…',
                        cropping: `裁剪子图… ${Math.round(r * 100)}%`,
                        done: '完成'
                    };
                    showLoading(map[stage] || '处理中…');
                }
            });
            const cost = ((performance.now() - t0) / 1000).toFixed(2);

            const baseName = getBaseName(state.sourceFile && state.sourceFile.name);
            state.splits = results.map((r, i) => ({
                ...r,
                name: `${baseName}_split_${i}`,
                selected: true
            }));
            renderResults();
            showToast(`拆分完成，共 ${results.length} 个组件，用时 ${cost}s`);
        } catch (err) {
            console.error(err);
            showToast('拆分失败：' + err.message);
        } finally {
            hideLoading();
        }
    });

    // ===== 结果渲染 =====
    function renderResults() {
        if (!state.splits.length) {
            resultGrid.innerHTML = '<span class="placeholder">上传图片并点击"开始拆分"…</span>';
            resultHeader.hidden = true;
            downloadBtn.disabled = true;
            return;
        }
        resultHeader.hidden = false;
        resultCount.textContent = state.splits.length;

        const frag = document.createDocumentFragment();
        state.splits.forEach((item, i) => {
            const card = document.createElement('div');
            card.className = 'thumb' + (item.selected ? ' selected' : '');
            card.dataset.index = i;
            card.title = `${item.name}.png  ·  ${item.width}×${item.height}`;
            card.innerHTML = `
                <div class="thumb-check">✓</div>
                <button class="thumb-edit" title="重命名">✎</button>
                <img src="${item.dataUrl}" alt="${item.name}" />
                <div class="thumb-name">${item.name}.png</div>
            `;
            frag.appendChild(card);
        });
        resultGrid.innerHTML = '';
        resultGrid.appendChild(frag);
        updateDownloadBtn();
    }

    function updateDownloadBtn() {
        const cnt = state.splits.filter(s => s.selected).length;
        downloadBtn.disabled = cnt === 0;
        downloadBtn.textContent = cnt > 0
            ? `📦 下载选中的 ${cnt} 张 (ZIP)`
            : '📦 下载全部 (ZIP)';
    }

    // 委托：点击切换选中 / 编辑按钮 / 大图预览
    resultGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.thumb');
        if (!card) return;
        const idx = parseInt(card.dataset.index, 10);
        const item = state.splits[idx];
        if (!item) return;

        if (e.target.classList.contains('thumb-edit')) {
            openRename(idx);
            return;
        }
        if (e.target.tagName === 'IMG') {
            previewImg.src = item.dataUrl;
            previewModal.hidden = false;
            return;
        }
        item.selected = !item.selected;
        card.classList.toggle('selected', item.selected);
        updateDownloadBtn();
    });

    selectAllBtn.addEventListener('click', () => {
        state.splits.forEach(s => s.selected = true);
        renderResults();
    });
    invertSelectBtn.addEventListener('click', () => {
        state.splits.forEach(s => s.selected = !s.selected);
        renderResults();
    });
    renameAllBtn.addEventListener('click', () => openRename(-1));

    // ===== 重命名 =====
    function openRename(index) {
        state.renameTargetIndex = index;
        if (index === -1) {
            renameTitle.textContent = '批量重命名';
            renameTip.textContent = '将以「前缀_序号」格式重命名所有图片，例如：icon_0、icon_1…';
            const baseName = getBaseName(state.sourceFile && state.sourceFile.name) || 'image';
            renameInput.value = `${baseName}_split`;
        } else {
            renameTitle.textContent = '重命名';
            renameTip.textContent = '请输入新的文件名（无需 .png 扩展名）';
            renameInput.value = state.splits[index].name;
        }
        renameModal.hidden = false;
        setTimeout(() => renameInput.focus(), 50);
    }

    function closeRename() {
        renameModal.hidden = true;
        state.renameTargetIndex = -1;
    }

    renameCancel.addEventListener('click', closeRename);
    renameModal.addEventListener('click', (e) => {
        if (e.target === renameModal) closeRename();
    });
    renameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') renameConfirm.click();
        else if (e.key === 'Escape') closeRename();
    });
    renameConfirm.addEventListener('click', () => {
        const raw = sanitizeFilename(renameInput.value);
        if (!raw) {
            showToast('文件名不能为空');
            return;
        }
        if (state.renameTargetIndex === -1) {
            state.splits.forEach((s, i) => { s.name = `${raw}_${i}`; });
        } else {
            let finalName = raw;
            const used = new Set(state.splits
                .filter((_, i) => i !== state.renameTargetIndex)
                .map(s => s.name));
            let suf = 1;
            while (used.has(finalName)) {
                finalName = `${raw}_${suf++}`;
            }
            state.splits[state.renameTargetIndex].name = finalName;
        }
        closeRename();
        renderResults();
        showToast('已更新命名');
    });

    // ===== 大图预览关闭 =====
    previewClose.addEventListener('click', () => { previewModal.hidden = true; });
    previewModal.addEventListener('click', (e) => {
        if (e.target === previewModal) previewModal.hidden = true;
    });

    // ===== 下载 ZIP =====
    downloadBtn.addEventListener('click', async () => {
        const selected = state.splits.filter(s => s.selected);
        if (!selected.length) {
            showToast('请至少选择一张');
            return;
        }
        if (typeof JSZip === 'undefined') {
            showToast('JSZip 未加载，请检查网络');
            return;
        }
        showLoading('正在打包 ZIP…');
        try {
            const zip = new JSZip();
            const usedNames = new Set();
            selected.forEach((item) => {
                let base = sanitizeFilename(item.name);
                let name = `${base}.png`;
                let suf = 1;
                while (usedNames.has(name)) name = `${base}_${suf++}.png`;
                usedNames.add(name);
                zip.file(name, item.blob);
            });

            const sourceBase = getBaseName(state.sourceFile && state.sourceFile.name) || 'split';
            const zipBlob = await zip.generateAsync(
                { type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } },
                (meta) => showLoading(`正在打包 ZIP… ${Math.round(meta.percent)}%`)
            );

            const a = document.createElement('a');
            const url = URL.createObjectURL(zipBlob);
            a.href = url;
            a.download = `${sourceBase}_splits_${selected.length}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            showToast(`已导出 ${selected.length} 张图片`);
        } catch (err) {
            console.error(err);
            showToast('打包失败：' + err.message);
        } finally {
            hideLoading();
        }
    });

    // ===== 全局快捷键 =====
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (!previewModal.hidden) previewModal.hidden = true;
            else if (!renameModal.hidden) closeRename();
        }
    });

    // 初次渲染
    renderResults();
})();
