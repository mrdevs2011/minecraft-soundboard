'use strict';
const { app, BrowserWindow, Menu, dialog, shell, session } = require('electron');
const fs = require('fs');
const path = require('path');
const { start } = require('./server');

// ---------------------------------------------------------------------------
// Platform tweaks (must run before app is ready)
// ---------------------------------------------------------------------------

// Let <audio> play without requiring a click first (same on all OSes).
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

if (process.platform === 'linux') {
  // Native Wayland when available, X11 otherwise.
  app.commandLine.appendSwitch('ozone-platform-hint', 'auto');

  if (process.env.MCSOUNDS_SANDBOX !== '1') {
    // AppImage cannot ship a SUID chrome-sandbox helper, and recent distros
    // (Ubuntu 23.10+/24.04, Arch hardened kernels, etc.) block unprivileged user
    // namespaces, so the Chromium sandbox aborts at startup. The app only loads its
    // own bundled content from 127.0.0.1 (nodeIntegration off, contextIsolation on,
    // external links go to the system browser), so running without it is acceptable.
    // Set MCSOUNDS_SANDBOX=1 to keep the sandbox on.
    app.commandLine.appendSwitch('no-sandbox');
  }
}

if (process.platform === 'win32') {
  // Correct taskbar grouping / icon / notifications on Windows.
  app.setAppUserModelId('com.mcsounds.app');
}

// Project root (contains index.html, js/, css/, sounds/ ...).
// Inside a packaged app this points into app.asar, which fs reads transparently
// (sounds/ is unpacked next to it, see electron/server.js).
const PUBLIC_DIR = path.join(__dirname, '..');

// A fixed port keeps the page origin (http://127.0.0.1:PORT) identical between
// launches, so localStorage (theme, language, Groq key, chat history) persists.
// If it is taken we fall back to a random free port.
const PREFERRED_PORT = 47831;

let mainWindow = null;
let server = null;
let port = null;

// Windows forbids  < > : " / \ | ? *  and control characters in file names.
function safeFileName(name) {
  const cleaned = String(name || 'download')
    .replace(path.sep === '\\' ? /[\\/]/g : /\//g, '_')
    .replace(/[<>:"|?*\x00-\x1f]/g, '_')
    .replace(/[. ]+$/, '');
  return path.basename(cleaned) || 'download';
}

function setupDownloads() {
  // Make <a download> / blob downloads save straight to the Downloads folder.
  session.defaultSession.on('will-download', (event, item) => {
    const dir = app.getPath('downloads');
    const name = safeFileName(item.getFilename());
    let target = path.join(dir, name);
    if (fs.existsSync(target)) {
      const ext = path.extname(name);
      const base = path.basename(name, ext);
      target = path.join(dir, base + '-' + Date.now() + ext);
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
    show: false, // shown on ready-to-show: no white flash
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

  const appUrl = 'http://127.0.0.1:' + port + '/';
  let retried = false;

  mainWindow.once('ready-to-show', () => mainWindow && mainWindow.show());
  // Safety net: never leave the user with an invisible window.
  setTimeout(() => {
    if (mainWindow && !mainWindow.isVisible()) mainWindow.show();
  }, 5000);

  mainWindow.webContents.on('did-fail-load', (event, code, desc, url, isMainFrame) => {
    if (!isMainFrame || code === -3 /* aborted */ || retried) return;
    retried = true;
    setTimeout(() => mainWindow && mainWindow.loadURL(appUrl), 500);
  });

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
    try {
      const started = await start(PUBLIC_DIR, PREFERRED_PORT);
      server = started.server;
      port = started.port;
    } catch (err) {
      dialog.showErrorBox('MCSOUNDS', 'Could not start the local server:\n' + (err && err.message ? err.message : err));
      app.quit();
      return;
    }

    // Windows/Linux: no menu bar at all (Alt does not bring it back). macOS keeps a
    // standard menu so Cmd+C / Cmd+V / Cmd+Q work (pasting the API key needs it).
    if (process.platform !== 'darwin') Menu.setApplicationMenu(null);

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
