/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { useSite } from "../../../shared/context/SiteContext";
import { Badge, CtaCard, Accordion } from "@/shared/ui";
import { FAQ_ITEMS } from "../constants";

const WhatsAppIcon = () => (
  <motion.div
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    className="shrink-0"
  >
    <Icon icon="solar:chat-round-line-linear" className="w-5 h-5" />
  </motion.div>
);

const AnimatedCatalogIcon = () => (
  <motion.div
    whileHover={{ scale: 1.15, rotate: [0, -10, 10, -10, 0] }}
    transition={{ duration: 0.5 }}
    className="shrink-0"
  >
    <Icon icon="solar:box-minimalistic-linear" className="w-5 h-5" />
  </motion.div>
);

export default function ContactFaqSection() {
  const { c, co } = useSite();
  const waLink = `https://wa.me/${co("whatsapp", "919898686379").replace(/\D/g, "")}`;

  // Format clean items without icon or badge
  const accordionItems = FAQ_ITEMS.map((item, idx) => ({
    id: item.id || `faq-${idx}`,
    title: item.q,
    content: item.a,
  }));

  return (
    <>
      <section className="py-14 sm:py-20 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)]/60 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <motion.div
            className="text-center mb-10 sm:mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex justify-center mb-3">
              <Badge variant="eyebrow" size="lg">
                Got Questions?
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              Clear answers regarding minimum orders, custom options, export compliance, and delivery.
            </p>
          </motion.div>

          {/* Accordion FAQ List without icons and category badges */}
          <Accordion items={accordionItems} defaultOpenIndex={0} allowMultiple={true} />
        </div>
      </section>

      {/* Restored Direct Connect CTA Card */}
      {c("about_cta_enabled", "1") !== "0" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 cta-section">
          <CtaCard
            badge="Direct Connect"
            badgeVariant="brand"
            title="Need Urgent Price Quotes or Product Advice?"
            subtitle="Talk directly with our factory sales desk on WhatsApp or explore our full industrial product catalog."
          >
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[var(--radius-btn,8px)] bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <WhatsAppIcon />
              <span>Chat on WhatsApp</span>
            </a>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-[var(--radius-btn,8px)] border border-slate-200/90 dark:border-[var(--border-subtle)] bg-slate-100/80 dark:bg-white/5 hover:bg-slate-200/80 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 font-bold text-sm transition-colors shadow-2xs"
            >
              <AnimatedCatalogIcon />
              <span>Explore Catalog</span>
            </Link>
          </CtaCard>
        </section>
      )}
    </>
  );
}
