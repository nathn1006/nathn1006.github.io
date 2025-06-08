const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const DB_FILE = './reservations.json';

function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.get('/reservations', (req, res) => {
  res.json(readDB());
});

app.post('/reserve', (req, res) => {
  const db = readDB();
  db.pending.push({ ...req.body, submittedAt: new Date().toISOString() });
  writeDB(db);
  res.json({ success: true });
});

app.post('/approve/:index', (req, res) => {
  const db = readDB();
  const index = parseInt(req.params.index);
  const approved = db.pending.splice(index, 1)[0];
  approved.validatedAt = new Date().toISOString();
  approved.expiresAt = new Date(Date.now() + (req.body.hours || 24) * 3600000).toISOString();
  db.approved = approved;
  db.history.unshift({ ...approved, status: "approuvé" });
  writeDB(db);
  res.json({ success: true });
});

app.post('/reject/:index', (req, res) => {
  const db = readDB();
  const rejected = db.pending.splice(parseInt(req.params.index), 1)[0];
  rejected.validatedAt = new Date().toISOString();
  db.history.unshift({ ...rejected, status: "refusé" });
  writeDB(db);
  res.json({ success: true });
});

app.post('/cancel', (req, res) => {
  const db = readDB();
  if (db.approved) {
    db.history.unshift({ ...db.approved, status: "annulée", validatedAt: new Date().toISOString() });
    db.approved = null;
    writeDB(db);
  }
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
