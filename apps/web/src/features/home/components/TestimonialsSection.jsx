/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import { useSite } from "../../../shared/context/SiteContext";
import { Card } from "@/shared/ui";

const HOME_TESTIMONIALS = [
  {
    quote: "Vishal Enterprise has been a reliable partner for our pallet requirements. The quality and durability of their recycled plastic pallets have helped us improve our handling operations while supporting our sustainability goals.",
    role: "Procurement Manager",
    company: "Pharma Company",
    icon: "solar:buildings-2-bold"
  },
  {
    quote: "Switching to Vishal's high-density eco-friendly pallets and crates has helped us meet our rigorous sustainability targets while ensuring safe, damage-free transit of goods across India.",
    role: "Supply Chain Director",
    company: "Logistics Enterprise",
    icon: "solar:box-minimalistic-bold"
  },
  {
    quote: "Highly consistent quality and prompt factory delivery. Their engineering excellence truly reflects in the structural load capacity and longevity of their custom heavy-duty pallets.",
    role: "Operations Head",
    company: "Industrial Manufacturing Ltd.",
    icon: "solar:factory-bold"
  }
];

export default function TestimonialsSection() {
  const { c } = useSite();
  const [currentSlide, setCurrentSlide] = useState(0);

  if (c("home_testimonials_enabled", "1") === "0") return null;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HOME_TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HOME_TESTIMONIALS.length) % HOME_TESTIMONIALS.length);
  };

  const current = HOME_TESTIMONIALS[currentSlide];

  return (
    <section className="py-14 sm:py-18 lg:py-24 bg-[var(--bg-canvas)] transition-colors border-t border-[var(--border-subtle)]/40">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Testimonial Card */}
          <div className="lg:col-span-6">
            <Card
              variant="default"
              className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between min-h-[300px] sm:min-h-[320px]"
            >
              {/* Quote Content with Animation */}
              <div className="relative">
                {/* Quote Icon */}
                <div className="mb-3 text-[var(--text-primary)] select-none">
                  <Icon icon="solar:quote-down-bold" className="w-8 h-8 text-[var(--text-primary)]/80" />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-normal">
                      &ldquo;{current.quote}&rdquo;
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Navigation & Author Details */}
              <div className="flex items-center justify-between pt-6 sm:pt-8 mt-6 border-t border-[var(--border-subtle)]/60">
                {/* Previous Button */}
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous testimonial"
                  className="w-9 h-9 rounded-full border border-[var(--border-default)] hover:border-[var(--brand-primary)] bg-[var(--bg-surface)] hover:bg-[var(--brand-soft)] text-[var(--text-secondary)] hover:text-[var(--text-brand)] flex items-center justify-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] active:scale-95 shrink-0"
                >
                  <Icon icon="solar:alt-arrow-left-linear" className="w-4 h-4" />
                </button>

                {/* Author Info */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 px-2 text-left"
                  >
                    <div className="w-11 h-11 rounded-full bg-slate-800 dark:bg-slate-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Icon icon={current.icon || "solar:buildings-2-bold"} className="w-5 h-5 text-slate-100" />
                    </div>
                    <div>
                      <span className="block font-bold text-sm sm:text-base text-[var(--text-primary)] leading-tight">
                        {current.role}
                      </span>
                      <span className="block text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
                        {current.company}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next testimonial"
                  className="w-9 h-9 rounded-full border border-[var(--border-default)] hover:border-[var(--brand-primary)] bg-[var(--bg-surface)] hover:bg-[var(--brand-soft)] text-[var(--text-secondary)] hover:text-[var(--text-brand)] flex items-center justify-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] active:scale-95 shrink-0"
                >
                  <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
                </button>
              </div>
            </Card>
          </div>

          {/* Right Column: Copy & High-Impact Stats */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-4 h-[2px] bg-[var(--brand-primary)] inline-block shrink-0 rounded-full" />
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.16em] text-[var(--brand-primary)] uppercase">
                  {c("testimonials_eyebrow", "CLIENT TESTIMONIALS")}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight mb-3">
                {c("testimonials_title", "Trusted by industry leaders")}
              </h2>

              {/* Subtitle / Description */}
              <p className="text-xs sm:text-sm lg:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl">
                {c(
                  "testimonials_subtitle",
                  "Leading manufacturers, logistics companies and industrial businesses rely on our recycled plastic pallets for durability, performance and a cleaner, more sustainable future."
                )}
              </p>
            </div>

            {/* Stats Row with Vertical Dividers */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2">
              {/* Stat 1 */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left pr-2 sm:pr-4 border-r border-[var(--border-subtle)]">
                <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 border border-emerald-200/60 dark:border-emerald-800/40">
                  <Icon icon="solar:box-minimalistic-outline" className="w-5 h-5" />
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                  {c("stat_businesses_served", "500+")}
                </div>
                <div className="text-[11px] sm:text-xs text-[var(--text-secondary)] font-medium mt-1">
                  Businesses Served
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left px-2 sm:px-4 border-r border-[var(--border-subtle)]">
                <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 border border-emerald-200/60 dark:border-emerald-800/40">
                  <Icon icon="solar:delivery-outline" className="w-5 h-5" />
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                  {c("stat_pallets_supplied", "10M+")}
                </div>
                <div className="text-[11px] sm:text-xs text-[var(--text-secondary)] font-medium mt-1">
                  Pallets Supplied
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left pl-2 sm:pl-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 border border-emerald-200/60 dark:border-emerald-800/40">
                  <Icon icon="solar:restart-circle-outline" className="w-5 h-5" />
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                  {c("stat_recycled_material", "100%")}
                </div>
                <div className="text-[11px] sm:text-xs text-[var(--text-secondary)] font-medium mt-1">
                  Recycled Material
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
