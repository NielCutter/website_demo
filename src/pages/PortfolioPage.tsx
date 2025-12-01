import { Mail, Code, Palette, Zap, Figma, Github, ExternalLink } from "lucide-react";

export function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#050506] text-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Animated gradient background */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: 'linear-gradient(135deg, #1D1D2C 0%, #2A2A3E 20%, #FF00B3 40%, #00FFE5 60%, #2A2A3E 80%, #1D1D2C 100%)',
            backgroundSize: '400% 400%',
            animation: 'gradient-shift 15s ease infinite',
          }}
        />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#00FFE5] via-white to-[#FF00B3] bg-clip-text text-transparent">
            Niel Cutter
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-2 sm:mb-3">
            Visual Assistant Portfolio
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8">
            <span className="flex items-center gap-2">
              <Code className="w-4 h-4 sm:w-5 sm:h-5" />
              Software Engineer
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
              Hyperrealistic Illustrator
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              Creative Visual Designer
            </span>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Blending technical precision with artistic mastery. I turn concepts into functional digital experiences—from lifelike illustrations to fully deployed websites.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24 space-y-12 sm:space-y-16 lg:space-y-20">
        
        {/* About Me */}
        <section className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-2xl sm:text-3xl">🔥</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
              About Me
            </h2>
          </div>
          <div className="p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-black/40 border border-white/10 backdrop-blur-sm">
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
              I am a software engineer and illustrator specializing in hyperrealistic art, visual storytelling, and creative product design. I bridge the gap between code and creativity by building interactive, aesthetically rich digital products.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mt-4 sm:mt-6">
              I convert Figma designs to live, production-ready sites, automate workflows, and craft visuals that engage, inform, and inspire.
            </p>
          </div>
        </section>

        {/* Illustration & Design */}
        <section className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-2xl sm:text-3xl">🎨</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
              Illustration & Design
            </h2>
          </div>
          <div className="p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-black/40 border border-white/10 backdrop-blur-sm">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-4 sm:mb-6">Expertise:</h3>
            <ul className="space-y-2 sm:space-y-3 text-base sm:text-lg text-gray-300 list-disc list-inside ml-2 sm:ml-4">
              <li>Hyperrealistic digital portraits</li>
              <li>Clothing and apparel graphics</li>
              <li>Product mockups</li>
              <li>Logos, icons, and brand identities</li>
              <li>Poster, banner, and promotional materials</li>
            </ul>
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
              <p className="text-base sm:text-lg text-gray-400 mb-2 sm:mb-3">Tools:</p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {['Procreate', 'Photoshop', 'Illustrator', 'Figma'].map((tool) => (
                  <span key={tool} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white/10 text-white text-sm sm:text-base font-medium border border-white/20">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Software Engineering */}
        <section className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-2xl sm:text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
              Software Engineering
            </h2>
          </div>
          <div className="p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-black/40 border border-white/10 backdrop-blur-sm">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-4 sm:mb-6">Capabilities:</h3>
            <ul className="space-y-2 sm:space-y-3 text-base sm:text-lg text-gray-300 list-disc list-inside ml-2 sm:ml-4">
              <li>Web app development (Firebase, React, Next.js)</li>
              <li>API design & integrations</li>
              <li>Admin dashboard creation</li>
              <li>E‑commerce product sync & automation</li>
              <li>Voting systems, polls, and dynamic UI</li>
            </ul>
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
              <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Workflow:</h4>
              <ol className="space-y-2 sm:space-y-3 text-base sm:text-lg text-gray-300 list-decimal list-inside ml-2 sm:ml-4">
                <li>Design in Figma or import existing designs</li>
                <li>Convert to responsive web experiences</li>
                <li>Deploy to Firebase / Vercel</li>
                <li>Maintain performance, UX, and scalability</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-2xl sm:text-3xl">🛠</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
              Tech Stack
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Frontend</h3>
              <p className="text-sm sm:text-base text-gray-300">React, Next.js, HTML/CSS/Tailwind, JavaScript/TypeScript</p>
            </div>
            <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Backend</h3>
              <p className="text-sm sm:text-base text-gray-300">Firebase (Auth, Firestore, Functions), Node.js</p>
            </div>
            <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Design</h3>
              <p className="text-sm sm:text-base text-gray-300">Figma, Adobe Suite, Procreate</p>
            </div>
            <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Others</h3>
              <p className="text-sm sm:text-base text-gray-300">Git, Shopee API, automation tools</p>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-2xl sm:text-3xl">🚀</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
              Featured Projects
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm hover:border-[#00FFE5]/50 transition-all">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">1. New Culture Trends – Apparel Brand Website</h3>
              <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">
                A Firebase‑powered interactive voting experience for fashion drops.
              </p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-400 list-disc list-inside ml-2">
                <li>Live dynamic content updates</li>
                <li>Admin‑controlled library and voting</li>
                <li>Newsletter integration</li>
              </ul>
            </div>
            <div className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm hover:border-[#FF00B3]/50 transition-all">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">2. Hyperrealistic Illustration Portfolio</h3>
              <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">
                A curated collection of lifelike artwork showcasing lighting, texture, and realism.
              </p>
            </div>
            <div className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm hover:border-[#00FFE5]/50 transition-all">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">3. E‑commerce Tools & Automation</h3>
              <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">
                Scripts and workflows connecting product listings to custom websites.
              </p>
            </div>
          </div>
        </section>

        {/* Services Offered */}
        <section className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-2xl sm:text-3xl">🧩</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
              Services Offered
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              'Figma to responsive website',
              'Hyperrealistic illustration & apparel design',
              'Branding & identity systems',
              'Frontend web development',
              'Admin dashboard creation',
              'Website modernization & optimization'
            ].map((service, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm hover:border-[#00FFE5]/30 transition-all">
                <p className="text-sm sm:text-base text-gray-300">{service}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Package Pricing */}
        <section className="space-y-6 sm:space-y-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-2xl sm:text-3xl">💼</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
              Package Pricing
            </h2>
          </div>

          {/* Illustration Packages */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Palette className="w-6 h-6 sm:w-7 sm:h-7" />
              Illustration Packages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#00FFE5]/10 to-[#00FFE5]/5 border border-[#00FFE5]/30 backdrop-blur-sm">
                <h4 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">Starter Portrait – ₱1,500</h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-300 list-disc list-inside ml-2">
                  <li>Simple hyperrealistic headshot</li>
                  <li>1 revision</li>
                </ul>
              </div>
              <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#FF00B3]/10 to-[#FF00B3]/5 border border-[#FF00B3]/30 backdrop-blur-sm">
                <h4 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">Premium Portrait – ₱3,500</h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-300 list-disc list-inside ml-2">
                  <li>Full hyperrealistic detail</li>
                  <li>3 revisions</li>
                  <li>High‑res PNG + source file</li>
                </ul>
              </div>
              <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#00FFE5]/10 to-[#00FFE5]/5 border border-[#00FFE5]/30 backdrop-blur-sm">
                <h4 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">Apparel Graphic Design – ₱2,000 – ₱5,000</h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-300 list-disc list-inside ml-2">
                  <li>Shirt graphics, merch design, mockups</li>
                </ul>
              </div>
              <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#FF00B3]/10 to-[#FF00B3]/5 border border-[#FF00B3]/30 backdrop-blur-sm">
                <h4 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">Brand Identity Pack – ₱8,000</h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-300 list-disc list-inside ml-2">
                  <li>Logo + typography + color palette</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Web Development Packages */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Code className="w-6 h-6 sm:w-7 sm:h-7" />
              Web Development Packages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#00FFE5]/10 to-[#00FFE5]/5 border border-[#00FFE5]/30 backdrop-blur-sm">
                <h4 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">Figma to Live Website (Basic) – ₱5,000</h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-300 list-disc list-inside ml-2">
                  <li>Up to 3 pages</li>
                  <li>Responsive mobile + desktop</li>
                </ul>
              </div>
              <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#FF00B3]/10 to-[#FF00B3]/5 border border-[#FF00B3]/30 backdrop-blur-sm">
                <h4 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">Business Website (Standard) – ₱12,000</h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-300 list-disc list-inside ml-2">
                  <li>Up to 6 pages</li>
                  <li>Firebase hosting</li>
                  <li>Contact form + basic admin tools</li>
                </ul>
              </div>
              <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#00FFE5]/10 to-[#00FFE5]/5 border border-[#00FFE5]/30 backdrop-blur-sm">
                <h4 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">E‑commerce / Apparel Site – ₱18,000 – ₱30,000</h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-300 list-disc list-inside ml-2">
                  <li>Product catalog</li>
                  <li>Voting system / polls</li>
                  <li>Admin dashboard</li>
                </ul>
              </div>
              <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#FF00B3]/10 to-[#FF00B3]/5 border border-[#FF00B3]/30 backdrop-blur-sm">
                <h4 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">Custom Web App – Starting ₱25,000</h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-300 list-disc list-inside ml-2">
                  <li>Tailored features based on requirements</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Add-Ons */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-3">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
              Add‑Ons
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-4 sm:p-5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm">
                <p className="text-sm sm:text-base text-gray-300">Extra page – <span className="text-white font-semibold">₱800</span></p>
              </div>
              <div className="p-4 sm:p-5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm">
                <p className="text-sm sm:text-base text-gray-300">Admin dashboard module – <span className="text-white font-semibold">₱3,000+</span></p>
              </div>
              <div className="p-4 sm:p-5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm">
                <p className="text-sm sm:text-base text-gray-300">Newsletter integration – <span className="text-white font-semibold">₱1,200</span></p>
              </div>
              <div className="p-4 sm:p-5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm">
                <p className="text-sm sm:text-base text-gray-300">Shopee product sync – <span className="text-white font-semibold">₱3,500</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-2xl sm:text-3xl">📩</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
              Contact
            </h2>
          </div>
          <div className="p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#00FFE5]/10 via-[#FF00B3]/10 to-[#00FFE5]/10 border border-[#00FFE5]/30 backdrop-blur-sm">
            <div className="space-y-4 sm:space-y-6">
              <a 
                href="mailto:nielcutter.nc@gmail.com" 
                className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-black/40 border border-white/10 hover:border-[#00FFE5]/50 transition-all group"
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#00FFE5] group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-400 mb-1">Email</p>
                  <p className="text-base sm:text-lg font-semibold text-white">nielcutter.nc@gmail.com</p>
                </div>
              </a>
              <a 
                href="https://newculturetrends.com/p0rtf0li0" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-black/40 border border-white/10 hover:border-[#FF00B3]/50 transition-all group"
              >
                <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF00B3] group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-400 mb-1">Website</p>
                  <p className="text-base sm:text-lg font-semibold text-white">newculturetrends.com/p0rtf0li0</p>
                </div>
              </a>
            </div>
            <p className="text-center text-lg sm:text-xl md:text-2xl font-bold text-white mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
              Let's build something exceptional.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

