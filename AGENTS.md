# naseej

A static, framework-free website: **HTML + CSS + Vanilla JavaScript**. No React, no
TypeScript, no Vite, no Tailwind, no bundler, no build step for the site itself. The
repository root **is** the site.

## Project Structure

- `index.html` - The only HTML page. Contains the `#app` mount point and loads the
  four scripts below in order.
- `css/styles.css` - The entire stylesheet: hand-ported preflight, design tokens
  (`:root`), global styles, keyframes, and a hand-written utility layer.
- `js/data.js` - All content and data. Runs first; defines the `const` collections
  (`threadData`, `libraryThreads`, `cities`, `badges`, `ASSETS`, ...) consumed by the
  other files.
- `js/navigation.js` - Defines `window.NASEEJ`: app state, hash routing, the nav bar,
  the mount/paint cycle, and the delegated event listeners. Runs second.
- `js/pages.js` - The five page renderers. Runs third.
- `js/app.js` - Bootstrap; calls `NASEEJ.route()` on DOM ready. Runs last.
- `assets/` - Images referenced by the data. Paths are document-relative
  (`assets/...`), so keep them relative.
- `scripts/serve.cjs` - Dependency-free static dev server (`pnpm dev`).
- `scripts/build.cjs` - Copies the publishable files into `dist/`. There is nothing to
  compile.
- `robots.txt` - Published as-is.
- `firebase.json` - Hosting config; deploys `dist/`.

Script order in `index.html` matters: `data.js` must precede `pages.js` (which closes
over its data) and `navigation.js` must precede `app.js`.

## Commands

- `pnpm dev` / `pnpm preview` - serve the site locally (`scripts/serve.cjs`)
- `pnpm build` - stage the publishable files into `dist/`
- `pnpm format` - oxfmt
- `npx firebase-tools deploy --only hosting` - Firebase Hosting (runs `pnpm build`
  automatically via the `predeploy` hook)

`.figma/make/` shells out to `pnpm run dev`, `pnpm run build` and `pnpm run format`,
and `deploy` / `deploy-preview` expect the build output in `dist/`. Keep those script
names and the `dist/` output contract intact.

## Architecture

- **Routing** is hash-based (`#/discover`, `#/thread/3`, `#/place/3/2`) so Back/Forward
  and refresh work. `NASEEJ.route()` parses `location.hash`; `NASEEJ.navigate()` writes
  it. First visit with no hash lands on `home`.
- **Rendering** is full re-render into `#app`. Pages are functions returning an HTML
  string, registered on `NASEEJ.pages`.
- **Page-local state** lives on `NASEEJ.ui` and is reset on a fresh mount to match
  component mount semantics. Global state is `NASEEJ.state`.
- **Events** are delegated from `document` — markup carries `data-nav` / `data-act` /
  `data-v` rather than inline handlers. Add new interactions by emitting those
  attributes and handling them in the delegated listener in `navigation.js`.
- The library page (`discover`) patches only the regions that change via
  `NASEEJ.updateLibrary()` instead of re-rendering, so the search input keeps focus
  and the card panel keeps its scroll position.

## Styling

There is no Tailwind and no CSS framework. `css/styles.css` contains a hand-written
utility layer that reproduces the class names the markup uses (for example `flex`,
`gap-3`, `text-2xl`, `px-10`, `hover:scale-105`, `xl:text-7xl`) as plain CSS rules.

**If you add a class name to the markup you must add a matching rule to
`css/styles.css`.** There is no generator; a class with no rule renders unstyled.

Keep the design tokens in `:root` and reuse them rather than hardcoding new colors.
Keep CSS `@import` statements (the Google Fonts import) first in the file.

## Dependencies

There are none at runtime and no build dependency. The only `devDependency` is
`oxfmt` for formatting. Do not add a framework, bundler, or CSS preprocessor.

## Deployment

`firebase.json` serves `dist/`, runs `node scripts/build.cjs` as a predeploy step, and
sets cache and security headers.

`.figma/make/site.json` sets `robots.index: false`. The old Vite plugin used to
translate that into a `noindex` meta tag and a `robots.txt` at build time; both are
now committed directly (`index.html` and `robots.txt`). Update both if that setting
ever changes.
