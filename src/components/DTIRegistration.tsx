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
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "dti-registration-data";
    
    const structuredData = {
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

    script.text = JSON.stringify(structuredData);
    
    // Remove existing script if present
    const existing = document.getElementById("dti-registration-data");
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

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
    addMetaTag("dti-irm", registrationNumber);
    addMetaTag("business-name", businessName);
    addMetaTag("business-type", businessType);
    addMetaTag("bir-tin", birTin);
    addMetaTag("trademark-registration-number", trademarkNumber);
    addMetaTag("trademark-name", trademarkName);

    return () => {
      const scriptToRemove = document.getElementById("dti-registration-data");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [registrationNumber, businessName, businessAddress, businessType, registrationDate, birTin, trademarkNumber, trademarkName]);

  return null; // This component only adds metadata, no visible UI
}

