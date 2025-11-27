import { VoteItemCard } from "./VoteItemCard";
import { useFirestoreCollection } from "../hooks/useFirestoreCollection";
import type { LibraryItem } from "./admin/LibraryManager";

export function FeaturedProducts() {
  const { data: items, loading } = useFirestoreCollection<LibraryItem>("items", {
    whereClause: ["status", "==", "active"],
    orderByField: "createdAt",
    orderDirection: "desc",
  });

  const handleViewAll = () => {
    const section = document.getElementById("featured-products");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="featured-products" className="py-20 px-4 relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #00FFE5 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading && (
            <p className="text-gray-400 col-span-full">Loading drops...</p>
          )}
          {!loading && items.length === 0 && (
            <p className="text-gray-400 col-span-full">
              No drops yet. Check back soon.
            </p>
          )}
          {items.map((item) => (
            <VoteItemCard key={item.id} item={item} />
          ))}
        </div>

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
