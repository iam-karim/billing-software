import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { env } from "../config/env.js";
import { HTTP_STATUS } from "../shared/constants/http-status.js";
import { AppError } from "../shared/errors/AppError.js";

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // Application Errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      code: err.code,
      message: err.message,
    });
  }

  // Validation Errors
  if (err instanceof ZodError) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      code: "VALIDATION_ERROR",
      message: "Validation failed.",
      errors: err.flatten(),
    });
  }

  // Authentication Errors
  if (
    err.name === "JsonWebTokenError" ||
    err.name === "TokenExpiredError"
  ) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      code: "INVALID_TOKEN",
      message: "Invalid or expired token.",
    });
  }

  // Log unexpected errors
  console.error(err);

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    code: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong. Please try again later.",
    ...(env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
} 