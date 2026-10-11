// ============================================================
// 访问统计 · 百度统计（仅站主可在后台查看，页面不显示任何数字）
//
// 启用方式：在 https://tongji.baidu.com 新建站点后拿到 32 位 site code，
//          填到下面的 BAIDU_TONGJI_ID；留空 = 完全不加载统计脚本，
//          不产生任何外部请求（保持"零外部依赖"的原始状态）。
//
// 只在这些域名/协议下生效，避免本地预览、截图、file:// 打开污染数据：
//   - kchen1028.github.io
// ============================================================

(function () {
  'use strict';

  var BAIDU_TONGJI_ID = 'e36d9abb3d4177d940d39a49e8d31ae3';   // 32 位 site code，留空 = 不统计

  var host = location.hostname || '';
  var isProd = /(^|\.)kchen1028\.github\.io$/.test(host);
  // 格式自检：ID 填错时不要静默变成"没数据"，留一条可排查的提示
  var idOk = /^[0-9a-f]{32}$/i.test(BAIDU_TONGJI_ID);
  if (BAIDU_TONGJI_ID && !idOk) {
    console.warn('[analytics] BAIDU_TONGJI_ID 不是 32 位十六进制，已跳过统计');
  }
  var active = idOk && isProd;

  if (active) {
    window._hmt = window._hmt || [];
    var s = document.createElement('script');
    s.async = true;                                   // 不阻塞渲染
    s.src = 'https://hm.baidu.com/hm.js?' + BAIDU_TONGJI_ID;
    var first = document.getElementsByTagName('script')[0];
    first.parentNode.insertBefore(s, first);
  }

  /** 上报自定义事件；统计不可用时静默跳过 */
  function track(category, action, label) {
    if (!active || !window._hmt) return;
    try {
      window._hmt.push(['_trackEvent', category, action, label || '']);
    } catch (e) { /* 统计失败绝不影响页面 */ }
  }

  // 事件用委托绑定：语言按钮是 i18n.js 运行时创建的，绑定时还不存在
  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('a, button') : null;
    if (!el) return;

    // 简历下载：区分中/英文版（判断当次实际 href，语言切换后依然准确）
    if (el.id === 'heroResumeBtn' || el.id === 'contactResumeBtn') {
      var href = el.getAttribute('href') || '';
      track('resume', 'download', href.indexOf('Kai_Chen') === 0 ? 'en' : 'zh');
      return;
    }

    // 语言切换：反映访客偏好中文还是英文（对海外岗位投递有参考价值）
    if (el.classList && el.classList.contains('lang-btn')) {
      track('lang', 'switch', el.getAttribute('data-lang') || '');
      return;
    }

    // 邮箱点击
    var mail = el.tagName === 'A' ? (el.getAttribute('href') || '') : '';
    if (mail.indexOf('mailto:') === 0) track('contact', 'email', '');
  });
})();
