import { TrendingUp, TrendingDown, DollarSign, Percent, Target, BarChart3, Info } from "lucide-react";
import { formatCurrency, formatPercentage } from "../../../utils/profit";
import { ProfitResults } from "../../../types/profit";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../ui/tooltip";

interface ProfitResultCardProps {
  title: string;
  value: number;
  type: "currency" | "percentage";
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  description?: string;
}

export function ProfitResultCard({
  title,
  value,
  type,
  icon,
  trend,
  description,
}: ProfitResultCardProps) {
  const formattedValue =
    type === "currency" ? formatCurrency(value) : formatPercentage(value);

  const getTrendColor = () => {
    if (trend === "up") return "text-green-600";
    if (trend === "down") return "text-red-600";
    return "text-gray-600";
  };

  const getTrendIcon = () => {
    if (trend === "up") return <TrendingUp className="w-4 h-4" />;
    if (trend === "down") return <TrendingDown className="w-4 h-4" />;
    return null;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon || <BarChart3 className="w-5 h-5 text-gray-400" />}
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            {description && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="More information"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">{description}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
        {trend && (
          <div className={`flex items-center gap-1 ${getTrendColor()}`}>
            {getTrendIcon()}
          </div>
        )}
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-gray-900">
        {formattedValue}
      </p>
    </div>
  );
}

interface ProfitResultsGridProps {
  results: ProfitResults;
}

export function ProfitResultsGrid({ results }: ProfitResultsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <ProfitResultCard
        title="Total Cost"
        value={results.totalCost}
        type="currency"
        icon={<DollarSign className="w-5 h-5 text-gray-400" />}
        description="The sum of all costs: raw materials, labor, packaging, marketing, marketplace fees, and overhead. This is your total investment per product."
      />
      <ProfitResultCard
        title="Gross Profit"
        value={results.grossProfit}
        type="currency"
        icon={<TrendingUp className="w-5 h-5 text-green-500" />}
        trend={results.grossProfit >= 0 ? "up" : "down"}
        description="Profit before taxes. Calculated as: Selling Price - Total Cost. This shows your profit before tax deductions."
      />
      <ProfitResultCard
        title="Net Profit"
        value={results.netProfit}
        type="currency"
        icon={<DollarSign className="w-5 h-5 text-blue-500" />}
        trend={results.netProfit >= 0 ? "up" : "down"}
        description="Your actual profit after taxes. Calculated as: Gross Profit - Tax. This is the money you keep after all costs and taxes."
      />
      <ProfitResultCard
        title="Profit Margin"
        value={results.profitMargin}
        type="percentage"
        icon={<Percent className="w-5 h-5 text-purple-500" />}
        trend={results.profitMargin >= 20 ? "up" : results.profitMargin >= 10 ? "neutral" : "down"}
        description="Net profit as a percentage of selling price. Formula: (Net Profit / Selling Price) × 100. Higher is better - aim for 20%+ for healthy margins."
      />
      <ProfitResultCard
        title="Markup"
        value={results.markup}
        type="percentage"
        icon={<Percent className="w-5 h-5 text-orange-500" />}
        description="The percentage increase from cost to selling price. Formula: ((Selling Price - Total Cost) / Total Cost) × 100. Shows how much you're marking up your costs."
      />
      <ProfitResultCard
        title="Break-Even"
        value={results.breakEven}
        type="currency"
        icon={<Target className="w-5 h-5 text-red-500" />}
        description="The minimum selling price needed to cover all costs (no profit, no loss). Selling below this price results in a loss."
      />
      <ProfitResultCard
        title="ROI"
        value={results.roi}
        type="percentage"
        icon={<BarChart3 className="w-5 h-5 text-indigo-500" />}
        trend={results.roi >= 50 ? "up" : results.roi >= 20 ? "neutral" : "down"}
        description="Return on Investment - how much profit you make per peso invested. Formula: (Net Profit / Total Cost) × 100. Higher ROI means better efficiency."
      />
    </div>
  );
}

