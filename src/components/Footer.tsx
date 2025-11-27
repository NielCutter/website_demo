import { useState } from "react";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" }
  ];

  const footerLinks = [
    {
      title: "Utility Pages",
      links: [
        { label: "FAQ", href: "#" },
        { label: "Shipping Info", href: "#" },
        { label: "Returns", href: "#" },
        { label: "Terms & Privacy", href: "#" }
      ]
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
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-4">Social Media</h4>
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

            {/* Newsletter Signup */}
            <div>
              <h4 className="text-white font-semibold mb-4">Newsletter Signup</h4>
              <p className="text-gray-400 text-sm mb-3">
                Stay updated with our latest drops and exclusive offers.
              </p>
              {submitted ? (
                <div className="px-4 py-2 rounded-lg bg-[#00FFE5]/10 border border-[#00FFE5]/20 text-[#00FFE5] text-sm">
                  Thanks for subscribing!
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!email.trim() || submitting) return;

                    setSubmitting(true);
                    try {
                      await addDoc(collection(db, "newsletter"), {
                        email: email.trim().toLowerCase(),
                        createdAt: serverTimestamp(),
                      });
                      setSubmitted(true);
                      setEmail("");
                      setTimeout(() => setSubmitted(false), 3000);
                    } catch (error) {
                      console.error("Error subscribing:", error);
                      alert("Failed to subscribe. Please try again.");
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFE5] transition-colors text-sm"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] font-semibold hover:opacity-90 transition-opacity text-sm disabled:opacity-50"
                  >
                    {submitting ? "..." : "Subscribe"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-[#00FFE5] transition-colors duration-300 text-sm"
                    >
                      {link.label}
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
