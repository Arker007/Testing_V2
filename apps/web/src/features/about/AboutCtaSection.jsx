import React from "react";
import { Icon } from "@iconify/react";
import QuoteButton from "../../shared/components/QuoteButton";
import { useSite } from "../../shared/context/SiteContext";
import Card from "../../shared/components/ui/Card";
import Badge from "../../shared/components/ui/Badge";

export default function AboutCtaSection() {
  const { c } = useSite();

  if (c("about_cta_enabled", "1") === "0") return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 cta-section">
      <Card
        variant="elevated"
        className="p-8 sm:p-12 text-[var(--text-primary)] shadow-xl relative overflow-hidden backdrop-blur-sm bg-white/95 dark:bg-surface border border-slate-200/90 dark:border-subtle rounded-card"
      >
        {/* Ambient radial glow blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand-primary)]/10 dark:bg-[var(--brand-primary)]/8 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--brand-primary)]/5 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--brand-soft)] border border-[var(--brand-border)] rounded-pill text-[var(--text-brand)] font-bold text-xs tracking-wider uppercase shadow-xs">
                <Icon icon="solar:arrow-right-up-linear" className="w-4 h-4 text-[var(--text-brand)]" />
                <span>{c("about_cta_eyebrow", "Ready to Upgrade Your Supply Chain?")}</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              {c("about_cta_title", "Get Custom Quotes & Product Specs Today")}
            </h2>
            <p className="text-[var(--text-secondary)] text-sm mt-2 max-w-xl font-medium leading-relaxed">
              {c(
                "about_cta_text",
                "Talk directly with our technical team in Ankleshwar for custom bulk orders, pallet dimensions, or granule specifications."
              )}
            </p>
          </div>
          <div className="shrink-0 self-start sm:self-auto">
            <QuoteButton
              to="/contact"
              text={c("about_cta_btn_text", "Get Started")}
              className="shadow-md"
            />
          </div>
        </div>
      </Card>
    </section>
  );
}
