const {app, BrowserWindow, screen, ipcMain, globalShortcut, Menu} = require('electron');
const path = require('path');
const {Worker} = require('worker_threads');

let mainWindow;
const publicPath = __dirname.includes('app.asar')
  ? path.join(__dirname, 'resources', 'public') :
  path.join(__dirname, 'public');

async function createWindow() {
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
    icon: path.join(publicPath, 'engineering.ico')
  });
  if (serve) {
    const url = 'http://localhost:4200';
    await mainWindow.loadURL(url);
  } else {
    const url = path.join(__dirname, 'dist/talk-electron-demo/browser/index.html');
    await mainWindow.loadFile(url);
  }
  const menuTemplate = [
    {
      label: 'Funzionalità',
      submenu: [
        {label: 'Home', click: () => mainWindow.webContents.send('navigate', 'home')},
        {label: 'About us', click: () => mainWindow.webContents.send('navigate', 'about')},
        {label: 'Topics', click: () => mainWindow.webContents.send('navigate', 'topics')},
        {label: 'Expenses', click: () => mainWindow.webContents.send('navigate', 'expenses')},
        {label: 'Contacts', click: () => mainWindow.webContents.send('navigate', 'contacts')},
        {label: 'DevTools', click: () => mainWindow.webContents.openDevTools()},
        {label: 'Exit', click: () => app.quit()}
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(menuTemplate);
  mainWindow.setMenu(menu);
  globalShortcut.register('CommandOrControl+R', () => {
  });
  globalShortcut.register('F5', () => {
  });
  globalShortcut.register('Control+Shift+R', () => {
  });
  globalShortcut.register('CommandOrControl+Shift+R', () => {
  });
  // Aggiungi una scorciatoia per aprire DevTools
  globalShortcut.register('CommandOrControl+Shift+I', () => {
    mainWindow.webContents.openDevTools();
  });
  const express = require('express');
  const server = express();
  server.use(express.json({limit: '1gb'}));

  server.get('/', (req, res) => {
    res.send('Hello from Express server');
  });
  server.post("/expenses", async (req, res) => {
    try {
      const data = req.body;

      // Controllo dati obbligatori
      if (!data.description || !data.amount || !data.date) {
        return res.sendStatus(400); // Risposta immediata con errore 400 (Bad Request)
      }

      // Creazione di un worker per il risultato
      const worker = new Worker(path.join(__dirname, "db-worker.js"));

      // Funzione per gestire il messaggio del worker
      worker.on("message", (result) => {
        if (data.id) {
          mainWindow.webContents.send("expense-updated", result); // Notifico l'update
        } else {
          mainWindow.webContents.send("expense-inserted", result); // Notifico l'inserimento
        }

        // Rispondi con il body JSON una sola volta
        res.status(200).json(result);
      });

      // Gestione degli errori del worker
      worker.on("error", (err) => {
        console.error("Errore dal worker:", err);
        res.status(500).json({error: "Errore del server"});
      });

      // Gestione nel caso il worker termini senza inviare un messaggio
      worker.on("exit", (code) => {
        if (code !== 0) {
          console.error(`Worker terminato con codice ${code}`);
          res.status(500).json({error: "Worker terminato inaspettatamente"});
        }
      });

      // Invia i messaggi al worker
      if (data.id) {
        worker.postMessage({type: "update", data}); // Update
      } else {
        worker.postMessage({type: "insert", data}); // Insert
      }
    } catch (err) {
      console.error("Errore Server:", err);
      res.status(500).json({error: "Errore interno del server"});
    }
  });


  server.delete('/expenses/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const deleteWorker = new Worker(path.join(__dirname, 'db-worker.js'));
      // Funzione per gestire il messaggio del deleteWorker
      deleteWorker.on("message", (result) => {
        mainWindow.webContents.send('expense-deleted', result);

        // Rispondi con il body JSON una sola volta
        res.status(200).json(result);
      });

      // Gestione degli errori del deleteWorker
      deleteWorker.on("error", (err) => {
        console.error("Errore dal deleteWorker:", err);
        res.status(500).json({error: "Errore del server"});
      });

      // Gestione nel caso il deleteWorker termini senza inviare un messaggio
      deleteWorker.on("exit", (code) => {
        if (code !== 0) {
          console.error(`Worker terminato con codice ${code}`);
          res.status(500).json({error: "Worker terminato inaspettatamente"});
        }
      });

      // Invia i messaggi al deleteWorker
      deleteWorker.postMessage({type: 'delete', data: id});
    } catch (err) {
      console.error("Errore Server:", err);
      res.status(500).json({error: "Errore interno del server"});
    }
  })

  server.listen(3000, () => {
    mainWindow.webContents.send('debug', `Express server is running on http://localhost:3000`);
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
  worker.postMessage({type: 'insert', data: expense});
});
ipcMain.on('update-expense', (event, expense) => {
  const worker = new Worker(path.join(__dirname, 'db-worker.js'));
  worker.on('message', (result) => {
    event.reply('expense-updated', result);
  });
  worker.postMessage({type: 'update', data: expense});
});
ipcMain.on('delete-expense', (event, id) => {
  const worker = new Worker(path.join(__dirname, 'db-worker.js'));
  worker.on('message', (result) => {
    event.reply('expense-deleted', result);
  });
  worker.postMessage({type: 'delete', data: id});
});

ipcMain.on('query-expenses', (event) => {
  const worker = new Worker(path.join(__dirname, 'db-worker.js'));
  worker.on('message', (result) => {
    event.reply('expenses-queried', result);
  });
  worker.postMessage({type: 'query'});
});
