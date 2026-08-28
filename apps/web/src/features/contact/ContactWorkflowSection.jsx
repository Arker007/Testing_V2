import React from "react";
import styles from "./contact.module.css";
import { WORKFLOW_STEPS } from "./contact.constants";
import Badge from "../../shared/components/ui/Badge";

export default function ContactWorkflowSection() {
  return (
    <section className={styles.workflowSection}>
      <div className="container">
        <div className={styles.sectionHeaderCenter}>
          <div className="flex justify-center mb-3">
            <Badge variant="dark" size="sm">
              Easy Ordering Process
            </Badge>
          </div>
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
