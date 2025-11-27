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
        className={`group rounded-2xl sm:rounded-3xl border bg-black/30 backdrop-blur-sm overflow-hidden flex flex-col relative transition-all duration-300 h-full ${
          isHot 
            ? "border-[#FF00B3]/60 animate-hot-glow hover:border-[#FF00B3] shadow-lg shadow-[#FF00B3]/20"
            : "border-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(0,255,229,0.2)]"
        }`}
        style={isHot ? {
          animation: 'hot-glow 2s ease-in-out infinite'
        } : {}}
      >
        {item.displayOption && (
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] font-bold shadow-lg">
              {item.displayOption === "hot" ? "🔥 HOT" : item.displayOption === "new" ? "✨ NEW" : "⭐ FEATURED"}
            </span>
          </div>
        )}
        <div className="relative overflow-hidden">
          <ImageCarousel images={images} alt={item.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
        <div className="p-4 sm:p-5 space-y-3 sm:space-y-4 flex-1 flex flex-col">
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-gray-500 mb-1 sm:mb-2">
              {item.category}
            </p>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold leading-tight">{item.title}</h3>
          </div>
          {item.description && (
            <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 sm:line-clamp-3 leading-relaxed">
              {item.description}
            </p>
          )}
          
          {/* Variants Display */}
          {item.variants && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {item.variants.sizes && item.variants.sizes.length > 0 && (
                <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded bg-white/10 text-gray-300 font-medium">
                  {item.variants.sizes.length === 1 
                    ? item.variants.sizes[0]
                    : `${item.variants.sizes[0]} +${item.variants.sizes.length - 1}`}
                </span>
              )}
              {item.variants.color && (
                <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded bg-white/10 text-gray-300 font-medium">
                  {item.variants.color}
                </span>
              )}
              {item.variants.fit && (
                <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded bg-white/10 text-gray-300 font-medium">
                  {item.variants.fit}
                </span>
              )}
              {item.variants.designTheme && (
                <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] font-semibold">
                  {item.variants.designTheme}
                </span>
              )}
            </div>
          )}
          
          {item.price !== undefined && (
            <div className="flex items-baseline gap-1">
              <span className="text-xs sm:text-sm text-gray-500">Price:</span>
              <span className="text-base sm:text-lg font-bold text-white">
                ${item.price.toFixed(2)}
              </span>
            </div>
          )}
          <div className="mt-auto space-y-2 sm:space-y-3 pt-2 border-t border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${hasVoted ? "fill-[#FF00B3] text-[#FF00B3]" : "text-gray-400"}`} />
                <span className="text-xs sm:text-sm text-gray-400">
                  <span className="text-white font-semibold">{localVotes}</span> hearts
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleVote}
                disabled={submitting || item.status === "archived"}
                className={`flex items-center justify-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                  hasVoted
                    ? "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                    : "bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] hover:opacity-90 hover:scale-105"
                } ${submitting ? "opacity-50 cursor-wait" : ""} ${item.status === "archived" ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Heart
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${hasVoted ? "fill-current" : ""}`}
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
              {item.shopeeLink && item.shopeeLink.trim() && (
                <a
                  href={item.shopeeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold bg-[#EE4D2D] text-white hover:bg-[#EE4D2D]/90 hover:scale-105 transition-all shadow-lg shadow-[#EE4D2D]/20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  <span className="hidden sm:inline">Shopee</span>
                  <span className="sm:hidden">Shop</span>
                </a>
              )}
              <button
                onClick={() => setDetailOpen(true)}
                className={`${item.shopeeLink ? "flex-1" : "flex-1"} rounded-full border border-white/20 text-xs sm:text-sm py-2 hover:bg-white/10 transition-all hover:border-white/30`}
              >
                {item.shopeeLink ? "Details" : "View Details"}
              </button>
            </div>
          </div>
        </div>
      </article>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="bg-[#0b0b0f] border-white/10 text-white max-w-7xl max-h-[95vh] overflow-hidden flex flex-col p-0">
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
            <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-0">
              {/* Image Section - Larger */}
              <div className="p-6 sm:p-8 bg-black/10 border-r border-white/5">
                <div className="sticky top-0 space-y-6">
                  <div className="w-full">
                    <ImageCarousel images={images} alt={item.title} className="rounded-3xl shadow-2xl" />
                  </div>
                  
                  {/* Hearts and Price - Better Layout */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
                      <div className="flex items-center gap-3">
                        <Heart className={`w-6 h-6 ${hasVoted ? "fill-[#FF00B3] text-[#FF00B3]" : "text-gray-400"}`} />
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Hearts</p>
                          <p className="text-2xl font-bold text-white">{localVotes}</p>
                        </div>
                      </div>
                    </div>
                    {item.price !== undefined && (
                      <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Price</p>
                          <p className="text-2xl font-bold text-white">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Details Section */}
              <div className="p-6 sm:p-8 space-y-8">
                {/* Description */}
                {item.description && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Description</h4>
                    <p className="text-base text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                )}
                
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
            </div>
            
            {/* Action Buttons - Fixed at bottom, less crowded */}
            <div className="sticky bottom-0 p-6 sm:p-8 bg-[#0b0b0f] border-t border-white/10 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
                <button
                  onClick={handleVote}
                  disabled={submitting || item.status === "archived"}
                  className={`flex-1 flex items-center justify-center gap-3 rounded-xl px-8 py-4 text-base font-semibold transition-all ${
                    hasVoted
                      ? "bg-white/10 border-2 border-white/20 text-white hover:bg-white/20"
                      : "bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] hover:opacity-90 hover:scale-[1.02]"
                  } ${submitting ? "opacity-50 cursor-wait" : ""} ${item.status === "archived" ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <Heart
                    className={`w-6 h-6 ${hasVoted ? "fill-current" : ""}`}
                  />
                  <span>
                    {submitting
                      ? hasVoted
                        ? "Unhearting..."
                        : "Hearts..."
                      : hasVoted
                      ? "Unheart"
                      : "Heart"}
                  </span>
                </button>
                {item.shopeeLink && item.shopeeLink.trim() && (
                  <a
                    href={item.shopeeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-3 rounded-xl px-8 py-4 text-base font-semibold bg-[#EE4D2D] text-white hover:bg-[#EE4D2D]/90 hover:scale-[1.02] transition-all shadow-lg shadow-[#EE4D2D]/20"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <span>Shop on Shopee</span>
                  </a>
                )}
                {item.status === "archived" && (
                  <div className="flex-1 px-8 py-4 rounded-xl bg-gray-500/20 border-2 border-gray-500/40 text-gray-400 text-center text-base">
                    This item is archived
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

