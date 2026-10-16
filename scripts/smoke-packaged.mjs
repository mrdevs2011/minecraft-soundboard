// Runs electron/smoke.js INSIDE the freshly built, packaged app (dist/*-unpacked),
// using the app's own Electron binary in Node mode. This proves that, on this OS,
// the real build serves index.html, every asset and all sounds correctly
// (asar archive + unpacked sounds/), with no display required.
import { existsSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

function locate() {
  if (process.platform === 'win32') {
    return { bin: join(dist, 'win-unpacked', 'MCSOUNDS.exe'), res: join(dist, 'win-unpacked', 'resources') };
  }
  if (process.platform === 'darwin') {
    const dir = process.arch === 'arm64' ? 'mac-arm64' : 'mac';
    const app = join(dist, dir, 'MCSOUNDS.app', 'Contents');
    return { bin: join(app, 'MacOS', 'MCSOUNDS'), res: join(app, 'Resources') };
  }
  return { bin: join(dist, 'linux-unpacked', 'mcsounds'), res: join(dist, 'linux-unpacked', 'resources') };
}

const { bin, res } = locate();
if (!existsSync(bin)) {
  console.error('Packaged app not found: ' + bin);
  console.error('dist/ contains: ' + (existsSync(dist) ? readdirSync(dist).join(', ') : '(missing)'));
  process.exit(1);
}

const script = join(res, 'app.asar', 'electron', 'smoke.js');
const unpackedSounds = join(res, 'app.asar.unpacked', 'sounds');
console.log('binary : ' + bin);
console.log('script : ' + script);
console.log('sounds unpacked: ' + (existsSync(unpackedSounds) ? 'yes' : 'NO'));

const r = spawnSync(bin, [script], {
  env: { ...process.env, ELECTRON_RUN_AS_NODE: '1' },
  encoding: 'utf8',
  timeout: 180000,
  maxBuffer: 64 * 1024 * 1024,
});
if (r.stdout) process.stdout.write(r.stdout);
if (r.stderr) process.stderr.write(r.stderr);
if (r.error) console.error('spawn error: ' + r.error.message);
if (!existsSync(unpackedSounds)) {
  console.error('sounds/ was not unpacked: check build.asarUnpack');
  process.exit(1);
}
process.exit(r.status === 0 ? 0 : 1);
