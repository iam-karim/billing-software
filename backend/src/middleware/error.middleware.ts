import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { AppError } from "../shared/errors/AppError.js";
import { HTTP_STATUS } from "../shared/constants/http-status.js";

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
      message: err.message,
    });
  }

  // Validation Errors
  if (err instanceof ZodError) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Validation failed",
      errors: err.flatten(),
    });
  }

  // JWT Errors
  if (
    err.name === "JsonWebTokenError" ||
    err.name === "TokenExpiredError"
  ) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }

  console.error(err);

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Something went wrong. Please try again later.",
  });
}

