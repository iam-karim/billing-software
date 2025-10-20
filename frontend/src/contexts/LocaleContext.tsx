import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export type SupportedLanguage = 'en' | 'ar' | 'hi';
export type SupportedCurrency = 'USD' | 'SAR' | 'INR';
export type SupportedRegion = 'US' | 'SA' | 'IN';

export interface TaxConfig {
  name: string;
  rate: number;
  registrationNumber?: string;
}

export interface RegionConfig {
  region: SupportedRegion;
  language: SupportedLanguage;
  currency: SupportedCurrency;
  dateFormat: string;
  timeZone: string;
  taxConfig: TaxConfig;
}

const regionDefaults: Record<SupportedRegion, RegionConfig> = {
  US: {
    region: 'US',
    language: 'en',
    currency: 'USD',
    dateFormat: 'MM/dd/yyyy',
    timeZone: 'America/New_York',
    taxConfig: {
      name: 'Sales Tax',
      rate: 0,
    },
  },
  SA: {
    region: 'SA',
    language: 'ar',
    currency: 'SAR',
    dateFormat: 'dd/MM/yyyy',
    timeZone: 'Asia/Riyadh',
    taxConfig: {
      name: 'VAT',
      rate: 15,
    },
  },
  IN: {
    region: 'IN',
    language: 'hi',
    currency: 'INR',
    dateFormat: 'dd/MM/yyyy',
    timeZone: 'Asia/Kolkata',
    taxConfig: {
      name: 'GST',
      rate: 18,
    },
  },
};

interface LocaleContextType {
  region: SupportedRegion;
  language: SupportedLanguage;
  currency: SupportedCurrency;
  dateFormat: string;
  timeZone: string;
  taxConfig: TaxConfig;
  setRegion: (region: SupportedRegion) => void;
  setLanguage: (language: SupportedLanguage) => void;
  setCurrency: (currency: SupportedCurrency) => void;
  setDateFormat: (format: string) => void;
  setTimeZone: (timeZone: string) => void;
  setTaxConfig: (config: TaxConfig) => void;
  formatCurrency: (amount: number) => string;
  calculateTax: (amount: number) => number;
  calculateTotal: (subtotal: number) => number;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  
  const [region, setRegionState] = useState<SupportedRegion>(() => {
    const saved = localStorage.getItem('app_region');
    return (saved as SupportedRegion) || 'US';
  });

  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved as SupportedLanguage) || regionDefaults[region].language;
  });

  const [currency, setCurrencyState] = useState<SupportedCurrency>(() => {
    const saved = localStorage.getItem('app_currency');
    return (saved as SupportedCurrency) || regionDefaults[region].currency;
  });

  const [dateFormat, setDateFormatState] = useState<string>(() => {
    const saved = localStorage.getItem('app_dateFormat');
    return saved || regionDefaults[region].dateFormat;
  });

  const [timeZone, setTimeZoneState] = useState<string>(() => {
    const saved = localStorage.getItem('app_timeZone');
    return saved || regionDefaults[region].timeZone;
  });

  const [taxConfig, setTaxConfigState] = useState<TaxConfig>(() => {
    const saved = localStorage.getItem('app_taxConfig');
    return saved ? JSON.parse(saved) : regionDefaults[region].taxConfig;
  });

  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language, i18n]);

  const setRegion = (newRegion: SupportedRegion) => {
    setRegionState(newRegion);
    localStorage.setItem('app_region', newRegion);
    
    const config = regionDefaults[newRegion];
    setLanguage(config.language);
    setCurrency(config.currency);
    setDateFormat(config.dateFormat);
    setTimeZone(config.timeZone);
    setTaxConfig(config.taxConfig);
  };

  const setLanguage = (newLanguage: SupportedLanguage) => {
    setLanguageState(newLanguage);
    localStorage.setItem('app_language', newLanguage);
  };

  const setCurrency = (newCurrency: SupportedCurrency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('app_currency', newCurrency);
  };

  const setDateFormat = (format: string) => {
    setDateFormatState(format);
    localStorage.setItem('app_dateFormat', format);
  };

  const setTimeZone = (tz: string) => {
    setTimeZoneState(tz);
    localStorage.setItem('app_timeZone', tz);
  };

  const setTaxConfig = (config: TaxConfig) => {
    setTaxConfigState(config);
    localStorage.setItem('app_taxConfig', JSON.stringify(config));
  };

  const formatCurrency = (amount: number): string => {
    const localeMap: Record<SupportedCurrency, string> = {
      USD: 'en-US',
      SAR: 'ar-SA',
      INR: 'en-IN',
    };

    return new Intl.NumberFormat(localeMap[currency], {
      style: 'currency',
      currency,
    }).format(amount);
  };

  const calculateTax = (amount: number): number => {
    return (amount * taxConfig.rate) / 100;
  };

  const calculateTotal = (subtotal: number): number => {
    return subtotal + calculateTax(subtotal);
  };

  return (
    <LocaleContext.Provider
      value={{
        region,
        language,
        currency,
        dateFormat,
        timeZone,
        taxConfig,
        setRegion,
        setLanguage,
        setCurrency,
        setDateFormat,
        setTimeZone,
        setTaxConfig,
        formatCurrency,
        calculateTax,
        calculateTotal,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
