/**
 * Submit inquiry via FormSubmit, then redirect locally (no _next in email).
 */
(function () {
  var form = document.getElementById('inquiry-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var button = form.querySelector('button[type="submit"]');
    if (button) button.disabled = true;

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    }).finally(function () {
      window.location.href = '/html/thank-you-submission.html';
    });
  });
})();
