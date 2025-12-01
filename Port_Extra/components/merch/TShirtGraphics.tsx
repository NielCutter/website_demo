export function TShirtGraphics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Vintage Retro */}
      <GraphicCard
        title="Vintage Retro"
        description="70s-inspired sunset gradient design"
        colors={['1-color', '3-color', 'Full color']}
        graphic={
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#FF6B35] via-[#F7931E] to-[#FDC830] opacity-80 rounded-full blur-2xl" />
            <div className="relative text-center">
              <div className="text-black mb-2" style={{ fontSize: '32px', fontFamily: 'serif', letterSpacing: '2px' }}>
                SUNSET
              </div>
              <div className="text-black" style={{ fontSize: '24px', fontFamily: 'serif', letterSpacing: '4px' }}>
                VIBES
              </div>
              <div className="text-black mt-2" style={{ fontSize: '14px', letterSpacing: '2px' }}>
                EST. 1975
              </div>
            </div>
          </div>
        }
      />

      {/* Minimal Typographic */}
      <GraphicCard
        title="Minimal Typographic"
        description="Clean, modern typography-focused design"
        colors={['1-color', '2-color']}
        graphic={
          <div className="text-center space-y-4">
            <div className="text-black tracking-tighter" style={{ fontSize: '48px', lineHeight: '1' }}>
              LESS
            </div>
            <div className="h-px bg-black w-24 mx-auto" />
            <div className="text-black tracking-widest" style={{ fontSize: '12px', letterSpacing: '8px' }}>
              IS MORE
            </div>
          </div>
        }
      />

      {/* Bold Oversized Back */}
      <GraphicCard
        title="Bold Oversized"
        description="Statement back design with impact"
        colors={['1-color', '2-color', 'Full color']}
        graphic={
          <div className="text-center">
            <div className="text-black mb-2" style={{ fontSize: '64px', lineHeight: '1', fontWeight: '900' }}>
              RISE
            </div>
            <div className="space-y-1">
              <div className="h-1 bg-black w-full" />
              <div className="h-1 bg-black w-3/4 mx-auto" />
              <div className="h-1 bg-black w-1/2 mx-auto" />
            </div>
          </div>
        }
        isBackDesign
      />

      {/* Mascot Character */}
      <GraphicCard
        title="Mascot Character"
        description="Custom illustrated character design"
        colors={['Full color', '4-color']}
        graphic={
          <div className="flex items-center justify-center">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              {/* Simple mascot illustration */}
              <circle cx="60" cy="40" r="25" fill="black" />
              <circle cx="52" cy="35" r="4" fill="white" />
              <circle cx="68" cy="35" r="4" fill="white" />
              <path d="M 50 45 Q 60 50 70 45" stroke="white" strokeWidth="2" fill="none" />
              <circle cx="60" cy="80" r="30" fill="black" />
              <rect x="40" y="65" width="10" height="30" fill="black" />
              <rect x="70" y="65" width="10" height="30" fill="black" />
              <circle cx="60" cy="75" r="5" fill="white" />
            </svg>
          </div>
        }
      />

      {/* Grunge Distressed */}
      <GraphicCard
        title="Grunge / Urban"
        description="Distressed texture with street style"
        colors={['1-color', '2-color']}
        graphic={
          <div className="relative text-center">
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,black_1px,transparent_1px)] bg-[length:4px_4px]" />
            </div>
            <div className="relative">
              <div className="text-black mb-2" style={{ fontSize: '40px', fontWeight: '900', letterSpacing: '-2px' }}>
                REBEL
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-px bg-black" />
                <div className="text-black" style={{ fontSize: '14px', letterSpacing: '3px' }}>
                  SOUL
                </div>
                <div className="w-8 h-px bg-black" />
              </div>
            </div>
          </div>
        }
      />

      {/* Geometric Abstract */}
      <GraphicCard
        title="Geometric Modern"
        description="Abstract shapes and clean geometry"
        colors={['2-color', 'Full color']}
        graphic={
          <div className="flex items-center justify-center">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <rect x="20" y="20" width="40" height="40" fill="black" />
              <circle cx="80" cy="40" r="20" stroke="black" strokeWidth="3" />
              <polygon points="40,100 60,70 80,100" fill="black" />
              <rect x="70" y="80" width="30" height="30" stroke="black" strokeWidth="3" />
            </svg>
          </div>
        }
      />
    </div>
  );
}

function GraphicCard({ title, description, colors, graphic, isBackDesign }: {
  title: string;
  description: string;
  colors: string[];
  graphic: React.ReactNode;
  isBackDesign?: boolean;
}) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      {/* T-Shirt Shape Preview */}
      <div className="aspect-square bg-zinc-50 p-8 flex items-center justify-center relative">
        {/* T-Shirt Outline */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
            <path
              d="M 50 40 L 50 30 L 70 30 L 80 40 L 120 40 L 130 30 L 150 30 L 150 40 L 160 40 L 160 180 L 40 180 L 40 40 Z"
              stroke="black"
              strokeWidth="2"
            />
          </svg>
        </div>
        
        {/* Graphic */}
        <div className="relative z-10 w-full max-w-[200px]">
          {graphic}
        </div>
        
        {isBackDesign && (
          <div className="absolute top-4 right-4 px-2 py-1 bg-black text-white rounded text-xs">
            Back Design
          </div>
        )}
      </div>
      
      <div className="p-6 bg-white border-t border-zinc-200">
        <h5 className="text-black mb-2">{title}</h5>
        <p className="text-zinc-600 mb-4">{description}</p>
        
        <div className="flex items-center gap-2 flex-wrap">
          {colors.map((color) => (
            <div key={color} className="px-2 py-1 bg-zinc-100 rounded text-zinc-700">
              {color}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
