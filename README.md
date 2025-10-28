# Keerthi Rapolu — Portfolio

A lightweight, single-page portfolio that highlights Keerthi Rapolu’s experience, skills, and credentials. Everything is static HTML/CSS/JS so it can be deployed anywhere that serves files.

## Getting started

You only need a basic HTTP server. Any of the commands below will host the site locally and print a URL you can visit:

```bash
# Python 3
python -m http.server 8000

# or with Node.js installed
npx serve
```

After running one of the commands, open [http://localhost:8000](http://localhost:8000) (or the address printed in your terminal). The homepage renders the hero card, tabbed navigation, and dynamic experience list. The “Download Resume” button opens the bundled PDF in a new tab.

## Deploying

Because the site is static you can drag the files into any hosting provider or GitHub Pages. Upload the repository contents as-is and ensure `index.html` is served from the web root.

## Project structure

```
.
├── assets
│   ├── css
│   │   └── style.css      # Styles for layout, typography, and responsive tweaks
│   └── js
│       └── main.js        # Tab controller, job rendering, and light self-tests
├── avatar.jpg             # Hero image
├── index.html             # Main entry point
└── Keerthi_Resume.pdf     # Downloadable resume
```
