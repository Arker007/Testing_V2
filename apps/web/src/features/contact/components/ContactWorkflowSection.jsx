import React from "react";
import styles from "../styles/contact.module.css";
import { WORKFLOW_STEPS } from "../constants";
import { Badge } from "@/shared/ui";

export default function ContactWorkflowSection() {
  return (
    <section className={styles.workflowSection}>
      <div className="container">
        <div className={styles.sectionHeaderCenter}>
          <div className="flex justify-center mb-4">
            <Badge variant="brand" size="md">
              Procurement Workflow
            </Badge>
          </div>
          <h2 className={styles.sectionTitleLight}>5-Stage Factory Procurement Process</h2>
          <p className={`${styles.sectionDescLight} max-w-2xl mx-auto`}>
            A structured manufacturing and supply lifecycle ensuring dimensional tolerance, load testing, and scheduled batch logistics.
          </p>
        </div>

        <div className={styles.workflowGrid}>
          {WORKFLOW_STEPS.map((step) => (
            <div key={step.num} className={styles.workflowCard}>
              <div className={`${styles.workflowNum} font-mono tabular-nums`}>{step.num}</div>
              <h3 className={styles.workflowTitle}>{step.title}</h3>
              <p className={styles.workflowDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

