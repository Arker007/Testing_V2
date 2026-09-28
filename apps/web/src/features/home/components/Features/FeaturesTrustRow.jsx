import React from "react";
import { Icon } from "@iconify/react";
import { useSite } from "@/shared/context/SiteContext";

export default function FeaturesTrustRow() {
  const { c } = useSite();

  return (
    <section
      className="bg-[var(--bg-surface)] rounded-[var(--radius-card,16px)] border border-[var(--border-subtle)] shadow-[var(--shadow-sm)] px-6 py-6 sm:px-8 sm:py-7"
      data-purpose="bottom-metrics-ribbon"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Value 1: Sustainable Choice */}
        <div className="lg:col-span-3 flex items-start space-x-4">
          <div className="w-12 h-12 rounded-[var(--radius-icon,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] flex-shrink-0 flex items-center justify-center text-[var(--text-brand)] dark:text-[var(--brand-primary)] shadow-xs">
            <Icon icon="solar:leaf-bold" className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-[var(--text-primary)] text-[15px] leading-snug">
              {c("why_us_t1_title", "Sustainable choice")}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1 leading-normal">
              {c("why_us_t1_desc", "Lower carbon footprint and environmentally responsible.")}
            </p>
          </div>
        </div>

        {/* Value 2: Corrosion Resistant */}
        <div className="lg:col-span-3 flex items-start space-x-4">
          <div className="w-12 h-12 rounded-[var(--radius-icon,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] flex-shrink-0 flex items-center justify-center text-[var(--text-brand)] dark:text-[var(--brand-primary)] shadow-xs">
            <Icon icon="solar:shield-check-bold" className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-[var(--text-primary)] text-[15px] leading-snug">
              {c("why_us_t2_title", "Corrosion resistant")}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1 leading-normal">
              {c("why_us_t2_desc", "Resistant to chemicals, salt, and corrosion.")}
            </p>
          </div>
        </div>

        {/* Value 3: Low Maintenance */}
        <div className="lg:col-span-4 flex items-start space-x-4">
          <div className="w-12 h-12 rounded-[var(--radius-icon,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] flex-shrink-0 flex items-center justify-center text-[var(--text-brand)] dark:text-[var(--brand-primary)] shadow-xs">
            <Icon icon="solar:tuning-square-2-bold" className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-[var(--text-primary)] text-[15px] leading-snug whitespace-nowrap">
              {c("why_us_t3_title", "Low maintenance")}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1 leading-normal">
              {c("why_us_t3_desc", "No painting, no sealing, just long-lasting performance.")}
            </p>
          </div>
        </div>

        {/* Right Slogan Divider & Text */}
        <div className="lg:col-span-2 border-t lg:border-t-0 lg:border-l border-[var(--border-subtle)] pt-4 lg:pt-0 lg:pl-6 flex flex-col justify-center">
          <div className="w-6 h-[2px] bg-[var(--brand-primary)] mb-2 hidden lg:block" />
          <p className="text-[10px] tracking-wider uppercase font-semibold text-[var(--text-muted)] leading-tight">
            PEOPLE<br />
            MATERIALS<br />
            A CLEANER<br />
            TOMORROW
          </p>
        </div>
      </div>
    </section>
  );
}


