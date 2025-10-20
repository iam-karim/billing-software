import mongoose, { Schema, Document } from 'mongoose';

export interface ISystemLog extends Document {
  action: string;
  userId?: mongoose.Types.ObjectId;
  metadata?: any;
  ip?: string;
  userAgent?: string;
  createdAt: Date;
}

const SystemLogSchema = new Schema<ISystemLog>({
  action: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  metadata: { type: Schema.Types.Mixed },
  ip: { type: String },
  userAgent: { type: String }
}, { timestamps: true });

export const SystemLogModel = mongoose.model<ISystemLog>('SystemLog', SystemLogSchema);
