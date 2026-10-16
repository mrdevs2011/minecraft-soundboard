'use strict';
// Tiny static file server used by the desktop app.
// Pure Node (no Electron imports) so it can be tested anywhere:
//   node electron/smoke.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ogg': 'audio/ogg',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.markdown': 'text/plain; charset=utf-8',
};

// In a packaged app the big `sounds/` folder lives outside the asar archive
// (build.asarUnpack) so audio streams from real files on every OS.
// Map ".../app.asar/sounds/x.ogg" -> ".../app.asar.unpacked/sounds/x.ogg" when it exists.
function realPath(p) {
  const marker = path.sep + 'app.asar' + path.sep;
  const i = p.indexOf(marker);
  if (i === -1) return p;
  const unpacked = p.slice(0, i) + path.sep + 'app.asar.unpacked' + path.sep + p.slice(i + marker.length);
  return fs.existsSync(unpacked) ? unpacked : p;
}

function pipeFile(stream, res) {
  // A client aborting (e.g. seeking in <audio>) must never crash the app.
  stream.on('error', () => res.destroy());
  res.on('close', () => stream.destroy());
  stream.pipe(res);
}

function sendFile(req, res, filePath, stat) {
  const type = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
  const size = stat.size;
  const base = { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-cache' };

  // Range support is required so <audio> can seek.
  const range = req.headers.range;
  const m = range && /^bytes=(\d*)-(\d*)$/.exec(range);
  if (m && (m[1] !== '' || m[2] !== '')) {
    let start;
    let end;
    if (m[1] === '') {
      start = Math.max(0, size - Number(m[2]));
      end = size - 1;
    } else {
      start = Number(m[1]);
      end = m[2] === '' ? size - 1 : Math.min(Number(m[2]), size - 1);
    }
    if (start > end || start >= size) {
      res.writeHead(416, { 'Content-Range': `bytes */${size}` });
      return res.end();
    }
    res.writeHead(206, {
      ...base,
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Content-Length': end - start + 1,
    });
    if (req.method === 'HEAD') return res.end();
    return pipeFile(fs.createReadStream(filePath, { start, end }), res);
  }

  res.writeHead(200, { ...base, 'Content-Length': size });
  if (req.method === 'HEAD') return res.end();
  pipeFile(fs.createReadStream(filePath), res);
}

function createHandler(publicDir) {
  const root = path.normalize(publicDir);

  return function handleRequest(req, res) {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { Allow: 'GET, HEAD' });
      return res.end();
    }

    let pathname;
    try {
      pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    } catch {
      res.writeHead(400);
      return res.end();
    }
    if (pathname.includes('\0')) {
      res.writeHead(400);
      return res.end();
    }

    // Block path traversal outside the project folder (works with both / and \).
    const target = path.normalize(path.join(root, pathname));
    if (target !== root && !target.startsWith(root + path.sep)) {
      res.writeHead(403);
      return res.end();
    }

    fs.stat(realPath(target), (err, stat) => {
      if (!err && stat.isFile()) return sendFile(req, res, realPath(target), stat);

      // Missing file with an extension -> real 404 (e.g. a missing sound).
      if (path.extname(pathname)) {
        res.writeHead(404);
        return res.end('Not found');
      }

      // Client-side routes (/, /#/folder...) -> index.html, like the Vercel rewrite.
      const index = path.join(root, 'index.html');
      fs.stat(index, (e2, s2) => {
        if (e2) {
          res.writeHead(500);
          return res.end();
        }
        sendFile(req, res, index, s2);
      });
    });
  };
}

function listen(publicDir, port) {
  return new Promise((resolve, reject) => {
    const s = http.createServer(createHandler(publicDir));
    s.once('error', reject);
    // Bound to localhost only.
    s.listen(port, '127.0.0.1', () => {
      s.removeListener('error', reject);
      s.on('error', () => {});
      resolve(s);
    });
  });
}

// Try the preferred port first (keeps the page origin, and so localStorage,
// identical between launches); fall back to any free port.
async function start(publicDir, preferredPort) {
  let server;
  try {
    server = await listen(publicDir, preferredPort);
  } catch {
    server = await listen(publicDir, 0);
  }
  return { server, port: server.address().port };
}

module.exports = { start, listen, createHandler, realPath, MIME };
