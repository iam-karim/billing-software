import { z } from "zod";

const envSchema = z.object({
  // Application
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),

  // Database
  DATABASE_URL: z.string().min(1),

  // Frontend
  CLIENT_URL: z.string().url().default("http://localhost:5173"),

  // Authentication
  JWT_SECRET: z.string().min(64, "JWT_SECRET must be at least 64 characters"),
  JWT_EXPIRES_IN: z.string().default("15m"),

  // Security
  BCRYPT_SALT_ROUNDS: z.coerce.number().int().min(10).max(15).default(12),
});

export type Env = z.infer<typeof envSchema>;

export const env = Object.freeze(envSchema.parse(process.env));