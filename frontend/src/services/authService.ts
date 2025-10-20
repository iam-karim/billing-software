import { api } from '@/lib/api';
import { LoginCredentials, RegisterCredentials, AuthResponse, User } from '@/types/auth';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/api/auth/login', credentials);
    return response.data;
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/api/auth/register', credentials);
    return response.data;
  },

  async logout(): Promise<void> {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      // Ignore errors on logout
    }
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/api/user/profile');
    return response.data;
  },
};
