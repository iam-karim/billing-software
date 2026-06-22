import { prisma } from "../../config/database.js";

export class AuthRepository {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(data: {
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    passwordHash: string;
  }) {
    return prisma.user.create({
      data,
    });
  }
}

export const authRepository = new AuthRepository();