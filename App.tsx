import { Hero } from "./components/Hero";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { About } from "./components/About";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";
import "./styles/globals.css";

export default function App() {
  return (
    <div className="min-h-screen bg-[#1D1D2C] overflow-x-hidden">
      <Hero />
      <FeaturedProducts />
      <About />
      <Newsletter />
      <Footer />
    </div>
  );
}
