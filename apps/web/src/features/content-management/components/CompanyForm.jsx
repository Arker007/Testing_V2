import { Icon } from "@iconify/react";
import cStyles from "../styles/SiteContent.module.css";

export default function CompanyForm({
  activeSub,
  COMPANY_FIELDS,
  company,
  setCompany,
  uploadLogo,
  searchFieldQuery = ""
}) {
  const selectedGroup = COMPANY_FIELDS.find((g) => g.section === activeSub) || COMPANY_FIELDS[0];

  const setCo = (key) => (e) =>
    setCompany((prev) => ({ ...prev, [key]: e.target.value }));

  if (!selectedGroup) return null;

  // Filter fields based on searchFieldQuery
  const filteredFields = selectedGroup.fields.filter(f => 
    !searchFieldQuery || 
    f.label.toLowerCase().includes(searchFieldQuery.toLowerCase()) ||
    (f.placeholder && f.placeholder.toLowerCase().includes(searchFieldQuery.toLowerCase()))
  );

  return (
    <div>
      {filteredFields.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-muted)", fontSize: "0.85rem" }}>
          <Icon icon="carbon:information" style={{ marginRight: "6px", color: "var(--brand)" }} className="w-4 h-4 inline" />
          No fields match your search filter "{searchFieldQuery}"
        </div>
      ) : (
        <div className={cStyles.editorBody}>
          {filteredFields.map((f) => {
            const val = company[f.key] ?? "";
            if (f.type === "image") {
              return (
                <div key={f.key} className={cStyles.formGroup} style={{ gridColumn: "1 / -1" }}>
                  <label className={cStyles.formLabel}>
                    <Icon icon="carbon:image" className="w-4 h-4 text-emerald-600 inline mr-1" />
                    {f.label}
                  </label>
                  <div className={cStyles.imageUploadContainer}>
                    {val ? (
                      <img
                        src={val}
                        alt="Logo Preview"
                        className={cStyles.imagePreview}
                      />
                    ) : (
                      <div style={{ width: "52px", height: "52px", borderRadius: "var(--radius-admin, 8px)", border: "1px dashed var(--border)", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface-card)" }}>
                        <Icon icon="carbon:image" className="w-5 h-5 text-slate-400" />
                      </div>
                    )}
                    <div className={cStyles.imageUploadMeta}>
                      <span className={cStyles.imageUploadText}>
                        {val ? "Replace Brand Asset" : "Upload Brand Asset"}
                      </span>
                      <span className={cStyles.imageUploadSub}>
                        PNG, SVG, or WebP recommended. Transparent background preferred.
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className={cStyles.imageFileInput}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file && uploadLogo) uploadLogo(file, f.key);
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            }

            if (f.type === "textarea") {
              return (
                <div key={f.key} className={cStyles.formGroup} style={{ gridColumn: "1 / -1" }}>
                  <label className={cStyles.formLabel}>
                    {f.label}
                  </label>
                  <textarea
                    className={cStyles.formTextarea}
                    rows={3}
                    placeholder={f.placeholder}
                    value={val}
                    onChange={setCo(f.key)}
                  />
                </div>
              );
            }

            return (
              <div key={f.key} className={cStyles.formGroup} style={{ gridColumn: f.key === "address" || f.key === "description" ? "1 / -1" : "span 1" }}>
                <label className={cStyles.formLabel}>
                  {f.label}
                </label>
                <input
                  type="text"
                  className={cStyles.formInput}
                  placeholder={f.placeholder}
                  value={val}
                  onChange={setCo(f.key)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
