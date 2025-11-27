import { useState, useMemo } from "react";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { Search, Filter, X, Grid3x3, List, ChevronDown, Plus } from "lucide-react";

type ItemStatus = "active" | "archived";
type DisplayOption = "hot" | "new" | "featured" | null;

export interface LibraryItem {
  id: string;
  title: string;
  category: string;
  description?: string;
  price?: number;
  imageUrl: string; // Can be base64 data URI or external URL
  votes: number;
  status?: ItemStatus;
  displayOption?: DisplayOption;
}

// Convert image file to base64 with compression
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        
        // Resize if too large (max 800px width/height, keep aspect ratio)
        const maxSize = 800;
        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = (height * maxSize) / width;
            width = maxSize;
          } else {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to base64 with quality compression (0.8 = 80% quality)
        const base64 = canvas.toDataURL("image/jpeg", 0.8);
        resolve(base64);
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const categories = ["Headwear", "Pants", "Jacket", "Hoodie", "Tshirt", "Oversized", "Accessories"];

const displayOptions: { value: DisplayOption; label: string }[] = [
  { value: null, label: "None" },
  { value: "hot", label: "HOT" },
  { value: "new", label: "NEW" },
  { value: "featured", label: "Featured" },
];

const initialForm = {
  title: "",
  category: categories[0] ?? "Headwear",
  description: "",
  price: "",
  imageUrl: "",
  votes: 0,
  status: "active" as ItemStatus,
  displayOption: null as DisplayOption,
};

const ITEMS_PER_PAGE = 20;

export function LibraryManager() {
  const {
    data: items,
    loading,
    addDocument,
    updateDocument,
    deleteDocument,
  } = useFirestoreCollection<LibraryItem>("items", {
    orderByField: "createdAt",
    orderDirection: "desc",
  });

  const [formState, setFormState] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedDisplay, setSelectedDisplay] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const resetForm = () => {
    setFormState(initialForm);
    setEditingId(null);
    setFile(null);
  };

  const uploadImageIfNeeded = async (): Promise<string | undefined> => {
    // If no file and no URL, return undefined (image is optional)
    if (!file && !formState.imageUrl.trim()) {
      return undefined;
    }
    
    if (!file) {
      return formState.imageUrl.trim() || undefined;
    }

    // Check file size (max 2MB before compression)
    if (file.size > 2 * 1024 * 1024) {
      throw new Error("Image is too large. Please use an image smaller than 2MB.");
    }

    // Convert to base64
    const base64 = await fileToBase64(file);
    
    // Check if base64 is too large (Firestore limit is 1MB per document)
    // Base64 is ~33% larger than binary, so ~750KB base64 = ~1MB binary
    if (base64.length > 750 * 1024) {
      throw new Error("Image is too large after compression. Please use a smaller image.");
    }
    
    return base64;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Validate required fields
    if (!formState.title.trim()) {
      alert("Please enter a title.");
      return;
    }
    
    setUploading(true);

    try {
      const imageUrl = await uploadImageIfNeeded();
      const payload: Record<string, unknown> = {
        title: formState.title.trim(),
        category: formState.category,
        votes: editingId ? formState.votes : 0,
        status: formState.status,
      };
      
      // Only include optional fields if they have values
      if (imageUrl) {
        payload.imageUrl = imageUrl;
      }
      if (formState.description?.trim()) {
        payload.description = formState.description.trim();
      }
      if (formState.price && formState.price.trim()) {
        payload.price = Number(formState.price);
      }
      if (formState.displayOption) {
        payload.displayOption = formState.displayOption;
      }

      if (editingId) {
        await updateDocument(editingId, payload);
      } else {
        await addDocument(payload as unknown as Omit<LibraryItem, "id">);
      }

      resetForm();
    } catch (error) {
      console.error("Error saving item:", error);
      alert(error instanceof Error ? error.message : "Failed to save item");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (item: LibraryItem) => {
    setEditingId(item.id);
    setFormState({
      title: item.title,
      category: item.category,
      description: item.description ?? "",
      price: item.price?.toString() ?? "",
      imageUrl: item.imageUrl,
      votes: item.votes ?? 0,
      status: item.status ?? "active",
      displayOption: item.displayOption ?? null,
    });
    setFile(null);
  };

  const handleDelete = async (item: LibraryItem) => {
    const confirmation = window.confirm(`Delete ${item.title}?`);
    if (!confirmation) return;

    try {
      await deleteDocument(item.id);
    } catch (error) {
      console.error("Unable to delete item:", error);
      alert("Failed to delete item");
    }
  };

  // Filter and search items
  const filteredItems = useMemo(() => {
    let filtered = items;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter((item) => item.status === selectedStatus);
    }

    // Display option filter
    if (selectedDisplay !== "all") {
      if (selectedDisplay === "none") {
        filtered = filtered.filter((item) => !item.displayOption);
      } else {
        filtered = filtered.filter((item) => item.displayOption === selectedDisplay);
      }
    }

    return filtered;
  }, [items, searchQuery, selectedCategory, selectedStatus, selectedDisplay]);

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  // Get unique categories
  const availableCategories = useMemo(() => {
    const cats = new Set(items.map((item) => item.category));
    return Array.from(cats).sort();
  }, [items]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedStatus("all");
    setSelectedDisplay("all");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() ||
    selectedCategory !== "all" ||
    selectedStatus !== "all" ||
    selectedDisplay !== "all";

  return (
    <div className="space-y-6">
      {/* Header with Add Button and Stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-1">Item Library</h3>
          <p className="text-sm text-gray-400">
            {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
            {items.length !== filteredItems.length && ` of ${items.length} total`}
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (editingId) resetForm();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          {showForm ? "Hide Form" : "Add Item"}
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFE5] transition-colors"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors md:hidden"
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] text-xs font-semibold">
                {[searchQuery, selectedCategory, selectedStatus, selectedDisplay].filter((f) => f !== "all" && f).length}
              </span>
            )}
          </button>

          {/* Desktop Filters */}
          <div className={`${showFilters ? "flex" : "hidden"} md:flex flex-wrap items-center gap-3 w-full md:w-auto`}>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00FFE5] transition-colors"
            >
              <option value="all">All Categories</option>
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00FFE5] transition-colors"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>

            <select
              value={selectedDisplay}
              onChange={(e) => {
                setSelectedDisplay(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00FFE5] transition-colors"
            >
              <option value="all">All Badges</option>
              <option value="none">No Badge</option>
              <option value="hot">HOT</option>
              <option value="new">NEW</option>
              <option value="featured">Featured</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            )}

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-1 ml-auto">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded transition-all ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded transition-all ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Form - Collapsible */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-black/20 rounded-2xl border border-white/5 p-4 sm:p-6 space-y-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold">
              {editingId ? "Edit Item" : "Add New Item"}
            </h4>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Item title"
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 focus:outline-none focus:border-[#00FFE5]"
              value={formState.title}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, title: event.target.value }))
              }
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Category</label>
            <select
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3"
              value={formState.category}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, category: event.target.value }))
              }
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Description</label>
            <textarea
              placeholder="Description (optional)"
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 min-h-[120px]"
              value={formState.description}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Price (optional)</label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3"
              value={formState.price}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, price: event.target.value }))
              }
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Image File</label>
            <input
              type="file"
              accept="image/*"
              className="w-full rounded-xl bg-black/20 border border-dashed border-white/20 px-4 py-3"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              External Image URL (optional)
            </label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3"
              value={formState.imageUrl}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, imageUrl: event.target.value }))
              }
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Display Badge</label>
            <select
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3"
              value={formState.displayOption ?? ""}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  displayOption: event.target.value ? (event.target.value as DisplayOption) : null,
                }))
              }
            >
              {displayOptions.map((option) => (
                <option key={option.value ?? "none"} value={option.value ?? ""}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Status</label>
            <select
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3"
              value={formState.status}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  status: event.target.value as ItemStatus,
                }))
              }
            >
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] font-semibold py-3"
            disabled={uploading}
          >
            {uploading
              ? "Saving..."
              : editingId
              ? "Update Item"
              : "Add Item"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
              className="w-full rounded-xl border border-white/20 py-3 hover:bg-white/10 transition-colors"
            >
              Cancel Edit
            </button>
          )}
        </div>
          </div>
        </form>
      )}

      {/* Items Grid/List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Loading items...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-black/20 rounded-2xl border border-white/10">
          <p className="text-gray-400 mb-2">
            {hasActiveFilters ? "No items match your filters" : "No items yet"}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-[#00FFE5] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : viewMode === "grid" ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {paginatedItems.map((item) => (
              <article
                key={item.id}
                className="rounded-xl sm:rounded-2xl border border-white/10 bg-black/30 overflow-hidden flex flex-col hover:border-white/20 transition-colors"
              >
                <div className="aspect-[4/3] bg-black/40 relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {item.displayOption && (
                    <div className="absolute top-2 right-2 z-10">
                      <span className="text-xs uppercase tracking-[0.2em] px-2 py-1 rounded-full bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] font-semibold shadow-lg">
                        {item.displayOption === "hot" ? "🔥 HOT" : item.displayOption === "new" ? "✨ NEW" : "⭐ FEATURED"}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 flex-1 flex flex-col">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-1">
                      {item.category}
                    </p>
                    <h3 className="text-base sm:text-lg font-semibold line-clamp-2">{item.title}</h3>
                  </div>
                  {item.description && (
                    <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  <div className="mt-auto space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      {item.price !== undefined && (
                        <span className="text-gray-300 font-medium">
                          ${item.price.toFixed(2)}
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        item.status === "archived" ? "bg-gray-500/20 text-gray-400" : "bg-[#00FFE5]/20 text-[#00FFE5]"
                      }`}>
                        {item.status === "archived" ? "Archived" : "Live"}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400">
                      ❤️ {item.votes ?? 0} hearts
                    </p>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => {
                          handleEdit(item);
                          setShowForm(true);
                        }}
                        className="flex-1 rounded-lg border border-white/20 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-white/10 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="flex-1 rounded-lg border border-red-400/40 text-red-300 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-red-400/10 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-sm text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="space-y-3">
            {paginatedItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 rounded-lg border border-white/10 bg-black/20 hover:bg-black/30 transition-colors"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-1">
                        {item.category}
                      </p>
                      <h3 className="text-base font-semibold truncate">{item.title}</h3>
                      {item.description && (
                        <p className="text-sm text-gray-400 line-clamp-2 mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {item.displayOption && (
                        <span className="text-xs uppercase tracking-[0.2em] px-2 py-1 rounded bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] font-semibold">
                          {item.displayOption === "hot" ? "🔥 HOT" : item.displayOption === "new" ? "✨ NEW" : "⭐ FEATURED"}
                        </span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded ${
                        item.status === "archived" ? "bg-gray-500/20 text-gray-400" : "bg-[#00FFE5]/20 text-[#00FFE5]"
                      }`}>
                        {item.status === "archived" ? "Archived" : "Live"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      {item.price !== undefined && (
                        <span>${item.price.toFixed(2)}</span>
                      )}
                      <span>Hearts: {item.votes ?? 0}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          handleEdit(item);
                          setShowForm(true);
                        }}
                        className="px-3 py-1.5 rounded-lg border border-white/20 text-sm hover:bg-white/10 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="px-3 py-1.5 rounded-lg border border-red-400/40 text-red-300 text-sm hover:bg-red-400/10 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-sm text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

