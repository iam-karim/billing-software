import { Request, Response, NextFunction } from "express";

import { authService } from "./auth.service.js";
import { ApiResponse } from "../../shared/response/ApiResponse.js";
import { HTTP_STATUS } from "../../shared/constants/http-status.js";

export const authController = {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await authService.register(req.body);

      return res.status(HTTP_STATUS.CREATED).json(
        new ApiResponse(
          true,
          "User registered successfully.",
          user
        )
      );
    } catch (error) {
      return next(error);
    }
  },

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await authService.login(req.body);

      return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
          true,
          "Login successful.",
          result
        )
      );
    } catch (error) {
      return next(error);
    }
  },
};
