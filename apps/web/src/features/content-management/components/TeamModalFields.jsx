import React from "react";
import { Icon } from "@iconify/react";
import cStyles from "../styles/SiteContent.module.css";

const COLOR_PRESETS = [
  { label: "Emerald", value: "#059669" },
  { label: "Navy", value: "#0f172a" },
  { label: "Royal Blue", value: "#2563eb" },
  { label: "Teal", value: "#0d9488" },
  { label: "Indigo", value: "#6366f1" },
  { label: "Rose", value: "#e11d48" },
  { label: "Amber", value: "#d97706" },
  { label: "Purple", value: "#7c3aed" },
];

export const TeamModalFields = React.memo(function TeamModalFields({ data, onChange }) {
  const activeColor = data.color || "#059669";
  const initials = data.init || (data.name ? data.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) : "TM");

  return (
    <>
      {/* Live Preview Card */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px 16px", background: "var(--bg-page)", borderRadius: "var(--radius-admin, 8px)", border: "1px solid var(--border)" }}>
        <div
          className={cStyles.avatarLivePreview}
          style={{ background: activeColor }}
        >
          {initials}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {data.name || "Member Name Preview"}
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {data.role || "Role Title Preview"}
          </div>
        </div>
      </div>

      <div className={cStyles.formGroup}>
        <label className={cStyles.formLabel}>
          <Icon icon="solar:user-linear" className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />
          Full Representative Name *
        </label>
        <input
          className={cStyles.formInput}
          required
          value={data.name || ""}
          onChange={(e) => {
            const newName = e.target.value;
            onChange("name", newName);
            // Suggest initials if not already customized
            if (!data.init && newName) {
              const parts = newName.trim().split(" ");
              const suggested = parts.length > 1 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : newName.slice(0, 2).toUpperCase();
              onChange("init", suggested);
            }
          }}
          placeholder="e.g. Dr. Rajesh Sharma"
        />
      </div>

      <div className={cStyles.formGroup}>
        <label className={cStyles.formLabel}>
          <Icon icon="solar:briefcase-linear" className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />
          Functional Role Title *
        </label>
        <input
          className={cStyles.formInput}
          required
          value={data.role || ""}
          onChange={(e) => onChange("role", e.target.value)}
          placeholder="e.g. Senior Polymer Materials Lead"
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div className={cStyles.formGroup}>
          <label className={cStyles.formLabel}>
            <Icon icon="solar:text-square-linear" className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />
            Avatar Initials (Max 2) *
          </label>
          <input
            className={cStyles.formInput}
            required
            maxLength={2}
            value={data.init || ""}
            onChange={(e) => onChange("init", e.target.value.toUpperCase().slice(0, 2))}
            placeholder="e.g. RS"
          />
        </div>

        <div className={cStyles.formGroup}>
          <label className={cStyles.formLabel}>
            <Icon icon="solar:pallete-2-linear" className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />
            Custom Color (Hex/Var) *
          </label>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <input
              type="color"
              value={activeColor.startsWith("#") ? activeColor : "#059669"}
              onChange={(e) => onChange("color", e.target.value)}
              style={{ width: "36px", height: "36px", borderRadius: "var(--radius-admin, 8px)", border: "1px solid var(--border)", padding: "2px", cursor: "pointer", background: "none" }}
              title="Pick color"
            />
            <input
              className={cStyles.formInput}
              required
              value={data.color || ""}
              onChange={(e) => onChange("color", e.target.value)}
              placeholder="e.g. #059669"
            />
          </div>
        </div>
      </div>

      {/* Preset Swatches */}
      <div>
        <span style={{ fontSize: "0.72rem", fontWeight: 650, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Preset Swatches
        </span>
        <div className={cStyles.colorPresetsRow}>
          {COLOR_PRESETS.map((p) => (
            <button
              key={p.value}
              type="button"
              className={`${cStyles.colorPresetBtn} ${activeColor === p.value ? cStyles.colorPresetBtnActive : ""}`}
              style={{ background: p.value }}
              onClick={() => onChange("color", p.value)}
              title={p.label}
            />
          ))}
        </div>
      </div>
    </>
  );
});
