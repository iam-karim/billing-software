import bcrypt from 'bcrypt';
import { UserModel, IUser, UserRole } from '../models/user.model';

export const userService = {
  // Get a user by ID
  async getUserById(userId: string): Promise<IUser | null> {
    return UserModel.findById(userId)
      .select('name email role company organization lastLogin createdAt updatedAt')
      .lean<IUser>()
      .exec();
  },

  // Update user profile
  async updateUserProfile(userId: string, data: Partial<IUser>): Promise<IUser | null> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return UserModel.findByIdAndUpdate(
      userId,
      { $set: data },
      { new: true }
    )
      .select('name email role company organization lastLogin createdAt updatedAt')
      .lean<IUser>()
      .exec();
  },

  // Get all users (admin/super_admin)
  async getAllUsers(): Promise<IUser[]> {
    return UserModel.find()
      .select('name email role company organization createdAt')
      .lean<IUser[]>()
      .exec();
  },

  // Update user role (admin/super_admin)
  async updateUserRole(userId: string, role: UserRole): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    )
      .select('name email role company organization createdAt')
      .lean<IUser>()
      .exec();
  },

  // Delete a user
  async deleteUser(userId: string): Promise<IUser | null> {
    return UserModel.findByIdAndDelete(userId)
      .select('name email role company organization createdAt')
      .lean<IUser>()
      .exec();
  }
};
