import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
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
    if (submitting || hasVoted) return;

    setSubmitting(true);
    try {
      const ip = await getUserIP();
      const itemRef = doc(db, "items", item.id);
      const voteId = `${item.id}_${ip}`;
      const voteRef = doc(db, "itemVotes", voteId);

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
    } catch (voteError) {
      alert((voteError as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const isHot = item.displayOption === "hot";

  return (
    <>
      <article 
        className={`rounded-3xl overflow-hidden flex flex-col relative ${
          isHot 
            ? "electric-border bg-black/30" 
            : "border border-white/10 bg-black/30"
        }`}
      >
        {item.displayOption && (
          <div className="absolute top-3 right-3 z-10">
            <span className="text-xs uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] font-bold shadow-lg">
              {item.displayOption === "hot" ? "🔥 HOT" : item.displayOption === "new" ? "✨ NEW" : "⭐ FEATURED"}
            </span>
          </div>
        )}
        <div className="aspect-[4/3] bg-black/20">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
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
          {item.price !== undefined && (
            <p className="text-sm text-gray-400">
              ${item.price.toFixed(2)}
            </p>
          )}
          <div className="mt-auto space-y-3">
            <p className="text-sm text-gray-400">
              Votes: <span className="text-white font-semibold">{localVotes}</span>
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleVote}
                disabled={hasVoted || submitting || item.status === "archived"}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  hasVoted
                    ? "bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506]"
                }`}
              >
                {hasVoted ? "Voted" : submitting ? "Voting..." : "Vote"}
              </button>
              <button
                onClick={() => setDetailOpen(true)}
                className="flex-1 rounded-full border border-white/20 text-sm"
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
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full rounded-2xl object-cover"
            />
            {item.description && (
              <p className="text-gray-300 leading-relaxed">{item.description}</p>
            )}
            <div className="flex items-center justify-between text-sm text-gray-400">
              {item.price !== undefined && (
                <span>Price: ${item.price.toFixed(2)}</span>
              )}
              <span>Votes: {localVotes}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

