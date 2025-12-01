import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { useState } from 'react';

export function ResponsivePreviews() {
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-8">
      {/* Device Selector */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <button
          onClick={() => setActiveDevice('desktop')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
            activeDevice === 'desktop'
              ? 'bg-black text-white'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
          }`}
        >
          <Monitor size={18} />
          <span>Desktop</span>
        </button>
        <button
          onClick={() => setActiveDevice('tablet')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
            activeDevice === 'tablet'
              ? 'bg-black text-white'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
          }`}
        >
          <Tablet size={18} />
          <span>Tablet</span>
        </button>
        <button
          onClick={() => setActiveDevice('mobile')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
            activeDevice === 'mobile'
              ? 'bg-black text-white'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
          }`}
        >
          <Smartphone size={18} />
          <span>Mobile</span>
        </button>
      </div>

      {/* Preview Container */}
      <div className="flex items-center justify-center bg-zinc-50 rounded-lg p-12 min-h-[600px]">
        <div
          className={`bg-white border-2 border-zinc-300 rounded-lg shadow-2xl transition-all duration-500 ${
            activeDevice === 'desktop'
              ? 'w-full max-w-5xl h-[500px]'
              : activeDevice === 'tablet'
              ? 'w-full max-w-2xl h-[600px]'
              : 'w-full max-w-sm h-[650px]'
          }`}
        >
          {/* Browser/Device Chrome */}
          <div className="bg-zinc-100 px-4 py-3 border-b border-zinc-300 rounded-t-lg flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            {activeDevice === 'desktop' && (
              <div className="flex-1 mx-4 px-4 py-1 bg-white rounded text-zinc-500 text-center">
                https://example.com
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="h-[calc(100%-52px)] overflow-auto p-6">
            <ResponsiveContent device={activeDevice} />
          </div>
        </div>
      </div>

      {/* Responsive Specs */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Monitor size={16} className="text-zinc-600" />
            <span className="text-zinc-700">Desktop</span>
          </div>
          <div className="text-zinc-500">1920 × 1080</div>
          <div className="text-zinc-500">Breakpoint: 1024px+</div>
        </div>
        <div className="bg-zinc-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Tablet size={16} className="text-zinc-600" />
            <span className="text-zinc-700">Tablet</span>
          </div>
          <div className="text-zinc-500">768 × 1024</div>
          <div className="text-zinc-500">Breakpoint: 768px - 1023px</div>
        </div>
        <div className="bg-zinc-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Smartphone size={16} className="text-zinc-600" />
            <span className="text-zinc-700">Mobile</span>
          </div>
          <div className="text-zinc-500">375 × 667</div>
          <div className="text-zinc-500">Breakpoint: 0 - 767px</div>
        </div>
      </div>
    </div>
  );
}

function ResponsiveContent({ device }: { device: 'desktop' | 'tablet' | 'mobile' }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`flex items-center ${device === 'mobile' ? 'flex-col gap-4' : 'justify-between'}`}>
        <h4 className="text-black">Responsive Design</h4>
        {device !== 'mobile' && (
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-black text-white rounded">
              CTA
            </button>
          </div>
        )}
      </div>

      {/* Content Grid */}
      <div className={`grid gap-4 ${
        device === 'desktop'
          ? 'grid-cols-3'
          : device === 'tablet'
          ? 'grid-cols-2'
          : 'grid-cols-1'
      }`}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-zinc-100 rounded-lg p-4">
            <div className="aspect-video bg-zinc-200 rounded mb-3" />
            <div className="h-3 bg-zinc-200 rounded w-3/4 mb-2" />
            <div className="h-2 bg-zinc-200 rounded w-1/2" />
          </div>
        ))}
      </div>

      {/* Feature Section */}
      <div className={`flex gap-6 ${device === 'mobile' ? 'flex-col' : ''}`}>
        <div className="flex-1 space-y-3">
          <h5 className="text-black">Adaptive Layouts</h5>
          <p className="text-zinc-600">
            Content automatically adjusts to provide the best experience across all devices.
          </p>
        </div>
        <div className="flex-1 space-y-3">
          <h5 className="text-black">Optimized Performance</h5>
          <p className="text-zinc-600">
            Fast loading times and smooth interactions on every screen size.
          </p>
        </div>
      </div>

      {/* Mobile CTA */}
      {device === 'mobile' && (
        <button className="w-full py-3 bg-black text-white rounded-lg">
          Call to Action
        </button>
      )}
    </div>
  );
}
