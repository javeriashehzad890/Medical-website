const form = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");
const discountMessage = document.getElementById("discount-message");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const birthYearText = document.getElementById("birth-year").value.trim();
  formSuccess.hidden = true;
  discountMessage.hidden = true;

  if (username === "" || email === "") {
    formSuccess.textContent = "Please fill in both your username and email.";
    formSuccess.style.color = "#b00020";
    formSuccess.hidden = false;
    return;
  }

  if (birthYearText !== "") {
    const birthYear = parseInt(birthYearText);
    const currentYear = new Date().getFullYear();
    if (isNaN(birthYear) || birthYear < 1900 || birthYear > currentYear) {
      formSuccess.textContent = "Please enter a valid birth year (e.g. 2002).";
      formSuccess.style.color = "#b00020";
      formSuccess.hidden = false;
      return;
    }
    const age = currentYear - birthYear;
    if (age <= 25) {
      discountMessage.textContent = "You are " + age + " years old. You qualify for the student discount!";
    } else if (age >= 60) {
      discountMessage.textContent = "You are " + age + " years old. You qualify for the senior discount!";
    } else {
      discountMessage.textContent = "You are " + age + " years old. Sorry, you do not qualify for a discount.";
    }
    discountMessage.hidden = false;
  }

  formSuccess.textContent = "Thank you for visiting, " + username + "! We will contact you at " + email + ".";
  formSuccess.style.color = "";
  formSuccess.hidden = false;
});

const tableRows = document.querySelectorAll("tbody tr");
tableRows.forEach(function (row) {
  row.addEventListener("mouseover", function () {
    row.classList.add("row-highlight");
  });
  row.addEventListener("mouseout", function () {
    row.classList.remove("row-highlight");
  });
});

const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", function () {
  const isDark = document.body.classList.toggle("dark-mode");
  themeToggle.setAttribute("aria-pressed", isDark);
});

const serviceBoxes = document.querySelectorAll(".service-checkbox");
const totalText = document.getElementById("total");
function updateTotal() {
  let total = 0;
  serviceBoxes.forEach(function (box) {
    if (box.checked) {
      total += parseInt(box.dataset.price);
    }
  });
  totalText.textContent = "Total: $" + total;
}
serviceBoxes.forEach(function (box) {
  box.addEventListener("change", updateTotal);
});

const readMoreBtn = document.getElementById("read-more");
const aboutExtra = document.getElementById("about-extra");
readMoreBtn.addEventListener("click", function () {
  const wasHidden = aboutExtra.hidden;
  aboutExtra.hidden = !wasHidden;
  readMoreBtn.textContent = wasHidden ? "Read Less" : "Read More";
  readMoreBtn.setAttribute("aria-expanded", wasHidden);
});

const filterButtons = document.querySelectorAll(".filter-button");
const cards = document.querySelectorAll(".card");
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selected = button.dataset.filter;
    filterButtons.forEach(function (b) {
      b.classList.remove("active");
    });
    button.classList.add("active");
    cards.forEach(function (card) {
      if (selected === "all" || card.dataset.category === selected) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});

const statusBanner = document.getElementById("status-banner");
const hour = new Date().getHours();
if (hour >= 8 && hour < 20) {
  statusBanner.textContent = "We are Open!";
  statusBanner.style.color = "#4ade80";
} else {
  statusBanner.textContent = "Closed - Open at 8 AM";
  statusBanner.style.color = "#ff6b6b";
}

const specialNotes = document.getElementById("special-notes");
const notesCount = document.getElementById("notes-count");
const maxChars = 100;
specialNotes.addEventListener("input", function () {
  const remaining = maxChars - specialNotes.value.length;
  notesCount.textContent = remaining + " characters remaining";
});