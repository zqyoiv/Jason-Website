/**
 * Load shared footer from html/partials/footer.html and insert into #footer-placeholder.
 * Include this script on every page that should show the site footer.
 */
(function () {
  var placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;
  fetch('/html/partials/footer.html')
    .then(function (res) { return res.ok ? res.text() : Promise.reject(res.status); })
    .then(function (html) {
      placeholder.innerHTML = html;
    })
    .catch(function () {
      placeholder.innerHTML = '<footer class="footer"><div class="footer-content"><div class="footer-copyright">ALL RIGHTS RESERVED © 2026</div></div></footer>';
    });
})();
