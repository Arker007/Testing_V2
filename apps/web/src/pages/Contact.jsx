import React from "react";
import useDocumentTitle from "../shared/hooks/useDocumentTitle";
import { useSite } from "../shared/context/SiteContext";
import {
  ContactHero,
  ContactFormSection,
  ContactWorkflowSection,
  ContactFaqSection,
} from "../features/contact";

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
