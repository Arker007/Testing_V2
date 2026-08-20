import React from "react";

const FILTER_GROUPS = ["All", "Profile", "Homepage", "About", "Contact", "SEO"];

export const SidebarFilterTabs = React.memo(function SidebarFilterTabs({
  activeFilterTab,
  setActiveFilterTab,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "4px",
        overflowX: "auto",
        paddingBottom: "10px",
        borderBottom: "1px solid var(--gray-100)",
        marginBottom: "8px",
      }}
      className="no-scrollbar"
    >
      {FILTER_GROUPS.map((g) => (
        <button
          key={g}
          type="button"
          onClick={() => setActiveFilterTab(g)}
          style={{
            padding: "4px 8px",
            borderRadius: "9999px",
            fontSize: "0.65rem",
            fontWeight: 750,
            background: activeFilterTab === g ? "var(--brand)" : "var(--gray-100)",
            color: activeFilterTab === g ? "var(--ink)" : "var(--gray-500)",
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {g}
        </button>
      ))}
    </div>
  );
});
