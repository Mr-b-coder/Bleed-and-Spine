# Bleed & Spine — landing page

Static site (HTML, CSS, JS) for Bleed & Spine: print-ready book files, layout and covers for self-publishing authors in the US & UK.

## Before going live
- Replace the `$XX` / `£XX` price placeholders in `index.html`.
- Swap the three before/after placeholder slots in the **Work** section for real images (put them in `assets/`).
- Fill in payment methods in the FAQ.

## Deploy on Netlify
1. Push this repo to GitHub.
2. In Netlify: **Add new site → Import an existing project → GitHub**, pick this repo.
3. Leave build command empty; publish directory is `.` (already set in `netlify.toml`).
4. The contact form uses **Netlify Forms**: submissions appear under *Site → Forms*. Turn on email notifications there.
