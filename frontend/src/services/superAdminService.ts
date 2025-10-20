import { api } from '@/lib/api';
import { 
  SystemStats, 
  UserManagement, 
  Organization, 
  SubscriptionPlan, 
  SystemLog, 
  RevenueData, 
  PlanDistribution,
  SystemSettings 
} from '@/types/superAdmin';

export const superAdminService = {
  // Analytics & Dashboard
  async getSystemStats(): Promise<SystemStats> {
    const response = await api.get<SystemStats>('/api/super-admin/analytics');
    return response.data;
  },

  async getRevenueChart(period: string = '12m'): Promise<RevenueData[]> {
    const response = await api.get<RevenueData[]>(`/api/super-admin/analytics/revenue?period=${period}`);
    return response.data;
  },

  async getPlanDistribution(): Promise<PlanDistribution[]> {
    const response = await api.get<PlanDistribution[]>('/api/super-admin/analytics/plans');
    return response.data;
  },

  async getUserGrowth(period: string = '6m'): Promise<any[]> {
    const response = await api.get(`/api/super-admin/analytics/users?period=${period}`);
    return response.data;
  },

  // User Management
  async getAllUsers(filters?: { page?: number; search?: string; role?: string; status?: string }): Promise<{ users: UserManagement[]; total: number }> {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.role) params.append('role', filters.role);
    if (filters?.status) params.append('status', filters.status);
    
    const response = await api.get(`/api/super-admin/users?${params.toString()}`);
    return response.data;
  },

  async getUserById(id: string): Promise<UserManagement> {
    const response = await api.get<UserManagement>(`/api/super-admin/users/${id}`);
    return response.data;
  },

  async updateUserRole(id: string, role: string): Promise<void> {
    await api.put(`/api/super-admin/users/${id}/role`, { role });
  },

  async updateUserStatus(id: string, status: string): Promise<void> {
    await api.put(`/api/super-admin/users/${id}/status`, { status });
  },

  async deleteUser(id: string): Promise<void> {
    await api.delete(`/api/super-admin/users/${id}`);
  },

  async resetUserPassword(id: string): Promise<void> {
    await api.post(`/api/super-admin/users/${id}/reset-password`);
  },

  // Organization Management
  async getAllOrganizations(filters?: { page?: number; search?: string }): Promise<{ organizations: Organization[]; total: number }> {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.search) params.append('search', filters.search);
    
    const response = await api.get(`/api/super-admin/organizations?${params.toString()}`);
    return response.data;
  },

  async getOrganizationById(id: string): Promise<Organization> {
    const response = await api.get<Organization>(`/api/super-admin/organizations/${id}`);
    return response.data;
  },

  async updateOrganization(id: string, data: Partial<Organization>): Promise<void> {
    await api.put(`/api/super-admin/organizations/${id}`, data);
  },

  async updateOrganizationPlan(id: string, planId: string): Promise<void> {
    await api.put(`/api/super-admin/organizations/${id}/plan`, { planId });
  },

  async suspendOrganization(id: string): Promise<void> {
    await api.post(`/api/super-admin/organizations/${id}/suspend`);
  },

  async activateOrganization(id: string): Promise<void> {
    await api.post(`/api/super-admin/organizations/${id}/activate`);
  },

  // Subscription Plan Management
  async getAllPlans(): Promise<SubscriptionPlan[]> {
    const response = await api.get<SubscriptionPlan[]>('/api/super-admin/plans');
    return response.data;
  },

  async getPlanById(id: string): Promise<SubscriptionPlan> {
    const response = await api.get<SubscriptionPlan>(`/api/super-admin/plans/${id}`);
    return response.data;
  },

  async createPlan(data: Omit<SubscriptionPlan, 'id' | 'organizationCount' | 'createdAt'>): Promise<SubscriptionPlan> {
    const response = await api.post<SubscriptionPlan>('/api/super-admin/plans', data);
    return response.data;
  },

  async updatePlan(id: string, data: Partial<SubscriptionPlan>): Promise<void> {
    await api.put(`/api/super-admin/plans/${id}`, data);
  },

  async deletePlan(id: string): Promise<void> {
    await api.delete(`/api/super-admin/plans/${id}`);
  },

  async togglePlanStatus(id: string): Promise<void> {
    await api.patch(`/api/super-admin/plans/${id}/toggle`);
  },

  // System Logs
  async getSystemLogs(filters?: { 
    page?: number; 
    action?: string; 
    userId?: string; 
    startDate?: string; 
    endDate?: string 
  }): Promise<{ logs: SystemLog[]; total: number }> {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.action) params.append('action', filters.action);
    if (filters?.userId) params.append('userId', filters.userId);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    
    const response = await api.get(`/api/super-admin/logs?${params.toString()}`);
    return response.data;
  },

  async exportLogs(filters?: any): Promise<Blob> {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/api/super-admin/logs/export?${params.toString()}`, {
      responseType: 'blob'
    });
    return response.data;
  },

  // System Settings
  async getSystemSettings(): Promise<SystemSettings> {
    const response = await api.get<SystemSettings>('/api/super-admin/settings');
    return response.data;
  },

  async updateSystemSettings(data: Partial<SystemSettings>): Promise<void> {
    await api.put('/api/super-admin/settings', data);
  },
};
