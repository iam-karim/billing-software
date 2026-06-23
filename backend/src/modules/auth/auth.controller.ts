import { Request, Response, NextFunction } from "express";

import { authService } from "./auth.service.js";
import { HTTP_STATUS } from "../../shared/constants/http-status.js";

export const authController = {

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await authService.register(req.body);

      return res.status(HTTP_STATUS.CREATED).json({  
        success: true,
        message: "User registered successfully.",
        data: user
      });
      
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

      return res.status(HTTP_STATUS.OK).json({
          success: true,
          message:"Login successful.",
          data: result
      });

    } catch (error) {
      return next(error);
    }
  },

async me(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Profile fetched successfully.",
      data: req.user,
    });
  } catch (error) {
    return next(error);
  }
}

};
