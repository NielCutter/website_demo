// TypeScript interfaces for Profit Calculator

export interface ProfitCalculation {
  id?: string;
  itemName: string;
  inputs: ProfitInputs;
  results: ProfitResults;
  createdAt: Date | any;
  updatedAt: Date | any;
  userId?: string;
}

export interface ProfitInputs {
  rawMaterials: number;
  labor: number;
  packaging: number;
  marketing: number;
  marketplaceFees: number;
  overhead: number;
  taxRate: number;
  sellingPrice: number;
}

export interface ProfitResults {
  totalCost: number;
  grossProfit: number;
  netProfit: number;
  profitMargin: number;
  markup: number;
  breakEven: number;
  roi: number;
}

export interface MarketplacePreset {
  id?: string;
  name: string;
  feePercentage: number;
  isDefault?: boolean;
  createdAt?: Date | any;
}

export interface AdminSettings {
  defaultTaxRate: number;
  marketplacePresets: MarketplacePreset[];
}

export type SortField = 'date' | 'profitMargin' | 'itemName';
export type SortOrder = 'asc' | 'desc';

