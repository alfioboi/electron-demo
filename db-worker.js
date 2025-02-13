// db-worker.js
const { parentPort } = require('worker_threads');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('expenses.db', (err) => {
  if (err) {
    parentPort.postMessage({ success: false, error: err.message });
  } else {
    db.run(`CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY, description TEXT, amount REAL, date TEXT)`);
  }
});

parentPort.on('message', (task) => {
  if (task.type === 'insert') {
    const { description, amount, date } = task.data;
    db.run(`INSERT INTO expenses (description, amount, date) VALUES (?, ?, ?)`, [description, amount, date], function(err) {
      if (err) {
        parentPort.postMessage({ success: false, error: err.message });
      } else {
        parentPort.postMessage({ success: true, id: this.lastID });
      }
    });
  } else if (task.type === 'query') {
    db.all(`SELECT * FROM expenses`, [], (err, rows) => {
      if (err) {
        parentPort.postMessage({ success: false, error: err.message });
      } else {
        parentPort.postMessage({ success: true, data: rows });
      }
    });
  }
});
