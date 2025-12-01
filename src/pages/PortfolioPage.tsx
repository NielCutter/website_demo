import { useState, useEffect } from "react";
import { Mail, Code, Palette, ExternalLink, Instagram, ArrowRight } from "lucide-react";
import { ProjectCard } from "../components/portfolio/ProjectCard";
import { PricingCard } from "../components/portfolio/PricingCard";
import { SkillIcon } from "../components/portfolio/SkillIcon";
import { LazyImage } from "../components/portfolio/LazyImage";

// Project data structure
interface Project {
  id: string;
  title: string;
  tag: string;
  thumbnail?: string;
  description: string;
  tools: string[];
  link?: string;
  category: "illustration" | "web" | "apparel";
}

// Sample projects - replace with your actual project data
const projects: Project[] = [
  {
    id: "1",
    title: "New Culture Trends – Apparel Brand Website",
    tag: "Web App",
    description: "A Firebase-powered interactive voting experience for fashion drops with live dynamic content updates, admin-controlled library, and newsletter integration.",
    tools: ["React", "Firebase", "TypeScript", "Tailwind"],
    category: "web",
    link: "https://newculturetrends.com",
  },
  {
    id: "2",
    title: "Hyperrealistic Portrait Series",
    tag: "Illustration",
    description: "A curated collection of lifelike artwork showcasing advanced lighting techniques, texture work, and photorealistic detail.",
    tools: ["Procreate", "Photoshop"],
    category: "illustration",
  },
  {
    id: "3",
    title: "E-commerce Automation Tools",
    tag: "Web Development",
    description: "Scripts and workflows connecting product listings to custom websites with automated sync and inventory management.",
    tools: ["Node.js", "Shopee API", "Firebase"],
    category: "web",
  },
  {
    id: "4",
    title: "Streetwear Apparel Graphics",
    tag: "Apparel Design",
    description: "Custom graphics and mockups for streetwear collections, including t-shirt designs, hoodie graphics, and brand identity elements.",
    tools: ["Illustrator", "Photoshop", "Figma"],
    category: "apparel",
  },
];

