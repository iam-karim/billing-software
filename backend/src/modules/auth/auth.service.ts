import { AppError } from "../../shared/errors/AppError.js";
import {
  comparePassword,
  generateAccessToken,
  hashPassword,
} from "../../shared/security/index.js";

import { HTTP_STATUS } from "../../shared/constants/http-status.js";
import { UserStatus } from "@prisma/client";


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

async login(data: LoginUserDto) {
  // Find user by email
  const user = await authRepository.findByEmail(data.email);

  if (!user) {
    throw new AppError(
      "Invalid email or password.",
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  // Compare password
  const isPasswordValid = await comparePassword(
    data.password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new AppError(
      "Invalid email or password.",
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  // Check account status
  if (
    user.status === UserStatus.INACTIVE ||
    user.status === UserStatus.SUSPENDED
  ) {
    throw new AppError(
      "Your account is not active.",
      HTTP_STATUS.FORBIDDEN
    );
  }

  // Update last login
  await authRepository.updateLastLogin(user.id);

  // Generate JWT
  const accessToken = generateAccessToken({
    userId: user.id,
  });

  return {
    accessToken,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
      email: user.email,
      status: user.status,
    },
  };
},

}

