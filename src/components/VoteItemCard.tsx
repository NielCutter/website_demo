import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { getUserIP } from "../utils/getUserIP";
import type { LibraryItem } from "./admin/LibraryManager";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Heart } from "lucide-react";
import { ImageCarousel } from "./ImageCarousel";

interface VoteItemCardProps {
  item: LibraryItem;
}

// Helper function to remove Shopee links from text
const removeShopeeLinks = (text: string, shopeeLink?: string): string => {
  if (!text) return text;
  
  let cleaned = text;
  
  // Remove exact shopeeLink if it exists (with proper escaping)
  if (shopeeLink && shopeeLink.trim()) {
    const escaped = shopeeLink.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    cleaned = cleaned.replace(new RegExp(escaped, 'gi'), '');
  }
  
  // Remove shopee.ph URLs in various formats
  // Match: https://shopee.ph/... or http://shopee.ph/...
  cleaned = cleaned.replace(/https?:\/\/shopee\.ph[^\s\)\]\}]*/gi, '');
  // Match: shopee.ph/... (without protocol)
  cleaned = cleaned.replace(/shopee\.ph[^\s\)\]\}]*/gi, '');
  // Match: any URL containing "shopee"
  cleaned = cleaned.replace(/https?:\/\/[^\s\)\]\}]*shopee[^\s\)\]\}]*/gi, '');
  // Match: www.shopee.ph or shopee.ph with www
  cleaned = cleaned.replace(/www\.shopee\.ph[^\s\)\]\}]*/gi, '');
  // Match: URLs with encoded characters
  cleaned = cleaned.replace(/https?:\/\/[^\s\)\]\}]*%2Fshopee[^\s\)\]\}]*/gi, '');
  
  // Clean up: remove multiple spaces, trim
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  // Remove trailing punctuation that might be left behind
  cleaned = cleaned.replace(/^[,\s\-\.]+|[,\s\-\.]+$/g, '').trim();
  
  return cleaned;
};

