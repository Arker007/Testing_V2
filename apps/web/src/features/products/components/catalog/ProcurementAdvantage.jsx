import React from "react";
import { Icon } from "@iconify/react";
import { Badge } from "@/shared/ui";
import styles from "../../products.module.css";

const procurementItems = [
  {
    icon: "hugeicons:shield-check",
    tag: "±0.5mm QA",
    title: "Dimensional Tolerance Control",
    desc: "Extrusion section control to maintain exact cross-section dimensions and structural density across volume orders.",
  },
  {
    icon: "hugeicons:layers-01",
    tag: "Pan-India SLA",
    title: "Scheduled Batch Dispatch",
    desc: "Streamlined inventory and logistics support for recurring OEM production schedules and dependable pan-India distribution.",
  },
  {
    icon: "hugeicons:award-01",
    tag: "Engineering QA",
    title: "Technical Consultation",
    desc: "Direct access to polymer extrusion engineers to determine exact load calculations, FEA analysis, and custom profile selection.",
  },
];

export default function ProcurementAdvantage() {
  return (
    <section className={styles.procurementSection}>
      <div className={styles.procurementHead}>
        <div className="flex justify-center mb-4">
          <Badge variant="eyebrow" size="lg" icon="hugeicons:award-01">
            Why Buy Direct
          </Badge>
        </div>
        <h2 className="section-title text-3xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">Direct Factory Advantages</h2>
        <p className="section-desc text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl mx-auto mt-3 leading-relaxed">
          Get direct manufacturer rates, exact custom sizes, certified strength, and reliable pan-India delivery straight from our Ankleshwar plant.
        </p>
      </div>

      <div className={styles.procurementGrid}>
        {procurementItems.map((item, idx) => {
          return (
            <article key={idx} className={styles.procurementCard}>
              <div className={styles.procurementCardTop}>
                <div className={styles.procurementIcon}>
                  <Icon icon={item.icon} className="w-6 h-6" />
                </div>
                <span className={styles.procurementTag}>{item.tag}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
