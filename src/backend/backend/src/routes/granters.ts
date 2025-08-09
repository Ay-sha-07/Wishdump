import express from 'express';
import { Granter } from '../models/Granter';

const router = express.Router();

// GET /api/granters
router.get('/', async (req, res) => {
  const granters = await Granter.find().sort({ wishesGranted: -1 });
  res.json(granters);
});

// POST /api/granters (create or increment)
router.post('/', async (req, res) => {
  const { name, amount = 0 } = req.body;
  let g = await Granter.findOne({ name });
  if (g) {
    g.wishesGranted += 1;
    g.totalSpent = (g.totalSpent || 0) + amount;
    await g.save();
  } else {
    g = new Granter({ name, wishesGranted: 1, totalSpent: amount });
    await g.save();
  }
  res.json(g);
});

export default router;
