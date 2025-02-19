// db-worker.js
const { parentPort } = require('worker_threads');
const path = require("node:path");
const sqlite3 = require('sqlite3').verbose();
const dbPath =  __dirname.includes('app.asar')
  ? path.join(__dirname, '../../public/expenses.db') :
  path.join(__dirname, 'public', 'expenses.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    parentPort.postMessage({ success: false, error: dbPath });
    // parentPort.postMessage({ success: false, error: err.message });
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
  } else if (task.type === 'update') {
    const { id, description, amount, date } = task.data;
    db.run(`UPDATE expenses SET description = ?, amount = ?, date = ? WHERE id = ?`, [description, amount, date, id], function(err) {
      if (err) {
        parentPort.postMessage({ success: false, error: err.message });
      } else {
        parentPort.postMessage({ success: true, changes: this.changes });
      }
    });
  } else if (task.type === 'delete') {
    db.run(`DELETE FROM expenses WHERE id = ?`, [task.data], function(err) {
      if (err) {
        parentPort.postMessage({ success: false, error: err.message });
      } else {
        parentPort.postMessage({ success: true, changes: this.changes });
      }
    });
  }
});
