import React from "react";
import { Icon } from "@iconify/react";
import QuoteButton from "../../shared/components/QuoteButton";

export default function WhyChooseUsSection() {
  return (
    <section className="bg-navy border-y border-slate-800/80 py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Column 1: Warehouse / Stacked Pallets Image Card */}
          <div className="lg:col-span-3 flex">
            <div className="w-full h-[400px] lg:h-auto min-h-[380px] lg:min-h-[540px] rounded-lg overflow-hidden shadow-2xl border border-white/10 flex">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop"
                alt="Stacked high-integrity recycled plastic pallets close up"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Column 2: Middle Intro text Card */}
          <div className="lg:col-span-4 bg-white/[0.04] border border-white/10 rounded-lg p-8 sm:p-10 flex flex-col justify-between backdrop-blur-sm shadow-xl min-h-[440px] lg:min-h-[540px]">
            <div>
              <span className="section-eyebrow mb-6">
                Why Industries Choose Us
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                Engineered for Strength. Built for Generations.
              </h2>

              <div className="h-[2px] w-12 bg-brand my-6" />

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
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
            <div className="group bg-white/[0.04] border border-white/10 hover:border-brand/40 hover:bg-white/[0.07] rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-lg transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-5 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white mb-2 leading-snug">
                  Heavy-Duty & Durable
                </h3>
                <div className="h-[2px] w-8 bg-brand mb-4" />
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Built to handle extreme conditions and maximum load.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white/[0.04] border border-white/10 hover:border-brand/40 hover:bg-white/[0.07] rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-lg transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-5 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white mb-2 leading-snug">
                  Weather & Corrosion Resistant
                </h3>
                <div className="h-[2px] w-8 bg-brand mb-4" />
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Performance that stays strong in every climate.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white/[0.04] border border-white/10 hover:border-brand/40 hover:bg-white/[0.07] rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-lg transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-5 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white mb-2 leading-snug">
                  Zero Maintenance
                </h3>
                <div className="h-[2px] w-8 bg-brand mb-4" />
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Designed for long life with no painting, no treatment, no worries.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group bg-white/[0.04] border border-white/10 hover:border-brand/40 hover:bg-white/[0.07] rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-lg transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-5 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 20A9 9 0 0 1 2 11 9 9 0 0 1 11 2c5 0 9 4 9 9 0 5-4 9-9 9z" />
                    <path d="M2 21c0-6 4-10 10-10" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white mb-2 leading-snug">
                  Sustainable Solution
                </h3>
                <div className="h-[2px] w-8 bg-brand mb-4" />
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
