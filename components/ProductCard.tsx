import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ProductDetailDialog } from "./ProductDetailDialog";

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  image: string;
  delay?: number;
}

// Improved vote storage with error handling and persistence
const getVoteCount = (productId: number): number => {
  if (typeof window === 'undefined') return 0;
  try {
    const votes = localStorage.getItem('productVotes');
    if (!votes) return 0;
    const votesData = JSON.parse(votes);
    return votesData[productId] || 0;
  } catch (error) {
    console.error('Error reading vote count:', error);
    return 0;
  }
};

const saveVoteCount = (productId: number, count: number): void => {
  if (typeof window === 'undefined') return;
  try {
    const votes = localStorage.getItem('productVotes');
    const votesData = votes ? JSON.parse(votes) : {};
    votesData[productId] = count;
    localStorage.setItem('productVotes', JSON.stringify(votesData));
    
    // Also save a timestamp for data integrity
    const timestamp = Date.now();
    const voteHistory = localStorage.getItem('voteHistory') || '{}';
    const history = JSON.parse(voteHistory);
    if (!history[productId]) history[productId] = [];
    history[productId].push({ count, timestamp });
    localStorage.setItem('voteHistory', JSON.stringify(history));
  } catch (error) {
    console.error('Error saving vote count:', error);
  }
};

export function ProductCard({ id, name, price, image, delay = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [voteCount, setVoteCount] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  useEffect(() => {
    // Load vote count from localStorage
    setVoteCount(getVoteCount(id));
    
    // Check if user has already voted for this product
    try {
      const votedProducts = localStorage.getItem('votedProducts');
      if (votedProducts) {
        const voted = JSON.parse(votedProducts);
        setHasVoted(voted.includes(id));
      }
    } catch (error) {
      console.error('Error checking vote status:', error);
    }
  }, [id]);

  // Listen for vote updates from detail dialog
  useEffect(() => {
    const handleStorageChange = () => {
      setVoteCount(getVoteCount(id));
      try {
        const votedProducts = localStorage.getItem('votedProducts');
        if (votedProducts) {
          const voted = JSON.parse(votedProducts);
          setHasVoted(voted.includes(id));
        }
      } catch (error) {
        console.error('Error checking vote status:', error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Also check on focus (for same-tab updates)
    window.addEventListener('focus', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, [id]);

  const handleVote = () => {
    if (hasVoted) return; // Prevent multiple votes
    
    const newCount = voteCount + 1;
    setVoteCount(newCount);
    saveVoteCount(id, newCount);
    
    // Mark as voted
    try {
      const votedProducts = localStorage.getItem('votedProducts');
      const voted = votedProducts ? JSON.parse(votedProducts) : [];
      if (!voted.includes(id)) {
        voted.push(id);
        localStorage.setItem('votedProducts', JSON.stringify(voted));
      }
      setHasVoted(true);
    } catch (error) {
      console.error('Error saving vote status:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Electric border effect */}
      <div 
        className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, #00FFE5, #FF00B3, #00FFE5)',
          backgroundSize: '200% 200%',
          animation: isHovered ? 'gradient-shift 3s ease infinite' : 'none',
          filter: 'blur(8px)'
        }}
      />
      
      {/* Card content */}
      <div className="relative bg-[#2A2A3E] rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm">
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-[#1D1D2C]">
          <ImageWithFallback
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D2C] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* View button on hover */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowDetailDialog(true)}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#1D1D2C] font-semibold whitespace-nowrap cursor-pointer z-10"
            style={{
              boxShadow: '0 0 20px rgba(0, 255, 229, 0.5)'
            }}
          >
            View Details
          </motion.button>
        </div>
        
        {/* Product info */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
              {price}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">
                {voteCount} {voteCount === 1 ? 'vote' : 'votes'}
              </span>
            </div>
          </div>
          <button
            onClick={handleVote}
            disabled={hasVoted}
            className={`w-full px-4 py-2 rounded-lg border text-sm font-semibold transition-all duration-300 ${
              hasVoted
                ? 'bg-white/5 border-white/20 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] border-transparent text-[#1D1D2C] hover:shadow-lg hover:shadow-[#00FFE5]/50'
            }`}
          >
            {hasVoted ? '✓ Voted' : 'Vote'}
          </button>
        </div>
      </div>
      
      {/* Product Detail Dialog */}
      <ProductDetailDialog
        open={showDetailDialog}
        onOpenChange={setShowDetailDialog}
        product={{ id, name, price, image }}
      />
    </motion.div>
  );
}
