import { useState } from "react";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../firebase/config";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";

type ItemStatus = "active" | "archived";

export interface LibraryItem {
  id: string;
  title: string;
  category: string;
  description?: string;
  price?: number;
  imageUrl: string;
  imagePath?: string;
  votes: number;
  status?: ItemStatus;
}

const categories = ["Headwear", "Pants", "Jacket", "Hoodie", "Accessories"];

const initialForm = {
  title: "",
  category: categories[0] ?? "Headwear",
  description: "",
  price: "",
  imageUrl: "",
  imagePath: "",
  votes: 0,
  status: "active" as ItemStatus,
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

  const uploadImageIfNeeded = async () => {
    if (!file) {
      if (!formState.imageUrl) {
        throw new Error("Please select an image or provide an external URL.");
      }
      return {
        url: formState.imageUrl,
        path: formState.imagePath,
      };
    }

    const storagePath = `items/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return {
      url,
      path: storagePath,
    };
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploading(true);

    try {
      const { url, path } = await uploadImageIfNeeded();
      const payload = {
        title: formState.title,
        category: formState.category,
        description: formState.description || undefined,
        price: formState.price ? Number(formState.price) : undefined,
        imageUrl: url,
        imagePath: path,
        votes: editingId ? formState.votes : 0,
        status: formState.status,
      };

      if (editingId) {
        await updateDocument(editingId, payload);
      } else {
        await addDocument(payload as unknown as Omit<LibraryItem, "id">);
      }

      resetForm();
    } catch (error) {
      console.error("Error saving item:", error);
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
      imagePath: item.imagePath ?? "",
      votes: item.votes ?? 0,
      status: item.status ?? "active",
    });
    setFile(null);
  };

  const handleDelete = async (item: LibraryItem) => {
    const confirmation = window.confirm(`Delete ${item.title}?`);
    if (!confirmation) return;

    try {
      if (item.imagePath) {
        await deleteObject(ref(storage, item.imagePath));
      }
      await deleteDocument(item.id);
    } catch (error) {
      console.error("Unable to delete item:", error);
    }
  };

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/20 rounded-2xl border border-white/5 p-6"
      >
        <div className="space-y-4">
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
          <textarea
            placeholder="Description"
            className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 min-h-[120px]"
            value={formState.description}
            onChange={(event) =>
              setFormState((prev) => ({
                ...prev,
                description: event.target.value,
              }))
            }
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price (optional)"
            className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3"
            value={formState.price}
            onChange={(event) =>
              setFormState((prev) => ({ ...prev, price: event.target.value }))
            }
          />
        </div>
        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            className="w-full rounded-xl bg-black/20 border border-dashed border-white/20 px-4 py-3"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          />
          <input
            type="url"
            placeholder="External image URL"
            className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3"
            value={formState.imageUrl}
            onChange={(event) =>
              setFormState((prev) => ({ ...prev, imageUrl: event.target.value }))
            }
          />
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
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                  {item.status === "archived" ? "Archived" : "Live"}
                </p>
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

