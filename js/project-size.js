/**
 * Project page video/iframe sizing and window resize handling.
 * Used by project.html (with project.js) and all static project HTML pages.
 * Exposes getProjectPageVideoSize on window for project.js.
 */
(function () {
  function getProjectPageVideoSize() {
    var projectPage = document.querySelector('main.project-page');
    var widthPx = 1200;
    var vw = typeof window !== 'undefined' ? window.innerWidth : widthPx;
    var vh = typeof window !== 'undefined' ? window.innerHeight : 0;
    var isPortraitMobile = vw <= 768 && vh > 0 && vh > vw;

    if (projectPage) {
      var style = window.getComputedStyle(projectPage);
      var paddingLeft = parseFloat(style.paddingLeft) || 0;
      var paddingRight = parseFloat(style.paddingRight) || 0;
      var contentWidth = projectPage.offsetWidth - paddingLeft - paddingRight;
      widthPx = contentWidth;
      if (isPortraitMobile && vw > 0) {
        var viewportWidth = vw - paddingLeft - paddingRight;
        if (viewportWidth > widthPx) widthPx = viewportWidth;
      }
    } else if (isPortraitMobile && vw > 0) {
      widthPx = Math.min(vw, 1200);
    }

    var aspectRatio = isPortraitMobile ? (9 / 16) : (16 / 9);
    var heightPx = Math.round(widthPx / aspectRatio);
    return { width: widthPx, height: heightPx };
  }

  function updateVimeoIframeSizes() {
    var size = getProjectPageVideoSize();
    var iframes = document.querySelectorAll('.vimeo-iframe');
    for (var i = 0; i < iframes.length; i++) {
      iframes[i].setAttribute('width', String(size.width));
      iframes[i].setAttribute('height', String(size.height));
    }
  }

  window.getProjectPageVideoSize = getProjectPageVideoSize;
  window.updateVimeoIframeSizes = updateVimeoIframeSizes;

  function onReady() {
    updateVimeoIframeSizes();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

  // Window resize: debounce to avoid thrashing while dragging (150ms).
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateVimeoIframeSizes, 150);
  });

  // ResizeObserver: recalc as soon as main.project-page size changes (e.g. DevTools device switch).
  // Chrome often delays or skips window.resize when toggling device preset; observer fires immediately.
  function observeContainer() {
    var el = document.querySelector('main.project-page');
    if (!el || typeof ResizeObserver === 'undefined') return;
    var rafId;
    var observer = new ResizeObserver(function () {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(function () {
        updateVimeoIframeSizes();
      });
    });
    observer.observe(el);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeContainer);
  } else {
    observeContainer();
  }

  // When crossing mobile/desktop breakpoint (e.g. device preset change), recalc immediately.
  var mq = typeof window.matchMedia !== 'undefined' && window.matchMedia('(max-width: 768px)');
  if (mq && mq.addEventListener) {
    mq.addEventListener('change', function () {
      updateVimeoIframeSizes();
    });
  }
})();
