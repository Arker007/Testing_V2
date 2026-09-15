import React from "react";
import { Icon } from "@iconify/react";
import { useSite } from "@/shared/context/SiteContext";
import Card from "@/shared/ui/data-display/Card";
import SectionHeader from "@/shared/ui/layout/SectionHeader";

export default function FeaturesSection() {
  const { c } = useSite();

  if (c("show_why_us", "1") === "0") return null;

  const features = [
    {
      icon: (
        <Icon
          icon="carbon:certificate"
          className="w-7 h-7 text-[var(--brand)]"
        />
      ),
      title: c("why_us_f1_title", "Quality Control Process"),
      desc: c(
        "why_us_f1_desc",
        "We ensure superior quality products by rigorously testing HDPE polymer profiles for tensile strength, density, structural stability, and weather durability."
      ),
    },
    {
      icon: (
        <Icon
          icon="carbon:settings"
          className="w-7 h-7 text-[var(--brand)]"
        />
      ),
      title: c("why_us_f2_title", "Custom Solution Design"),
      desc: c(
        "why_us_f2_desc",
        "Tailored recycled polymer lumber dimensions, steel core reinforcements, custom colors, grain textures, and heavy-duty designs available upon request."
      ),
    },
    {
      icon: (
        <Icon
          icon="carbon:recycle"
          className="w-7 h-7 text-[var(--brand)]"
        />
      ),
      title: c("why_us_f3_title", "Eco-Friendly Recycled Plastic"),
      desc: c(
        "why_us_f3_desc",
        "100% recycled HDPE material diversion preventing landfill & marine plastic waste. A sustainable alternative replacing timber & steel."
      ),
    },
    {
      icon: (
        <Icon
          icon="carbon:chart-line"
          className="w-7 h-7 text-[var(--brand)]"
        />
      ),
      title: c("why_us_f4_title", "Cost Savings & ROI"),
      desc: c(
        "why_us_f4_desc",
        "Zero maintenance, no termite destruction, and superior life cycle value compared to wood or metal across decades of heavy use."
      ),
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={c("why_us_badge", "Why Choose Us")}
          title={c("why_us_title", "Engineered for Extreme Durability")}
          subtitle={c(
            "why_us_subtitle",
            "Combining circular economy plastic recycling with precision industrial polymer manufacturing."
          )}
          align="center"
          className="mb-14 md:mb-20"
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8">
          {/* First 4 Feature Cards */}
          {features.map((feat, idx) => (
            <Card
              key={idx}
              className="md:col-span-3 bg-[var(--bg-surface)] p-6 md:p-8 rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] hover:border-[var(--border-brand)] transition-all duration-300 group hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-[var(--radius-btn,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--brand-primary)] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </Card>
          ))}

        </div>
      </div>
    </section>
  );
}
