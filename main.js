const { app, BrowserWindow, screen} = require('electron');
const path = require('path');

function createWindow() {
  const size = screen.getPrimaryDisplay().workAreaSize;
  const args = process.argv.slice(1);
  const serve = args.some((val) => val === '--serve');
  console.log(__dirname, "dirname");
  const mainWindow = new BrowserWindow({
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      allowRunningInsecureContent: serve,
      contextIsolation: false,
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
