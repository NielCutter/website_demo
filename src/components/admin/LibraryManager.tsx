import { useState, useMemo } from "react";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { Search, Filter, X, Grid3x3, List, ChevronDown, Plus, GripVertical } from "lucide-react";
import { ImageCarousel } from "../ImageCarousel";

type ItemStatus = "active" | "archived";
type DisplayOption = "hot" | "new" | "featured" | null;

export interface ProductVariant {
  sizes?: string[]; // Array of available sizes
  color?: string;
  shirtType?: string;
  neckType?: string;
  fit?: string;
  material?: string;
  printType?: string;
  designTheme?: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  category: string;
  description?: string;
  price?: number;
  imageUrl?: string; // Deprecated: use imageUrls array instead (kept for backward compatibility)
  imageUrls?: string[]; // Array of base64 data URIs or external URLs
  votes: number;
  status?: ItemStatus;
  displayOption?: DisplayOption;
  variants?: ProductVariant; // Product variants
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

// Variant options
const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const colors = ["Black", "White", "Off-White / Cream", "Gray", "Navy", "Brown", "Sand / Beige", "Olive", "Maroon"];
const shirtTypes = ["Regular Tee", "Oversized Tee", "Heavyweight Tee", "Long Sleeve Tee", "Hoodie", "Sweatshirt", "Tank Top", "Headwear (Cap / Beanie)", "Jacket", "Pants / Shorts"];
const neckTypes = ["Crew Neck", "Round Neck", "V-Neck", "High Neck"];
const fits = ["Oversized", "Regular Fit", "Boxy Fit", "Slim Fit"];
const materials = ["Cotton", "Heavy Cotton", "Poly-Cotton Blend", "Fleece"];
const printTypes = ["DTF", "Silkscreen", "Embroidery", "Vinyl"];
const defaultDesignThemes = ["Street Culture", "Abstract", "Minimalist", "Graphic", "Monkirabu", "Limited Edition"];

const initialForm = {
  title: "",
  category: categories[0] ?? "Headwear",
  description: "",
  price: "",
  imageUrl: "",
  imageUrls: [] as string[],
  votes: 0,
  status: "active" as ItemStatus,
  displayOption: null as DisplayOption,
  variants: {
    sizes: [] as string[],
    color: "",
    shirtType: "",
    neckType: "",
    fit: "",
    material: "",
    printType: "",
    designTheme: "",
  } as ProductVariant,
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
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedDisplay, setSelectedDisplay] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [designThemes, setDesignThemes] = useState<string[]>(defaultDesignThemes);
  const [newDesignTheme, setNewDesignTheme] = useState("");
  const [draggedSizeIndex, setDraggedSizeIndex] = useState<number | null>(null);
  const [dragOverSizeIndex, setDragOverSizeIndex] = useState<number | null>(null);
  
