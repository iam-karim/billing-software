import { z } from 'zod';

export const createPlanSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  price: z.number().min(0, 'Price must be non-negative'),
  billingPeriod: z.enum(['monthly', 'yearly']),
  features: z.array(z.string()).min(1, 'At least one feature required'),
  isActive: z.boolean().default(true),
});

export const updateUserRoleSchema = z.object({
  role: z.enum(['USER', 'ADMIN', 'SUPER_ADMIN']),
});

export const updateUserStatusSchema = z.object({
  status: z.enum(['active', 'suspended', 'deleted']),
});

export const updateOrganizationSchema = z.object({
  name: z.string().min(2),
  planId: z.string(),
  status: z.enum(['active', 'suspended']).optional(),
});

export const systemSettingsSchema = z.object({
  systemName: z.string().min(2),
  supportEmail: z.string().email(),
  defaultCurrency: z.string().length(3),
  defaultTaxRate: z.number().min(0).max(100),
  dateFormat: z.string(),
  timeZone: z.string(),
});
