import React from "react";
import { Icon } from "@iconify/react";
import { Input, Textarea } from "@/shared/ui";
import cStyles from "../styles/SiteContent.module.css";

export const TimelineModalFields = React.memo(function TimelineModalFields({ data, onChange }) {
  return (
    <>
      <div className={cStyles.formGroup}>
        <label htmlFor="timeline-year" className={cStyles.formLabel}>
          <Icon icon="carbon:calendar" className="w-3.5 h-3.5 text-emerald-600 inline mr-0.5 opacity-80" />
          <span>Year / Milestone Period</span>
          <span className="text-red-500 font-bold ml-0.5">*</span>
        </label>
        <Input
          id="timeline-year"
          required
          value={data.year || ""}
          onChange={(e) => onChange("year", e.target.value)}
          placeholder="e.g. 2018 or 2024–Present"
          leftIcon="carbon:calendar"
        />
      </div>

      <div className={cStyles.formGroup}>
        <label htmlFor="timeline-title" className={cStyles.formLabel}>
          <Icon icon="carbon:flag" className="w-3.5 h-3.5 text-emerald-600 inline mr-0.5 opacity-80" />
          <span>Strategic Milestone Title</span>
          <span className="text-red-500 font-bold ml-0.5">*</span>
        </label>
        <Input
          id="timeline-title"
          required
          value={data.title || ""}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="e.g. Nationwide Distribution & Export Expansion"
          leftIcon="carbon:flag"
        />
      </div>

      <div className={cStyles.formGroup}>
        <label htmlFor="timeline-desc" className={cStyles.formLabel}>
          <Icon icon="carbon:text-align-left" className="w-3.5 h-3.5 text-emerald-600 inline mr-0.5 opacity-80" />
          <span>Descriptive Detail & Key Accomplishments</span>
        </label>
        <Textarea
          id="timeline-desc"
          rows={3}
          value={data.desc || ""}
          onChange={(e) => onChange("desc", e.target.value)}
          placeholder="Detail the operational or technological breakthrough achieved..."
        />
      </div>
    </>
  );
});
