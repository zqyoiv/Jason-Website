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

  function bindEmailCopyLink(emailLink) {
    if (!emailLink || emailLink.dataset.emailCopyBound) return;
    var email = (emailLink.getAttribute('href') || '').replace(/^mailto:/i, '').trim();
    if (!email) return;
    emailLink.dataset.emailCopyBound = '1';
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

  function bindEmailCopyLinks(root) {
    var scope = root || document;
    scope.querySelectorAll('a[href^="mailto:"]').forEach(function (link) {
      if (
        link.classList.contains('email-copy') ||
        link.closest('#footer-placeholder')
      ) {
        bindEmailCopyLink(link);
      }
    });
  }

  bindEmailCopyLinks(document);

  fetch('/html/partials/footer.html')
    .then(function (res) { return res.ok ? res.text() : Promise.reject(res.status); })
    .then(function (html) {
      placeholder.innerHTML = html;
      bindEmailCopyLinks(placeholder);
    })
    .catch(function () {
      placeholder.innerHTML = '<footer class="footer"><div class="footer-content"><div class="footer-copyright">ALL RIGHTS RESERVED © 2026</div></div></footer>';
    });
})();
