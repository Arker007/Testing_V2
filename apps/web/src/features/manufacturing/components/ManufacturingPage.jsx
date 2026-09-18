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
      "Discover our advanced eco-friendly plastic recycling and high-pressure extrusion process. GST registered production."
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
        title={c("mfg_hero_title", "High-Pressure Polymer Extrusion & Quality Control")}
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
      <section className="py-16 px-4 bg-slate-50 dark:bg-[var(--bg-canvas,#0f141a)] border-t border-slate-200 dark:border-[rgba(242,242,242,0.12)]">
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
              <div className="feature-card-media">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
                  alt="Automated computerized extrusion and thermal processing"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="feature-card-top">
                <div className="feature-icon-wrapper">
                  <Icon icon="carbon:chip" className="w-6 h-6" />
                </div>
                <span className="feature-tag">Automated QA</span>
              </div>
              <h3>Advanced Automation</h3>
              <p>
                Computer-controlled thermal profiles and raw material blending ensure uniform structural density across all profiles, eliminating inner cavities or weaknesses.
              </p>
            </div>

            <div className="feature-card-item">
              <div className="feature-card-media">
                <img
                  src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop"
                  alt="Standardized testing protocols for structural tolerance"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="feature-card-top">
                <div className="feature-icon-wrapper">
                  <Icon icon="carbon:certificate" className="w-6 h-6" />
                </div>
                <span className="feature-tag">ISO 9001:2015</span>
              </div>
              <h3>Quality & GST Compliance Check</h3>
              <p>
                Standardized testing protocols verify flexural strength, tensile tolerance, UV stability, and stress-crack resistance under extreme industrial applications.
              </p>
            </div>

            <div className="feature-card-item">
              <div className="feature-card-media">
                <img
                  src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=800&auto=format&fit=crop"
                  alt="Non-toxic chemical-free agricultural recycled lumber"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="feature-card-top">
                <div className="feature-icon-wrapper">
                  <Icon icon="carbon:flash" className="w-6 h-6" />
                </div>
                <span className="feature-tag">RoHS Compliant</span>
              </div>
              <h3>Zero Chemical Toxins</h3>
              <p>
                Unlike pressure-treated timber, our physical extrusion process requires no harmful chemical impregnations, rendering products perfectly safe for agricultural use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 cta-section">
        <CtaCard
          badge="Industrial Manufacturing Facility"
          badgeVariant="brand"
          badgeIcon="carbon:enterprise"
          title="Schedule a Facility Inspection or Request Batch Specs"
          subtitle="Connect with our Ankleshwar plant engineers for detailed polymer test reports, custom extrusion capabilities, or factory audits."
        >
          <QuoteButton
            to="/contact?source=manufacturing"
            text="Request Facility Tour"
            className="shadow-sm"
          />
          <a
            href="tel:+919825125164"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[var(--radius-btn,8px)] border border-[var(--border-subtle)] bg-[var(--bg-surface-secondary)] hover:bg-[var(--bg-surface-tertiary)] hover:border-[var(--border-default)] text-[var(--text-primary)] text-sm font-bold transition-all shadow-2xs whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
          >
            <Icon icon="carbon:phone" className="w-4 h-4 text-[var(--brand-primary,#059669)] shrink-0" />
            <span>Call Plant Engineers</span>
          </a>
        </CtaCard>
      </section>
    </main>
  );
}
