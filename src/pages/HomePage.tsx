import { Hero } from "../components/Hero";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { About } from "../components/About";
import { Newsletter } from "../components/Newsletter";
import { Footer } from "../components/Footer";
import { PollWidget } from "../components/PollWidget";
import { DTIRegistration } from "../components/DTIRegistration";

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#050506] text-white overflow-x-hidden">
      <DTIRegistration 
        registrationNumber="CS-XXXXXXXXX"
        businessName="New Culture Trends"
        businessAddress="Philippines"
        businessType="Sole Proprietorship"
        registrationDate="2024-01-01"
      />
      <Hero />
      <FeaturedProducts />
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <PollWidget />
        </div>
      </section>
      <About />
      <Newsletter />
      <Footer />
    </div>
  );
}

