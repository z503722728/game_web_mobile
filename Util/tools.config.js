/**
 * 工具集中心配置 - 添加新工具只需在此追加一项
 *
 * 字段说明：
 *   id        : 唯一标识（也用于路径推断）
 *   name      : 工具名（显示在卡片标题、导航栏）
 *   icon      : Emoji 图标（也用作导航栏前缀）
 *   desc      : 一句话描述（卡片副标题）
 *   tags      : 标签数组，用于筛选 / 搜索
 *   path      : 子页面相对路径（相对 Util 根目录）
 *   accent    : 卡片左上色条颜色（CSS 颜色字符串）
 *   status    : 'ready' | 'beta' | 'planned'
 *               planned 状态在卡片上灰色显示，点击不会跳转
 */
window.UTIL_TOOLS = [
    {
        id: 'image-splitter',
        name: '智能拆图',
        icon: '✂️',
        desc: '基于连通域算法自动识别合图中的独立子图，支持自定义命名 + ZIP 打包下载。',
        tags: ['图像', '拆分', '游戏素材'],
        path: 'tools/image-splitter/index.html',
        accent: '#7a5cff',
        status: 'ready'
    },
    // ====== 后续工具占位（status: 'planned' 即可显示为"敬请期待"）======
    {
        id: 'image-translator',
        name: '图片翻译',
        icon: '🖼️',
        desc: '识别图片中的文字并翻译为多种语言（OCR + Translate）。',
        tags: ['图像', '文字', '翻译'],
        path: 'tools/image-translator/index.html',
        accent: '#3ddc97',
        status: 'planned'
    },
    {
        id: 'color-keyer',
        name: '纯色抠图',
        icon: '🎭',
        desc: '取色器一键吸色 + 容差去背景，再用橡皮擦精修边缘，导出透明 PNG。',
        tags: ['图像', '抠图', '透明'],
        path: 'tools/color-keyer/index.html',
        accent: '#ffb547',
        status: 'ready'
    },
    {
        id: 'ai-matting',
        name: 'AI 抠图',
        icon: '🤖',
        desc: '基于浏览器内 AI 模型对人物 / 物体进行自动抠图。',
        tags: ['图像', 'AI', '抠图'],
        path: 'tools/ai-matting/index.html',
        accent: '#ff6b6b',
        status: 'planned'
    },
    {
        id: 'image-generator',
        name: '图片生成',
        icon: '🎨',
        desc: '通过文字描述生成图片（接入 SD / 在线 API）。',
        tags: ['图像', 'AI', '生成'],
        path: 'tools/image-generator/index.html',
        accent: '#5b9dff',
        status: 'planned'
    }
];
