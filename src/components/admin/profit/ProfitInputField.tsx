import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

interface ProfitInputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  suffix?: string;
  type?: "currency" | "percentage" | "number";
  min?: number;
  max?: number;
  step?: number;
}

export function ProfitInputField({
  label,
  value,
  onChange,
  placeholder,
  suffix,
  type = "number",
  min = 0,
  max,
  step = 0.01,
}: ProfitInputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || 0;
    onChange(newValue);
  };

  const displayValue = value === 0 ? "" : value.toString();

  return (
    <div className="space-y-2">
      <Label htmlFor={label} className="text-sm font-medium text-gray-700">
        {label}
        {suffix && <span className="text-gray-500 ml-1">({suffix})</span>}
      </Label>
      <div className="relative">
        {type === "currency" && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            ₱
          </span>
        )}
        {type === "percentage" && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            %
          </span>
        )}
        <Input
          id={label}
          type="number"
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder || "0"}
          min={min}
          max={max}
          step={step}
          className={`w-full ${
            type === "currency" ? "pl-8" : ""
          } ${type === "percentage" ? "pr-8" : ""}`}
        />
      </div>
    </div>
  );
}

