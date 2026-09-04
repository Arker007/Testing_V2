import React from "react";
import { Icon } from "@iconify/react";
import { useSite } from "../context/SiteContext";

export default function FeaturesTrustRow() {
  const { c } = useSite();

  return (
    <div className="mt-8 md:mt-16 border border-[var(--border-subtle)] rounded-[var(--radius-card,8px)] bg-[var(--bg-surface)] p-6 md:p-8 shadow-[var(--shadow-sm)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {/* Value 1 */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-[var(--radius-icon,8px)] bg-[var(--brand-soft)] text-[var(--text-brand)] flex items-center justify-center shrink-0 border border-[var(--border-brand)]">
          <Icon icon="solar:leaf-linear" className="w-5 h-5" />
        </div>
        <div>
          <span className="block font-bold text-[var(--text-primary)] text-sm mb-1">
            {c("why_us_t1_title", "Sustainable Choice")}
          </span>
          <p className="text-[var(--text-muted)] text-xs leading-relaxed">
            {c("why_us_t1_desc", "Low carbon footprint and environmentally responsible.")}
          </p>
        </div>
      </div>

      {/* Value 2 */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-[var(--radius-icon,8px)] bg-[var(--brand-soft)] text-[var(--text-brand)] flex items-center justify-center shrink-0 border border-[var(--border-brand)]">
          <Icon icon="solar:shield-check-linear" className="w-5 h-5" />
        </div>
        <div>
          <span className="block font-bold text-[var(--text-primary)] text-sm mb-1">
            {c("why_us_t2_title", "Corrosion Proof")}
          </span>
          <p className="text-[var(--text-muted)] text-xs leading-relaxed">
            {c("why_us_t2_desc", "Resistant to chemicals, salt, and corrosion.")}
          </p>
        </div>
      </div>

      {/* Value 3 */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-[var(--radius-icon,8px)] bg-[var(--brand-soft)] text-[var(--text-brand)] flex items-center justify-center shrink-0 border border-[var(--border-brand)]">
          <Icon icon="solar:wrench-linear" className="w-5 h-5" />
        </div>
        <div>
          <span className="block font-bold text-[var(--text-primary)] text-sm mb-1">
            {c("why_us_t3_title", "Low Maintenance")}
          </span>
          <p className="text-[var(--text-muted)] text-xs leading-relaxed">
            {c("why_us_t3_desc", "No painting, no sealing, just long-lasting performance.")}
          </p>
        </div>
      </div>

      {/* Value 4 */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-[var(--radius-icon,8px)] bg-[var(--brand-soft)] text-[var(--text-brand)] flex items-center justify-center shrink-0 border border-[var(--border-brand)]">
          <Icon icon="solar:headphones-round-linear" className="w-5 h-5" />
        </div>
        <div>
          <span className="block font-bold text-[var(--text-primary)] text-sm mb-1">
            {c("why_us_t4_title", "Reliable Support")}
          </span>
          <p className="text-[var(--text-muted)] text-xs leading-relaxed">
            {c("why_us_t4_desc", "Expert guidance and dedicated customer support.")}
          </p>
        </div>
      </div>
    </div>
  );
}
