import { format } from 'date-fns';

export const formatCurrency = (
  amount: number, 
  currency: string = 'USD',
  locale?: string
): string => {
  const localeMap: Record<string, string> = {
    USD: 'en-US',
    SAR: 'ar-SA',
    INR: 'en-IN',
    EUR: 'de-DE',
    GBP: 'en-GB',
  };

  return new Intl.NumberFormat(locale || localeMap[currency] || 'en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatDate = (date: string | Date, formatStr: string = 'MMM dd, yyyy'): string => {
  return format(new Date(date), formatStr);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const getRoleBadgeVariant = (role: string): 'default' | 'secondary' | 'destructive' => {
  switch (role) {
    case 'SUPER_ADMIN':
      return 'destructive';
    case 'ADMIN':
      return 'default';
    default:
      return 'secondary';
  }
};

export const getStatusBadgeVariant = (status: string): 'default' | 'secondary' | 'destructive' => {
  switch (status) {
    case 'active':
      return 'default';
    case 'suspended':
      return 'destructive';
    default:
      return 'secondary';
  }
};
