import React from "react";
import { Icon } from "@iconify/react";
import styles from "../../pages/Products.module.css";

const procurementItems = [
  {
    icon: "solar:shield-check-linear",
    title: "Dimensional Tolerance Control",
    desc: "Extrusion section control to maintain exact section dimensions and structural density across volume orders.",
  },
  {
    icon: "solar:layers-minimalistic-linear",
    title: "Scheduled Batch Dispatch",
    desc: "Streamlined inventory and logistics support for recurring OEM production schedules and pan-India distribution.",
  },
  {
    icon: "solar:medal-ribbons-star-linear",
    title: "Technical Consultation",
    desc: "Direct access to polymer extrusion engineers to determine exact load calculations and profile selection.",
  },
];

export default function ProcurementAdvantage() {
  return (
    <section className={styles.procurementSection}>
      <div className={styles.procurementHead}>
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#5FBF50]/10 dark:bg-[#5FBF50]/8 border border-[#5FBF50]/30 dark:border-[#5FBF50]/40 rounded-full text-[#54b862] dark:text-[#5FBF50] font-bold text-xs tracking-wider uppercase shadow-xs">
            <Icon icon="solar:verified-check-linear" className="w-4 h-4" />
            <span>Procurement Advantage</span>
          </span>
        </div>
        <h2 className="section-title text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Built for Reliable B2B Sourcing</h2>
        <p className="section-desc text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-3 leading-relaxed">
          Beyond structural performance, we ensure batch-to-batch consistency, tight tolerance control, and dependable dispatch schedules for industrial buyers.
        </p>
      </div>

      <div className={styles.procurementGrid}>
        {procurementItems.map((item, idx) => {
          return (
            <article key={idx} className={styles.procurementCard}>
              <div className={styles.procurementIcon}>
                <Icon icon={item.icon} className="w-6 h-6" />
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
