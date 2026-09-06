import React from "react";
import cStyles from "../styles/SiteContent.module.css";

const FILTER_GROUPS = ["All", "Profile", "Homepage", "About", "Products", "Contact", "SEO"];

export const SidebarFilterTabs = React.memo(function SidebarFilterTabs({
  activeFilterTab,
  setActiveFilterTab,
}) {
  return (
    <div className={`${cStyles.filterTabsRow} no-scrollbar`}>
      {FILTER_GROUPS.map((g) => (
        <button
          key={g}
          type="button"
          onClick={() => setActiveFilterTab(g)}
          className={`${cStyles.filterTabBtn} ${activeFilterTab === g ? cStyles.filterTabBtnActive : ""}`}
        >
          {g}
        </button>
      ))}
    </div>
  );
});
