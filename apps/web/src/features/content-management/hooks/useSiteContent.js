import { useState, useEffect, useCallback } from "react";
import { SECTION_TOGGLE_KEYS } from "../constants/siteContent.constants";

export function useSiteContent() {
  const [tab, setTab] = useState("company");
  const [activeSub, setActiveSub] = useState("Business Info");
  const [company, setCompany] = useState({});
  const [cms, setCms] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tlCount, setTlCount] = useState(1);
  const [teamCount, setTeamCount] = useState(1);
  const [modalItem, setModalItem] = useState(null);

  const [searchFieldQuery, setSearchFieldQuery] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showDropdownSelect, setShowDropdownSelect] = useState(false);
  const [selectSearchQuery, setSelectSearchQuery] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState("All");

  useEffect(() => {
    const h = { Authorization: `Bearer ${localStorage.getItem("admin_token")}`, "Content-Type": "application/json" };
    Promise.all([
      fetch("/api/company", { headers: h }).then((r) => r.json()).catch(() => ({})),
      fetch("/api/content", { headers: h }).then((r) => r.json()).catch(() => ({})),
    ])
      .then(([co, cm]) => {
        setCompany(co || {});
        const flat = {};
        let mTl = 1, mTeam = 1;
        Object.entries(cm || {}).forEach(([k, v]) => {
          flat[k] = typeof v === "object" ? v.value : v;
          if (k.startsWith("tl_") && flat[k]) {
            const m = k.match(/tl_(\d+)_/); if (m) mTl = Math.max(mTl, parseInt(m[1]));
          }
          if (k.startsWith("team_") && flat[k]) {
            const m = k.match(/team_(\d+)_/); if (m) mTeam = Math.max(mTeam, parseInt(m[1]));
          }
        });
        setTlCount(mTl);
        setTeamCount(mTeam);
        setCms(flat);
      })
      .finally(() => setLoading(false));
  }, []);

  const executePost = useCallback(async (url, data) => {
    setSaving(true);
    try {
      await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}`, "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSaving(false);
      setSaved(true);
      setToastMessage("Content settings updated successfully!");
      setShowToast(true);
      setTimeout(() => {
        setSaved(false);
        setShowToast(false);
      }, 3000);
    } catch {
      setSaving(false);
      setToastMessage("Failed to save changes.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }, []);

  const uploadLogo = useCallback(async (file, key) => {
    if (!file) return;
    const fd = new FormData(); fd.append("images", file);
    try {
      const res = await fetch("/api/upload/images", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
        body: fd,
      });
      const data = await res.json();
      if (data.images?.[0]) setCompany((p) => ({ ...p, [key]: data.images[0] }));
    } catch { alert("Image upload failed"); }
  }, []);

  const getSectionToggleKey = useCallback((sectionName) => SECTION_TOGGLE_KEYS[sectionName] || null, []);

  const handleToggleSection = useCallback((sectionName) => {
    const key = getSectionToggleKey(sectionName);
    if (!key) return;
    setCms((prev) => {
      const isCurrentlyOn = prev[key] !== "0";
      return { ...prev, [key]: isCurrentlyOn ? "0" : "1" };
    });
  }, [getSectionToggleKey]);

  const handleModalSave = useCallback((e) => {
    e.preventDefault();
    if (!modalItem) return;
    const { type, index, data } = modalItem;
    setCms((prev) => {
      const copy = { ...prev };
      if (type === "timeline") {
        copy[`tl_${index}_year`] = data.year;
        copy[`tl_${index}_title`] = data.title;
        copy[`tl_${index}_desc`] = data.desc;
      } else {
        copy[`team_${index}_name`] = data.name;
        copy[`team_${index}_role`] = data.role;
        copy[`team_${index}_init`] = data.init;
        copy[`team_${index}_color`] = data.color;
      }
      return copy;
    });
    setModalItem(null);
  }, [modalItem]);

  return {
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
  };
}
