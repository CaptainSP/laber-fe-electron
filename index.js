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
const path = require("path");
const fs = require("fs");
const { v4 } = require("uuid");

const speech = require("@google-cloud/speech");
const recorder = require("node-record-lpcm16");

const client = new speech.SpeechClient({
  keyFilename: path.join(
    app.getAppPath(),
    "/arcane-text-292515-f1270b8a6ab1.json"
  ),
});

let mainWindow;

// set env to development

process.env.DEBUG = "record";

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
  //  if darwin

  if (process.platform === "darwin") {
    mainWindow.setKiosk(false);
    mainWindow.setFullScreen(true);
    mainWindow.webContents.openDevTools();
    mainWindow.menuBarVisible = true;
  } else {
    mainWindow.setKiosk(true);
  }

  mainWindow.focus();

  // Kamera iznini otomatik vermek için
  session.defaultSession.setPermissionRequestHandler(
    (webContents, permission, callback) => {
      if (permission === "media" || permission === "display-capture") {
        return callback(true); // Kamera ve mikrofon izinlerini otomatik olarak ver
      }
      callback(false);
    }
  );

  session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
    desktopCapturer
      .getSources({ types: ["screen"] })
      .then((sources) => {
        // Grant access to the first screen found.
        callback({ video: sources[0], audio: "loopback" });
      })
      .catch((error) => {
        console.error("Error getting screen sources:", error);
        callback({ video: null, audio: null });
      });
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
  // const targetUrl = `http://10.0.0.16:3001/login`; // Kullanılacak URL
  const targetUrl = `http://localhost:3000/survey/survey`; // Kullanılacak URL
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
        {
          label: "Change Devices",
          click() {
            const currentWindowUrl = mainWindow.webContents.getURL();
            const urlObj = new URL(currentWindowUrl);
            const path = "/devices";
            const protocol = urlObj.protocol;
            const host = urlObj.host;
            const newUrl = protocol + "//" + host + path;
            mainWindow.loadURL(newUrl);
          },
        },
        {
          label: "Dev Tools",
          click() {
            mainWindow.webContents.openDevTools();
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

const { autoUpdater } = require("electron-updater");

app.whenReady().then(() => {
  autoUpdater.checkForUpdates();

  autoUpdater.on("update-available", () => {
    // const dialog = require("electron").dialog;
    // dialog
    //   .showMessageBox({
    //     type: "info",
    //     title: "Update available",
    //     message:
    //       "A new version of the application is available. Do you want to update now?",
    //     buttons: ["Yes", "No"],
    //   })
    //   .then((response) => {
    //     if (response.response === 0) {
    //       autoUpdater.downloadUpdate();
    //     }
    //   });
    autoUpdater.downloadUpdate();
  });

  autoUpdater.on("update-downloaded", async () => {
    autoUpdater.quitAndInstall();
  });

  autoUpdater.on("error", (message) => {
    console.error("There was a problem updating the application");
    console.error(message);
    const dialog = require("electron").dialog;
    dialog.showErrorBox("Error", message);
  });

  // if no update
  // autoUpdater.on("update-not-available", () => {
  //   const dialog = require("electron").dialog;
  //   dialog.showErrorBox(
  //     "No updates available",
  //     "The application is up to date."
  //   );
  // });

  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 3 * 60 * 1000);

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
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

let event;

let audioStream;
let recording;
let recognizeStream;

//recording.pause();

let noTextTimeout;

const initNoTextTimeout = () => {
  if (noTextTimeout) {
    clearTimeout(noTextTimeout);
  }
  console.log("initNoTextTimeout");
  noTextTimeout = setTimeout(() => {
    if (recognizeStream) {
      recognizeStream.end();
      recognizeStream = null;
    }
    if (event) {
      event.sender.send("text", {
        text: "",
        isFinal: true,
      });
    }
  }, 10000);
};

ipcMain.on("start-recording", async (a, language) => {
  event = a;
  console.log("Recording started...");

  try {
    if (audioStream) {
      recording.stop();
      audioStream = null;
      recording = null;
    }
  } catch (error) {
    console.error("Error stopping audioStream:", error);
  }

  try {
    if (recognizeStream) {
      recognizeStream.end();
      recognizeStream = null;
    }
  } catch (error) {
    console.error("Error stopping recognizeStream:", error);
  }

  recording = recorder.record({
    sampleRate: 16000, // Sample rate (adjust as needed)
    channels: 1, // Mono audio
    audioType: "wav", // Output audio type,
    recorder: "sox", // Try also "arecord" or "sox"
    debug: "record",
  });
  audioStream = recording.stream();
  audioStream.on("end", () => {
    if (recognizeStream) {
      recognizeStream.end();
      recognizeStream = null;
    }
  });
  audioStream.on("error", (error) => {
    console.error("Error on audioStream:", error);
  });

 
  recognizeStream = client
    .streamingRecognize({
      config: {
        encoding: "LINEAR16",
        sampleRateHertz: 16000,
        languageCode: language == "tr" ? "tr-TR" : "en-US",
        enableSpeakerDiarization: true,
        model: "latest_long",
      },
      singleUtterance: true,
      interimResults: true,
    })
    .on("error", console.error)
    .on("data", (data) => {
      console.log(
        `Real time transcript : ${data.results[0]?.alternatives?.[0]?.transcript} [isFinal: ${data.results[0]?.isFinal}]`,
        data
      );
      if (data.results[0]?.isFinal) {
        console.log(
          "Final transcript : ",
          data.results[0]?.alternatives?.[0]?.transcript
        );
      }
      if (event) {
        event.sender.send("text", {
          text: data.results[0]?.alternatives?.[0]?.transcript,
          isFinal: data.results[0]?.isFinal,
        });
      }
      
        initNoTextTimeout();
      
    });

  audioStream.pipe(recognizeStream);

  recording.resume();
});

ipcMain.handle("pause-recording", async (event) => {
  console.log("Recording paused...");
  recording.stop();
  if (recognizeStream) {
    recognizeStream.end();
    recognizeStream = null;
    clearTimeout(noTextTimeout);
    noTextTimeout = undefined;
  }
});

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

let imagePath = v4();
let videoPath = v4();
let outputPath = v4();

ipcMain.handle("get-printers", async (event) => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    const printers = await focusedWindow.webContents.getPrintersAsync();
    return printers;
  }
  return [];
});

ipcMain.handle("save-video", async (event, videoArrayBuffer) => {
  try {
    console.log("Saving video...");

    videoPath = v4();

    const desktopPath = "C:/laber";
    const filePath = path.join(
      desktopPath,
      "laber-webcam-script",
      videoPath + "-input" + ".mp4"
    );

    await fs.promises.writeFile(filePath, Buffer.from(videoArrayBuffer));

    console.log("Successfully saved video:", filePath);
    fs.appendFileSync(
      "C:/laber/laber-webcam-script/log.txt",
      "Successfully saved video:" + filePath
    );
    return filePath;
  } catch (error) {
    console.error("Error saving video:", error);
    throw error; // Bu hata frontend'e geri iletilecek
  }
});

ipcMain.handle("delete-video", async (event) => {
  try {
    console.log("Deleting video...");

    const desktopPath = "C:/laber";
    const filePath = path.join(
      desktopPath,
      "laber-webcam-script",
      videoPath + "-input" + ".mp4"
    );

    try {
      await fs.promises.unlink(filePath);
    } catch (error) {
      console.error("Error deleting video:", error);
    }

    videoPath = null;
  } catch (error) {
    console.error("Error deleting video:", error);
    throw error; // Bu hata frontend'e geri iletilecek
  }
});

ipcMain.handle("delete-output", async (event) => {
  try {
    console.log("Deleting output...");

    const desktopPath = "C:/laber";
    const filePath = path.join(
      desktopPath,
      "laber-webcam-script",
      outputPath + "-output" + ".mp4"
    );

    try {
      await fs.promises.unlink(filePath);
    } catch (error) {
      console.error("Error deleting video:", error);
    }

    outputPath = undefined;
  } catch (error) {
    console.error("Error deleting video:", error);
    throw error; // Bu hata frontend'e geri iletilecek
  }
});

ipcMain.handle("merge-video", async (event, music) => {
  const final = v4();

  const desktopPath = "C:/laber";
  const absOutput = path.join(
    desktopPath,
    "laber-webcam-script",
    outputPath + "-output" + ".mp4"
  );

  const absInput = path.join(
    desktopPath,
    "laber-webcam-script",
    videoPath + "-input" + ".mp4"
  );

  const absPhoto = path.join(
    desktopPath,
    "laber-webcam-script",
    imagePath + "-image" + ".png"
  );

  const absFinal = path.join(
    desktopPath,
    "laber-webcam-script",
    final + "-final" + ".mp4"
  );

  const absMusic = path.join(desktopPath, "laber-webcam-script", music);

  fs.appendFileSync(
    "C:/laber/laber-webcam-script/log.txt",
    "Sending to merge_videos..."
  );
  fs.appendFileSync("C:/laber/laber-webcam-script/log.txt", "\n\n" + absMusic);
  fs.appendFileSync("C:/laber/laber-webcam-script/log.txt", "\n\n" + absPhoto);
  fs.appendFileSync("C:/laber/laber-webcam-script/log.txt", "\n\n" + absFinal);
  fs.appendFileSync("C:/laber/laber-webcam-script/log.txt", "\n\n" + absInput);
  fs.appendFileSync("C:/laber/laber-webcam-script/log.txt", "\n\n" + absOutput);

  try {
    const response = await axios.post("http://localhost:5000/merge_videos", {
      output: outputPath ? absOutput : undefined,
      input: videoPath ? absInput : undefined,
      photo: absPhoto,
      final: absFinal,
      music: absMusic,
    });
    fs.appendFileSync(
      "C:/laber/laber-webcam-script/log.txt",
      "\n\n" + JSON.stringify(response.data, null, 2) + "\n\n"
    );
    return absFinal;
  } catch (error) {
    console.error("Error merging video:", error);
    fs.appendFileSync(
      "C:/laber/laber-webcam-script/log.txt",
      "\n\n" +
        error +
        "\n\n" +
        JSON.stringify(error.response.data, null, 2) +
        "\n\n"
    );
    throw error; // Bu hata frontend'e geri iletilecek
  }
});

ipcMain.handle("start-video", async (event, deviceId) => {
  outputPath = v4();
  const desktopPath = "C:/laber";
  const absOutput = path.join(
    desktopPath,
    "laber-webcam-script",
    outputPath + "-output" + ".mp4"
  );

  console.log("device", deviceId, typeof deviceId);
  const response = await axios.post("http://localhost:5000/start_video", {
    output: absOutput,
    camera_id: parseInt(deviceId),
    duration: 60 * 10,
  });
  fs.appendFileSync("C:/laber/laber-webcam-script/log.txt", "Start video...");
  fs.appendFileSync(
    "C:/laber/laber-webcam-script/log.txt",
    "Device ID: " + deviceId
  );
  fs.appendFileSync(
    "C:/laber/laber-webcam-script/log.txt",
    "Output: " + absOutput
  );
  fs.appendFileSync(
    "C:/laber/laber-webcam-script/log.txt",
    "Duration: " + 60 * 10
  );
  fs.appendFileSync(
    "C:/laber/laber-webcam-script/log.txt",
    JSON.stringify(response.data, null, 2)
  );

  return true;
});

ipcMain.handle("stop-video", async (event) => {
  await axios.get("http://localhost:5000/stop_recording");
  return true;
});

ipcMain.handle("save-image", async (event, imageArrayBuffer) => {
  const desktopPath = "C:/laber";
  const filePath = path.join(
    desktopPath,
    "laber-webcam-script",
    imagePath + "-image" + ".png"
  );
  await fs.promises.writeFile(filePath, Buffer.from(imageArrayBuffer));
  return true;
});

ipcMain.handle("get-video", async (event, absPath) => {
  const arrayBuffer = await fs.promises.readFile(absPath);
  return arrayBuffer;
});

/// update.py

const { spawn } = require("child_process");
const { url } = require("inspector");
let spawned;

const killPython = async () => {
  spawned = spawn("taskkill /IM python.exe /F", {
    shell: true,
  });
  return new Promise((resolve, reject) => {
    spawned.on("close", (code) => {
      resolve();
    });
  });
};

const update = async () => {
  await killPython();

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 20000);
  });

  const appPath = app.getAppPath();
  const updatePath = path.join(appPath, "script/update.py");

  const fileContent = fs.readFileSync(updatePath, "utf8");
  fs.writeFileSync("C:/laber/laber-webcam-script/update.py", fileContent);

  console.log("Update file copied...");
  fs.appendFileSync(
    "C:/laber/laber-webcam-script/log.txt",
    "Update file copied..."
  );

  spawned = spawn("python " + "C:/laber/laber-webcam-script/update.py", {
    shell: true,
  });

  spawned.stdio[1].on("data", (data) => {
    fs.appendFileSync("C:/laber/laber-webcam-script/log.txt", data.toString());
  });

  spawned.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
    fs.appendFileSync(
      "C:/laber/laber-webcam-script/log.txt",
      `stderr: ${data}`
    );
  });

  console.log("Update started...");
  fs.appendFileSync(
    "C:/laber/laber-webcam-script/log.txt",
    "Update started..."
  );

  setTimeout(() => {
    runPyApp();
  }, 10000);
};

const runPyApp = async () => {
  const pyPath = "C:/laber/laber-webcam-script/app.py";

  if (spawned) {
    spawned.kill();
  }

  spawned = spawn("python " + pyPath, {
    shell: true,
  });

  spawned.stdio[1].on("data", (data) => {
    fs.appendFileSync("C:/laber/laber-webcam-script/log.txt", data.toString());
  });
  fs.appendFileSync("C:/laber/laber-webcam-script/log.txt", "App started...");

  spawned.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
    fs.appendFileSync(
      "C:/laber/laber-webcam-script/log.txt",
      `stderr: ${data}`
    );
  });

  console.log("App started...");
};

update();

app.on("window-all-closed", () => {
  //if (process.platform !== "darwin") {
  app.quit();
  if (spawned) {
    spawned.kill();
  }
  //}
});
