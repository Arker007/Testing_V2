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
  const [searchFieldQuery, setSearchFieldQuery] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
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
        Object.entries(cm || {}).forEach(([k, v]) => {
          flat[k] = typeof v === "object" ? v.value : v;
        });
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

  return {
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
    getSectionToggleKey, handleToggleSection,
  };
}
