import { COMPANY_FIELDS } from "./companyFields.constants";
import { CMS_FIELDS } from "./cmsFields.constants";

export { COMPANY_FIELDS, CMS_FIELDS };

export const TAB_SECTIONS = {
  "Home Page": [
    "Homepage Hero",
    "Homepage Trusted By",
    "Homepage Categories",
    "Homepage Why Us",
    "Homepage Industries",
    "Homepage Testimonials",
    "Homepage CTA Banner",
    "Footer"
  ],
  "Manufacturing Page": [
    "Homepage Process"
  ],
  "Sustainability Page": [
    "Homepage Sustainability"
  ],
  "About Page": [
    "About Hero",
    "About Mission & History",
    "About Certifications",
    "About Testimonials",
    "About CTA"
  ],
  "Products Page": ["Products Page"],
  "Contact Page": ["Contact Hero", "Contact Info & Map"]
};

export const SECTION_TOGGLE_KEYS = {
  "Homepage Hero": "show_hero",
  "Homepage Trusted By": "show_trusted_by",
  "Homepage Categories": "show_categories",
  "Homepage Process": "show_process",
  "Homepage Industries": "show_industries",
  "Homepage Why Us": "show_why_us",
  "Homepage Sustainability": "show_home_about",
  "Homepage Testimonials": "show_home_testimonials",
  "Homepage CTA Banner": "show_home_cta",
  "About Hero": "about_hero_enabled",
  "About Mission & History": "about_bento_enabled",
  "About Certifications": "about_cert_enabled",
  "About Testimonials": "about_testimonials_enabled",
  "Contact Hero": "show_contact_hero",
  "Contact Info & Map": "show_contact_info",
  "About CTA": "about_cta_enabled",
};

export const SECTION_DISPLAY_NAMES = {
  "Business Info": "Company Profile",
  "Contact Details": "Contact Details",
  "Social & Links": "Social Links",
  "Homepage Hero": "Hero Banner",
  "Homepage Trusted By": "Trusted By Brands",
  "Homepage Categories": "Product Categories",
  "Homepage Process": "Manufacturing Process",
  "Homepage Industries": "Industries Served",
  "Homepage Why Us": "Why Choose Us",
  "Homepage Sustainability": "Sustainability Impact",
  "Homepage Testimonials": "Testimonials",
  "Homepage CTA Banner": "CTA Banner",
  "Footer": "Footer Copy",
  "About Hero": "Hero Header",
  "About Mission & History": "Mission & Vision",
  "About Certifications": "Quality Standards & Certifications",
  "About Testimonials": "Client Testimonials",
  "About CTA": "About Page Bottom CTA",
  "Products Page": "Products Catalog Hero Banner",
  "Contact Hero": "Hero Header",
  "Contact Info & Map": "Contact Details & Location Map"
};
