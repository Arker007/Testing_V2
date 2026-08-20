import React from "react";
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
        className="p-8 sm:p-12 text-slate-900 dark:text-white shadow-xl relative overflow-hidden backdrop-blur-sm bg-white/95 dark:bg-[#171E26] border border-slate-200/90 dark:border-white/10 rounded-2xl"
      >
        {/* Ambient radial glow blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand)]/10 dark:bg-[var(--brand)]/8 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--brand)]/5 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="mb-3">
              <Badge variant="brand" size="md">
                {c("about_cta_eyebrow", "Ready to Upgrade Your Supply Chain?")}
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {c("about_cta_title", "Get Custom Quotes & Product Specs Today")}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 max-w-xl font-medium leading-relaxed">
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
