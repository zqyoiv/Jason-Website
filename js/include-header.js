/**
 * Load shared header + overlay from html/partials/header.html and insert into #header-placeholder.
 * Sets the active nav link. Binds hamburger and overlay so mobile menu works on every page.
 */
(function () {
  var placeholder = document.getElementById('header-placeholder');
  if (!placeholder) return;
  fetch('/html/partials/header.html')
    .then(function (res) { return res.ok ? res.text() : Promise.reject(res.status); })
    .then(function (html) {
      placeholder.innerHTML = html;
      var path = typeof window !== 'undefined' && window.location ? window.location.pathname : '';
      var isAbout = path.indexOf('about') !== -1;
      var isIndex = path === '/' || path === '/works' || path === '' || path.endsWith('index.html');
      var worksLink = placeholder.querySelector('.nav-link[data-works-trigger]');
      var aboutLink = placeholder.querySelector('.nav-link[href*="about"]');
      if (worksLink) worksLink.classList.toggle('active', !isAbout);
      if (aboutLink) aboutLink.classList.toggle('active', isAbout);

      var overlay = document.getElementById('nav-overlay');
      var hamburger = placeholder.querySelector('.nav-hamburger');

      function closeOverlay() {
        if (!overlay) return;
        overlay.classList.remove('is-open');
        overlay.setAttribute('aria-hidden', 'true');
        if (hamburger) {
          hamburger.classList.remove('is-open');
          hamburger.setAttribute('aria-expanded', 'false');
          hamburger.setAttribute('aria-label', 'Open menu');
        }
      }

      function openOverlay() {
        if (!overlay) return;
        overlay.classList.add('is-open');
        overlay.setAttribute('aria-hidden', 'false');
        if (hamburger) {
          hamburger.classList.add('is-open');
          hamburger.setAttribute('aria-expanded', 'true');
          hamburger.setAttribute('aria-label', 'Close menu');
        }
      }

      if (hamburger) {
        hamburger.addEventListener('click', function () {
          if (overlay && overlay.classList.contains('is-open')) closeOverlay();
          else openOverlay();
        });
      }

      function scrollToSectionWithOffset(sectionId) {
        var el = document.getElementById(sectionId);
        if (!el) return;
        var titleEl = el.querySelector('.section-title');
        var scrollTarget = titleEl || el;
        var header = document.querySelector('.header');
        var offset = header ? header.offsetHeight : 0;
        var top = scrollTarget.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }

      if (overlay) {
        overlay.querySelectorAll('.nav-overlay-link').forEach(function (link) {
          link.addEventListener('click', function (e) {
            var section = link.getAttribute('data-section');
            closeOverlay();
            if (isIndex && section) {
              e.preventDefault();
              scrollToSectionWithOffset(section);
            }
          });
        });
        overlay.addEventListener('click', function (e) {
          if (e.target === overlay) closeOverlay();
        });
      }

      if (isIndex && window.location.hash) {
        var sectionId = window.location.hash.slice(1);
        if (sectionId === 'section-selected' || sectionId === 'section-commissioned' || sectionId === 'section-residential') {
          function applyHashScroll() { scrollToSectionWithOffset(sectionId); }
          if (document.readyState === 'complete') {
            setTimeout(applyHashScroll, 0);
          } else {
            window.addEventListener('load', applyHashScroll);
          }
        }
      }

      try { window.dispatchEvent(new CustomEvent('header-loaded')); } catch (e) {}
    })
    .catch(function () {
      placeholder.innerHTML = '<header class="header"><a href="/" class="logo-link">Jason Krugman Studio</a><nav class="nav"><a href="/works" class="nav-link">Works</a><a href="/about" class="nav-link">About</a></nav></header>';
    });
})();
