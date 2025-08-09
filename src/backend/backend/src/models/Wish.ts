import { Schema, model } from 'mongoose';

export interface IWish {
  title: string;
  description?: string;
  category?: string;
  priceRange?: string;
  imageUrl?: string;
  isGranted: boolean;
  grantedBy?: string;
  createdAt?: Date;
  grantedAt?: Date;
}

const WishSchema = new Schema<IWish>({
  title: { type: String, required: true },
  description: String,
  category: String,
  priceRange: String,
  imageUrl: String,
  isGranted: { type: Boolean, default: false },
  grantedBy: String,
  createdAt: { type: Date, default: () => new Date() },
  grantedAt: Date,
});

export const Wish = model<IWish>('Wish', WishSchema);
