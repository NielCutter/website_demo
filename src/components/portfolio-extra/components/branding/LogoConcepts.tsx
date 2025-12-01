export function LogoConcepts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Minimal Monogram */}
      <div className="bg-white border border-zinc-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
        <div className="aspect-square bg-zinc-50 rounded-lg flex items-center justify-center mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fafafa_0%,#f4f4f5_100%)]" />
          <div className="relative">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="60" r="50" stroke="black" strokeWidth="2" />
              <text
                x="60"
                y="75"
                textAnchor="middle"
                style={{ fontSize: '48px', fontFamily: 'system-ui' }}
                className="fill-black"
              >
                M
              </text>
            </svg>
          </div>
        </div>
        <div className="space-y-2">
          <h5 className="text-black">Minimal Monogram</h5>
          <p className="text-zinc-600">Clean, geometric lettermark with refined proportions</p>
          <div className="pt-4 flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded" />
            <div className="w-6 h-6 bg-white border border-zinc-300 rounded" />
            <span className="text-zinc-500 ml-2">2 color variations</span>
          </div>
        </div>
      </div>

      {/* Streetwear Geometric */}
      <div className="bg-white border border-zinc-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
        <div className="aspect-square bg-zinc-900 rounded-lg flex items-center justify-center mb-6 relative overflow-hidden">
          <div className="relative">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              {/* Geometric star/badge shape */}
              <path
                d="M60 10 L70 45 L105 45 L77.5 67.5 L87.5 102.5 L60 80 L32.5 102.5 L42.5 67.5 L15 45 L50 45 Z"
                stroke="white"
                strokeWidth="3"
                fill="none"
              />
              <circle cx="60" cy="60" r="15" fill="white" />
              <text
                x="60"
                y="67"
                textAnchor="middle"
                style={{ fontSize: '16px', fontFamily: 'system-ui' }}
                className="fill-black"
              >
                SW
              </text>
            </svg>
          </div>
        </div>
        <div className="space-y-2">
          <h5 className="text-black">Streetwear Geometric</h5>
          <p className="text-zinc-600">Bold, angular badge design with urban edge</p>
          <div className="pt-4 flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded" />
            <div className="w-6 h-6 bg-white border border-zinc-300 rounded" />
            <div className="w-6 h-6 bg-zinc-500 rounded" />
            <span className="text-zinc-500 ml-2">3 color variations</span>
          </div>
        </div>
      </div>

      {/* Clean Tech Brand */}
      <div className="bg-white border border-zinc-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
        <div className="aspect-square bg-gradient-to-br from-zinc-50 to-zinc-100 rounded-lg flex items-center justify-center mb-6 relative overflow-hidden">
          <div className="relative">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              {/* Tech logo with circuits/nodes */}
              <circle cx="40" cy="40" r="8" fill="black" />
              <circle cx="80" cy="40" r="8" fill="black" />
              <circle cx="60" cy="70" r="8" fill="black" />
              <circle cx="40" cy="100" r="8" fill="black" />
              <circle cx="80" cy="100" r="8" fill="black" />
              
              <line x1="40" y1="48" x2="40" y2="92" stroke="black" strokeWidth="2" />
              <line x1="80" y1="48" x2="80" y2="92" stroke="black" strokeWidth="2" />
              <line x1="48" y1="40" x2="72" y2="40" stroke="black" strokeWidth="2" />
              <line x1="48" y1="100" x2="72" y2="100" stroke="black" strokeWidth="2" />
              <line x1="48" y1="44" x2="56" y2="66" stroke="black" strokeWidth="2" />
              <line x1="72" y1="44" x2="64" y2="66" stroke="black" strokeWidth="2" />
              
              <rect x="20" y="15" width="80" height="4" rx="2" fill="black" />
            </svg>
          </div>
        </div>
        <div className="space-y-2">
          <h5 className="text-black">Clean Tech Brand</h5>
          <p className="text-zinc-600">Modern tech identity with connected elements</p>
          <div className="pt-4 flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded" />
            <div className="w-6 h-6 bg-zinc-200 rounded" />
            <span className="text-zinc-500 ml-2">Monochrome palette</span>
          </div>
        </div>
      </div>
    </div>
  );
}
