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
  startVideo: (deviceId) => ipcRenderer.invoke("start-video",deviceId),
  stopVideo: () => ipcRenderer.invoke("stop-video"),
  deleteVideo: () => ipcRenderer.invoke("delete-video"),
  deleteOutput: () => ipcRenderer.invoke("delete-output"),
  saveImage: (imageArrayBuffer) =>
    ipcRenderer.invoke("save-image", imageArrayBuffer),
  getVideo: (path) => ipcRenderer.invoke("get-video", path),
  startRecording: (language) => ipcRenderer.send("start-recording",language),
  pauseRecording: () => ipcRenderer.invoke("pause-recording"),
  onText: (callback) => {
    console.log("onText listens");
    ipcRenderer.on("text", (event, data) => {
      console.log("onText received", data);
      callback(data)
    });
  },
  sendRecordings: (data) => ipcRenderer.send("record-data", data),
  // Diğer API'leri buraya ekleyebilirsiniz
});