export const COMPANY_FIELDS = [
  {
    section: "Business Info",
    fields: [
      { key: "logo", label: "Company Logo", type: "image" },
      { key: "name", label: "Company Name", type: "text", placeholder: "VISHAL ENTERPRISE" },
      { key: "tagline", label: "Tagline", type: "text", placeholder: "Leading Polymer Supplier" },
      { key: "description", label: "Short Description", type: "textarea", placeholder: "Brief company overview…" },
      { key: "established", label: "Established Year", type: "text", placeholder: "2005" },
      { key: "gstin", label: "GSTIN", type: "text", placeholder: "27AAAPL1234B1Z9" },
    ],
  },
  {
    section: "Contact Details",
    fields: [
      { key: "phone", label: "Phone Number", type: "text", placeholder: "+91 98765 43210" },
      { key: "whatsapp", label: "WhatsApp Number", type: "text", placeholder: "+91 98765 43210" },
      { key: "email", label: "Email Address", type: "text", placeholder: "info@vishalenterprise.com" },
      { key: "address", label: "Full Address", type: "textarea", placeholder: "123, Industrial Estate, Mumbai…" },
      { key: "city", label: "City", type: "text", placeholder: "Mumbai" },
      { key: "state", label: "State", type: "text", placeholder: "Maharashtra" },
      { key: "pincode", label: "Pincode", type: "text", placeholder: "400001" },
      { key: "map_embed", label: "Google Maps Embed URL", type: "text", placeholder: "https://www.google.com/maps/embed?pb=..." },
    ],
  },
  {
    section: "Social & Links",
    fields: [
      { key: "website", label: "Website URL", type: "text", placeholder: "https://vishalenterprise.com" },
      { key: "linkedin", label: "LinkedIn URL", type: "text", placeholder: "https://linkedin.com/company/…" },
      { key: "instagram", label: "Instagram URL", type: "text", placeholder: "https://instagram.com/…" },
      { key: "youtube", label: "YouTube URL", type: "text", placeholder: "https://youtube.com/…" },
    ],
  },
];
