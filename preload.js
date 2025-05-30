// preload.js
// const { contextBridge, desktopCapturer } = require('electron');
// console.log('[Preload] Script loaded');
// contextBridge.exposeInMainWorld('electronAPI', {
  
//  captureScreen: async () => {
//   try {
//     console.log('[Preload] captureScreen called');
//     const sources = await desktopCapturer.getSources({ types: ['screen'] });
//     console.log('[Preload] Sources:', sources);
    
//     const screenSource = sources[0];
//     return screenSource.thumbnail.toDataURL();
//   } catch (error) {
//     console.error('[Preload] Error in captureScreen:', error);
//     return null;
//   }
// }
// });
// const { contextBridge, ipcRenderer } = require('electron');
// const { contextBridge, ipcRenderer } = require('electron');
// console.log('[Preload] Script loaded');
// contextBridge.exposeInMainWorld('electronAPI', {
//   captureScreen: (options) => ipcRenderer.invoke('request-screenshot', options),
// });

// Expose a safe API to the renderer (Angular) app
// contextBridge.exposeInMainWorld('electronAPI', {
//   // Angular can now call this
//   captureScreen: () => {
//     console.log('[Preload] captureScreen request sent to main process');
//     return ipcRenderer.invoke('request-screenshot'); // IPC call to main
//   }
// });

// const { contextBridge, ipcRenderer, desktopCapturer } = require('electron');

// console.log('[Preload] Script loaded');

// contextBridge.exposeInMainWorld('electronAPI', {
//   captureScreen: (options) => ipcRenderer.invoke('request-screenshot', options),
// });

// // ✅ Listen for main process timed screenshot command
// ipcRenderer.on('start-auto-capture', async () => {
//   console.log('[Preload] Received auto-capture trigger');

//   try {
//     const sources = await desktopCapturer.getSources({ types: ['screen'] });
//     const screenSource = sources[0];
//     const imageBase64 = screenSource.thumbnail.toDataURL();

//     ipcRenderer.send('screenshot-result', imageBase64);
//   } catch (error) {
//     console.error('[Preload] Error during auto-capture:', error);
//   }
// });

const { contextBridge, ipcRenderer } = require('electron');
console.log('[Preload] Script loaded');

contextBridge.exposeInMainWorld('electronAPI', {
  captureScreen: (options) => ipcRenderer.invoke('request-screenshot', options),
});

ipcRenderer.on('screenshot-captured', (_, data) => {
  console.log('[Preload] screenshot-captured event received from main'); // <== THIS
  window.postMessage({ type: 'screenshot', data: data.image }, '*');
});
