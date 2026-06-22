import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(100),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(100),

  displayName: z
    .string()
    .trim()
    .min(2, "Display name must be at least 2 characters")
    .max(200),

  email: z
    .email("Invalid email address")
    .trim()
    .toLowerCase()
    .max(255),

  password: z
  .string()
  .trim()
  .min(8, "Password must be at least 8 characters")
  .max(100)
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
});

export const loginSchema = z.object({
  email: z
    .email("Invalid email address")
    .trim()
    .toLowerCase(),

  password: z
  .string()
  .trim()
  .min(1, "Password is required")
  .max(100),

});