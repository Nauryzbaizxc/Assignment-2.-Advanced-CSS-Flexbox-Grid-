/* Sound Stage - form validation (Assignment 5)
   Works with HTML5 validation attributes (required, minlength, maxlength, type="email")
   and Bootstrap's .is-valid / .is-invalid classes. Feedback is recalculated from the
   field's real state each time, never hard-coded. */
(function () {
  'use strict';

  var FIELD_SELECTOR = '.form-control, .form-select';

  /* HTML5 attributes cannot compare two fields, so the password match is done in JS. */
  var pass = document.getElementById('password');
  var confirmPass = document.getElementById('confirmPassword');
  var confirmMsg = document.getElementById('confirmPasswordError');
  var DEFAULT_CONFIRM_MSG = confirmMsg ? confirmMsg.textContent : '';

  function matchPasswords() {
    if (!pass || !confirmPass) return;
    if (confirmPass.value !== '' && confirmPass.value !== pass.value) {
      confirmPass.setCustomValidity('Пароли не совпадают.');
      confirmMsg.textContent = 'Пароли не совпадают.';
    } else {
      confirmPass.setCustomValidity('');   /* clears the error after correction */
      confirmMsg.textContent = DEFAULT_CONFIRM_MSG;
    }
  }

  function fieldsOf(form) {
    return Array.prototype.slice.call(form.querySelectorAll(FIELD_SELECTOR));
  }

  /* Text fields: a value made only of spaces does not count as filled in. */
  function checkBlank(el) {
    var isText = el.tagName === 'TEXTAREA' || el.type === 'text';
    if (!isText) return;
    var minLen = parseInt(el.getAttribute('minlength') || '0', 10);
    if (el.value !== '' && el.value.trim().length < minLen) {
      el.setCustomValidity('Слишком короткое значение (пробелы не считаются).');
    } else {
      el.setCustomValidity('');
    }
  }

  /* Show valid / invalid state based on the browser's own validity result. */
  function paint(el) {
    checkBlank(el);
    var ok = el.checkValidity();
    el.classList.toggle('is-valid', ok);
    el.classList.toggle('is-invalid', !ok);
  }

  function clearPaint(form) {
    fieldsOf(form).forEach(function (el) {
      el.classList.remove('is-valid', 'is-invalid');
      el.setCustomValidity('');
    });
  }

  function validateAll(form) {
    var firstBad = null;
    fieldsOf(form).forEach(function (el) {
      matchPasswords();
      paint(el);
      if (!el.checkValidity() && !firstBad) firstBad = el;
    });
    return firstBad;
  }

  function attachLive(form) {
    fieldsOf(form).forEach(function (el) {
      var evt = el.tagName === 'SELECT' ? 'change' : 'input';
      el.addEventListener(evt, function () { paint(el); });
      el.addEventListener('blur', function () { if (el.value !== '') paint(el); });
    });
  }

  /* ---------- Contact form ---------- */
  var contact = document.getElementById('contactForm');
  if (contact) {
    var message = document.getElementById('contactMessage');
    var counter = document.getElementById('messageCounter');
    var contactOk = document.getElementById('contactSuccess');

    function updateCounter() {
      counter.textContent = message.value.length + ' / ' + message.maxLength;
    }
    message.addEventListener('input', updateCounter);
    updateCounter();

    attachLive(contact);

    contact.addEventListener('submit', function (e) {
      e.preventDefault();
      contactOk.hidden = true;
      var bad = validateAll(contact);
      if (bad) { bad.focus(); return; }
      contactOk.hidden = false;
    });

    contact.addEventListener('reset', function () {
      setTimeout(function () {
        clearPaint(contact);
        contactOk.hidden = true;
        updateCounter();
      }, 0);
    });
  }

  /* ---------- Registration form ---------- */
  var reg = document.getElementById('registerForm');
  if (reg) {
        var regOk = document.getElementById('registerSuccess');

    attachLive(reg);
    pass.addEventListener('input', function () {
      matchPasswords();
      if (confirmPass.value !== '') paint(confirmPass);
    });
    confirmPass.addEventListener('input', function () {
      matchPasswords();
      paint(confirmPass);
    });

    reg.addEventListener('submit', function (e) {
      e.preventDefault();
      regOk.hidden = true;
      var bad = validateAll(reg);
      if (bad) { bad.focus(); return; }
      regOk.hidden = false;
    });

    reg.addEventListener('reset', function () {
      setTimeout(function () {
        clearPaint(reg);
        confirmMsg.textContent = DEFAULT_CONFIRM_MSG;
        regOk.hidden = true;
      }, 0);
    });
  }
})();
