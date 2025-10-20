import { api } from '@/lib/api';
import { Invoice } from '@/types/invoice';

export const invoiceService = {
  async getInvoices(filters?: Record<string, any>): Promise<Invoice[]> {
    const response = await api.get<Invoice[]>('/api/invoices', { params: filters });
    return response.data;
  },

  async getInvoice(id: string): Promise<Invoice> {
    const response = await api.get<Invoice>(`/api/invoices/${id}`);
    return response.data;
  },

  async createInvoice(data: Partial<Invoice>): Promise<Invoice> {
    const response = await api.post<Invoice>('/api/invoices', data);
    return response.data;
  },

  async updateInvoice(id: string, data: Partial<Invoice>): Promise<Invoice> {
    const response = await api.put<Invoice>(`/api/invoices/${id}`, data);
    return response.data;
  },

  async deleteInvoice(id: string): Promise<void> {
    await api.delete(`/api/invoices/${id}`);
  },
};
