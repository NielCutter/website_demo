export function TShirtGraphics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Vintage Retro */}
      <GraphicCard
        title="Vintage Retro"
        description="70s-inspired sunset gradient design"
        colors={['1-color', '3-color', 'Full color']}
        graphic={
          <div className="relative w-full">
            <div className="absolute inset-0 bg-gradient-to-b from-[#FF6B35] via-[#F7931E] to-[#FDC830] opacity-90 rounded-full blur-2xl" />
            <div className="relative text-center py-4">
              <div className="text-black mb-2" style={{ fontSize: '36px', fontFamily: 'serif', letterSpacing: '2px', fontWeight: '900' }}>
                SUNSET
              </div>
              <div className="text-black" style={{ fontSize: '28px', fontFamily: 'serif', letterSpacing: '4px', fontWeight: '700' }}>
                VIBES
              </div>
              <div className="text-black mt-3" style={{ fontSize: '12px', letterSpacing: '3px', opacity: 0.8 }}>
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
          <div className="text-center space-y-3">
            <div className="text-black tracking-tighter" style={{ fontSize: '52px', lineHeight: '1', fontWeight: '900' }}>
              LESS
            </div>
            <div className="h-0.5 bg-black w-28 mx-auto" />
            <div className="text-black tracking-widest" style={{ fontSize: '13px', letterSpacing: '10px', fontWeight: '600' }}>
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
          <div className="text-center w-full">
            <div className="text-black mb-3" style={{ fontSize: '72px', lineHeight: '1', fontWeight: '900', letterSpacing: '-4px' }}>
              RISE
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 bg-black w-full" />
              <div className="h-1.5 bg-black w-4/5 mx-auto" />
              <div className="h-1.5 bg-black w-3/5 mx-auto" />
              <div className="h-1.5 bg-black w-2/5 mx-auto" />
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
            <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
              {/* Enhanced mascot illustration */}
              <circle cx="70" cy="45" r="28" fill="black" />
              <circle cx="60" cy="40" r="5" fill="white" />
              <circle cx="80" cy="40" r="5" fill="white" />
              <path d="M 58 50 Q 70 55 82 50" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <circle cx="70" cy="90" r="35" fill="black" />
              <rect x="45" y="72" width="12" height="35" fill="black" rx="2" />
              <rect x="83" y="72" width="12" height="35" fill="black" rx="2" />
              <circle cx="70" cy="82" r="6" fill="white" />
              <path d="M 55 60 L 45 75 L 50 80 Z" fill="black" />
              <path d="M 85 60 L 95 75 L 90 80 Z" fill="black" />
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
          <div className="relative text-center w-full">
            <div className="absolute inset-0 opacity-15">
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,black_1px,transparent_1px)] bg-[length:4px_4px]" />
            </div>
            <div className="relative">
              <div className="text-black mb-3" style={{ fontSize: '44px', fontWeight: '900', letterSpacing: '-2px' }}>
                REBEL
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-1 bg-black" />
                <div className="text-black" style={{ fontSize: '15px', letterSpacing: '4px', fontWeight: '700' }}>
                  SOUL
                </div>
                <div className="w-10 h-1 bg-black" />
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
            <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
              <rect x="25" y="25" width="45" height="45" fill="black" rx="4" />
              <circle cx="100" cy="47" r="22" stroke="black" strokeWidth="3.5" />
              <polygon points="50,115 70,75 90,115" fill="black" />
              <rect x="85" y="95" width="35" height="35" stroke="black" strokeWidth="3.5" rx="3" />
              <circle cx="110" cy="25" r="8" fill="black" />
              <line x1="30" y1="80" x2="50" y2="100" stroke="black" strokeWidth="2.5" />
            </svg>
          </div>
        }
      />

      {/* Streetwear Logo */}
      <GraphicCard
        title="Streetwear Logo"
        description="Bold logo design for urban fashion"
        colors={['1-color', '2-color']}
        graphic={
          <div className="text-center">
            <div className="relative inline-block">
              <div className="text-black" style={{ fontSize: '48px', fontWeight: '900', letterSpacing: '-2px', lineHeight: '1' }}>
                NCTR
              </div>
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-black" />
            </div>
            <div className="mt-2 text-black text-xs tracking-widest" style={{ letterSpacing: '6px' }}>
              STUDIO
            </div>
          </div>
        }
      />

      {/* Abstract Art */}
      <GraphicCard
        title="Abstract Art"
        description="Creative abstract design with flow"
        colors={['Full color', '3-color']}
        graphic={
          <div className="flex items-center justify-center">
            <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
              <path d="M 20 70 Q 35 30, 70 40 T 120 70" stroke="black" strokeWidth="4" fill="none" />
              <path d="M 20 90 Q 50 50, 70 80 T 120 90" stroke="black" strokeWidth="4" fill="none" />
              <circle cx="35" cy="60" r="8" fill="black" />
              <circle cx="105" cy="80" r="8" fill="black" />
              <path d="M 50 100 Q 70 85, 90 100" stroke="black" strokeWidth="3" fill="none" />
            </svg>
          </div>
        }
      />

      {/* Typography Lockup */}
      <GraphicCard
        title="Typography Lockup"
        description="Professional text-based design"
        colors={['1-color', '2-color']}
        graphic={
          <div className="text-center w-full">
            <div className="text-black mb-1" style={{ fontSize: '18px', letterSpacing: '5px', fontWeight: '600' }}>
              NEW
            </div>
            <div className="h-px bg-black w-20 mx-auto my-2" />
            <div className="text-black" style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '-1px' }}>
              CULTURE
            </div>
            <div className="text-black mt-1" style={{ fontSize: '14px', letterSpacing: '3px', fontWeight: '500' }}>
              TRENDS
            </div>
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
          <div className="absolute top-4 right-4 px-2 py-1 bg-black text-white rounded text-xs font-semibold">
            Back Design
          </div>
        )}
      </div>
      
      <div className="p-6 bg-white border-t border-zinc-200">
        <h5 className="text-black mb-2 font-semibold">{title}</h5>
        <p className="text-zinc-600 mb-4 text-sm">{description}</p>
        
        <div className="flex items-center gap-2 flex-wrap">
          {colors.map((color) => (
            <div key={color} className="px-2.5 py-1 bg-zinc-100 rounded text-zinc-700 text-xs font-medium">
              {color}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
