import { motion } from "motion/react";
import { Sparkles, Zap, TrendingUp } from "lucide-react";

export function About() {
  const features = [
    {
      icon: Sparkles,
      title: "Premium Quality",
      description: "Crafted with the finest materials for ultimate comfort and durability"
    },
    {
      icon: Zap,
      title: "Bold Designs",
      description: "Cutting-edge graphics that make a statement and turn heads"
    },
    {
      icon: TrendingUp,
      title: "Culture Forward",
      description: "Setting trends, not following them. Be part of the new wave"
    }
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div 
        className="absolute top-1/2 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #FF00B3 0%, transparent 70%)'
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #00FFE5 0%, transparent 70%)'
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">The </span>
            <span className="bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
              New Culture
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            We're not just a clothing brand—we're a movement. New Culture Trends® represents 
            the intersection of premium fashion, street culture, and digital innovation. 
            Every piece tells a story of bold expression and fearless creativity.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative p-8 rounded-2xl bg-[#2A2A3E]/50 backdrop-blur-sm border border-white/10 hover:border-[#00FFE5]/50 transition-all duration-300"
              >
                <div className="mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00FFE5] to-[#FF00B3] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-[#1D1D2C]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-2xl bg-gradient-to-r from-[#2A2A3E]/80 to-[#1D1D2C]/80 backdrop-blur-sm border border-white/10"
        >
          {[
            { value: "10K+", label: "Happy Customers" },
            { value: "250+", label: "Unique Designs" },
            { value: "50+", label: "Countries" },
            { value: "100%", label: "Satisfaction" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
