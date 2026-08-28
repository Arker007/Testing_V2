import React from "react";
import useDocumentTitle from "../shared/hooks/useDocumentTitle";
import { useSite } from "../shared/context/SiteContext";
import ProcessSection from "../features/home/ProcessSection";
import { Icon } from "@iconify/react";
import CtaCard from "../shared/components/ui/CtaCard";
import Card from "../shared/components/ui/Card";
import QuoteButton from "../shared/components/QuoteButton";
import PageHero from "../shared/components/PageHero";

export default function Manufacturing() {
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
        tagIcon="solar:settings-linear"
        title="State-of-the-Art"
        titleAccent="Extrusion & Quality Control"
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
              <span className="badge-pill-accent">
                <Icon icon="solar:star-linear" className="w-4 h-4" />
                <span>Quality Standards</span>
              </span>
            </div>
            <h2 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">Precision & Performance Engineering</h2>
            <p className="text-[var(--text-secondary)] text-sm max-w-lg mx-auto mt-2">
              Every batch of recycled polymer undergoes rigorous testing to guarantee maximum structural integrity, chemical resistance, and load-bearing performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="feature-card-item">
              <div className="feature-icon-wrapper">
                <Icon icon="solar:cpu-linear" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Advanced Automation</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Computer-controlled thermal profiles and raw material blending ensure uniform structural density across all profiles, eliminating inner cavities or weaknesses.
              </p>
            </div>

            <div className="feature-card-item">
              <div className="feature-icon-wrapper">
                <Icon icon="solar:shield-check-linear" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">ISO 9001 Quality Check</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Standardized testing protocols verify flexural strength, tensile tolerance, UV stability, and stress-crack resistance under extreme industrial applications.
              </p>
            </div>

            <div className="feature-card-item">
              <div className="feature-icon-wrapper">
                <Icon icon="solar:bolt-linear" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Zero Chemical Toxins</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Unlike pressure-treated timber, our physical extrusion process requires no harmful chemical impregnations, rendering products perfectly safe for agricultural use.
              </p>
            </div>
          </div>

          {/* Plant & Quality Control Image Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="dark" className="group relative overflow-hidden min-h-[260px] flex flex-col justify-end p-6 border-0">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop"
                alt="High-precision polymer extrusion line"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              <div className="relative z-10">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 block">Extrusion Plant</span>
                <h4 className="text-lg font-extrabold text-white">Automated Extrusion Lines</h4>
                <p className="text-xs text-slate-300 mt-1">High-pressure extrusion shaping dense, void-free recycled plastic profiles.</p>
              </div>
            </Card>

            <Card variant="dark" className="group relative overflow-hidden min-h-[260px] flex flex-col justify-end p-6 border-0">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop"
                alt="Polymer testing and quality control laboratory"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              <div className="relative z-10">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 block">QA & Testing</span>
                <h4 className="text-lg font-extrabold text-white">Tensile & Load Testing Lab</h4>
                <p className="text-xs text-slate-300 mt-1">Batch testing for flexural modulus, impact resistance, and thermal tolerance.</p>
              </div>
            </Card>

            <Card variant="dark" className="group relative overflow-hidden min-h-[260px] flex flex-col justify-end p-6 border-0">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop"
                alt="Finished industrial pallet warehouse storage"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              <div className="relative z-10">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 block">Logistics Hub</span>
                <h4 className="text-lg font-extrabold text-white">Dispatch & Inventory Storage</h4>
                <p className="text-xs text-slate-300 mt-1">Ready-to-ship pallet inventory engineered for heavy industrial supply chains.</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 cta-section">
        <CtaCard
          badge="Government Certified Plant"
          badgeVariant="eyebrow"
          badgeIcon="solar:verified-check-linear"
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
