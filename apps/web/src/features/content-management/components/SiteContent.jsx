import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Button, SearchInput, StatusToggle } from "@/shared/ui";
import cStyles from "../styles/SiteContent.module.css";

// Sub-components
import CompanyForm from "./CompanyForm";
import SectionEditor from "./SectionEditor";
import SiteContentSidebar from "./SiteContentSidebar";
import SiteContentToast from "./SiteContentToast";

// Hooks, Constants & Utilities
import { useSiteContent } from "../hooks/useSiteContent";
import {
  COMPANY_FIELDS,
  CMS_FIELDS,
  SECTION_DISPLAY_NAMES,
} from "../constants/siteContent.constants";
import { ALL_SECTIONS_LIST as allSectionsList } from "../constants/allSectionsList";

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
    searchFieldQuery, setSearchFieldQuery,
    showToast, setShowToast,
    toastMessage,
    selectSearchQuery, setSelectSearchQuery,
    activeFilterTab, setActiveFilterTab,
    executePost, uploadLogo,
    getSectionToggleKey, handleToggleSection
  } = useSiteContent();

  useEffect(() => {
    if (!setHeaderActions || loading) return;
    setHeaderActions(
      <Button
        type="submit"
        form={tab === "company" ? "company-form" : "cms-form"}
        variant="primary"
        size="md"
        disabled={saving}
        loading={saving}
        loadingText="Saving…"
        icon={saved ? <Icon icon="carbon:checkmark-filled" className="w-4 h-4 mr-1.5" /> : <Icon icon="carbon:save" className="w-4 h-4 mr-1.5" />}
        className="min-w-[150px]"
      >
        {saved ? "Saved!" : "Save Changes"}
      </Button>
    );
    return () => setHeaderActions(null);
  }, [tab, saving, saved, loading, setHeaderActions]);

  const renderToggle = (sectionName) => {
    const key = getSectionToggleKey(sectionName);
    if (!key) return null;
    const isOn = cms[key] !== "0";
    return (
      <StatusToggle
        checked={isOn}
        onChange={() => handleToggleSection(sectionName)}
        showStatusLabel
        onLabel="ON"
        offLabel="OFF"
        size="sm"
      />
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
    return (
      <div className={cStyles.loader}>
        <Icon icon="carbon:renew" className="w-5 h-5 animate-spin mr-2 inline" /> Loading content...
      </div>
    );
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
        getSubSectionStatusBadge={getSubSectionStatusBadge}
        activeFilterTab={activeFilterTab}
        setActiveFilterTab={setActiveFilterTab}
        selectSearchQuery={selectSearchQuery}
        setSelectSearchQuery={setSelectSearchQuery}
      />

      <main className={cStyles.editorPanel}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(5, 40, 63, 0.06)", paddingBottom: "16px", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "var(--radius-admin, 8px)", background: "var(--brand-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon icon={allSectionsList.find(s => s.key === activeSub)?.icon || "carbon:document"} className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, color: "var(--ink)" }}>{getSectionDisplayName(activeSub)}</h3>
              <p style={{ margin: 0, fontSize: "0.72rem", color: "var(--muted)" }}>Category: {allSectionsList.find(s => s.key === activeSub)?.group || "General"}</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {selectedCmsGroup && getSectionToggleKey(activeSub) && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--gray-50)", padding: "6px 12px", borderRadius: "var(--radius-admin, 8px)", border: "1px solid var(--gray-200)" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--gray-600)" }}>Enable section:</span>
                {renderToggle(activeSub)}
              </div>
            )}

            <div className="w-48">
              <SearchInput
                placeholder="Filter settings..."
                value={searchFieldQuery}
                onChange={(e) => setSearchFieldQuery(e.target.value)}
                onClear={() => setSearchFieldQuery("")}
                size="sm"
              />
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
            <div className={cStyles.stickyActionBar}>
              <div className={cStyles.stickyStatusText}>
                <Icon icon="carbon:security" className="w-4 h-4 text-emerald-600" />
                <span>All profile adjustments auto-validate before sync.</span>
              </div>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={saving}
                loading={saving}
                loadingText="Saving…"
                icon={saved ? <Icon icon="carbon:checkmark-filled" className="w-4 h-4 mr-1.5" /> : <Icon icon="carbon:save" className="w-4 h-4 mr-1.5" />}
                className="min-w-[150px]"
              >
                {saved ? "Saved!" : "Save Profile"}
              </Button>
            </div>
          </form>
        ) : (
          <form id="cms-form" onSubmit={(e) => { e.preventDefault(); executePost("/api/content", cms); }}>
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
            <div className={cStyles.stickyActionBar}>
              <div className={cStyles.stickyStatusText}>
                <Icon icon="carbon:security" className="w-4 h-4 text-emerald-600" />
                <span>Modifications apply live to public website upon save.</span>
              </div>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={saving}
                loading={saving}
                loadingText="Saving…"
                icon={saved ? <Icon icon="carbon:checkmark-filled" className="w-4 h-4 mr-1.5" /> : <Icon icon="carbon:save" className="w-4 h-4 mr-1.5" />}
                className="min-w-[150px]"
              >
                {saved ? "Saved!" : "Save Section"}
              </Button>
            </div>
          </form>
        )}
      </main>

      <SiteContentToast
        showToast={showToast}
        setShowToast={setShowToast}
        toastMessage={toastMessage}
      />

    </div>
  );
}
