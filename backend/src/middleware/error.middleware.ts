import { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/errors/AppError.js";
import { ApiResponse } from "../shared/response/ApiResponse.js";
import { HTTP_STATUS } from "../shared/constants/http-status.js";

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(
      new ApiResponse(false, err.message)
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