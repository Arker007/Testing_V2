import React from "react";
import { ShieldCheck, CloudSun, Wrench, Leaf } from "lucide-react";
import QuoteButton from "../../shared/components/QuoteButton";

export default function WhyChooseUsSection() {
  return (
    <section className="bg-navy border-y border-slate-800/80 py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Column 1: Warehouse / Stacked Pallets Image Card */}
          <div className="lg:col-span-3 flex">
            <div className="w-full h-[400px] lg:h-auto min-h-[380px] lg:min-h-[540px] rounded-[2rem] overflow-hidden shadow-md border border-slate-200/30 flex">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop"
                alt="Stacked high-integrity recycled plastic pallets close up"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Column 2: Middle Intro text Card */}
          <div className="lg:col-span-4 bg-white rounded-[2rem] border border-slate-200/40 p-8 sm:p-10 flex flex-col justify-between shadow-sm min-h-[440px] lg:min-h-[540px]">
            <div>
              <span className="section-eyebrow mb-6">
                Why Industries Choose Us
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy tracking-tight leading-tight">
                Engineered for Strength. Built for Generations.
              </h2>

              <div className="h-[2px] w-12 bg-brand my-6" />

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
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
            <div className="bg-white rounded-[2rem] border border-slate-200/40 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-300/40 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand-dark mb-5 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-navy mb-2 leading-snug">
                  Heavy-Duty & Durable
                </h3>
                <div className="h-[2px] w-8 bg-brand mb-4" />
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  Built to handle extreme conditions and maximum load.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-[2rem] border border-slate-200/40 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-300/40 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand-dark mb-5 shrink-0">
                  <CloudSun className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-navy mb-2 leading-snug">
                  Weather & Corrosion Resistant
                </h3>
                <div className="h-[2px] w-8 bg-brand mb-4" />
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  Performance that stays strong in every climate.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-[2rem] border border-slate-200/40 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-300/40 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand-dark mb-5 shrink-0">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-navy mb-2 leading-snug">
                  Zero Maintenance
                </h3>
                <div className="h-[2px] w-8 bg-brand mb-4" />
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  Designed for long life with no painting, no treatment, no worries.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-[2rem] border border-slate-200/40 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-300/40 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand-dark mb-5 shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-navy mb-2 leading-snug">
                  Sustainable Solution
                </h3>
                <div className="h-[2px] w-8 bg-brand mb-4" />
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
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
