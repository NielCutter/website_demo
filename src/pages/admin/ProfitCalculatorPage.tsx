import { useState } from "react";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import { ProfitCalculator } from "../../components/admin/profit/ProfitCalculator";
import { ProfitNav } from "../../components/admin/profit/ProfitNav";
import { saveProfitCalculation } from "../../services/profitService";
import { ProfitInputs, ProfitResults } from "../../types/profit";
import "../../styles/portfolio-extra.css";

export function ProfitCalculatorPage() {
  const { user } = useAdminAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSave = async (
    itemName: string,
    inputs: ProfitInputs,
    results: ProfitResults
  ) => {
    if (!user) {
      alert("You must be logged in to save calculations");
      return;
    }

    setIsSaving(true);
    setSaveStatus("idle");

    try {
      await saveProfitCalculation({
        itemName,
        inputs,
        results,
        userId: user.uid,
      });
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      console.error("Error saving calculation:", error);
      setSaveStatus("error");
      alert("Failed to save calculation. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="portfolio-extra-wrapper min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <ProfitNav />
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2">
            Business Profit Calculator
          </h1>
          <p className="text-gray-600">
            Calculate profit margins, markup, ROI, and break-even points for your products
          </p>
        </div>

        {/* Save Status */}
        {saveStatus === "success" && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            Calculation saved successfully!
          </div>
        )}
        {saveStatus === "error" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            Failed to save calculation. Please try again.
          </div>
        )}

        {/* Calculator */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <ProfitCalculator
            onSave={handleSave}
            isLoading={isSaving}
          />
        </div>
      </div>
    </div>
  );
}

