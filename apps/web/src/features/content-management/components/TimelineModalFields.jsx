import React from "react";
import { Icon } from "@iconify/react";
import cStyles from "../styles/SiteContent.module.css";

export const TimelineModalFields = React.memo(function TimelineModalFields({ data, onChange }) {
  return (
    <>
      <div className={cStyles.formGroup}>
        <label className={cStyles.formLabel}>
          <Icon icon="carbon:calendar" className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />
          Year / Milestone Period *
        </label>
        <input
          className={cStyles.formInput}
          required
          value={data.year || ""}
          onChange={(e) => onChange("year", e.target.value)}
          placeholder="e.g. 2018 or 2024–Present"
        />
      </div>

      <div className={cStyles.formGroup}>
        <label className={cStyles.formLabel}>
          <Icon icon="carbon:flag" className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />
          Strategic Milestone Title *
        </label>
        <input
          className={cStyles.formInput}
          required
          value={data.title || ""}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="e.g. Nationwide Distribution & Export Expansion"
        />
      </div>

      <div className={cStyles.formGroup}>
        <label className={cStyles.formLabel}>
          <Icon icon="carbon:notebook" className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />
          Descriptive Detail & Key Accomplishments
        </label>
        <textarea
          className={cStyles.formTextarea}
          rows={3}
          value={data.desc || ""}
          onChange={(e) => onChange("desc", e.target.value)}
          placeholder="Detail the operational or technological breakthrough achieved..."
        />
      </div>
    </>
  );
});
