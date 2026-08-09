import React from "react";
import useDocumentTitle from "../shared/hooks/useDocumentTitle";
import { useSite } from "../shared/context/SiteContext";
import ContactHero from "../features/contact/ContactHero";
import ContactFormSection from "../features/contact/ContactFormSection";
import ContactWorkflowSection from "../features/contact/ContactWorkflowSection";
import ContactFaqSection from "../features/contact/ContactFaqSection";

export default function Contact() {
  const { co } = useSite();
  useDocumentTitle(
    "Contact Us - Fast B2B Quotes & Product Inquiry",
    `Contact ${co("name", "VISHAL ENTERPRISE")} in Ankleshwar, Gujarat for quick quotes on recycled plastic pallets, granules, crates, and custom manufacturing.`
  );

  return (
    <main>
      <ContactHero />
      <ContactFormSection />
      <ContactWorkflowSection />
      <ContactFaqSection />
    </main>
  );
}
