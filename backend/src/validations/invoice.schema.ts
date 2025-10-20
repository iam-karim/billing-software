import { z } from 'zod';

export const invoiceSchema = z.object({
  clientName: z.string(),
  clientEmail: z.string().email(),
  items: z.array(z.object({
    description: z.string(),
    qty: z.number(),
    price: z.number()
  })),
  subtotal: z.number(),
  tax: z.number().optional(),
  total: z.number()
});
