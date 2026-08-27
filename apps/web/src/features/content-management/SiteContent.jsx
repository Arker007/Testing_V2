import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "../admin/components/AdminTable.module.css";
import cStyles from "./SiteContent.module.css";

// Sub-components
import CompanyForm from "./CompanyForm";
import SectionEditor from "./SectionEditor";
import TimelineEditor from "./TimelineEditor";
import TeamEditor from "./TeamEditor";
import ModalEditor from "./components/ModalEditor";
import SiteContentSidebar from "./SiteContentSidebar";
import SiteContentToast from "./components/SiteContentToast";

// Hooks, Constants & Utilities
import { useSiteContent } from "./hooks/useSiteContent";
import {
  COMPANY_FIELDS,
  CMS_FIELDS,
  SECTION_DISPLAY_NAMES,
} from "./constants/siteContent.constants";
import { ALL_SECTIONS_LIST as allSectionsList } from "./constants/allSectionsList";

function getSectionDisplayName(sec) {
  return SECTION_DISPLAY_NAMES[sec] || sec;
}

export default function SiteContent() {
  const { setHeaderActions } = useOutletContext() || {};
  const {
    tab, setTab,
    activeSub, setActiveSub,
    company, setCompany,
    cms, setCms,
    loading, saving, saved,
    tlCount, setTlCount,
    teamCount, setTeamCount,
    modalItem, setModalItem,
    searchFieldQuery, setSearchFieldQuery,
    showToast, setShowToast,
    toastMessage,
    showDropdownSelect, setShowDropdownSelect,
    selectSearchQuery, setSelectSearchQuery,
    activeFilterTab, setActiveFilterTab,
    executePost, uploadLogo,
    getSectionToggleKey, handleToggleSection, handleModalSave,
  } = useSiteContent();

  useEffect(() => {
    if (!setHeaderActions || loading) return;
    setHeaderActions(
      <button
        type="submit"
        form={tab === "company" ? "company-form" : "cms-form"}
        className={styles.actionBtnPrimary}
        disabled={saving}
        style={{ minWidth: 150 }}
      >
        {saving ? <><i className="fa-solid fa-spinner fa-spin" /> Saving…</> : saved ? <><i className="fa-solid fa-check" /> Saved!</> : <><i className="fa-solid fa-floppy-disk" /> Save Changes</>}
      </button>
    );
    return () => setHeaderActions(null);
  }, [tab, saving, saved, loading, setHeaderActions]);

  const renderToggle = (sectionName) => {
    const key = getSectionToggleKey(sectionName);
    if (!key) return null;
    const isOn = cms[key] !== "0";
    return (
      <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", userSelect: "none" }}>
        <span style={{ fontSize: "11px", fontWeight: 700, color: isOn ? "var(--brand)" : "var(--gray-400)", minWidth: 28 }}>{isOn ? "ON" : "OFF"}</span>
        <span style={{ position: "relative", display: "inline-flex", width: 40, height: 22 }}>
          <input type="checkbox" style={{ opacity: 0, width: 0, height: 0, position: "absolute" }} checked={isOn} onChange={() => handleToggleSection(sectionName)} />
          <span style={{ position: "absolute", inset: 0, borderRadius: 22, backgroundColor: isOn ? "var(--brand)" : "var(--gray-200)", transition: "background-color 0.2s" }}>
            <span style={{ position: "absolute", top: 3, left: isOn ? 21 : 3, width: 16, height: 16, borderRadius: "50%", backgroundColor: "var(--white)", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
          </span>
        </span>
      </label>
    );
  };

  const getSubSectionStatusBadge = (sec) => {
    const key = getSectionToggleKey(sec);
    if (!key) return null;
    const isOn = cms[key] !== "0";
    return (
      <span className={cStyles.nodeBadge} style={{ 
        background: isOn ? "var(--brand-glow-subtle)" : "var(--gray-100)",
        color: isOn ? "var(--brand-dark)" : "var(--muted)",
      }}>
        {isOn ? "ON" : "OFF"}
      </span>
    );
  };

  if (loading) {
    return <div className={cStyles.loader}><i className="fa-solid fa-spinner fa-spin" /> Loading content...</div>;
  }

  const selectedCmsGroup = CMS_FIELDS.find((g) => g.section === activeSub);
  const isCmsGroupEnabled = selectedCmsGroup ? cms[getSectionToggleKey(activeSub)] !== "0" : true;

  return (
    <div className={cStyles.splitLayout}>
      <SiteContentSidebar
        tab={tab}
        setTab={setTab}
        activeSub={activeSub}
        setActiveSub={setActiveSub}
        cms={cms}
        getSectionDisplayName={getSectionDisplayName}
        getSectionToggleKey={getSectionToggleKey}
        getSubSectionStatusBadge={getSubSectionStatusBadge}
        showDropdownSelect={showDropdownSelect}
        setShowDropdownSelect={setShowDropdownSelect}
        selectSearchQuery={selectSearchQuery}
        setSelectSearchQuery={setSelectSearchQuery}
        activeFilterTab={activeFilterTab}
        setActiveFilterTab={setActiveFilterTab}
      />

      <main className={cStyles.editorPanel}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(5, 40, 63, 0.06)", paddingBottom: "16px", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--brand-light)", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center" }}>
              <i className={`fa-solid ${allSectionsList.find(s => s.key === activeSub)?.icon || "fa-file-pen"} text-[var(--brand-dark)]`} style={{ fontSize: "1.1rem" }} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, color: "var(--ink)" }}>{getSectionDisplayName(activeSub)}</h3>
              <p style={{ margin: 0, fontSize: "0.72rem", color: "var(--muted)" }}>Category: {allSectionsList.find(s => s.key === activeSub)?.group || "General"}</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {selectedCmsGroup && getSectionToggleKey(activeSub) && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--gray-50)", padding: "6px 12px", borderRadius: "8px", border: "1px solid var(--gray-200)" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--gray-600)" }}>Enable section:</span>
                {renderToggle(activeSub)}
              </div>
            )}

            <div style={{ position: "relative" }}>
              <i className="fa-solid fa-magnifying-glass text-slate-400" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "0.75rem" }} />
              <input 
                type="text" 
                placeholder="Filter settings..." 
                value={searchFieldQuery} 
                onChange={e => setSearchFieldQuery(e.target.value)}
                style={{ 
                  background: "var(--gray-50)", 
                  border: "1px solid var(--gray-200)", 
                  borderRadius: "8px", 
                  padding: "6px 12px 6px 30px", 
                  fontSize: "0.8rem", 
                  fontWeight: 500,
                  width: "180px",
                  outline: "none"
                }}
                className="focus:border-[var(--brand)] focus:bg-white transition-all"
              />
              {searchFieldQuery && (
                <button 
                  type="button" 
                  onClick={() => setSearchFieldQuery("")} 
                  style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", border: "none", background: "none", color: "var(--muted)", cursor: "pointer", fontSize: "0.7rem" }}
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              )}
            </div>
          </div>
        </div>

        {tab === "company" ? (
          <form id="company-form" onSubmit={(e) => { e.preventDefault(); executePost("/api/company", company); }}>
            <CompanyForm
              activeSub={activeSub}
              COMPANY_FIELDS={COMPANY_FIELDS}
              company={company}
              setCompany={setCompany}
              uploadLogo={uploadLogo}
              saving={saving}
              searchFieldQuery={searchFieldQuery}
            />
          </form>
        ) : (
          <form id="cms-form" onSubmit={(e) => { e.preventDefault(); executePost("/api/content", cms); }}>
            {activeSub === "About Timeline Entries" ? (
              <TimelineEditor
                activeSub={activeSub}
                cms={cms}
                setCms={setCms}
                tlCount={tlCount}
                setTlCount={setTlCount}
                renderToggle={renderToggle}
                saving={saving}
                isCmsGroupEnabled={isCmsGroupEnabled}
                getSectionDisplayName={getSectionDisplayName}
                setModalItem={setModalItem}
                searchFieldQuery={searchFieldQuery}
              />
            ) : activeSub === "About Team" ? (
              <TeamEditor
                activeSub={activeSub}
                selectedCmsGroup={selectedCmsGroup}
                cms={cms}
                setCms={setCms}
                teamCount={teamCount}
                setTeamCount={setTeamCount}
                renderToggle={renderToggle}
                saving={saving}
                isCmsGroupEnabled={isCmsGroupEnabled}
                getSectionDisplayName={getSectionDisplayName}
                setModalItem={setModalItem}
                searchFieldQuery={searchFieldQuery}
              />
            ) : (
              <SectionEditor
                activeSub={activeSub}
                selectedCmsGroup={selectedCmsGroup}
                cms={cms}
                setCms={setCms}
                isCmsGroupEnabled={isCmsGroupEnabled}
                renderToggle={renderToggle}
                saving={saving}
                getSectionDisplayName={getSectionDisplayName}
                searchFieldQuery={searchFieldQuery}
              />
            )}
          </form>
        )}
      </main>

      <SiteContentToast
        showToast={showToast}
        setShowToast={setShowToast}
        toastMessage={toastMessage}
      />

      <ModalEditor
        modalItem={modalItem}
        setModalItem={setModalItem}
        handleModalSave={handleModalSave}
      />
    </div>
  );
}
