const { app, BrowserWindow, screen, ipcMain, globalShortcut, Menu} = require('electron');
const path = require('path');
const { Worker } = require('worker_threads');

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
    mainWindow.loadURL(url).then();
  } else {
    const url = path.join(__dirname, 'dist/talk-electron-demo/browser/index.html');
    mainWindow.loadFile(url).then();
  }
  const menuTemplate = [
    {
      label: 'Funzionalità',
      submenu: [
        { label: 'Home', click: () => mainWindow.webContents.send('navigate', 'home') },
        { label: 'Expenses', click: () => mainWindow.webContents.send('navigate', 'expenses') },
        { label: 'Contacts', click: () => mainWindow.webContents.send('navigate', 'contacts') },
        { label: 'About', click: () => mainWindow.webContents.send('navigate', 'about') },
        { label: 'DevTools', click: () => mainWindow.webContents.openDevTools() },
        { label: 'Exit', click: () => app.quit() }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(menuTemplate);
  mainWindow.setMenu(menu);
  globalShortcut.register('CommandOrControl+R', () => {});
  globalShortcut.register('F5', () => {});
  globalShortcut.register('Control+Shift+R', () => {});
  globalShortcut.register('CommandOrControl+Shift+R', () => {});
  // Aggiungi una scorciatoia per aprire DevTools
  globalShortcut.register('CommandOrControl+Shift+I', () => {
    mainWindow.webContents.openDevTools();
  });
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
ipcMain.on('insert-expense', (event, expense) => {
  const worker = new Worker(path.join(__dirname, 'db-worker.js'));
  worker.on('message', (result) => {
    event.reply('expense-inserted', result);
  });
  worker.postMessage({ type: 'insert', data: expense });
});

ipcMain.on('query-expenses', (event) => {
  const worker = new Worker(path.join(__dirname, 'db-worker.js'));
  worker.on('message', (result) => {
    event.reply('expenses-queried', result);
  });
  worker.postMessage({ type: 'query' });
});
