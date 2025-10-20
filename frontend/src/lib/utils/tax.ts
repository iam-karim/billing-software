import { TaxConfig } from '@/contexts/LocaleContext';

export interface TaxBreakdown {
  subtotal: number;
  taxAmount: number;
  taxRate: number;
  taxName: string;
  total: number;
}

export interface IndiaTaxBreakdown extends TaxBreakdown {
  cgst: number;
  sgst: number;
  igst?: number;
  isInterState?: boolean;
}

export interface SaudiTaxBreakdown extends TaxBreakdown {
  vat: number;
  vatRegistrationNumber?: string;
}

/**
 * Calculate tax for India (GST - CGST + SGST or IGST)
 * @param amount - Subtotal amount
 * @param rate - GST rate (default 18%)
 * @param isInterState - Whether transaction is inter-state (default false)
 */
export const calculateIndiaGST = (
  amount: number,
  rate: number = 18,
  isInterState: boolean = false
): IndiaTaxBreakdown => {
  const taxAmount = (amount * rate) / 100;
  
  if (isInterState) {
    // IGST (Integrated GST) for inter-state transactions
    return {
      subtotal: amount,
      taxAmount,
      taxRate: rate,
      taxName: 'GST',
      total: amount + taxAmount,
      cgst: 0,
      sgst: 0,
      igst: taxAmount,
      isInterState: true,
    };
  } else {
    // CGST + SGST for intra-state transactions (split equally)
    return {
      subtotal: amount,
      taxAmount,
      taxRate: rate,
      taxName: 'GST',
      total: amount + taxAmount,
      cgst: taxAmount / 2,
      sgst: taxAmount / 2,
      isInterState: false,
    };
  }
};

/**
 * Calculate tax for Saudi Arabia (VAT)
 * @param amount - Subtotal amount
 * @param rate - VAT rate (default 15%)
 * @param vatRegistrationNumber - Optional VAT registration number
 */
export const calculateSaudiVAT = (
  amount: number,
  rate: number = 15,
  vatRegistrationNumber?: string
): SaudiTaxBreakdown => {
  const taxAmount = (amount * rate) / 100;
  
  return {
    subtotal: amount,
    taxAmount,
    taxRate: rate,
    taxName: 'VAT',
    total: amount + taxAmount,
    vat: taxAmount,
    vatRegistrationNumber,
  };
};

/**
 * Generic tax calculation
 * @param amount - Subtotal amount
 * @param taxConfig - Tax configuration from LocaleContext
 */
export const calculateTax = (
  amount: number,
  taxConfig: TaxConfig
): TaxBreakdown => {
  const taxAmount = (amount * taxConfig.rate) / 100;
  
  return {
    subtotal: amount,
    taxAmount,
    taxRate: taxConfig.rate,
    taxName: taxConfig.name,
    total: amount + taxAmount,
  };
};

/**
 * Calculate tax breakdown for invoice items
 * @param items - Array of items with price and quantity
 * @param taxConfig - Tax configuration
 */
export const calculateInvoiceTax = (
  items: Array<{ price: number; quantity: number; taxable?: boolean }>,
  taxConfig: TaxConfig
): TaxBreakdown => {
  const subtotal = items.reduce((sum, item) => {
    if (item.taxable === false) return sum;
    return sum + (item.price * item.quantity);
  }, 0);
  
  return calculateTax(subtotal, taxConfig);
};

/**
 * Reverse calculate price from total (including tax)
 * @param totalWithTax - Total amount including tax
 * @param taxRate - Tax rate percentage
 */
export const reverseTaxCalculation = (
  totalWithTax: number,
  taxRate: number
): TaxBreakdown => {
  const subtotal = totalWithTax / (1 + taxRate / 100);
  const taxAmount = totalWithTax - subtotal;
  
  return {
    subtotal,
    taxAmount,
    taxRate,
    taxName: 'Tax',
    total: totalWithTax,
  };
};

/**
 * Format tax breakdown for display
 */
export const formatTaxBreakdown = (
  breakdown: TaxBreakdown | IndiaTaxBreakdown | SaudiTaxBreakdown,
  formatCurrency: (amount: number) => string
): string[] => {
  const lines: string[] = [];
  
  lines.push(`Subtotal: ${formatCurrency(breakdown.subtotal)}`);
  
  if ('cgst' in breakdown && !breakdown.isInterState) {
    lines.push(`CGST (${breakdown.taxRate / 2}%): ${formatCurrency(breakdown.cgst)}`);
    lines.push(`SGST (${breakdown.taxRate / 2}%): ${formatCurrency(breakdown.sgst)}`);
  } else if ('igst' in breakdown && breakdown.isInterState) {
    lines.push(`IGST (${breakdown.taxRate}%): ${formatCurrency(breakdown.igst || 0)}`);
  } else if ('vat' in breakdown) {
    lines.push(`VAT (${breakdown.taxRate}%): ${formatCurrency(breakdown.vat)}`);
    if (breakdown.vatRegistrationNumber) {
      lines.push(`VAT Reg. No: ${breakdown.vatRegistrationNumber}`);
    }
  } else {
    lines.push(`${breakdown.taxName} (${breakdown.taxRate}%): ${formatCurrency(breakdown.taxAmount)}`);
  }
  
  lines.push(`Total: ${formatCurrency(breakdown.total)}`);
  
  return lines;
};
