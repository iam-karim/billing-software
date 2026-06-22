import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  PORT: z.coerce.number().default(4000),

  CLIENT_URL: z.string().url().default("http://localhost:5173"),
});

export const env = envSchema.parse(process.env);