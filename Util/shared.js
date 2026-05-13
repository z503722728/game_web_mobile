/**
 * 跨工具共享的 UI / 工具函数
 * ----------------------------------------------------
 * 暴露：window.UtilShared
 *   - showToast(msg, duration?)
 *   - showLoading(text?)
 *   - hideLoading()
 *   - formatBytes(bytes)
 *   - sanitizeFilename(name)
 *   - getBaseName(filename)
 *
 * Toast / Loading 节点会自动注入到 body 中，不需要 HTML 提前声明。
 */
(function (global) {
    'use strict';

    // ===== Toast =====
    function ensureToast() {
        let el = document.querySelector('#__util_toast');
        if (!el) {
            el = document.createElement('div');
            el.id = '__util_toast';
            el.className = 'toast';
            el.hidden = true;
            document.body.appendChild(el);
        }
        return el;
    }

    function showToast(msg, duration = 2200) {
        const el = ensureToast();
        el.textContent = msg;
        el.hidden = false;
        clearTimeout(el._t);
        el._t = setTimeout(() => { el.hidden = true; }, duration);
    }

    // ===== Loading Mask =====
    function ensureMask() {
        let mask = document.querySelector('.loading-mask');
        if (!mask) {
            mask = document.createElement('div');
            mask.className = 'loading-mask';
            mask.innerHTML = '<div class="spinner"></div><div class="loading-text">处理中…</div>';
            mask.style.display = 'none';
            document.body.appendChild(mask);
        }
        return mask;
    }
    function showLoading(text) {
        const mask = ensureMask();
        mask.querySelector('.loading-text').textContent = text || '处理中…';
        mask.style.display = 'flex';
    }
    function hideLoading() {
        const mask = document.querySelector('.loading-mask');
        if (mask) mask.style.display = 'none';
    }

    // ===== 杂项 =====
    function formatBytes(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1024 / 1024).toFixed(1) + ' MB';
    }

    function sanitizeFilename(name) {
        return (name || '').replace(/[\\/:*?"<>|]/g, '_').trim() || 'unnamed';
    }

    function getBaseName(filename) {
        if (!filename) return 'image';
        return filename.replace(/\.[^.]+$/, '');
    }

    global.UtilShared = {
        showToast,
        showLoading,
        hideLoading,
        formatBytes,
        sanitizeFilename,
        getBaseName
    };
})(window);
