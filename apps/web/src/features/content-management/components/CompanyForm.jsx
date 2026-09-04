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
          <Icon icon="solar:info-circle-linear" style={{ marginRight: "6px", color: "var(--brand)" }} className="w-4 h-4 inline" />
          No fields match your search filter "{searchFieldQuery}"
        </div>
      ) : (
        <div className={cStyles.editorBody} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {filteredFields.map((f) => {
            const val = company[f.key] ?? "";
            if (f.type === "image") {
              return (
                <div key={f.key} className="form-group" style={{ gridColumn: "1 / -1" }}>
                  <label className="form-label" style={{ fontWeight: 600, fontSize: "13px", display: "block", marginBottom: "6px" }}>
                    {f.label}
                  </label>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    {val && (
                      <img
                        src={val}
                        alt="Logo Preview"
                        style={{ height: "48px", width: "auto", borderRadius: "6px", border: "1px solid var(--border)" }}
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file && uploadLogo) uploadLogo(file, f.key);
                      }}
                    />
                  </div>
                </div>
              );
            }

            if (f.type === "textarea") {
              return (
                <div key={f.key} className="form-group" style={{ gridColumn: "1 / -1" }}>
                  <label className="form-label" style={{ fontWeight: 600, fontSize: "13px", display: "block", marginBottom: "6px" }}>
                    {f.label}
                  </label>
                  <textarea
                    className="form-textarea"
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--gray-200)", fontFamily: "inherit" }}
                    rows={3}
                    placeholder={f.placeholder}
                    value={val}
                    onChange={setCo(f.key)}
                  />
                </div>
              );
            }

            return (
              <div key={f.key} className="form-group" style={{ gridColumn: f.key === "address" || f.key === "description" ? "1 / -1" : "span 1" }}>
                <label className="form-label" style={{ fontWeight: 600, fontSize: "13px", display: "block", marginBottom: "6px" }}>
                  {f.label}
                </label>
                <input
                  type="text"
                  className="form-input"
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--gray-200)" }}
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
