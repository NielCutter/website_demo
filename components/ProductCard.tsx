import { motion } from "motion/react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  delay?: number;
}

export function ProductCard({ name, price, image, delay = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#1D1D2C] font-semibold whitespace-nowrap"
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
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
              {price}
            </span>
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20 text-white text-sm transition-all duration-300 hover:border-[#00FFE5]">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
