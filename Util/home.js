/**
 * 工具首页交互层
 * ----------------------------------------------------
 *  - 渲染顶部导航（首页态）
 *  - 加载 tools.config.js 配置，渲染卡片
 *  - 标签筛选 + 关键词搜索
 *  - planned 状态卡片显示"敬请期待"
 */
(function () {
    'use strict';

    UtilTopNav.mount({ activeId: null, basePath: './' });

    const toolsGrid = document.getElementById('toolsGrid');
    const tagBar = document.getElementById('tagBar');
    const search = document.getElementById('toolSearch');
    const emptyResult = document.getElementById('emptyResult');

    /** 当前激活标签，'__all__' 表示全部 */
    let activeTag = '__all__';
    let keyword = '';

    // ====== 收集所有标签 ======
    function collectTags() {
        const set = new Set();
        (window.UTIL_TOOLS || []).forEach(t => (t.tags || []).forEach(tag => set.add(tag)));
        return ['__all__', ...Array.from(set)];
    }

    function renderTagBar() {
        const tags = collectTags();
        tagBar.innerHTML = tags.map(tag => {
            const label = tag === '__all__' ? '全部' : tag;
            const cls = tag === activeTag ? 'tag active' : 'tag';
            return `<button class="${cls}" data-tag="${tag}">${label}</button>`;
        }).join('');
    }

    function renderTools() {
        const list = (window.UTIL_TOOLS || []).filter(tool => {
            if (activeTag !== '__all__' && !(tool.tags || []).includes(activeTag)) return false;
            if (keyword) {
                const k = keyword.toLowerCase();
                const hay = (tool.name + ' ' + tool.desc + ' ' + (tool.tags || []).join(' ')).toLowerCase();
                if (!hay.includes(k)) return false;
            }
            return true;
        });

        if (!list.length) {
            toolsGrid.innerHTML = '';
            emptyResult.hidden = false;
            return;
        }
        emptyResult.hidden = true;

        toolsGrid.innerHTML = list.map(tool => {
            const planned = tool.status === 'planned';
            const tagsHtml = (tool.tags || [])
                .map(t => `<span class="card-tag">${t}</span>`)
                .join('');
            const accent = tool.accent || '#7a5cff';

            const inner = `
                <div class="tool-card-accent" style="background:${accent}"></div>
                <div class="tool-card-icon" style="background:${accent}22;color:${accent}">${tool.icon}</div>
                <h3 class="tool-card-title">
                    ${tool.name}
                    ${planned ? '<span class="status-badge planned">敬请期待</span>' : '<span class="status-badge ready">可用</span>'}
                </h3>
                <p class="tool-card-desc">${tool.desc}</p>
                <div class="tool-card-tags">${tagsHtml}</div>
                <div class="tool-card-cta">
                    ${planned ? '即将上线 →' : '立即使用 →'}
                </div>
            `;

            if (planned) {
                return `<div class="tool-card disabled" data-id="${tool.id}">${inner}</div>`;
            }
            return `<a class="tool-card" data-id="${tool.id}" href="${tool.path}">${inner}</a>`;
        }).join('');
    }

    // ====== 事件 ======
    tagBar.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-tag]');
        if (!btn) return;
        activeTag = btn.dataset.tag;
        renderTagBar();
        renderTools();
    });

    let searchTimer = null;
    search.addEventListener('input', () => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
            keyword = search.value.trim();
            renderTools();
        }, 120);
    });

    toolsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.tool-card.disabled');
        if (card) {
            UtilShared.showToast('该工具正在路上，敬请期待 ✨');
        }
    });

    // ====== 初始化 ======
    renderTagBar();
    renderTools();
})();
