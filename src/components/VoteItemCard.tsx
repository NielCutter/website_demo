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
        className={`rounded-3xl border bg-black/30 overflow-hidden flex flex-col relative transition-all duration-300 ${
          isHot 
            ? "border-[#FF00B3]/60 animate-hot-glow hover:border-[#FF00B3]"
            : "border-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(0,255,229,0.2)]"
        }`}
        style={isHot ? {
          animation: 'hot-glow 2s ease-in-out infinite'
        } : {}}
      >
        {item.displayOption && (
          <div className="absolute top-3 right-3 z-10">
            <span className="text-xs uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] font-bold shadow-lg">
              {item.displayOption === "hot" ? "🔥 HOT" : item.displayOption === "new" ? "✨ NEW" : "⭐ FEATURED"}
            </span>
          </div>
        )}
        <ImageCarousel images={images} alt={item.title} />
        <div className="p-5 space-y-4 flex-1 flex flex-col">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gray-500">
              {item.category}
            </p>
            <h3 className="text-2xl font-semibold">{item.title}</h3>
          </div>
          {item.description && (
            <p className="text-sm text-gray-400 line-clamp-3">
              {item.description}
            </p>
          )}
          
          {/* Variants Display */}
          {item.variants && (
            <div className="flex flex-wrap gap-2 text-xs">
              {item.variants.sizes && item.variants.sizes.length > 0 && (
                <span className="px-2 py-1 rounded bg-white/10 text-gray-300">
                  {item.variants.sizes.length === 1 
                    ? item.variants.sizes[0]
                    : `${item.variants.sizes[0]} +${item.variants.sizes.length - 1}`}
                </span>
              )}
              {item.variants.color && (
                <span className="px-2 py-1 rounded bg-white/10 text-gray-300">
                  {item.variants.color}
                </span>
              )}
              {item.variants.fit && (
                <span className="px-2 py-1 rounded bg-white/10 text-gray-300">
                  {item.variants.fit}
                </span>
              )}
              {item.variants.designTheme && (
                <span className="px-2 py-1 rounded bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] font-semibold">
                  {item.variants.designTheme}
                </span>
              )}
            </div>
          )}
          
          {item.price !== undefined && (
            <p className="text-sm text-gray-400">
              ${item.price.toFixed(2)}
            </p>
          )}
          <div className="mt-auto space-y-3">
            <p className="text-sm text-gray-400">
              Hearts: <span className="text-white font-semibold">{localVotes}</span>
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleVote}
                disabled={submitting || item.status === "archived"}
                className={`flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  hasVoted
                    ? "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                    : "bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] hover:opacity-90"
                } ${submitting ? "opacity-50 cursor-wait" : ""} ${item.status === "archived" ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Heart
                  className={`w-4 h-4 ${hasVoted ? "fill-current" : ""}`}
                />
                {submitting
                  ? hasVoted
                    ? "Unhearting..."
                    : "Hearts..."
                  : hasVoted
                  ? "Unheart"
                  : "Heart"}
              </button>
              <button
                onClick={() => setDetailOpen(true)}
                className="flex-1 rounded-full border border-white/20 text-sm hover:bg-white/10 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </article>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="bg-[#0b0b0f] border-white/10 text-white max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{item.title}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Category: {item.category}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <ImageCarousel images={images} alt={item.title} className="rounded-2xl" />
            {item.description && (
              <p className="text-gray-300 leading-relaxed">{item.description}</p>
            )}
            
            {/* Variants in Detail View */}
            {item.variants && (
              <div className="space-y-2">
                <h5 className="text-sm font-semibold text-gray-300">Variants</h5>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {item.variants.sizes && item.variants.sizes.length > 0 && (
                    <div className="col-span-2">
                      <span className="text-gray-400">Sizes Available:</span>{" "}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.variants.sizes.map((size, idx) => (
                          <span
                            key={size}
                            className={`px-2 py-1 rounded text-xs ${
                              idx === 0
                                ? "bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] font-semibold"
                                : "bg-white/10 text-gray-300"
                            }`}
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {item.variants.color && (
                    <div>
                      <span className="text-gray-400">Color:</span> <span className="text-white">{item.variants.color}</span>
                    </div>
                  )}
                  {item.variants.shirtType && (
                    <div>
                      <span className="text-gray-400">Type:</span> <span className="text-white">{item.variants.shirtType}</span>
                    </div>
                  )}
                  {item.variants.neckType && (
                    <div>
                      <span className="text-gray-400">Neck:</span> <span className="text-white">{item.variants.neckType}</span>
                    </div>
                  )}
                  {item.variants.fit && (
                    <div>
                      <span className="text-gray-400">Fit:</span> <span className="text-white">{item.variants.fit}</span>
                    </div>
                  )}
                  {item.variants.material && (
                    <div>
                      <span className="text-gray-400">Material:</span> <span className="text-white">{item.variants.material}</span>
                    </div>
                  )}
                  {item.variants.designTheme && (
                    <div className="col-span-2">
                      <span className="text-gray-400">Collection:</span>{" "}
                      <span className="px-2 py-1 rounded bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] font-semibold text-xs">
                        {item.variants.designTheme}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between text-sm text-gray-400">
              {item.price !== undefined && (
                <span>Price: ${item.price.toFixed(2)}</span>
              )}
              <span>Hearts: {localVotes}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

