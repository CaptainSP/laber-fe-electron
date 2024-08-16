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
  keyFilename: "./arcane-text-292515-f1270b8a6ab1.json",
});

let mainWindow;

// set env to development
process.env.NODE_ENV = "development";

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

  mainWindow.loadURL("http://10.0.0.16:3001/aichat");
  //mainWindow.loadFile("index.html");

  // İlk açıldığında tam ekran moduna geç
  mainWindow.setKiosk(false);

  mainWindow.webContents.openDevTools();

  session.defaultSession.webRequest.onBeforeSendHeaders(
    this.filter,
    (details, callback) => {
      details.requestHeaders["User-Agent"] =
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:70.0) Gecko/20100101 Firefox/70.0";

      callback({ requestHeaders: details.requestHeaders });
    }
  );

  // Kamera iznini otomatik vermek için
  session.defaultSession.setPermissionRequestHandler(
    (webContents, permission, callback) => {
      if (
        permission === "media" ||
        permission === "display-capture" ||
        permission === ""
      ) {
        return callback(true); // Kamera ve mikrofon izinlerini otomatik olarak ver
      }
      callback(false);
    }
  );

  session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
    desktopCapturer.getSources({ types: ["screen"] }).then((sources) => {
      // Grant access to the first screen found.
      callback({ video: sources[0], audio: "loopback" });
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

let event;

let audioStream;
let recording;
let recognizeStream;

recording = recorder.record({
  sampleRate: 16000, // Sample rate (adjust as needed)
  channels: 1, // Mono audio
  audioType: "wav", // Output audio type,
  recorder: "sox", // Try also "arecord" or "sox"
  device: "waveaudio", // Try also "plughw:1,0" or "plughw:0,0",
  debug: "record",
});
audioStream = recording.stream();
audioStream.on("end", () => {
  if (recognizeStream) {
    recognizeStream.end();
    recognizeStream = null;
  }
});

//recording.pause();

ipcMain.on("start-recording", async (a) => {
  event = a;
  console.log("Recording started...");

  recognizeStream = client
    .streamingRecognize({
      config: {
        encoding: "LINEAR16",
        sampleRateHertz: 16000,
        languageCode: "tr-TR",
        enableSpeakerDiarization: true,
        model: "latest_long",
      },
      interimResults: true,
    })
    .on("error", console.error)
    .on("data", (data) => {
      console.log(
        `Real time transcript : ${data.results[0]?.alternatives?.[0]?.transcript} [isFinal: ${data.results[0]?.isFinal}]`
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
    });

  audioStream.pipe(recognizeStream);

  recording.resume();
});

ipcMain.handle("pause-recording", async (event) => {
  console.log("Recording paused...");
  recording.pause();
  if (recognizeStream) {
    recognizeStream.end();
    recognizeStream = null;
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

    const desktopPath = app.getPath("desktop");
    const filePath = path.join(
      desktopPath,
      "laber-webcam-script",
      videoPath + "-input" + ".mp4"
    );

    await fs.promises.writeFile(filePath, Buffer.from(videoArrayBuffer));

    console.log("Successfully saved video:", filePath);
    return filePath;
  } catch (error) {
    console.error("Error saving video:", error);
    throw error; // Bu hata frontend'e geri iletilecek
  }
});

ipcMain.handle("delete-video", async (event) => {
  try {
    console.log("Deleting video...");

    const desktopPath = app.getPath("desktop");
    const filePath = path.join(
      desktopPath,
      "laber-webcam-script",
      videoPath + "-input" + ".mp4"
    );

    await fs.promises.unlink(filePath);

    videoPath = null;
  } catch (error) {
    console.error("Error deleting video:", error);
    throw error; // Bu hata frontend'e geri iletilecek
  }
});

ipcMain.handle("merge-video", async (event, music) => {
  const final = v4();

  const desktopPath = app.getPath("desktop");
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

  await axios.post("http://localhost:5000/merge_videos", {
    output: absOutput,
    input: absInput,
    photo: absPhoto,
    final: absFinal,
    music: absMusic,
  });
  return absFinal;
});

ipcMain.handle("start-video", async (event) => {
  const desktopPath = app.getPath("desktop");
  const absOutput = path.join(
    desktopPath,
    "laber-webcam-script",
    outputPath + "-output" + ".mp4"
  );
  await axios.post("http://localhost:5000/start_video", {
    output: absOutput,
    duration: 60 * 10,
  });
  return true;
});

ipcMain.handle("stop-video", async (event) => {
  await axios.get("http://localhost:5000/stop_recording");
  return true;
});

ipcMain.handle("save-image", async (event, imageArrayBuffer) => {
  const desktopPath = app.getPath("desktop");
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
