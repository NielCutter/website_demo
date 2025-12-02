import { motion } from "motion/react";
import { Award, Palette, Users } from "lucide-react";

export function About() {
  const features = [
    {
      icon: Award,
      title: "Premium Craftsmanship",
      description: "Made in small batches with attention to detail — quality printing, durable materials, and designs built to last."
    },
    {
      icon: Palette,
      title: "Original Designs",
      description: "Every artwork is created in-house. No templates, no shortcuts — just pure creativity inspired by culture and daily life."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "We listen to our supporters. Every release, poll, and drop is shaped by the people who wear our pieces."
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div 
        className="absolute top-1/2 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full opacity-10 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #FF00B3 0%, transparent 70%)'
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full opacity-10 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #00FFE5 0%, transparent 70%)'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
            <span className="text-white">The </span>
            <span className="bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
              New Culture
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-4">
            We're not just a clothing brand—we're a movement. New Culture Trends® represents 
            the intersection of premium fashion, street culture, and digital innovation. 
            Every piece tells a story of bold expression and fearless creativity.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-[#2A2A3E]/50 backdrop-blur-sm border border-white/10 hover:border-[#00FFE5]/50 transition-all duration-300"
              >
                <div className="mb-3 sm:mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#00FFE5] to-[#FF00B3] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#1D1D2C]" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{feature.description}</p>
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
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#2A2A3E]/80 to-[#1D1D2C]/80 backdrop-blur-sm border border-white/10"
        >
          {[
            { value: "1K+", label: "Supporters and Customers Reached" },
            { value: "100+", label: "Original Designs Created" },
            { value: "Local Brand", label: "Proudly Designed & Printed in the Philippines" },
            { value: "5-Star Feedback", label: "From real customers who love our quality" }
          ].map((stat, index) => (
            <div key={index} className="text-center px-2">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-[10px] sm:text-xs md:text-sm leading-relaxed">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
