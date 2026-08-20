import React from "react";
import { ALL_SECTIONS_LIST } from "./allSectionsList";

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
          background: "var(--white)",
          border: "1px solid var(--navy-subtle)",
          borderRadius: "10px",
          padding: "8px 12px",
          cursor: "pointer",
          boxShadow: "0 2px 6px var(--shadow-sm)",
          transition: "all 0.2s",
        }}
        className="hover:border-[var(--brand)]"
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <i
            className={`fa-solid ${
              ALL_SECTIONS_LIST.find((s) => s.key === activeSub)?.icon ||
              "fa-file-pen"
            } text-[var(--brand)]`}
          />
          <span
            style={{
              fontSize: "0.82rem",
              fontWeight: 750,
              color: "var(--ink)",
            }}
          >
            {getSectionDisplayName(activeSub)}
          </span>
        </div>
        <i
          className={`fa-solid fa-chevron-down text-slate-400 transition-transform ${
            showDropdownSelect ? "rotate-180" : ""
          }`}
          style={{ fontSize: "0.75rem" }}
        />
      </button>

      {showDropdownSelect && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            background: "var(--white)",
            borderRadius: "12px",
            border: "1px solid var(--navy-subtle)",
            boxShadow: "0 12px 28px var(--shadow-sm)",
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
              borderBottom: "1px solid var(--gray-100)",
              marginBottom: "6px",
            }}
          >
            <i
              className="fa-solid fa-magnifying-glass text-slate-400"
              style={{ marginRight: "8px", fontSize: "0.8rem" }}
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
                  color: "var(--muted)",
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
                    borderRadius: "6px",
                    border: "none",
                    background:
                      activeSub === sec.key
                        ? "var(--brand-light)"
                        : "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "all 0.15s",
                  }}
                  className="hover:bg-slate-50"
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
                        background: "var(--gray-100)",
                        color: "var(--gray-600)",
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
                        color: "var(--ink)",
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
                          : "var(--gray-100)",
                        color: isOn ? "var(--brand-dark)" : "var(--muted)",
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
