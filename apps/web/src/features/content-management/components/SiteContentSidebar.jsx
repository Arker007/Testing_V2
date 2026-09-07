import React, { useMemo } from "react";
import { Icon } from "@iconify/react";
import cStyles from "../styles/SiteContent.module.css";
import { ALL_SECTIONS_LIST } from "../constants/allSectionsList";
import { SidebarFilterTabs } from "./SidebarFilterTabs";

export default function SiteContentSidebar({
  tab,
  setTab,
  activeSub,
  setActiveSub,
  getSubSectionStatusBadge,
  activeFilterTab,
  setActiveFilterTab,
  selectSearchQuery,
  setSelectSearchQuery,
}) {
  const filteredSections = useMemo(() => {
    return ALL_SECTIONS_LIST.filter((sec) => {
      const matchesCategory =
        activeFilterTab === "All" || sec.group === activeFilterTab;
      const matchesSearch =
        !selectSearchQuery ||
        sec.label.toLowerCase().includes(selectSearchQuery.toLowerCase()) ||
        sec.key.toLowerCase().includes(selectSearchQuery.toLowerCase()) ||
        sec.group.toLowerCase().includes(selectSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeFilterTab, selectSearchQuery]);

  // Group filtered sections by category group
  const groupedSections = useMemo(() => {
    const groups = {};
    filteredSections.forEach((sec) => {
      const g = sec.group || "General";
      if (!groups[g]) groups[g] = [];
      groups[g].push(sec);
    });
    return groups;
  }, [filteredSections]);

  return (
    <aside className={cStyles.treeNav}>
      <div className={cStyles.treeTitle}>
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Icon
            icon="carbon:layers"
            className="w-4 h-4 text-emerald-600"
          />
          Sections
        </span>
        <span className={cStyles.treeCountBadge}>
          {filteredSections.length} {filteredSections.length === 1 ? "section" : "sections"}
        </span>
      </div>

      {/* Quick Search */}
      <div className={cStyles.sectionSearchBox}>
        <Icon
          icon="carbon:search"
          className={cStyles.sectionSearchIcon}
        />
        <input
          type="text"
          className={cStyles.sectionSearchInput}
          placeholder="Filter sections..."
          value={selectSearchQuery}
          onChange={(e) => setSelectSearchQuery(e.target.value)}
        />
        {selectSearchQuery && (
          <button
            type="button"
            className={cStyles.sectionSearchClear}
            onClick={() => setSelectSearchQuery("")}
            title="Clear filter"
          >
            <Icon icon="carbon:close-outline" className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Pills Filter */}
      <SidebarFilterTabs
        activeFilterTab={activeFilterTab}
        setActiveFilterTab={setActiveFilterTab}
      />

      {/* Sections List Grouped */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {Object.keys(groupedSections).length === 0 ? (
          <div
            style={{
              padding: "24px 12px",
              textAlign: "center",
              fontSize: "0.8rem",
              color: "var(--muted)",
            }}
          >
            <Icon
              icon="carbon:information"
              className="w-5 h-5 mx-auto mb-1 text-slate-400 block"
            />
            No sections match your filter
          </div>
        ) : (
          Object.entries(groupedSections).map(([groupName, items]) => (
            <div key={groupName} style={{ marginBottom: "8px" }}>
              <div className={cStyles.treeHeader}>{groupName}</div>
              {items.map((sec) => {
                const isSelected = tab === sec.tab && activeSub === sec.key;
                return (
                  <div
                    key={sec.key}
                    className={`${cStyles.treeNode} ${
                      isSelected ? cStyles.treeNodeActive : ""
                    }`}
                    onClick={() => {
                      setTab(sec.tab);
                      setActiveSub(sec.key);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setTab(sec.tab);
                        setActiveSub(sec.key);
                      }
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        minWidth: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Icon
                        icon={sec.icon || "carbon:document"}
                        className={`w-4 h-4 flex-shrink-0 ${
                          isSelected ? "text-emerald-700" : "text-emerald-600"
                        }`}
                      />
                      <span
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {sec.label}
                      </span>
                    </span>
                    {sec.hasToggle && getSubSectionStatusBadge && (
                      <span style={{ marginLeft: "8px", flexShrink: 0 }}>
                        {getSubSectionStatusBadge(sec.key)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
