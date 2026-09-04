import React, { useState, useEffect, useCallback } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

/**
 * BackToTop Button Component
 *
 * Smoothly scrolls to the top of the page when clicked.
 * Automatically appears when the user scrolls beyond the specified threshold.
 *
 * @param {Object} props
 * @param {number} [props.threshold=350] - Scroll position in px to reveal the button
 * @param {string} [props.className=""] - Additional class names
 * @param {boolean} [props.showProgress=true] - Whether to render a radial progress indicator
 */
export default function BackToTop({
  threshold = 350,
  className = "",
  showProgress = true,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY || document.documentElement.scrollTop;
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    setIsVisible(currentScrollY > threshold);

    if (totalHeight > 0) {
      const progress = Math.min(100, Math.max(0, (currentScrollY / totalHeight) * 100));
      setScrollProgress(progress);
    }
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG circular progress calculation
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <Motion.button
          type="button"
          id="back-to-top-button"
          onClick={scrollToTop}
          className={`fixed z-40 flex items-center justify-center rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 shadow-md hover:shadow-xl backdrop-blur-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] group cursor-pointer bottom-20 right-4 sm:bottom-8 sm:right-8 w-12 h-12 ${className}`}
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.2 }}
          aria-label="Back to top"
          title="Back to top"
        >
          {showProgress && (
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              {/* Background circle */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-slate-200/50 dark:stroke-slate-700/50 fill-transparent"
                strokeWidth="2.5"
              />
              {/* Animated Progress circle */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-[var(--brand,#6BBF54)] fill-transparent transition-all duration-100 ease-out"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset,
                }}
              />
            </svg>
          )}

          <Icon
            icon="solar:alt-arrow-up-linear"
            className="w-5 h-5 text-slate-700 dark:text-slate-200 group-hover:text-[var(--brand)] dark:group-hover:text-[var(--brand)] transition-colors duration-200 relative z-10"
            aria-hidden="true"
          />
        </Motion.button>
      )}
    </AnimatePresence>
  );
}
