// =====================
// TV‑Tablå Script (VG) 
// =====================

// Håller aktuell kanal och status för tidigare program
let selectedChannel = "SVT 1";
let showPrevious = false;

// =====================
// ANIMATION KONSTANTER
// =====================
const ANIMATION = {
  NONE: 0,
  TIMER: 1,        // Timer-baserad animation
  ALTERNATIVE: 2   // CSS-transition animation
};
let animationMethod = ANIMATION.TIMER; // Ändra till ALTERNATIVE för CSS

// Ladda första kanalen när sidan är klar
window.addEventListener("load", () => {
  loadData();
});

// =====================
// HÄMTA OCH RENDERA DATA
// =====================
function loadData() {
  const loadingSpinner = document.getElementById("js-loading");
  loadingSpinner.classList.remove("hidden");

  setTimeout(() => {
    fetch(`data/${selectedChannel}.json`) // FIXAD PATH
      .then((res) => res.json())
      .then((data) => render(data))
      .catch(() => loadingSpinner.classList.add("hidden"));
  }, 500); // kort delay för spinner-effekt
}

// =====================
// MENY TOGGLE + ARIA + TABINDEX
// =====================
function toggleMenu() {
  const menu = document.getElementById("main-menu");
  const toggle = document.getElementById("menu-toggle");
  const buttons = menu.querySelectorAll("button");
  const isOpen = toggle.getAttribute("aria-expanded") === "true";

  if (animationMethod === ANIMATION.TIMER) {
    animateMenuTimer(!isOpen);
  } else if (animationMethod === ANIMATION.ALTERNATIVE) {
    animateMenuAlternative(!isOpen);
  }

  if (isOpen) {
    menu.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    buttons.forEach((btn) => btn.setAttribute("tabindex", "-1"));
  } else {
    menu.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    buttons.forEach((btn) => btn.removeAttribute("tabindex"));
    buttons[0].focus(); // sätt fokus på första knapp
  }
}

// =====================
// TIMER-BASERAD ANIMATION
// =====================
function animateMenuTimer(show) {
  const menu = document.getElementById("main-menu");
  const menuIcon = document.getElementById("menu-toggle").querySelector("i");

  // Byt ikon (hamburgare ↔ kryss)
  menuIcon.classList.remove(show ? "fa-bars" : "fa-times");
  menuIcon.classList.add(show ? "fa-times" : "fa-bars");

  let left = show ? -300 : 0;
  const interval = setInterval(() => {
    left = left + (show ? 10 : -10);
    menu.style.left = left + "px";
    if ((show && left >= 0) || (!show && left <= -300)) clearInterval(interval);
  }, 10);
}

// =====================
// CSS-TRANSITION (ALTERNATIVE) ANIMATION
// =====================
function animateMenuAlternative(show) {
  const menu = document.getElementById("main-menu");
  menu.style.left = show ? "0px" : "-300px";

  const menuIcon = document.getElementById("menu-toggle").querySelector("i");
  menuIcon.classList.remove(show ? "fa-bars" : "fa-times");
  menuIcon.classList.add(show ? "fa-times" : "fa-bars");
}

// =====================
// BYT KANAL
// =====================
function setChannel(channel) {
  selectedChannel = channel;
  showPrevious = false;
  toggleMenu();
  loadData();
}

// =====================
// HJÄLP: FORMATERA TID
// =====================
function formatDate(date) {
  return new Date(date).toTimeString().slice(0, 5);
}

// =====================
// RENDERING AV SCHEMA
// =====================
function render(schedule) {
  const wrapper = document.getElementById("js-schedule");
  const spinner = document.getElementById("js-loading");
  spinner.classList.add("hidden");
  document.getElementById("js-title").textContent = selectedChannel;

  // Sortera programmen kronologiskt
  schedule.sort((a, b) => new Date(a.start) - new Date(b.start));

  // Filtrera bort tidigare program om showPrevious = false
  if (!showPrevious) {
    const now = new Date();
    schedule = schedule.filter((s) => new Date(s.start) > now);
  }

  // Bygg HTML
  let html = '<ul class="list-group list-group-flush">';
  if (!showPrevious) {
    html += `<li class="list-group-item show-previous">
      <button onclick="showPrevious=true; loadData()">Visa tidigare program</button>
    </li>`;
  }

  html += schedule
    .map(
      (s) => `
      <li class="list-group-item list-item-flex">
        <div class="time">${formatDate(s.start)}</div>
        <div class="program-name">${s.name}</div>
      </li>`
    )
    .join("");

  html += "</ul>";
  wrapper.innerHTML = html;
}
