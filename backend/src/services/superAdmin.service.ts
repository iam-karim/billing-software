import { UserModel } from '../models/user.model';
import { OrganizationModel } from '../models/organization.model';
import { SubscriptionModel } from '../models/subscription.model';
import { InvoiceModel } from '../models/invoice.model';
import { SystemLogModel } from '../models/systemLog.model';

export const superAdminService = {
  async getAllUsers({ page = 1, limit = 20, search, role, status }: any) {
    const filter: any = {};
    if (search) filter.$or = [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }];
    if (role) filter.role = role;
    const skip = (page - 1) * limit;
    const users = await UserModel.find(filter).skip(skip).limit(limit).lean();
    const total = await UserModel.countDocuments(filter);
    return { users, total, page, limit };
  },

  async updateUserRole(userId: string, role: string) {
    const user = await UserModel.findByIdAndUpdate(userId, { role }, { new: true }).lean();
    await SystemLogModel.create({ action: 'update_role', userId, metadata: { role } });
    return user;
  },

  async getSystemStats() {
    const totalUsers = await UserModel.countDocuments();
    const totalOrgs = await OrganizationModel.countDocuments();
    const totalInvoices = await InvoiceModel.countDocuments();
    const revenue = await InvoiceModel.aggregate([
      { $match: { status: 'PAID' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    return {
      totalUsers,
      totalOrganizations: totalOrgs,
      totalInvoices,
      monthlyRevenue: revenue[0]?.total || 0
    };
  },

  async getAllPlans() {
    return SubscriptionModel.find().lean();
  },

  async createPlan(data: any) {
    const plan = await SubscriptionModel.create(data);
    await SystemLogModel.create({ action: 'create_plan', metadata: { planId: plan._id } });
    return plan;
  },

  // ... other methods (updatePlan, deletePlan, getLogs)
};
