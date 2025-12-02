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
import { 
  Trash2, 
  Plus, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Edit2,
  X,
  Sparkles
} from "lucide-react";
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
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [editingPreset, setEditingPreset] = useState<string | null>(null);
  const [editPresetName, setEditPresetName] = useState("");
  const [editPresetFee, setEditPresetFee] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);

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

    if (defaultTaxRate < 0 || defaultTaxRate > 100) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
      return;
    }

    setSaving(true);
    setSaveStatus("idle");
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
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } finally {
      setSaving(false);
    }
  };

  const addPreset = async () => {
    if (!newPresetName.trim()) {
      alert("Please enter a preset name");
      return;
    }
    if (newPresetFee < 0 || newPresetFee > 100) {
      alert("Fee percentage must be between 0 and 100");
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
      setShowAddForm(false);
      loadSettings();
    } catch (error) {
      console.error("Error adding preset:", error);
      alert("Failed to add preset");
    }
  };

  const startEditPreset = (preset: MarketplacePreset) => {
    setEditingPreset(preset.id || null);
    setEditPresetName(preset.name);
    setEditPresetFee(preset.feePercentage);
  };

  const cancelEdit = () => {
    setEditingPreset(null);
    setEditPresetName("");
    setEditPresetFee(0);
  };

  const saveEditPreset = async (id: string) => {
    if (!editPresetName.trim()) {
      alert("Please enter a preset name");
      return;
    }
    if (editPresetFee < 0 || editPresetFee > 100) {
      alert("Fee percentage must be between 0 and 100");
      return;
    }

    try {
      await setDoc(
        doc(db, "marketplacePresets", id),
        {
          name: editPresetName.trim(),
          feePercentage: editPresetFee,
        },
        { merge: true }
      );
      cancelEdit();
      loadSettings();
    } catch (error) {
      console.error("Error updating preset:", error);
      alert("Failed to update preset");
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
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-black" />
            <h1 className="text-3xl sm:text-4xl font-bold text-black">
              Calculator Settings
            </h1>
          </div>
          <p className="text-gray-600">
            Configure default tax rate and marketplace fee presets for quick calculations
          </p>
        </div>

        {/* Save Status Messages */}
        {saveStatus === "success" && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-green-800 text-sm">Settings saved successfully!</p>
          </div>
        )}
        {saveStatus === "error" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800 text-sm">Failed to save settings. Please try again.</p>
          </div>
        )}

        {/* Default Tax Rate */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 mb-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-black mb-1">
                Default Tax Rate
              </h2>
              <p className="text-sm text-gray-500">
                This rate will be pre-filled in new calculations (default: 12% VAT for Philippines)
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="taxRate" className="text-sm font-medium text-gray-700">
                Tax Rate (%)
              </Label>
              <div className="relative max-w-xs">
                <Input
                  id="taxRate"
                  type="number"
                  value={defaultTaxRate}
                  onChange={(e) => setDefaultTaxRate(parseFloat(e.target.value) || 0)}
                  min={0}
                  max={100}
                  step={0.01}
                  className="w-full pr-8 bg-white"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  %
                </span>
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-500 mt-1">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Enter a value between 0 and 100</span>
              </div>
            </div>
            <Button
              onClick={saveSettings}
              disabled={saving || defaultTaxRate < 0 || defaultTaxRate > 100}
              className="bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Tax Rate"}
            </Button>
          </div>
        </div>

        {/* Marketplace Presets */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-black mb-1">
                Marketplace Fee Presets
              </h2>
              <p className="text-sm text-gray-500">
                Create presets for common marketplaces to quickly apply fees in calculations
              </p>
            </div>
          </div>

          {/* Add New Preset Button */}
          {!showAddForm && (
            <Button
              onClick={() => setShowAddForm(true)}
              variant="outline"
              className="mb-6 border-gray-300 hover:bg-gray-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Preset
            </Button>
          )}

          {/* Add New Preset Form */}
          {showAddForm && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-700">
                  Add New Preset
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewPresetName("");
                    setNewPresetFee(0);
                  }}
                  className="h-6 w-6"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="presetName" className="text-sm font-medium text-gray-700">
                    Preset Name
                  </Label>
                  <Input
                    id="presetName"
                    type="text"
                    value={newPresetName}
                    onChange={(e) => setNewPresetName(e.target.value)}
                    placeholder="e.g., Shopee, Lazada"
                    className="w-full bg-white"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addPreset();
                      }
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="presetFee" className="text-sm font-medium text-gray-700">
                    Fee Percentage
                  </Label>
                  <div className="relative">
                    <Input
                      id="presetFee"
                      type="number"
                      value={newPresetFee}
                      onChange={(e) => setNewPresetFee(parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      min={0}
                      max={100}
                      step={0.01}
                      className="w-full pr-8 bg-white"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addPreset();
                        }
                      }}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      %
                    </span>
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <Button
                    onClick={addPreset}
                    disabled={!newPresetName.trim() || newPresetFee < 0 || newPresetFee > 100}
                    className="flex-1 bg-black text-white hover:bg-gray-800 disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddForm(false);
                      setNewPresetName("");
                      setNewPresetFee(0);
                    }}
                    className="border-gray-300"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Presets List */}
          <div className="space-y-3">
            {presets.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                <Info className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 font-medium mb-1">No presets yet</p>
                <p className="text-sm text-gray-400 mb-4">
                  Create presets for quick access to marketplace fees
                </p>
                <Button
                  onClick={() => setShowAddForm(true)}
                  variant="outline"
                  className="border-gray-300"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Preset
                </Button>
              </div>
            ) : (
              presets.map((preset) => (
                <div
                  key={preset.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  {editingPreset === preset.id ? (
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs text-gray-600">Name</Label>
                        <Input
                          value={editPresetName}
                          onChange={(e) => setEditPresetName(e.target.value)}
                          className="bg-white text-sm"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && preset.id) {
                              saveEditPreset(preset.id);
                            }
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-gray-600">Fee (%)</Label>
                        <div className="relative">
                          <Input
                            type="number"
                            value={editPresetFee}
                            onChange={(e) => setEditPresetFee(parseFloat(e.target.value) || 0)}
                            min={0}
                            max={100}
                            step={0.01}
                            className="bg-white text-sm pr-8"
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && preset.id) {
                                saveEditPreset(preset.id);
                              }
                            }}
                          />
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                            %
                          </span>
                        </div>
                      </div>
                      <div className="flex items-end gap-2">
                        <Button
                          onClick={() => preset.id && saveEditPreset(preset.id)}
                          size="sm"
                          className="bg-black text-white hover:bg-gray-800"
                        >
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Save
                        </Button>
                        <Button
                          onClick={cancelEdit}
                          size="sm"
                          variant="outline"
                          className="border-gray-300"
                        >
                          <X className="w-3 h-3 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-1">{preset.name}</p>
                        <p className="text-sm text-gray-500">
                          {preset.feePercentage}% marketplace fee
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => startEditPreset(preset)}
                          className="hover:bg-gray-200"
                        >
                          <Edit2 className="w-4 h-4 text-gray-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => preset.id && deletePreset(preset.id)}
                          className="hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

