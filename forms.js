$(document).ready(function () {
    var $pass = $("#password");
    var $confirmPass = $("#confirmPassword");
    var $confirmMsg = $("#confirmPasswordError");
    var defaultConfirmMsg = $confirmMsg.length ? $confirmMsg.text() : "";

    function matchPasswords() {
        if (!$pass.length || !$confirmPass.length) return;
        if ($confirmPass.val() !== "" && $confirmPass.val() !== $pass.val()) {
            $confirmPass[0].setCustomValidity("Пароли не совпадают.");
            $confirmMsg.text("Пароли не совпадают.");
        } else {
            $confirmPass[0].setCustomValidity("");
            $confirmMsg.text(defaultConfirmMsg);
        }
    }

    function checkBlank($el) {
        var isText = $el.is("textarea") || $el.attr("type") === "text";
        if (!isText) return;
        var minLen = parseInt($el.attr("minlength") || "0", 10);
        if ($el.val() !== "" && $el.val().trim().length < minLen) {
            $el[0].setCustomValidity("Слишком короткое значение.");
        } else {
            $el[0].setCustomValidity("");
        }
    }

    function paint($el) {
        checkBlank($el);
        var ok = $el[0].checkValidity();
        $el.toggleClass("is-valid", ok);
        $el.toggleClass("is-invalid", !ok);
    }

    function clearPaint($form) {
        $form.find(".form-control, .form-select").each(function () {
            var $el = $(this);
            $el.removeClass("is-valid is-invalid");
            $el[0].setCustomValidity("");
        });
    }

    function validateAll($form) {
        var firstBad = null;
        $form.find(".form-control, .form-select").each(function () {
            var $el = $(this);
            matchPasswords();
            paint($el);
            if (!$el[0].checkValidity() && !firstBad) {
                firstBad = $el;
            }
        });
        return firstBad;
    }

    function attachLive($form) {
        $form.find(".form-control, .form-select").each(function () {
            var $el = $(this);
            var evt = $el.is("select") ? "change" : "input";
            $el.on(evt, function () { paint($el); });
            $el.on("blur", function () { if ($el.val() !== "") paint($el); });
        });
    }

    var $contact = $("#contactForm");
    if ($contact.length) {
        var $message = $("#contactMessage");
        var $counter = $("#messageCounter");
        var $contactOk = $("#contactSuccess");

        function updateCounter() {
            if ($counter.length && $message.length) {
                $counter.text($message.val().length + " / " + $message.attr("maxlength"));
            }
        }
        
        if ($message.length) {
            $message.on("input", updateCounter);
            updateCounter();
        }

        attachLive($contact);

        $contact.on("submit", function (e) {
            e.preventDefault();
            $contactOk.attr("hidden", true).hide();
            var $bad = validateAll($contact);
            if ($bad) {
                $bad.focus();
                return;
            }
            $contactOk.removeAttr("hidden").show();
        });

        $contact.on("reset", function () {
            setTimeout(function () {
                clearPaint($contact);
                $contactOk.attr("hidden", true).hide();
                updateCounter();
            }, 0);
        });
    }

    var $reg = $("#registerForm");
    if ($reg.length) {
        var $regOk = $("#registerSuccess");

        attachLive($reg);
        
        if ($pass.length && $confirmPass.length) {
            $pass.on("input", function () {
                matchPasswords();
                if ($confirmPass.val() !== "") paint($confirmPass);
            });
            $confirmPass.on("input", function () {
                matchParser = matchPasswords();
                paint($confirmPass);
            });
        }

        $reg.on("submit", function (e) {
            e.preventDefault();
            $regOk.attr("hidden", true).hide();
            var $bad = validateAll($reg);
            if ($bad) {
                $bad.focus();
                return;
            }
            $regOk.removeAttr("hidden").show();
        });

        $reg.on("reset", function () {
            setTimeout(function () {
                clearPaint($reg);
                if ($confirmMsg.length) $confirmMsg.text(defaultConfirmMsg);
                $regOk.attr("hidden", true).hide();
            }, 0);
        });
    }
});