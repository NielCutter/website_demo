import { motion } from "motion/react";
import { Mail } from "lucide-react";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await addDoc(collection(db, "newsletter"), {
        email: email.trim(),
        createdAt: serverTimestamp(),
      });
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Newsletter signup failed:", error);
      setStatus("error");
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Animated background shape */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(135deg, #1D1D2C 0%, #00FFE5 50%, #FF00B3 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradient-shift 20s ease infinite'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#1D1D2C]/70 backdrop-blur-sm" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#00FFE5] to-[#FF00B3] mb-8">
            <Mail className="w-10 h-10 text-[#1D1D2C]" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Join the </span>
            <span className="bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
              Movement
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Be the first to know about new drops, exclusive designs, and special offers. 
            Join our community of trendsetters.
          </p>

          {/* Form */}
          <form onSubmit={handleSubscribe} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full bg-[#2A2A3E] border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFE5] transition-colors duration-300"
                required
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="group relative px-8 py-4 rounded-full overflow-hidden font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #00FFE5, #FF00B3)',
                  boxShadow: '0 0 20px rgba(0, 255, 229, 0.3)'
                }}
              >
                <span className="relative z-10 text-[#1D1D2C]">
                  {status === "success"
                    ? "Subscribed! ✓"
                    : status === "loading"
                    ? "Joining..."
                    : "Subscribe"}
                </span>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #FF00B3, #00FFE5)',
                  }}
                />
              </button>
            </div>
          </form>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00FFE5]" />
              <span>No spam, ever</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#FF00B3]" />
              <span>Unsubscribe anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00FFE5]" />
              <span>Exclusive perks</span>
            </div>
          </div>
          {status === "error" && (
            <p className="mt-4 text-sm text-red-400">
              Something went wrong. Please try again later.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