export function VoteItemCard({ item }: VoteItemCardProps) {
  const [detailOpen, setDetailOpen] = useState(false);
  const [localVotes, setLocalVotes] = useState(item.votes ?? 0);
  const [hasVoted, setHasVoted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLocalVotes(item.votes ?? 0);
  }, [item.votes]);

  useEffect(() => {
    const checkVote = async () => {
      try {
        const ip = await getUserIP();
        const voteId = `${item.id}_${ip}`;
        const voteSnap = await getDoc(doc(db, "itemVotes", voteId));
        setHasVoted(voteSnap.exists());
      } catch (error) {
        console.error("Error checking vote:", error);
      }
    };
    checkVote();
  }, [item.id]);

  const handleVote = async () => {
    if (submitting || item.status === "archived") return;

    setSubmitting(true);
    try {
      const ip = await getUserIP();
      const itemRef = doc(db, "items", item.id);
      const voteId = `${item.id}_${ip}`;
      const voteRef = doc(db, "itemVotes", voteId);

      if (hasVoted) {
        // Unvote: Remove vote and decrement count
        await runTransaction(db, async (transaction) => {
          const itemSnap = await transaction.get(itemRef);
          if (!itemSnap.exists()) throw new Error("Item not found");

          const voteSnap = await transaction.get(voteRef);
          if (!voteSnap.exists()) {
            throw new Error("Vote not found.");
          }

          const currentVotes = itemSnap.data().votes ?? 0;
          const newVotes = Math.max(0, currentVotes - 1);
          transaction.update(itemRef, {
            votes: newVotes,
            updatedAt: serverTimestamp(),
          });

          transaction.delete(voteRef);
        });

        setLocalVotes((prev) => Math.max(0, prev - 1));
        setHasVoted(false);
      } else {
        // Vote: Add vote and increment count
        await runTransaction(db, async (transaction) => {
          const itemSnap = await transaction.get(itemRef);
          if (!itemSnap.exists()) throw new Error("Item not found");

          const voteSnap = await transaction.get(voteRef);
          if (voteSnap.exists()) {
            throw new Error("You already voted for this item.");
          }

          const currentVotes = itemSnap.data().votes ?? 0;
          transaction.update(itemRef, {
            votes: currentVotes + 1,
            updatedAt: serverTimestamp(),
          });

          transaction.set(voteRef, {
            itemId: item.id,
            ipAddress: ip,
            votedAt: serverTimestamp(),
          });
        });

        setLocalVotes((prev) => prev + 1);
        setHasVoted(true);
      }
    } catch (voteError) {
      alert((voteError as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const isHot = item.displayOption === "hot";
  
  // Get images array - support both new imageUrls array and legacy imageUrl
  const images = item.imageUrls || (item.imageUrl ? [item.imageUrl] : []);

  return (
    <>
      <article 
        className={`group rounded-2xl sm:rounded-3xl overflow-hidden relative transition-all duration-300 h-full w-full max-w-full ${
          isHot 
            ? "border-2 border-[#FF00B3]/60 animate-hot-glow shadow-lg shadow-[#FF00B3]/20"
            : "border border-white/10 hover:border-white/30 hover:shadow-[0_0_30px_rgba(0,255,229,0.15)]"
        }`}
        style={isHot ? {
          animation: 'hot-glow 2s ease-in-out infinite'
        } : {}}
      >
        {/* Display Badge */}
        {item.displayOption && (
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] font-bold shadow-lg backdrop-blur-sm">
              {item.displayOption === "hot" ? "🔥 HOT" : item.displayOption === "new" ? "✨ NEW" : "⭐ FEATURED"}
            </span>
          </div>
        )}

        {/* Large Image Container */}
        <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] overflow-hidden bg-black/20">
          <ImageCarousel images={images} alt={item.title} />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Content Overlay - Bottom */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6 z-10">
            {/* Title and Category */}
            <div className="mb-3 sm:mb-4">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/70 mb-1.5 sm:mb-2 font-medium">
                {item.category}
              </p>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-lg">
                {item.title}
              </h3>
            </div>

            {/* Heart Count and View Details - Overlay on Image */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Heart Count */}
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-black/70 backdrop-blur-md border border-white/30 shadow-lg">
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${hasVoted ? "fill-[#FF00B3] text-[#FF00B3]" : "text-white/90"}`} />
                <span className="text-sm sm:text-base font-bold text-white">
                  {localVotes}
                </span>
              </div>

              {/* View Details Button */}
              <button
                onClick={() => setDetailOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/95 backdrop-blur-md text-black font-semibold text-sm sm:text-base hover:bg-white hover:scale-[1.02] transition-all shadow-lg"
              >
                <span>View Details</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Hover Overlay - Heart Button */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleVote}
              disabled={submitting || item.status === "archived"}
              className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full backdrop-blur-md border transition-all shadow-lg ${
                hasVoted
                  ? "bg-white/20 border-white/30 text-white"
                  : "bg-black/70 border-white/30 text-white hover:bg-black/80"
              } ${submitting ? "opacity-50 cursor-wait" : ""} ${item.status === "archived" ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Heart
                className={`w-4 h-4 sm:w-5 sm:h-5 ${hasVoted ? "fill-[#FF00B3] text-[#FF00B3]" : "text-white"}`}
              />
              <span className="text-xs sm:text-sm font-semibold">
                {submitting
                  ? hasVoted
                    ? "Unhearting..."
                    : "Hearts..."
                  : hasVoted
                  ? "Unheart"
                  : "Heart"}
              </span>
            </button>
          </div>

          {/* Shopee Link - Top Right on Hover */}
          {item.shopeeLink && item.shopeeLink.trim() && (
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                href={item.shopeeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#EE4D2D] text-white font-semibold text-xs sm:text-sm hover:bg-[#EE4D2D]/90 hover:scale-105 transition-all shadow-lg backdrop-blur-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <span className="hidden sm:inline">Shopee</span>
                <span className="sm:hidden">Shop</span>
              </a>
            </div>
          )}
        </div>

        {/* Optional Info Bar - Minimal */}
        {(item.price !== undefined || (item.variants && (item.variants.sizes?.length || item.variants.designTheme))) && (
          <div className="p-3 sm:p-4 bg-black/40 backdrop-blur-sm border-t border-white/10">
            <div className="flex items-center justify-between gap-3">
              {item.price !== undefined && (
                <div className="text-sm sm:text-base font-bold text-white">
                  ${item.price.toFixed(2)}
                </div>
              )}
              {item.variants?.designTheme && (
                <span className="text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] font-semibold">
                  {item.variants.designTheme}
                </span>
              )}
            </div>
          </div>
        )}
      </article>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="bg-[#0b0b0f] border-white/10 text-white max-w-7xl max-h-[95vh] overflow-hidden !flex !flex-col p-0">
          <DialogHeader className="p-6 sm:p-8 border-b border-white/10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight">{item.title}</DialogTitle>
                <div className="flex flex-wrap items-center gap-3">
                  <DialogDescription className="text-gray-400 text-base sm:text-lg">
                    {item.category}
                  </DialogDescription>
                  {item.displayOption && (
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] font-semibold text-sm">
                      {item.displayOption === "hot" ? "🔥 HOT" : item.displayOption === "new" ? "✨ NEW" : "⭐ FEATURED"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto">
            {/* Image Section - Top */}
            <div className="p-4 sm:p-6 lg:p-8 bg-black/10 border-b border-white/10">
              <div className="w-full max-w-2xl mx-auto">
                <ImageCarousel images={images} alt={item.title} className="rounded-2xl sm:rounded-3xl shadow-2xl w-full" />
                
                {/* Hearts and Price - Below Image */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                  <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Heart className={`w-5 h-5 sm:w-6 sm:h-6 ${hasVoted ? "fill-[#FF00B3] text-[#FF00B3]" : "text-gray-400"}`} />
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Hearts</p>
                        <p className="text-xl sm:text-2xl font-bold text-white">{localVotes}</p>
                      </div>
                    </div>
                  </div>
                  {item.price !== undefined && (
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Price</p>
                        <p className="text-xl sm:text-2xl font-bold text-white">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Details Section - Below Image */}
            <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-2xl mx-auto w-full">
                {/* Description */}
                {item.description && (() => {
                  const cleanDescription = removeShopeeLinks(item.description, item.shopeeLink);
                  
                  return cleanDescription ? (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Description</h4>
                      <div className="max-h-48 overflow-y-auto pr-2">
                        <p className="text-base text-gray-300 leading-relaxed">{cleanDescription}</p>
                      </div>
                    </div>
                  ) : null;
                })()}
                
                {/* Variants */}
                {item.variants && (
                  <div className="space-y-6">
                    <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Product Details</h4>
                    <div className="space-y-4">
                      {/* Sizes */}
                      {item.variants.sizes && item.variants.sizes.length > 0 && (
                        <div>
                          <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Sizes Available</p>
                          <div className="flex flex-wrap gap-2">
                            {item.variants.sizes.map((size, idx) => (
                              <span
                                key={size}
                                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                  idx === 0
                                    ? "bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] font-semibold"
                                    : "bg-white/10 text-gray-300 border border-white/20"
                                }`}
                              >
                                {size} {idx === 0 && "(Primary)"}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Other Variants Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {item.variants.color && (
                          <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Color</p>
                            <p className="text-sm font-semibold text-white">{item.variants.color}</p>
                          </div>
                        )}
                        {item.variants.shirtType && (
                          <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Type</p>
                            <p className="text-sm font-semibold text-white">{item.variants.shirtType}</p>
                          </div>
                        )}
                        {item.variants.neckType && (
                          <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Neck</p>
                            <p className="text-sm font-semibold text-white">{item.variants.neckType}</p>
                          </div>
                        )}
                        {item.variants.fit && (
                          <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Fit</p>
                            <p className="text-sm font-semibold text-white">{item.variants.fit}</p>
                          </div>
                        )}
                        {item.variants.material && (
                          <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Material</p>
                            <p className="text-sm font-semibold text-white">{item.variants.material}</p>
                          </div>
                        )}
                        {item.variants.printType && (
                          <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Print Type</p>
                            <p className="text-sm font-semibold text-white">{item.variants.printType}</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Design Theme */}
                      {item.variants.designTheme && (
                        <div className="p-5 rounded-xl bg-gradient-to-r from-[#00FFE5]/10 to-[#FF00B3]/10 border border-[#00FFE5]/20">
                          <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Collection</p>
                          <span className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] font-semibold text-sm">
                            {item.variants.designTheme}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
            </div>
            
            {/* Action Buttons - Fixed at bottom, always 3 buttons */}
            <div className="sticky bottom-0 p-4 sm:p-6 bg-[#0b0b0f] border-t border-white/10 backdrop-blur-sm">
              <div className="grid grid-cols-3 gap-3 max-w-5xl mx-auto">
                {/* Heart Button */}
                <button
                  onClick={handleVote}
                  disabled={submitting || item.status === "archived"}
                  className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    hasVoted
                      ? "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                      : "bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] hover:opacity-90 hover:scale-[1.02]"
                  } ${submitting ? "opacity-50 cursor-wait" : ""} ${item.status === "archived" ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <Heart
                    className={`w-5 h-5 ${hasVoted ? "fill-current" : ""}`}
                  />
                  <span className="hidden sm:inline">
                    {submitting
                      ? hasVoted
                        ? "Unhearting..."
                        : "Hearts..."
                      : hasVoted
                      ? "Unheart"
                      : "Heart"}
                  </span>
                  <span className="sm:hidden">
                    {submitting ? "..." : hasVoted ? "❤️" : "🤍"}
                  </span>
                </button>
                
                {/* Shopee Button - Always reserve space */}
                {item.shopeeLink && item.shopeeLink.trim() ? (
                  <a
                    href={item.shopeeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold bg-[#EE4D2D] text-white hover:bg-[#EE4D2D]/90 hover:scale-[1.02] transition-all shadow-lg shadow-[#EE4D2D]/20"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <span className="hidden sm:inline">Shopee</span>
                    <span className="sm:hidden">Shop</span>
                  </a>
                ) : (
                  <div className="flex items-center justify-center rounded-xl px-4 py-3 bg-black/20 border border-white/5 opacity-50">
                    <span className="text-xs text-gray-500 hidden sm:inline">No Shopee Link</span>
                    <span className="text-xs text-gray-500 sm:hidden">-</span>
                  </div>
                )}
                
                {/* Details/Close Button */}
                <button
                  onClick={() => setDetailOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                >
                  <span className="hidden sm:inline">Close</span>
                  <span className="sm:hidden">✕</span>
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

