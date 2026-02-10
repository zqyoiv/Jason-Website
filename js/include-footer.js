/**
 * Load shared footer from html/partials/footer.html and insert into #footer-placeholder.
 * Email link copies address to clipboard and shows "Email address copied" (no mailto).
 */
(function () {
  var placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;

  function showEmailCopiedToast() {
    var toast = document.createElement('div');
    toast.className = 'footer-email-toast';
    toast.textContent = 'Email address copied';
    document.body.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add('footer-email-toast-visible'); });
    setTimeout(function () {
      toast.classList.remove('footer-email-toast-visible');
      setTimeout(function () { toast.remove(); }, 300);
    }, 2000);
  }

  fetch('/html/partials/footer.html')
    .then(function (res) { return res.ok ? res.text() : Promise.reject(res.status); })
    .then(function (html) {
      placeholder.innerHTML = html;
      var emailLink = placeholder.querySelector('a[href^="mailto:"]');
      if (emailLink) {
        var email = (emailLink.getAttribute('href') || '').replace(/^mailto:/i, '').trim();
        emailLink.addEventListener('click', function (e) {
          e.preventDefault();
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email).then(showEmailCopiedToast).catch(function () {
              showEmailCopiedToast();
            });
          } else {
            showEmailCopiedToast();
          }
        });
      }
    })
    .catch(function () {
      placeholder.innerHTML = '<footer class="footer"><div class="footer-content"><div class="footer-copyright">ALL RIGHTS RESERVED © 2026</div></div></footer>';
    });
})();
