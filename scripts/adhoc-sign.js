// electron-builder "afterPack" hook.
//
// Builds are not signed with an Apple Developer ID. On Apple Silicon a
// modified Electron.app with a broken/missing signature is reported as
// "damaged and can't be opened", so we re-sign the app ad-hoc (`codesign -s -`)
// to keep the bundle internally consistent. It still shows the normal
// "unidentified developer" prompt, which the user can approve once.
const { execFileSync } = require('child_process');
const path = require('path');

exports.default = async function adhocSign(context) {
  if (context.electronPlatformName !== 'darwin') return;
  if (process.platform !== 'darwin') {
    console.log('[adhoc-sign] not running on macOS, skipping');
    return;
  }
  const appName = context.packager.appInfo.productFilename;
  const appPath = path.join(context.appOutDir, `${appName}.app`);
  console.log(`[adhoc-sign] ad-hoc signing ${appPath}`);
  execFileSync('codesign', ['--force', '--deep', '--sign', '-', appPath], { stdio: 'inherit' });
};
