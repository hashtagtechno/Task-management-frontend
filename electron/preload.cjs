// console.log('[Preload] Script loaded 🚀');
// // import { contextBridge, ipcRenderer } from 'electron';
// const { contextBridge, ipcRenderer } = require('electron');
// console.log('[Preload] Script loaded');

// contextBridge.exposeInMainWorld('electronAPI', {
//   captureScreen: (options) => ipcRenderer.invoke('request-screenshot', options),

//   onActiveWindowUpdate: (callback) => {
//     ipcRenderer.on('active-window-update', (_, data) => {
//       callback(data);
//     });
//   },

//   onWindowOpened: (callback) =>
//     ipcRenderer.on('window-opened', (event, data) => callback(data)),

//   onWindowClosed: (callback) =>
//     ipcRenderer.on('window-closed', (event, data) => callback(data)),
// });

// // Post screenshot to Angular
// ipcRenderer.on('screenshot-captured', (_, data) => {
//   console.log('[Preload] screenshot-captured event received from main');
//   window.postMessage({ type: 'screenshot', data: data.image }, '*');
// });
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  isElectron: true,
  captureScreen: (options) => ipcRenderer.invoke("request-screenshot", options),

  onActiveWindowUpdate: (callback) => {
    ipcRenderer.on("active-window-update", (_, data) => callback(data));
  },

  onWindowOpened: (callback) => {
    ipcRenderer.on("window-opened", (event, data) => callback(data));
  },

  onWindowClosed: (callback) => {
    ipcRenderer.on("window-closed", (event, data) => callback(data));
  },
  onIdleTime: (callback) =>
    ipcRenderer.on("idle-time", (event, idleTime) => callback(idleTime)),
});

// ✅ Keep this outside any conditional
ipcRenderer.on("screenshot-captured", (_, data) => {
  console.log("[Preload] screenshot-captured event received from main");
  // window.postMessage({ type: 'screenshot', data: data.image }, '*');
  window.postMessage({ type: "screenshot", data: data.data }, "*");
});
