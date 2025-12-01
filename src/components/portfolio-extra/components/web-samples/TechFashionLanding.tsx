import { Cpu, Zap, Layers } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function TechFashionLanding() {
  return (
    <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000),linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000)] bg-[length:20px_20px] bg-[position:0_0,10px_10px] opacity-5" />
        
        <div className="relative z-10 h-full flex items-center px-12">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              TECH × FASHION
            </div>
            <h2 className="text-white mb-6">
              Where Innovation<br />Meets Design
            </h2>
            <p className="text-zinc-300 mb-8">
              Pioneering the intersection of cutting-edge technology and contemporary fashion.
              Experience apparel designed for the digital age.
            </p>
            <div className="flex items-center gap-4">
              <button className="px-8 py-4 bg-white text-black rounded-lg hover:bg-zinc-100 transition-colors">
                Explore Collection
              </button>
              <button className="px-8 py-4 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>

        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="w-64 h-64 border-2 border-white/20 rounded-full flex items-center justify-center">
            <div className="w-48 h-48 border-2 border-white/20 rounded-full flex items-center justify-center">
              <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-200">
        <FeatureCard
          icon={<Cpu size={24} />}
          title="Tech-Integrated"
          description="Smart fabrics and embedded technology for the modern lifestyle"
        />
        <FeatureCard
          icon={<Zap size={24} />}
          title="Performance First"
          description="Engineered for comfort, durability, and style in any environment"
        />
        <FeatureCard
          icon={<Layers size={24} />}
          title="Modular Design"
          description="Adaptable pieces that transform with your daily needs"
        />
      </div>

      {/* Product Showcase */}
      <div className="p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-zinc-500 mb-2">Featured Product</div>
            <h3 className="text-black mb-4">
              Neural Weave<br />Tech Jacket
            </h3>
            <p className="text-zinc-600 mb-6">
              Our flagship piece combines aerospace-grade materials with minimalist design.
              Features integrated heating elements, wireless charging pockets, and water-resistant nano-coating.
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-black rounded-full" />
                <span className="text-zinc-700">Temperature regulation technology</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-black rounded-full" />
                <span className="text-zinc-700">Hidden magnetic closures</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-black rounded-full" />
                <span className="text-zinc-700">Sustainable production process</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-black">$489</span>
              <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
          
          <div className="relative aspect-square bg-zinc-100 rounded-lg overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1691689761290-2641cf0fc59a?w=800"
              alt="Tech Jacket"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-zinc-900 text-white p-12 text-center">
        <h4 className="text-white mb-4">Join the Future of Fashion</h4>
        <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
          Be the first to know about new releases, exclusive collaborations, and tech innovations.
        </p>
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40"
          />
          <button className="px-6 py-3 bg-white text-black rounded-lg hover:bg-zinc-100 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-8 text-center">
      <div className="inline-flex p-3 bg-black text-white rounded-lg mb-4">
        {icon}
      </div>
      <h5 className="text-black mb-2">{title}</h5>
      <p className="text-zinc-600">{description}</p>
    </div>
  );
}
