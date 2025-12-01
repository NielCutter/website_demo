import { Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

export function SocialMediaKit() {
  return (
    <div className="space-y-8">
      {/* Profile Images */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <SocialProfile icon={<Instagram size={24} />} platform="Instagram" />
        <SocialProfile icon={<Twitter size={24} />} platform="Twitter" />
        <SocialProfile icon={<Linkedin size={24} />} platform="LinkedIn" />
        <SocialProfile icon={<Youtube size={24} />} platform="YouTube" />
      </div>

      {/* Header Images */}
      <div className="space-y-4">
        <h5 className="text-black">Social Media Headers</h5>
        
        {/* Twitter/X Header */}
        <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
          <div className="relative aspect-[3/1] bg-gradient-to-br from-black via-zinc-800 to-black flex items-center justify-center">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.05)_75%)] bg-[length:20px_20px]" />
            </div>
            <div className="relative text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white">
                  M
                </div>
              </div>
              <div className="text-white mb-1">Morgan Creative Studio</div>
              <div className="text-zinc-400">Design • Development • Branding</div>
            </div>
          </div>
          <div className="px-4 py-2 bg-zinc-50 flex items-center justify-between">
            <span className="text-zinc-600">Twitter/X Header</span>
            <span className="text-zinc-500">1500 × 500px</span>
          </div>
        </div>

        {/* LinkedIn Header */}
        <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
          <div className="relative aspect-[4/1] bg-white flex items-center justify-center border-b border-zinc-200">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#fafafa_0%,#ffffff_100%)]" />
            <div className="relative z-10 flex items-center gap-8">
              <div className="w-16 h-16 bg-black rounded flex items-center justify-center text-white">
                M
              </div>
              <div>
                <div className="text-black mb-1">Professional Design Services</div>
                <div className="text-zinc-600">Elevating brands through exceptional design</div>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 bg-zinc-50 flex items-center justify-between">
            <span className="text-zinc-600">LinkedIn Header</span>
            <span className="text-zinc-500">1584 × 396px</span>
          </div>
        </div>
      </div>

      {/* Post Templates */}
      <div>
        <h5 className="text-black mb-4">Post Templates</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quote Template */}
          <PostTemplate
            title="Quote Post"
            bgClass="bg-black"
            content={
              <div className="text-white text-center">
                <div className="text-4xl mb-4">"</div>
                <div className="mb-4">Design is not just what it looks like. Design is how it works.</div>
                <div className="text-zinc-400">— Steve Jobs</div>
              </div>
            }
          />

          {/* Announcement Template */}
          <PostTemplate
            title="Announcement"
            bgClass="bg-white border-2 border-black"
            content={
              <div className="text-black">
                <div className="text-xs tracking-wider mb-2">NEW RELEASE</div>
                <div className="mb-3">Spring Collection 2025</div>
                <div className="text-zinc-600">Coming Soon</div>
              </div>
            }
          />

          {/* Minimal Template */}
          <PostTemplate
            title="Minimal Post"
            bgClass="bg-zinc-50"
            content={
              <div className="space-y-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white">
                  M
                </div>
                <div className="text-black">Clean. Modern. Timeless.</div>
                <div className="text-zinc-600">@morganstudio</div>
              </div>
            }
          />
        </div>
      </div>

      {/* Story Templates */}
      <div>
        <h5 className="text-black mb-4">Story Templates</h5>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
              <div className="aspect-[9/16] bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center p-6">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">
                      {i + 1}
                    </div>
                  </div>
                  <div className="text-sm">Story {i + 1}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SocialProfile({ icon, platform }: { icon: React.ReactNode; platform: string }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
      <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white">
            M
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 text-zinc-600 mb-2">
        {icon}
        <span>{platform}</span>
      </div>
      <div className="text-zinc-500">400 × 400px</div>
    </div>
  );
}

function PostTemplate({ title, bgClass, content }: {
  title: string;
  bgClass: string;
  content: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
      <div className={`aspect-square ${bgClass} flex items-center justify-center p-8`}>
        {content}
      </div>
      <div className="px-4 py-2 bg-zinc-50 text-center">
        <span className="text-zinc-600">{title}</span>
      </div>
    </div>
  );
}
