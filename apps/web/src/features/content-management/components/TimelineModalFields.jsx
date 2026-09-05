import React from "react";

export const TimelineModalFields = React.memo(function TimelineModalFields({ data, onChange }) {
  return (
    <>
      <div className="form-group">
        <label className="form-label" style={{ fontWeight: 600, fontSize: "13px" }}>
          Year Milestone Label *
        </label>
        <input
          className="form-input"
          style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-admin, 8px)", border: "1px solid var(--gray-200)" }}
          required
          value={data.year || ""}
          onChange={(e) => onChange("year", e.target.value)}
          placeholder="e.g. 2018"
        />
      </div>
      <div className="form-group">
        <label className="form-label" style={{ fontWeight: 600, fontSize: "13px" }}>
          Strategic Entry Title *
        </label>
        <input
          className="form-input"
          style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-admin, 8px)", border: "1px solid var(--gray-200)" }}
          required
          value={data.title || ""}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="e.g. Export Expansion"
        />
      </div>
      <div className="form-group">
        <label className="form-label" style={{ fontWeight: 600, fontSize: "13px" }}>
          Descriptive Meta Information
        </label>
        <textarea
          className="form-textarea"
          style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-admin, 8px)", border: "1px solid var(--gray-200)", fontFamily: "inherit" }}
          rows={3}
          value={data.desc || ""}
          onChange={(e) => onChange("desc", e.target.value)}
          placeholder="Provide description..."
        />
      </div>
    </>
  );
});
