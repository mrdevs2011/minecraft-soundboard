// Copies the web app into www/ so Capacitor (Android) can package it.
import { cpSync, rmSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'www');
const items = [
  'index.html', 'css', 'js', 'png', 'svg', 'sounds', 'sounds.json',
  'site.webmanifest', 'favicon.ico',
];

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const item of items) {
  const src = join(root, item);
  if (!existsSync(src)) throw new Error('Missing: ' + item);
  cpSync(src, join(out, item), { recursive: true });
}
console.log('www/ prepared');
