import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { useSite } from "../../shared/context/SiteContext";
import Badge from "../../shared/components/ui/Badge";
import { containerVariants, itemVariants } from "./about.constants";

export default function WhoWeAreSection() {
  const { c } = useSite();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Heading & Paragraph */}
        <div className="lg:col-span-5 space-y-6">
          <Badge variant="brand" size="md">
            Who We Are
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {c("about_who_title", "Pioneering Eco-Friendly Industrial Plastics Since 2008.")}
          </h2>
          <div className="h-1 w-16 bg-emerald-500 rounded-lg" />
          <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed font-normal">
            {c(
              "about_who_text_1",
              "Founded in Gujarat, Vishal Enterprise has grown from a local recycling facility into one of Western India's most dependable manufacturers of high-density plastic pallets, industrial crates, and premium recycled plastic granules."
            )}
          </p>
          <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed font-normal">
            {c(
              "about_who_text_2",
              "By merging rigorous quality control with environmentally responsible processing techniques, we empower logistics, agriculture, chemical, and manufacturing sectors to cut operational overhead while significantly lowering their carbon footprint."
            )}
          </p>
        </div>

        {/* Right Column: Core Values Stack (Mission, Vision, Commitment) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          {/* Card 1: Mission */}
          <motion.div
            variants={itemVariants}
            className="group flex items-start gap-5 p-6 bg-white dark:bg-[#171E26] rounded-xl border border-slate-200/90 dark:border-white/10 hover:border-emerald-300 dark:hover:border-emerald-500/50 shadow-xs dark:shadow-xl hover:shadow-md transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-500/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 transition-transform duration-300 group-hover:scale-110 shrink-0">
              <Icon icon="solar:target-linear" className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Our Mission</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal mt-1">
                To deliver top-quality recycled plastic products that add value, reduce waste and create a better world.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Vision */}
          <motion.div
            variants={itemVariants}
            className="group flex items-start gap-5 p-6 bg-white dark:bg-[#171E26] rounded-xl border border-slate-200/90 dark:border-white/10 hover:border-emerald-300 dark:hover:border-emerald-500/50 shadow-xs dark:shadow-xl hover:shadow-md transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-500/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 transition-transform duration-300 group-hover:scale-110 shrink-0">
              <Icon icon="solar:eye-linear" className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Our Vision</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal mt-1">
                To be India's most trusted and preferred manufacturer of sustainable plastic solutions.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Commitment */}
          <motion.div
            variants={itemVariants}
            className="group flex items-start gap-5 p-6 bg-white dark:bg-[#171E26] rounded-xl border border-slate-200/90 dark:border-white/10 hover:border-emerald-300 dark:hover:border-emerald-500/50 shadow-xs dark:shadow-xl hover:shadow-md transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-500/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 transition-transform duration-300 group-hover:scale-110 shrink-0">
              <Icon icon="solar:medal-ribbons-star-linear" className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Our Commitment</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal mt-1">
                Every product is checked, tested and delivered with a promise of quality you can rely on.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
