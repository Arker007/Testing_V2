import React from "react";
import useDocumentTitle from "../shared/hooks/useDocumentTitle";
import { useSite } from "../shared/context/SiteContext";
import ProcessSection from "../features/home/ProcessSection";
import { Cpu, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import styles from "./About.module.css";
import Card from "../shared/components/ui/Card";
import Badge from "../shared/components/ui/Badge";
import Button from "../shared/components/ui/Button";

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
      <section className="py-16 px-4 bg-white dark:bg-[#0F141A] border-t border-b border-slate-100 dark:border-white/10">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="mb-2">
              <Badge variant="brand" size="sm">
                Quality Standards
              </Badge>
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Precision & Performance Engineering</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm max-w-lg mx-auto mt-2">
              Every batch of recycled polymer undergoes rigorous testing to guarantee maximum structural integrity, chemical resistance, and load-bearing performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 dark:bg-[#171E26] p-6 rounded-lg border border-slate-200/90 dark:border-white/10 transition hover:-translate-y-1 hover:shadow-md duration-300">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Advanced Automation</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Computer-controlled thermal profiles and raw material blending ensure uniform structural density across all profiles, eliminating inner cavities or weaknesses.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-[#171E26] p-6 rounded-lg border border-slate-200/90 dark:border-white/10 transition hover:-translate-y-1 hover:shadow-md duration-300">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">ISO 9001 Quality Check</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Standardized testing protocols verify flexural strength, tensile tolerance, UV stability, and stress-crack resistance under extreme industrial applications.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-[#171E26] p-6 rounded-lg border border-slate-200/90 dark:border-white/10 transition hover:-translate-y-1 hover:shadow-md duration-300">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
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
          className="p-8 sm:p-12 text-slate-900 dark:text-white shadow-xl relative overflow-hidden backdrop-blur-sm bg-white/95 dark:bg-[#171E26] border border-slate-200/90 dark:border-white/10 rounded-2xl"
        >
          {/* Ambient radial glow blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand)]/10 dark:bg-[var(--brand)]/8 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--brand)]/5 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="mb-3">
                <Badge variant="brand" size="md">
                  Government Certified Plant
                </Badge>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Schedule a Facility Inspection or Request Batch Specs
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm mt-2 max-w-xl font-medium leading-relaxed">
                Connect with our Ankleshwar plant engineers for detailed polymer test certificates, custom extrusion capabilities, or factory audits.
              </p>
            </div>
            <div className="shrink-0 self-start sm:self-auto flex items-center gap-3">
              <Button
                as="link"
                to="/contact?source=manufacturing"
                variant="swipe"
                icon={<ArrowRight className="w-4 h-4" />}
                className="shadow-md"
              >
                Request Facility Tour
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
