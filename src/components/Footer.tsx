import { Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" }
  ];

  const footerLinks = [
    {
      title: "Shop",
      links: ["New Arrivals", "Best Sellers", "Collections", "Sale"]
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Sustainability", "Press"]
    },
    {
      title: "Support",
      links: ["Contact", "FAQ", "Shipping", "Returns"]
    }
  ];

  return (
    <footer className="relative border-t border-white/10 bg-[#1D1D2C]">
      {/* Top gradient line */}
      <div 
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #00FFE5, #FF00B3, transparent)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
                New Culture Trends
              </span>
              <span className="text-white ml-2">®</span>
            </h3>
            <p className="text-gray-400 mb-6 max-w-sm">
              Premium streetwear for the bold and creative. Express yourself, set trends, define culture.
            </p>
            
            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="group w-10 h-10 rounded-full bg-[#2A2A3E] border border-white/10 flex items-center justify-center hover:border-[#00FFE5] transition-all duration-300"
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-[#00FFE5] transition-colors duration-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-[#00FFE5] transition-colors duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} New Culture Trends®. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-[#00FFE5] transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-[#00FFE5] transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-[#00FFE5] transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
