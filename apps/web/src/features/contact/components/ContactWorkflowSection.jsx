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
              icon={<Icon icon="hugeicons:arrow-up-down" className="w-4 h-4" />}
              className={styles.workflowBadge}
            >
              How to Order
            </Badge>
          }
          title="5 Simple Steps to Order"
          subtitle="From your initial inquiry to customized production, load testing, and scheduled delivery to your site."
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
                    <Icon icon="hugeicons:arrow-right-01" className="w-4 h-4" />
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


