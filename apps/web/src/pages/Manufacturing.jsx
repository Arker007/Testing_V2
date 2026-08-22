import React from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import useDocumentTitle from "../shared/hooks/useDocumentTitle";
import { useSite } from "../shared/context/SiteContext";
import ProcessSection from "../features/home/ProcessSection";
import { Icon } from "@iconify/react";
import styles from "./About.module.css";
import Card from "../shared/components/ui/Card";
import QuoteButton from "../shared/components/QuoteButton";

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
    <main className="bg-[var(--bg-page)] text-slate-800 dark:text-slate-200 min-h-screen pb-16 overflow-x-hidden">
      {/* Page Hero */}
      <header className={styles.hero}>
        <div className={styles.heroBg} />
        <div className="container relative z-10">
          {/* Breadcrumb Navigation */}
          <Motion.nav
            className="flex items-center gap-2 text-sm font-medium text-white/75 mb-5"
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" className="inline-flex items-center gap-1.5 text-white/90 hover:text-[#77D986] transition-colors">
              <Icon icon="solar:home-2-linear" className="w-3.5 h-3.5 opacity-80 shrink-0" />
              <span>Home</span>
            </Link>
            <Icon icon="solar:alt-arrow-right-linear" className="w-3 h-3 text-white/40 shrink-0" />
            <span className="text-[#77D986] font-semibold">Manufacturing</span>
          </Motion.nav>

          <div className="flex flex-col">
            <Motion.div
              className="flex flex-col"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <div className="mb-4">
                <span className="badge-pill-accent">
                  <Icon icon="solar:settings-linear" className="w-4 h-4" />
                  <span>{c("mfg_hero_tag", "High-Precision Polymer Processing")}</span>
                </span>
              </div>

              <h1 className="font-[var(--font-display,inherit)] text-[clamp(2rem,4.5vw,3rem)] font-extrabold text-white tracking-tight my-3.5 leading-[1.2]">
                State-of-the-Art <span className="text-[#4FC36D]">Extrusion & Quality Control</span>
              </h1>
              <p className="text-white/85 text-base sm:text-lg max-w-[720px] leading-[1.7] m-0">
                {c(
                  "mfg_hero_sub",
                  "Our Gujarat-based manufacturing facility utilizes advanced automated polymer sorting, decontamination, and high-pressure extrusion to convert waste into durable structural profiles."
                )}
              </p>
            </Motion.div>
          </div>
        </div>
      </header>

      {/* Embedded Process Section */}
      <div className="relative z-10 mt-0 pt-0">
        <ProcessSection />
      </div>

      {/* Manufacturing Advantages / Tech Stats */}
      <section className="py-16 px-4 bg-white dark:bg-[#0F141A] border-t border-b border-slate-100 dark:border-white/10">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="mb-4">
              <span className="badge-pill-accent">
                <Icon icon="solar:star-linear" className="w-4 h-4" />
                <span>Quality Standards</span>
              </span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Precision & Performance Engineering</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm max-w-lg mx-auto mt-2">
              Every batch of recycled polymer undergoes rigorous testing to guarantee maximum structural integrity, chemical resistance, and load-bearing performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card-item">
              <div className="feature-icon-wrapper">
                <Icon icon="solar:cpu-linear" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Advanced Automation</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Computer-controlled thermal profiles and raw material blending ensure uniform structural density across all profiles, eliminating inner cavities or weaknesses.
              </p>
            </div>

            <div className="feature-card-item">
              <div className="feature-icon-wrapper">
                <Icon icon="solar:shield-check-linear" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">ISO 9001 Quality Check</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Standardized testing protocols verify flexural strength, tensile tolerance, UV stability, and stress-crack resistance under extreme industrial applications.
              </p>
            </div>

            <div className="feature-card-item">
              <div className="feature-icon-wrapper">
                <Icon icon="solar:bolt-linear" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Zero Chemical Toxins</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Unlike pressure-treated timber, our physical extrusion process requires no harmful chemical impregnations, rendering products perfectly safe for agricultural use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 cta-section">
        <Card
          variant="elevated"
          className="cta-banner-card"
        >
          {/* Ambient radial glow blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand)]/10 dark:bg-[var(--brand)]/8 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#77d986]/10 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="mb-4">
                <span className="badge-pill-accent">
                  <Icon icon="solar:verified-check-linear" className="w-4 h-4" />
                  <span>Government Certified Plant</span>
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Schedule a Facility Inspection or Request Batch Specs
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm mt-2 max-w-xl font-medium leading-relaxed">
                Connect with our Ankleshwar plant engineers for detailed polymer test certificates, custom extrusion capabilities, or factory audits.
              </p>
            </div>
            <div className="shrink-0 self-start sm:self-auto flex items-center gap-3">
              <QuoteButton
                to="/contact?source=manufacturing"
                text="Request Facility Tour"
                className="shadow-md"
              />
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
