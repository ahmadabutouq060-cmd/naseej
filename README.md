# Naseej — Historical React/Vanilla Source Snapshot

> **Status: historical copy, not the canonical source.** Continue from [the current Naseej implementation](https://github.com/ahmadabutouq060-cmd/new2). This repository is retained here only as a reference until it can be archived or removed.

Naseej is a gamified tourism web experience designed to make discovering Jordan more interactive through travel story threads, places, waypoints, challenges, progress, and rewards.

**Live demo:** https://naseej-89fa4.web.app/

## What the project explores

- Discovering story threads by destination and category.
- Following a story through connected waypoints and place details.
- Interactive challenge and progress-oriented UI.
- A profile experience with points, badges, and rewards.
- Presenting Jordanian destinations through images and narrative content.

The team reached the top 12 finalist teams out of more than 100 participating teams in the PEXILE SITE competition.

## Technology and repository layout

- HTML, CSS, and Vanilla JavaScript power the root-page entry point.
- React and TypeScript source files are retained under `src/` for reference and implementation comparison.
- `assets/` contains destination imagery.
- `js/` contains the Vanilla JavaScript app logic and page rendering.
- `css/styles.css` contains the main stylesheet.

**Implementation note:** The root `index.html` currently loads the scripts under `js/`, so that is the Vanilla JavaScript implementation opened by the main page. The React source under `src/` is not the entry point referenced by that HTML file.

## Run locally

Install Node.js, then run:

```bash
npm install
npm run build
npm run dev
```

The build script stages the static site in `dist/`. If the development server's default port is already in use, stop the other process or inspect `scripts/serve.cjs` for its port setting.

## Portfolio notes

When presenting this project, describe the specific features you personally implemented, the work completed with your teammates, and what you learned. The repository represents a team project, so avoid implying that every feature was built individually by one person.

## Current status

This README documents the checked-in repository structure. Verify the deployed demo and Firebase-related behavior against the exact version you intend to present, since multiple Naseej implementation copies exist in the account.
