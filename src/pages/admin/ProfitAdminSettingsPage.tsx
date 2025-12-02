import { useState, useEffect } from "react";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { MarketplacePreset, AdminSettings } from "../../types/profit";
import { ProfitNav } from "../../components/admin/profit/ProfitNav";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Trash2, Plus, Save } from "lucide-react";
import "../../styles/portfolio-extra.css";

const SETTINGS_DOC_ID = "profitAdminSettings";

export function ProfitAdminSettingsPage() {
  const { user } = useAdminAuth();
  const [defaultTaxRate, setDefaultTaxRate] = useState(12);
  const [presets, setPresets] = useState<MarketplacePreset[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newPresetName, setNewPresetName] = useState("");
  const [newPresetFee, setNewPresetFee] = useState(0);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const settingsRef = doc(db, "profitAdminSettings", SETTINGS_DOC_ID);
      const settingsSnap = await getDoc(settingsRef);

      if (settingsSnap.exists()) {
        const data = settingsSnap.data();
        setDefaultTaxRate(data.defaultTaxRate || 12);
      }

      // Load presets
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
    } catch (error) {
      console.error("Error loading settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const settingsRef = doc(db, "profitAdminSettings", SETTINGS_DOC_ID);
      await setDoc(
        settingsRef,
        {
          defaultTaxRate,
          updatedAt: serverTimestamp(),
          updatedBy: user.uid,
        },
        { merge: true }
      );
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const addPreset = async () => {
    if (!newPresetName.trim() || newPresetFee <= 0) {
      alert("Please enter a valid preset name and fee percentage");
      return;
    }

    try {
      const presetsRef = collection(db, "marketplacePresets");
      await setDoc(doc(presetsRef), {
        name: newPresetName.trim(),
        feePercentage: newPresetFee,
        createdAt: serverTimestamp(),
      });
      setNewPresetName("");
      setNewPresetFee(0);
      loadSettings();
    } catch (error) {
      console.error("Error adding preset:", error);
      alert("Failed to add preset");
    }
  };

  const deletePreset = async (id: string) => {
    if (!confirm("Are you sure you want to delete this preset?")) return;

    try {
      await deleteDoc(doc(db, "marketplacePresets", id));
      loadSettings();
    } catch (error) {
      console.error("Error deleting preset:", error);
      alert("Failed to delete preset");
    }
  };

  if (loading) {
    return (
      <div className="portfolio-extra-wrapper min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="portfolio-extra-wrapper min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <ProfitNav />
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2">
            Profit Calculator Settings
          </h1>
          <p className="text-gray-600">
            Manage default tax rate and marketplace fee presets
          </p>
        </div>

        {/* Default Tax Rate */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-semibold text-black mb-4">
            Default Tax Rate
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="taxRate" className="text-sm font-medium text-gray-700">
                Tax Rate (%)
              </Label>
              <div className="relative">
                <Input
                  id="taxRate"
                  type="number"
                  value={defaultTaxRate}
                  onChange={(e) => setDefaultTaxRate(parseFloat(e.target.value) || 0)}
                  min={0}
                  max={100}
                  step={0.01}
                  className="w-full pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  %
                </span>
              </div>
            </div>
            <Button
              onClick={saveSettings}
              disabled={saving}
              className="bg-black text-white hover:bg-gray-800"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Tax Rate"}
            </Button>
          </div>
        </div>

        {/* Marketplace Presets */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-black mb-4">
            Marketplace Fee Presets
          </h2>

          {/* Add New Preset */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Add New Preset
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="presetName" className="text-sm text-gray-600">
                  Preset Name
                </Label>
                <Input
                  id="presetName"
                  type="text"
                  value={newPresetName}
                  onChange={(e) => setNewPresetName(e.target.value)}
                  placeholder="e.g., Shopee"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="presetFee" className="text-sm text-gray-600">
                  Fee Percentage
                </Label>
                <div className="relative">
                  <Input
                    id="presetFee"
                    type="number"
                    value={newPresetFee}
                    onChange={(e) => setNewPresetFee(parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    min={0}
                    max={100}
                    step={0.01}
                    className="w-full pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    %
                  </span>
                </div>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={addPreset}
                  className="w-full bg-black text-white hover:bg-gray-800"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Preset
                </Button>
              </div>
            </div>
          </div>

          {/* Presets List */}
          <div className="space-y-3">
            {presets.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No presets yet. Add your first preset above.
              </p>
            ) : (
              presets.map((preset) => (
                <div
                  key={preset.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div>
                    <p className="font-medium text-gray-900">{preset.name}</p>
                    <p className="text-sm text-gray-500">
                      {preset.feePercentage}% fee
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => preset.id && deletePreset(preset.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

