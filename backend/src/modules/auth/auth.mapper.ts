import { Prisma, User } from "@prisma/client";

import {
  RegisterUserDto,
  UserResponseDto,
} from "./auth.types.js";

export class AuthMapper {
  /**
   * Convert Register DTO to Prisma create input.
   */
  toCreateInput(
    data: RegisterUserDto,
    passwordHash: string
  ): Prisma.UserCreateInput {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      displayName: data.displayName,
      email: data.email,
      passwordHash,
    };
  }

  /**
   * Convert Prisma User to API response.
   */
  toUserResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
      email: user.email,
      status: user.status,
    };
  }
}

export const authMapper = new AuthMapper();