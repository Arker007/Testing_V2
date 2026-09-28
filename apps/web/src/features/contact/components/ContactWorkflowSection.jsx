import React from "react";
import { Icon } from "@iconify/react";
import styles from "../styles/contact-workflow.module.css";
import { WORKFLOW_STEPS } from "../constants";
import { SectionHeader, Badge } from "@/shared/ui";

export default function ContactWorkflowSection() {
  return (
    <section className={styles.workflowSection}>
      <div className="container">
        <SectionHeader
          eyebrow={
            <Badge
              variant="eyebrow"
              size="lg"
              icon={<Icon icon="solar:round-transfer-vertical-linear" className="w-4 h-4" />}
              className={styles.workflowBadge}
            >
              Procurement Workflow
            </Badge>
          }
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
                    <Icon icon="carbon:chevron-right" className="w-4 h-4" />
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


