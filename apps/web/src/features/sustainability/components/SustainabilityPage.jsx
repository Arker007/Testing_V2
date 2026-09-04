import React from "react";
import useDocumentTitle from "../../../shared/hooks/useDocumentTitle";
import { useSite } from "../../../shared/context/SiteContext";
import { SustainabilitySection } from "../../home";
import { Icon } from "@iconify/react";
import { CtaCard, Card, QuoteButton, PageHero } from "@/shared/ui";

export default function SustainabilityPage() {
  const { c, co } = useSite();

  useDocumentTitle(
    c("meta_sustainability_title", `Sustainability & ESG | ${co("name", "VISHAL ENTERPRISE")}`),
    c(
      "meta_sustainability_desc",
      "Learn about our zero-maintenance, carbon-negative recycled plastic solutions that actively save forests and divert plastic from oceans."
    )
  );

  return (
    <main className="bg-[var(--bg-canvas,#F2F2F2)] dark:bg-[var(--bg-canvas,#0f141a)] text-slate-800 dark:text-[#F2F2F2] min-h-screen pb-16 overflow-x-hidden">
      {/* Page Hero */}
      <PageHero
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Sustainability" },
        ]}
        tag={c("sus_hero_tag", "Environmental Impact & Circular Economy")}
        tagIcon="solar:leaf-linear"
        title="Diverting Plastic Waste into"
        titleAccent="Enduring Infrastructure"
        description={c(
          "sus_hero_sub",
          "By diverting post-industrial polymer waste from oceans and landfills, we manufacture structural materials that last generations without requiring a single tree to be cut down."
        )}
      />


      {/* Embedded Sustainability Section */}
      <div className="relative z-10 pt-8 sm:pt-12">
        <SustainabilitySection />
      </div>

      {/* Core Sustainability Pillars */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-[var(--bg-canvas,#0f141a)] border-t border-b border-slate-200 dark:border-[rgba(242,242,242,0.12)]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="mb-4">
              <span className="badge-pill-accent">
                <Icon icon="solar:leaf-linear" className="w-4 h-4" />
                <span>Our Pillars</span>
              </span>
            </div>
            <h2 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">Our 3-Fold Eco-Commitment</h2>
            <p className="text-[var(--text-secondary)] text-sm max-w-lg mx-auto mt-2">
              We align our manufacturing values with sustainable development goals to support green building and responsible procurement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="feature-card-item">
              <div className="feature-icon-wrapper">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L4.5 12.5H7.5L3.5 17.5H8V22H16V17.5H20.5L16.5 12.5H19.5L12 2Z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Zero Deforestation</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Every ton of our recycled plastic lumber saves approximately 1.5 mature trees, preventing critical soil erosion and protecting vital biodiverse forest habitats.
              </p>
            </div>

            <div className="feature-card-item">
              <div className="feature-icon-wrapper">
                <Icon icon="solar:leaf-linear" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Carbon Avoidance</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Reprocessing existing polymer waste consumes up to 88% less energy and creates significantly lower greenhouse gas emissions compared to compiling virgin plastic.
              </p>
            </div>

            <div className="feature-card-item">
              <div className="feature-icon-wrapper">
                <Icon icon="solar:global-linear" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">100% Recyclable</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Our materials are engineered for true circularity. At the end of their multi-decade lifespans, they can be completely reground and remolded again.
              </p>
            </div>
          </div>

          {/* Sustainability and Eco-Advantage Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="dark" className="group relative overflow-hidden min-h-[260px] flex flex-col justify-end p-6 border-0">
              <img
                src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop"
                alt="Conserving forestry and nature reserves"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              <div className="relative z-10">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 block">Preservation</span>
                <span className="block text-lg font-extrabold text-white">Forestry Conservation</span>
                <p className="text-xs text-slate-200 mt-1">Replacing natural timber with robust polymer profiles to directly prevent deforestation.</p>
              </div>
            </Card>

            <Card variant="dark" className="group relative overflow-hidden min-h-[260px] flex flex-col justify-end p-6 border-0">
              <img
                src="https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1200&auto=format&fit=crop"
                alt="Recycled plastic polymers ready for manufacturing"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              <div className="relative z-10">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 block">Recycling Process</span>
                <span className="block text-lg font-extrabold text-white">Circular Upcycling</span>
                <p className="text-xs text-slate-200 mt-1">Cleaning and processing HDPE polymers to ensure strict structural compliance.</p>
              </div>
            </Card>

            <Card variant="dark" className="group relative overflow-hidden min-h-[260px] flex flex-col justify-end p-6 border-0">
              <img
                src="https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?q=80&w=1200&auto=format&fit=crop"
                alt="Green logistics and smart circular economy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              <div className="relative z-10">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 block">ESG Supply Chain</span>
                <span className="block text-lg font-extrabold text-white">Resource Loop Closure</span>
                <p className="text-xs text-slate-200 mt-1">Delivering highly reusable, circular shipping assets that satisfy international regulations.</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Corporate ESG Partnership CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 cta-section">
        <CtaCard
          badge="ESG Partnership"
          badgeVariant="eyebrow"
          badgeIcon="solar:handshake-linear"
          title="Partner on Circular Economy & Net-Zero Commitments"
          subtitle="Help your enterprise transition from conventional single-use packaging to circular, carbon-negative closed-loop recycled pallets and containers."
        >
          <QuoteButton
            to="/contact?source=sustainability"
            text="Explore ESG Solutions"
            className="shadow-md"
          />
        </CtaCard>
      </section>
    </main>
  );
}
