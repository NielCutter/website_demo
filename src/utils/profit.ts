// Profit calculation utilities

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

/**
 * Calculate total cost (sum of all costs)
 */
export function calculateTotalCost(inputs: ProfitInputs): number {
  return (
    inputs.rawMaterials +
    inputs.labor +
    inputs.packaging +
    inputs.marketing +
    inputs.marketplaceFees +
    inputs.overhead
  );
}

/**
 * Calculate gross profit (selling price - total cost)
 */
export function calculateGrossProfit(
  sellingPrice: number,
  totalCost: number
): number {
  return sellingPrice - totalCost;
}

/**
 * Calculate tax amount
 */
export function calculateTax(
  grossProfit: number,
  taxRate: number
): number {
  return grossProfit * (taxRate / 100);
}

/**
 * Calculate net profit (gross profit - tax)
 */
export function calculateNetProfit(
  grossProfit: number,
  taxRate: number
): number {
  const tax = calculateTax(grossProfit, taxRate);
  return grossProfit - tax;
}

/**
 * Calculate profit margin percentage
 */
export function calculateProfitMargin(
  netProfit: number,
  sellingPrice: number
): number {
  if (sellingPrice === 0) return 0;
  return (netProfit / sellingPrice) * 100;
}

/**
 * Calculate markup percentage
 */
export function calculateMarkup(
  totalCost: number,
  sellingPrice: number
): number {
  if (totalCost === 0) return 0;
  return ((sellingPrice - totalCost) / totalCost) * 100;
}

/**
 * Calculate break-even point (total cost)
 */
export function calculateBreakEven(totalCost: number): number {
  return totalCost;
}

/**
 * Calculate ROI (Return on Investment) percentage
 */
export function calculateROI(
  netProfit: number,
  totalCost: number
): number {
  if (totalCost === 0) return 0;
  return (netProfit / totalCost) * 100;
}

/**
 * Calculate all profit metrics
 */
export function calculateAll(inputs: ProfitInputs): ProfitResults {
  const totalCost = calculateTotalCost(inputs);
  const grossProfit = calculateGrossProfit(inputs.sellingPrice, totalCost);
  const netProfit = calculateNetProfit(grossProfit, inputs.taxRate);
  const profitMargin = calculateProfitMargin(netProfit, inputs.sellingPrice);
  const markup = calculateMarkup(totalCost, inputs.sellingPrice);
  const breakEven = calculateBreakEven(totalCost);
  const roi = calculateROI(netProfit, totalCost);

  return {
    totalCost: Math.round(totalCost * 100) / 100,
    grossProfit: Math.round(grossProfit * 100) / 100,
    netProfit: Math.round(netProfit * 100) / 100,
    profitMargin: Math.round(profitMargin * 100) / 100,
    markup: Math.round(markup * 100) / 100,
    breakEven: Math.round(breakEven * 100) / 100,
    roi: Math.round(roi * 100) / 100,
  };
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}

