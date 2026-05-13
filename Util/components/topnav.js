/**
 * 共享顶部导航组件
 * ----------------------------------------------------
 * 自动渲染所有 ready / planned 的工具入口，并高亮当前页。
 *
 * 使用方式：
 *   1) 引入 tools.config.js（提供 window.UTIL_TOOLS）
 *   2) 引入本文件
 *   3) 在 HTML 中放置 <div id="topnav-mount"></div>
 *   4) 调用 UtilTopNav.mount({ activeId: 'image-splitter', basePath: '../../' })
 *      activeId  : 当前页面的工具 id；不传则只点亮「工具首页」
 *      basePath  : 子页面回到 Util 根目录的相对路径（默认 './'）
 */
(function (global) {
    'use strict';

    function buildHomeButton(basePath, isActive) {
        return `
            <a class="nav-item ${isActive ? 'active' : ''}" href="${basePath}index.html">
                🏠 工具首页
            </a>
        `;
    }

    function buildToolButton(tool, basePath, isActive) {
        const url = basePath + tool.path;
        const planned = tool.status === 'planned';
        const cls = ['nav-item'];
        if (isActive) cls.push('active');
        if (planned) cls.push('disabled');

        if (planned) {
            return `<span class="${cls.join(' ')}" title="敬请期待">${tool.icon} ${tool.name}</span>`;
        }
        return `<a class="${cls.join(' ')}" href="${url}">${tool.icon} ${tool.name}</a>`;
    }

    function mount(options) {
        options = options || {};
        const activeId = options.activeId || null;
        const basePath = options.basePath || './';
        const mountEl = document.getElementById('topnav-mount');
        if (!mountEl) return;

        const tools = (global.UTIL_TOOLS || []);
        let html = '<nav class="top-nav">';
        html += buildHomeButton(basePath, !activeId);
        tools.forEach((tool) => {
            html += buildToolButton(tool, basePath, tool.id === activeId);
        });
        html += '</nav>';
        mountEl.outerHTML = html;
    }

    global.UtilTopNav = { mount };
})(window);
