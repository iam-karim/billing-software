import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { invoiceService } from '../services/invoice.service';

export const invoiceController = {
  getInvoices: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const invoices = await invoiceService.list(userId, req.query);
    res.json(invoices);
  }),

  getInvoiceById: asyncHandler(async (req: Request, res: Response) => {
    const invoice = await invoiceService.get(req.params.id);
    res.json(invoice);
  }),

  createInvoice: asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const invoice = await invoiceService.create(userId, req.body);
    res.status(201).json(invoice);
  }),

  updateInvoice: asyncHandler(async (req: Request, res: Response) => {
    const invoice = await invoiceService.update(req.params.id, req.body);
    res.json(invoice);
  }),

  deleteInvoice: asyncHandler(async (req: Request, res: Response) => {
    await invoiceService.remove(req.params.id);
    res.status(204).send();
  }),
};
