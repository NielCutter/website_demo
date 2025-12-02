import { useEffect } from "react";

interface DTIRegistrationProps {
  registrationNumber?: string;
  businessName?: string;
  businessAddress?: string;
  businessType?: string;
  registrationDate?: string;
  birTin?: string;
  trademarkNumber?: string;
  trademarkName?: string;
}

export function DTIRegistration({
  registrationNumber = "7297002",
  businessName = "NCTR Apparel Shop",
  businessAddress = "Philippines",
  businessType = "Sole Proprietorship",
  registrationDate = "2024-01-01",
  birTin = "409-146-642-000",
  trademarkNumber = "4/2025/00525886",
  trademarkName = "New Culture Trends",
}: DTIRegistrationProps) {
  useEffect(() => {
    // Add JSON-LD structured data for DTI detection
    // Organization data
    const organizationData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": businessName,
      "legalName": businessName,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "PH",
        "addressLocality": businessAddress,
      },
      "identifier": {
        "@type": "PropertyValue",
        "name": "DTI Registration Number",
        "value": registrationNumber,
      },
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "DTI-IRM",
          "value": registrationNumber,
        },
        {
          "@type": "PropertyValue",
          "name": "IRM URL",
          "value": `${window.location.origin}/irm`,
        },
        {
          "@type": "PropertyValue",
          "name": "IRM Acknowledgment Time",
          "value": "24-48 hours",
        },
        {
          "@type": "PropertyValue",
          "name": "IRM Resolution Time",
          "value": "7-15 working days",
        },
        {
          "@type": "PropertyValue",
          "name": "BIR TIN",
          "value": birTin,
        },
        {
          "@type": "PropertyValue",
          "name": "Business Type",
          "value": businessType,
        },
        {
          "@type": "PropertyValue",
          "name": "Registration Date",
          "value": registrationDate,
        },
        {
          "@type": "PropertyValue",
          "name": "Trademark Registration Number",
          "value": trademarkNumber,
        },
        {
          "@type": "PropertyValue",
          "name": "Trademark Name",
          "value": trademarkName,
        },
      ],
      "brand": {
        "@type": "Brand",
        "name": trademarkName,
        "identifier": trademarkNumber,
      },
      "url": window.location.origin,
    };

    // WebSite schema for platform detection
    const websiteData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "New Culture Trends",
      "url": window.location.origin,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${window.location.origin}/products?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": businessName,
        "identifier": `DTI-${registrationNumber}`
      }
    };

    // OnlineStore schema for e-commerce platform detection
    const onlineStoreData = {
      "@context": "https://schema.org",
      "@type": "OnlineStore",
      "name": "New Culture Trends",
      "url": window.location.origin,
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
        "name": businessName,
        "identifier": {
          "@type": "PropertyValue",
          "name": "DTI Registration Number",
          "value": registrationNumber
        }
      }
    };

    // Create multiple scripts for better detection
    const scripts = [
      { id: "dti-organization", data: organizationData },
      { id: "dti-website", data: websiteData },
      { id: "dti-onlinestore", data: onlineStoreData }
    ];

    scripts.forEach(({ id, data }) => {
      const scriptEl = document.createElement("script");
      scriptEl.type = "application/ld+json";
      scriptEl.id = id;
      scriptEl.text = JSON.stringify(data);
      
      const existing = document.getElementById(id);
      if (existing) {
        existing.remove();
      }
      
      document.head.appendChild(scriptEl);
    });

    // Add meta tags for DTI detection
    const addMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    addMetaTag("dti-registration-number", registrationNumber);
    addMetaTag("dti-irm", "yes");
    addMetaTag("dti-irm-url", `${window.location.origin}/irm`);
    addMetaTag("dti-irm-acknowledgment", "24-48 hours");
    addMetaTag("dti-irm-resolution", "7-15 working days");
    addMetaTag("business-name", businessName);
    addMetaTag("business-type", businessType);
    addMetaTag("bir-tin", birTin);
    addMetaTag("trademark-registration-number", trademarkNumber);
    addMetaTag("trademark-name", trademarkName);
    addMetaTag("dti-platform-type", "e-commerce");
    addMetaTag("dti-platform-url", window.location.origin);

    return () => {
      // Clean up all structured data scripts
      ["dti-organization", "dti-website", "dti-onlinestore"].forEach(id => {
        const scriptToRemove = document.getElementById(id);
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      });
    };
  }, [registrationNumber, businessName, businessAddress, businessType, registrationDate, birTin, trademarkNumber, trademarkName]);

  return null; // This component only adds metadata, no visible UI
}

