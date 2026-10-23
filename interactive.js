var themeBtn = document.getElementById("themeBtn");
 
if (themeBtn) {
  themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("light-theme");
 
    var isLight = document.body.classList.contains("light-theme");
 
    if (isLight) {
      themeBtn.textContent = "Тёмная тема";
    } else {
      themeBtn.textContent = "Светлая тема";
    }
    if (document.documentElement.hasAttribute("data-bs-theme")) {
      document.documentElement.setAttribute("data-bs-theme", isLight ? "light" : "dark");
    }
  });
}
 
var welcomeName = document.getElementById("welcomeName");
var welcomeBtn = document.getElementById("welcomeBtn");
var welcomeMessage = document.querySelector("#welcomeMessage");
 
if (welcomeBtn) {
  welcomeBtn.addEventListener("click", function () {
    var name = welcomeName.value.trim();
 
    if (name === "") {
      welcomeMessage.textContent = "Пожалуйста, введите имя, и мы вас поприветствуем.";
    } else {
      welcomeMessage.textContent = "Добро пожаловать в Sound Stage, " + name + "! Выбирайте концерт ниже.";
    }
  });
}

var faqButtons = document.querySelectorAll(".faq-question");
 
for (var i = 0; i < faqButtons.length; i++) {
  faqButtons[i].addEventListener("click", function () {
    var answer = document.getElementById(this.getAttribute("aria-controls"));
 
    answer.hidden = !answer.hidden;
 
    this.setAttribute("aria-expanded", String(!answer.hidden));
  });
}
 

var searchInput = document.getElementById("searchInput");
var searchCount = document.getElementById("searchCount");
var searchEmpty = document.getElementById("searchEmpty");
var eventCards = document.querySelectorAll(".events-grid .event-card");
 
function filterEvents() {
  var query = searchInput.value.trim().toLowerCase();
  var shown = 0;
 
  for (var i = 0; i < eventCards.length; i++) {
    var title = eventCards[i].querySelector("h3").textContent.toLowerCase();
 
    if (title.includes(query)) {
      eventCards[i].hidden = false;
      shown++;
    } else {
      eventCards[i].hidden = true;
    }
  }
 
  searchCount.textContent = "Найдено: " + shown + " из " + eventCards.length;
  searchEmpty.hidden = shown !== 0;
}
 
if (searchInput) {
  searchInput.addEventListener("input", filterEvents);
}
 
var wishForm = document.getElementById("wishForm");
var wishInput = document.getElementById("wishInput");
var wishList = document.getElementById("wishList");
var wishCount = document.getElementById("wishCount");
var wishError = document.getElementById("wishError");
 
function updateWishCount() {

  wishCount.textContent = "В списке: " + wishList.children.length;
}
 
if (wishForm) {
  wishForm.addEventListener("submit", function (event) {
    event.preventDefault(); 
 
    var text = wishInput.value.trim();
 
    if (text === "") {
      wishError.hidden = false;
      return;
    }
    wishError.hidden = true;
 
    var item = document.createElement("li");
 
    var itemText = document.createElement("span");
    itemText.textContent = text;
 
    var removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "btn btn-secondary";
    removeBtn.textContent = "Удалить";
    removeBtn.setAttribute("aria-label", "Удалить: " + text);
 
    removeBtn.addEventListener("click", function () {
      item.remove();
      updateWishCount();
    });
 
    item.append(itemText);
    item.append(removeBtn);
    wishList.append(item);
 
    wishInput.value = "";
    wishInput.focus();
    updateWishCount();
  });
 
  updateWishCount();
}