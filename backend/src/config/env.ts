import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().int().positive().default(4000),

  DATABASE_URL: z.string().min(1),

  CLIENT_URL: z.string().url().default("http://localhost:5173"),

  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),

  JWT_EXPIRES_IN: z.string().default("15m"),
  
  BCRYPT_SALT_ROUNDS: z.coerce.number().int().min(10).max(15).default(12),
});

export const env = envSchema.parse(process.env);