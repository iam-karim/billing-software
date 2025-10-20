import { z } from 'zod';

export const createPlanSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    price: z.number().nonnegative(),
    billingPeriod: z.enum(['monthly', 'yearly']),
    features: z.array(z.string()).min(1)
  })
});

export const updatePlanSchema = createPlanSchema.partial();
