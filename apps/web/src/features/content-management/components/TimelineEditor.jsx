import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import cStyles from "../styles/SiteContent.module.css";

export default function TimelineEditor({
  cms,
  setCms,
  tlCount,
  setTlCount,
  isCmsGroupEnabled,
  setModalItem,
  searchFieldQuery = ""
}) {
  const [confirmDeleteIdx, setConfirmDeleteIdx] = useState(null);

  const executeDelete = (indexToDel) => {
    setCms((prev) => {
      const copy = { ...prev };
      for (let i = indexToDel + 1; i <= tlCount; i++) {
        copy[`tl_${i-1}_year`] = copy[`tl_${i}_year`] || "";
        copy[`tl_${i-1}_title`] = copy[`tl_${i}_title`] || "";
        copy[`tl_${i-1}_desc`] = copy[`tl_${i}_desc`] || "";
      }
      delete copy[`tl_${tlCount}_year`];
      delete copy[`tl_${tlCount}_title`];
      delete copy[`tl_${tlCount}_desc`];
      return copy;
    });
    setTlCount((c) => Math.max(0, c - 1));
    setConfirmDeleteIdx(null);
  };

  const shiftOrder = (index, direction) => {
    if ((direction === -1 && index === 1) || (direction === 1 && index === tlCount)) return;
    const targetIdx = index + direction;
    
    setCms((prev) => {
      const copy = { ...prev };
      const current = {
        year: copy[`tl_${index}_year`] || "",
        title: copy[`tl_${index}_title`] || "",
        desc: copy[`tl_${index}_desc`] || ""
      };
      const target = {
        year: copy[`tl_${targetIdx}_year`] || "",
        title: copy[`tl_${targetIdx}_title`] || "",
        desc: copy[`tl_${targetIdx}_desc`] || ""
      };
      
      copy[`tl_${index}_year`] = target.year;
      copy[`tl_${index}_title`] = target.title;
      copy[`tl_${index}_desc`] = target.desc;
      
      copy[`tl_${targetIdx}_year`] = current.year;
      copy[`tl_${targetIdx}_title`] = current.title;
      copy[`tl_${targetIdx}_desc`] = current.desc;
      
      return copy;
    });
  };

  const rawEntries = Array.from({ length: tlCount }).map((_, i) => {
    const index = i + 1;
    const year = cms[`tl_${index}_year`] || "—";
    const title = cms[`tl_${index}_title`] || "No Title Entry";
    const desc = cms[`tl_${index}_desc`] || "No description provided.";
    return { index, year, title, desc };
  });

  const filteredEntries = rawEntries.filter(entry => 
    !searchFieldQuery ||
    entry.year.toLowerCase().includes(searchFieldQuery.toLowerCase()) ||
    entry.title.toLowerCase().includes(searchFieldQuery.toLowerCase()) ||
    entry.desc.toLowerCase().includes(searchFieldQuery.toLowerCase())
  );

  return (
    <div>
      <div style={!isCmsGroupEnabled ? { opacity: 0.55, pointerEvents: "none" } : {}}>
        <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--ink)", marginBottom: "6px" }}>Milestone Chronology Records</h4>
        <p style={{ fontSize: "0.78rem", color: "var(--muted)", marginBottom: "16px" }}>Manage timeline milestones displayed on the About Us journey.</p>
        
        <div className={cStyles.repeaterGrid}>
          {filteredEntries.map(({ index, year, title, desc }) => (
            <div key={index} className={cStyles.repeaterCard}>
              <div className={cStyles.repeaterCardContent}>
                <span className={cStyles.repeaterYear}>{year}</span>
                <span className={cStyles.repeaterTitle}>{title}</span>
                <span className={cStyles.repeaterSub}>{desc}</span>
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
                        disabled={index === tlCount || !!searchFieldQuery}
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
                        type: "timeline",
                        index,
                        data: { year, title, desc }
                      })}
                      title="Edit Milestone"
                    >
                      <Icon icon="solar:pen-linear" className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      type="button" 
                      className={cStyles.repeaterDelBtn} 
                      onClick={() => setConfirmDeleteIdx(index)}
                      title="Delete Milestone"
                    >
                      <Icon icon="solar:trash-bin-trash-linear" className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          {filteredEntries.length === 0 && searchFieldQuery && (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "24px", color: "var(--muted)", fontSize: "0.82rem" }}>
              No milestones match "{searchFieldQuery}"
            </div>
          )}

          <div 
            className={cStyles.repeaterAddCard} 
            onClick={() => {
              const nextIdx = tlCount + 1;
              setModalItem({
                type: "timeline",
                isNew: true,
                index: nextIdx,
                data: { year: "", title: "", desc: "" }
              });
            }}
          >
            <Icon icon="solar:add-circle-linear" className="w-5 h-5 mb-1" />
            <span>Add Milestone</span>
          </div>
        </div>
      </div>
    </div>
  );
}
