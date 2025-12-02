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
        registrationNumber="7297002"
        businessName="NCTR Apparel Shop"
        businessAddress="Philippines"
        businessType="Sole Proprietorship"
        registrationDate="2024-01-01"
        birTin="409-146-642-000"
        trademarkNumber="4/2025/00525886"
        trademarkName="New Culture Trends"
      />
      <Hero />
      <FeaturedProducts />
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <PollWidget />
        </div>
      </section>
      <About />
      <Newsletter />
      <Footer />
    </div>
  );
}

