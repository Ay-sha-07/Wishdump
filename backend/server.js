const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple in-memory store (resets when server restarts)
let wishes = [
  { id: 1, title: 'A lifetime supply of bubble tea', isGranted: false },
  { id: 2, title: "Help me pay for my dog's surgery", isGranted: true }
];

// Log every request for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body || '');
  next();
});

// GET all wishes
app.get('/api/wishes', (req, res) => {
  res.json(wishes);
});

// POST a new wish
app.post('/api/wishes', (req, res) => {
  const newWish = { id: Date.now(), ...req.body, isGranted: false };
  wishes.push(newWish);
  res.status(201).json(wishes); // send updated list
});

// PUT - mark wish as granted
app.put('/api/wishes/:id/grant', (req, res) => {
  const wishId = parseInt(req.params.id);
  wishes = wishes.map(wish =>
    wish.id === wishId ? { ...wish, isGranted: true } : wish
  );
  res.json(wishes); // send updated list
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
