import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Ruler, Users, Layers } from 'lucide-react';

export function FullBodyIllustration() {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-zinc-200">
        {/* Main Illustration */}
        <div className="lg:col-span-2 bg-white p-8">
          <div className="aspect-[2/3] max-h-[700px] bg-zinc-50 rounded-lg relative overflow-hidden mx-auto max-w-md">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1664891419647-5dfe3d310226?w=600"
              alt="Full Body Illustration"
              className="w-full h-full object-cover"
            />
            
            {/* Annotation Markers */}
            <div className="absolute top-[15%] left-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-black rounded-full" />
              <div className="bg-black/90 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
                Facial Detail
              </div>
            </div>
            <div className="absolute top-[40%] right-4 flex items-center gap-2 flex-row-reverse">
              <div className="w-3 h-3 bg-black rounded-full" />
              <div className="bg-black/90 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
                Fabric Texture
              </div>
            </div>
            <div className="absolute bottom-[20%] left-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-black rounded-full" />
              <div className="bg-black/90 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
                Dynamic Pose
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Ruler size={18} />
              <h5 className="text-black">Specifications</h5>
            </div>
            <div className="space-y-3">
              <SpecItem label="Canvas Size" value="3000 × 4500px" />
              <SpecItem label="Resolution" value="300 DPI" />
              <SpecItem label="Color Mode" value="RGB" />
              <SpecItem label="File Format" value="PSD, PNG, JPG" />
              <SpecItem label="Layers" value="200+ organized" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Layers size={18} />
              <h5 className="text-black">Includes</h5>
            </div>
            <div className="space-y-2">
              <IncludeItem text="Full body character" />
              <IncludeItem text="Detailed clothing/outfit" />
              <IncludeItem text="Realistic shading" />
              <IncludeItem text="Background element" />
              <IncludeItem text="Color variations" />
              <IncludeItem text="Source files" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users size={18} />
              <h5 className="text-black">Use Cases</h5>
            </div>
            <div className="space-y-2">
              <UseCaseItem text="Character design" />
              <UseCaseItem text="Fashion illustration" />
              <UseCaseItem text="Editorial work" />
              <UseCaseItem text="Brand campaigns" />
              <UseCaseItem text="Portfolio pieces" />
            </div>
          </div>
        </div>
      </div>

      {/* Variations */}
      <div className="bg-zinc-50 p-8 border-t border-zinc-200">
        <h5 className="text-black mb-6">Style Variations</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <VariationCard title="Realistic" description="Photorealistic rendering" />
          <VariationCard title="Semi-Realistic" description="Stylized realism" />
          <VariationCard title="Fashion Editorial" description="High-fashion style" />
          <VariationCard title="Concept Art" description="Game/film ready" />
        </div>
      </div>
    </div>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
      <span className="text-zinc-600">{label}</span>
      <span className="text-black">{value}</span>
    </div>
  );
}

function IncludeItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-zinc-700">
      <div className="w-1.5 h-1.5 bg-black rounded-full" />
      <span>{text}</span>
    </div>
  );
}

function UseCaseItem({ text }: { text: string }) {
  return (
    <div className="px-3 py-1.5 bg-white border border-zinc-200 rounded text-zinc-700 inline-block mr-2 mb-2">
      {text}
    </div>
  );
}

function VariationCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="aspect-square bg-zinc-100 rounded mb-3" />
      <div className="text-black mb-1">{title}</div>
      <div className="text-zinc-600">{description}</div>
    </div>
  );
}
