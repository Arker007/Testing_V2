import React from "react";
import useDocumentTitle from "../shared/hooks/useDocumentTitle";
import { useSite } from "../shared/context/SiteContext";
import SustainabilitySection from "../features/home/SustainabilitySection";
import { Leaf, Trees, Globe, ArrowRight } from "lucide-react";
import styles from "./About.module.css";
import Card from "../shared/components/ui/Card";
import Badge from "../shared/components/ui/Badge";
import Button from "../shared/components/ui/Button";

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
      <section className="py-16 px-4 bg-white dark:bg-[#0F141A] border-t border-b border-slate-100 dark:border-white/10">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="mb-2">
              <Badge variant="brand" size="sm">
                Our Pillars
              </Badge>
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Our 3-Fold Eco-Commitment</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm max-w-lg mx-auto mt-2">
              We align our manufacturing values with sustainable development goals to support green building and responsible procurement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 dark:bg-[#171E26] p-6 rounded-lg border border-slate-200/90 dark:border-white/10 transition hover:-translate-y-1 hover:shadow-md duration-300">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Trees className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Zero Deforestation</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Every ton of our recycled plastic lumber saves approximately 1.5 mature trees, preventing critical soil erosion and protecting vital biodiverse forest habitats.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-[#171E26] p-6 rounded-lg border border-slate-200/90 dark:border-white/10 transition hover:-translate-y-1 hover:shadow-md duration-300">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Carbon Avoidance</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Reprocessing existing polymer waste consumes up to 88% less energy and creates significantly lower greenhouse gas emissions compared to compiling virgin plastic.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-[#171E26] p-6 rounded-lg border border-slate-200/90 dark:border-white/10 transition hover:-translate-y-1 hover:shadow-md duration-300">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Globe className="w-5 h-5" />
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
          className="p-8 sm:p-12 text-slate-900 dark:text-white shadow-xl relative overflow-hidden backdrop-blur-sm bg-white/95 dark:bg-[#171E26] border border-slate-200/90 dark:border-white/10 rounded-2xl"
        >
          {/* Ambient radial glow blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand)]/10 dark:bg-[var(--brand)]/8 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--brand)]/5 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="mb-3">
                <Badge variant="brand" size="md">
                  ESG Partnership
                </Badge>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Partner on Circular Economy & Net-Zero Commitments
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 max-w-xl font-medium leading-relaxed">
                Help your enterprise transition from conventional single-use packaging to circular, carbon-negative closed-loop recycled pallets and containers.
              </p>
            </div>
            <div className="shrink-0 self-start sm:self-auto flex items-center gap-3">
              <Button
                as="link"
                to="/contact?source=sustainability"
                variant="swipe"
                icon={<ArrowRight className="w-4 h-4" />}
                className="shadow-md"
              >
                Explore ESG Solutions
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
