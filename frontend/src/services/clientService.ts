import { api } from '@/lib/api';
import { Client } from '@/types/client';

export const clientService = {
  async getClients(): Promise<Client[]> {
    const response = await api.get<Client[]>('/api/clients');
    return response.data;
  },

  async getClient(id: string): Promise<Client> {
    const response = await api.get<Client>(`/api/clients/${id}`);
    return response.data;
  },

  async createClient(data: Partial<Client>): Promise<Client> {
    const response = await api.post<Client>('/api/clients', data);
    return response.data;
  },

  async updateClient(id: string, data: Partial<Client>): Promise<Client> {
    const response = await api.put<Client>(`/api/clients/${id}`, data);
    return response.data;
  },

  async deleteClient(id: string): Promise<void> {
    await api.delete(`/api/clients/${id}`);
  },
};
