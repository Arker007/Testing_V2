import React from "react";
import useDocumentTitle from "../../../shared/hooks/useDocumentTitle";
import { useSite } from "../../../shared/context/SiteContext";
import { ProcessSection } from "../../home";
import { Icon } from "@iconify/react";
import { CtaCard, QuoteButton, PageHero, Badge } from "@/shared/ui";

export default function ManufacturingPage() {
  const { c, co } = useSite();

  useDocumentTitle(
    c("meta_manufacturing_title", `Manufacturing Process | ${co("name", "VISHAL ENTERPRISE")}`),
    c(
      "meta_manufacturing_desc",
      "Discover our advanced eco-friendly plastic recycling and high-pressure extrusion process. ISO 9001:2015 certified production."
    )
  );

  return (
    <main className="bg-[var(--bg-canvas,#F2F2F2)] dark:bg-[var(--bg-canvas,#0f141a)] text-slate-800 dark:text-[#F2F2F2] min-h-screen pb-16 overflow-x-hidden">
      {/* Page Hero */}
      <PageHero
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Manufacturing" },
        ]}
        tag={c("mfg_hero_tag", "High-Precision Polymer Processing")}
        tagIcon="carbon:settings"
        title="High-Pressure Polymer Extrusion & Quality Control"
        description={c(
          "mfg_hero_sub",
          "Our Gujarat-based manufacturing facility utilizes advanced automated polymer sorting, decontamination, and high-pressure extrusion to convert waste into durable structural profiles."
        )}
      />


      {/* Embedded Process Section */}
      <div className="relative z-10 mt-0 pt-0">
        <ProcessSection />
      </div>

      {/* Manufacturing Advantages / Tech Stats */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-[var(--bg-canvas,#0f141a)] border-t border-b border-slate-200 dark:border-[rgba(242,242,242,0.12)]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="mb-4">
              <Badge variant="eyebrow" size="lg" icon="carbon:star">
                Quality Standards
              </Badge>
            </div>
            <h2 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">Precision & Performance Engineering</h2>
            <p className="text-[var(--text-secondary)] text-sm max-w-lg mx-auto mt-2">
              Every batch of recycled polymer undergoes rigorous testing to guarantee maximum structural integrity, chemical resistance, and load-bearing performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card-item">
              <div className="feature-icon-wrapper">
                <Icon icon="carbon:chip" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Advanced Automation</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Computer-controlled thermal profiles and raw material blending ensure uniform structural density across all profiles, eliminating inner cavities or weaknesses.
              </p>
            </div>

            <div className="feature-card-item">
              <div className="feature-icon-wrapper">
                <Icon icon="carbon:security" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">ISO 9001 Quality Check</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Standardized testing protocols verify flexural strength, tensile tolerance, UV stability, and stress-crack resistance under extreme industrial applications.
              </p>
            </div>

            <div className="feature-card-item">
              <div className="feature-icon-wrapper">
                <Icon icon="carbon:flash" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Zero Chemical Toxins</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Unlike pressure-treated timber, our physical extrusion process requires no harmful chemical impregnations, rendering products perfectly safe for agricultural use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 cta-section">
        <CtaCard
          badge="Government Certified Plant"
          badgeVariant="eyebrow"
          badgeIcon="carbon:certificate"
          title="Schedule a Facility Inspection or Request Batch Specs"
          subtitle="Connect with our Ankleshwar plant engineers for detailed polymer test certificates, custom extrusion capabilities, or factory audits."
        >
          <QuoteButton
            to="/contact?source=manufacturing"
            text="Request Facility Tour"
            className="shadow-md"
          />
        </CtaCard>
      </section>
    </main>
  );
}
