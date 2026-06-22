import { AppError } from "../../shared/errors/AppError.js";
import { hashPassword } from "../../shared/security/index.js";

import { authRepository } from "./auth.repository.js";
import {
  LoginUserDto,
  RegisterUserDto,
} from "./auth.types.js";

export const authService = {
  async register(data: RegisterUserDto) {
    // Check if user already exists
    const existingUser = await authRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError("Email already exists.", 409);
    }

    // Hash password
    const passwordHash = await hashPassword(data.password);

    // Create user
    const user = await authRepository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      displayName: data.displayName,
      email: data.email,
      passwordHash,
    });

    // Return safe user object
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
      email: user.email,
      status: user.status,
      createdAt: user.createdAt,
    };
  },

  async login(_data: LoginUserDto) {
    throw new Error("Not implemented");
  }
}

