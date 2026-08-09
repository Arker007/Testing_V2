import React from 'react';
import cStyles from "./SiteContent.module.css";

export default function TeamEditor({
  selectedCmsGroup,
  cms,
  setCms,
  teamCount,
  setTeamCount,
  isCmsGroupEnabled,
  setModalItem,
  searchFieldQuery = ""
}) {
  const setM = (key) => (e) => setCms((p) => ({ ...p, [key]: e.target.value }));

  const deleteTeamMember = (indexToDel) => {
    if (!window.confirm("Delete this profile permanently?")) return;
    setCms((prev) => {
      const copy = { ...prev };
      for (let i = indexToDel + 1; i <= teamCount; i++) {
        copy[`team_${i-1}_name`] = copy[`team_${i}_name`] || "";
        copy[`team_${i-1}_role`] = copy[`team_${i}_role`] || "";
        copy[`team_${i-1}_init`] = copy[`team_${i}_init`] || "";
        copy[`team_${i-1}_color`] = copy[`team_${i}_color`] || "";
      }
      delete copy[`team_${teamCount}_name`];
      delete copy[`team_${teamCount}_role`];
      delete copy[`team_${teamCount}_init`];
      delete copy[`team_${teamCount}_color`];
      return copy;
    });
    setTeamCount((c) => Math.max(1, c - 1));
  };

  const rawFields = selectedCmsGroup ? selectedCmsGroup.fields.slice(1, 3) : [];
  
  // Filter fields
  const fieldsToRender = rawFields.filter(f => 
    !searchFieldQuery || 
    f.label.toLowerCase().includes(searchFieldQuery.toLowerCase()) ||
    (f.placeholder && f.placeholder.toLowerCase().includes(searchFieldQuery.toLowerCase()))
  );

  const rawMembers = Array.from({ length: teamCount }).map((_, i) => {
    const index = i + 1;
    const name = cms[`team_${index}_name`] || "Anonymous Profile";
    const role = cms[`team_${index}_role`] || "Staff Executive";
    const init = cms[`team_${index}_init`] || "AP";
    const color = cms[`team_${index}_color`] || "#98d12a";
    return { index, name, role, init, color };
  });

  const filteredMembers = rawMembers.filter(m => 
    !searchFieldQuery ||
    m.name.toLowerCase().includes(searchFieldQuery.toLowerCase()) ||
    m.role.toLowerCase().includes(searchFieldQuery.toLowerCase()) ||
    m.init.toLowerCase().includes(searchFieldQuery.toLowerCase())
  );

  return (
    <div>
      <div style={!isCmsGroupEnabled ? { opacity: 0.55, pointerEvents: "none" } : {}}>
        {fieldsToRender.length > 0 && (
          <div className={cStyles.editorBody} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
            {fieldsToRender.map((f) => {
              return (
                <div key={f.key} className="form-group" style={{ gridColumn: "span 2" }}>
                  <label className="form-label" style={{ fontWeight: 600, fontSize: "13px", display: "block", marginBottom: "6px" }}>{f.label}</label>
                  <input 
                    className="form-input" 
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #edf2f7" }} 
                    type="text" 
                    value={cms[f.key] !== undefined ? cms[f.key] : f.placeholder || ""} 
                    onChange={setM(f.key)} 
                    placeholder={f.placeholder} 
                  />
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: "28px" }}>
          <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--ink)", marginBottom: "6px" }}>Team Profile Cards</h4>
          <p style={{ fontSize: "0.78rem", color: "var(--muted)", marginBottom: "16px" }}>Manage member cards rendering inside the executive grid.</p>
          
          <div className={cStyles.repeaterGrid}>
            {filteredMembers.map(({ index, name, role, init, color }) => (
              <div key={index} className={cStyles.repeaterCard}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                  <div style={{ 
                    width: "36px", 
                    height: "36px", 
                    borderRadius: "50%", 
                    background: color, 
                    color: "#ffffff", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    fontSize: "0.8rem",
                    fontWeight: "800",
                    flexShrink: 0
                  }}>
                    {init}
                  </div>
                  <div className={cStyles.repeaterCardContent}>
                    <span className={cStyles.repeaterTitle}>{name}</span>
                    <span className={cStyles.repeaterSub}>{role}</span>
                  </div>
                </div>
                <div className={cStyles.repeaterActions}>
                  <button 
                    type="button" 
                    className={cStyles.repeaterEditBtn} 
                    onClick={() => setModalItem({
                      type: "team",
                      index,
                      data: { name, role, init, color }
                    })}
                    title="Edit Member"
                  >
                    <i className="fa-solid fa-pen" />
                  </button>
                  <button 
                    type="button" 
                    className={cStyles.repeaterDelBtn} 
                    onClick={() => deleteTeamMember(index)}
                    title="Delete Member"
                  >
                    <i className="fa-solid fa-trash" />
                  </button>
                </div>
              </div>
            ))}

            {filteredMembers.length === 0 && searchFieldQuery && (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "24px", color: "var(--muted)", fontSize: "0.82rem" }}>
                No team profiles match "{searchFieldQuery}"
              </div>
            )}

            <div 
              className={cStyles.repeaterAddCard} 
              onClick={() => {
                const nextIdx = teamCount + 1;
                setTeamCount(nextIdx);
                setModalItem({
                  type: "team",
                  index: nextIdx,
                  data: { name: "Team Member Name", role: "Specialist", init: "VE", color: "#0B2F63" }
                });
              }}
            >
              <i className="fa-solid fa-plus" />
              <span>Add Profile</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
