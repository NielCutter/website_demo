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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Copyright */}
        <div className="mb-6 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} All rights reserved.
          </p>
        </div>

        {/* Legal Links */}
        <div className="mb-6 flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
          <a 
            href="/irm" 
            className="text-gray-400 hover:text-[#00FFE5] transition-colors duration-300"
          >
            Internal Redress Mechanism (IRM)
          </a>
          <a 
            href="/privacy-policy" 
            className="text-gray-400 hover:text-[#00FFE5] transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <a 
            href="/terms-of-service" 
            className="text-gray-400 hover:text-[#00FFE5] transition-colors duration-300"
          >
            Terms of Service
          </a>
          <a 
            href="/cookie-policy" 
            className="text-gray-400 hover:text-[#00FFE5] transition-colors duration-300"
          >
            Cookie Policy
          </a>
        </div>

        {/* Business Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-center sm:text-left text-xs text-gray-500">
          <div>
            <span className="block mb-1">DTI Registration No:</span>
            <span className="text-gray-300 font-medium">7297002</span>
          </div>
          <div>
            <span className="block mb-1">BIR TIN:</span>
            <span className="text-gray-300 font-medium">409-146-642-000</span>
          </div>
          <div>
            <span className="block mb-1">Registered Name:</span>
            <span className="text-gray-300 font-medium">NCTR Apparel Shop</span>
          </div>
          <div>
            <span className="block mb-1">Trademark Reg. No:</span>
            <span className="text-gray-300 font-medium">4/2025/00525886</span>
          </div>
          <div>
            <span className="block mb-1">Trademark:</span>
            <span className="text-gray-300 font-medium">NCTR®</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
