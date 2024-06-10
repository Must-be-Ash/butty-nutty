const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const cors = require('cors');

const app = express();
const port = 3001;

// Set up lowdb
const adapter = new FileSync('db.json');
const db = low(adapter);

// Set default count if db is empty
db.defaults({ count: 0 }).write();

app.use(cors());

// Endpoint to get the current count
app.get('/api/count', (req, res) => {
  const count = db.get('count').value();
  res.json({ count });
});

// Endpoint to increment the count
app.post('/api/increment', (req, res) => {
  const newCount = db.update('count', n => n + 1).write();
  res.json({ count: newCount.count });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
