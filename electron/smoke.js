'use strict';
// Smoke test for the desktop app's local server and bundled files.
// Pure Node, no display needed, so it runs the same on Windows, macOS and Linux:
//   node electron/smoke.js                       (source tree)
//   ELECTRON_RUN_AS_NODE=1 <packaged-app> <resources>/app.asar/electron/smoke.js
//                                                 (the real packaged app, see scripts/smoke-packaged.mjs)
const http = require('http');
const path = require('path');
const { start } = require('./server');

const ROOT = path.join(__dirname, '..');
let failed = 0;

function check(name, ok, extra) {
  if (!ok) failed++;
  console.log((ok ? 'PASS' : 'FAIL') + '  ' + name + (extra ? '  ' + extra : ''));
}

function request(port, method, urlPath, headers) {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: '127.0.0.1', port, method, path: urlPath, headers }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks) }));
    });
    req.on('error', reject);
    req.setTimeout(20000, () => req.destroy(new Error('timeout ' + urlPath)));
    req.end();
  });
}

async function pool(items, limit, fn) {
  let i = 0;
  const workers = Array.from({ length: limit }, async () => {
    while (i < items.length) {
      const item = items[i++];
      await fn(item);
    }
  });
  await Promise.all(workers);
}

const soundUrl = (rel) => '/sounds/' + rel.split('/').map(encodeURIComponent).join('/');

(async () => {
  const { server, port } = await start(ROOT, 0);
  console.log('server on 127.0.0.1:' + port + '  root=' + ROOT);

  try {
    // 1. index.html and every local asset it references
    const index = await request(port, 'GET', '/');
    const html = index.body.toString('utf8');
    check('GET / returns the app', index.status === 200 && /MCSOUNDS/.test(html));

    const refs = new Set();
    for (const m of html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)) refs.add(m[1]);
    const badRefs = [];
    for (const ref of refs) {
      const r = await request(port, 'HEAD', ref);
      if (r.status !== 200) badRefs.push(ref + ' -> ' + r.status);
    }
    check('all ' + refs.size + ' assets referenced by index.html load', badRefs.length === 0, badRefs.join(', '));

    for (const f of ['/js/app.js', '/js/desktop.js', '/css/styles.css', '/js/vendor/jszip.min.js', '/sw.js', '/site.webmanifest']) {
      const r = await request(port, 'HEAD', f);
      check('GET ' + f, r.status === 200);
    }

    // 2. sounds.json and every single sound it lists
    const sj = await request(port, 'GET', '/sounds.json');
    const data = JSON.parse(sj.body.toString('utf8'));
    const all = [];
    for (const cat of Object.keys(data.sounds)) for (const rel of data.sounds[cat]) all.push(rel);
    check('sounds.json total matches list', data.total === all.length, 'total=' + data.total + ' listed=' + all.length);

    const missing = [];
    await pool(all, 32, async (rel) => {
      const r = await request(port, 'HEAD', soundUrl(rel));
      if (r.status !== 200 || !(Number(r.headers['content-length']) > 0)) missing.push(rel + ' -> ' + r.status);
    });
    check('all ' + all.length + ' sounds are present and non-empty', missing.length === 0, missing.slice(0, 5).join(', '));

    // 3. Range requests (needed so <audio> can seek)
    const sample = soundUrl(all[0]);
    const part = await request(port, 'GET', sample, { Range: 'bytes=0-99' });
    check('Range request -> 206 with 100 bytes', part.status === 206 && part.body.length === 100);
    check('sound is a valid Ogg stream', part.body.slice(0, 4).toString('latin1') === 'OggS');
    const tail = await request(port, 'GET', sample, { Range: 'bytes=-50' });
    check('suffix Range request -> last 50 bytes', tail.status === 206 && tail.body.length === 50);
    const bad = await request(port, 'GET', sample, { Range: 'bytes=999999999-' });
    check('out-of-range request -> 416', bad.status === 416);

    // 4. Routing and safety
    const route = await request(port, 'GET', '/some/client/route');
    check('unknown route falls back to index.html', route.status === 200 && /MCSOUNDS/.test(route.body.toString('utf8')));
    const nf = await request(port, 'GET', '/sounds/does-not-exist.ogg');
    check('missing sound -> 404', nf.status === 404);
    const trav = await request(port, 'GET', '/..%2f..%2f..%2fpackage.json');
    check('path traversal blocked (403)', trav.status === 403);
    const trav2 = await request(port, 'GET', '/..%5c..%5c..%5cpackage.json');
    check('backslash traversal blocked', trav2.status === 403 || trav2.status === 404 || !/"mcsounds"/.test(trav2.body.toString('utf8')));
    const post = await request(port, 'POST', '/');
    check('POST rejected (405)', post.status === 405);
  } catch (e) {
    failed++;
    console.log('FAIL  unexpected error: ' + ((e && e.stack) || e));
  }

  server.close();
  console.log(failed ? '\n' + failed + ' check(s) FAILED' : '\nAll checks passed');
  process.exit(failed ? 1 : 0);
})();
