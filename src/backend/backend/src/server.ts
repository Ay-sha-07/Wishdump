import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './db';
import wishesRouter from './routes/wishes';
import grantersRouter from './routes/granters';

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ service: 'wishdump-backend' }));

app.use('/api/wishes', wishesRouter);
app.use('/api/granters', grantersRouter);

connectDb()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('Failed to connect DB:', err);
    process.exit(1);
  });
