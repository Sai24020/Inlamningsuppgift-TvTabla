
> Tips: Alla nödvändiga filer (HTML, CSS, bilder, data) ska finnas i zip-filen för inlämning.

---

## 2. Git och commits

Det rekommenderas att arbeta **iterativt med små commits** för att kunna visa steg-för-steg hur projektet utvecklas.  

### Exempel på commits:

1. **Initial commit**  
   `git add .`  
   `git commit -m "Initial HTML setup with basic layout"`

2. **Lägga till Vue 3 via CDN**  
   `git commit -m "Added Vue 3 via CDN and mounted root app"`

3. **Skapa komponenter**  
   `git commit -m "Created Vue components: AppHeader, AppNav, ProgramList, Loader"`

4. **Tillgänglighet (A11y)**  
   `git commit -m "Added skip-link, aria-labels, and focus styles"`

5. **Fixa hamburgermeny**  
   `git commit -m "Fixed hamburger menu animation and show/hide behavior"`

6. **JSON-data integration**  
   `git commit -m "Integrated JSON schedule loading for dynamic program list"`

7. **Slutlig städning och inlämning**  
   `git commit -m "Final cleanup, ready for submission"`

---

### Tips

- Kontrollera alltid att alla filer som behövs finns med (`data/`, `loading.gif`, `style.css`, `index.html`).
- Kör `git status` för att se att inget saknas innan commit.
- Gör **små, tydliga commits** så att man kan följa utvecklingshistoriken.
- Zip hela projektmappen inklusive `.git`-katalogen för inlämning:

```bash
zip -r tv-tablå-projekt.zip tv-tablå-projekt/
