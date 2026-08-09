import React from "react";
import QuoteButton from "../../shared/components/QuoteButton";
import { useSite } from "../../shared/context/SiteContext";

export default function AboutCtaSection() {
  const { c } = useSite();

  if (c("about_cta_enabled", "1") === "0") return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 cta-section">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 text-navy shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="section-eyebrow mb-2">
              {c("about_cta_eyebrow", "Ready to Upgrade Your Supply Chain?")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy tracking-tight">
              {c("about_cta_title", "Get Custom Quotes & Product Specs Today")}
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-xl font-medium">
              {c(
                "about_cta_text",
                "Talk directly with our technical team in Ankleshwar for custom bulk orders, pallet dimensions, or granule specifications."
              )}
            </p>
          </div>
          <QuoteButton
            to="/contact"
            text={c("about_cta_btn_text", "Get Started")}
            className="self-start sm:self-auto"
          />
        </div>
      </div>
    </section>
  );
}
