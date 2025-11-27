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
              <button
                onClick={() => setDetailOpen(true)}
                className="flex-1 rounded-full border border-white/20 text-xs sm:text-sm py-2 hover:bg-white/10 transition-all hover:border-white/30"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </article>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="bg-[#0b0b0f] border-white/10 text-white max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
          <DialogHeader className="p-4 sm:p-6 border-b border-white/10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">{item.title}</DialogTitle>
                <DialogDescription className="text-gray-400 text-sm sm:text-base">
                  {item.category}
                  {item.displayOption && (
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] font-semibold text-xs">
                      {item.displayOption === "hot" ? "🔥 HOT" : item.displayOption === "new" ? "✨ NEW" : "⭐ FEATURED"}
                    </span>
                  )}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Image Section */}
              <div className="space-y-4">
                <ImageCarousel images={images} alt={item.title} className="rounded-2xl" />
                
                {/* Hearts and Price */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-black/30 border border-white/10">
                  <div className="flex items-center gap-2">
                    <Heart className={`w-5 h-5 ${hasVoted ? "fill-[#FF00B3] text-[#FF00B3]" : "text-gray-400"}`} />
                    <div>
                      <p className="text-xs text-gray-400">Hearts</p>
                      <p className="text-lg font-bold text-white">{localVotes}</p>
                    </div>
                  </div>
                  {item.price !== undefined && (
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Price</p>
                      <p className="text-xl font-bold text-white">${item.price.toFixed(2)}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Details Section */}
              <div className="space-y-6">
                {/* Description */}
                {item.description && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">Description</h4>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                )}
                
                {/* Variants */}
                {item.variants && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Product Details</h4>
                    <div className="space-y-3">
                      {/* Sizes */}
                      {item.variants.sizes && item.variants.sizes.length > 0 && (
                        <div>
                          <p className="text-xs text-gray-400 mb-2">Sizes Available</p>
                          <div className="flex flex-wrap gap-2">
                            {item.variants.sizes.map((size, idx) => (
                              <span
                                key={size}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
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
                          <div className="p-3 rounded-lg bg-black/30 border border-white/10">
                            <p className="text-xs text-gray-400 mb-1">Color</p>
                            <p className="text-sm font-medium text-white">{item.variants.color}</p>
                          </div>
                        )}
                        {item.variants.shirtType && (
                          <div className="p-3 rounded-lg bg-black/30 border border-white/10">
                            <p className="text-xs text-gray-400 mb-1">Type</p>
                            <p className="text-sm font-medium text-white">{item.variants.shirtType}</p>
                          </div>
                        )}
                        {item.variants.neckType && (
                          <div className="p-3 rounded-lg bg-black/30 border border-white/10">
                            <p className="text-xs text-gray-400 mb-1">Neck</p>
                            <p className="text-sm font-medium text-white">{item.variants.neckType}</p>
                          </div>
                        )}
                        {item.variants.fit && (
                          <div className="p-3 rounded-lg bg-black/30 border border-white/10">
                            <p className="text-xs text-gray-400 mb-1">Fit</p>
                            <p className="text-sm font-medium text-white">{item.variants.fit}</p>
                          </div>
                        )}
                        {item.variants.material && (
                          <div className="p-3 rounded-lg bg-black/30 border border-white/10">
                            <p className="text-xs text-gray-400 mb-1">Material</p>
                            <p className="text-sm font-medium text-white">{item.variants.material}</p>
                          </div>
                        )}
                        {item.variants.printType && (
                          <div className="p-3 rounded-lg bg-black/30 border border-white/10">
                            <p className="text-xs text-gray-400 mb-1">Print Type</p>
                            <p className="text-sm font-medium text-white">{item.variants.printType}</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Design Theme */}
                      {item.variants.designTheme && (
                        <div className="p-4 rounded-lg bg-gradient-to-r from-[#00FFE5]/10 to-[#FF00B3]/10 border border-[#00FFE5]/20">
                          <p className="text-xs text-gray-400 mb-2">Collection</p>
                          <span className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] font-semibold text-sm">
                            {item.variants.designTheme}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={handleVote}
                    disabled={submitting || item.status === "archived"}
                    className={`flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-all ${
                      hasVoted
                        ? "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                        : "bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] hover:opacity-90 hover:scale-105"
                    } ${submitting ? "opacity-50 cursor-wait" : ""} ${item.status === "archived" ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <Heart
                      className={`w-5 h-5 ${hasVoted ? "fill-current" : ""}`}
                    />
                    {submitting
                      ? hasVoted
                        ? "Unhearting..."
                        : "Hearts..."
                      : hasVoted
                      ? "Unheart"
                      : "Heart"}
                  </button>
                  {item.shopeeLink && (
                    <a
                      href={item.shopeeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold bg-[#EE4D2D] text-white hover:bg-[#EE4D2D]/90 hover:scale-105 transition-all"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                      Shop on Shopee
                    </a>
                  )}
                  {item.status === "archived" && (
                    <div className="px-4 py-3 rounded-full bg-gray-500/20 border border-gray-500/40 text-gray-400 text-center text-sm">
                      This item is archived
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

