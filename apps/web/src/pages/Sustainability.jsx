import React from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import useDocumentTitle from "../shared/hooks/useDocumentTitle";
import { useSite } from "../shared/context/SiteContext";
import SustainabilitySection from "../features/home/SustainabilitySection";
import { Icon } from "@iconify/react";
import styles from "./About.module.css";
import Card from "../shared/components/ui/Card";
import QuoteButton from "../shared/components/QuoteButton";

export default function Sustainability() {
  const { c, co } = useSite();

  useDocumentTitle(
    c("meta_sustainability_title", `Sustainability & ESG | ${co("name", "VISHAL ENTERPRISE")}`),
    c(
      "meta_sustainability_desc",
      "Learn about our zero-maintenance, carbon-negative recycled plastic solutions that actively save forests and divert plastic from oceans."
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
            <Link to="/" className="inline-flex items-center gap-1.5 text-white/90 hover:text-[#5FBF50] transition-colors">
              <Icon icon="solar:home-2-linear" className="w-3.5 h-3.5 opacity-80 shrink-0" />
              <span>Home</span>
            </Link>
            <Icon icon="solar:alt-arrow-right-linear" className="w-3 h-3 text-white/40 shrink-0" />
            <span className="text-[#5FBF50] font-semibold">Sustainability</span>
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
                  <Icon icon="solar:leaf-linear" className="w-4 h-4" />
                  <span>{c("sus_hero_tag", "Environmental Impact & Circular Economy")}</span>
                </span>
              </div>

              <h1 className="font-[var(--font-display,inherit)] text-[clamp(2rem,4.5vw,3rem)] font-extrabold text-white tracking-tight my-3.5 leading-[1.2]">
                Diverting Plastic Waste into <span className="text-[#4FC36D]">Enduring Infrastructure</span>
              </h1>
              <p className="text-white/85 text-base sm:text-lg max-w-[720px] leading-[1.7] m-0">
                {c(
                  "sus_hero_sub",
                  "By diverting post-industrial polymer waste from oceans and landfills, we manufacture structural materials that last generations without requiring a single tree to be cut down."
                )}
              </p>
            </Motion.div>
          </div>
        </div>
      </header>

      {/* Embedded Sustainability Section */}
      <div className="relative z-10 pt-8 sm:pt-12">
        <SustainabilitySection />
      </div>

      {/* Core Sustainability Pillars */}
      <section className="py-16 px-4 bg-[var(--bg-page)] dark:bg-[#151c24] border-t border-b border-slate-100 dark:border-white/10">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="mb-4">
              <span className="badge-pill-accent">
                <Icon icon="solar:leaf-linear" className="w-4 h-4" />
                <span>Our Pillars</span>
              </span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Our 3-Fold Eco-Commitment</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm max-w-lg mx-auto mt-2">
              We align our manufacturing values with sustainable development goals to support green building and responsible procurement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card-item">
              <div className="feature-icon-wrapper">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L4.5 12.5H7.5L3.5 17.5H8V22H16V17.5H20.5L16.5 12.5H19.5L12 2Z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Zero Deforestation</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Every ton of our recycled plastic lumber saves approximately 1.5 mature trees, preventing critical soil erosion and protecting vital biodiverse forest habitats.
              </p>
            </div>

            <div className="feature-card-item">
              <div className="feature-icon-wrapper">
                <Icon icon="solar:leaf-linear" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Carbon Avoidance</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Reprocessing existing polymer waste consumes up to 88% less energy and creates significantly lower greenhouse gas emissions compared to compiling virgin plastic.
              </p>
            </div>

            <div className="feature-card-item">
              <div className="feature-icon-wrapper">
                <Icon icon="solar:global-linear" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">100% Recyclable</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Our materials are engineered for true circularity. At the end of their multi-decade lifespans, they can be completely reground and remolded again.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate ESG Partnership CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 cta-section">
        <Card
          variant="elevated"
          className="cta-banner-card"
        >
          {/* Ambient radial glow blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand)]/10 dark:bg-[var(--brand)]/8 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#5FBF50]/10 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="mb-4">
                <span className="badge-pill-accent">
                  <Icon icon="solar:handshake-linear" className="w-4 h-4" />
                  <span>ESG Partnership</span>
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Partner on Circular Economy & Net-Zero Commitments
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 max-w-xl font-medium leading-relaxed">
                Help your enterprise transition from conventional single-use packaging to circular, carbon-negative closed-loop recycled pallets and containers.
              </p>
            </div>
            <div className="shrink-0 self-start sm:self-auto flex items-center gap-3">
              <QuoteButton
                to="/contact?source=sustainability"
                text="Explore ESG Solutions"
                className="shadow-md"
              />
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
