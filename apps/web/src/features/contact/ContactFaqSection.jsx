import React, { useState } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { useSite } from "../../shared/context/SiteContext";
import Card from "../../shared/components/ui/Card";
import Badge from "../../shared/components/ui/Badge";
import styles from "../../pages/Contact.module.css";
import { FAQ_ITEMS } from "./contact.constants";

const ToggleIcon = ({ isOpen }) => (
  <motion.div
    animate={{ rotate: isOpen ? 45 : 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
    className="shrink-0 ml-4"
  >
    <Icon icon="solar:add-circle-linear" className={`w-5 h-5 ${isOpen ? "text-[var(--brand)]" : "text-slate-400"}`} />
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
          <div className={styles.sectionHeaderCenter}>
            <div className="flex justify-center mb-3">
              <Badge variant="brand" size="sm">
                Got Questions?
              </Badge>
            </div>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p className={styles.sectionDesc}>
              Clear answers regarding minimum orders, custom options, export compliance, and delivery.
            </p>
          </div>

          <div className={styles.faqList}>
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`${styles.faqCard} ${isOpen ? styles.faqCardOpen : ""}`}
                >
                  <button
                    type="button"
                    className={styles.faqQuestion}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <ToggleIcon isOpen={isOpen} />
                  </button>
                  {isOpen && <p className={styles.faqAnswer}>{item.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {c("about_cta_enabled", "1") !== "0" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 cta-section">
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
                    Direct Connect
                  </Badge>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Need Urgent Price Quotes or Product Advice?
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 max-w-xl font-medium leading-relaxed">
                  Talk directly with our factory sales desk on WhatsApp or explore our full industrial product catalog.
                </p>
              </div>

              <div className="shrink-0 self-start sm:self-auto flex flex-wrap items-center gap-3">
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
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-slate-200/90 dark:border-white/15 bg-slate-100/80 dark:bg-white/5 hover:bg-slate-200/80 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 font-bold text-sm transition-colors shadow-2xs"
                >
                  <AnimatedCatalogIcon />
                  <span>Explore Catalog</span>
                </Link>
              </div>
            </div>
          </Card>
        </section>
      )}
    </>
  );
}
