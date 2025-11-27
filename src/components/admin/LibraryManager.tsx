import { useState } from "react";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";

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

  const resetForm = () => {
    setFormState(initialForm);
    setEditingId(null);
    setFile(null);
  };

  const uploadImageIfNeeded = async (): Promise<string> => {
    // Image is required - either file upload or external URL
    if (!file && !formState.imageUrl.trim()) {
      throw new Error("Please select an image file or provide an external image URL.");
    }
    
    if (!file) {
      return formState.imageUrl.trim();
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
      const payload = {
        title: formState.title.trim(),
        category: formState.category,
        description: formState.description?.trim() || undefined,
        price: formState.price && formState.price.trim() ? Number(formState.price) : undefined,
        imageUrl,
        votes: editingId ? formState.votes : 0,
        status: formState.status,
        displayOption: formState.displayOption || undefined,
      };

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

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/20 rounded-2xl border border-white/5 p-6"
      >
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
              External Image URL <span className="text-red-400">*</span>
            </label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg (required if no file)"
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
              onClick={resetForm}
              className="w-full rounded-xl border border-white/20 py-3"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && <p className="text-gray-400">Loading items...</p>}
        {!loading && items.length === 0 && (
          <p className="text-gray-400">No items yet. Add your first piece.</p>
        )}
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-white/10 bg-black/30 overflow-hidden flex flex-col"
          >
            <div className="aspect-[4/3] bg-black/40">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 space-y-3 flex-1 flex flex-col">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-gray-500">
                  {item.category}
                </p>
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </div>
              {item.description && (
                <p className="text-sm text-gray-400 line-clamp-3">
                  {item.description}
                </p>
              )}
              <div className="mt-auto space-y-3">
                {item.price !== undefined && (
                  <p className="text-sm text-gray-400">
                    ${item.price.toFixed(2)}
                  </p>
                )}
                <p className="text-sm text-gray-400">
                  Votes: {item.votes ?? 0}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {item.displayOption && (
                    <span className="text-xs uppercase tracking-[0.2em] px-2 py-1 rounded bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] font-semibold">
                      {item.displayOption === "hot" ? "🔥 HOT" : item.displayOption === "new" ? "✨ NEW" : "⭐ FEATURED"}
                    </span>
                  )}
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                    {item.status === "archived" ? "Archived" : "Live"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 rounded-lg border border-white/20 py-2 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="flex-1 rounded-lg border border-red-400/40 text-red-300 py-2 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

