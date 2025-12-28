// Håller programdata och aktuell kanal
let data = [];
let selectedChannel = "SVT 1";
let showPrevious = false;

// Hjälpfunktion för att hämta meny-elementet
const getMenu = () => document.querySelector(".menu");

// När sidan laddats klart → hämta första datan
window.addEventListener("load", () => {
  loadData();
});

function loadData() {
  const loadingSpinner = document.querySelector("#js-loading");

  // Visa "loading"-bild direkt
  loadingSpinner.classList.remove("hidden");

  // Vänta lite (t.ex. 1 sekund) innan du börjar hämta data
  setTimeout(() => {
    fetch(`/data/${selectedChannel}.json`)
      .then((res) => res.json())
      .then((data) => {
        // När datan är hämtad → rendera
        render(data);
      })
      .catch((err) => {
        console.error("Fel vid hämtning:", err);
        // Göm "loading"-bilden även vid fel
        loadingSpinner.classList.add("hidden");
      });
  }, 1000); // <-- antal millisekunder att vänta (1000 = 1 sekund)
}

// Kontrollera om menyn är öppen
function isMenuOpen() {
  const menu = getMenu();
  return menu.style.left === '0px';
}

// Öppna/stäng meny med animation
function toggleMenu() {
  if (isMenuOpen()) {
    animateMenu(false);
  } else {
    animateMenu(true);
  }
}

// Enkel animering för menyöppning/stängning
function animateMenu(show) {
  const menu = document.querySelector(".menu");
  const menuIcon = document.querySelector(".menu-icon > i");

  // Byt ikon (hamburgare ↔ kryss)
  menuIcon.classList.remove(show ? "fa-bars" : "fa-times");
  menuIcon.classList.add(show ? "fa-times" : "fa-bars");
  
  let left = show ? -300 : 0;
  const interval = setInterval(() => {
    left = left + (show ? 10 : -10);
    menu.style.left = left + "px";
    if ((show && left === 0) || (!show && left === -300)) {
      clearInterval(interval);
    }
  }, 10);
}

// Byt kanal och ladda dess programdata
function setChannel(channel) {
  selectedChannel = channel;
  showPrevious = false;
  animateMenu(false);
  loadData();
}

// Formatera datum till HH:MM
function formatDate(date) {
  date = new Date(date);
  return date.toTimeString().substr(0, 5);
}

// Hjälpfunktion: returnerar endast tid (utan datum)
function getTimeOnly(date) {
  let timeOnly = new Date(0);
  timeOnly = new Date(timeOnly.setHours(date.getHours()));
  timeOnly = new Date(timeOnly.setMinutes(date.getMinutes()));
  return timeOnly;
}

// Renderar innehållet på sidan
function render(schedule) {
  // Visa aktuell kanal i rubriken
  document.querySelector("#js-title").innerHTML = selectedChannel;

  // Referenser till element
  const loadingSpinner = document.querySelector("#js-loading");
  const scheduleWrapper = document.querySelector("#js-schedule");

  if (schedule) {
    // Sortera schemat efter starttid
    schedule.sort((a, b) => new Date(a.start) > new Date(b.start) ? 1 : -1);

    // Visa bara framtida program om showPrevious = false
    if (!showPrevious) {
      schedule = schedule.filter(
        (s) => getTimeOnly(new Date(s.start)) > getTimeOnly(new Date())
      );
    }

    // Göm "loading"-bilden nu när datan är klar
    loadingSpinner.classList.add("hidden");

    // Bygg upp HTML-listan för programmen
    let scheduleHTML = '<ul class="list-group list-group-flush">';
    if (!showPrevious) {
      scheduleHTML +=
        '<li class="list-group-item show-previous" onclick="showPrevious=true; loadData();">Visa tidigare program</li>';
    }
    scheduleHTML += schedule
      .map(
        (s) =>
        `<li class="list-group-item list-item-flex">
         <div class="time">${formatDate(new Date(s.start))}</div>
         <div class="program-name">${s.name}</div>
         </li>`
      )
      .join("");
    scheduleHTML += "</ul>";

    // Lägg in i DOM
    scheduleWrapper.innerHTML = scheduleHTML;
  } else {
    // Ingen data ännu → visa "loading"-bild
    scheduleWrapper.innerHTML = "";
    loadingSpinner.classList.remove("hidden");
  }
}
