import React, { useState } from "react";
import { IconBox, Tabs } from "../../../shared/components/ui";

const closedLoopBenefits = [
  {
    icon: "solar:dumbbell-large-linear",
    text: "Made from recycled high-density polyethylene (HDPE) with impact, UV, and moisture resistance.",
  },
  {
    icon: "solar:check-circle-linear",
    text: "Versatility for use in both stacking and racking systems.",
  },
  {
    icon: "solar:layers-minimalistic-linear",
    text: "Compatibility with RFID and customizable labeling.",
  },
  {
    icon: "solar:shield-check-linear",
    text: "Hygienic, easy to clean, and non-absorbent.",
  },
  {
    icon: "solar:ruler-cross-linear",
    text: "Available in 100% virgin material for FDA-grade applications.",
  },
  {
    icon: "solar:hourglass-linear",
    text: "10+ years of durability.",
  },
];

const lightweightBenefits = [
  {
    icon: "solar:shield-warning-linear",
    text: "Made from recycled high-density polyethylene (HDPE) with impact, UV, and moisture resistance.",
  },
  {
    icon: "solar:document-check-linear",
    text: "Exempt from NOM 144 requirements.",
  },
  {
    icon: "solar:sort-from-top-to-bottom-linear",
    text: "Lightweight pallet design.",
  },
  {
    icon: "solar:box-minimalistic-linear",
    text: "Nestable design that maximizes space.",
  },
  {
    icon: "solar:box-bold-linear",
    text: "Available in 100% virgin material for FDA-grade applications.",
  },
  {
    icon: "solar:waterdrops-linear",
    text: "Hygienic, easy to clean, and non-absorbent.",
  },
];

export const ProductBenefitsGrid = React.memo(function ProductBenefitsGrid({ categoryName }) {
  const [activeTab, setActiveTab] = useState("closed-loop");

  const currentBenefits = activeTab === "closed-loop" ? closedLoopBenefits : lightweightBenefits;
  const displayCategory = categoryName || "plastic pallets";

  return (
    <div className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-card p-6 sm:p-10 shadow-sm transition-all duration-200 my-4">
      {/* Centered Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight leading-snug">
          Learn more about the benefits of {displayCategory.toLowerCase()}
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          Products designed and manufactured to optimize efficiency and ensure the protection of your goods throughout their lifecycle. We offer a diverse range of sizes, shapes, and load capacities to meet your product and logistics requirements.
        </p>

        {/* Tab Toggle Pills */}
        <div className="mt-6 flex justify-center">
          <Tabs
            tabs={[
              { id: "closed-loop", label: "Closed-Loop Pallets" },
              { id: "lightweight", label: "Lightweight and Export Pallets" },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="pills"
          />
        </div>
      </div>

      {/* Benefits 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-4xl mx-auto pt-2">
        {currentBenefits.map((item, idx) => (
          <div key={idx} className="flex items-start gap-4 p-2.5 rounded-xl transition-colors hover:bg-slate-50 dark:hover:bg-white/5">
            <IconBox icon={item.icon} variant="neutral" size="md" />
            <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug pt-1">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ProductBenefitsGrid;
