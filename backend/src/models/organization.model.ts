import mongoose, { Schema, Document } from 'mongoose';

export interface IOrganization extends Document {
  name: string;
  domain?: string;
  plan?: mongoose.Types.ObjectId;
  status?: 'active' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

const OrganizationSchema = new Schema<IOrganization>(
  {
    name: { type: String, required: true },
    domain: { type: String },
    plan: { type: Schema.Types.ObjectId, ref: 'SubscriptionPlan' },
    status: { type: String, enum: ['active', 'suspended'], default: 'active' }
  },
  { timestamps: true }
);

export const OrganizationModel = mongoose.model<IOrganization>('Organization', OrganizationSchema);
