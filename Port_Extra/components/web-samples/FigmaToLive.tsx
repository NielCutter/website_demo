import { Figma, Code, ArrowRight } from 'lucide-react';

export function FigmaToLive() {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Figma Design Side */}
        <div className="bg-zinc-50 p-8 border-r border-zinc-200">
          <div className="flex items-center gap-3 mb-6">
            <Figma size={20} />
            <span className="text-black">Figma Design</span>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-zinc-200">
            {/* Simulated Figma Interface */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-4 border-b border-zinc-200">
                <div className="w-8 h-8 bg-black rounded" />
                <div className="flex-1">
                  <div className="h-3 bg-zinc-200 rounded w-32 mb-2" />
                  <div className="h-2 bg-zinc-100 rounded w-24" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="h-4 bg-zinc-200 rounded w-full" />
                <div className="h-4 bg-zinc-200 rounded w-5/6" />
                <div className="h-4 bg-zinc-200 rounded w-4/6" />
              </div>
              
              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="aspect-square bg-zinc-200 rounded" />
                <div className="aspect-square bg-zinc-200 rounded" />
              </div>
              
              <div className="flex gap-2 pt-4">
                <div className="flex-1 h-10 bg-black rounded" />
                <div className="w-10 h-10 border-2 border-black rounded" />
              </div>
            </div>
          </div>
          
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-zinc-600">
              <span>Layers</span>
              <span>24</span>
            </div>
            <div className="flex items-center justify-between text-zinc-600">
              <span>Components</span>
              <span>8</span>
            </div>
            <div className="flex items-center justify-between text-zinc-600">
              <span>Auto Layout</span>
              <span className="text-green-600">Active</span>
            </div>
          </div>
        </div>

        {/* Live Code Side */}
        <div className="bg-white p-8">
          <div className="flex items-center gap-3 mb-6">
            <Code size={20} />
            <span className="text-black">Live Implementation</span>
          </div>
          
          <div className="bg-zinc-50 rounded-lg p-6 border border-zinc-200">
            {/* Actual Live Component */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-zinc-200">
                <div className="w-10 h-10 bg-black rounded flex items-center justify-center text-white">
                  A
                </div>
                <div className="flex-1">
                  <div className="text-black mb-1">Premium Brand</div>
                  <div className="text-zinc-500">Luxury Design Studio</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-black">
                  We create exceptional digital experiences that blend aesthetics with functionality.
                </p>
                <p className="text-zinc-600">
                  Our team specializes in modern web applications and brand design.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="aspect-square bg-gradient-to-br from-zinc-200 to-zinc-300 rounded flex items-center justify-center text-zinc-600">
                  Project 1
                </div>
                <div className="aspect-square bg-gradient-to-br from-zinc-200 to-zinc-300 rounded flex items-center justify-center text-zinc-600">
                  Project 2
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors">
                  Get Started
                </button>
                <button className="w-12 h-12 border-2 border-black rounded-lg hover:bg-zinc-50 transition-colors flex items-center justify-center">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-zinc-600">
              <span>React Components</span>
              <span>5</span>
            </div>
            <div className="flex items-center justify-between text-zinc-600">
              <span>Tailwind Classes</span>
              <span>47</span>
            </div>
            <div className="flex items-center justify-between text-zinc-600">
              <span>Performance</span>
              <span className="text-green-600">Optimized</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-zinc-50 p-6 border-t border-zinc-200">
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="text-zinc-500 mb-1">Design Time</div>
            <div className="text-black">2 hours</div>
          </div>
          <ArrowRight size={20} className="text-zinc-400" />
          <div className="text-center">
            <div className="text-zinc-500 mb-1">Development Time</div>
            <div className="text-black">4 hours</div>
          </div>
          <ArrowRight size={20} className="text-zinc-400" />
          <div className="text-center">
            <div className="text-zinc-500 mb-1">Pixel Perfect Match</div>
            <div className="text-green-600">99.8%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
