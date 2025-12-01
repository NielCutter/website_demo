import { useState } from 'react';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { WebDevSection } from './components/WebDevSection';
import { BrandingSection } from './components/BrandingSection';
import { IllustrationSection } from './components/IllustrationSection';
import { MerchSection } from './components/MerchSection';
import { MockupsSection } from './components/MockupsSection';
import { CaseStudySection } from './components/CaseStudySection';
import { ContactSection } from './components/ContactSection';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main>
        <section id="home" className="min-h-screen">
          <Hero />
        </section>

        <section id="web-dev" className="min-h-screen bg-zinc-50 py-24">
          <WebDevSection />
        </section>

        <section id="branding" className="min-h-screen bg-white py-24">
          <BrandingSection />
        </section>

        <section id="illustration" className="min-h-screen bg-zinc-50 py-24">
          <IllustrationSection />
        </section>

        <section id="merch" className="min-h-screen bg-white py-24">
          <MerchSection />
        </section>

        <section id="mockups" className="min-h-screen bg-zinc-50 py-24">
          <MockupsSection />
        </section>

        <section id="case-studies" className="min-h-screen bg-white py-24">
          <CaseStudySection />
        </section>

        <section id="contact" className="min-h-screen bg-black py-24">
          <ContactSection />
        </section>
      </main>

      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-zinc-400">© 2025 Creative Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
