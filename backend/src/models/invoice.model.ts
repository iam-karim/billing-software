import mongoose, { Schema, Document } from 'mongoose';

// Define a proper interface for an invoice item
export interface IInvoiceItem {
  description: string;
  quantity: number;
  price: number;
  total: number;
}

// Main Invoice interface
export interface IInvoice extends Document {
  number: string;
  tenantId: mongoose.Types.ObjectId; // user or organization
  clientId: mongoose.Types.ObjectId;
  items: IInvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Sub-schema for items
const InvoiceItemSchema = new Schema<IInvoiceItem>({
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
});

// Main Invoice schema
const InvoiceSchema = new Schema<IInvoice>(
  {
    number: { type: String, required: true, unique: true, index: true },
    tenantId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    items: { type: [InvoiceItemSchema], default: [] }, // properly typed array
    subtotal: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    status: { type: String, enum: ['DRAFT', 'SENT', 'PAID', 'OVERDUE'], default: 'DRAFT' },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export const InvoiceModel = mongoose.model<IInvoice>('Invoice', InvoiceSchema);
