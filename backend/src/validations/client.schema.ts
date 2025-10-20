import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  address: z.string().optional(),
  companyName: z.string().optional(),
  gstNumber: z.string().optional(),
});

export const updateClientSchema = createClientSchema.partial();

export const queryClientSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
});
