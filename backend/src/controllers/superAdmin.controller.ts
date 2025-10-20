import { Request, Response } from 'express';
import { superAdminService } from '../services/superAdmin.service';
import { asyncHandler } from '../utils/asyncHandler';

export const superAdminController = {
  getUsers: asyncHandler(async (req: Request, res: Response) => {
    const result = await superAdminService.getAllUsers(req.query);
    res.json(result);
  }),

  updateUserRole: asyncHandler(async (req: Request, res: Response) => {
    const updated = await superAdminService.updateUserRole(req.params.id, req.body.role);
    res.json(updated);
  }),

  getAnalytics: asyncHandler(async (_req: Request, res: Response) => {
    const stats = await superAdminService.getSystemStats();
    res.json(stats);
  }),

  getPlans: asyncHandler(async (_req: Request, res: Response) => {
    const plans = await superAdminService.getAllPlans();
    res.json(plans);
  }),

  createPlan: asyncHandler(async (req: Request, res: Response) => {
    const plan = await superAdminService.createPlan(req.body);
    res.status(201).json(plan);
  })
};
