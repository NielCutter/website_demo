import { useState, useEffect } from "react";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import {
  getProfitCalculations,
  deleteProfitCalculation,
} from "../../services/profitService";
import { ProfitCalculation, SortField, SortOrder } from "../../types/profit";
import { formatCurrency, formatPercentage } from "../../utils/profit";
import { ProfitNav } from "../../components/admin/profit/ProfitNav";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { ProfitCalculator } from "../../components/admin/profit/ProfitCalculator";
import {
  Trash2,
  Edit,
  Eye,
  ArrowUpDown,
  Search,
  Plus,
} from "lucide-react";

export function ProfitDashboardPage() {
  const { user } = useAdminAuth();
  const [calculations, setCalculations] = useState<ProfitCalculation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [selectedCalculation, setSelectedCalculation] =
    useState<ProfitCalculation | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    loadCalculations();
  }, [user, sortField, sortOrder]);

  const loadCalculations = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const data = await getProfitCalculations(user.uid, sortField, sortOrder);
      setCalculations(data);
    } catch (error) {
      console.error("Error loading calculations:", error);
      alert("Failed to load calculations");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this calculation?")) return;

    try {
      await deleteProfitCalculation(id);
      setCalculations((prev) => prev.filter((calc) => calc.id !== id));
    } catch (error) {
      console.error("Error deleting calculation:", error);
      alert("Failed to delete calculation");
    }
  };

  const handleView = (calculation: ProfitCalculation) => {
    setSelectedCalculation(calculation);
    setViewDialogOpen(true);
  };

  const handleEdit = (calculation: ProfitCalculation) => {
    setSelectedCalculation(calculation);
    setEditDialogOpen(true);
  };

  const filteredCalculations = calculations.filter((calc) =>
    calc.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="portfolio-extra-wrapper min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <ProfitNav />
        
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2">
              Profit Dashboard
            </h1>
            <p className="text-gray-600">
              View and manage your saved profit calculations
            </p>
          </div>
          <Button
            onClick={() => (window.location.href = "/admin/profit/calculator")}
            className="bg-black text-white hover:bg-gray-800"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Calculation
          </Button>
        </div>

        {/* Search and Sort */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by item name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-gray-300">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Sort: {sortField} ({sortOrder})
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleSort("date")}>
                Sort by Date
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("profitMargin")}>
                Sort by Profit Margin
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("itemName")}>
                Sort by Name
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : filteredCalculations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No calculations found</p>
            <Button
              onClick={() => (window.location.href = "/admin/profit/calculator")}
              className="bg-black text-white hover:bg-gray-800"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create First Calculation
            </Button>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Selling Price</TableHead>
                  <TableHead>Total Cost</TableHead>
                  <TableHead>Net Profit</TableHead>
                  <TableHead>Profit Margin</TableHead>
                  <TableHead>ROI</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCalculations.map((calc) => (
                  <TableRow key={calc.id}>
                    <TableCell className="font-medium">
                      {calc.itemName}
                    </TableCell>
                    <TableCell>
                      {formatCurrency(calc.inputs.sellingPrice)}
                    </TableCell>
                    <TableCell>
                      {formatCurrency(calc.results.totalCost)}
                    </TableCell>
                    <TableCell
                      className={
                        calc.results.netProfit >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {formatCurrency(calc.results.netProfit)}
                    </TableCell>
                    <TableCell>
                      {formatPercentage(calc.results.profitMargin)}
                    </TableCell>
                    <TableCell>
                      {formatPercentage(calc.results.roi)}
                    </TableCell>
                    <TableCell className="text-gray-500 text-sm">
                      {calc.createdAt instanceof Date
                        ? calc.createdAt.toLocaleDateString()
                        : new Date(calc.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleView(calc)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(calc)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => calc.id && handleDelete(calc.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* View Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedCalculation?.itemName}</DialogTitle>
            </DialogHeader>
            {selectedCalculation && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Inputs</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Raw Materials:</span>{" "}
                      {formatCurrency(selectedCalculation.inputs.rawMaterials)}
                    </div>
                    <div>
                      <span className="text-gray-500">Labor:</span>{" "}
                      {formatCurrency(selectedCalculation.inputs.labor)}
                    </div>
                    <div>
                      <span className="text-gray-500">Packaging:</span>{" "}
                      {formatCurrency(selectedCalculation.inputs.packaging)}
                    </div>
                    <div>
                      <span className="text-gray-500">Marketing:</span>{" "}
                      {formatCurrency(selectedCalculation.inputs.marketing)}
                    </div>
                    <div>
                      <span className="text-gray-500">Marketplace Fees:</span>{" "}
                      {formatCurrency(selectedCalculation.inputs.marketplaceFees)}
                    </div>
                    <div>
                      <span className="text-gray-500">Overhead:</span>{" "}
                      {formatCurrency(selectedCalculation.inputs.overhead)}
                    </div>
                    <div>
                      <span className="text-gray-500">Tax Rate:</span>{" "}
                      {formatPercentage(selectedCalculation.inputs.taxRate)}
                    </div>
                    <div>
                      <span className="text-gray-500">Selling Price:</span>{" "}
                      {formatCurrency(selectedCalculation.inputs.sellingPrice)}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Results</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Total Cost:</span>{" "}
                      {formatCurrency(selectedCalculation.results.totalCost)}
                    </div>
                    <div>
                      <span className="text-gray-500">Gross Profit:</span>{" "}
                      {formatCurrency(selectedCalculation.results.grossProfit)}
                    </div>
                    <div>
                      <span className="text-gray-500">Net Profit:</span>{" "}
                      {formatCurrency(selectedCalculation.results.netProfit)}
                    </div>
                    <div>
                      <span className="text-gray-500">Profit Margin:</span>{" "}
                      {formatPercentage(selectedCalculation.results.profitMargin)}
                    </div>
                    <div>
                      <span className="text-gray-500">Markup:</span>{" "}
                      {formatPercentage(selectedCalculation.results.markup)}
                    </div>
                    <div>
                      <span className="text-gray-500">Break-Even:</span>{" "}
                      {formatCurrency(selectedCalculation.results.breakEven)}
                    </div>
                    <div>
                      <span className="text-gray-500">ROI:</span>{" "}
                      {formatPercentage(selectedCalculation.results.roi)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Calculation</DialogTitle>
            </DialogHeader>
            {selectedCalculation && (
              <ProfitCalculator
                initialItemName={selectedCalculation.itemName}
                initialInputs={selectedCalculation.inputs}
                onSave={async (itemName, inputs, results) => {
                  if (selectedCalculation.id) {
                    try {
                      const { updateProfitCalculation } = await import(
                        "../../services/profitService"
                      );
                      await updateProfitCalculation(selectedCalculation.id, {
                        itemName,
                        inputs,
                        results,
                      });
                      setEditDialogOpen(false);
                      loadCalculations();
                    } catch (error) {
                      console.error("Error updating calculation:", error);
                      alert("Failed to update calculation");
                    }
                  }
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

