import { Schema, model } from 'mongoose';

export interface IGranter {
  name: string;
  wishesGranted: number;
  totalSpent?: number;
}

const GranterSchema = new Schema<IGranter>({
  name: { type: String, required: true },
  wishesGranted: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 }
});

export const Granter = model<IGranter>('Granter', GranterSchema);
