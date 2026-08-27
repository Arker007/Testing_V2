import React from "react";
import cStyles from "./SiteContent.module.css";
import { ALL_SECTIONS_LIST } from "./constants/allSectionsList";
import { TAB_SECTIONS } from "./constants/siteContent.constants";
import QuickJumpSelector from "./components/QuickJumpSelector";
import { SidebarFilterTabs } from "./components/SidebarFilterTabs";

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
        <i className="fa-solid fa-layer-group" /> Content Sections Map
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
            <span>
              <i className="fa-solid fa-building" style={{ marginRight: "8px" }} />{" "}
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
            <span>
              <i className="fa-solid fa-address-book" style={{ marginRight: "8px" }} />{" "}
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
            <span>
              <i className="fa-solid fa-share-nodes" style={{ marginRight: "8px" }} />{" "}
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
                <span>
                  {sectionData?.icon && <i className={`fa-solid ${sectionData.icon}`} style={{ marginRight: "8px", width: "16px", textAlign: "center" }} />}
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
                <span>
                  {sectionData?.icon && <i className={`fa-solid ${sectionData.icon}`} style={{ marginRight: "8px", width: "16px", textAlign: "center" }} />}
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
            <span>
              <i className="fa-solid fa-box" style={{ marginRight: "8px" }} />{" "}
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
                <span>
                  {sectionData?.icon && <i className={`fa-solid ${sectionData.icon}`} style={{ marginRight: "8px", width: "16px", textAlign: "center" }} />}
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
            <span>
              <i className="fa-solid fa-magnifying-glass" style={{ marginRight: "8px" }} />{" "}
              Global Meta & OpenGraph
            </span>
          </div>
        </>
      )}
    </aside>
  );
}
