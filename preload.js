const { contextBridge, ipcRenderer, webContents } = require('electron');

// Güvenli bir şekilde belirli node işlevlerini veya modüllerini pencere (window) nesnesine köprüleyin
contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: ipcRenderer,
    printIframe: (iframeContent, printName) => ipcRenderer.invoke('print-iframe', iframeContent,printName),
    getPrinters: () => ipcRenderer.invoke('get-printers'),
    saveVideo: (videoArrayBuffer) => ipcRenderer.invoke('save-video', videoArrayBuffer),
    stopVideo: () => ipcRenderer.invoke('stop-video'),
    startVideo: () => ipcRenderer.invoke('start-video'),
    // Diğer API'leri buraya ekleyebilirsiniz
});