  // Reorder sizes
  const reorderSizes = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    const currentSizes = formState.variants.sizes || [];
    const newSizes = [...currentSizes];
    const [moved] = newSizes.splice(fromIndex, 1);
    newSizes.splice(toIndex, 0, moved);
    setFormState((prev) => ({
      ...prev,
      variants: { ...prev.variants, sizes: newSizes },
    }));
  };

  const resetForm = () => {
    setFormState(initialForm);
    setEditingId(null);
    setFiles([]);
  };

  // Create combined image list for reordering (URLs first, then files)
  const allImages = useMemo(() => {
    const imageList: Array<{ type: 'url' | 'file'; url?: string; file?: File; index: number }> = [];
    
    // Add URLs with their original index
    formState.imageUrls.forEach((url, index) => {
      imageList.push({ type: 'url', url, index });
    });
    
    // Add files with their original index
    files.forEach((file, index) => {
      imageList.push({ type: 'file', file, index });
    });
    
    return imageList;
  }, [formState.imageUrls, files]);

  // Reorder images
  const reorderImages = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    
    const imageList = [...allImages];
    const [moved] = imageList.splice(fromIndex, 1);
    imageList.splice(toIndex, 0, moved);
    
    // Separate back into URLs and files while preserving order
    const newUrls: string[] = [];
    const newFiles: File[] = [];
    
    imageList.forEach((item) => {
      if (item.type === 'url' && item.url) {
        newUrls.push(item.url);
      } else if (item.type === 'file' && item.file) {
        newFiles.push(item.file);
      }
    });
    
    setFormState((prev) => ({ ...prev, imageUrls: newUrls }));
    setFiles(newFiles);
  };

  // Convert multiple files to base64
  const uploadImagesIfNeeded = async (): Promise<string[]> => {
    const imageUrls: string[] = [];
    
    // Process in the order they appear in allImages (preserving drag order)
    for (const item of allImages) {
      if (item.type === 'url' && item.url) {
        // Add URL directly
        imageUrls.push(item.url);
      } else if (item.type === 'file' && item.file) {
        // Check file size (max 2MB before compression)
        if (item.file.size > 2 * 1024 * 1024) {
          throw new Error(`Image "${item.file.name}" is too large. Please use images smaller than 2MB.`);
        }

        // Convert to base64
        const base64 = await fileToBase64(item.file);
        
        // Check if base64 is too large (Firestore limit is 1MB per document)
        // Base64 is ~33% larger than binary, so ~750KB base64 = ~1MB binary
        if (base64.length > 750 * 1024) {
          throw new Error(`Image "${item.file.name}" is too large after compression. Please use a smaller image.`);
        }
        
        imageUrls.push(base64);
      }
    }
    
    return imageUrls;
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
      const imageUrls = await uploadImagesIfNeeded();
      const payload: Record<string, unknown> = {
        title: formState.title.trim(),
        category: formState.category,
        votes: editingId ? formState.votes : 0,
        status: formState.status,
      };
      
      // Include imageUrls array if there are any images
      if (imageUrls.length > 0) {
        payload.imageUrls = imageUrls;
      }
      
      // Only include optional fields if they have values
      if (formState.description?.trim()) {
        payload.description = formState.description.trim();
      }
      if (formState.price && formState.price.trim()) {
        payload.price = Number(formState.price);
      }
      if (formState.displayOption) {
        payload.displayOption = formState.displayOption;
      }
      
      // Include variants if any are set (all fields are optional)
      // Completely skip variants if there's any issue to prevent errors
      try {
        if (formState.variants && typeof formState.variants === 'object') {
          const cleanedVariants: ProductVariant = {};
          
          // Safely iterate over variant entries
          const variantEntries = Object.entries(formState.variants || {});
          
          for (const [key, value] of variantEntries) {
            // Skip null, undefined, or empty values
            if (value === null || value === undefined) continue;
            
            if (key === 'sizes') {
              // Handle sizes array - must be an array
              if (Array.isArray(value) && value.length > 0) {
                cleanedVariants.sizes = value;
              }
            } else {
              // Handle string values - must be a string before trimming
              if (typeof value === 'string' && value.length > 0) {
                const trimmed = String(value).trim();
                if (trimmed.length > 0) {
                  cleanedVariants[key as keyof ProductVariant] = trimmed;
                }
              }
            }
          }
          
          // Only include variants if there's at least one non-empty field
          if (Object.keys(cleanedVariants).length > 0) {
            payload.variants = cleanedVariants;
          }
        }
      } catch (variantError) {
        console.error("Error processing variants:", variantError);
        // Silently skip variants if there's any error - don't break the save
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
    // Convert single imageUrl to array for backward compatibility
    const existingImages = item.imageUrls || (item.imageUrl ? [item.imageUrl] : []);
    setFormState({
      title: item.title,
      category: item.category,
      description: item.description ?? "",
      price: item.price?.toString() ?? "",
      imageUrl: "", // Clear URL input for new additions
      imageUrls: existingImages,
      votes: item.votes ?? 0,
      status: item.status ?? "active",
      displayOption: item.displayOption ?? null,
      variants: (() => {
        try {
          // Handle backward compatibility: convert old 'size' to 'sizes' array
          const existingVariants = item.variants || {};
          
          // Safely check if variants is an object
          if (existingVariants && typeof existingVariants === 'object') {
            // Convert old single size to array if needed
            if ('size' in existingVariants && !('sizes' in existingVariants)) {
              const oldSize = existingVariants.size;
              return {
                ...existingVariants,
                sizes: (typeof oldSize === 'string' && oldSize) ? [oldSize] : [],
              };
            }
            
            // Ensure sizes is an array
            const safeVariants = { ...existingVariants };
            if (safeVariants.sizes && !Array.isArray(safeVariants.sizes)) {
              safeVariants.sizes = [];
            }
            
            return safeVariants;
          }
        } catch (e) {
          console.error("Error processing existing variants:", e);
        }
        
        // Return default empty variants
        return {
          sizes: [],
          color: "",
          shirtType: "",
          neckType: "",
          fit: "",
          material: "",
          printType: "",
          designTheme: "",
        };
      })(),
    });
    setFiles([]);
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
            <label className="block text-sm text-gray-400 mb-2">
              Upload Images <span className="text-gray-500 text-xs">(hold Ctrl/Cmd to select multiple)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="w-full rounded-xl bg-black/20 border border-dashed border-white/20 px-4 py-3 cursor-pointer"
              onChange={(event) => {
                const selectedFiles = Array.from(event.target.files || []);
                if (selectedFiles.length > 0) {
                  setFiles((prev) => [...prev, ...selectedFiles]);
                }
                // Reset input to allow selecting the same files again
                event.target.value = '';
              }}
            />
            {files.length > 0 && (
              <div className="mt-2 text-xs text-gray-400">
                {files.length} file{files.length > 1 ? "s" : ""} selected. You can add more by selecting again.
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Add External Image URL <span className="text-gray-500 text-xs">(optional)</span>
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                className="flex-1 rounded-xl bg-black/40 border border-white/10 px-4 py-3"
                value={formState.imageUrl}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, imageUrl: event.target.value }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" && formState.imageUrl.trim()) {
                    e.preventDefault();
                    setFormState((prev) => ({
                      ...prev,
                      imageUrls: [...prev.imageUrls, prev.imageUrl.trim()],
                      imageUrl: "",
                    }));
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  if (formState.imageUrl.trim()) {
                    setFormState((prev) => ({
                      ...prev,
                      imageUrls: [...prev.imageUrls, prev.imageUrl.trim()],
                      imageUrl: "",
                    }));
                  }
                }}
                className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
          
          {/* Display existing images with drag and drop */}
          {allImages.length > 0 && (
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Images Preview <span className="text-gray-500 text-xs">(drag to reorder - first image will be the main image)</span>
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {allImages.map((item, index) => (
                  <div
                    key={item.type === 'url' ? `url-${index}` : `file-${index}`}
                    draggable
                    onDragStart={(e) => {
                      setDraggedIndex(index);
                      e.dataTransfer.effectAllowed = 'move';
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'move';
                      setDragOverIndex(index);
                    }}
                    onDragLeave={() => {
                      setDragOverIndex(null);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (draggedIndex !== null && draggedIndex !== index) {
                        reorderImages(draggedIndex, index);
                      }
                      setDraggedIndex(null);
                      setDragOverIndex(null);
                    }}
                    onDragEnd={() => {
                      setDraggedIndex(null);
                      setDragOverIndex(null);
                    }}
                    className={`flex items-center gap-2 p-2 rounded-lg border transition-all cursor-move ${
                      draggedIndex === index
                        ? 'opacity-50 bg-white/10 border-[#00FFE5]'
                        : dragOverIndex === index
                        ? 'bg-white/10 border-[#00FFE5] scale-105'
                        : 'bg-black/20 border-white/10 hover:bg-black/30'
                    }`}
                  >
                    <GripVertical className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    {index === 0 && (
                      <span className="text-xs px-2 py-0.5 rounded bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] font-semibold">
                        Main
                      </span>
                    )}
                    {item.type === 'url' ? (
                      <>
                        <img src={item.url} alt={`Preview ${index + 1}`} className="w-16 h-16 object-cover rounded flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-400 truncate">{item.url?.substring(0, 50)}...</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded bg-white/5 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-gray-400">File</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-400 truncate">{item.file?.name}</p>
                          <p className="text-xs text-gray-500">{item.file ? (item.file.size / 1024).toFixed(1) : 0} KB</p>
                        </div>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        // Remove from the combined list and update both arrays
                        const newImages = allImages.filter((_, i) => i !== index);
                        const newUrls: string[] = [];
                        const newFiles: File[] = [];
                        
                        newImages.forEach((img) => {
                          if (img.type === 'url' && img.url) {
                            newUrls.push(img.url);
                          } else if (img.type === 'file' && img.file) {
                            newFiles.push(img.file);
                          }
                        });
                        
                        setFormState((prev) => ({ ...prev, imageUrls: newUrls }));
                        setFiles(newFiles);
                      }}
                      className="p-1 rounded hover:bg-red-500/20 text-red-400 transition-colors flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Product Variants Section */}
          <div className="border-t border-white/10 pt-4 mt-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-4">Product Variants</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Sizes Available - Volume Rocker Style Slider */}
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-2">
                  Sizes Available (optional)
                  {(formState.variants.sizes || []).length > 0 && (
                    <span className="ml-2 text-xs text-gray-500">
                      (Drag to reorder - first is primary)
                    </span>
                  )}
                </label>
                <div className="space-y-3">
                  {/* Volume Rocker Style Size Selector */}
                  <div className="relative">
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-black/40 border border-white/10">
                      {/* Size toggles arranged horizontally */}
                      <div className="flex-1 flex items-center justify-between gap-1">
                        {sizes.map((size) => {
                          const isSelected = (formState.variants.sizes || []).includes(size);
                          const selectedIndex = (formState.variants.sizes || []).indexOf(size);
                          const isPrimary = selectedIndex === 0;
                          
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => {
                                const currentSizes = formState.variants.sizes || [];
                                if (isSelected) {
                                  // Remove if clicking selected
                                  setFormState((prev) => ({
                                    ...prev,
                                    variants: {
                                      ...prev.variants,
                                      sizes: currentSizes.filter((s) => s !== size),
                                    },
                                  }));
                                } else {
                                  // Add to end
                                  setFormState((prev) => ({
                                    ...prev,
                                    variants: {
                                      ...prev.variants,
                                      sizes: [...currentSizes, size],
                                    },
                                  }));
                                }
                              }}
                              onMouseDown={(e) => {
                                // Enable drag selection
                                if (e.button === 0) {
                                  const currentSizes = formState.variants.sizes || [];
                                  const startSize = size;
                                  const startIndex = sizes.indexOf(startSize);
                                  
                                  const handleMouseMove = (moveEvent: MouseEvent) => {
                                    const target = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY);
                                    if (target && target.closest('[data-size]')) {
                                      const endSize = (target.closest('[data-size]') as HTMLElement)?.dataset.size;
                                      if (endSize) {
                                        const endIndex = sizes.indexOf(endSize);
                                        const minIndex = Math.min(startIndex, endIndex);
                                        const maxIndex = Math.max(startIndex, endIndex);
                                        const rangeSizes = sizes.slice(minIndex, maxIndex + 1);
                                        
                                        setFormState((prev) => ({
                                          ...prev,
                                          variants: {
                                            ...prev.variants,
                                            sizes: Array.from(new Set([...currentSizes, ...rangeSizes])),
                                          },
                                        }));
                                      }
                                    }
                                  };
                                  
                                  const handleMouseUp = () => {
                                    document.removeEventListener('mousemove', handleMouseMove);
                                    document.removeEventListener('mouseup', handleMouseUp);
                                  };
                                  
                                  document.addEventListener('mousemove', handleMouseMove);
                                  document.addEventListener('mouseup', handleMouseUp);
                                }
                              }}
                              data-size={size}
                              className={`relative flex-1 min-w-[40px] h-12 rounded-lg border-2 transition-all duration-200 ${
                                isSelected
                                  ? isPrimary
                                    ? 'bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] border-[#00FFE5] text-[#050506] font-bold shadow-lg'
                                    : 'bg-white/20 border-white/40 text-white font-semibold'
                                  : 'bg-black/20 border-white/10 text-gray-400 hover:border-white/30 hover:bg-black/30'
                              }`}
                            >
                              <span className="text-xs font-medium">{size}</span>
                              {isPrimary && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#050506] border-2 border-[#00FFE5]"></span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Click to toggle • Drag across to select range • First selected is primary
                    </p>
                  </div>
                  
                  {/* Selected sizes list (for reordering) */}
                  {(formState.variants.sizes || []).length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400 font-medium">Selected Sizes (drag to reorder):</p>
                      <div className="flex flex-wrap gap-2">
                        {(formState.variants.sizes || []).map((size, index) => (
                          <div
                            key={`${size}-${index}`}
                            draggable
                            onDragStart={(e) => {
                              setDraggedSizeIndex(index);
                              e.dataTransfer.effectAllowed = 'move';
                            }}
                            onDragOver={(e) => {
                              e.preventDefault();
                              e.dataTransfer.dropEffect = 'move';
                              setDragOverSizeIndex(index);
                            }}
                            onDragLeave={() => {
                              setDragOverSizeIndex(null);
                            }}
                            onDrop={(e) => {
                              e.preventDefault();
                              if (draggedSizeIndex !== null && draggedSizeIndex !== index) {
                                reorderSizes(draggedSizeIndex, index);
                              }
                              setDraggedSizeIndex(null);
                              setDragOverSizeIndex(null);
                            }}
                            onDragEnd={() => {
                              setDraggedSizeIndex(null);
                              setDragOverSizeIndex(null);
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-move ${
                              draggedSizeIndex === index
                                ? 'opacity-50 bg-white/10 border-[#00FFE5]'
                                : dragOverSizeIndex === index
                                ? 'bg-white/10 border-[#00FFE5] scale-105'
                                : index === 0
                                ? 'bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] border-[#00FFE5] text-[#050506]'
                                : 'bg-white/10 border-white/20 text-white'
                            }`}
                          >
                            <GripVertical className="w-3 h-3 flex-shrink-0" />
                            <span className="text-sm font-medium">{size}</span>
                            {index === 0 && (
                              <span className="text-xs font-semibold">(Primary)</span>
                            )}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const currentSizes = formState.variants.sizes || [];
                                setFormState((prev) => ({
                                  ...prev,
                                  variants: {
                                    ...prev.variants,
                                    sizes: currentSizes.filter((_, i) => i !== index),
                                  },
                                }));
                              }}
                              className="ml-1 p-0.5 rounded hover:bg-red-500/20 text-red-400 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Color (optional)</label>
                <select
                  className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white"
                  value={formState.variants.color || ""}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      variants: { ...prev.variants, color: e.target.value },
                    }))
                  }
                >
                  <option value="">Select color</option>
                  {colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              {/* Shirt Type */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Shirt Type (optional)</label>
                <select
                  className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white"
                  value={formState.variants.shirtType || ""}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      variants: { ...prev.variants, shirtType: e.target.value },
                    }))
                  }
                >
                  <option value="">Select type</option>
                  {shirtTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Neck Type */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Neck Type (optional)</label>
                <select
                  className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white"
                  value={formState.variants.neckType || ""}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      variants: { ...prev.variants, neckType: e.target.value },
                    }))
                  }
                >
                  <option value="">Select neck type</option>
                  {neckTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fit */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Fit (optional)</label>
                <select
                  className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white"
                  value={formState.variants.fit || ""}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      variants: { ...prev.variants, fit: e.target.value },
                    }))
                  }
                >
                  <option value="">Select fit</option>
                  {fits.map((fit) => (
                    <option key={fit} value={fit}>
                      {fit}
                    </option>
                  ))}
                </select>
              </div>

              {/* Material */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Material (optional)</label>
                <select
                  className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white"
                  value={formState.variants.material || ""}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      variants: { ...prev.variants, material: e.target.value },
                    }))
                  }
                >
                  <option value="">Select material</option>
                  {materials.map((material) => (
                    <option key={material} value={material}>
                      {material}
                    </option>
                  ))}
                </select>
              </div>

              {/* Print Type (Admin only) */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Print Type (admin only)</label>
                <select
                  className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white"
                  value={formState.variants.printType || ""}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      variants: { ...prev.variants, printType: e.target.value },
                    }))
                  }
                >
                  <option value="">Select print type</option>
                  {printTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Design Theme (Collections) */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Design Theme / Collection (optional)</label>
                <div className="space-y-2">
                  <select
                    className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white"
                    value={formState.variants.designTheme || ""}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        variants: { ...prev.variants, designTheme: e.target.value },
                      }))
                    }
                  >
                    <option value="">Select theme</option>
                    {designThemes.map((theme) => (
                      <option key={theme} value={theme}>
                        {theme}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add new theme..."
                      value={newDesignTheme}
                      onChange={(e) => setNewDesignTheme(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newDesignTheme.trim()) {
                          e.preventDefault();
                          if (!designThemes.includes(newDesignTheme.trim())) {
                            setDesignThemes([...designThemes, newDesignTheme.trim()]);
                          }
                          setNewDesignTheme("");
                        }
                      }}
                      className="flex-1 rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newDesignTheme.trim() && !designThemes.includes(newDesignTheme.trim())) {
                          setDesignThemes([...designThemes, newDesignTheme.trim()]);
                          setNewDesignTheme("");
                        }
                      }}
                      className="px-3 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-colors text-sm"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
                <div className="relative">
                  {(() => {
                    const images = item.imageUrls || (item.imageUrl ? [item.imageUrl] : []);
                    return <ImageCarousel images={images} alt={item.title} />;
                  })()}
                  {item.displayOption && (
                    <div className="absolute top-2 right-2 z-20">
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
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-black/40">
                  {(() => {
                    const images = item.imageUrls || (item.imageUrl ? [item.imageUrl] : []);
                    return images.length > 0 ? (
                      <img
                        src={images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-gray-500 text-[10px] text-center p-2">
                          No image
                        </div>
                      </div>
                    );
                  })()}
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

