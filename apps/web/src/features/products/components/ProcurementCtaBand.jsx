import React from "react";
import { Icon } from "@iconify/react";
import QuoteButton from "../../../shared/components/QuoteButton";
import CtaCard from "../../../shared/components/ui/CtaCard";

export default function ProcurementCtaBand() {
  return (
    <section className="pt-8 pb-4 cta-section">
      <CtaCard
        badge="Fast B2B Response"
        badgeVariant="brand"
        title="Need Custom Dimensions or Bulk Quotes?"
        subtitle="Send us your exact sizing specifications, target load requirements, or expected order volumes. Our sales desk will prepare a quotation within 24 hours."
      >
        <QuoteButton
          to="/contact"
          text="Request Bulk Quote"
          className="shadow-md"
        />
        <a
          href="tel:+919898686379"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200/90 dark:border-white/15 bg-slate-100/80 dark:bg-white/5 hover:bg-slate-200/80 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 font-bold text-sm transition-colors shadow-2xs"
        >
          <Icon icon="solar:phone-calling-linear" className="w-4 h-4" />
          <span>Call Sales Desk</span>
        </a>
      </CtaCard>
    </section>
  );
}
