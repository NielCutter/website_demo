import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ArrowRight, Sliders } from 'lucide-react';
import { useState } from 'react';

export function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="space-y-8">
      {/* Interactive Slider Comparison */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-zinc-200">
          <div className="flex items-center justify-between">
            <h5 className="text-black">Interactive Comparison</h5>
            <div className="flex items-center gap-2 text-zinc-600">
              <Sliders size={18} />
              <span>Drag to compare</span>
            </div>
          </div>
        </div>
        
        <div className="relative aspect-[16/10] bg-zinc-100 overflow-hidden">
          {/* After Image (Full) */}
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1664891419647-5dfe3d310226?w=1200"
            alt="After Enhancement"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Before Image (Clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1664891419647-5dfe3d310226?w=1200&sat=-100&bri=-20"
              alt="Before Enhancement"
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-75"
            />
          </div>
          
          {/* Slider */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-zinc-400" />
                <div className="w-1 h-4 bg-zinc-400" />
              </div>
            </div>
          </div>
          
          {/* Labels */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-sm text-white rounded-full">
            Before
          </div>
          <div className="absolute top-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-sm text-white rounded-full">
            After
          </div>
          
          {/* Input Range */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
          />
        </div>
      </div>

      {/* Side by Side Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Before */}
        <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
          <div className="aspect-[4/5] bg-zinc-100 relative overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1664891419647-5dfe3d310226?w=600"
              alt="Before"
              className="w-full h-full object-cover grayscale brightness-90"
            />
            <div className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white rounded-full">
              Before
            </div>
          </div>
          <div className="p-6 bg-zinc-50">
            <h5 className="text-black mb-3">Original</h5>
            <div className="space-y-2">
              <ComparisonItem label="Color Grading" value="Basic" />
              <ComparisonItem label="Skin Detail" value="Standard" />
              <ComparisonItem label="Lighting" value="Flat" />
              <ComparisonItem label="Texture" value="Low Detail" />
            </div>
          </div>
        </div>

        {/* After */}
        <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-lg">
          <div className="aspect-[4/5] bg-zinc-100 relative overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1664891419647-5dfe3d310226?w=600"
              alt="After"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 px-3 py-1 bg-green-600 text-white rounded-full">
              After
            </div>
          </div>
          <div className="p-6 bg-zinc-50">
            <h5 className="text-black mb-3">Enhanced</h5>
            <div className="space-y-2">
              <ComparisonItem label="Color Grading" value="Professional" improved />
              <ComparisonItem label="Skin Detail" value="Hyperrealistic" improved />
              <ComparisonItem label="Lighting" value="Studio Quality" improved />
              <ComparisonItem label="Texture" value="Ultra Detailed" improved />
            </div>
          </div>
        </div>
      </div>

      {/* Enhancement Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <EnhancementCard
          title="Skin Refinement"
          before="Basic texture"
          after="Pore-level detail, subsurface scattering"
          improvement="+300%"
        />
        <EnhancementCard
          title="Color Enhancement"
          before="Flat colors"
          after="Professional color grading, tonal balance"
          improvement="+250%"
        />
        <EnhancementCard
          title="Lighting & Depth"
          before="2D appearance"
          after="Multi-layer lighting, atmospheric depth"
          improvement="+400%"
        />
      </div>
    </div>
  );
}

function ComparisonItem({ label, value, improved }: { 
  label: string; 
  value: string; 
  improved?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-zinc-600">{label}</span>
      <span className={improved ? 'text-green-600' : 'text-zinc-500'}>{value}</span>
    </div>
  );
}

function EnhancementCard({ title, before, after, improvement }: {
  title: string;
  before: string;
  after: string;
  improvement: string;
}) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-black">{title}</h5>
        <div className="px-2 py-1 bg-green-100 text-green-700 rounded">
          {improvement}
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <div className="text-zinc-500 mb-1">Before</div>
          <div className="text-zinc-700">{before}</div>
        </div>
        <ArrowRight size={18} className="text-zinc-400" />
        <div>
          <div className="text-zinc-500 mb-1">After</div>
          <div className="text-black">{after}</div>
        </div>
      </div>
    </div>
  );
}
