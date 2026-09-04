import React from "react";
import { Icon } from "@iconify/react";
import cStyles from "../styles/SiteContent.module.css";
import { ALL_SECTIONS_LIST } from "../constants/allSectionsList";
import { TAB_SECTIONS } from "../constants/siteContent.constants";
import QuickJumpSelector from "./QuickJumpSelector";
import { SidebarFilterTabs } from "./SidebarFilterTabs";

export default function SiteContentSidebar({
  tab,
  setTab,
  activeSub,
  setActiveSub,
  cms,
  getSectionDisplayName,
  getSectionToggleKey,
  getSubSectionStatusBadge,
  showDropdownSelect,
  setShowDropdownSelect,
  selectSearchQuery,
  setSelectSearchQuery,
  activeFilterTab,
  setActiveFilterTab,
}) {
  return (
    <aside className={cStyles.treeNav}>
      <div className={cStyles.treeTitle}>
        <Icon icon="solar:layers-minimalistic-linear" className="w-4 h-4 mr-1.5 inline" /> Content Sections Map
      </div>

      <QuickJumpSelector
        activeSub={activeSub}
        setActiveSub={setActiveSub}
        setTab={setTab}
        cms={cms}
        getSectionDisplayName={getSectionDisplayName}
        getSectionToggleKey={getSectionToggleKey}
        showDropdownSelect={showDropdownSelect}
        setShowDropdownSelect={setShowDropdownSelect}
        selectSearchQuery={selectSearchQuery}
        setSelectSearchQuery={setSelectSearchQuery}
        activeFilterTab={activeFilterTab}
      />

      <SidebarFilterTabs
        activeFilterTab={activeFilterTab}
        setActiveFilterTab={setActiveFilterTab}
      />

      {/* Dynamic section trees filtered by Tab */}
      {(activeFilterTab === "All" || activeFilterTab === "Profile") && (
        <>
          <div className={cStyles.treeHeader}>General Info</div>
          <div
            className={`${cStyles.treeNode} ${
              tab === "company" && activeSub === "Business Info"
                ? cStyles.treeNodeActive
                : ""
            }`}
            onClick={() => {
              setTab("company");
              setActiveSub("Business Info");
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Icon icon="solar:buildings-2-linear" className="w-4 h-4 text-emerald-600" />
              Company Profile
            </span>
          </div>
          <div
            className={`${cStyles.treeNode} ${
              tab === "company" && activeSub === "Contact Details"
                ? cStyles.treeNodeActive
                : ""
            }`}
            onClick={() => {
              setTab("company");
              setActiveSub("Contact Details");
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Icon icon="solar:phone-calling-linear" className="w-4 h-4 text-emerald-600" />
              Contact Details
            </span>
          </div>
          <div
            className={`${cStyles.treeNode} ${
              tab === "company" && activeSub === "Social & Links"
                ? cStyles.treeNodeActive
                : ""
            }`}
            onClick={() => {
              setTab("company");
              setActiveSub("Social & Links");
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Icon icon="solar:share-circle-linear" className="w-4 h-4 text-emerald-600" />
              Social Links
            </span>
          </div>
        </>
      )}

      {(activeFilterTab === "All" || activeFilterTab === "Homepage") && (
        <>
          <div className={cStyles.treeHeader}>Homepage Content</div>
          {TAB_SECTIONS.home_footer.map((sec) => {
            const sectionData = ALL_SECTIONS_LIST.find(s => s.key === sec);
            return (
              <div
                key={sec}
                className={`${cStyles.treeSubNode} ${
                  tab === "home_footer" && activeSub === sec
                    ? cStyles.treeSubNodeActive
                    : ""
                }`}
                onClick={() => {
                  setTab("home_footer");
                  setActiveSub(sec);
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {sectionData?.icon && <Icon icon={sectionData.icon} className="w-4 h-4" />}
                  {getSectionDisplayName(sec)}
                </span>
                {getSubSectionStatusBadge(sec)}
              </div>
            );
          })}
        </>
      )}

      {(activeFilterTab === "All" || activeFilterTab === "About") && (
        <>
          <div className={cStyles.treeHeader}>About Page Sections</div>
          {TAB_SECTIONS["About Page"].map((sec) => {
            const sectionData = ALL_SECTIONS_LIST.find(s => s.key === sec);
            return (
              <div
                key={sec}
                className={`${cStyles.treeSubNode} ${
                  tab === "About Page" && activeSub === sec
                    ? cStyles.treeSubNodeActive
                    : ""
                }`}
                onClick={() => {
                  setTab("About Page");
                  setActiveSub(sec);
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {sectionData?.icon && <Icon icon={sectionData.icon} className="w-4 h-4" />}
                  {getSectionDisplayName(sec)}
                </span>
                {getSubSectionStatusBadge(sec)}
              </div>
            );
          })}
        </>
      )}

      {(activeFilterTab === "All" || activeFilterTab === "Products") && (
        <>
          <div className={cStyles.treeHeader}>Products Catalog</div>
          <div
            className={`${cStyles.treeNode} ${
              tab === "Products Page" ? cStyles.treeNodeActive : ""
            }`}
            onClick={() => {
              setTab("Products Page");
              setActiveSub("Products Page");
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Icon icon="solar:box-minimalistic-linear" className="w-4 h-4 text-emerald-600" />
              Catalog Hero Banner
            </span>
            {getSubSectionStatusBadge("Products Page")}
          </div>
        </>
      )}

      {(activeFilterTab === "All" || activeFilterTab === "Contact") && (
        <>
          <div className={cStyles.treeHeader}>Contact Page Sections</div>
          {TAB_SECTIONS["Contact Page"].map((sec) => {
            const sectionData = ALL_SECTIONS_LIST.find(s => s.key === sec);
            return (
              <div
                key={sec}
                className={`${cStyles.treeSubNode} ${
                  tab === "Contact Page" && activeSub === sec
                    ? cStyles.treeSubNodeActive
                    : ""
                }`}
                onClick={() => {
                  setTab("Contact Page");
                  setActiveSub(sec);
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {sectionData?.icon && <Icon icon={sectionData.icon} className="w-4 h-4" />}
                  {getSectionDisplayName(sec)}
                </span>
                {getSubSectionStatusBadge(sec)}
              </div>
            );
          })}
        </>
      )}

      {(activeFilterTab === "All" || activeFilterTab === "SEO") && (
        <>
          <div className={cStyles.treeHeader}>SEO & Analytics</div>
          <div
            className={`${cStyles.treeNode} ${
              tab === "SEO / Meta" ? cStyles.treeNodeActive : ""
            }`}
            onClick={() => {
              setTab("SEO / Meta");
              setActiveSub("SEO / Meta");
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Icon icon="solar:magnifer-linear" className="w-4 h-4 text-emerald-600" />
              Global Meta & OpenGraph
            </span>
          </div>
        </>
      )}
    </aside>
  );
}
