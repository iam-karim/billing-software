import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model';
import { signToken } from '../utils/jwt';

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

export const authService = {
  async register({ name, email, password, company }: any) {
    const existing = await UserModel.findOne({ email });
    if (existing) throw new Error('Email already exists');
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await UserModel.create({ name, email, password: hashed, company, role: 'ADMIN' }); // default org admin
    const token = signToken({ userId: user._id, role: user.role });
    return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token };
  },

  async login({ email, password }: any) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error('Invalid credentials');
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new Error('Invalid credentials');
    const token = signToken({ userId: user._id, role: user.role });
    user.lastLogin = new Date();
    await user.save();
    return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token };
  },

  async logout() {
    // If using refresh tokens / cookie, clear cookie
    return;
  }
};
