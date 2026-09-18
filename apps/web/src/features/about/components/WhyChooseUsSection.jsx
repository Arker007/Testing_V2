import React from "react";
import { Icon } from "@iconify/react";
import { QuoteButton, SectionHeader, IconBox } from "@/shared/ui";

export default function WhyChooseUsSection() {
  return (
    <section className="dark bg-navy border-y border-slate-800/80 py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                eyebrow="Why Industries Choose Us"
                eyebrowIcon="carbon:security"
                eyebrowVariant="hero"
                title="Engineered for Strength. Built for Generations."
                subtitle="Our recycled plastic products are designed to withstand harsh conditions, heavy loads and continuous use — without compromising on quality."
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
                text="Explore Our Products"
              />
            </div>
          </div>

          {/* Column 3: 4 Feature cards in a grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {/* Feature 1 */}
            <div className="group bg-white/[0.04] border border-white/10 hover:border-[var(--brand)]/50 hover:bg-white/[0.07] rounded-[var(--radius-card,8px)] p-6 flex flex-col gap-3.5 shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between gap-3">
                <div className="w-11 h-11 rounded-[var(--radius-btn,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--brand-primary)] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Icon icon="carbon:security" className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[var(--radius-sm,6px)] bg-white/10 border border-white/15 text-[0.6875rem] font-bold text-slate-300 tracking-wider">
                  Max Load SLA
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1.5 leading-snug group-hover:text-[var(--brand-primary)] transition-colors">
                  Heavy-Duty & Durable
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Built to handle extreme conditions and maximum load.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white/[0.04] border border-white/10 hover:border-[var(--brand)]/50 hover:bg-white/[0.07] rounded-[var(--radius-card,8px)] p-6 flex flex-col gap-3.5 shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between gap-3">
                <div className="w-11 h-11 rounded-[var(--radius-btn,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--brand-primary)] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Icon icon="carbon:sun" className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[var(--radius-sm,6px)] bg-white/10 border border-white/15 text-[0.6875rem] font-bold text-slate-300 tracking-wider">
                  UV Tested
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1.5 leading-snug group-hover:text-[var(--brand-primary)] transition-colors">
                  Weather & Corrosion Resistant
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Performance that stays strong in every climate.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white/[0.04] border border-white/10 hover:border-[var(--brand)]/50 hover:bg-white/[0.07] rounded-[var(--radius-card,8px)] p-6 flex flex-col gap-3.5 shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between gap-3">
                <div className="w-11 h-11 rounded-[var(--radius-btn,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--brand-primary)] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Icon icon="carbon:settings" className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[var(--radius-sm,6px)] bg-white/10 border border-white/15 text-[0.6875rem] font-bold text-slate-300 tracking-wider">
                  Zero Rot/Pest
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1.5 leading-snug group-hover:text-[var(--brand-primary)] transition-colors">
                  Zero Maintenance
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Designed for long life with no painting, no treatment, no worries.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group bg-white/[0.04] border border-white/10 hover:border-[var(--brand)]/50 hover:bg-white/[0.07] rounded-[var(--radius-card,8px)] p-6 flex flex-col gap-3.5 shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between gap-3">
                <div className="w-11 h-11 rounded-[var(--radius-btn,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--brand-primary)] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Icon icon="carbon:recycle" className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[var(--radius-sm,6px)] bg-white/10 border border-white/15 text-[0.6875rem] font-bold text-slate-300 tracking-wider">
                  100% Circular
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1.5 leading-snug group-hover:text-[var(--brand-primary)] transition-colors">
                  Sustainable Solution
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Made from 100% recycled plastic for a cleaner tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
