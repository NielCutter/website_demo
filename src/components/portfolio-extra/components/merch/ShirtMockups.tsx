export function ShirtMockups() {
  return (
    <div className="space-y-12">
      {/* Front View Mockups */}
      <div>
        <h5 className="text-black mb-6">Front View Mockups</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MockupCard
            view="Front - Black Tee"
            graphic={
              <div className="text-white text-center">
                <div className="mb-2" style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '2px' }}>NCTR</div>
                <div className="h-0.5 bg-white w-20 mx-auto my-2" />
                <div style={{ fontSize: '10px', letterSpacing: '4px', opacity: 0.9 }}>NEW CULTURE</div>
              </div>
            }
          />
          <MockupCard
            view="Front - White Tee"
            isWhite
            graphic={
              <div className="text-black text-center">
                <div className="relative">
                  <div style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '-1px' }}>STREET</div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-black rounded-full" />
                </div>
                <div style={{ fontSize: '14px', letterSpacing: '3px', marginTop: '4px' }}>WEAR</div>
              </div>
            }
          />
          <MockupCard
            view="Front - Grey Tee"
            isGrey
            graphic={
              <div className="text-black text-center">
                <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
                  <circle cx="45" cy="45" r="40" stroke="black" strokeWidth="2.5" />
                  <text x="45" y="55" textAnchor="middle" style={{ fontSize: '36px', fill: 'black', fontWeight: '900' }}>M</text>
                  <circle cx="45" cy="45" r="3" fill="black" />
                </svg>
              </div>
            }
          />
        </div>
      </div>

      {/* Back View Mockups */}
      <div>
        <h5 className="text-black mb-6">Back View Mockups</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BackMockupCard
            title="Oversized Back Design"
            graphic={
              <div className="text-white text-center w-full">
                <div style={{ fontSize: '72px', fontWeight: '900', lineHeight: '1', letterSpacing: '-3px' }}>RISE</div>
                <div className="space-y-2 mt-6">
                  <div className="h-1 bg-white w-full" />
                  <div className="h-1 bg-white w-4/5 mx-auto" />
                  <div className="h-1 bg-white w-3/5 mx-auto" />
                  <div className="h-1 bg-white w-2/5 mx-auto" />
                </div>
                <div className="mt-6 text-xs tracking-widest opacity-80">EST. 2025</div>
              </div>
            }
          />
          <BackMockupCard
            title="Centered Back Print"
            isWhite
            graphic={
              <div className="text-black text-center w-full">
                <div style={{ fontSize: '12px', letterSpacing: '5px', marginBottom: '8px' }}>COLLECTION</div>
                <div style={{ fontSize: '56px', fontWeight: '900', letterSpacing: '-3px', lineHeight: '1' }} className="my-3">2025</div>
                <div className="h-px bg-black w-24 mx-auto mb-2" />
                <div style={{ fontSize: '11px', letterSpacing: '3px' }}>SPRING EDITION</div>
              </div>
            }
          />
        </div>
      </div>

      {/* On Model */}
      <div>
        <h5 className="text-black mb-6">On Model Mockups</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
            <div className="aspect-[3/4] bg-gradient-to-br from-zinc-800 via-zinc-900 to-black relative">
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="text-white text-center drop-shadow-2xl">
                  <div style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '1px' }}>NCTR</div>
                  <div className="h-px bg-white w-24 mx-auto my-3" />
                  <div style={{ fontSize: '14px', letterSpacing: '4px' }}>DESIGN STUDIO</div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-zinc-50 text-center">
              <span className="text-zinc-600">Male Model - Black Tee</span>
            </div>
          </div>
          
          <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
            <div className="aspect-[3/4] bg-gradient-to-br from-zinc-700 via-zinc-800 to-black relative">
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="text-white text-center drop-shadow-2xl">
                  <div style={{ fontSize: '40px', fontWeight: '900', letterSpacing: '-1px' }}>MINIMAL</div>
                  <div style={{ fontSize: '16px', letterSpacing: '5px', marginTop: '6px' }}>AESTHETIC</div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-zinc-50 text-center">
              <span className="text-zinc-600">Female Model - Black Tee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Folded & Flat Lay */}
      <div>
        <h5 className="text-black mb-6">Folded & Product Shots</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProductShot
            title="Folded Stack"
            description="Premium product photography angle"
            graphic={
              <div className="w-full h-full flex items-center justify-center">
                <div className="bg-black rounded-lg shadow-2xl p-6 w-32 h-40 flex flex-col items-center justify-center">
                  <div className="text-white text-center mb-2" style={{ fontSize: '20px', fontWeight: '900' }}>NCTR</div>
                  <div className="h-px bg-white w-16 mb-2" />
                  <div className="text-white text-xs tracking-widest">STUDIO</div>
                </div>
              </div>
            }
          />
          <ProductShot
            title="Flat Lay"
            description="Top-down product showcase"
            graphic={
              <div className="w-full h-full flex items-center justify-center">
                <div className="bg-white border-2 border-black rounded-lg shadow-xl p-4 w-28 h-36 flex flex-col items-center justify-center">
                  <div className="text-black text-center" style={{ fontSize: '18px', fontWeight: '900' }}>STREET</div>
                  <div className="h-px bg-black w-12 my-1" />
                  <div className="text-black text-xs">WEAR</div>
                </div>
              </div>
            }
          />
          <ProductShot
            title="Hanger Display"
            description="Retail presentation mockup"
            graphic={
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative">
                  <div className="w-24 h-32 bg-zinc-900 rounded-t-2xl flex items-center justify-center">
                    <div className="text-white text-center">
                      <div style={{ fontSize: '16px', fontWeight: '900' }}>RISE</div>
                    </div>
                  </div>
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-zinc-700 rounded-full border-2 border-zinc-500" />
                </div>
              </div>
            }
          />
        </div>
      </div>

      {/* Mockup Specifications */}
      <div className="bg-zinc-50 rounded-xl p-8">
        <h5 className="text-black mb-6">Mockup Specifications</h5>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <SpecCard label="Resolution" value="4000 × 4000px" />
          <SpecCard label="File Format" value="PSD, PNG, JPG" />
          <SpecCard label="Smart Objects" value="Easy customization" />
          <SpecCard label="Backgrounds" value="Transparent included" />
        </div>
      </div>
    </div>
  );
}

