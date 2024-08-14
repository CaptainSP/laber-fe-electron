const { contextBridge, ipcRenderer, webContents } = require("electron");

// Güvenli bir şekilde belirli node işlevlerini veya modüllerini pencere (window) nesnesine köprüleyin
contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: ipcRenderer,
  printIframe: (iframeContent, printName) =>
    ipcRenderer.invoke("print-iframe", iframeContent, printName),
  getPrinters: () => ipcRenderer.invoke("get-printers"),
  saveVideo: (videoArrayBuffer) =>
    ipcRenderer.invoke("save-video", videoArrayBuffer),
  mergeVideo: (music) => ipcRenderer.invoke("merge-video", music),
  startVideo: () => ipcRenderer.invoke("start-video"),
  stopVideo: () => ipcRenderer.invoke("stop-video"),
  deleteVideo: () => ipcRenderer.invoke("delete-video"),
  saveImage: (imageArrayBuffer) =>
    ipcRenderer.invoke("save-image", imageArrayBuffer),
  getVideo: (path) => ipcRenderer.invoke("get-video", path),
  // Diğer API'leri buraya ekleyebilirsiniz
});
