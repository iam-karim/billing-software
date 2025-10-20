import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscriptionPlan extends Document {
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  isActive: boolean;
  createdAt: Date;
}

const SubscriptionSchema = new Schema<ISubscriptionPlan>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  billingPeriod: { type: String, enum: ['monthly', 'yearly'], default: 'monthly' },
  features: { type: [String], default: [] },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const SubscriptionModel = mongoose.model<ISubscriptionPlan>('SubscriptionPlan', SubscriptionSchema);
