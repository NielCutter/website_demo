import { useState, useEffect } from "react";
import { Code, Palette, ShoppingBag, Mail, ExternalLink, Menu, X } from "lucide-react";
import "../styles/portfolio-extra.css";

// Import Port_Extra components
import { HyperrealisticPortrait } from "../components/portfolio-extra/components/illustration/HyperrealisticPortrait";
import { FullBodyIllustration } from "../components/portfolio-extra/components/illustration/FullBodyIllustration";
import { CharacterConcept } from "../components/portfolio-extra/components/illustration/CharacterConcept";
import { FashionConcept } from "../components/portfolio-extra/components/illustration/FashionConcept";
import { BeforeAfter } from "../components/portfolio-extra/components/illustration/BeforeAfter";

import { EcommerceSite } from "../components/portfolio-extra/components/web-samples/EcommerceSite";
import { AdminDashboard } from "../components/portfolio-extra/components/web-samples/AdminDashboard";
import { FigmaToLive } from "../components/portfolio-extra/components/web-samples/FigmaToLive";
import { TechFashionLanding } from "../components/portfolio-extra/components/web-samples/TechFashionLanding";
import { ResponsivePreviews } from "../components/portfolio-extra/components/web-samples/ResponsivePreviews";

import { LogoConcepts } from "../components/portfolio-extra/components/branding/LogoConcepts";
import { BrandStylesheet } from "../components/portfolio-extra/components/branding/BrandStylesheet";
import { BusinessCard } from "../components/portfolio-extra/components/branding/BusinessCard";
import { SocialMediaKit } from "../components/portfolio-extra/components/branding/SocialMediaKit";

import { TShirtGraphics } from "../components/portfolio-extra/components/merch/TShirtGraphics";
import { ShirtMockups } from "../components/portfolio-extra/components/merch/ShirtMockups";

export function PortfolioExtraPage() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "web-dev", "illustration", "branding", "merch", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="portfolio-extra-wrapper min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Code className="w-6 h-6 text-black" />
              <span className="text-lg font-semibold text-black">Niel Cutter</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { id: "home", label: "Home" },
                { id: "web-dev", label: "Web Dev" },
                { id: "illustration", label: "Illustration" },
                { id: "branding", label: "Branding" },
                { id: "merch", label: "Merch" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "text-black border-b-2 border-black pb-1"
                      : "text-zinc-600 hover:text-black"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-600 hover:text-black"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-zinc-200">
            <div className="px-4 py-4 space-y-3">
              {[
                { id: "home", label: "Home" },
                { id: "web-dev", label: "Web Dev" },
                { id: "illustration", label: "Illustration" },
                { id: "branding", label: "Branding" },
                { id: "merch", label: "Merch" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "bg-zinc-100 text-black"
                      : "text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black mb-6">
              Niel Cutter
            </h1>
            <p className="text-xl sm:text-2xl text-zinc-600 mb-4">
              Software Engineer • Hyperrealistic Illustrator • Creative Visual Designer
            </p>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto mb-8">
              Blending technical precision with artistic mastery. I turn concepts into functional digital experiences—from lifelike illustrations to fully deployed websites.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => scrollToSection("web-dev")}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors font-medium"
              >
                View Work
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-6 py-3 bg-white border border-zinc-300 text-black rounded-lg hover:bg-zinc-50 transition-colors font-medium"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </section>

        {/* Web Development Section */}
        <section id="web-dev" className="min-h-screen bg-zinc-50 py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">Web Development</h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                Interactive web applications and digital experiences built with modern technologies
              </p>
            </div>
            
            <div className="space-y-16">
              <div>
                <h3 className="text-2xl font-semibold text-black mb-6">E-commerce Site</h3>
                <EcommerceSite />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-black mb-6">Admin Dashboard</h3>
                <AdminDashboard />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-black mb-6">Figma to Live</h3>
                <FigmaToLive />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-black mb-6">Tech Fashion Landing</h3>
                <TechFashionLanding />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-black mb-6">Responsive Previews</h3>
                <ResponsivePreviews />
              </div>
            </div>
          </div>
        </section>

        {/* Illustration Section */}
        <section id="illustration" className="min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">Illustration</h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                Hyperrealistic digital art and character design
              </p>
            </div>
            
            <div className="space-y-16">
              <div>
                <h3 className="text-2xl font-semibold text-black mb-6">Hyperrealistic Portraits</h3>
                <HyperrealisticPortrait />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-black mb-6">Full Body Illustrations</h3>
                <FullBodyIllustration />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-black mb-6">Character Concepts</h3>
                <CharacterConcept />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-black mb-6">Fashion Concepts</h3>
                <FashionConcept />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-black mb-6">Before & After</h3>
                <BeforeAfter />
              </div>
            </div>
          </div>
        </section>

        {/* Branding Section */}
        <section id="branding" className="min-h-screen bg-zinc-50 py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">Branding</h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                Logo design, brand identity, and visual systems
              </p>
            </div>
            
            <div className="space-y-16">
              <div>
                <h3 className="text-2xl font-semibold text-black mb-6">Logo Concepts</h3>
                <LogoConcepts />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-black mb-6">Brand Stylesheet</h3>
                <BrandStylesheet />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-black mb-6">Business Cards</h3>
                <BusinessCard />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-black mb-6">Social Media Kit</h3>
                <SocialMediaKit />
              </div>
            </div>
          </div>
        </section>

        {/* Merch Section */}
        <section id="merch" className="min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">Apparel & Merch</h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                T-shirt graphics, mockups, and streetwear designs
              </p>
            </div>
            
            <div className="space-y-16">
              <div>
                <h3 className="text-2xl font-semibold text-black mb-6">T-Shirt Graphics</h3>
                <TShirtGraphics />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-black mb-6">Shirt Mockups</h3>
                <ShirtMockups />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen bg-black py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Let's Work Together</h2>
            <p className="text-lg text-zinc-400 mb-12 max-w-2xl mx-auto">
              Ready to bring your vision to life? Get in touch to discuss your project.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <a
                href="mailto:nielcutter.nc@gmail.com"
                className="flex items-center justify-center gap-3 p-6 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Mail className="w-6 h-6 text-white" />
                <span className="text-white font-medium">nielcutter.nc@gmail.com</span>
              </a>
              
              <a
                href="https://newculturetrends.com/portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 p-6 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
              >
                <ExternalLink className="w-6 h-6 text-white" />
                <span className="text-white font-medium">View Portfolio</span>
              </a>
            </div>
            
            <div className="pt-12 border-t border-white/20">
              <p className="text-zinc-400">© 2025 Niel Cutter. All rights reserved.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

