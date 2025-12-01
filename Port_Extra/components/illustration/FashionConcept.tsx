import { ImageWithFallback } from '../figma/ImageWithFallback';

export function FashionConcept() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Concept 1 */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-lg">
        <div className="aspect-[3/4] bg-gradient-to-br from-zinc-50 to-zinc-100 relative overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1664891419647-5dfe3d310226?w=600"
            alt="Fashion Concept"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="text-xs tracking-wider mb-1 opacity-80">SPRING 2025</div>
            <h5 className="text-white mb-1">Urban Elegance</h5>
            <p className="text-white/80">Minimalist streetwear meets high fashion</p>
          </div>
        </div>
        <div className="p-6 bg-zinc-50 space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <div className="text-zinc-500 mb-1">Style Direction</div>
              <div className="text-black">Contemporary / Editorial</div>
            </div>
            <div className="flex-1">
              <div className="text-zinc-500 mb-1">Color Theme</div>
              <div className="text-black">Monochrome + Gold</div>
            </div>
          </div>
          <div>
            <div className="text-zinc-500 mb-2">Key Elements</div>
            <div className="flex flex-wrap gap-2">
              <Tag text="Oversized Silhouette" />
              <Tag text="Minimal Details" />
              <Tag text="Premium Fabrics" />
              <Tag text="Clean Lines" />
            </div>
          </div>
        </div>
      </div>

      {/* Concept 2 */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-lg">
        <div className="aspect-[3/4] bg-gradient-to-br from-black via-zinc-900 to-black relative overflow-hidden flex items-center justify-center">
          <div className="text-center text-white p-8">
            <div className="w-32 h-32 border-2 border-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-24 h-24 border-2 border-white/20 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full" />
              </div>
            </div>
            <div className="text-xs tracking-wider mb-2 opacity-80">TECHWEAR COLLECTION</div>
            <h5 className="text-white mb-2">Future Form</h5>
            <p className="text-white/80 mb-6">Function meets aesthetic innovation</p>
            <div className="space-y-2">
              <div className="h-px bg-white/20" />
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Material</span>
                <span className="text-white">Technical Fabric</span>
              </div>
              <div className="h-px bg-white/20" />
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Features</span>
                <span className="text-white">Water-Resistant</span>
              </div>
              <div className="h-px bg-white/20" />
            </div>
          </div>
        </div>
        <div className="p-6 bg-zinc-50 space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <div className="text-zinc-500 mb-1">Style Direction</div>
              <div className="text-black">Techwear / Futuristic</div>
            </div>
            <div className="flex-1">
              <div className="text-zinc-500 mb-1">Color Theme</div>
              <div className="text-black">All Black</div>
            </div>
          </div>
          <div>
            <div className="text-zinc-500 mb-2">Key Elements</div>
            <div className="flex flex-wrap gap-2">
              <Tag text="Modular Design" />
              <Tag text="Hidden Pockets" />
              <Tag text="Tactical Details" />
              <Tag text="Layered Look" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <div className="px-3 py-1 bg-white border border-zinc-200 rounded-full text-zinc-700">
      {text}
    </div>
  );
}
