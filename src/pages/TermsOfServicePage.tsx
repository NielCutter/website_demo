export function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#050506] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">
          <span className="bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
            Terms of Service
          </span>
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
          <p className="text-sm text-gray-400">Last updated: January 2025</p>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using newculturetrends.com, you accept and agree to be bound by these Terms of Service. 
              If you do not agree, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Products and Pricing</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All prices are in Philippine Peso (PHP) unless otherwise stated</li>
              <li>We reserve the right to change prices at any time</li>
              <li>Product images are for illustration purposes and may vary from actual products</li>
              <li>We reserve the right to limit quantities or refuse orders</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Orders and Payment</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All orders are subject to product availability</li>
              <li>We accept major credit cards, debit cards, GCash, PayMaya, and Shopee Pay</li>
              <li>Payment must be received before order processing</li>
              <li>Order confirmation will be sent via email</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Shipping and Delivery</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We ship within the Philippines and internationally</li>
              <li>Shipping costs will be calculated at checkout</li>
              <li>Delivery times are estimates and not guaranteed</li>
              <li>Risk of loss passes to you upon delivery</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Returns and Refunds</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Items must be returned within 7 days of delivery</li>
              <li>Items must be unworn, unwashed, and in original packaging</li>
              <li>Refunds will be processed within 5-7 business days</li>
              <li>Shipping costs are non-refundable unless item is defective</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Intellectual Property</h2>
            <p>
              All content on this website, including logos, designs, text, and images, is the property of 
              New Culture Trends® and is protected by copyright and trademark laws. Unauthorized use is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, New Culture Trends shall not be liable for any indirect, 
              incidental, special, or consequential damages arising from your use of our website or products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Republic of the Philippines. 
              Any disputes shall be subject to the exclusive jurisdiction of the courts of the Philippines.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Contact Information</h2>
            <p>
              For questions about these Terms, please contact us at:
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

