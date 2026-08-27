import React from "react";
import useDocumentTitle from "../shared/hooks/useDocumentTitle";
import {
  AboutHero,
  WhoWeAreSection,
  WhyChooseUsSection,
  ExperienceBanner,
  TestimonialsSection,
  AboutCtaSection,
} from "../features/about";

export default function About() {
  useDocumentTitle(
    "About Us – Industrial Plastic Manufacturing Since 2008",
    "Learn about Vishal Enterprise – a leading Gujarat-based recycled plastic manufacturer supplying pallets, granules, and crates to 200+ companies."
  );

  return (
    <main className="bg-[var(--bg-canvas,#F2F2F2)] dark:bg-[var(--bg-canvas,#0f141a)] text-slate-800 dark:text-[#F2F2F2] min-h-screen pb-16 overflow-x-hidden">
      <AboutHero />
      <WhoWeAreSection />
      <WhyChooseUsSection />
      <ExperienceBanner />
      <TestimonialsSection />
      <AboutCtaSection />
    </main>
  );
}

