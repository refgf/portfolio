// 谷建霏 PORTFOLIO — cross-page smooth transition
// Lightweight, framework-free. Intercepts internal .html nav clicks,
// fades a soft overlay in, then navigates. The destination page fades
// in via its own entrance animation. Respects reduced-motion.
(function () {
  var overlay = document.createElement('div');
  overlay.setAttribute('id', 'page-transition');
  overlay.style.cssText =
    'position:fixed;inset:0;background:#eef0f3;z-index:9999;opacity:0;' +
    'pointer-events:none;transition:opacity .42s cubic-bezier(.4,0,.2,1);';
  document.documentElement.appendChild(overlay);

  var reduce =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('click', function (e) {
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    )
      return;
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (
      !href ||
      href.charAt(0) === '#' ||
      href.indexOf('mailto:') === 0 ||
      href.indexOf('tel:') === 0
    )
      return;
    if (!/\.html(\?.*)?$/.test(href)) return;
    var abs;
    try {
      abs = new URL(href, location.href);
    } catch (err) {
      return;
    }
    if (abs.origin !== location.origin) return;
    if (abs.pathname === location.pathname) return; // same page, ignore
    e.preventDefault();
    if (reduce) {
      location.href = href;
      return;
    }
    overlay.style.pointerEvents = 'auto';
    overlay.style.opacity = '1';
    setTimeout(function () {
      location.href = href;
    }, 430);
  });
})();
