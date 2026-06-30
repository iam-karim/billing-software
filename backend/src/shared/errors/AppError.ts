import { HTTP_STATUS } from "../constants/http-status.js";

export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    public readonly code?: string
  ) {
    super(message);

    this.name = "AppError";

    Error.captureStackTrace(this, AppError);
  }
}