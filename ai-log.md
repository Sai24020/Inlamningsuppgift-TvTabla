# HTML Accessibility & Structure Fixes for TV-Tablå Project

## Problem Summary

The TV-Tablå application lacks proper HTML semantic structure and accessibility features, causing issues for keyboard users and screen-reader users.

# AI-logg – TV‑Tablå‑projektet

> **Syfte:** Dokumentera hur AI har använts i projektet samt, för **VG**, kritiskt värdera minst ett AI‑förslag och motivera beslut.

---

## Prompt 1: “Document should have one main landmark – hur kan man fixa det?”

**AI‑svar (sammanfattning):**
**Plan: Enforce one main landmark**  
TL;DR — Förbättra HTML‑struktur och semantik så att sidan har **exakt ett `<main>`‑landmärke**, kompletterat med semantisk `<header>`/`<nav>`, tillgängliga kontroller (buttons/länkar) samt mindre ARIA‑ och fokusfixar. Detta förbättrar tangentbordsnavigering, skärmläsarstöd och HTML‑validitet.

**Åtgärd i projektet:**

* Allt huvudinnehåll lades i `<main id="main-content">`.
* Meny placerades i `<header>` och `<nav>`.

---

## Prompt 2: “Kolla min `index.html`, föreslå lösningar och uppdatera ai‑logg med sammanfattning”

**AI‑analys (problem som identifierades):**

1. Saknat `<main>`‑landmärke (tillgänglighet)
2. Meny utan semantiska landmärken (`<div>` + `<ul>`)
3. Menyknapp var en `<div onclick>` (ej tangentbordstillgänglig)
4. Menyval var `<li onclick>` (ej fokuserbara)
5. Saknad skip‑link
6. Fetch använde absolut sökväg `/data/...` (problem lokalt/GitHub Pages)
7. Script laddades med `async` i `<head>` (risk att DOM ej är redo)
8. Saknade tydliga fokusstilar

**Föreslagna förbättringar (sammanfattning):**

* Byt `async` → `defer` för script
* Inför `<header>`, `<nav>`, `<main>`
* Ersätt klickbara `<div>`/`<li>` med `<button>`
* Lägg till skip‑link till huvudinnehåll
* Använd relativ fetch‑sökväg `data/...`
* Hantera `aria-expanded` / `aria-hidden` i meny‑toggle
* Lägg till synliga fokusstilar i CSS

---

## Prompt 3: “Fixa implementation checklist och spara i ai‑logg”

### Implementation Checklist (status)

* [x] Update script tag: `async` → `defer`
* [x] Wrap menu in `<header>` and `<nav>`
* [x] Replace `<div class="menu-icon">` with semantic `<button>`
* [x] Wrap content in `<main id="main-content">`
* [x] Add skip link `<a>` element
* [x] Change fetch path: `/data/` → `data/`
* [x] Add `aria-expanded` / `aria-hidden` management in `toggleMenu()`
* [x] Add focus styles in CSS

---

## Kritisk värdering av AI‑förslag (krav för VG)

### Förslag som granskades

AI föreslog att **alla menyval skulle göras som `<button>`‑element inuti `<li>`** för maximal tangentbords‑ och skärmläsartillgänglighet.

### Min bedömning

Jag **accepterade förslaget**, men med en medveten avgränsning:

* `<button>` är korrekt när ett val **utlöser JavaScript‑logik** (byt TV‑kanal) snarare än navigerar till ny sida.
* För detta projekt, där menyvalen laddar data dynamiskt via `fetch`, är `<button>` mer semantiskt korrekt än `<a>`.

### Alternativ som övervägdes

* `<a href="#">` med `preventDefault()`  
  * **Avvisades**, eftersom länkar semantiskt signalerar navigering mellan resurser, inte UI‑handlingar.

### Slutsats

AI‑förslaget låg i linje med **WCAG 2.1 AA** och modern HTML‑semantik. Genom att använda `<button>` förbättrades:

* Tangentbordsåtkomst
* Skärmläsarens roll‑tolkning
* Kodens framtida underhållbarhet

Detta visar att AI‑förslag **inte bara följdes blint**, utan analyserades och valdes utifrån projektets kontext.

---

## Tester & validering

* **Lighthouse (Chrome DevTools)** – förbättrad Accessibility‑score
* **W3C HTML Validator** – inga strukturella fel
* **Manuell testning** – full navigering via tangentbord

---

## Sammanfattning

AI användes som **stöd för analys och förbättringsförslag**, medan slutliga beslut togs av mig efter:

* Tillgänglighetsprinciper
* Projektkrav
* Semantisk korrekthet

Loggen uppfyller kraven för **VG** genom både dokumentation och kritisk värdering av AI‑förslag.
---------------------------------------------------------------
---------------------------------------------------------------

# Prompt1: Document should have one main landmark hur kan man fixa det ge förslag..

svara:
Plan: Enforce one main landmark
TL;DR — Fix HTML structure and semantics so the page has a single <main> landmark, a semantic <header>/<nav> for the menu, accessible controls (buttons/links), and small ARIA/focus fixes. These changes improve keyboard access, screen-reader navigation, and HTML validity.

# Prompt2: kolla på min code i index.html file efter lös problem och sen uppdate i min ai-log.md sammanfatning med tips och spara det.

svara:

I'm in planning mode, so I'll analyze the code and provide a detailed summary with fixes you can apply. Let me first read the current state of your files.

Now I'll provide a detailed summary with concrete fixes and tips for your ai-log.md file:

Summary of Issues Found in Your Code
Problems identified:

Missing <main> landmark — Content is not wrapped in a <main> element (accessibility issue)
Menu not semantic — Menu is a plain <div> and <ul> without <header>/<nav> landmarks
Non-interactive menu toggle — div.menu-icon with onclick is not keyboard accessible (should be <button>)
Menu items not interactive — <li> elements with onclick are not focusable (should be <button> or <a>)
Missing skip link — No way for keyboard users to skip the menu
Fetch path issue — fetch('/data/...') uses absolute path; relative path data/... works better locally
Script async timing — async script in head may run before DOM is ready; defer is safer
No focus styles — Keyboard users can't see which element has focus

