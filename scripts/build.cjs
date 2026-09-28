/* Naseej — static build.
   Replaces `vite build` for `pnpm run build` / `pnpm run build --mode development`
   (see .figma/make/deploy and .figma/make/deploy-preview).

   There is nothing to compile: the repository root is already the site. This
   stages the publishable files into dist/ so the platform's
   `figma make deploy --build-dir dist` has a directory to upload.

   Ignores flags it does not understand (Vite's --mode, for example). */
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'dist');

/* Only these are published. Source-only and tooling files stay out of dist/,
   including firebase.json itself. */
const INCLUDE_FILES = ['index.html', 'robots.txt'];
const INCLUDE_DIRS = ['css', 'js', 'assets'];

let files = 0;
let bytes = 0;

function copyInto(src, dest) {
  if (fs.statSync(src).isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) copyInto(path.join(src, entry), path.join(dest, entry));
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  files++;
  bytes += fs.statSync(src).size;
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

for (const name of INCLUDE_FILES) {
  const src = path.join(ROOT, name);
  if (fs.existsSync(src)) copyInto(src, path.join(OUT, name));
  else console.warn('warning: missing ' + name + ' — skipped');
}
for (const dir of INCLUDE_DIRS) {
  const src = path.join(ROOT, dir);
  if (!fs.existsSync(src)) {
    console.warn('warning: missing ' + dir + '/ — skipped');
    continue;
  }
  copyInto(src, path.join(OUT, dir));
}

console.log('built dist/ — ' + files + ' files, ' + (bytes / 1048576).toFixed(2) + ' MB');
