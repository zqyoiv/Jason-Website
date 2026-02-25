/**
 * Project page video/iframe sizing and window resize handling.
 * Used by project.html (with project.js) and all static project HTML pages.
 * Exposes getProjectPageVideoSize on window for project.js.
 */
(function () {
  function getContentWidth() {
    var projectPage = document.querySelector('main.project-page');
    var widthPx = 1200;
    var vw = typeof window !== 'undefined' ? window.innerWidth : widthPx;
    if (projectPage) {
      var style = window.getComputedStyle(projectPage);
      var paddingLeft = parseFloat(style.paddingLeft) || 0;
      var paddingRight = parseFloat(style.paddingRight) || 0;
      widthPx = projectPage.offsetWidth - paddingLeft - paddingRight;
    } else if (vw > 0) {
      widthPx = Math.min(vw, 1200);
    }
    return widthPx;
  }

  function getProjectPageVideoSize() {
    var widthPx = getContentWidth();
    var heightPx = Math.round(widthPx * (9 / 16));
    return { width: widthPx, height: heightPx };
  }

  function updateVimeoIframeSizes() {
    var vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
    var vh = typeof window !== 'undefined' ? window.innerHeight : 800;
    var isDesktop = vw > vh;
    var isMobile = vh >= vw;
    var contentWidth = getContentWidth();
    var iframes = document.querySelectorAll('.vimeo-iframe');
    for (var i = 0; i < iframes.length; i++) {
      var iframe = iframes[i];
      var orientation = iframe.getAttribute('data-orientation');
      iframe.classList.remove('landscape-video', 'portrait-video');
      if (orientation === 'portrait') {
        iframe.classList.add('portrait-video');
      } else {
        iframe.classList.add('landscape-video');
      }
      var portrait = orientation === 'portrait';
      var widthPx, heightPx;
      var useInlineSize = false;

      if (isDesktop) {
        if (portrait) {
          var header = document.querySelector('.header');
          var headerHeight = header ? header.offsetHeight : 0;
          heightPx = Math.floor(vh - headerHeight);
          widthPx = Math.round(heightPx * (9 / 16));
          useInlineSize = true;
        } else {
          widthPx = contentWidth;
          heightPx = Math.round(widthPx * (9 / 16));
        }
      } else {
        if (portrait) {
          widthPx = contentWidth;
          heightPx = Math.round(widthPx * (16 / 9));
        } else {
          widthPx = contentWidth;
          heightPx = Math.round(widthPx * (9 / 16));
        }
      }

      iframe.setAttribute('width', String(widthPx));
      iframe.setAttribute('height', String(heightPx));
      if (useInlineSize) {
        iframe.style.setProperty('width', widthPx + 'px', 'important');
        iframe.style.setProperty('height', heightPx + 'px', 'important');
      } else {
        iframe.style.removeProperty('width');
        iframe.style.removeProperty('height');
      }
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

  // When crossing mobile/desktop breakpoint or orientation change, recalc immediately.
  var mq = typeof window.matchMedia !== 'undefined' && window.matchMedia('(max-width: 768px)');
  if (mq && mq.addEventListener) {
    mq.addEventListener('change', function () { updateVimeoIframeSizes(); });
  }
  window.addEventListener('orientationchange', function () {
    setTimeout(updateVimeoIframeSizes, 100);
  });
})();
