export function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#050506] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">
          <span className="bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
            Cookie Policy
          </span>
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
          <p className="text-sm text-gray-400">Last updated: January 2025</p>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit a website. 
              They help websites remember your preferences and improve your browsing experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Cookies</h2>
            <p className="mb-3">We use cookies for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Types of Cookies We Use</h2>
            
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-white mb-2">Essential Cookies</h3>
              <p>
                These cookies are necessary for the website to function and cannot be switched off. 
                They include session management and security features.
              </p>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-semibold text-white mb-2">Analytics Cookies</h3>
              <p>
                We use analytics cookies to understand how visitors interact with our website, 
                which helps us improve our services and user experience.
              </p>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-semibold text-white mb-2">Functional Cookies</h3>
              <p>
                These cookies enable enhanced functionality and personalization, such as remembering 
                your language preference or login status.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Third-Party Cookies</h2>
            <p>
              Some cookies are placed by third-party services that appear on our pages, such as:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Google Analytics (website analytics)</li>
              <li>Payment processors (transaction processing)</li>
              <li>Social media platforms (sharing features)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Managing Cookies</h2>
            <p className="mb-3">You can control and manage cookies in several ways:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Browser settings: Most browsers allow you to refuse or delete cookies</li>
              <li>Cookie consent: You can accept or decline non-essential cookies when prompted</li>
              <li>Opt-out tools: Use industry opt-out tools for advertising cookies</li>
            </ul>
            <p className="mt-3">
              <strong>Note:</strong> Disabling cookies may affect website functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Cookie Duration</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Session Cookies:</strong> Temporary, deleted when you close your browser</li>
              <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until deleted</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. Changes will be posted on this page 
              with an updated "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Contact Us</h2>
            <p>
              For questions about our use of cookies, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> info@newculturetrends.com<br />
              <strong>Business Name:</strong> NCTR Apparel Shop<br />
              <strong>DTI Registration No:</strong> 7297002
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

