import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { updateUserSchema } from '../validations/auth.schema';
import { UserModel } from '../models/user.model';

// Extend Request to include authenticated user
interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    [key: string]: any;
  };
}

export const userController = {
  // GET /api/user/profile
  getProfile: asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await UserModel.findById(req.user?.id).select(
      'id name email role company createdAt updatedAt'
    );

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  }),

  // PUT /api/user/profile
  updateProfile: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = updateUserSchema.parse(req.body);

    const updatedUser = await UserModel.findByIdAndUpdate(req.user?.id, data, {
      new: true,
    }).select('id name email role company createdAt updatedAt');

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  }),

  // Admin-only: GET /api/users (list all users)
  getAllUsers: asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'super_admin')) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const users = await UserModel.find().select(
      'id name email role company createdAt'
    );

    res.json(users);
  }),
};
