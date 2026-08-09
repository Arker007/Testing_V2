import React from "react";
import { Phone } from "lucide-react";
import QuoteButton from "../../shared/components/QuoteButton";
import styles from "../../pages/Products.module.css";

export default function ProcurementCtaBand() {
  return (
    <section className={styles.ctaBand}>
      <div className={styles.ctaTextCol}>
        <h3>Need Custom Dimensions or Bulk Quotes?</h3>
        <p>
          Send us your sizing requirements or expected order quantities. Our team will prepare a custom quotation within 24 hours.
        </p>
      </div>
      <div className={styles.ctaActionsCol}>
        <QuoteButton
          to="/contact"
          text="Request Bulk Quote"
          style={{ padding: "0.75rem 1.35rem", fontSize: "0.875rem" }}
        />
        <a href="tel:+919898686379" className={styles.ctaPhoneBtn}>
          <Phone size={15} />
          <span>Call Sales Desk</span>
        </a>
      </div>
    </section>
  );
}
