import React from "react";
import { Icon } from "@iconify/react";
import QuoteButton from "../../../shared/components/QuoteButton";
import Card from "../../../shared/components/ui/Card";
import Badge from "../../../shared/components/ui/Badge";

export default function ProcurementCtaBand() {
  return (
    <section className="pt-8 pb-4 cta-section">
      <Card
        variant="elevated"
        className="p-8 sm:p-12 text-[var(--text-primary)] shadow-xl relative overflow-hidden backdrop-blur-sm bg-white/95 dark:bg-surface border border-slate-200/90 dark:border-subtle rounded-card"
      >
        {/* Ambient radial glow blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand-primary)]/10 dark:bg-[var(--brand-primary)]/8 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--brand-primary)]/5 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="mb-3">
              <Badge variant="brand" size="md">
                Fast B2B Response
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              Need Custom Dimensions or Bulk Quotes?
            </h2>
            <p className="text-[var(--text-secondary)] text-sm mt-2 max-w-xl font-medium leading-relaxed">
              Send us your exact sizing specifications, target load requirements, or expected order volumes. Our sales desk will prepare a quotation within 24 hours.
            </p>
          </div>
          <div className="shrink-0 self-start sm:self-auto flex flex-wrap items-center gap-3">
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
          </div>
        </div>
      </Card>
    </section>
  );
}
