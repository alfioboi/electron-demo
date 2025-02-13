const { app, BrowserWindow, screen, ipcMain} = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  const size = screen.getPrimaryDisplay().workAreaSize;
  const args = process.argv.slice(1);
  const serve = args.some((val) => val === '--serve');
  console.log(__dirname, "dirname");
  mainWindow = new BrowserWindow({
    width: size.width,
    height: size.height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      allowRunningInsecureContent: serve,
      contextIsolation: true,
    },
  });
  if (serve) {
    const url = 'http://localhost:4200';
    console.log(url);
    mainWindow.loadURL(url).then();
  } else {
    const url = path.join(__dirname, 'dist/talk-electron-demo/browser/index.html');
    console.log(url);
    mainWindow.loadFile(url).then(() => {
      if (serve) {
        mainWindow.webContents.openDevTools();
      }
    });
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('salutaNode', (event, arg) => {
  console.log(arg, `Saluto ricevuto da Angular`);
  mainWindow.webContents.send('salutaAngular', 'Ciao Angular, sono Node');
});
