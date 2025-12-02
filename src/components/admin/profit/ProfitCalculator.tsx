import { useState, useMemo } from "react";
import { Calculator, Save, RefreshCw } from "lucide-react";
import { ProfitInputField } from "./ProfitInputField";
import { ProfitResultsGrid } from "./ProfitResultCard";
import { calculateAll, formatCurrency } from "../../../utils/profit";
import { ProfitInputs, ProfitResults } from "../../../types/profit";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

interface ProfitCalculatorProps {
  onSave?: (itemName: string, inputs: ProfitInputs, results: ProfitResults) => void;
  initialInputs?: Partial<ProfitInputs>;
  initialItemName?: string;
  isLoading?: boolean;
}

const defaultInputs: ProfitInputs = {
  rawMaterials: 0,
  labor: 0,
  packaging: 0,
  marketing: 0,
  marketplaceFees: 0,
  overhead: 0,
  taxRate: 12, // Default 12% VAT in Philippines
  sellingPrice: 0,
};

export function ProfitCalculator({
  onSave,
  initialInputs,
  initialItemName = "",
  isLoading = false,
}: ProfitCalculatorProps) {
  const [inputs, setInputs] = useState<ProfitInputs>({
    ...defaultInputs,
    ...initialInputs,
  });
  const [itemName, setItemName] = useState(initialItemName);

  const results = useMemo(() => calculateAll(inputs), [inputs]);

  const handleInputChange = (field: keyof ProfitInputs) => (value: number) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs(defaultInputs);
    setItemName("");
  };

  const handleSave = () => {
    if (!itemName.trim()) {
      alert("Please enter an item name");
      return;
    }
    if (onSave) {
      onSave(itemName.trim(), inputs, results);
    }
  };

  const isFormValid = itemName.trim().length > 0 && inputs.sellingPrice > 0;

  return (
    <div className="space-y-6">
      {/* Item Name */}
      <div className="space-y-2">
        <Label htmlFor="itemName" className="text-sm font-medium text-gray-700">
          Item Name
        </Label>
        <Input
          id="itemName"
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="e.g., Premium T-Shirt"
          className="w-full"
        />
      </div>

      {/* Input Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ProfitInputField
          label="Raw Materials"
          value={inputs.rawMaterials}
          onChange={handleInputChange("rawMaterials")}
          type="currency"
          placeholder="0.00"
        />
        <ProfitInputField
          label="Labor"
          value={inputs.labor}
          onChange={handleInputChange("labor")}
          type="currency"
          placeholder="0.00"
        />
        <ProfitInputField
          label="Packaging"
          value={inputs.packaging}
          onChange={handleInputChange("packaging")}
          type="currency"
          placeholder="0.00"
        />
        <ProfitInputField
          label="Marketing"
          value={inputs.marketing}
          onChange={handleInputChange("marketing")}
          type="currency"
          placeholder="0.00"
        />
        <ProfitInputField
          label="Marketplace Fees"
          value={inputs.marketplaceFees}
          onChange={handleInputChange("marketplaceFees")}
          type="currency"
          placeholder="0.00"
        />
        <ProfitInputField
          label="Overhead"
          value={inputs.overhead}
          onChange={handleInputChange("overhead")}
          type="currency"
          placeholder="0.00"
        />
        <ProfitInputField
          label="Tax Rate"
          value={inputs.taxRate}
          onChange={handleInputChange("taxRate")}
          type="percentage"
          placeholder="12"
          min={0}
          max={100}
        />
        <ProfitInputField
          label="Selling Price"
          value={inputs.sellingPrice}
          onChange={handleInputChange("sellingPrice")}
          type="currency"
          placeholder="0.00"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={handleSave}
          disabled={!isFormValid || isLoading}
          className="bg-black text-white hover:bg-gray-800"
        >
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? "Saving..." : "Save Calculation"}
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="border-gray-300"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Results Grid */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Calculation Results</h3>
        </div>
        <ProfitResultsGrid results={results} />
      </div>
    </div>
  );
}

