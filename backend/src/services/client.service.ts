import { ClientModel, IClient } from '../models/client.model';
import mongoose from 'mongoose';

export const clientService = {
  async createClient(data: Partial<IClient>): Promise<IClient> {
    const client = new ClientModel(data);
    return await client.save();
  },

  async getAllClients(
    userId: string,
    query: { search?: string; page?: number; limit?: number }
  ): Promise<{ clients: IClient[]; total: number }> {
    const { search = '', page = 1, limit = 10 } = query;

    const filter = {
      userId: new mongoose.Types.ObjectId(userId),
      ...(search
        ? {
            $or: [
              { name: { $regex: search, $options: 'i' } },
              { email: { $regex: search, $options: 'i' } },
              { companyName: { $regex: search, $options: 'i' } },
            ],
          }
        : {}),
    };

    const total = await ClientModel.countDocuments(filter);
    const clients = await ClientModel.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return { clients, total };
  },

  async getClientById(id: string, userId: string): Promise<IClient | null> {
    return await ClientModel.findOne({ _id: id, userId });
  },

  async updateClient(
    id: string,
    userId: string,
    data: Partial<IClient>
  ): Promise<IClient | null> {
    return await ClientModel.findOneAndUpdate(
      { _id: id, userId },
      { $set: data },
      { new: true }
    );
  },

  async deleteClient(id: string, userId: string): Promise<boolean> {
    const result = await ClientModel.findOneAndDelete({ _id: id, userId });
    return !!result;
  },
};
