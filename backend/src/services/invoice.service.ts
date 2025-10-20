import { InvoiceModel, IInvoice } from '../models/invoice.model';
import mongoose from 'mongoose';

export const invoiceService = {
  // List invoices for a tenant/user
  async list(userId: string, _query: any): Promise<IInvoice[]> {
    return InvoiceModel.find({ tenantId: new mongoose.Types.ObjectId(userId) })
      .sort({ createdAt: -1 });
  },

  // Get single invoice by ID
  async get(id: string): Promise<IInvoice | null> {
    return InvoiceModel.findById(id);
  },

  // Create a new invoice
  async create(userId: string, data: Partial<IInvoice>): Promise<IInvoice> {
    // generate invoice number (simple example)
    const number = 'INV-' + Date.now();

    const invoice = new InvoiceModel({
      number,
      tenantId: new mongoose.Types.ObjectId(userId),
      clientId: data.clientId ? new mongoose.Types.ObjectId(data.clientId) : undefined,
      items: data.items || [],
      subtotal: data.subtotal || 0,
      tax: data.tax || 0,
      total: data.total || 0,
      status: data.status || 'DRAFT',
      dueDate: data.dueDate
    });

    return invoice.save();
  },

  // Update an invoice
  async update(id: string, data: Partial<IInvoice>): Promise<IInvoice | null> {
    return InvoiceModel.findByIdAndUpdate(id, data, { new: true });
  },

  // Delete an invoice
  async remove(id: string): Promise<boolean> {
    const result = await InvoiceModel.findByIdAndDelete(id);
    return !!result;
  }
};
