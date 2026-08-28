/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useSite } from "../../shared/context/SiteContext";
import Card from "../../shared/components/ui/Card";
import Badge from "../../shared/components/ui/Badge";
import CtaCard from "../../shared/components/ui/CtaCard";
import styles from "./contact.module.css";
import { FAQ_ITEMS } from "./contact.constants";

const ToggleIcon = ({ isOpen }) => (
  <motion.div
    animate={{
      rotate: isOpen ? 135 : 0,
      scale: isOpen ? 1.08 : 1,
    }}
    transition={{ type: "spring", stiffness: 350, damping: 22 }}
    className={`shrink-0 ml-4 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 ${
      isOpen
        ? "bg-[var(--brand,#5FBF50)]/15 text-[var(--brand-dark,#4FC36D)] dark:text-[#5FBF50]"
        : "bg-slate-200/60 dark:bg-white/5 text-slate-400 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200"
    }`}
  >
    <Icon icon="solar:add-circle-linear" className="w-5 h-5" />
  </motion.div>
);

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
  const [openFaq, setOpenFaq] = useState(0);

  const waLink = `https://wa.me/${co("whatsapp", "919898686379").replace(/\D/g, "")}`;

  return (
    <>
      <section className={styles.faqSection}>
        <div className="container">
          <motion.div
            className={styles.sectionHeaderCenter}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45 }}
          >
            <div className="flex justify-center mb-3">
              <Badge variant="brand" size="sm">
                Got Questions?
              </Badge>
            </div>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p className={styles.sectionDesc}>
              Clear answers regarding minimum orders, custom options, export compliance, and delivery.
            </p>
          </motion.div>

          <div className={styles.faqList}>
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                  className={`${styles.faqCard} group transition-shadow ${
                    isOpen ? styles.faqCardOpen : ""
                  }`}
                >
                  <motion.button
                    type="button"
                    className={styles.faqQuestion}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    whileTap={{ scale: 0.995 }}
                  >
                    <span className="group-hover:text-[var(--brand-dark,#4FC36D)] dark:group-hover:text-[#5FBF50] transition-colors">
                      {item.q}
                    </span>
                    <ToggleIcon isOpen={isOpen} />
                  </motion.button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="faq-answer-content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                          transition: {
                            height: { duration: 0.32, ease: [0.04, 0.62, 0.23, 0.98] },
                            opacity: { duration: 0.25, delay: 0.04 },
                          },
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          transition: {
                            height: { duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] },
                            opacity: { duration: 0.15 },
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <p className={styles.faqAnswer}>{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

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
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <WhatsAppIcon />
              <span>Chat on WhatsApp</span>
            </a>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-slate-200/90 dark:border-[var(--border-subtle)] bg-slate-100/80 dark:bg-white/5 hover:bg-slate-200/80 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 font-bold text-sm transition-colors shadow-2xs"
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
