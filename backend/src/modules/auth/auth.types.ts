import { UserStatus } from "@prisma/client";

export interface RegisterUserDto {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  password: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface UserResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  status: UserStatus;
}

export interface AuthResponseDto {
  accessToken: string;
  user: UserResponseDto;
}