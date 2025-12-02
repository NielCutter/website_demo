import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

interface ProfitInputFieldProps {
  label?: string;
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
  // Generate a unique ID from the label text
  const inputId = label 
    ? `profit-input-${label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`
    : `profit-input-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || 0;
    onChange(newValue);
  };

  const displayValue = value === 0 ? "" : value.toString();

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
          {suffix && <span className="text-gray-500 ml-1">({suffix})</span>}
        </Label>
      )}
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
          id={inputId}
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
          aria-label={label || "Input field"}
        />
      </div>
    </div>
  );
}

