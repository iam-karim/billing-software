import { api } from '@/lib/api';

export interface PaymentGateway {
  id: string;
  name: string;
  supportedCountries: string[];
  supportedCurrencies: string[];
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret?: string;
}

export interface SubscriptionPayment {
  planId: string;
  currency: string;
  amount: number;
  billingPeriod: 'monthly' | 'yearly';
  paymentGateway: string;
}

class PaymentService {
  // Get available payment gateways for region
  async getAvailableGateways(region: string) {
    const response = await api.get(`/api/payments/gateways?region=${region}`);
    return response.data;
  }

  // Create payment intent for plan purchase
  async createPaymentIntent(data: SubscriptionPayment): Promise<PaymentIntent> {
    const response = await api.post('/api/payments/create-intent', data);
    return response.data;
  }

  // Confirm payment
  async confirmPayment(paymentIntentId: string, paymentMethodId: string) {
    const response = await api.post('/api/payments/confirm', {
      paymentIntentId,
      paymentMethodId,
    });
    return response.data;
  }

  // Get payment history
  async getPaymentHistory(page: number = 1, limit: number = 20) {
    const response = await api.get(`/api/payments/history?page=${page}&limit=${limit}`);
    return response.data;
  }

  // Get invoice for payment
  async getPaymentInvoice(paymentId: string) {
    const response = await api.get(`/api/payments/${paymentId}/invoice`);
    return response.data;
  }

  // Cancel subscription
  async cancelSubscription(organizationId: string) {
    const response = await api.post(`/api/payments/subscription/${organizationId}/cancel`);
    return response.data;
  }

  // Update payment method
  async updatePaymentMethod(organizationId: string, paymentMethodId: string) {
    const response = await api.put(`/api/payments/subscription/${organizationId}/payment-method`, {
      paymentMethodId,
    });
    return response.data;
  }
}

export const paymentService = new PaymentService();
