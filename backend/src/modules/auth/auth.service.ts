import { UserStatus } from "@prisma/client";

import { HTTP_STATUS } from "../../shared/constants/http-status.js";
import { AppError } from "../../shared/errors/AppError.js";
import {
  comparePassword,
  generateAccessToken,
  hashPassword,
} from "../../shared/security/index.js";

import {
  createUser,
  findUserByEmail,
  updateUserLastLogin,
} from "./auth.repository.js";

import type {
  LoginInput,
  RegisterInput,
} from "./auth.validation.js";

const INVALID_CREDENTIALS_MESSAGE = "Invalid email or password.";

export async function register(data: RegisterInput) {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new AppError(
      "Email already exists.",
      HTTP_STATUS.CONFLICT
    );
  }

  const passwordHash = await hashPassword(data.password);

  const displayName = `${data.firstName} ${data.lastName}`;

  const user = await createUser({
    firstName: data.firstName,
    lastName: data.lastName,
    displayName,
    email: data.email,
    passwordHash,
  });

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    displayName: user.displayName,
    email: user.email,
  };
}

export async function login(data: LoginInput) {
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new AppError(
      INVALID_CREDENTIALS_MESSAGE,
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  const isPasswordValid = await comparePassword(
    data.password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new AppError(
      INVALID_CREDENTIALS_MESSAGE,
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  if (user.status !== UserStatus.ACTIVE) {
    throw new AppError(
      "Your account is not active.",
      HTTP_STATUS.FORBIDDEN
    );
  }

  await updateUserLastLogin(user.id);

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
}