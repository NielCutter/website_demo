import { useState, useMemo, useEffect } from "react";
import { Calculator, Save, Info, AlertCircle, CheckCircle2, Zap } from "lucide-react";
import { ProfitInputField } from "./ProfitInputField";
import { ProfitResultsGrid } from "./ProfitResultCard";
import { calculateAll, formatCurrency } from "../../../utils/profit";
import { ProfitInputs, ProfitResults, MarketplacePreset } from "../../../types/profit";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";

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
  const [presets, setPresets] = useState<MarketplacePreset[]>([]);
  const [loadingPresets, setLoadingPresets] = useState(true);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Load default tax rate and presets
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // Load default tax rate
      try {
        const settingsRef = doc(db, "profitAdminSettings", "profitAdminSettings");
        const settingsSnap = await getDoc(settingsRef);
        if (settingsSnap.exists()) {
          const data = settingsSnap.data();
          if (data.defaultTaxRate && !initialInputs?.taxRate) {
            setInputs((prev) => ({ ...prev, taxRate: data.defaultTaxRate }));
          }
        }
      } catch (settingsError) {
        // Settings collection might not exist yet, use default
        console.log("Settings not found, using defaults");
      }

      // Load marketplace presets
      try {
        const presetsRef = collection(db, "marketplacePresets");
        const presetsSnap = await getDocs(presetsRef);
        const presetsData: MarketplacePreset[] = [];
        presetsSnap.forEach((doc) => {
          presetsData.push({
            id: doc.id,
            ...doc.data(),
          } as MarketplacePreset);
        });
        setPresets(presetsData);
      } catch (presetsError) {
        // Presets collection might not exist yet, use empty array
        console.log("Presets not found, using empty array");
        setPresets([]);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
      // Set defaults on error
      setPresets([]);
    } finally {
      setLoadingPresets(false);
    }
  };

  const results = useMemo(() => calculateAll(inputs), [inputs]);

  const handleInputChange = (field: keyof ProfitInputs) => (value: number) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };


  const handleSave = () => {
    setValidationError(null);

    if (!itemName.trim()) {
      setValidationError("Please enter an item name");
      return;
    }
    if (inputs.sellingPrice <= 0) {
      setValidationError("Selling price must be greater than 0");
      return;
    }
    if (inputs.taxRate < 0 || inputs.taxRate > 100) {
      setValidationError("Tax rate must be between 0 and 100");
      return;
    }
    if (onSave) {
      onSave(itemName.trim(), inputs, results);
    }
  };

  const handlePresetSelect = (presetId: string) => {
    const preset = presets.find((p) => p.id === presetId);
    if (preset && inputs.sellingPrice > 0) {
      // Calculate marketplace fee as percentage of selling price
      const feeAmount = (inputs.sellingPrice * preset.feePercentage) / 100;
      setInputs((prev) => ({ ...prev, marketplaceFees: feeAmount }));
    }
  };

  const isFormValid = itemName.trim().length > 0 && inputs.sellingPrice > 0;
  const hasProfit = results.netProfit > 0;
  const totalCost = results.totalCost;

  return (
    <div className="space-y-6">
      {/* Item Name */}
      <div className="space-y-2">
        <Label htmlFor="itemName" className="text-sm font-medium text-gray-700">
          Item Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="itemName"
          type="text"
          value={itemName}
          onChange={(e) => {
            setItemName(e.target.value);
            setValidationError(null);
          }}
          placeholder="e.g., Premium T-Shirt, Oversized Hoodie"
          className="w-full bg-white"
        />
        <p className="text-xs text-gray-500">
          Give your product a descriptive name for easy identification
        </p>
      </div>

      {/* Validation Error */}
      {validationError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-800">{validationError}</p>
        </div>
      )}

      {/* Cost Inputs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Cost Breakdown</h3>
            <p className="text-sm text-gray-500">Enter all costs associated with your product</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Total Cost</p>
            <p className="text-lg font-bold text-gray-900">{formatCurrency(totalCost)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProfitInputField
            label="Raw Materials"
            value={inputs.rawMaterials}
            onChange={handleInputChange("rawMaterials")}
            type="currency"
            placeholder="0.00"
            tooltip="Cost of materials used to create the product (fabric, thread, etc.)"
          />
          <ProfitInputField
            label="Labor"
            value={inputs.labor}
            onChange={handleInputChange("labor")}
            type="currency"
            placeholder="0.00"
            tooltip="Cost of labor or manufacturing time to produce the item"
          />
          <ProfitInputField
            label="Packaging"
            value={inputs.packaging}
            onChange={handleInputChange("packaging")}
            type="currency"
            placeholder="0.00"
            tooltip="Cost of packaging materials (boxes, bags, labels, etc.)"
          />
          <ProfitInputField
            label="Marketing"
            value={inputs.marketing}
            onChange={handleInputChange("marketing")}
            type="currency"
            placeholder="0.00"
            tooltip="Marketing and advertising costs allocated per product"
          />
          <div className="space-y-2">
            {presets.length > 0 && inputs.sellingPrice > 0 && (
              <Select
                onValueChange={handlePresetSelect}
                value=""
              >
                <SelectTrigger className="w-full bg-white mb-2" aria-label="Select marketplace preset">
                  <SelectValue placeholder="Quick select preset" />
                </SelectTrigger>
                <SelectContent>
                  {presets.map((preset) => {
                    const feeAmount = (inputs.sellingPrice * preset.feePercentage) / 100;
                    return (
                      <SelectItem key={preset.id} value={preset.id || ""}>
                        {preset.name} ({preset.feePercentage}% = {formatCurrency(feeAmount)})
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
            {presets.length > 0 && inputs.sellingPrice === 0 && (
              <p className="text-xs text-gray-500 mb-2">
                Enter selling price first to use presets
              </p>
            )}
            <ProfitInputField
              label={presets.length > 0 && inputs.sellingPrice > 0 ? "Or enter custom fee amount" : "Marketplace Fees"}
              value={inputs.marketplaceFees}
              onChange={handleInputChange("marketplaceFees")}
              type="currency"
              placeholder="0.00"
              tooltip="Fees charged by marketplace platforms (Shopee, Lazada, etc.) as a percentage or fixed amount of the selling price"
            />
          </div>
          <ProfitInputField
            label="Overhead"
            value={inputs.overhead}
            onChange={handleInputChange("overhead")}
            type="currency"
            placeholder="0.00"
            tooltip="General business overhead costs allocated per product (rent, utilities, admin costs, etc.)"
          />
        </div>
      </div>

      {/* Pricing & Tax Section */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Pricing & Tax</h3>
          <p className="text-sm text-gray-500">Set your selling price and tax rate</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfitInputField
            label="Tax Rate"
            value={inputs.taxRate}
            onChange={handleInputChange("taxRate")}
            type="percentage"
            placeholder="12"
            min={0}
            max={100}
            tooltip="Tax rate percentage applied to gross profit (e.g., 12% VAT in Philippines). Tax is calculated on profit, not revenue."
          />
          <div className="space-y-2">
            <ProfitInputField
              label="Selling Price"
              value={inputs.sellingPrice}
              onChange={handleInputChange("sellingPrice")}
              type="currency"
              placeholder="0.00"
              tooltip="The final price at which you will sell the product to customers. This is used to calculate profit margins and ROI."
            />
            <div className="flex items-start gap-2 text-xs text-gray-500 -mt-1">
              <Info className="w-3 h-3 flex-shrink-0 mt-0.5" />
              <span>This is the price you'll sell the product for</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Summary */}
      {inputs.sellingPrice > 0 && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-blue-900">Quick Summary</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Total Cost</p>
              <p className="font-semibold text-gray-900">{formatCurrency(totalCost)}</p>
            </div>
            <div>
              <p className="text-gray-600">Net Profit</p>
              <p className={`font-semibold ${hasProfit ? "text-green-600" : "text-red-600"}`}>
                {formatCurrency(results.netProfit)}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Profit Margin</p>
              <p className={`font-semibold ${results.profitMargin >= 20 ? "text-green-600" : results.profitMargin >= 10 ? "text-yellow-600" : "text-red-600"}`}>
                {results.profitMargin.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-gray-600">ROI</p>
              <p className={`font-semibold ${results.roi >= 50 ? "text-green-600" : results.roi >= 20 ? "text-yellow-600" : "text-red-600"}`}>
                {results.roi.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Save Button - Always Visible */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            {!isFormValid && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Info className="w-4 h-4 flex-shrink-0" />
                <span>Fill in item name and selling price to save</span>
              </div>
            )}
            {isFormValid && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Ready to save</span>
              </div>
            )}
          </div>
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSave();
            }}
            disabled={!isFormValid || isLoading}
            className={`flex-shrink-0 w-full sm:w-auto ${
              isFormValid && !isLoading
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            size="lg"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Saving..." : "Save Calculation"}
          </Button>
        </div>
      </div>

      {/* Results Grid */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Detailed Results</h3>
          </div>
          {hasProfit && (
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-4 h-4" />
              <span className="font-medium">Profitable</span>
            </div>
          )}
        </div>
        {inputs.sellingPrice === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
            <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 font-medium mb-1">Enter values to see results</p>
            <p className="text-sm text-gray-400">
              Fill in your costs and selling price to calculate profit metrics
            </p>
          </div>
        ) : (
          <ProfitResultsGrid results={results} />
        )}
      </div>
    </div>
  );
}

