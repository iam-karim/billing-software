import { NextFunction, Request, Response } from "express";
import { UserStatus } from "@prisma/client";

import { findUserById } from "../modules/auth/auth.repository.js";
import { HTTP_STATUS } from "../shared/constants/http-status.js";
import { AppError } from "../shared/errors/AppError.js";
import { verifyAccessToken } from "../shared/security/jwt.js";

export async function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      throw new AppError(
        "Authentication required.",
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const token = authorization.split(" ")[1];

    const payload = verifyAccessToken(token);

    const user = await findUserById(payload.userId);

    if (!user) {
      throw new AppError(
        "User not found.",
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new AppError(
        "Your account is not active.",
        HTTP_STATUS.FORBIDDEN
      );
    }

    req.user = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
      email: user.email,
      status: user.status,
      createdAt: user.createdAt,
    };

    next();
  } catch (error) {
    next(error);
  }
}