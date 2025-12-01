import { ImageWithFallback } from '../figma/ImageWithFallback';

export function ShirtMockups() {
  return (
    <div className="space-y-12">
      {/* Front View Mockups */}
      <div>
        <h5 className="text-black mb-6">Front View Mockups</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MockupCard
            view="Front - Black Tee"
            image="https://images.unsplash.com/photo-1691689761290-2641cf0fc59a?w=400"
            graphic={
              <div className="text-white text-center">
                <div style={{ fontSize: '24px', fontWeight: '900' }}>MINIMAL</div>
                <div className="h-px bg-white w-16 mx-auto my-2" />
                <div style={{ fontSize: '10px', letterSpacing: '2px' }}>DESIGN</div>
              </div>
            }
          />
          <MockupCard
            view="Front - White Tee"
            image="https://images.unsplash.com/photo-1691689761290-2641cf0fc59a?w=400"
            isWhite
            graphic={
              <div className="text-black text-center">
                <div style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '-1px' }}>REBEL</div>
                <div style={{ fontSize: '12px', letterSpacing: '3px' }}>SOUL</div>
              </div>
            }
          />
          <MockupCard
            view="Front - Grey Tee"
            image="https://images.unsplash.com/photo-1691689761290-2641cf0fc59a?w=400"
            isGrey
            graphic={
              <div className="text-black text-center">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="35" stroke="black" strokeWidth="2" />
                  <text x="40" y="50" textAnchor="middle" style={{ fontSize: '32px', fill: 'black' }}>M</text>
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
              <div className="text-white text-center">
                <div style={{ fontSize: '56px', fontWeight: '900', lineHeight: '1' }}>RISE</div>
                <div className="space-y-1 mt-4">
                  <div className="h-1 bg-white w-full" />
                  <div className="h-1 bg-white w-3/4 mx-auto" />
                  <div className="h-1 bg-white w-1/2 mx-auto" />
                </div>
              </div>
            }
          />
          <BackMockupCard
            title="Centered Back Print"
            isWhite
            graphic={
              <div className="text-black text-center">
                <div style={{ fontSize: '14px', letterSpacing: '4px' }}>COLLECTION</div>
                <div style={{ fontSize: '40px', fontWeight: '900', letterSpacing: '-2px' }} className="my-2">2025</div>
                <div style={{ fontSize: '12px', letterSpacing: '2px' }}>SPRING EDITION</div>
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
            <div className="aspect-[3/4] bg-zinc-100 relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1691689761290-2641cf0fc59a?w=600"
                alt="Model wearing shirt"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <div style={{ fontSize: '32px', fontWeight: '900' }}>DESIGN</div>
                  <div className="h-px bg-white w-20 mx-auto my-2" />
                  <div style={{ fontSize: '14px', letterSpacing: '3px' }}>STUDIO</div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-zinc-50 text-center">
              <span className="text-zinc-600">Male Model - Black Tee</span>
            </div>
          </div>
          
          <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
            <div className="aspect-[3/4] bg-zinc-100 relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1664891419647-5dfe3d310226?w=600"
                alt="Model wearing shirt"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center drop-shadow-lg">
                  <div style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '-1px' }}>MINIMAL</div>
                  <div style={{ fontSize: '16px', letterSpacing: '4px' }}>AESTHETIC</div>
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
          />
          <ProductShot
            title="Flat Lay"
            description="Top-down product showcase"
          />
          <ProductShot
            title="Hanger Display"
            description="Retail presentation mockup"
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

function MockupCard({ view, image, graphic, isWhite, isGrey }: {
  view: string;
  image: string;
  graphic: React.ReactNode;
  isWhite?: boolean;
  isGrey?: boolean;
}) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
      <div className={`aspect-[3/4] relative ${isWhite ? 'bg-zinc-100' : isGrey ? 'bg-zinc-300' : 'bg-zinc-900'}`}>
        {/* T-Shirt Shape */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-48 h-64 relative ${isWhite ? 'bg-white' : isGrey ? 'bg-zinc-400' : 'bg-black'} rounded-t-3xl`}>
            {/* Graphic Placement */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2">
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
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
      <div className={`aspect-square relative ${isWhite ? 'bg-zinc-100' : 'bg-zinc-900'}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-64 h-80 relative ${isWhite ? 'bg-white' : 'bg-black'} rounded-t-3xl flex items-center justify-center p-8`}>
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

function ProductShot({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
      <div className="aspect-square bg-zinc-50 flex items-center justify-center p-8">
        <div className="w-32 h-40 bg-black rounded-lg shadow-xl" />
      </div>
      <div className="p-4 text-center">
        <div className="text-black mb-1">{title}</div>
        <div className="text-zinc-600">{description}</div>
      </div>
    </div>
  );
}

function SpecCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-4 text-center">
      <div className="text-zinc-500 mb-1">{label}</div>
      <div className="text-black">{value}</div>
    </div>
  );
}
