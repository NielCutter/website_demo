import { TrendingUp, TrendingDown, DollarSign, Percent, Target, BarChart3 } from "lucide-react";
import { formatCurrency, formatPercentage } from "../../../utils/profit";
import { ProfitResults } from "../../../types/profit";

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
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        </div>
        {trend && (
          <div className={`flex items-center gap-1 ${getTrendColor()}`}>
            {getTrendIcon()}
          </div>
        )}
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
        {formattedValue}
      </p>
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
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
        description="Sum of all costs"
      />
      <ProfitResultCard
        title="Gross Profit"
        value={results.grossProfit}
        type="currency"
        icon={<TrendingUp className="w-5 h-5 text-green-500" />}
        trend={results.grossProfit >= 0 ? "up" : "down"}
        description="Before tax"
      />
      <ProfitResultCard
        title="Net Profit"
        value={results.netProfit}
        type="currency"
        icon={<DollarSign className="w-5 h-5 text-blue-500" />}
        trend={results.netProfit >= 0 ? "up" : "down"}
        description="After tax"
      />
      <ProfitResultCard
        title="Profit Margin"
        value={results.profitMargin}
        type="percentage"
        icon={<Percent className="w-5 h-5 text-purple-500" />}
        trend={results.profitMargin >= 20 ? "up" : results.profitMargin >= 10 ? "neutral" : "down"}
        description="Net profit / Selling price"
      />
      <ProfitResultCard
        title="Markup"
        value={results.markup}
        type="percentage"
        icon={<Percent className="w-5 h-5 text-orange-500" />}
        description="Markup on cost"
      />
      <ProfitResultCard
        title="Break-Even"
        value={results.breakEven}
        type="currency"
        icon={<Target className="w-5 h-5 text-red-500" />}
        description="Minimum selling price"
      />
      <ProfitResultCard
        title="ROI"
        value={results.roi}
        type="percentage"
        icon={<BarChart3 className="w-5 h-5 text-indigo-500" />}
        trend={results.roi >= 50 ? "up" : results.roi >= 20 ? "neutral" : "down"}
        description="Return on investment"
      />
    </div>
  );
}

