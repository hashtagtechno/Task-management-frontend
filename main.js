const { app, BrowserWindow, ipcMain, desktopCapturer } = require('electron');
const path = require("path");

let win; // ✅ Declare win in outer scope

function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      enableRemoteModule: false,
      sandbox: false,
      enableBlinkFeatures: 'DesktopCapture'
    },
  });

  const indexPath = path.join(__dirname, "dist", "task-management", "browser", "index.html");
  win.loadFile(indexPath);
}

console.log('Preload path:', path.join(__dirname, 'preload.js'));
app.whenReady().then(createWindow);

// 🔁 Screenshot every 10s and send to renderer
setInterval(async () => {
  console.log('[Main] Screenshot timer triggered');

  if (!win || win.isDestroyed()) {
    console.warn('[Main] BrowserWindow not ready yet.');
    return;
  }

  try {
    const sources = await desktopCapturer.getSources({ types: ['screen'] });
    sources.forEach((source, index) => {
      const base64 = source.thumbnail.toDataURL();
      win.webContents.send('screenshot-captured', { index, image: base64 });
    });
  } catch (err) {
    console.error('[Main] Error capturing screen:', err);
  }
}, 1000000);
