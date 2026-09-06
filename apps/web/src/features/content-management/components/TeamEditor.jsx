import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import cStyles from "../styles/SiteContent.module.css";

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
  const [confirmDeleteIdx, setConfirmDeleteIdx] = useState(null);

  const setM = (key) => (e) => setCms((p) => ({ ...p, [key]: e.target.value }));

  const executeDelete = (indexToDel) => {
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
    setTeamCount((c) => Math.max(0, c - 1));
    setConfirmDeleteIdx(null);
  };

  const shiftOrder = (index, direction) => {
    if ((direction === -1 && index === 1) || (direction === 1 && index === teamCount)) return;
    const targetIdx = index + direction;
    
    setCms((prev) => {
      const copy = { ...prev };
      const current = {
        name: copy[`team_${index}_name`] || "",
        role: copy[`team_${index}_role`] || "",
        init: copy[`team_${index}_init`] || "",
        color: copy[`team_${index}_color`] || ""
      };
      const target = {
        name: copy[`team_${targetIdx}_name`] || "",
        role: copy[`team_${targetIdx}_role`] || "",
        init: copy[`team_${targetIdx}_init`] || "",
        color: copy[`team_${targetIdx}_color`] || ""
      };
      
      copy[`team_${index}_name`] = target.name;
      copy[`team_${index}_role`] = target.role;
      copy[`team_${index}_init`] = target.init;
      copy[`team_${index}_color`] = target.color;
      
      copy[`team_${targetIdx}_name`] = current.name;
      copy[`team_${targetIdx}_role`] = current.role;
      copy[`team_${targetIdx}_init`] = current.init;
      copy[`team_${targetIdx}_color`] = current.color;
      
      return copy;
    });
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
    const color = cms[`team_${index}_color`] || "var(--brand)";
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
          <div className={cStyles.editorBody}>
            {fieldsToRender.map((f) => {
              return (
                <div key={f.key} className={cStyles.formGroup} style={{ gridColumn: "1 / -1" }}>
                  <label className={cStyles.formLabel}>
                    <Icon icon="solar:text-field-linear" className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />
                    {f.label}
                  </label>
                  <input 
                    className={cStyles.formInput} 
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
                    color: "var(--white)", 
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
                  {confirmDeleteIdx === index ? (
                    <div className={cStyles.confirmDeleteRow}>
                      <button type="button" className={cStyles.cancelDeleteBtn} onClick={() => setConfirmDeleteIdx(null)}>Cancel</button>
                      <button type="button" className={cStyles.confirmDeleteBtn} onClick={() => executeDelete(index)}>
                        Delete
                      </button>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginRight: "4px" }}>
                        <button 
                          type="button" 
                          className={cStyles.repeaterOrderBtn} 
                          style={{ height: "14px", borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
                          disabled={index === 1 || !!searchFieldQuery}
                          onClick={() => shiftOrder(index, -1)}
                          title="Move Up"
                        >
                          <Icon icon="solar:alt-arrow-up-linear" className="w-3 h-3" />
                        </button>
                        <button 
                          type="button" 
                          className={cStyles.repeaterOrderBtn}
                          style={{ height: "14px", borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                          disabled={index === teamCount || !!searchFieldQuery}
                          onClick={() => shiftOrder(index, 1)}
                          title="Move Down"
                        >
                          <Icon icon="solar:alt-arrow-down-linear" className="w-3 h-3" />
                        </button>
                      </div>
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
                        <Icon icon="solar:pen-linear" className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        type="button" 
                        className={cStyles.repeaterDelBtn} 
                        onClick={() => setConfirmDeleteIdx(index)}
                        title="Delete Member"
                      >
                        <Icon icon="solar:trash-bin-trash-linear" className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
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
                setModalItem({
                  type: "team",
                  isNew: true,
                  index: nextIdx,
                  data: { name: "", role: "", init: "", color: "#0f172a" }
                });
              }}
            >
              <Icon icon="solar:add-circle-linear" className="w-5 h-5 mb-1" />
              <span>Add Profile</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
