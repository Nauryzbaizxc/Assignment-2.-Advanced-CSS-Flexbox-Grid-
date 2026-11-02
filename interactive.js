$(document).ready(function () {
    var $themeBtn = $("#themeBtn");
    $themeBtn.off("click").on("click", function (e) {
        e.preventDefault();
        $("body").toggleClass("light-theme");
        var isLight = $("body").hasClass("light-theme");
        $themeBtn.text(isLight ? "Тёмная тема" : "Светлая тема");
        if ($("html").attr("data-bs-theme") !== undefined) {
            $("html").attr("data-bs-theme", isLight ? "light" : "dark");
        }
    });

    var $welcomeName = $("#welcomeName");
    var $welcomeBtn = $("#welcomeBtn");
    var $welcomeMessage = $("#welcomeMessage");

    $welcomeBtn.off("click").on("click", function (e) {
        e.preventDefault();
        var name = $welcomeName.val().trim();
        if (name === "") {
            $welcomeMessage.text("Пожалуйста, введите имя, и мы вас поприветствуем.");
        } else {
            $welcomeMessage.text("Добро пожаловать в Sound Stage, " + name + "! Выбирайте концерт ниже.");
        }
    });

    var $faqButtons = $(".faq-question");
    $faqButtons.off("click").on("click", function (e) {
        e.preventDefault();
        var $btn = $(this);
        var targetId = $btn.attr("aria-controls");
        var $answer = $("#" + targetId);
        
        if ($answer.is(":hidden") || $answer.attr("hidden")) {
            $answer.removeAttr("hidden").hide().slideDown(300, function () {
                $btn.attr("aria-expanded", "true");
            });
        } else {
            $answer.slideUp(300, function () {
                $(this).attr("hidden", "hidden");
                $btn.attr("aria-expanded", "false");
            });
        }
    });

    var $searchInput = $("#searchInput");
    var $searchCount = $("#searchCount");
    var $searchEmpty = $("#searchEmpty");
    var $eventCards = $(".events-grid .event-card");

    function filterEvents() {
        var query = $searchInput.val().trim().toLowerCase();
        var shown = 0;

        $eventCards.each(function () {
            var $card = $(this);
            var title = $card.find("h3").text().toLowerCase();

            if (title.indexOf(query) !== -1) {
                $card.show();
                shown++;
            } else {
                $card.hide();
            }
        });

        if ($searchCount.length) {
            $searchCount.text("Найдено: " + shown + " из " + $eventCards.length);
        }
        if ($searchEmpty.length) {
            if (shown === 0) {
                $searchEmpty.removeAttr("hidden").show();
            } else {
                $searchEmpty.attr("hidden", "hidden").hide();
            }
        }
    }

    if ($searchInput.length) {
        $searchInput.off("input").on("input", filterEvents);
    }

    var $wishForm = $("#wishForm");
    var $wishInput = $("#wishInput");
    var $wishList = $("#wishList");
    var $wishCount = $("#wishCount");
    var $wishError = $("#wishError");

    function updateWishCount() {
        if ($wishCount.length) {
            var count = $wishList.children("li").length;
            $wishCount.text("В списке: " + count);
        }
    }

    if ($wishForm.length) {
        $wishForm.off("submit").on("submit", function (e) {
            e.preventDefault();
            var text = $wishInput.val().trim();

            if (text === "") {
                if ($wishError.length) {
                    $wishError.removeAttr("hidden").show();
                }
                return;
            }
            if ($wishError.length) {
                $wishError.attr("hidden", "hidden").hide();
            }

            var $item = $("<li></li>");
            var $itemText = $("<span></span>").text(text);
            var $removeBtn = $("<button></button>")
                .attr("type", "button")
                .addClass("btn btn-secondary")
                .text("Удалить")
                .attr("aria-label", "Удалить: " + text);

            $item.append($itemText, $removeBtn);
            $wishList.append($item);

            $wishInput.val("").focus();
            updateWishCount();
        });

        $wishList.off("click", ".btn-secondary").on("click", ".btn-secondary", function () {
            $(this).closest("li").remove();
            updateWishCount();
        });

        updateWishCount();
    }
});