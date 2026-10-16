# MCSOUNDS — Minecraft Sound Archive

Find **all the sounds in Minecraft – 100%**. Play, search, download, and explore **4,900+** official `.ogg` sounds.

**Web:** https://minecraft-soundboard.vercel.app/
**Desktop (Windows · macOS · Linux):** [latest release](https://github.com/mrdevs2011/minecraft-soundboard/releases/latest)

## Features

- Instant search · folder navigation · in-page player
- Dark / light themes · English / Uzbek · MCAI (optional Groq key)
- Bulk ZIP download · PWA · fully responsive
- Desktop app that works **offline** (all sounds are bundled) on Windows, macOS (Intel + Apple Silicon) and Linux

## Download the desktop app

The site's **APP** button picks the right installer for your OS automatically. You can also grab it from the [Releases](https://github.com/mrdevs2011/minecraft-soundboard/releases/latest) page:

| OS | File | Notes |
|---|---|---|
| Windows 10/11 (x64) | `MCSOUNDS-<version>-Setup.exe` | installer |
| | `MCSOUNDS-<version>-Portable.exe` | no install, run anywhere |
| macOS 11+ (Intel) | `MCSOUNDS-<version>-x64.dmg` | |
| macOS 11+ (Apple Silicon) | `MCSOUNDS-<version>-arm64.dmg` | |
| Linux (x64) | `MCSOUNDS-<version>.AppImage` | any distro |
| | `MCSOUNDS-<version>-x64.deb` | Debian / Ubuntu / Mint |

### First launch (builds are not code-signed)

- **Windows:** SmartScreen → **More info** → **Run anyway**.
- **macOS:** drag the app to *Applications*, then right-click → **Open** → **Open**
  (or *System Settings → Privacy & Security → Open Anyway*).
  If macOS says the app is "damaged", run once in Terminal:
  `xattr -cr /Applications/MCSOUNDS.app`
- **Linux AppImage:** `chmod +x MCSOUNDS-*.AppImage && ./MCSOUNDS-*.AppImage`.
  If it complains about FUSE (Ubuntu 22.04+): `sudo apt install libfuse2`
  or run `./MCSOUNDS-*.AppImage --appimage-extract-and-run`.
- **Linux .deb:** `sudo apt install ./MCSOUNDS-*.deb`

The Linux build starts without Chromium's sandbox (AppImage cannot ship it and
recent distros block the alternative). The app only loads its own bundled files
from `127.0.0.1`. Set `MCSOUNDS_SANDBOX=1` to turn the sandbox back on.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm start          # run the desktop app in development
```

> npm 12+ asks you to approve install scripts. If Electron reports that it failed
> to install, approve `electron` or run `node node_modules/electron/install.js`.

Web version only (no Electron):

```bash
npx serve .
```

## Build the desktop apps

```bash
npm run build:win    # Windows: Setup.exe + Portable.exe
npm run build:mac    # macOS: .dmg (x64 + arm64)
npm run build:linux  # Linux: .AppImage + .deb
```

Output goes to `dist/`. Each installer must be built on its own OS (macOS `.dmg`
only builds on a Mac), which is exactly what GitHub Actions does for you:

## Automatic builds (GitHub Actions)

Every push to `main` runs `.github/workflows/build.yml`:

1. Builds **Windows, macOS and Linux in parallel** (`windows-latest`, `macos-latest`, `ubuntu-latest`).
2. Uploads the installers as workflow artifacts (kept 14 days).
3. Creates or updates the GitHub Release `v<version>` with every installer and marks it **latest**.

A newer push cancels a still-running older build. You can also start it by hand from
the **Actions** tab (*Run workflow*).

To publish a **new version**, bump `version` in `package.json` before pushing.
Pushing without a bump re-uploads the installers to the existing release for that version.

## Deploy the web version

```bash
npx vercel --prod
```

Pushing to `main` also auto-deploys when the repo is linked to Vercel.

## Project structure

- `index.html`, `css/`, `js/app.js`: the web app
- `js/desktop.js`: "APP" button → installer for the visitor's OS
- `js/vendor/`: bundled third-party libs (JSZip) so the app works offline
- `sounds/`, `sounds.json`: the sound archive
- `electron/main.js`: desktop wrapper (local server + window + downloads)
- `scripts/adhoc-sign.js`: ad-hoc code signing for macOS builds
- `.github/workflows/build.yml`: cross-platform build and release
