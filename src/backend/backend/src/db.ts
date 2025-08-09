import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export async function connectDb() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI not set in .env');
  await mongoose.connect(uri);
  console.log('MongoDB connected');
}
