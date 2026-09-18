# Keerthi Rapolu — Portfolio

A single-page site for Keerthi Rapolu, Staff Data Engineer (Cloud FinOps / AI) at ServiceNow.

Plain HTML, CSS and JavaScript — no build step, no dependencies, no framework. It deploys anywhere
that serves static files and renders completely with JavaScript disabled.

**Live:** https://keerthi-rapolu.github.io/keerthi-portfolio/

## Running locally

```bash
python -m http.server 8000    # or: npx serve
```

## Structure

```
.
├── assets
│   ├── css/style.css     # Design tokens, editorial grid, responsive + print
│   └── js/main.js        # Scroll reveal, nav state, progress bar, mobile sheet
├── .github/workflows
│   └── static.yml        # Deploys to GitHub Pages on push to main
├── avatar.jpg            # Portrait
├── favicon.svg           # KR monogram
├── index.html            # The page
└── Keerthi_Resume.pdf    # Linked from the CV buttons
```

## Design system — "Editorial Rose"

Positioned as a consultant's site: it leads with what the work delivers, not with a job title.
Sections are numbered 01–06 and set on an editorial grid — a metadata rail on the left, content on
the right, hairline rules instead of cards and shadows.

| Token | Value | Use |
|---|---|---|
| `--paper` | `#FBF1EC` | Warm blush page background |
| `--paper-2` | `#F6E7E0` | Alternating section bands |
| `--ink` | `#121113` | Body text, dark band background |
| `--muted` | `#6B625E` | Secondary text (5:1 on paper) |
| `--rule` / `--rule-2` | `#E8DCD5` / `#D9C8BF` | Hairlines and borders |
| `--accent` | `#B4415C` | Section numbers, links, CTA (7:1 on paper) |

Type is a three-way pairing: **Instrument Serif** for display, **Inter** for body and UI, and
**IBM Plex Mono** for section numbers, labels, dates and tags. Changing the `:root` block in
`style.css` re-skins the whole site.

## Behaviour

- **Progressive enhancement** — the reveal-on-scroll styles live under a `.js` class that JavaScript
  adds to `<html>`. Without JS nothing is ever hidden. A 4s timeout also un-hides everything if the
  observer fails.
- **Reduced motion** — `prefers-reduced-motion` disables every transition, the reveal and the
  progress bar.
- **Accessibility** — skip link, visible focus rings on both light and dark bands, `aria-expanded` /
  `aria-controls` on the menu, `aria-current` on the active nav link, Escape closes the mobile sheet,
  and the sheet closes itself on resize to desktop.
- **Print** — `@media print` strips navigation and chrome so the page prints as a clean document.

## Cache busting

Assets carry a `?v=N` query (`style.css?v=3`, `avatar.jpg?v=2`, …). GitHub Pages
serves `Cache-Control: max-age=600`, so without a version a returning visitor can
get an old cached file applied to new markup — which once left the whole page
unstyled, and another time showed a replaced photo.

**Bump the version of any asset you change**, and only that asset. The static
check in the test suite fails if a mutable asset (css/js/jpg/png/webp/pdf) has no
`?v=`.

## Editing content

Everything is in `index.html`; there is no CMS or data file.

| What | Where |
|---|---|
| Headline, intro, metrics, client list | `.hero` |
| The five outcomes | `#approach` — copy one `.outcome` |
| Case studies | `#work` — copy one `.case` (Problem / Approach / Result) |
| Jobs | `#experience` — copy one `.role` |
| Skills and certifications | `#capabilities` |
| Articles | `#writing` |
| Bio and portrait | `#about` |
| Email, links, location | `#contact` and the footer |

Section numbers (`01`–`06`) are written into the markup, so renumber them by hand if you reorder
sections. The footer year updates itself from the browser clock.

## Deploying

`.github/workflows/static.yml` publishes the repository to GitHub Pages on every push to `main`.
Nothing is built — files are served as-is.
