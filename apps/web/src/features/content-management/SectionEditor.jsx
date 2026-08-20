import React from 'react';
import cStyles from "./SiteContent.module.css";

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
          <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--muted)", fontSize: "0.85rem" }}>
            <i className="fa-solid fa-circle-info" style={{ marginRight: "6px", color: "var(--brand)" }} />
            No fields match your search filter "{searchFieldQuery}"
          </div>
        ) : (
          <div className={cStyles.editorBody} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
            {fieldsToRender.map((f) => {
              const key = f.key || "";
              const type = f.type || "";
              
              let gridSpan = "span 1";
              
              if (type === "image" || type === "textarea" || key === "address" || key === "description" || key === "map_embed" || key?.includes("desc") || key?.includes("text") || key?.includes("sub")) {
                gridSpan = "1 / -1";
              } else if (key === "name" || key === "tagline" || key === "gstin" || key?.includes("title") || key === "website" || key === "linkedin" || key === "instagram" || key === "youtube") {
                gridSpan = "span 2";
              }

              return (
                <div key={f.key} className="form-group" style={{ gridColumn: gridSpan }}>
                  <label className="form-label" style={{ fontWeight: 600, fontSize: "13px", display: "block", marginBottom: "6px" }}>{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea 
                      className="form-textarea" 
                      style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--gray-200)", fontFamily: "inherit" }} 
                      rows={3} 
                      value={cms[f.key] !== undefined ? cms[f.key] : f.placeholder || ""} 
                      onChange={setM(f.key)} 
                      placeholder={f.placeholder} 
                    />
                  ) : f.type === "checkbox" ? (
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", marginTop: "4px" }}>
                      <input 
                        type="checkbox" 
                        style={{ width: 16, height: 16, accentColor: "var(--brand)" }} 
                        checked={cms[f.key] === "1" || cms[f.key] === undefined} 
                        onChange={(e) => setM(f.key)({ target: { value: e.target.checked ? "1" : "0" } })} 
                      />
                      <span style={{ fontWeight: 500, fontSize: "13px", color: "var(--gray-800)" }}>{f.checkboxLabel || "Enable flag parameter"}</span>
                    </label>
                  ) : (
                    <input 
                      className="form-input" 
                      style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--gray-200)" }} 
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
