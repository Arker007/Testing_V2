import React from "react";
import useDocumentTitle from "../shared/hooks/useDocumentTitle";
import AboutHero from "../features/about/AboutHero";
import WhoWeAreSection from "../features/about/WhoWeAreSection";
import WhyChooseUsSection from "../features/about/WhyChooseUsSection";
import ExperienceBanner from "../features/about/ExperienceBanner";
import TestimonialsSection from "../features/about/TestimonialsSection";
import AboutCtaSection from "../features/about/AboutCtaSection";

export default function About() {
  useDocumentTitle(
    "About Us – Industrial Plastic Manufacturing Since 2008",
    "Learn about Vishal Enterprise – a leading Gujarat-based recycled plastic manufacturer supplying pallets, granules, and crates to 200+ companies."
  );

  return (
    <main className="bg-[#FAFBFD] text-slate-800 min-h-screen pb-12 overflow-x-hidden">
      <AboutHero />
      <WhoWeAreSection />
      <WhyChooseUsSection />
      <ExperienceBanner />
      <TestimonialsSection />
      <AboutCtaSection />
    </main>
  );
}
