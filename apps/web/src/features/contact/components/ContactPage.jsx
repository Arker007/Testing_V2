import React from "react";
import useDocumentTitle from "../../../shared/hooks/useDocumentTitle";
import { useSite } from "../../../shared/context/SiteContext";
import {
  ContactHero,
  ContactFormSection,
  ContactWorkflowSection,
  ContactFaqSection,
} from "../";

export default function ContactPage() {
  const { co } = useSite();
  useDocumentTitle(
    "Contact Us - Get a Quote or Ask a Question",
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
