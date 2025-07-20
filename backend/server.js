const express = require('express');
const cors = require('cors');
const db = require('./database.js');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// GET all notes
app.get('/api/notes', (req, res) => {
  const sql = "SELECT * FROM notes ORDER BY timestamp DESC";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

// POST a new note
app.post('/api/notes', (req, res) => {
  const { id, type, content, category, reminder, reminderTimestamp, completed, timestamp } = req.body;
  const sql = `INSERT INTO notes (id, type, content, category, reminder, reminderTimestamp, completed, timestamp) VALUES (?,?,?,?,?,?,?,?)`;
  const params = [id, type, content, category, reminder, reminderTimestamp, completed, timestamp];
  
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": req.body,
      "id": this.lastID
    });
  });
});

// PATCH (update) a note
app.patch('/api/notes/:id', (req, res) => {
  const sql = `UPDATE notes SET 
    content = COALESCE(?, content), 
    completed = COALESCE(?, completed),
    reminder = ?,
    reminderTimestamp = ?
    WHERE id = ?`;
    
  const params = [req.body.content, req.body.completed, req.body.reminder, req.body.reminderTimestamp, req.params.id];
  
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({ message: "success", data: req.body });
  });
});


// DELETE a note
app.delete('/api/notes/:id', (req, res) => {
  const sql = 'DELETE FROM notes WHERE id = ?';
  db.run(sql, req.params.id, function (err, result) {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({ "message": "deleted", changes: this.changes });
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// BACKGROUND JOB: Check for reminders
setInterval(() => {
  const now = new Date().getTime();
  // Find notes with a reminderTimestamp that is past and not yet completed
  const sql = "SELECT * FROM notes WHERE reminderTimestamp <= ? AND completed = 0 AND reminder IS NOT NULL";
  
  db.all(sql, [now], (err, rows) => {
    if (err) {
      console.error("Error fetching due reminders:", err.message);
      return;
    }
    
    rows.forEach(note => {
      console.log(`Reminder for note: ${note.content}`);
      // Here you could trigger a desktop notification, send an email, etc.
      
      // Mark the reminder as handled by setting reminder to null or completed to 1
      const updateSql = "UPDATE notes SET reminder = NULL, reminderTimestamp = NULL WHERE id = ?";
      db.run(updateSql, note.id, function(updateErr) {
        if (updateErr) {
          console.error(`Error updating note ${note.id} after reminder:`, updateErr.message);
        } else {
          console.log(`Reminder for note ${note.id} handled.`);
        }
      });
    });
  });
}, 10000); // Check every 10 seconds, for instance