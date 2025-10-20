import mongoose, { Schema, Document } from 'mongoose';

export interface IClient extends Document {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  address?: string;
  notes?: string;
  userId: mongoose.Types.ObjectId; // owner (tenant)
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema = new Schema<IClient>({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  company: { type: String },
  address: { type: String },
  notes: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const ClientModel = mongoose.model<IClient>('Client', ClientSchema);
