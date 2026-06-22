import { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/errors/AppError.js";
import { ApiResponse } from "../shared/response/ApiResponse.js";
import { HTTP_STATUS } from "../shared/constants/http-status.js";
import { ZodError } from "zod";

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  
  if (err instanceof ZodError) {
  return res.status(400).json(
    new ApiResponse(
      false,
      "Validation failed",
      err.flatten()
    )
  );
}

  console.error(err);

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
    new ApiResponse(
      false,
      "Something went wrong. Please try again later."
    )
  );
}