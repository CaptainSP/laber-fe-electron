const { default: axios } = require("axios");
const {
  app,
  BrowserWindow,
  session,
  Menu,
  protocol,
  ipcMain,
  desktopCapturer,
} = require("electron");
const os = require("os");

let mainWindow;

function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      // IPv4 ve non-internal bir adres olup olmadığını kontrol etme
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "127.0.0.1"; // Yerel IP adresi bulunamazsa varsayılan olarak localhost döner
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      nodeIntegrationInWorker: true,
      session: true,
      devTools: true,
      webSecurity: false,
      preload: __dirname + "/preload.js",
    },
    autoHideMenuBar: true,
  });

  mainWindow.loadURL("https://kiosk.cerebeye.io/");
  //mainWindow.loadFile("index.html");

  // İlk açıldığında tam ekran moduna geç
  mainWindow.setKiosk(true);

  //mainWindow.webContents.openDevTools();

  // Kamera iznini otomatik vermek için
  session.defaultSession.setPermissionRequestHandler(
    (webContents, permission, callback) => {
      if (permission === "media" || permission === "display-capture" ) {
        return callback(true); // Kamera ve mikrofon izinlerini otomatik olarak ver
      }
      callback(false);
    }
  );

  session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
    desktopCapturer.getSources({ types: ['screen'] }).then((sources) => {
      // Grant access to the first screen found.
      callback({ video: sources[0], audio: 'loopback' })
    })
  });

  mainWindow.on("close", () => {
    // Uygulamayı kapatmadan önce tam ekran modundan çıkmak
    mainWindow.setKiosk(false);
  });

  // Menüyü oluştur ve uygula
  createMenu();
}

function createMenu() {
  const localIpAddress = getLocalIpAddress(); // IP adresini al
  const targetUrl = `http://10.0.0.16:3001/login`; // Kullanılacak URL
  console.log(targetUrl);
  const template = [
    {
      label: "My Menu",
      submenu: [
        {
          label: "Go to URL",
          click() {
            mainWindow.webContents.openDevTools();

            mainWindow.loadURL(targetUrl);
          },
        },
        // close app
        {
          label: "Close",
          click() {
            app.quit();
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  
});

app.on("window-all-closed", () => {
  //if (process.platform !== "darwin") {
  app.quit();
  //}
});

protocol.registerSchemesAsPrivileged([
  {
    scheme: "http",
    privileges: {
      bypassCSP: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true,
    },
  },
]);

ipcMain.handle("print-iframe", async (event, url, printName) => {
  const printWindow = new BrowserWindow({ show: false });

  printWindow.loadURL(url);

  printWindow.webContents.on("did-finish-load", async () => {
    const printerList = await printWindow.webContents.getPrintersAsync();
    const defaultPrinter = printerList.find((printer) => printer.isDefault);

    printWindow.webContents.print(
      {
        deviceName: printName || defaultPrinter.name,
        silent: true,
        printBackground: true,
      },
      () => {
        printWindow.close();
      }
    );
  });
});

ipcMain.handle("get-printers", async (event) => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    const printers = await focusedWindow.webContents.getPrintersAsync();
    return printers;
  }
  return [];
});

ipcMain.handle("save-video", async (event, videoArrayBuffer) => {
  console.log("Saving video...");
  const fs = require("fs");
  const path = require("path");
  const filePath = path.join(app.getPath("downloads"), "video.mp4");
  fs.writeFileSync(filePath, Buffer.from(videoArrayBuffer));
  return filePath;
});

ipcMain.handle("stop-video", async (event) => {
  await axios.post("http://localhost:5000/stop-recording");
  return true;
});

ipcMain.handle("start-video", async (event) => {
  await axios.post("http://localhost:5000/start-recording");
  return true;
});
