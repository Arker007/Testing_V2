import React, { useState } from "react";
import { Icon } from "@iconify/react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import { CtaCard, QuoteButton } from "@/shared/ui";
import { useSite } from "../../../../shared/context/SiteContext";

export default function HomeCtaSection() {
  const { c } = useSite();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: c(
        "home_testimonial_quote",
        "Vishal Enterprise has been a reliable partner for our pallet requirements. The quality and durability of their recycled plastic pallets have helped us improve our handling operations while supporting our sustainability goals."
      ),
      name: c("home_testimonial_name", "Procurement Manager"),
      company: c("home_testimonial_company", "Pharma Company"),
      icon: "carbon:building",
    },
    {
      quote:
        "Switching our facility handling platforms over to VISHAL ENTERPRISE's high-capacity recycled plastic pallets eliminated our recurring replacement budget entirely. They handle heavy racking cycles flawlessly without a single crack.",
      name: "Procurement Manager",
      company: "National Logistics Hub",
      icon: "carbon:delivery-parcel",
    },
    {
      quote:
        "We are extremely pleased with the premium recycled plastic pallets from Vishal Enterprise. They handle our heavy warehouse loads flawlessly and have significantly reduced our material handling costs over the years.",
      name: "Logistics Manager",
      company: "Legat Owen",
      icon: "carbon:industry",
    },
    {
      quote:
        "Switching to Vishal's high-density eco-friendly crates has helped us meet our rigorous sustainability targets while ensuring safe, damage-free transit of agricultural goods across India.",
      name: "Supply Chain Director",
      company: "GreenField Organics",
      icon: "carbon:agriculture",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  const eyebrow = c("home_testimonials_eyebrow", c("home_testimonial_eyebrow", "WHAT OUR CLIENTS SAY"));
  const title = c("home_testimonials_title", c("home_testimonial_title", "Trusted by Industry Leaders"));

  return (
    <>
      {c("show_home_testimonials", "1") !== "0" && (
        <section
          id="home-testimonials"
          aria-label="Customer Testimonials"
          className="py-14 sm:py-16 md:py-20 bg-slate-50/60 dark:bg-slate-950/80 border-t border-b border-slate-200/80 dark:border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Testimonial Card (Flipped to Left on lg) */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] dark:shadow-none transition-all duration-300">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                    >
                      {/* Quote Content */}
                      <div className="flex items-start gap-3.5 sm:gap-4">
                        {/* Green quotation mark icon */}
                        <svg
                          className="w-7 h-7 sm:w-8 sm:h-8 text-[#22c55e] shrink-0 mt-0.5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                        </svg>
                        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-[1.0625rem] leading-relaxed font-normal">
                          “{currentTestimonial.quote}”
                        </p>
                      </div>

                      {/* Author row & Navigation Controls */}
                      <div className="flex items-center justify-between mt-8 pt-4">
                        {/* Left Chevron */}
                        <button
                          type="button"
                          onClick={handlePrev}
                          aria-label="Previous testimonial"
                          className="p-2 text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
                        >
                          <Icon icon="carbon:chevron-left" className="w-5 h-5" />
                        </button>

                        {/* Author Info */}
                        <div className="flex items-center gap-3 sm:gap-3.5">
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#475569] dark:bg-slate-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                            <Icon icon={currentTestimonial.icon || "carbon:building"} className="w-5.5 h-5.5 text-white" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug">
                              {currentTestimonial.name}
                            </div>
                            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                              {currentTestimonial.company}
                            </div>
                          </div>
                        </div>

                        {/* Right Chevron */}
                        <button
                          type="button"
                          onClick={handleNext}
                          aria-label="Next testimonial"
                          className="p-2 text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
                        >
                          <Icon icon="carbon:chevron-right" className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Heading & Eyebrow (Flipped to Right on lg, aligned to top of card) */}
              <div className="lg:col-span-5 order-1 lg:order-2">
                <div className="flex items-center gap-2.5 mb-3.5">
                  <span className="w-5 sm:w-6 h-[2.5px] bg-[#22c55e] rounded-full inline-block shrink-0" />
                  <span className="text-xs sm:text-[0.8125rem] font-bold tracking-wider text-[#16a34a] dark:text-[#22c55e] uppercase">
                    {eyebrow}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  {title}
                </h2>
              </div>
            </div>
          </div>
        </section>
      )}

      {c("show_home_cta", "1") !== "0" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 cta-section">
          <CtaCard
            badge={c("home_cta_eyebrow", "Direct Factory Supply")}
            badgeVariant="brand"
            badgeIcon="carbon:industry"
            title={c("home_cta_title", "Looking for Durable Recycled Plastic Products?")}
            subtitle={c(
              "home_cta_subtitle",
              "Contact our team today for custom sizing, product specifications, and bulk pricing details."
            )}
          >
            <QuoteButton
              to="/contact"
              text={c("home_cta_btn", "Request a Quote")}
              className="shadow-sm"
            />
          </CtaCard>
        </section>
      )}
    </>
  );
}
