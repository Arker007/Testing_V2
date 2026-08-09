import React from 'react';
import cStyles from "./SiteContent.module.css";

export default function TimelineEditor({
  cms,
  setCms,
  tlCount,
  setTlCount,
  isCmsGroupEnabled,
  setModalItem,
  searchFieldQuery = ""
}) {
  const deleteTimelineItem = (indexToDel) => {
    if (!window.confirm("Delete this milestone record permanently?")) return;
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
    setTlCount((c) => Math.max(1, c - 1));
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
                  <i className="fa-solid fa-pen" />
                </button>
                <button 
                  type="button" 
                  className={cStyles.repeaterDelBtn} 
                  onClick={() => deleteTimelineItem(index)}
                  title="Delete Milestone"
                >
                  <i className="fa-solid fa-trash" />
                </button>
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
              setTlCount(nextIdx);
              setModalItem({
                type: "timeline",
                index: nextIdx,
                data: { year: "2026", title: "New Milestone", desc: "" }
              });
            }}
          >
            <i className="fa-solid fa-plus" />
            <span>Add Milestone</span>
          </div>
        </div>
      </div>
    </div>
  );
}
