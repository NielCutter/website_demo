import { useMemo, useState } from "react";
import { VoteItemCard } from "../components/VoteItemCard";
import { useFirestoreCollection } from "../hooks/useFirestoreCollection";
import type { LibraryItem } from "../components/admin/LibraryManager";
import { Search, Grid3x3, List, Filter, X } from "lucide-react";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 24;

type SortOption = "featured" | "votes-desc" | "votes-asc" | "newest" | "price-desc" | "price-asc";

export function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_PAGE);
  const [showFilters, setShowFilters] = useState(false);

  const { data: allItems, loading, error } = useFirestoreCollection<LibraryItem>("items");

  // Filter active items
  const items = allItems.filter((item) => {
    return !item.status || item.status === "active";
  });

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(items.map((item) => item.category));
    return Array.from(cats).sort();
  }, [items]);

  // Filter and search items
  const filteredItems = useMemo(() => {
    let filtered = items;

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) => selectedCategories.includes(item.category));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(query);
        const descMatch = item.description?.toLowerCase().includes(query);
        const categoryMatch = item.category.toLowerCase().includes(query);
        return titleMatch || descMatch || categoryMatch;
      });
    }

    return filtered;
  }, [items, selectedCategories, searchQuery]);

  // Sort items
  const sortedItems = useMemo(() => {
    const sorted = [...filteredItems];

    switch (sortBy) {
      case "featured":
        return sorted.sort((a, b) => {
          if (a.displayOption && !b.displayOption) return -1;
          if (!a.displayOption && b.displayOption) return 1;
          return (b.votes ?? 0) - (a.votes ?? 0);
        });
      case "votes-desc":
        return sorted.sort((a, b) => (b.votes ?? 0) - (a.votes ?? 0));
      case "votes-asc":
        return sorted.sort((a, b) => (a.votes ?? 0) - (b.votes ?? 0));
      case "price-desc":
        return sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      case "price-asc":
        return sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      case "newest":
        return sorted; // Already sorted by creation date from Firestore
      default:
        return sorted;
    }
  }, [filteredItems, sortBy]);

  // Paginated items
  const paginatedItems = useMemo(() => {
    return sortedItems.slice(0, displayedItems);
  }, [sortedItems, displayedItems]);

  const hasMore = displayedItems < sortedItems.length;

  const handleLoadMore = () => {
    setDisplayedItems((prev) => Math.min(prev + ITEMS_PER_PAGE, sortedItems.length));
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
    setDisplayedItems(ITEMS_PER_PAGE);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery("");
    setDisplayedItems(ITEMS_PER_PAGE);
  };

  return (
    <div className="min-h-screen bg-[#1D1D2C]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1D1D2C]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link to="/" className="text-lg sm:text-xl font-bold touch-manipulation">
              <span className="bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
                New Culture Trends
              </span>
              <span className="text-white ml-1">®</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors touch-manipulation">
                Home
              </Link>
              <Link to="/products" className="text-white font-medium touch-manipulation">
                Products
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Title */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
              All Products
            </span>
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Discover our complete collection of premium streetwear designs
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setDisplayedItems(ITEMS_PER_PAGE);
              }}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFE5] transition-colors"
            />
          </div>

          {/* Mobile Filter Toggle */}
          <div className="flex items-center justify-between md:hidden gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white min-h-[44px] touch-manipulation"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
              {selectedCategories.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] text-xs font-semibold">
                  {selectedCategories.length}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-lg transition-all min-w-[44px] min-h-[44px] touch-manipulation ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506]"
                    : "bg-white/5 border border-white/10 text-gray-400"
                }`}
                aria-label="Grid view"
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-lg transition-all min-w-[44px] min-h-[44px] touch-manipulation ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506]"
                    : "bg-white/5 border border-white/10 text-gray-400"
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop Toolbar */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as SortOption);
                  setDisplayedItems(ITEMS_PER_PAGE);
                }}
                className="px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#00FFE5] transition-colors"
              >
                <option value="featured">Featured First</option>
                <option value="votes-desc">Most Votes</option>
                <option value="votes-asc">Least Votes</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="newest">Newest First</option>
              </select>
              <span className="text-gray-400 text-sm">
                {sortedItems.length} {sortedItems.length === 1 ? "product" : "products"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506]"
                    : "bg-white/5 border border-white/10 text-gray-400"
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506]"
                    : "bg-white/5 border border-white/10 text-gray-400"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6 p-6 rounded-2xl bg-black/30 border border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                {(selectedCategories.length > 0 || searchQuery) && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="w-4 h-4 rounded border-white/20 bg-black/40 text-[#00FFE5] focus:ring-[#00FFE5] focus:ring-offset-0"
                      />
                      <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                        {category}
                      </span>
                      <span className="ml-auto text-xs text-gray-500">
                        ({items.filter((item) => item.category === category).length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-3">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as SortOption);
                    setDisplayedItems(ITEMS_PER_PAGE);
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00FFE5] transition-colors"
                >
                  <option value="featured">Featured First</option>
                  <option value="votes-desc">Most Votes</option>
                  <option value="votes-asc">Least Votes</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Mobile Filters Overlay */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setShowFilters(false)}
              />
              <div className="absolute right-0 top-0 h-full w-full sm:w-80 bg-[#1D1D2C] border-l border-white/10 overflow-y-auto">
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base sm:text-lg font-semibold">Filters</h2>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] touch-manipulation"
                      aria-label="Close filters"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {(selectedCategories.length > 0 || searchQuery) && (
                    <button
                      onClick={clearFilters}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-colors min-h-[44px] touch-manipulation"
                    >
                      Clear all filters
                    </button>
                  )}

                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-3">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label
                          key={category}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                            className="w-4 h-4 rounded border-white/20 bg-black/40 text-[#00FFE5] focus:ring-[#00FFE5] focus:ring-offset-0"
                          />
                          <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                            {category}
                          </span>
                          <span className="ml-auto text-xs text-gray-500">
                            ({items.filter((item) => item.category === category).length})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="text-center py-20">
                <p className="text-gray-400">Loading products...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-400">Error loading products</p>
              </div>
            ) : sortedItems.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg mb-2">No products found</p>
                <p className="text-gray-500 text-sm">
                  {searchQuery || selectedCategories.length > 0
                    ? "Try adjusting your filters"
                    : "Check back soon for new drops"}
                </p>
                {(searchQuery || selectedCategories.length > 0) && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-6 py-2 rounded-full border border-[#00FFE5] text-[#00FFE5] hover:bg-[#00FFE5] hover:text-[#1D1D2C] transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {paginatedItems.map((item) => (
                      <VoteItemCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {paginatedItems.map((item) => (
                      <VoteItemCard key={item.id} item={item} />
                    ))}
                  </div>
                )}

                {/* Load More */}
                {hasMore && (
                  <div className="text-center mt-8 sm:mt-12">
                    <button
                      onClick={handleLoadMore}
                      className="px-6 sm:px-8 py-3 rounded-full border-2 border-[#00FFE5] text-[#00FFE5] font-semibold hover:bg-[#00FFE5] hover:text-[#1D1D2C] transition-all duration-300 text-sm sm:text-base min-h-[44px] touch-manipulation"
                    >
                      Load More ({sortedItems.length - displayedItems} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

