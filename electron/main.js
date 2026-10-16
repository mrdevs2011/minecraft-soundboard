const { app, BrowserWindow, shell, session } = require('electron');
const http = require('http');
const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Platform tweaks (must run before app is ready)
// ---------------------------------------------------------------------------

// Let <audio> play without requiring a click first (same on all OSes).
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

if (process.platform === 'linux' && process.env.MCSOUNDS_SANDBOX !== '1') {
  // AppImage cannot ship a SUID chrome-sandbox helper, and recent distros
  // (Ubuntu 23.10+/24.04, etc.) block unprivileged user namespaces, so the
  // Chromium sandbox aborts at startup. The app only loads its own bundled
  // content from 127.0.0.1 (nodeIntegration off, contextIsolation on, external
  // links go to the system browser), so running without it is acceptable.
  // Set MCSOUNDS_SANDBOX=1 to keep the sandbox on.
  app.commandLine.appendSwitch('no-sandbox');
}

if (process.platform === 'win32') {
  // Correct taskbar grouping / icon / notifications on Windows.
  app.setAppUserModelId('com.mcsounds.app');
}

// Project root (contains index.html, js/, css/, sounds/ ...).
// Inside a packaged app this points into app.asar, which fs reads transparently.
const PUBLIC_DIR = path.join(__dirname, '..');

// A fixed port keeps the page origin (http://127.0.0.1:PORT) identical between
// launches, so localStorage (theme, language, Groq key, chat history) persists.
// If it is taken we fall back to a random free port.
const PREFERRED_PORT = 47831;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ogg': 'audio/ogg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

let mainWindow = null;
let server = null;
let port = null;

function sendFile(req, res, filePath, stat) {
  const type = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
  const size = stat.size;
  const base = { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-cache' };

  // Range support is required so <audio> can seek.
  const range = req.headers.range;
  const m = range && /bytes=(\d*)-(\d*)/.exec(range);
  if (m) {
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

function pipeFile(stream, res) {
  // A client aborting (e.g. seeking in <audio>) must never crash the app.
  stream.on('error', () => res.destroy());
  res.on('close', () => stream.destroy());
  stream.pipe(res);
}

function handleRequest(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405);
    return res.end();
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400);
    return res.end();
  }

  // Block path traversal outside the project folder (works with both / and \).
  const target = path.normalize(path.join(PUBLIC_DIR, pathname));
  const root = path.normalize(PUBLIC_DIR);
  if (target !== root && !target.startsWith(root + path.sep)) {
    res.writeHead(403);
    return res.end();
  }

  fs.stat(target, (err, stat) => {
    if (!err && stat.isFile()) return sendFile(req, res, target, stat);

    // Missing file with an extension -> real 404 (e.g. a missing sound).
    if (path.extname(pathname)) {
      res.writeHead(404);
      return res.end('Not found');
    }

    // Client-side routes (/, /#/folder...) -> index.html, like the Vercel rewrite.
    const index = path.join(PUBLIC_DIR, 'index.html');
    fs.stat(index, (e2, s2) => {
      if (e2) {
        res.writeHead(500);
        return res.end();
      }
      sendFile(req, res, index, s2);
    });
  });
}

function listen(p) {
  return new Promise((resolve, reject) => {
    const s = http.createServer(handleRequest);
    s.once('error', reject);
    // Bound to localhost only.
    s.listen(p, '127.0.0.1', () => {
      s.removeListener('error', reject);
      s.on('error', () => {});
      resolve(s);
    });
  });
}

async function startServer() {
  try {
    server = await listen(PREFERRED_PORT);
  } catch {
    server = await listen(0); // random free port
  }
  return server.address().port;
}

function setupDownloads() {
  // Make <a download> / blob downloads save straight to the Downloads folder.
  session.defaultSession.on('will-download', (event, item) => {
    const dir = app.getPath('downloads');
    // Strip any path separators so a crafted name cannot escape Downloads.
    const name = path.basename(item.getFilename() || 'download');
    let target = path.join(dir, name);
    if (fs.existsSync(target)) {
      const ext = path.extname(name);
      const base = path.basename(name, ext);
      target = path.join(dir, `${base}-${Date.now()}${ext}`);
    }
    item.setSavePath(target);
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 360,
    minHeight: 480,
    title: 'MCSOUNDS',
    backgroundColor: '#1b1b1b',
    icon: path.join(PUBLIC_DIR, 'png', 'icon-512.png'),
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false,
    },
  });

  const appUrl = `http://127.0.0.1:${port}/`;
  mainWindow.loadURL(appUrl);

  // External links (AI, Groq, GitHub...) open in the system browser.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith(appUrl)) {
      event.preventDefault();
      if (/^https?:/i.test(url)) shell.openExternal(url);
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(async () => {
    port = await startServer();
    setupDownloads();
    createWindow();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0 && port) createWindow();
  });

  app.on('window-all-closed', () => {
    // macOS keeps the app running until Cmd+Q, like other Mac apps.
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('before-quit', () => {
    if (server) server.close();
  });
}
