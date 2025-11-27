import { useState } from "react";
import { Instagram, Facebook, ShoppingBag, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/newculturetrends", label: "Facebook" },
    { icon: ShoppingBag, href: "https://shopee.ph/newculturetrends", label: "Shopee" },
    { icon: Instagram, href: "#", label: "Instagram" }
  ];

  const footerLinks = [
    {
      title: "Utility Pages",
      links: [
        { label: "Shipping Info", href: "#" },
        { label: "Returns", href: "#" },
        { label: "Terms & Privacy", href: "#" }
      ]
    }
  ];

  const faqItems = [
    {
      question: "Sizes",
      answer: "Our products are available in a range of sizes. Please refer to our size guide for detailed measurements. All items are designed with a modern fit that's true to size."
    },
    {
      question: "Shipping",
      answer: "We ship worldwide! Standard shipping typically takes 5-7 business days. Express shipping options are available at checkout. Free shipping on orders over $100."
    },
    {
      question: "Wash care",
      answer: "To maintain the quality of your pieces, we recommend washing in cold water on a gentle cycle and air drying. Avoid bleach and ironing directly on prints. Check the care label on each item for specific instructions."
    },
    {
      question: "Preorders",
      answer: "Preorder items are limited edition pieces that are made to order. Preorder items typically ship within 4-6 weeks. You'll receive email updates on your order status."
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-12">
          {/* Brand section */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
                New Culture Trends
              </span>
              <span className="text-white ml-2">®</span>
            </h3>
            <p className="text-gray-400 mb-6 max-w-sm text-sm sm:text-base">
              Lead the wave / Define the culture.
            </p>
            
            {/* Social links */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">Social Media</h4>
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
          </div>

          {/* FAQ Button */}
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">Support</h4>
            <button
              onClick={() => setFaqModalOpen(true)}
              className="w-full px-6 py-3 rounded-lg border border-white/10 bg-black/20 text-white hover:bg-white/5 hover:border-[#00FFE5] transition-all duration-300 text-left"
            >
              <span className="font-medium text-sm">FAQ</span>
            </button>
          </div>

          {/* Links sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="md:col-span-1">
              <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-[#00FFE5] transition-colors duration-300 text-sm block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ Modal */}
        <Dialog open={faqModalOpen} onOpenChange={setFaqModalOpen}>
          <DialogContent className="bg-[#0b0b0f] border-white/10 text-white max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-0">
            <DialogHeader className="p-6 border-b border-white/10">
              <DialogTitle className="text-2xl sm:text-3xl font-bold">
                <span className="bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
                  People always ask
                </span>
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {faqItems.map((faq) => (
                <div
                  key={faq.question}
                  className="border border-white/10 rounded-lg bg-black/20 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.question ? null : faq.question)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="text-white font-medium text-sm sm:text-base">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                        openFaq === faq.question ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === faq.question && (
                    <div className="px-4 pb-3">
                      <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Bottom section */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-gray-500 text-sm order-2 sm:order-1">
              © {currentYear} New Culture Trends®. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-sm order-1 sm:order-2">
              <a href="#" className="text-gray-500 hover:text-[#00FFE5] transition-colors duration-300 whitespace-nowrap">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-[#00FFE5] transition-colors duration-300 whitespace-nowrap">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-[#00FFE5] transition-colors duration-300 whitespace-nowrap">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
