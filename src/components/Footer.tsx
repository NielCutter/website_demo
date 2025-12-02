export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-[#1D1D2C]">
      {/* Top gradient line */}
      <div 
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #00FFE5, #FF00B3, transparent)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {/* Legal Links Section */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              Legal
            </h3>
            <nav className="flex flex-col gap-3">
              <a 
                href="/irm" 
                className="text-gray-400 hover:text-[#00FFE5] transition-colors duration-300 text-sm"
              >
                Internal Redress Mechanism (IRM)
              </a>
              <a 
                href="/privacy-policy" 
                className="text-gray-400 hover:text-[#00FFE5] transition-colors duration-300 text-sm"
              >
                Privacy Policy
              </a>
              <a 
                href="/terms-of-service" 
                className="text-gray-400 hover:text-[#00FFE5] transition-colors duration-300 text-sm"
              >
                Terms of Service
              </a>
              <a 
                href="/cookie-policy" 
                className="text-gray-400 hover:text-[#00FFE5] transition-colors duration-300 text-sm"
              >
                Cookie Policy
              </a>
            </nav>
          </div>

          {/* Business Information Section */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              Registration
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-xs mb-1">DTI Registration No</p>
                <p className="text-gray-300 font-medium text-sm">7297002</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">BIR TIN</p>
                <p className="text-gray-300 font-medium text-sm">409-146-642-000</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Trademark Registration No</p>
                <p className="text-gray-300 font-medium text-sm">4/2025/00525886</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              Contact
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-xs mb-1">Email</p>
                <a 
                  href="mailto:info@newculturetrends.com"
                  className="text-gray-300 font-medium text-sm hover:text-[#00FFE5] transition-colors duration-300"
                >
                  info@newculturetrends.com
                </a>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Website</p>
                <a 
                  href="https://www.newculturetrends.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 font-medium text-sm hover:text-[#00FFE5] transition-colors duration-300"
                >
                  newculturetrends.com
                </a>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Business Name</p>
                <p className="text-gray-300 font-medium text-sm">NCTR Apparel Shop</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} New Culture Trends®. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
