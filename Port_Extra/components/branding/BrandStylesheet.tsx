import { Type, Palette, Grid } from 'lucide-react';

export function BrandStylesheet() {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-200">
        {/* Typography */}
        <div className="bg-white p-8">
          <div className="flex items-center gap-2 mb-6">
            <Type size={20} />
            <h5 className="text-black">Typography System</h5>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="text-zinc-500 mb-2">Primary Font</div>
              <div className="text-black mb-1" style={{ fontSize: '32px' }}>Inter</div>
              <div className="text-zinc-600">Headings, Display Text</div>
            </div>
            
            <div>
              <div className="text-zinc-500 mb-2">Secondary Font</div>
              <div className="text-black mb-1" style={{ fontSize: '24px' }}>Inter</div>
              <div className="text-zinc-600">Body Copy, UI Elements</div>
            </div>
            
            <div className="border-t border-zinc-200 pt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-zinc-600">Heading 1</span>
                <span className="text-zinc-500">48px / 700</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-600">Heading 2</span>
                <span className="text-zinc-500">36px / 700</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-600">Heading 3</span>
                <span className="text-zinc-500">24px / 600</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-600">Body Large</span>
                <span className="text-zinc-500">18px / 400</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-600">Body Regular</span>
                <span className="text-zinc-500">16px / 400</span>
              </div>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div className="bg-white p-8">
          <div className="flex items-center gap-2 mb-6">
            <Palette size={20} />
            <h5 className="text-black">Color Palette</h5>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="text-zinc-500 mb-3">Primary Colors</div>
              <div className="grid grid-cols-3 gap-3">
                <ColorSwatch color="#000000" name="Black" hex="#000000" />
                <ColorSwatch color="#FFFFFF" name="White" hex="#FFFFFF" border />
                <ColorSwatch color="#18181B" name="Zinc 900" hex="#18181B" />
              </div>
            </div>
            
            <div>
              <div className="text-zinc-500 mb-3">Neutral Scale</div>
              <div className="grid grid-cols-5 gap-2">
                <ColorSwatch color="#FAFAFA" name="50" hex="#FAFAFA" border small />
                <ColorSwatch color="#F4F4F5" name="100" hex="#F4F4F5" border small />
                <ColorSwatch color="#E4E4E7" name="200" hex="#E4E4E7" small />
                <ColorSwatch color="#A1A1AA" name="400" hex="#A1A1AA" small />
                <ColorSwatch color="#71717A" name="500" hex="#71717A" small />
              </div>
            </div>
            
            <div>
              <div className="text-zinc-500 mb-3">Accent Colors</div>
              <div className="grid grid-cols-3 gap-3">
                <ColorSwatch color="#000000" name="Primary" hex="#000000" />
                <ColorSwatch color="#DC2626" name="Error" hex="#DC2626" />
                <ColorSwatch color="#16A34A" name="Success" hex="#16A34A" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Usage */}
      <div className="bg-zinc-50 p-8 border-t border-zinc-200">
        <div className="flex items-center gap-2 mb-6">
          <Grid size={20} />
          <h5 className="text-black">Logo Usage Guidelines</h5>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 border border-zinc-200">
            <div className="aspect-video bg-white border-2 border-zinc-300 rounded flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white">
                L
              </div>
            </div>
            <div className="text-black mb-1">Light Backgrounds</div>
            <div className="text-zinc-600">Use black logo on white/light surfaces</div>
          </div>
          
          <div className="bg-black rounded-lg p-6">
            <div className="aspect-video bg-black border-2 border-white rounded flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">
                L
              </div>
            </div>
            <div className="text-white mb-1">Dark Backgrounds</div>
            <div className="text-zinc-400">Use white logo on black/dark surfaces</div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-zinc-200">
            <div className="aspect-video bg-zinc-100 rounded flex items-center justify-center mb-3 relative">
              <div className="absolute inset-0 border-2 border-red-500 rounded" />
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs">
                L
              </div>
            </div>
            <div className="text-black mb-1">Minimum Size</div>
            <div className="text-zinc-600">Never smaller than 32px × 32px</div>
          </div>
        </div>
      </div>

      {/* Icon Set Preview */}
      <div className="bg-white p-8 border-t border-zinc-200">
        <h5 className="text-black mb-6">Brand Icon Set</h5>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-zinc-50 rounded-lg flex items-center justify-center hover:bg-zinc-100 transition-colors">
              <div className="w-6 h-6 bg-black rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ColorSwatch({ color, name, hex, border, small }: {
  color: string;
  name: string;
  hex: string;
  border?: boolean;
  small?: boolean;
}) {
  return (
    <div>
      <div
        className={`rounded-lg mb-2 ${border ? 'border-2 border-zinc-300' : ''} ${small ? 'h-12' : 'h-16'}`}
        style={{ backgroundColor: color }}
      />
      <div className="text-black text-sm">{name}</div>
      <div className="text-zinc-500 text-xs">{hex}</div>
    </div>
  );
}
