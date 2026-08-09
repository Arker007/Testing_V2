import React from "react";
import useDocumentTitle from "../shared/hooks/useDocumentTitle";
import { useSite } from "../shared/context/SiteContext";
import ProcessSection from "../features/home/ProcessSection";
import { Link } from "react-router-dom";
import { Cpu, ShieldCheck, Zap, ArrowRight, Award } from "lucide-react";
import styles from "./About.module.css";

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
    <main className="bg-[#FAFBFD] text-slate-800 min-h-screen pb-16 overflow-x-hidden">
      {/* Page Hero - Matching About and other pages exactly */}
      <section className={`${styles.hero} aboutHeroMotion`}>
        <div className={styles.heroBg} />
        <div className="container relative z-10">
          <span className={styles.heroTagline}>State-of-the-Art Production</span>
          <h1 className={styles.heroTitle}>
            Our Manufacturing Process
          </h1>
          <p className={styles.heroSub}>
            Our Gujarat-based manufacturing facility utilizes advanced automated polymer grade sorting, decontamination, and high-pressure extrusion to convert waste into durable structural alternatives.
          </p>
        </div>
      </section>

      {/* Embedded Process Section */}
      <div className="relative z-10 -mt-6">
        <ProcessSection />
      </div>

      {/* Manufacturing Advantages / Tech Stats */}
      <section className="py-16 px-4 bg-white border-t border-b border-slate-100">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-2">Quality Standards</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Precision & Performance Engineering</h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto mt-2">
              Every batch of recycled polymer undergoes rigorous testing to guarantee maximum structural integrity, chemical resistance, and load-bearing performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 transition hover:-translate-y-1 hover:shadow-md duration-300">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Advanced Automation</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Computer-controlled thermal profiles and raw material blending ensure uniform structural density across all profiles, eliminating inner cavities or weaknesses.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 transition hover:-translate-y-1 hover:shadow-md duration-300">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">ISO 9001 Quality Check</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Standardized testing protocols verify flexural strength, tensile tolerance, UV stability, and stress-crack resistance under extreme industrial applications.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 transition hover:-translate-y-1 hover:shadow-md duration-300">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Zero Chemical Toxins</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Unlike pressure-treated timber, our physical extrusion process requires no harmful chemical impregnations, rendering products perfectly safe for agricultural use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Banner */}
      <section className="py-12 px-4 bg-slate-50">
        <div className="container mx-auto max-w-4xl bg-gradient-to-r from-[#0B2F63] to-[#082247] rounded-2xl p-8 md:p-10 shadow-lg text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Government Certified Excellence</h3>
              <p className="text-slate-300 text-sm mt-1">
                We are fully registered, certified recycled plastic manufacturer supporting green supply chains across India.
              </p>
            </div>
          </div>
          <Link
            to="/contact?source=manufacturing"
            className="inline-flex items-center gap-2 bg-[#98d12a] text-[#0B2F63] hover:bg-white hover:text-[#0B2F63] transition duration-200 px-6 py-3 rounded-lg font-bold text-sm shadow-md whitespace-nowrap"
          >
            Request Facility Tour <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
