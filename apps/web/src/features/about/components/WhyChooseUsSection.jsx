import React from "react";
import { Icon } from "@iconify/react";
import { QuoteButton, SectionHeader, IconBox } from "@/shared/ui";

export default function WhyChooseUsSection() {
  return (
    <section className="dark bg-navy border-y border-slate-800/80 py-20 lg:py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Column 1: Warehouse / Stacked Pallets Image Card */}
          <div className="lg:col-span-3 flex">
            <div className="w-full h-[400px] lg:h-auto min-h-[380px] lg:min-h-[540px] rounded-[var(--radius-card,8px)] overflow-hidden shadow-2xl border border-white/10 flex">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop"
                alt="Stacked high-integrity recycled plastic pallets close up"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Column 2: Middle Intro text Card */}
          <div className="lg:col-span-4 bg-white/[0.04] border border-white/10 rounded-[var(--radius-card,8px)] p-6 sm:p-8 lg:p-10 flex flex-col justify-between backdrop-blur-sm shadow-xl min-h-[440px] lg:min-h-[540px] min-w-0">
            <div>
              <SectionHeader
                eyebrow="Why industries choose us"
                eyebrowIcon="hugeicons:shield-check"
                title="Industrial strength built for demanding operations"
                subtitle="Engineered from reinforced recycled plastic polymers to withstand multi-tier racking, forklift impacts, and heavy warehouse loads."
                align="left"
                accentLine
                light
                size="sm"
                className="!mb-0"
              />
            </div>

            <div className="mt-8">
              <QuoteButton
                to="/products"
                text="View product catalog"
              />
            </div>
          </div>

          {/* Column 3: 4 Feature cards in a grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {/* Feature 1 */}
            <div className="group bg-white/[0.04] border border-white/10 hover:border-[var(--brand)]/50 hover:bg-white/[0.07] rounded-[var(--radius-card,8px)] p-6 flex flex-col gap-3.5 shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-[var(--radius-icon,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] dark:text-[var(--brand-primary)] shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Icon icon="hugeicons:shield-check" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1.5 leading-snug group-hover:text-[var(--brand-primary)] transition-colors">
                  High load bearing
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Dynamic capacities up to 1.5 tons and static loads up to 4 tons for heavy warehouses.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white/[0.04] border border-white/10 hover:border-[var(--brand)]/50 hover:bg-white/[0.07] rounded-[var(--radius-card,8px)] p-6 flex flex-col gap-3.5 shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-[var(--radius-icon,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] dark:text-[var(--brand-primary)] shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Icon icon="hugeicons:sun-01" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1.5 leading-snug group-hover:text-[var(--brand-primary)] transition-colors">
                  Chemical & rot proof
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Resistant to acids, alkalis, moisture, and pests — zero rot, termites, or mold.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white/[0.04] border border-white/10 hover:border-[var(--brand)]/50 hover:bg-white/[0.07] rounded-[var(--radius-card,8px)] p-6 flex flex-col gap-3.5 shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-[var(--radius-icon,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] dark:text-[var(--brand-primary)] shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Icon icon="hugeicons:settings-01" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1.5 leading-snug group-hover:text-[var(--brand-primary)] transition-colors">
                  Zero splintering & maintenance
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  No loose nails, splintering wood, or fumigation costs. Washable and easily sanitized.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group bg-white/[0.04] border border-white/10 hover:border-[var(--brand)]/50 hover:bg-white/[0.07] rounded-[var(--radius-card,8px)] p-6 flex flex-col gap-3.5 shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-[var(--radius-icon,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] dark:text-[var(--brand-primary)] shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Icon icon="hugeicons:recycle-01" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1.5 leading-snug group-hover:text-[var(--brand-primary)] transition-colors">
                  100% Recycled & circular
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Produced from clean recovered industrial polymers with closed-loop buyback options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
