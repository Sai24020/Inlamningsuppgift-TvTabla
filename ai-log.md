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

# HTML Accessibility & Structure Fixes for TV-Tablå Project

## Problem Summary

The TV-Tablå application lacks proper HTML semantic structure and accessibility features, causing issues for keyboard users and screen-reader users.

## Issues Identified

1. **Missing `<main>` landmark** - Content not wrapped in semantic `<main>` (required for accessibility)
2. **Menu structure** - Plain `<div>` instead of `<header>`/`<nav>` landmarks
3. **Non-semantic controls** - Menu toggle is `<div onclick>` (not keyboard accessible); menu items are `<li onclick>` (not focusable)
4. **No skip link** - Keyboard users can't jump to main content
5. **Fetch path** - Uses `/data/...` (absolute) instead of relative `data/...` (breaks on local file server)
6. **Script timing** - `async` in head may run before DOM; should use `defer`
7. **Missing focus styles** - No visible focus indicator for keyboard users

## Fixes to Apply

### Fix 1: Change `<script async>` to `<script defer>` in `<head>`

**File:** `index.html`  
**Change:**

```html
<script defer src="script.js"></script>
```

### Fix 2: Update HTML structure with `<header>`, `<nav>`, `<main>`

**File:** `index.html`  
**Change entire `<body>` to:**

```html
<body>
  <!-- Skip link for keyboard users -->
  <a href="#main-content" class="skip-link">Hoppa till huvudinnehåll</a>

  <!-- Header with navigation -->
  <header>
    <button
      class="menu-icon"
      id="menu-toggle"
      aria-label="Slå på/av meny"
      aria-expanded="false"
    >
      <i class="fas fa-bars"></i>
    </button>
    <nav class="menu" id="main-menu" aria-hidden="true">
      <ul>
        <li><button onclick="setChannel('SVT 1')">SVT 1</button></li>
        <li><button onclick="setChannel('SVT 2')">SVT 2</button></li>
        <li><button onclick="setChannel('SVT Barn')">SVT Barn</button></li>
        <li>
          <button onclick="setChannel('Kunskapskanalen')">
            Kunskapskanalen
          </button>
        </li>
        <li><button onclick="setChannel('SVT 24')">SVT 24</button></li>
      </ul>
    </nav>
  </header>

  <!-- Main content -->
  <main id="main-content">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 offset-sm-2 container-js">
          <h1 id="js-title">SVT</h1>
          <div id="js-schedule"></div>
          <img
            src="loading.gif"
            id="js-loading"
            class="loading-spinner hidden"
            alt="Laddar TV-tablå"
          />
        </div>
      </div>
    </div>
  </main>
</body>
```

### Fix 3: Update `script.js` - Change fetch path and improve menu toggle

**File:** `script.js`

**Change 1 - Fetch path (around line 26):**

```javascript
// From:
fetch(`/data/${selectedChannel}.json`);
// To:
fetch(`data/${selectedChannel}.json`);
```

**Change 2 - Update toggleMenu() function to manage ARIA attributes:**

```javascript
function toggleMenu() {
  const menu = getMenu();
  const toggle = document.getElementById("menu-toggle");
  const isOpen = toggle.getAttribute("aria-expanded") === "true";

  if (isOpen) {
    animateMenu(false);
    toggle.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
  } else {
    animateMenu(true);
    toggle.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
  }
}
```

### Fix 4: Add focus styles in `style.css`

**File:** `style.css`  
**Add at the end:**

```css
/* Skip link - visible on focus */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}

/* Ensure all interactive elements have visible focus */
button:focus,
a:focus,
.menu li button:focus {
  outline: 3px solid #4caf50;
  outline-offset: 2px;
}
```

## Implementation Checklist

- [ ] Update script tag: `async` → `defer`
- [ ] Wrap menu in `<header>` and `<nav>`
- [ ] Replace `<div class="menu-icon">` with semantic `<button>`
- [ ] Wrap content in `<main id="main-content">`
- [ ] Add skip link `<a>` element
- [ ] Change fetch path: `/data/` → `data/`
- [ ] Add aria-expanded/aria-hidden management in script toggleMenu()
- [ ] Add focus styles in CSS

## Testing & Validation

### Local Server

```bash
python -m http.server 8000
# Then visit: http://localhost:8000
```

### Browser Tools

- Chrome DevTools → Lighthouse tab (Accessibility audit)
- axe DevTools extension (accessibility checker)
- WAVE browser extension (WebAIM accessibility scanner)

### Validators

- HTML: https://validator.w3.org/nu/
- ARIA: https://wave.webaim.org/

## Best Practices Applied

✅ **Semantic HTML** - Use `<header>`, `<nav>`, `<main>`, `<button>` instead of divs with onclick  
✅ **Keyboard Navigation** - All interactive elements are focusable and keyboard operable  
✅ **ARIA Attributes** - Use `aria-expanded`, `aria-hidden`, `aria-label` for dynamic UI  
✅ **Fetch Paths** - Relative paths work consistently across environments  
✅ **Script Loading** - `defer` ensures DOM is ready before script runs  
✅ **Focus Management** - Visible focus styles for all keyboard users  
✅ **Accessibility Standards** - Complies with WCAG 2.1 Level AA guidelines
