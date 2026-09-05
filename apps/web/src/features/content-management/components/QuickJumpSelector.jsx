import React from "react";
import { Icon } from "@iconify/react";
import { ALL_SECTIONS_LIST } from "../constants/allSectionsList";

export default function QuickJumpSelector({
  activeSub,
  setActiveSub,
  setTab,
  cms,
  getSectionDisplayName,
  getSectionToggleKey,
  showDropdownSelect,
  setShowDropdownSelect,
  selectSearchQuery,
  setSelectSearchQuery,
  activeFilterTab,
}) {
  const currentSection = ALL_SECTIONS_LIST.find((s) => s.key === activeSub);

  return (
    <div style={{ position: "relative", marginBottom: "12px" }}>
      <button
        type="button"
        onClick={() => setShowDropdownSelect((prev) => !prev)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--surface-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-admin, 8px)",
          padding: "8px 12px",
          cursor: "pointer",
          boxShadow: "0 2px 6px var(--shadow-sm)",
          transition: "all 0.2s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Icon
            icon={currentSection?.icon || "solar:document-text-linear"}
            className="w-4 h-4 text-emerald-600 flex-shrink-0"
          />
          <span
            style={{
              fontSize: "0.82rem",
              fontWeight: 750,
              color: "var(--text-primary)",
            }}
          >
            {getSectionDisplayName(activeSub)}
          </span>
        </div>
        <Icon
          icon="solar:alt-arrow-down-linear"
          className={`w-4 h-4 text-slate-400 transition-transform ${
            showDropdownSelect ? "rotate-180" : ""
          }`}
        />
      </button>

      {showDropdownSelect && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            background: "var(--surface-card)",
            borderRadius: "var(--radius-admin, 8px)",
            border: "1px solid var(--border)",
            boxShadow: "0 12px 28px var(--shadow-md)",
            zIndex: 100,
            overflow: "hidden",
            padding: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 10px",
              borderBottom: "1px solid var(--border-subtle)",
              marginBottom: "6px",
            }}
          >
            <Icon
              icon="solar:magnifer-linear"
              className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0"
            />
            <input
              type="text"
              placeholder="Search sections..."
              value={selectSearchQuery}
              onChange={(e) => setSelectSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              style={{
                border: "none",
                outline: "none",
                fontSize: "0.8rem",
                width: "100%",
                fontWeight: 500,
                background: "transparent",
                color: "var(--text-primary)",
              }}
            />
            {selectSearchQuery && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectSearchQuery("");
                }}
                style={{
                  border: "none",
                  background: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  fontSize: "0.7rem",
                }}
              >
                Clear
              </button>
            )}
          </div>

          <div
            style={{
              maxHeight: "200px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            {ALL_SECTIONS_LIST.filter((s) => {
              const matchesSearch =
                s.label
                  .toLowerCase()
                  .includes(selectSearchQuery.toLowerCase()) ||
                s.key.toLowerCase().includes(selectSearchQuery.toLowerCase());
              const matchesTab =
                activeFilterTab === "All" || s.group === activeFilterTab;
              return matchesSearch && matchesTab;
            }).map((sec) => {
              const isOn = sec.hasToggle
                ? cms[getSectionToggleKey(sec.key)] !== "0"
                : true;
              return (
                <button
                  key={sec.key}
                  type="button"
                  onClick={() => {
                    setTab(sec.tab);
                    setActiveSub(sec.key);
                    setShowDropdownSelect(false);
                    setSelectSearchQuery("");
                  }}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "8px 10px",
                    borderRadius: "var(--radius-admin, 8px)",
                    border: "none",
                    background:
                      activeSub === sec.key
                        ? "var(--brand-glow-subtle)"
                        : "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "all 0.15s",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.62rem",
                        textTransform: "uppercase",
                        background: "var(--bg-surface)",
                        color: "var(--text-muted)",
                        padding: "1px 4px",
                        borderRadius: "3px",
                        fontWeight: 700,
                      }}
                    >
                      {sec.group}
                    </span>
                    <span
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: activeSub === sec.key ? 750 : 500,
                        color: "var(--text-primary)",
                      }}
                    >
                      {sec.label}
                    </span>
                  </div>
                  {sec.hasToggle && (
                    <span
                      style={{
                        fontSize: "0.58rem",
                        fontWeight: 800,
                        padding: "1px 5px",
                        borderRadius: "4px",
                        background: isOn
                          ? "var(--brand-glow-subtle)"
                          : "var(--bg-surface)",
                        color: isOn ? "var(--brand-primary)" : "var(--text-muted)",
                      }}
                    >
                      {isOn ? "ON" : "OFF"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
