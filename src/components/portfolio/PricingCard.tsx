interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  highlight?: boolean;
  className?: string;
}

export function PricingCard({
  title,
  price,
  features,
  highlight = false,
  className = "",
}: PricingCardProps) {
  return (
    <div
      className={`p-6 bg-white/5 border rounded-lg transition-all duration-200 hover:border-white/20 ${
        highlight
          ? "border-white/20 bg-white/10"
          : "border-white/10"
      } ${className}`}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-2xl font-bold text-white">{price}</p>
      </div>
      <ul className="space-y-2">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
            <span className="text-white mt-0.5">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

