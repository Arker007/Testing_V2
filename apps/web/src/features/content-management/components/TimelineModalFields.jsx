import React from "react";
import { Icon } from "@iconify/react";
import { Input, Textarea } from "@/shared/ui";
import cStyles from "../styles/SiteContent.module.css";

export const TimelineModalFields = React.memo(function TimelineModalFields({ data, onChange }) {
  return (
    <>
      <div className={cStyles.formGroup}>
        <Input
          label="Year / Milestone Period *"
          required
          value={data.year || ""}
          onChange={(e) => onChange("year", e.target.value)}
          placeholder="e.g. 2018 or 2024–Present"
          leftIcon="carbon:calendar"
        />
      </div>

      <div className={cStyles.formGroup}>
        <Input
          label="Strategic Milestone Title *"
          required
          value={data.title || ""}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="e.g. Nationwide Distribution & Export Expansion"
          leftIcon="carbon:flag"
        />
      </div>

      <div className={cStyles.formGroup}>
        <Textarea
          label="Descriptive Detail & Key Accomplishments"
          rows={3}
          value={data.desc || ""}
          onChange={(e) => onChange("desc", e.target.value)}
          placeholder="Detail the operational or technological breakthrough achieved..."
        />
      </div>
    </>
  );
});
