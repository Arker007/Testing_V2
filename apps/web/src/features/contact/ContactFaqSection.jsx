import React, { useState } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Plus, Boxes } from "lucide-react";
import { useSite } from "../../shared/context/SiteContext";
import styles from "../../pages/Contact.module.css";
import { FAQ_ITEMS } from "./contact.constants";

const ToggleIcon = ({ isOpen }) => (
  <motion.div
    animate={{ rotate: isOpen ? 45 : 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
    className="shrink-0 ml-4"
  >
    <Plus className={`w-5 h-5 ${isOpen ? "text-[#98d12a]" : "text-slate-400"}`} />
  </motion.div>
);

const WhatsAppIcon = () => (
  <motion.svg
    className="w-5 h-5 fill-current shrink-0"
    viewBox="0 0 24 24"
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
  </motion.svg>
);

const AnimatedCatalogIcon = () => (
  <motion.div
    whileHover={{ scale: 1.15, rotate: [0, -10, 10, -10, 0] }}
    transition={{ duration: 0.5 }}
    className="shrink-0"
  >
    <Boxes className="w-5 h-5" />
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
            <span className="section-eyebrow mx-auto">Got Questions?</span>
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
        <section className={styles.cta}>
          <div className="container" style={{ textAlign: "center" }}>
            <span className="section-eyebrow mx-auto">Direct Connect</span>
            <h2 className={styles.ctaTitle}>Need Urgent Price Quotes or Product Advice?</h2>
            <p className={styles.ctaSub}>
              Talk directly with our factory sales desk on WhatsApp or browse our product catalog.
            </p>
            <div className={styles.ctaBtnGroup}>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className={`${styles.ctaPrimaryBtn} flex items-center justify-center gap-2`}>
                <WhatsAppIcon /> Chat on WhatsApp Now
              </a>
              <Link to="/products" className={`${styles.ctaSecondaryBtn} flex items-center justify-center gap-2`}>
                <AnimatedCatalogIcon /> Explore Product Catalog
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
