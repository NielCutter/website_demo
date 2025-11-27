import { useMemo } from "react";
import { VoteItemCard } from "./VoteItemCard";
import { useFirestoreCollection } from "../hooks/useFirestoreCollection";
import type { LibraryItem } from "./admin/LibraryManager";

export function FeaturedProducts() {
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

  const handleViewAll = () => {
    const section = document.getElementById("all-products");
    if (section) {
      const offset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

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
            onClick={handleViewAll}
            className="group relative px-10 py-4 rounded-full border-2 border-[#00FFE5] text-[#00FFE5] font-semibold overflow-hidden transition-all duration-300 hover:text-[#1D1D2C] cursor-pointer"
          >
            <span className="relative z-10">View All Products</span>
            <div className="absolute inset-0 bg-[#00FFE5] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>
        </div>
      </div>
    </section>
  );
}
