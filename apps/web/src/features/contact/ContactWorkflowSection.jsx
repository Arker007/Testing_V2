import React from "react";
import styles from "../../pages/Contact.module.css";
import { WORKFLOW_STEPS } from "./contact.constants";

export default function ContactWorkflowSection() {
  return (
    <section className={styles.workflowSection}>
      <div className="container">
        <div className={styles.sectionHeaderCenter}>
          <span className="section-eyebrow mx-auto">Easy Ordering Process</span>
          <h2 className={styles.sectionTitleLight}>5 Steps From Inquiry to Delivery</h2>
          <p className={styles.sectionDescLight}>
            Here is how simple it is to get high-quality recycled plastic products for your factory.
          </p>
        </div>

        <div className={styles.workflowGrid}>
          {WORKFLOW_STEPS.map((step) => (
            <div key={step.num} className={styles.workflowCard}>
              <div className={styles.workflowNum}>{step.num}</div>
              <h3 className={styles.workflowTitle}>{step.title}</h3>
              <p className={styles.workflowDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
