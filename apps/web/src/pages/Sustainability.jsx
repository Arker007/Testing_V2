import React from "react";
import useDocumentTitle from "../shared/hooks/useDocumentTitle";
import { useSite } from "../shared/context/SiteContext";
import SustainabilitySection from "../features/home/SustainabilitySection";
import { Link } from "react-router-dom";
import { Leaf, Trees, Globe, ArrowRight, Shield } from "lucide-react";
import styles from "./About.module.css";

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
    <main className="bg-[#FAFBFD] text-slate-800 min-h-screen pb-16 overflow-x-hidden">
      {/* Page Hero - Matching About and other pages exactly */}
      <section className={`${styles.hero} aboutHeroMotion`}>
        <div className={styles.heroBg} />
        <div className="container relative z-10">
          <span className={styles.heroTagline}>Environmental Impact</span>
          <h1 className={styles.heroTitle}>
            Sustainability & ESG Commitments
          </h1>
          <p className={styles.heroSub}>
            By diverting post-industrial polymer waste from oceans and landfills, we manufacture structural materials that last generations without requiring a single tree to be cut down.
          </p>
        </div>
      </section>

      {/* Embedded Sustainability Section */}
      <div className="relative z-10 -mt-6">
        <SustainabilitySection />
      </div>

      {/* Core Sustainability Pillars */}
      <section className="py-16 px-4 bg-white border-t border-b border-slate-100">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-2">Our Pillars</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Our 3-Fold Eco-Commitment</h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto mt-2">
              We align our manufacturing values with sustainable development goals to support green building and responsible procurement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 transition hover:-translate-y-1 hover:shadow-md duration-300">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Trees className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Zero Deforestation</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Every ton of our recycled plastic lumber saves approximately 1.5 mature trees, preventing critical soil erosion and protecting vital biodiverse forest habitats.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 transition hover:-translate-y-1 hover:shadow-md duration-300">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Carbon Avoidance</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Reprocessing existing polymer waste consumes up to 88% less energy and creates significantly lower greenhouse gas emissions compared to compiling virgin plastic.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 transition hover:-translate-y-1 hover:shadow-md duration-300">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">100% Recyclable</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our materials are engineered for true circularity. At the end of their multi-decade lifespans, they can be completely reground and remolded again.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate ESG Partnership CTA */}
      <section className="py-12 px-4 bg-slate-50">
        <div className="container mx-auto max-w-4xl bg-gradient-to-r from-emerald-900 to-[#0B2F63] rounded-2xl p-8 md:p-10 shadow-lg text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Partner on ESG Commitments</h3>
              <p className="text-slate-300 text-sm mt-1">
                Help your corporation transition from conventional single-use pallets to circular, carbon-negative closed-loop packaging.
              </p>
            </div>
          </div>
          <Link
            to="/contact?source=sustainability"
            className="inline-flex items-center gap-2 bg-[#98d12a] text-[#0B2F63] hover:bg-white hover:text-[#0B2F63] transition duration-200 px-6 py-3 rounded-lg font-bold text-sm shadow-md whitespace-nowrap"
          >
            Explore ESG Solutions <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
