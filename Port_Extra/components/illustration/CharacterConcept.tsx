import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Shirt, Layers, Zap } from 'lucide-react';

export function CharacterConcept() {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-px bg-zinc-200">
        {/* Character Design */}
        <div className="lg:col-span-3 bg-white p-8">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* Front View */}
            <div>
              <div className="text-zinc-500 mb-2 text-center">Front View</div>
              <div className="aspect-[2/3] bg-zinc-50 rounded-lg relative overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1691689761290-2641cf0fc59a?w=400"
                  alt="Character Front"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                  <div className="text-center">
                    {/* Vertical center line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-red-500/30" />
                  </div>
                </div>
              </div>
            </div>

            {/* Side View */}
            <div>
              <div className="text-zinc-500 mb-2 text-center">Side View</div>
              <div className="aspect-[2/3] bg-zinc-50 rounded-lg relative overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1691689761290-2641cf0fc59a?w=400"
                  alt="Character Side"
                  className="w-full h-full object-cover opacity-50"
                />
              </div>
            </div>

            {/* Back View */}
            <div>
              <div className="text-zinc-500 mb-2 text-center">Back View</div>
              <div className="aspect-[2/3] bg-zinc-50 rounded-lg relative overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1691689761290-2641cf0fc59a?w=400"
                  alt="Character Back"
                  className="w-full h-full object-cover opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Detail Callouts */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-zinc-50 rounded-lg p-4 text-center">
              <div className="aspect-square bg-white rounded mb-2 flex items-center justify-center border border-zinc-200">
                <Shirt size={24} className="text-zinc-400" />
              </div>
              <div className="text-black mb-1">Jacket Detail</div>
              <div className="text-zinc-600">Technical fabric with hidden zips</div>
            </div>
            <div className="bg-zinc-50 rounded-lg p-4 text-center">
              <div className="aspect-square bg-white rounded mb-2 flex items-center justify-center border border-zinc-200">
                <Layers size={24} className="text-zinc-400" />
              </div>
              <div className="text-black mb-1">Layering</div>
              <div className="text-zinc-600">Multiple functional layers</div>
            </div>
            <div className="bg-zinc-50 rounded-lg p-4 text-center">
              <div className="aspect-square bg-white rounded mb-2 flex items-center justify-center border border-zinc-200">
                <Zap size={24} className="text-zinc-400" />
              </div>
              <div className="text-black mb-1">Accents</div>
              <div className="text-zinc-600">Reflective details and straps</div>
            </div>
          </div>
        </div>

        {/* Character Sheet Info */}
        <div className="lg:col-span-2 bg-white p-8">
          <h5 className="text-black mb-6">Character Sheet</h5>
          
          <div className="space-y-6">
            <div>
              <div className="text-zinc-500 mb-3">Character Name</div>
              <div className="text-black">Nova Striker</div>
            </div>

            <div>
              <div className="text-zinc-500 mb-3">Style Category</div>
              <div className="text-black">Urban Techwear</div>
            </div>

            <div>
              <div className="text-zinc-500 mb-3">Color Palette</div>
              <div className="grid grid-cols-5 gap-2 mb-2">
                <div className="aspect-square bg-black rounded" />
                <div className="aspect-square bg-zinc-800 rounded" />
                <div className="aspect-square bg-zinc-600 rounded" />
                <div className="aspect-square bg-white border border-zinc-300 rounded" />
                <div className="aspect-square bg-red-600 rounded" />
              </div>
              <div className="text-zinc-600">Black + Grey + Red Accent</div>
            </div>

            <div>
              <div className="text-zinc-500 mb-3">Key Features</div>
              <div className="space-y-2">
                <FeatureItem text="Asymmetrical jacket design" />
                <FeatureItem text="Cargo utility pockets" />
                <FeatureItem text="Adjustable straps system" />
                <FeatureItem text="Reflective paneling" />
                <FeatureItem text="Modular accessories" />
              </div>
            </div>

            <div>
              <div className="text-zinc-500 mb-3">Materials</div>
              <div className="space-y-2">
                <MaterialTag name="Nylon Tech" />
                <MaterialTag name="Cotton Blend" />
                <MaterialTag name="Synthetic Leather" />
                <MaterialTag name="Metal Hardware" />
              </div>
            </div>

            <div>
              <div className="text-zinc-500 mb-3">Accessories</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-zinc-50 rounded p-2 text-center text-zinc-700">Utility Belt</div>
                <div className="bg-zinc-50 rounded p-2 text-center text-zinc-700">Tactical Gloves</div>
                <div className="bg-zinc-50 rounded p-2 text-center text-zinc-700">Combat Boots</div>
                <div className="bg-zinc-50 rounded p-2 text-center text-zinc-700">Face Mask</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mood Board */}
      <div className="bg-zinc-50 p-8 border-t border-zinc-200">
        <h5 className="text-black mb-6">Concept Mood Board</h5>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-zinc-200 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-zinc-700">
      <div className="w-1.5 h-1.5 bg-black rounded-full" />
      <span>{text}</span>
    </div>
  );
}

function MaterialTag({ name }: { name: string }) {
  return (
    <div className="px-3 py-1.5 bg-white border border-zinc-200 rounded text-zinc-700 inline-block">
      {name}
    </div>
  );
}
