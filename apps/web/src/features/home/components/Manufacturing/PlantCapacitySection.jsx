import React from "react";
import { Icon } from "@iconify/react";
import { useSite } from "../../../../shared/context/SiteContext";
import { PLANT_CAPACITY_METRICS, PRODUCTION_PIPELINE } from "./capacityData";
import styles from "./PlantCapacity.module.css";

export default function PlantCapacitySection() {
  const { c, openInquiryModal } = useSite();

  if (c("show_plant_capacity", "1") === "0") return null;

  return (
    <section
      id="plant-capacity"
      className={styles.capacitySection}
      aria-label="Manufacturing Scale, Plant Infrastructure & Compounding Capacity"
    >
      <div className="container">
        {/* Section Header */}
        <div className={styles.headerContainer}>
          <div className={styles.eyebrow}>
            <Icon icon="hugeicons:factory" width="16" height="16" />
            <span>{c("capacity_eyebrow", "Direct Manufacturing Scale")}</span>
          </div>
          <h2 className={styles.title}>
            {c("capacity_title", "High-Volume Production Capacity Built for Reliable B2B Supply")}
          </h2>
          <p className={styles.subtitle}>
            {c(
              "capacity_subtitle",
              "Vishal Enterprise operates primary polymer processing, twin-screw extrusion compounding, and heavy hydraulic compression presses to fulfill multi-ton contracts without intermediate markups."
            )}
          </p>
        </div>

        {/* 4-Column Key Metrics */}
        <div className={styles.metricsGrid}>
          {PLANT_CAPACITY_METRICS.map((metric) => (
            <div key={metric.id} className={styles.metricCard}>
              <div className={styles.metricHeader}>
                <div className={styles.metricIconWrapper}>
                  <Icon icon={metric.icon} width="22" height="22" />
                </div>
              </div>
              <div className={styles.metricValueRow}>
                <span className={`${styles.metricValue} tabular-nums font-mono`}>
                  {metric.value}
                </span>
                <span className={styles.metricUnit}>{metric.unit}</span>
              </div>
              <h3 className={styles.metricLabel}>{metric.label}</h3>
              <p className={styles.metricDescription}>{metric.description}</p>
            </div>
          ))}
        </div>

        {/* Closed-Loop Manufacturing Workflow */}
        <div className={styles.pipelineCard}>
          <div className={styles.pipelineHeader}>
            <div>
              <h3 className={styles.pipelineTitle}>
                {c("pipeline_title", "Zero-Landfill Closed-Loop Manufacturing Process")}
              </h3>
              <p className={styles.pipelineSubtitle}>
                From rigid polymer feedstock to certified structural profiles & heavy-duty pallets.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] text-white text-xs font-semibold rounded-lg hover:bg-emerald-800 transition-colors whitespace-nowrap shrink-0"
              onClick={() =>
                openInquiryModal({
                  source: "Plant Capacity & Factory Audit",
                  productName: "Factory Tour & Bulk Contract Audit",
                  category: "Manufacturing",
                })
              }
            >
              <Icon icon="hugeicons:building-03" width="16" height="16" />
              <span>Schedule Plant Visit / Factory Audit</span>
            </button>
          </div>

          <div className={styles.pipelineGrid}>
            {PRODUCTION_PIPELINE.map((step) => (
              <div key={step.step} className={styles.pipelineStep}>
                <div className={styles.stepNumber}>STAGE {step.step}</div>
                <div className={styles.stepIcon}>
                  <Icon icon={step.icon} width="18" height="18" />
                </div>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
