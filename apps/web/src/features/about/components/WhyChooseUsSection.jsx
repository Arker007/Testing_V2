import React from "react";
import { Icon } from "@iconify/react";
import { QuoteButton, Badge, IconBox } from "@/shared/ui";

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
          <div className="lg:col-span-4 bg-white/[0.04] border border-white/10 rounded-[var(--radius-card,8px)] p-8 sm:p-10 flex flex-col justify-between backdrop-blur-sm shadow-xl min-h-[440px] lg:min-h-[540px]">
            <div>
              <div className="mb-4">
                <Badge
                  variant="hero"
                  size="lg"
                  icon="solar:shield-check-linear"
                >
                  Why Industries Choose Us
                </Badge>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-primary)] tracking-tight leading-tight">
                Engineered for Strength. Built for Generations.
              </h2>

              <div className="h-[2px] w-12 bg-[var(--brand)] my-6" />

              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-normal">
                Our recycled plastic products are designed to withstand harsh conditions, heavy loads and continuous use — without compromising on quality.
              </p>
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
            <div className="group bg-white/[0.04] border border-white/10 hover:border-[var(--brand)]/40 hover:bg-white/[0.07] rounded-[var(--radius-card,8px)] p-6 sm:p-8 flex flex-col justify-between shadow-lg transition-all duration-300">
              <div>
                <IconBox
                  icon="solar:shield-check-linear"
                  variant="brand"
                  size="lg"
                  className="mb-5 group-hover:scale-110"
                />
                <h3 className="text-base sm:text-lg font-black text-[var(--text-primary)] mb-2 leading-snug">
                  Heavy-Duty & Durable
                </h3>
                <div className="h-[2px] w-8 bg-[var(--brand)] mb-4" />
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                  Built to handle extreme conditions and maximum load.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white/[0.04] border border-white/10 hover:border-[var(--brand)]/40 hover:bg-white/[0.07] rounded-[var(--radius-card,8px)] p-6 sm:p-8 flex flex-col justify-between shadow-lg transition-all duration-300">
              <div>
                <IconBox
                  icon="solar:sun-fog-linear"
                  variant="brand"
                  size="lg"
                  className="mb-5 group-hover:scale-110"
                />
                <h3 className="text-base sm:text-lg font-black text-[var(--text-primary)] mb-2 leading-snug">
                  Weather & Corrosion Resistant
                </h3>
                <div className="h-[2px] w-8 bg-[var(--brand)] mb-4" />
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                  Performance that stays strong in every climate.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white/[0.04] border border-white/10 hover:border-[var(--brand)]/40 hover:bg-white/[0.07] rounded-[var(--radius-card,8px)] p-6 sm:p-8 flex flex-col justify-between shadow-lg transition-all duration-300">
              <div>
                <IconBox
                  icon="solar:settings-minimalistic-linear"
                  variant="brand"
                  size="lg"
                  className="mb-5 group-hover:scale-110"
                />
                <h3 className="text-base sm:text-lg font-black text-[var(--text-primary)] mb-2 leading-snug">
                  Zero Maintenance
                </h3>
                <div className="h-[2px] w-8 bg-[var(--brand)] mb-4" />
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                  Designed for long life with no painting, no treatment, no worries.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group bg-white/[0.04] border border-white/10 hover:border-[var(--brand)]/40 hover:bg-white/[0.07] rounded-[var(--radius-card,8px)] p-6 sm:p-8 flex flex-col justify-between shadow-lg transition-all duration-300">
              <div>
                <IconBox
                  icon="solar:leaf-linear"
                  variant="brand"
                  size="lg"
                  className="mb-5 group-hover:scale-110"
                />
                <h3 className="text-base sm:text-lg font-black text-[var(--text-primary)] mb-2 leading-snug">
                  Sustainable Solution
                </h3>
                <div className="h-[2px] w-8 bg-[var(--brand)] mb-4" />
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
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
