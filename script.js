let selectedChannel = "SVT 1";
let showPrevious = false;

// Ladda första kanalen när sidan är klar
window.addEventListener("load", () => {
  loadData();
});

function loadData() {
  const loadingSpinner = document.getElementById("js-loading");
  loadingSpinner.classList.remove("hidden");

  setTimeout(() => {
    fetch(`data/${selectedChannel}.json`) // FIXAD PATH
      .then((res) => res.json())
      .then((data) => render(data))
      .catch(() => loadingSpinner.classList.add("hidden"));
  }, 500);
}

// MENY TOGGLE – ARIA + FOKUS
function toggleMenu() {
  const menu = document.getElementById("main-menu");
  const toggle = document.getElementById("menu-toggle");
  const buttons = menu.querySelectorAll("button");

  const isOpen = toggle.getAttribute("aria-expanded") === "true";

  if (isOpen) {
    menu.classList.remove("menu--show");
    menu.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    buttons.forEach((btn) => btn.setAttribute("tabindex", "-1"));
  } else {
    menu.classList.add("menu--show");
    menu.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    buttons.forEach((btn) => btn.removeAttribute("tabindex"));
    buttons[0].focus();
  }
}

function setChannel(channel) {
  selectedChannel = channel;
  showPrevious = false;
  toggleMenu();
  loadData();
}

function formatDate(date) {
  return new Date(date).toTimeString().slice(0, 5);
}

function render(schedule) {
  document.getElementById("js-title").textContent = selectedChannel;
  const wrapper = document.getElementById("js-schedule");
  const spinner = document.getElementById("js-loading");

  spinner.classList.add("hidden");

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
