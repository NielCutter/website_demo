export function BusinessCard() {
  return (
    <div className="space-y-8">
      {/* Front and Back */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Front */}
        <div className="perspective-1000">
          <div className="relative transform hover:rotate-y-2 transition-transform duration-300">
            <div className="aspect-[1.75/1] bg-white rounded-xl shadow-2xl p-8 flex flex-col justify-between border border-zinc-200">
              <div>
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white mb-4">
                  M
                </div>
              </div>
              <div>
                <h5 className="text-black mb-1">Alex Morgan</h5>
                <div className="text-zinc-600 mb-3">Creative Director</div>
                <div className="text-zinc-500">morgan@studio.com</div>
                <div className="text-zinc-500">+1 (555) 123-4567</div>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-full h-full bg-zinc-900 rounded-xl -z-10" />
          </div>
          <div className="text-center text-zinc-500 mt-4">Front</div>
        </div>

        {/* Back */}
        <div className="perspective-1000">
          <div className="relative transform hover:rotate-y-2 transition-transform duration-300">
            <div className="aspect-[1.75/1] bg-black rounded-xl shadow-2xl p-8 flex flex-col justify-between">
              <div className="text-white opacity-10">
                <svg width="100%" height="60" viewBox="0 0 200 60" fill="none">
                  <circle cx="30" cy="30" r="20" stroke="currentColor" strokeWidth="1" />
                  <circle cx="100" cy="30" r="20" stroke="currentColor" strokeWidth="1" />
                  <circle cx="170" cy="30" r="20" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>
              <div>
                <div className="text-white mb-2">www.studio.com</div>
                <div className="text-zinc-400">123 Design Street</div>
                <div className="text-zinc-400">New York, NY 10001</div>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-full h-full bg-zinc-700 rounded-xl -z-10" />
          </div>
          <div className="text-center text-zinc-500 mt-4">Back</div>
        </div>
      </div>

      {/* Stack Mockup */}
      <div className="bg-zinc-50 rounded-xl p-12 flex items-center justify-center">
        <div className="relative">
          {/* Stack of cards */}
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute aspect-[1.75/1] w-80 bg-white rounded-xl shadow-lg border border-zinc-200"
              style={{
                transform: `translateY(${i * 4}px) translateX(${i * 2}px) rotate(${i * 0.5}deg)`,
                zIndex: 5 - i,
              }}
            >
              {i === 0 && (
                <div className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white mb-3">
                      M
                    </div>
                  </div>
                  <div>
                    <h5 className="text-black mb-1">Alex Morgan</h5>
                    <div className="text-zinc-600">Creative Director</div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="aspect-[1.75/1] w-80" style={{ paddingTop: '16px' }} />
        </div>
      </div>

      {/* Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-zinc-200 rounded-lg p-6">
          <div className="text-zinc-500 mb-1">Dimensions</div>
          <div className="text-black">3.5" × 2" (Standard)</div>
          <div className="text-zinc-600">89mm × 51mm</div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-lg p-6">
          <div className="text-zinc-500 mb-1">Material</div>
          <div className="text-black">350gsm Premium Stock</div>
          <div className="text-zinc-600">Matte finish with spot UV</div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-lg p-6">
          <div className="text-zinc-500 mb-1">Print Method</div>
          <div className="text-black">Offset Printing</div>
          <div className="text-zinc-600">4-color process (CMYK)</div>
        </div>
      </div>
    </div>
  );
}
