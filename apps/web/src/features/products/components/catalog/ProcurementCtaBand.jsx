import React from "react";
import { Icon } from "@iconify/react";
import { QuoteButton, CtaCard } from "@/shared/ui";

export default function ProcurementCtaBand() {
  return (
    <section className="pt-8 pb-4 cta-section">
      <CtaCard
        badge="Fast Response"
        badgeVariant="brand"
        title="Need Custom Dimensions or Bulk Quotes?"
        subtitle="Send us your exact sizing specifications, target load requirements, or expected order volumes. Our sales desk will provide a quote within 24 hours."
      >
        <QuoteButton
          to="/contact"
          text="Request Bulk Quote"
          className="shadow-sm"
        />
        <a
          href="tel:+919898686379"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[var(--radius-btn,8px)] border border-[var(--border-subtle)] bg-[var(--bg-surface-secondary)] hover:bg-[var(--bg-surface-tertiary)] hover:border-[var(--border-default)] text-[var(--text-primary)] text-sm font-bold transition-all shadow-2xs whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
        >
          <Icon icon="carbon:phone" className="w-4 h-4 text-[var(--brand-primary,#059669)] shrink-0" />
          <span>Call Sales Desk</span>
        </a>
      </CtaCard>
    </section>
  );
}
