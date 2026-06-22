import { User } from "@prisma/client";
import { prisma } from "../../config/database.js";


export const authRepository = {

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  async create(data: {
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    passwordHash: string;
  }): Promise<User> {
    return prisma.user.create({
      data,
    });
  },
  
};