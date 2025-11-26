import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { getVoteCount, saveVoteCount, hasUserVoted, markAsVoted, subscribeToVoteUpdates } from "../utils/voteStorage";

interface ProductDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    id: number;
    name: string;
    price: string;
    image: string;
  };
}

export function ProductDetailDialog({ open, onOpenChange, product }: ProductDetailDialogProps) {
  const [voteCount, setVoteCount] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    if (open) {
      // Load vote count when dialog opens
      setVoteCount(getVoteCount(product.id));
      setHasVoted(hasUserVoted(product.id));
      
      // Subscribe to updates
      const unsubscribe = subscribeToVoteUpdates((productId, count) => {
        if (productId === product.id) {
          setVoteCount(count);
          setHasVoted(hasUserVoted(product.id));
        }
      });
      
      return unsubscribe;
    }
  }, [open, product.id]);

  const handleVote = () => {
    if (hasVoted) return;
    
    const newCount = voteCount + 1;
    setVoteCount(newCount);
    saveVoteCount(product.id, newCount);
    markAsVoted(product.id);
    setHasVoted(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-[#2A2A3E] border-white/10">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-white">{product.name}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Premium quality streetwear design
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 space-y-6">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-xl bg-[#1D1D2C]">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Product Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Price</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
                  {product.price}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 mb-1">Votes</p>
                <p className="text-2xl font-bold text-white">
                  {voteCount} {voteCount === 1 ? 'vote' : 'votes'}
                </p>
              </div>
            </div>
            
            {/* Description */}
            <div className="pt-4 border-t border-white/10">
              <p className="text-gray-300 leading-relaxed">
                Experience premium quality with this exclusive design. Made with the finest materials 
                and attention to detail, this piece represents the perfect blend of street culture 
                and contemporary fashion.
              </p>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm text-gray-400 mb-1">Material</p>
                <p className="text-white font-semibold">Premium Cotton</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm text-gray-400 mb-1">Care</p>
                <p className="text-white font-semibold">Machine Wash</p>
              </div>
            </div>
            
            {/* Vote Button */}
            <button
              onClick={handleVote}
              disabled={hasVoted}
              className={`w-full px-6 py-4 rounded-lg border text-base font-semibold transition-all duration-300 ${
                hasVoted
                  ? 'bg-white/5 border-white/20 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] border-transparent text-[#1D1D2C] hover:shadow-lg hover:shadow-[#00FFE5]/50'
              }`}
            >
              {hasVoted ? '✓ Already Voted' : 'Vote for this Product'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

