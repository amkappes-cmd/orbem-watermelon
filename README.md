# Genus Echo — Watermelon Landing Page

A single-page marketing site for **Genus Echo**, Orbem's industrial-scale MRI scanner for
watermelon producers. Static HTML/CSS/JS — no build step, no dependencies.

## Structure

```
index.html          All page content (14 sections)
styles.css          Orbem brand system — Rethink Sans + IBM Plex Mono; indigo/grapefruit/honey
script.js           Nav glass-on-scroll, scroll reveal, FAQ accordion, value chart, video fallback
assets/
  favicon.svg
  img/              Logos, hero photo↔MRI comparison, MRI card, line-flow diagram
  video/            demo.mp4 + demo.mov (13-second scanner demo, provided under both containers)
.nojekyll           Tells GitHub Pages to serve files as-is
```

Fonts load from Google Fonts. Primary CTA points to the booking link
`https://calendar.app.google/1pP3A1nvstA7CGHr8`.

## Preview locally

```bash
cd genus-echo
python3 -m http.server 8756
```

Then open <http://localhost:8756>.

## Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g. `genus-echo`).
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Genus Echo watermelon landing page"
   git branch -M main
   git remote add origin https://github.com/<your-username>/genus-echo.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source: Deploy from a branch**, **Branch: `main` / `root`**, then **Save**.
5. Your site goes live at `https://<your-username>.github.io/genus-echo/` within a minute or two.

To serve it at the domain root instead (`https://<your-username>.github.io/`), name the repo
`<your-username>.github.io`.

## Notes

- The demo clip is H.264/AAC. It's shipped as both `demo.mp4` and `demo.mov` so every browser can
  play it inline; `script.js` shows an "Open the demo" link as a last-resort fallback. The browser
  downloads only the one source it can play.
- The five-year value chart is an illustrative cumulative curve anchored on the stated figures
  ($300k/season, $1.7M net over five years, up to $7M total value). Adjust the `data-h` values on
  the `.bar` elements in `index.html` to re-shape it.
- All customer references are anonymized, per the content brief.
