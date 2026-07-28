import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(100, "First name must not exceed 100 characters"),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(100, "Last name must not exceed 100 characters"),

  email: z
    .email("Invalid email address")
    .trim()
    .toLowerCase()
    .max(255, "Email must not exceed 255 characters"),

  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must not exceed 72 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

export const loginSchema = z.object({
  email: z
    .email("Invalid email address")
    .trim()
    .toLowerCase()
    .max(255, "Email must not exceed 255 characters"),

  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .max(72, "Password must not exceed 72 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;