import React from "react";
import DOMPurify from "dompurify";
import styles from "../../pages/ProductDetail.module.css";

export default function ProductTabsSection({
  product,
  categoryObj,
  specs,
  hasSpecs,
  features,
  tab,
  setTab,
  tabs,
}) {
  return (
    <section className={styles.tabsContainer}>
      <div className={styles.tabsHeader}>
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            className={`${styles.bigTab} ${tab === t.key ? styles.bigTabActive : ""}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className={styles.tabBody}>
        {tab === "description" && (
          <div className={`${styles.descTab} animation-fade`}>
            {product.description ? (
              <div
                className={styles.richDesc}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description),
                }}
              />
            ) : (
              <p>No description available for this product.</p>
            )}

            {features.length > 0 && (
              <div style={{ marginTop: "1.5rem" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--navy)", marginBottom: "0.5rem" }}>
                  Key Features
                </h3>
                <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", color: "var(--gray-500)", fontSize: "0.875rem" }}>
                  {features.map((feat, idx) => (
                    <li key={idx} style={{ marginBottom: "0.35rem" }}>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {tab === "specs" && hasSpecs && (
          <div className={`${styles.specsTable} animation-fade`}>
            {categoryObj && Array.isArray(categoryObj.fields) && categoryObj.fields.length > 0 ? (
              categoryObj.fields.map((fld) => {
                const val = specs[fld.name] || specs[fld.name.toLowerCase()];
                if (!val) return null;
                return (
                  <div key={fld.name} className={styles.specRow}>
                    <div className={styles.specKey}>{fld.label || fld.name}</div>
                    <div className={styles.specVal}>{val}</div>
                  </div>
                );
              })
            ) : (
              Object.entries(specs).map(([k, v]) => (
                <div key={k} className={styles.specRow}>
                  <div className={styles.specKey}>{k}</div>
                  <div className={styles.specVal}>{v}</div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "shipping" && (
          <div className={`animation-fade ${styles.descTab}`}>
            <h3>Shipping Information</h3>
            <p>
              {product.shippingInfo ||
                "Standard delivery times are between 3-7 business days across Pan-India. Expedited shipping options are available at checkout."}
            </p>
            <h3>Returns Policy</h3>
            <p>
              {product.returnPolicy ||
                "We offer a 7-day hassle-free return window for defective or incorrectly shipped items. Please ensure products are in original packaging and unused condition to qualify for processing."}
            </p>
          </div>
        )}

        {tab === "faq" && (
          <div className={`animation-fade ${styles.descTab}`}>
            <h3>Frequently Asked Questions</h3>
            {product.faqs && product.faqs.length > 0 ? (
              product.faqs.map((faq, i) => (
                <div key={i} className={styles.faqItem}>
                  <h4>{faq.question}</h4>
                  <p>{faq.answer}</p>
                </div>
              ))
            ) : (
              <p>No frequently asked questions available for this product.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
