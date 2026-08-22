import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { testimonials } from "./about.constants";
import Card from "../../shared/components/ui/Card";
import Badge from "../../shared/components/ui/Badge";

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Card variant="elevated" className="p-8 sm:p-12 lg:p-16 relative overflow-hidden">
        {/* Background accent icon */}
        <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none text-slate-900 dark:text-white">
          <Icon icon="solar:restart-circle-linear" className="w-96 h-96" />
        </div>

        <div className="max-w-3xl relative z-10">
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#77D986]/10 dark:bg-[#77D986]/8 border border-[#77D986]/30 dark:border-[#77D986]/40 rounded-full text-[#54b862] dark:text-[#77D986] font-bold text-xs tracking-wider uppercase shadow-xs">
              <Icon icon="solar:chat-round-line-linear" className="w-4 h-4" />
              <span>Client Feedback</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-8">
            Trusted by Procurement & Logistics Leaders
          </h2>

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
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#77D986] shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {testimonials[currentSlide].author}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {testimonials[currentSlide].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-white/10">
            <button
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-lg border border-slate-200 dark:border-white/15 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center transition-colors shadow-xs active:scale-95"
            >
              <Icon icon="solar:arrow-left-linear" className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              0{currentSlide + 1} / 0{testimonials.length}
            </span>
            <button
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-lg border border-slate-200 dark:border-white/15 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center transition-colors shadow-xs active:scale-95"
            >
              <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>
    </section>
  );
}
