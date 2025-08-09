import express from 'express';
import { Wish } from '../models/Wish';

const router = express.Router();

// GET /api/wishes
router.get('/', async (req, res) => {
  const wishes = await Wish.find().sort({ createdAt: -1 });
  res.json(wishes);
});

// POST /api/wishes
router.post('/', async (req, res) => {
  const data = req.body;
  const wish = new Wish(data);
  await wish.save();
  res.status(201).json(wish);
});

// PATCH /api/wishes/:id/grant  -> mark granted
router.patch('/:id/grant', async (req, res) => {
  const { id } = req.params;
  const { grantedBy } = req.body;
  const wish = await Wish.findByIdAndUpdate(
    id,
    { isGranted: true, grantedBy, grantedAt: new Date() },
    { new: true }
  );
  if (!wish) return res.status(404).json({ message: 'Wish not found' });
  res.json(wish);
});

export default router;
