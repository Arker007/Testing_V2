import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import { useSite } from "../../../shared/context/SiteContext";
import { testimonials } from "../constants";
import { Card, SectionHeader } from "@/shared/ui";

export default function TestimonialsSection() {
  const { c } = useSite();
  const [currentSlide, setCurrentSlide] = useState(0);

  if (c("about_testimonials_enabled", "1") === "0") return null;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <SectionHeader
        eyebrow={c("about_testimonials_eyebrow", "Client Feedback")}
        title={c("about_testimonials_title", "Trusted by Procurement & Logistics Leaders")}
        subtitle={c(
          "about_testimonials_subtitle",
          "What our enterprise partners across India say about our recycled plastic products and service reliability."
        )}
      />

      <Card variant="elevated" className="p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-slate-200 dark:border-subtle">
        {/* Background accent icon */}
        <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none text-slate-900 dark:text-white">
          <Icon icon="solar:restart-circle-linear" className="w-96 h-96" />
        </div>

        <div className="max-w-3xl relative z-10">
          <div className="min-h-[160px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <p className="text-lg sm:text-xl text-slate-800 dark:text-slate-200 italic font-medium leading-relaxed">
                  "{testimonials[currentSlide].quote}"
                </p>

                <div className="flex items-center gap-4 pt-2">
                  <img
                    src={testimonials[currentSlide].avatar}
                    alt={testimonials[currentSlide].author}
                    className="w-12 h-12 rounded-avatar object-cover border-2 border-[var(--brand-primary)] shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="block font-bold text-slate-900 dark:text-white text-base">
                      {testimonials[currentSlide].author}
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {testimonials[currentSlide].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-[var(--radius-btn,8px)] border border-slate-300 hover:border-slate-400 dark:border-slate-600 dark:hover:border-slate-400 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <Icon icon="solar:arrow-left-linear" className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wider select-none font-mono">
              0{currentSlide + 1} <span className="text-slate-400 dark:text-slate-500">/</span> 0{testimonials.length}
            </span>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-[var(--radius-btn,8px)] border border-slate-300 hover:border-slate-400 dark:border-slate-600 dark:hover:border-slate-400 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>
    </section>
  );
}
