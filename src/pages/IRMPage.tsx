import { useEffect } from "react";
import { Mail, MessageCircle, ShoppingBag, Facebook, ExternalLink } from "lucide-react";

export function IRMPage() {
  useEffect(() => {
    // Add JSON-LD structured data for automatic DTI IRM detection
    // Multiple structured data objects for better platform detection
    const organizationData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "NCTR Apparel Shop",
      "legalName": "NCTR Apparel Shop",
      "identifier": {
        "@type": "PropertyValue",
        "name": "DTI Registration Number",
        "value": "7297002"
      },
      "url": "https://newculturetrends.com",
      "sameAs": [
        "https://shopee.ph/newculturetrends",
        "https://facebook.com/newculturetrends"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "email": "info@newculturetrends.com",
        "availableLanguage": ["English", "Filipino"],
        "areaServed": "PH"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Apparel Products",
        "itemListElement": []
      },
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "DTI-IRM",
          "value": "7297002"
        },
        {
          "@type": "PropertyValue",
          "name": "IRM URL",
          "value": "https://newculturetrends.com/irm"
        },
        {
          "@type": "PropertyValue",
          "name": "IRM Acknowledgment Time",
          "value": "24-48 hours"
        },
        {
          "@type": "PropertyValue",
          "name": "IRM Resolution Time",
          "value": "7-15 working days"
        },
        {
          "@type": "PropertyValue",
          "name": "Complaint Channels",
          "value": "Email, Website Contact Form, Facebook Messenger, Shopee Chat"
        }
      ]
    };

    // WebSite schema for platform detection
    const websiteData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "New Culture Trends",
      "url": "https://newculturetrends.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://newculturetrends.com/products?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "NCTR Apparel Shop",
        "identifier": "DTI-7297002"
      }
    };

    // OnlineStore schema for e-commerce platform detection
    const onlineStoreData = {
      "@context": "https://schema.org",
      "@type": "OnlineStore",
      "name": "New Culture Trends",
      "url": "https://newculturetrends.com",
      "description": "Online apparel store - Streetwear and fashion products",
      "priceRange": "$$",
      "paymentAccepted": "Credit Card, Debit Card, GCash, PayMaya, Shopee Pay",
      "currenciesAccepted": "PHP",
      "areaServed": {
        "@type": "Country",
        "name": "Philippines"
      },
      "seller": {
        "@type": "Organization",
        "name": "NCTR Apparel Shop",
        "identifier": {
          "@type": "PropertyValue",
          "name": "DTI Registration Number",
          "value": "7297002"
        }
      }
    };

    // Create scripts for each structured data
    const scripts = [
      { id: "dti-irm-organization", data: organizationData },
      { id: "dti-irm-website", data: websiteData },
      { id: "dti-irm-onlinestore", data: onlineStoreData }
    ];

    scripts.forEach(({ id, data }) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      script.text = JSON.stringify(data);
      
      const existing = document.getElementById(id);
      if (existing) {
        existing.remove();
      }
      
      document.head.appendChild(script);
    });

    // Add meta tags for automatic DTI IRM detection
    const addMetaTag = (name: string, content: string, property?: string) => {
      const selector = property 
        ? `meta[property="${name}"]` 
        : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement("meta");
        if (property) {
          meta.setAttribute("property", name);
        } else {
          meta.setAttribute("name", name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // DTI IRM specific meta tags
    addMetaTag("dti-irm", "yes");
    addMetaTag("dti-irm-url", "https://newculturetrends.com/irm");
    addMetaTag("dti-irm-acknowledgment", "24-48 hours");
    addMetaTag("dti-irm-resolution", "7-15 working days");
    addMetaTag("dti-registration-number", "7297002");
    addMetaTag("dti-business-name", "NCTR Apparel Shop");
    addMetaTag("dti-platform-type", "e-commerce");
    addMetaTag("dti-platform-url", "https://newculturetrends.com");
    
    // Open Graph and Twitter Card for better detection
    addMetaTag("og:type", "website", true);
    addMetaTag("og:title", "Internal Redress Mechanism (IRM) - NCTR Apparel Shop", true);
    addMetaTag("og:url", "https://newculturetrends.com/irm", true);
    addMetaTag("og:description", "DTI-compliant Internal Redress Mechanism Policy for NCTR Apparel Shop", true);
    
    // Add canonical link
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://newculturetrends.com/irm");

    return () => {
      // Clean up all structured data scripts
      ["dti-irm-organization", "dti-irm-website", "dti-irm-onlinestore"].forEach(id => {
        const scriptToRemove = document.getElementById(id);
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <article itemScope itemType="https://schema.org/Organization" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <meta itemProp="name" content="NCTR Apparel Shop" />
        <meta itemProp="identifier" content="DTI-7297002" />
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" itemProp="name">
            Internal Redress Mechanism (IRM) Policy
          </h1>
          <p className="text-lg text-gray-600">
            NCTR Apparel Shop - DTI Registered Business No. 7297002
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last Updated: January 2025
          </p>
        </header>

        {/* Business Platform URLs Section - MUST BE VISIBLE */}
        <section className="mb-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Official Business Platform Links
          </h2>
          <p className="text-gray-700 mb-4">
            The following are our official business platforms registered with DTI:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <ExternalLink className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-gray-900">Website:</strong>{" "}
                <a 
                  href="https://newculturetrends.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://newculturetrends.com
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <ShoppingBag className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-gray-900">Shopee Store:</strong>{" "}
                <a 
                  href="https://shopee.ph/newculturetrends" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://shopee.ph/newculturetrends
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Facebook className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-gray-900">Facebook Page:</strong>{" "}
                <a 
                  href="https://facebook.com/newculturetrends" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://facebook.com/newculturetrends
                </a>
              </div>
            </li>
          </ul>
        </section>

        {/* Complaint Channels */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            1. Complaint Channels
          </h2>
          <p className="text-gray-700 mb-4">
            Customers may file complaints through any of the following channels:
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-gray-900 block mb-1">Email:</strong>
                <a 
                  href="mailto:info@newculturetrends.com" 
                  className="text-blue-600 hover:underline"
                >
                  info@newculturetrends.com
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <ExternalLink className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-gray-900 block mb-1">Website Contact Form:</strong>
                <a 
                  href="https://newculturetrends.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit our website contact page
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <MessageCircle className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-gray-900 block mb-1">Facebook Messenger:</strong>
                <a 
                  href="https://facebook.com/newculturetrends" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Message us on Facebook
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-gray-900 block mb-1">Shopee Chat:</strong>
                <a 
                  href="https://shopee.ph/newculturetrends" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Contact us via Shopee chat
                </a>
              </div>
            </li>
          </ul>
        </section>

        {/* Acknowledgment Time */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            2. Acknowledgment Time
          </h2>
          <p className="text-gray-700 mb-2">
            We commit to acknowledge receipt of your complaint within:
          </p>
          <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <p className="text-lg font-semibold text-gray-900">
              24-48 hours from receipt of complaint
            </p>
          </div>
          <p className="text-gray-600 mt-3 text-sm">
            You will receive an acknowledgment email or message confirming that we have received your complaint and are processing it.
          </p>
        </section>

        {/* Resolution Time */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            3. Resolution Time
          </h2>
          <p className="text-gray-700 mb-2">
            We commit to resolve your complaint within:
          </p>
          <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
            <p className="text-lg font-semibold text-gray-900">
              7-15 working days from acknowledgment
            </p>
          </div>
          <p className="text-gray-600 mt-3 text-sm">
            Working days exclude weekends and Philippine national holidays. We will provide regular updates on the status of your complaint.
          </p>
        </section>

        {/* Required Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            4. Required Information from Customer
          </h2>
          <p className="text-gray-700 mb-4">
            To process your complaint efficiently, please provide the following information:
          </p>
          <ul className="space-y-2 list-disc list-inside text-gray-700">
            <li><strong>Full Name:</strong> Your complete name as it appears on your order</li>
            <li><strong>Order Number:</strong> The order number or transaction ID from your purchase</li>
            <li><strong>Description of Issue:</strong> Detailed description of the problem or complaint</li>
            <li><strong>Proof/Evidence:</strong> Photos, screenshots, or documents supporting your complaint</li>
            <li><strong>Contact Information:</strong> Email address and/or phone number where we can reach you</li>
            <li><strong>Preferred Resolution:</strong> Your preferred outcome (refund, replacement, etc.)</li>
          </ul>
        </section>

        {/* Possible Resolutions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            5. Possible Resolutions
          </h2>
          <p className="text-gray-700 mb-4">
            Depending on the nature of your complaint, we may offer the following resolutions:
          </p>
          <ul className="space-y-3">
            <li className="p-4 bg-gray-50 rounded-lg">
              <strong className="text-gray-900">Full Refund:</strong> Complete refund of the purchase amount
            </li>
            <li className="p-4 bg-gray-50 rounded-lg">
              <strong className="text-gray-900">Partial Refund:</strong> Partial refund for defective or incorrect items
            </li>
            <li className="p-4 bg-gray-50 rounded-lg">
              <strong className="text-gray-900">Replacement:</strong> Replacement of defective or incorrect items
            </li>
            <li className="p-4 bg-gray-50 rounded-lg">
              <strong className="text-gray-900">Exchange:</strong> Exchange for a different size, color, or item
            </li>
            <li className="p-4 bg-gray-50 rounded-lg">
              <strong className="text-gray-900">Store Credit:</strong> Credit for future purchases
            </li>
            <li className="p-4 bg-gray-50 rounded-lg">
              <strong className="text-gray-900">Repair/Service:</strong> Repair or service for damaged items (if applicable)
            </li>
          </ul>
        </section>

        {/* Escalation to DTI */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            6. Escalation to DTI E-Commerce Bureau
          </h2>
          <p className="text-gray-700 mb-4">
            If you are not satisfied with our resolution or if we fail to respond within the committed timeframes, you may escalate your complaint to:
          </p>
          <div className="p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded">
            <p className="font-semibold text-gray-900 mb-2">DTI E-Commerce Bureau</p>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> ecommerce@dti.gov.ph
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Website:</strong>{" "}
              <a 
                href="https://www.dti.gov.ph" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://www.dti.gov.ph
              </a>
            </p>
            <p className="text-gray-700">
              <strong>Hotline:</strong> DTI Direct (1-384) or (02) 751-3330
            </p>
          </div>
          <p className="text-gray-600 mt-4 text-sm">
            Before escalating to DTI, please ensure you have:
          </p>
          <ul className="list-disc list-inside text-gray-600 text-sm mt-2 space-y-1">
            <li>Filed a complaint with us first</li>
            <li>Received our response (or waited the full acknowledgment and resolution periods)</li>
            <li>Documented all communications and evidence</li>
          </ul>
        </section>

        {/* Data Privacy */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            7. Data Privacy Compliance
          </h2>
          <p className="text-gray-700 mb-4">
            NCTR Apparel Shop is committed to protecting your personal information in accordance with the Data Privacy Act of 2012 (Republic Act No. 10173).
          </p>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">How We Use Your Information:</h3>
            <ul className="space-y-2 text-gray-700 text-sm list-disc list-inside">
              <li>We collect personal information (name, email, phone, order details) solely for the purpose of processing and resolving your complaint</li>
              <li>Your information will only be shared with authorized personnel involved in complaint resolution</li>
              <li>We do not sell, rent, or share your personal information with third parties for marketing purposes</li>
              <li>Your information will be retained only for as long as necessary to resolve your complaint and comply with legal obligations</li>
            </ul>
            <p className="text-gray-700 mt-4 text-sm">
              <strong>Your Rights:</strong> You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at{" "}
              <a 
                href="mailto:info@newculturetrends.com" 
                className="text-blue-600 hover:underline"
              >
                info@newculturetrends.com
              </a>
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Contact Information
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Business Name:</strong> NCTR Apparel Shop
            </p>
            <p>
              <strong>DTI Registration No:</strong> 7297002
            </p>
            <p>
              <strong>BIR TIN:</strong> 409-146-642-000
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a 
                href="mailto:info@newculturetrends.com" 
                className="text-blue-600 hover:underline"
              >
                info@newculturetrends.com
              </a>
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a 
                href="https://newculturetrends.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://newculturetrends.com
              </a>
            </p>
          </div>
        </section>

        {/* Footer Note */}
        <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>
            This IRM Policy is compliant with DTI Department Administrative Order No. 02, Series of 2021.
          </p>
          <p className="mt-2">
            For questions about this policy, please contact us at{" "}
            <a 
              href="mailto:info@newculturetrends.com" 
              className="text-blue-600 hover:underline"
            >
              info@newculturetrends.com
            </a>
          </p>
        </footer>
      </article>
    </div>
  );
}

