import { Request, Response, NextFunction } from "express";

import { HTTP_STATUS } from "../../shared/constants/http-status.js";

import {
  login as loginUser,
  register as registerUser,
} from "./auth.service.js";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await registerUser(req.body);

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "User registered successfully.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await loginUser(req.body);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Login successful.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function me(
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
    next(error);
  }
}