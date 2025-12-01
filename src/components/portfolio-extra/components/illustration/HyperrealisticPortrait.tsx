import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Eye, Palette, Sparkles } from 'lucide-react';

export function HyperrealisticPortrait() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Main Portrait */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-lg">
        <div className="aspect-[3/4] bg-zinc-100 relative overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1664891419647-5dfe3d310226?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQ1NDA4OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Hyperrealistic Portrait"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full">
            Hyperrealistic
          </div>
        </div>
        <div className="p-6 bg-zinc-50">
          <h5 className="text-black mb-2">Studio Portrait Series</h5>
          <p className="text-zinc-600 mb-4">
            High-detail digital illustration with focus on skin texture, lighting, and realistic hair rendering.
          </p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white rounded-lg p-3 border border-zinc-200">
              <div className="text-black mb-1">Layer Count</div>
              <div className="text-zinc-600">150+</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-zinc-200">
              <div className="text-black mb-1">Resolution</div>
              <div className="text-zinc-600">4K</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-zinc-200">
              <div className="text-black mb-1">Time</div>
              <div className="text-zinc-600">12-16h</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Breakdown */}
      <div className="space-y-6">
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-black text-white rounded-lg">
              <Eye size={20} />
            </div>
            <h5 className="text-black">Detail Techniques</h5>
          </div>
          <div className="space-y-3">
            <DetailItem
              label="Skin Texture"
              description="Individual pores, subsurface scattering, realistic tone mapping"
            />
            <DetailItem
              label="Hair Rendering"
              description="Strand-by-strand detail, natural highlights and shadows"
            />
            <DetailItem
              label="Eye Detail"
              description="Corneal reflections, iris patterns, catchlights"
            />
            <DetailItem
              label="Lighting"
              description="Studio-quality three-point lighting setup"
            />
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-black text-white rounded-lg">
              <Palette size={20} />
            </div>
            <h5 className="text-black">Color Grading</h5>
          </div>
          <div className="grid grid-cols-4 gap-2 mb-3">
            <div className="aspect-square bg-[#F5E6D3] rounded" />
            <div className="aspect-square bg-[#D4A574] rounded" />
            <div className="aspect-square bg-[#8B6F47] rounded" />
            <div className="aspect-square bg-[#4A3C2E] rounded" />
          </div>
          <p className="text-zinc-600">
            Natural skin tone palette with warm undertones and realistic shadow mapping
          </p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-black text-white rounded-lg">
              <Sparkles size={20} />
            </div>
            <h5 className="text-black">Enhancement Process</h5>
          </div>
          <div className="space-y-2">
            <ProcessStep step="1" label="Base sketch & composition" />
            <ProcessStep step="2" label="Color blocking & values" />
            <ProcessStep step="3" label="Texture application & detail work" />
            <ProcessStep step="4" label="Lighting & atmospheric effects" />
            <ProcessStep step="5" label="Final polish & color grading" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, description }: { label: string; description: string }) {
  return (
    <div className="flex gap-3 pb-3 border-b border-zinc-100 last:border-0 last:pb-0">
      <div className="w-2 h-2 bg-black rounded-full mt-1.5 flex-shrink-0" />
      <div>
        <div className="text-black mb-1">{label}</div>
        <div className="text-zinc-600">{description}</div>
      </div>
    </div>
  );
}

function ProcessStep({ step, label }: { step: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-zinc-700">
      <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">
        {step}
      </div>
      <span>{label}</span>
    </div>
  );
}
