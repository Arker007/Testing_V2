import React from 'react';
import { Icon } from "@iconify/react";
import cStyles from "../styles/SiteContent.module.css";

export default function SectionEditor({
  selectedCmsGroup,
  cms,
  setCms,
  isCmsGroupEnabled,
  searchFieldQuery = ""
}) {
  const setM = (key) => (e) => setCms((p) => ({ ...p, [key]: e.target.value }));

  if (!selectedCmsGroup) return null;

  const rawFields = selectedCmsGroup.fields[0]?.type === "checkbox" && selectedCmsGroup.fields[0]?.isHeader 
    ? selectedCmsGroup.fields.slice(1) 
    : selectedCmsGroup.fields;

  // Filter fields based on searchFieldQuery
  const fieldsToRender = rawFields.filter(f => 
    !searchFieldQuery || 
    f.label.toLowerCase().includes(searchFieldQuery.toLowerCase()) ||
    (f.placeholder && f.placeholder.toLowerCase().includes(searchFieldQuery.toLowerCase()))
  );

  return (
    <div>
      <div style={!isCmsGroupEnabled ? { opacity: 0.55, pointerEvents: "none" } : {}}>
        {fieldsToRender.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-muted)", fontSize: "0.85rem" }}>
            <Icon icon="carbon:information" style={{ marginRight: "6px", color: "var(--brand)" }} className="w-4 h-4 inline" />
            No fields match your search filter "{searchFieldQuery}"
          </div>
        ) : (
          <div className={cStyles.editorBody}>
            {fieldsToRender.map((f) => {
              const key = f.key || "";
              const type = f.type || "";
              
              const isFullWidth = type === "image" || type === "textarea" || key === "address" || key === "description" || key === "map_embed" || key?.includes("desc") || key?.includes("text") || key?.includes("sub");

              return (
                <div key={f.key} className={cStyles.formGroup} style={{ gridColumn: isFullWidth ? "1 / -1" : "span 1" }}>
                  <label className={cStyles.formLabel}>{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea 
                      className={cStyles.formTextarea} 
                      rows={3} 
                      value={cms[f.key] !== undefined ? cms[f.key] : f.placeholder || ""} 
                      onChange={setM(f.key)} 
                      placeholder={f.placeholder} 
                    />
                  ) : f.type === "checkbox" ? (
                    <label className={cStyles.toggleRow}>
                      <span className={cStyles.toggleSwitch}>
                        <input 
                          type="checkbox" 
                          checked={cms[f.key] === "1" || cms[f.key] === undefined} 
                          onChange={(e) => setM(f.key)({ target: { value: e.target.checked ? "1" : "0" } })} 
                        />
                        <span className={cStyles.toggleSlider} />
                      </span>
                      <span className={cStyles.toggleLabelText}>{f.checkboxLabel || "Enable feature / section"}</span>
                    </label>
                  ) : (
                    <input 
                      className={cStyles.formInput} 
                      type="text" 
                      value={cms[f.key] !== undefined ? cms[f.key] : f.placeholder || ""} 
                      onChange={setM(f.key)} 
                      placeholder={f.placeholder} 
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