export function PortfolioPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const illustrationProjects = projects.filter(p => p.category === "illustration");
  const webProjects = projects.filter(p => p.category === "web");
  const apparelProjects = projects.filter(p => p.category === "apparel");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className={`relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white tracking-tight">
            Niel Cutter
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-400 mb-4 font-light">
            Visual Assistant Portfolio
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base text-gray-500 mb-8">
            <span className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Software Engineer
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Hyperrealistic Illustrator
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Creative Visual Designer
            </span>
          </div>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Software Engineer + Hyperrealistic Illustrator. Blending code and creativity to build functional, visually stunning digital experiences.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-24">
        
        {/* Featured Projects */}
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-gray-400 text-lg">Selected work showcasing technical and creative capabilities</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                tag={project.tag}
                description={project.description}
                tools={project.tools}
                link={project.link}
              />
            ))}
          </div>
        </section>

        {/* Illustration Gallery */}
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Illustration</h2>
            <p className="text-gray-400 text-lg">Hyperrealistic digital art and portraits</p>
          </div>
          
          {illustrationProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {illustrationProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  tag={project.tag}
                  thumbnail={project.thumbnail}
                  description={project.description}
                  tools={project.tools}
                  link={project.link}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-900/50 to-gray-800/50 flex items-center justify-center">
                    <Palette className="w-8 h-8 text-gray-700" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Web Development Projects */}
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Web Development</h2>
            <p className="text-gray-400 text-lg">Interactive web applications and digital experiences</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {webProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                tag={project.tag}
                thumbnail={project.thumbnail}
                description={project.description}
                tools={project.tools}
                link={project.link}
              />
            ))}
          </div>
        </section>

        {/* Apparel & Creative Design */}
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Apparel & Creative Design</h2>
            <p className="text-gray-400 text-lg">Graphics, mockups, and brand identity work</p>
          </div>
          
          {apparelProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apparelProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  tag={project.tag}
                  thumbnail={project.thumbnail}
                  description={project.description}
                  tools={project.tools}
                  link={project.link}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>Apparel design projects coming soon</p>
            </div>
          )}
        </section>

        {/* About & Skills */}
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">About & Skills</h2>
            <p className="text-gray-400 text-lg max-w-3xl">
              I convert Figma designs to live, production-ready sites, automate workflows, and craft visuals that engage, inform, and inspire.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Capabilities</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-white mt-1">•</span>
                    <span>Web app development (Firebase, React, Next.js)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white mt-1">•</span>
                    <span>API design & integrations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white mt-1">•</span>
                    <span>Admin dashboard creation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white mt-1">•</span>
                    <span>E-commerce product sync & automation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white mt-1">•</span>
                    <span>Hyperrealistic digital portraits</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white mt-1">•</span>
                    <span>Apparel graphics & brand identity</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Tech Stack</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {[
                  { name: "React", icon: "⚛️" },
                  { name: "TypeScript", icon: "📘" },
                  { name: "Firebase", icon: "🔥" },
                  { name: "Next.js", icon: "▲" },
                  { name: "Figma", icon: "🎨" },
                  { name: "Procreate", icon: "✏️" },
                  { name: "Photoshop", icon: "🖼️" },
                  { name: "Illustrator", icon: "✨" },
                ].map((skill) => (
                  <SkillIcon key={skill.name} name={skill.name} icon={<span>{skill.icon}</span>} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing & Services */}
        <section className="space-y-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Pricing & Services</h2>
            <p className="text-gray-400 text-lg">Transparent pricing for illustration and web development services</p>
          </div>

          {/* Illustration Packages */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white flex items-center gap-3">
              <Palette className="w-6 h-6" />
              Illustration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <PricingCard
                title="Starter Portrait"
                price="₱1,500"
                features={["Simple hyperrealistic headshot", "1 revision"]}
              />
              <PricingCard
                title="Premium Portrait"
                price="₱3,500"
                features={["Full hyperrealistic detail", "3 revisions", "High-res PNG + source file"]}
                highlight
              />
              <PricingCard
                title="Apparel Graphic"
                price="₱2,000–₱5,000"
                features={["Shirt graphics, merch design", "Mockups included"]}
              />
              <PricingCard
                title="Brand Identity Pack"
                price="₱8,000"
                features={["Logo + typography", "Color palette", "Brand guidelines"]}
              />
            </div>
          </div>

          {/* Web Development Packages */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white flex items-center gap-3">
              <Code className="w-6 h-6" />
              Web Development
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PricingCard
                title="Figma → Live Website"
                price="₱5,000"
                features={["Up to 3 pages", "Responsive mobile + desktop"]}
              />
              <PricingCard
                title="Business Website"
                price="₱12,000"
                features={["Up to 6 pages", "Firebase hosting", "Contact form + basic admin tools"]}
              />
              <PricingCard
                title="E-commerce / Apparel Site"
                price="₱18,000–₱30,000"
                features={["Product catalog", "Voting system / polls", "Admin dashboard"]}
                highlight
              />
              <PricingCard
                title="Custom Web App"
                price="Starting ₱25,000"
                features={["Tailored features", "Based on requirements"]}
              />
            </div>
          </div>

          {/* Add-Ons */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Add-Ons</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <p className="text-sm text-gray-400">Extra page</p>
                <p className="text-lg font-semibold text-white mt-1">₱800</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <p className="text-sm text-gray-400">Admin dashboard module</p>
                <p className="text-lg font-semibold text-white mt-1">₱3,000+</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <p className="text-sm text-gray-400">Newsletter integration</p>
                <p className="text-lg font-semibold text-white mt-1">₱1,200</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <p className="text-sm text-gray-400">Shopee product sync</p>
                <p className="text-lg font-semibold text-white mt-1">₱3,500</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Let's Work Together</h2>
            <p className="text-gray-400 text-lg mb-8">
              Ready to bring your vision to life? Get in touch to discuss your project.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <a
              href="mailto:nielcutter.nc@gmail.com"
              className="group flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-all duration-200"
            >
              <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/15 transition-colors">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">Email</p>
                <p className="text-base font-semibold text-white">nielcutter.nc@gmail.com</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </a>
            
            <a
              href="https://newculturetrends.com/p0rtf0li0"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-all duration-200"
            >
              <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/15 transition-colors">
                <ExternalLink className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">Portfolio</p>
                <p className="text-base font-semibold text-white">newculturetrends.com</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </a>
          </div>
          
          <div className="text-center">
            <a
              href="mailto:nielcutter.nc@gmail.com?subject=Project Inquiry"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>Work with me</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
