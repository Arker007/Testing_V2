import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import customManufacturingBg from "../../../assets/images/custom_manufacturing_bg_1785866818566.jpg";
import fiftyYearsBadge from "../../../assets/images/fifty_years_badge_1785866853287.jpg";
import { useSite } from "../../context/SiteContext";

export default function FeaturesCustomLifespanCards({ cardVariant }) {
  const { c } = useSite();

  return (
    <>
      {/* Card 5 - Wide: Custom Manufacturing */}
      <motion.div
        variants={cardVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        whileHover="hover"
        transition={{ delay: 0.4 }}
        className="md:col-span-3 rounded-2xl border border-[var(--border-card)] bg-[var(--navy-dark)] p-6 md:p-8 shadow-xl relative overflow-hidden group flex flex-col md:flex-row items-center gap-6 md:gap-8 min-h-[220px]"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={customManufacturingBg}
            alt="Custom Manufacturing Grid"
            className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-70 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy-dark)] via-[var(--navy-dark)]/80 to-transparent" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl border border-[var(--brand)]/30 bg-[var(--brand)]/15 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.08] shrink-0">
              <Icon icon="solar:buildings-3-linear" className="w-6 h-6 text-[var(--brand)]" />
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
              {c("why_us_f5_title", "Custom Manufacturing")}
            </h3>
          </div>
          <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-[90%] font-medium drop-shadow-sm">
            {c("why_us_f5_desc", "Tailor-made recycled plastic profiles, industrial pallets, and fencing systems manufactured precisely to customer specifications.")}
          </p>
        </div>
      </motion.div>

      {/* Card 6 - Wide: 50+ Year Lifespan */}
      <motion.div
        variants={cardVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        whileHover="hover"
        transition={{ delay: 0.5 }}
        className="md:col-span-3 rounded-2xl border border-[var(--border-card)] bg-[var(--navy-dark)] p-6 md:p-8 shadow-xl relative overflow-hidden group flex flex-col md:flex-row items-center gap-6 md:gap-8 min-h-[220px]"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={fiftyYearsBadge}
            alt="50+ Years Lifespan Badge"
            className="absolute right-6 top-1/2 -translate-y-1/2 h-[90%] w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.08] mix-blend-lighten opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy-dark)] via-[var(--navy-dark)]/80 to-transparent" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl border border-[var(--brand)]/30 bg-[var(--brand)]/15 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.08] shrink-0">
              <Icon icon="solar:shield-check-linear" className="w-6 h-6 text-[var(--brand)]" />
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
              {c("why_us_f6_title", "50+ Year Lifespan")}
            </h3>
          </div>
          <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-[80%] font-medium drop-shadow-sm">
            {c("why_us_f6_desc", "Maintenance-free performance that outperforms traditional materials. Never rusts, rots, or requires painting.")}
          </p>
        </div>
      </motion.div>
    </>
  );
}
