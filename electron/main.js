import os from "os";

const iconPath = {
  win32: "assets/hashtag.ico",
  darwin: "assets/hashtag.icns",
  linux: "assets/hashtag.png",
}[os.platform()];
let win; // ✅ Declare win in outer scope
let hasShownIdleAlert = false;
let lastIdleSentAt = null;
import {
  app,
  BrowserWindow,
  ipcMain,
  screen,
  dialog,
  desktopCapturer,
  powerMonitor,
  Notification,
} from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { activeWindow } from "active-win";
import { pathToFileURL } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let currentWindow = null;
let openedAt = null;
function showIdleNotification() {
  const notification = new Notification({
    title: "Idle Alert",
    body: "You have been idle for over 15 minutes.",
  });

  notification.show();
}
function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: path.join(__dirname, iconPath),
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      // preload: pathToFileURL(path.join(__dirname, 'preload.js')).href,
      contextIsolation: true,
      nodeIntegration: false,

      enableRemoteModule: false,
      sandbox: false,
      enableBlinkFeatures: "DesktopCapture",
    },
  });

  const indexPath = path.join(
    __dirname,
    "dist",
    "task-management",
    "browser",
    "index.html"
  );
  win.loadFile(indexPath);
}

console.log("Preload path:", path.join(__dirname, "preload.cjs"));
// console.log('Resolved preload path:', pathToFileURL(path.join(__dirname, 'preload.js')).href);

app.whenReady().then(createWindow);

// // 🔁 Screenshot every 5min and send to renderer
// setInterval(async () => {
//   console.log("[Main] Screenshot timer triggered");

//   if (!win || win.isDestroyed()) {
//     console.warn("[Main] BrowserWindow not ready yet.");
//     return;
//   }

//   try {

//     const sources = await desktopCapturer.getSources({ types: ["screen"] });
//     sources.forEach((source, index) => {
//       const base64 = source.thumbnail.toDataURL();
//       win.webContents.send("screenshot-captured", { index, image: base64 });
//     });
//   } catch (err) {
//     console.error("[Main] Error capturing screen:", err);
//   }
// }, 180000);

setInterval(async () => {
  console.log("[Main] Screenshot timer triggered");

  if (!win || win.isDestroyed()) {
    console.warn("[Main] BrowserWindow not ready yet.");
    return;
  }

  try {
    // Get the primary display size
    const { width, height } = screen.getPrimaryDisplay().size;
    const sources = await desktopCapturer.getSources({
      types: ["screen"],
      thumbnailSize: { width, height }, // 👈 Force full-resolution screenshot
    });

    sources.forEach((source, index) => {
      const base64 = source.thumbnail.toDataURL(); // base64-encoded PNG
      win.webContents.send("screenshot-captured", {
        type: "screenshot",
        data: base64,
      });
    });
  } catch (err) {
    console.error("[Main] Error capturing screen:", err);
  }
}, 1800000); // 3 minutes (180,000ms)

let lastActive = null;
let lastActiveStartTime = null;

setInterval(async () => {
  try {
    const active = await activeWindow();

    const now = new Date();

    if (!active) {
      // No active window detected, do nothing
      return;
    }

    // First run or active window changed
    if (
      !lastActive ||
      active.owner.name !== lastActive.owner.name ||
      active.title !== lastActive.title
    ) {
      // If lastActive exists, send "window-closed" event with timestamp
      if (lastActive) {
        win.webContents.send("window-closed", {
          appName: lastActive.owner.name,
          title: lastActive.title,
          closedAt: now.toISOString(),
          openedAt: lastActiveStartTime.toISOString(),
        });
      }

      // Update current active window and start time
      lastActive = active;
      lastActiveStartTime = now;

      // Send "window-opened" event with timestamp
      win.webContents.send("window-opened", {
        app: active.owner.name,
        title: active.title,
        openedAt: now.toISOString(),
      });

      console.log(
        `Window opened: ${active.owner.name} - ${
          active.title
        } at ${now.toISOString()}`
      );
    } else {
      // Same window still active, no event
    }
  } catch (err) {
    console.error("❌ Error retrieving active window:", err.message || err);
  }
}, 20000);

setInterval(() => {
  const idleTime = powerMonitor.getSystemIdleTime(); // in seconds
  const now = Date.now();

  if (idleTime >= 900) {
    // User is idle 15+ mins

    if (!lastIdleSentAt || now - lastIdleSentAt >= 15 * 60 * 1000) {
      showIdleNotification();
      win.webContents.send("idle-time", idleTime);
      lastIdleSentAt = now;
      console.log("Idle for 15 min. Sent to backend.");
    }
  } else {
    // User is active again → reset idle tracking
    lastIdleSentAt = null;
    hasShownIdleAlert = false;
  }
}, 10000); // Check every 10 seconds
