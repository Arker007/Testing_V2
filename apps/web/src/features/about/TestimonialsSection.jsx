import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Recycle } from "lucide-react";
import { testimonials } from "./about.constants";

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
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-8 sm:p-12 lg:p-16 relative overflow-hidden">
        {/* Background accent icon */}
        <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none text-navy">
          <Recycle className="w-96 h-96" />
        </div>

        <div className="max-w-3xl relative z-10">
          <span className="section-eyebrow mb-4">
            Client Feedback
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-navy tracking-tight mb-8">
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
                <p className="text-lg sm:text-xl text-slate-700 italic font-medium leading-relaxed">
                  "{testimonials[currentSlide].quote}"
                </p>

                <div className="flex items-center gap-4 pt-2">
                  <img
                    src={testimonials[currentSlide].avatar}
                    alt={testimonials[currentSlide].author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="font-bold text-navy text-base">
                      {testimonials[currentSlide].author}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {testimonials[currentSlide].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="testimonial-nav-btn w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-400">
              0{currentSlide + 1} / 0{testimonials.length}
            </span>
            <button
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="testimonial-nav-btn w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
