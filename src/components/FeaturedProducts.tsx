import { useMemo, useState } from "react";
import { VoteItemCard } from "./VoteItemCard";
import { useFirestoreCollection } from "../hooks/useFirestoreCollection";
import type { LibraryItem } from "./admin/LibraryManager";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Grid3x3, List } from "lucide-react";

export function FeaturedProducts() {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // First try to get all active items, then filter client-side if needed
  const { data: allItems, loading, error } = useFirestoreCollection<LibraryItem>("items");
  
  // Filter active items client-side (more forgiving if status field is missing)
  const items = allItems.filter((item) => {
    // Include items with status "active" or items without status field (assume active)
    return !item.status || item.status === "active";
  });

  // Debug: Log items and errors
  if (error) {
    console.error("Firestore error:", error);
  }
  console.log("FeaturedProducts - All items:", allItems, "Filtered items:", items, "Loading:", loading, "Error:", error);

  // Organize items by display tags
  const organizedItems = useMemo(() => {
    const hotItems = items.filter((item) => item.displayOption === "hot");
    const newItems = items.filter((item) => item.displayOption === "new");
    const featuredItems = items.filter((item) => item.displayOption === "featured");
    const otherItems = items.filter(
      (item) => !item.displayOption || !["hot", "new", "featured"].includes(item.displayOption)
    );

    return { hotItems, newItems, featuredItems, otherItems };
  }, [items]);

  // Get unique categories for filtering
  const categories = useMemo(() => {
    const cats = new Set(items.map((item) => item.category));
    return Array.from(cats).sort();
  }, [items]);

  // Filter items by category
  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

  // Sort items: featured first, then by votes, then by creation date
  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      // Featured items first
      if (a.displayOption && !b.displayOption) return -1;
      if (!a.displayOption && b.displayOption) return 1;
      // Then by votes (descending)
      if ((b.votes ?? 0) !== (a.votes ?? 0)) {
        return (b.votes ?? 0) - (a.votes ?? 0);
      }
      // Finally by creation (newest first) - if createdAt exists
      return 0;
    });
  }, [filteredItems]);

  const ProductSection = ({
    title,
    items,
    id,
    gradient,
  }: {
    title: string;
    items: LibraryItem[];
    id?: string;
    gradient: string;
  }) => {
    if (items.length === 0) return null;

    return (
      <div id={id} className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl md:text-4xl font-bold">
            <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
              {title}
            </span>
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <VoteItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="featured-products" className="py-20 px-4 relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #00FFE5 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
              Featured
            </span>
            <span className="text-white"> Collection</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover our latest designs that blend premium quality with
            cutting-edge street style
          </p>
        </div>

        {loading && (
          <p className="text-gray-400 text-center">Loading drops...</p>
        )}

        {error && (
          <div className="text-center space-y-2">
            <p className="text-red-400">Error loading items: {error}</p>
            <p className="text-gray-400 text-sm">
              Check browser console for details. Make sure Firestore is enabled and rules allow read access.
            </p>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="text-center space-y-2">
            <p className="text-gray-400">
              No drops yet. Check back soon.
            </p>
            <p className="text-gray-500 text-sm">
              {allItems.length > 0 
                ? `Found ${allItems.length} item(s) but none are active. Check admin panel.`
                : "No items found in database. Add items in the admin panel."}
            </p>
          </div>
        )}

        {!loading && items.length > 0 && (
          <>
            {/* HOT Items */}
            <ProductSection
              title="🔥 HOT"
              items={organizedItems.hotItems}
              gradient="from-[#FF00B3] to-[#FF6B6B]"
            />

            {/* NEW Items */}
            <ProductSection
              title="✨ NEW"
              items={organizedItems.newItems}
              gradient="from-[#00FFE5] to-[#00D4FF]"
            />

            {/* Featured Items */}
            <ProductSection
              title="⭐ Featured"
              items={organizedItems.featuredItems}
              gradient="from-[#00FFE5] to-[#FF00B3]"
            />

            {/* All Other Items */}
            {organizedItems.otherItems.length > 0 && (
              <div id="all-products" className="space-y-6">
                <div className="text-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-white">
                    All Products
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {organizedItems.otherItems.map((item) => (
                    <VoteItemCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <div className="text-center">
          <button
            onClick={() => setShowAllProducts(true)}
            className="group relative px-10 py-4 rounded-full border-2 border-[#00FFE5] text-[#00FFE5] font-semibold overflow-hidden transition-all duration-300 hover:text-[#1D1D2C] cursor-pointer"
          >
            <span className="relative z-10">View All Products</span>
            <div className="absolute inset-0 bg-[#00FFE5] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>
        </div>

        {/* All Products Dialog */}
        <Dialog open={showAllProducts} onOpenChange={setShowAllProducts}>
          <DialogContent className="bg-[#0b0b0f] border-white/10 text-white max-w-7xl w-[calc(100%-1rem)] max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col p-0 m-4 sm:m-8">
            <DialogHeader className="p-4 sm:p-6 border-b border-white/10">
              <DialogTitle className="text-2xl sm:text-3xl font-bold">
                <span className="bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
                  All Products
                </span>
                <span className="text-white ml-2 text-lg sm:text-2xl">
                  ({sortedItems.length} {sortedItems.length === 1 ? "item" : "items"})
                </span>
              </DialogTitle>
            </DialogHeader>

            {/* Filters and View Mode */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 flex flex-col gap-3 sm:gap-4 bg-black/20">
              {/* Category Filter - Scrollable on mobile */}
              <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                <div className="flex gap-2 min-w-max sm:min-w-0 sm:flex-wrap">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                      selectedCategory === "all"
                        ? "bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506]"
                        : "bg-white/5 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506]"
                          : "bg-white/5 border border-white/10 hover:bg-white/10"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center justify-end sm:justify-start gap-2 bg-white/5 border border-white/10 rounded-full p-1 w-fit">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 sm:p-2 rounded-full transition-all ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506]"
                      : "text-gray-400 hover:text-white"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3x3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 sm:p-2 rounded-full transition-all ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506]"
                      : "text-gray-400 hover:text-white"
                  }`}
                  aria-label="List view"
                >
                  <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {loading ? (
                <div className="text-center py-12 sm:py-20">
                  <p className="text-gray-400 text-sm sm:text-base">Loading products...</p>
                </div>
              ) : sortedItems.length === 0 ? (
                <div className="text-center py-12 sm:py-20">
                  <p className="text-gray-400 text-base sm:text-lg">No products found</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-2">
                    {selectedCategory !== "all"
                      ? `Try selecting a different category`
                      : "Check back soon for new drops"}
                  </p>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {sortedItems.map((item) => (
                    <VoteItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {sortedItems.map((item) => (
                    <VoteItemCard key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
