import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function Hero() {
  const [count, setCount] = useState(0);
  const targetCount = 150;

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = targetCount / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= targetCount) {
        setCount(targetCount);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background with glow */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: 'linear-gradient(135deg, #1D1D2C 0%, #2A2A3E 20%, #FF00B3 40%, #00FFE5 60%, #2A2A3E 80%, #1D1D2C 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradient-shift 15s ease infinite',
          boxShadow: 'inset 0 0 100px rgba(0, 255, 229, 0.1), inset 0 0 200px rgba(255, 0, 179, 0.1)'
        }}
      />
      
      {/* Glowing orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full opacity-20 sm:opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #00FFE5 0%, transparent 70%)',
          animation: 'pulse 4s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full opacity-20 sm:opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #FF00B3 0%, transparent 70%)',
          animation: 'pulse 4s ease-in-out infinite 2s'
        }}
      />
      
      {/* Overlay for depth */}
      <div className="absolute inset-0 bg-[#1D1D2C]/40" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 sm:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight mb-4 sm:mb-6 px-2">
            <span 
              className="bg-gradient-to-r from-[#00FFE5] via-[#FF00B3] to-[#00FFE5] bg-clip-text text-transparent"
              style={{ backgroundSize: '200% auto' }}
            >
              New Culture Trends
            </span>
            <span className="text-white ml-1 sm:ml-2 md:ml-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">®</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 leading-relaxed"
        >
          Where premium design meets street culture. Express yourself with our exclusive collection.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 sm:mb-12"
        >
          <button 
            onClick={() => {
              const productsSection = document.getElementById('featured-products');
              if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="group relative px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 rounded-full overflow-hidden transition-all duration-300 cursor-pointer min-h-[44px] touch-manipulation"
            style={{
              background: 'linear-gradient(135deg, #00FFE5, #FF00B3)',
              boxShadow: '0 0 20px rgba(0, 255, 229, 0.3)'
            }}
          >
            <span className="relative z-10 text-[#1D1D2C] font-bold text-base sm:text-lg">
              Browse
            </span>
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, #FF00B3, #00FFE5)',
              }}
            />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="inline-flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
              {count}+
            </span>
            <span className="text-xs sm:text-sm text-gray-400">Designs Available</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1D1D2C] to-transparent" />
    </section>
  );
}
