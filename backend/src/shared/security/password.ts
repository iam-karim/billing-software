import bcrypt from "bcrypt";
import { env } from "../../config/env.js";

/**
 * Hash a plain text password.
 *
 * @param password Plain text password
 * @returns Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS);
}

/**
 * Compare plain password with stored hash.
 *
 * @param password Plain text password
 * @param hash Stored password hash
 * @returns True if password matches
 */
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}