function MockupCard({ view, graphic, isWhite, isGrey }: {
  view: string;
  graphic: React.ReactNode;
  isWhite?: boolean;
  isGrey?: boolean;
}) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <div className={`aspect-[3/4] relative ${isWhite ? 'bg-zinc-100' : isGrey ? 'bg-zinc-300' : 'bg-zinc-900'}`}>
        {/* T-Shirt Shape */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-48 h-64 relative ${isWhite ? 'bg-white' : isGrey ? 'bg-zinc-400' : 'bg-black'} rounded-t-3xl shadow-inner`}>
            {/* Graphic Placement */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full">
              {graphic}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-zinc-50 text-center">
        <span className="text-zinc-600">{view}</span>
      </div>
    </div>
  );
}

function BackMockupCard({ title, graphic, isWhite }: {
  title: string;
  graphic: React.ReactNode;
  isWhite?: boolean;
}) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <div className={`aspect-square relative ${isWhite ? 'bg-zinc-100' : 'bg-zinc-900'}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-64 h-80 relative ${isWhite ? 'bg-white' : 'bg-black'} rounded-t-3xl flex items-center justify-center p-8 shadow-inner`}>
            {graphic}
          </div>
        </div>
      </div>
      <div className="p-4 bg-zinc-50 text-center">
        <span className="text-zinc-600">{title}</span>
      </div>
    </div>
  );
}

function ProductShot({ title, description, graphic }: { 
  title: string; 
  description: string;
  graphic?: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-zinc-50 flex items-center justify-center p-8">
        {graphic || (
          <div className="w-32 h-40 bg-black rounded-lg shadow-xl flex items-center justify-center">
            <div className="text-white text-center">
              <div style={{ fontSize: '18px', fontWeight: '900' }}>NCTR</div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 text-center">
        <div className="text-black mb-1 font-semibold">{title}</div>
        <div className="text-zinc-600 text-sm">{description}</div>
      </div>
    </div>
  );
}

function SpecCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-4 text-center">
      <div className="text-zinc-500 mb-1 text-sm">{label}</div>
      <div className="text-black font-semibold">{value}</div>
    </div>
  );
}
