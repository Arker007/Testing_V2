import React from "react";
import { Icon } from "@iconify/react";
import styles from "../styles/contact-workflow.module.css";
import { WORKFLOW_STEPS } from "../constants";
import { SectionHeader } from "@/shared/ui";

export default function ContactWorkflowSection() {
  return (
    <section className={styles.workflowSection}>
      <div className="container">
        <SectionHeader
          eyebrow="Procurement Workflow"
          eyebrowVariant="dark"
          title="5-Stage Factory Procurement Process"
          subtitle="A structured manufacturing and supply lifecycle ensuring dimensional tolerance, load testing, and scheduled batch logistics."
          light
          size="lg"
        />

        <div className={styles.workflowGrid}>
          {WORKFLOW_STEPS.map((step, index) => (
            <div key={step.num} className={styles.workflowCard}>
              <div className={styles.workflowCardHeader}>
                <div className={`${styles.workflowNum} font-mono tabular-nums`}>{step.num}</div>
                {index < WORKFLOW_STEPS.length - 1 && (
                  <span className={styles.stepArrow} aria-hidden="true">
                    <Icon icon="solar:alt-arrow-right-bold" className="w-4 h-4" />
                  </span>
                )}
              </div>
              <h3 className={styles.workflowTitle}>{step.title}</h3>
              <p className={styles.workflowDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


