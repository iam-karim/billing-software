export interface SystemStats {
  totalUsers: number;
  totalOrganizations: number;
  totalInvoices: number;
  monthlyRevenue: number;
  activeUsers: number;
  pendingPayments: number;
}

export interface UserManagement {
  id: string;
  name: string;
  email: string;
  company?: string;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  status: 'active' | 'suspended' | 'deleted';
  createdAt: string;
  lastLogin?: string;
}

export interface Organization {
  id: string;
  name: string;
  planId: string;
  planName: string;
  userCount: number;
  invoiceCount: number;
  totalRevenue: number;
  status: 'active' | 'suspended';
  createdAt: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  isActive: boolean;
  organizationCount: number;
  createdAt: string;
}

export interface SystemLog {
  id: string;
  action: string;
  userId?: string;
  userName?: string;
  metadata?: any;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface RevenueData {
  month: string;
  revenue: number;
  invoices: number;
}

export interface PlanDistribution {
  name: string;
  count: number;
  revenue: number;
}

export interface SystemSettings {
  systemName: string;
  supportEmail: string;
  defaultCurrency: string;
  defaultTaxRate: number;
  dateFormat: string;
  timeZone: string;
}
