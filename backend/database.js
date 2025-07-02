const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./thoughtbubble.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the thoughtbubble.db database.');
});

const createTableSql = `
  CREATE TABLE IF NOT EXISTS notes (
    id TEXT PRIMARY KEY,
    type TEXT,
    content TEXT,
    category TEXT,
    reminder TEXT,
    reminderTimestamp INTEGER,
    completed INTEGER,
    timestamp TEXT
  );
`;

db.run(createTableSql, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("'notes' table is ready.");
});

module.exports = db;