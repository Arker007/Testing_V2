import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { useSite } from "../../../shared/context/SiteContext";
import { SectionHeader } from "@/shared/ui";
import { containerVariants, itemVariants } from "../constants";

export default function WhoWeAreSection() {
  const { c } = useSite();

  if (c("about_bento_enabled", "1") === "0") return null;

  return (
    <section className="container py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Heading & Paragraph */}
        <div className="lg:col-span-5 space-y-6">
          <SectionHeader
            eyebrow="Who we are"
            eyebrowIcon="carbon:industry"
            title={c("about_who_title", "Pioneering eco-friendly industrial plastics since 2008")}
            align="left"
            accentLine
            size="lg"
            className="!mb-0"
          />
          <p className="text-[var(--text-secondary)] text-base leading-relaxed font-normal">
            {c(
              "about_who_text_1",
              "Founded in Gujarat, Vishal Enterprise has grown from a local recycling facility into one of Western India's most dependable manufacturers of high-density plastic pallets, industrial crates, and premium recycled plastic granules."
            )}
          </p>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed font-normal">
            {c(
              "about_who_text_2",
              "By merging rigorous quality control with environmentally responsible processing techniques, we support logistics, agriculture, chemical, and manufacturing sectors to cut operational overhead while significantly lowering their carbon footprint."
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
            className="group flex flex-col p-6 bg-[var(--bg-surface)] rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] hover:border-[var(--border-brand)] shadow-xs dark:shadow-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-[var(--radius-icon,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] dark:text-[var(--brand-primary)] shadow-xs flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
                  <Icon icon="solar:target-linear" className="w-6 h-6" />
                </div>
                <h3 className="text-[1.0625rem] font-bold text-[var(--text-primary)] leading-snug group-hover:text-[var(--text-brand)] transition-colors">
                  {c("about_mission_title", "Our mission")}
                </h3>
              </div>
              <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--text-muted)] shrink-0">
                Core purpose
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
              {c("about_mission_text", "To deliver top-quality recycled plastic products that add value, reduce waste and create a better world.")}
            </p>
          </motion.div>

          {/* Card 2: Vision */}
          <motion.div
            variants={itemVariants}
            className="group flex flex-col p-6 bg-[var(--bg-surface)] rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] hover:border-[var(--border-brand)] shadow-xs dark:shadow-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-[var(--radius-icon,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] dark:text-[var(--brand-primary)] shadow-xs flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
                  <Icon icon="solar:eye-linear" className="w-6 h-6" />
                </div>
                <h3 className="text-[1.0625rem] font-bold text-[var(--text-primary)] leading-snug group-hover:text-[var(--text-brand)] transition-colors">
                  {c("about_vision_title", "Our vision")}
                </h3>
              </div>
              <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--text-muted)] shrink-0">
                Long-term goal
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
              {c("about_vision_text", "To be India's most trusted and preferred manufacturer of sustainable plastic solutions.")}
            </p>
          </motion.div>

          {/* Card 3: Commitment */}
          <motion.div
            variants={itemVariants}
            className="group flex flex-col p-6 bg-[var(--bg-surface)] rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] hover:border-[var(--border-brand)] shadow-xs dark:shadow-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-[var(--radius-icon,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--text-brand)] dark:text-[var(--brand-primary)] shadow-xs flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
                  <Icon icon="solar:diploma-verified-linear" className="w-6 h-6" />
                </div>
                <h3 className="text-[1.0625rem] font-bold text-[var(--text-primary)] leading-snug group-hover:text-[var(--text-brand)] transition-colors">
                  {c("about_commitment_title", "Our commitment")}
                </h3>
              </div>
              <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--text-muted)] shrink-0">
                Quality guarantee
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
              {c("about_commitment_text", "Every product is checked, tested and delivered with a promise of quality you can rely on.")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
