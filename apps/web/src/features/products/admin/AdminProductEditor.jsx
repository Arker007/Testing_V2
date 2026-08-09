import { useEffect, useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import styles from "../../admin/components/AdminTable.module.css";
import GeneralTab from "./editor/GeneralTab";
import ImagesTab from "./editor/ImagesTab";
import SpecsTab from "./editor/SpecsTab";
import FaqsTab from "./editor/FaqsTab";
import { useProductEditor } from "./useProductEditor";

export default function AdminProductEditor() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();

  const {
    form,
    setForm,
    categories,
    loading,
    saving,
    uploading,
    handleSave,
    handleImageUpload,
    handleSingleImageReplace,
    handleImageUrlChange,
    handleDeleteImage,
    handleMakePrimary,
    handleAddBlankImage,
  } = useProductEditor(id, isNew);

  const [activeTab, setActiveTab] = useState("general");
  const [draggedFeatureIndex, setDraggedFeatureIndex] = useState(null);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);

  useEffect(() => {
    if (!catDropdownOpen) return;
    const handleClose = () => setCatDropdownOpen(false);
    window.addEventListener("click", handleClose);
    return () => window.removeEventListener("click", handleClose);
  }, [catDropdownOpen]);

  const handleFeatureDragStart = (e, index) => {
    setDraggedFeatureIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleFeatureDragOver = (e) => {
    e.preventDefault();
  };

  const handleFeatureDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedFeatureIndex === null || draggedFeatureIndex === targetIndex) return;

    setForm((prev) => {
      const featuresCopy = [...prev.features];
      const [draggedItem] = featuresCopy.splice(draggedFeatureIndex, 1);
      featuresCopy.splice(targetIndex, 0, draggedItem);
      return { ...prev, features: featuresCopy };
    });
    setDraggedFeatureIndex(null);
  };

  const { setHeaderActions } = useOutletContext() || {};

  useEffect(() => {
    if (!setHeaderActions || loading) return;
    setHeaderActions(
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", userSelect: "none" }}>
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))}
            style={{ accentColor: "#98d12a", transform: "scale(1.2)" }}
          />
          <span style={{ fontSize: "13px", fontWeight: 700, color: form.published ? "#98d12a" : "#8a92a6" }}>
            Show in Catalog
          </span>
        </label>
        <button
          type="submit"
          form="product-editor-form"
          className={styles.actionBtnPrimary}
          disabled={saving || uploading}
          style={{ minWidth: 150 }}
        >
          {saving ? (
            <><i className="fa-solid fa-spinner fa-spin" /> Syncing…</>
          ) : (
            <><i className="fa-solid fa-floppy-disk" /> Save Product</>
          )}
        </button>
      </div>
    );
    return () => setHeaderActions(null);
  }, [form.published, saving, uploading, loading, setHeaderActions, setForm]);

  const f = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handlePricingChange = (key, val) => {
    setForm((prev) => {
      const next = { ...prev, [key]: val };
      const mrp = parseFloat(next.oldPrice);
      const disc = parseFloat(next.discountRate);
      if (!isNaN(mrp) && !isNaN(disc)) {
        next.price = Math.round(mrp - (mrp * disc) / 100).toString();
      } else if (!isNaN(mrp)) {
        next.price = mrp.toString();
      } else {
        next.price = "";
      }
      return next;
    });
  };

  const selectedCat = categories.find((c) => String(c.id) === String(form.category));
  const catFields = selectedCat && Array.isArray(selectedCat.fields) ? selectedCat.fields : [];
  const filteredCatFields = catFields;

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <i className="fa-solid fa-spinner fa-spin" /> Loading Product Editor...
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <div style={{ display: "flex", alignItems: "center", justifyItems: "center", gap: "16px", marginBottom: "8px" }}>
        <button className={styles.actionBtnSecondary} style={{ padding: "8px 16px" }} onClick={() => navigate("/admin/products")}>
          <i className="fa-solid fa-arrow-left" /> Back
        </button>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1e2229", margin: 0 }}>
          {isNew ? "Add New Product" : `Edit Product: ${form.name}`}
        </h2>
      </div>

      <div className={styles.card} style={{ padding: "30px" }}>
        <form id="product-editor-form" onSubmit={handleSave}>
          {/* Tab Selector Headers */}
          <div style={{ display: "flex", gap: "12px", borderBottom: "1px solid rgba(5, 40, 63, 0.06)", paddingBottom: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
            {[
              { id: "general", label: "Core Details", icon: "fa-circle-info" },
              { id: "media", label: "Image Gallery", icon: "fa-images" },
              { id: "specs", label: "Technical Specs", icon: "fa-gears" },
              { id: "faqs", label: "FAQ Templates", icon: "fa-circle-question" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: activeTab === t.id ? "var(--brand-light)" : "transparent",
                  color: activeTab === t.id ? "var(--brand-dark)" : "var(--muted)",
                }}
                onClick={() => setActiveTab(t.id)}
              >
                <i className={`fa-solid ${t.icon}`} /> {t.label}
              </button>
            ))}
          </div>

          {/* Conditional Tab Panel Contents */}
          {activeTab === "general" && (
            <GeneralTab
              form={form}
              setForm={setForm}
              categories={categories}
              f={f}
              handlePricingChange={handlePricingChange}
              catDropdownOpen={catDropdownOpen}
              setCatDropdownOpen={setCatDropdownOpen}
            />
          )}

          {activeTab === "media" && (
            <ImagesTab
              form={form}
              handleSingleImageReplace={handleSingleImageReplace}
              handleImageUrlChange={handleImageUrlChange}
              handleDeleteImage={handleDeleteImage}
              handleMakePrimary={handleMakePrimary}
              handleImageUpload={handleImageUpload}
              handleAddBlankImage={handleAddBlankImage}
            />
          )}

          {activeTab === "specs" && (
            <SpecsTab
              form={form}
              setForm={setForm}
              filteredCatFields={filteredCatFields}
              handleFeatureDragStart={handleFeatureDragStart}
              handleFeatureDragOver={handleFeatureDragOver}
              handleFeatureDrop={handleFeatureDrop}
              draggedFeatureIndex={draggedFeatureIndex}
            />
          )}

          {activeTab === "faqs" && (
            <FaqsTab form={form} setForm={setForm} />
          )}

          {/* Persistent Action Footer */}
          <div className={styles.modalFooter} style={{ borderTop: "1px solid #edf2f7", paddingTop: "20px", marginTop: "32px" }}>
            <button type="button" className={styles.actionBtnSecondary} onClick={() => navigate("/admin/products")}>Cancel</button>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginLeft: "auto" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={form.published} onChange={(e) => setForm(p => ({ ...p, published: e.target.checked }))} style={{ accentColor: "#98d12a", transform: "scale(1.2)" }} />
                <span style={{ fontSize: "14px", fontWeight: 600, color: form.published ? "#98d12a" : "#8a92a6" }}>Visible on Website</span>
              </label>
              <button type="submit" className={styles.actionBtnPrimary} disabled={saving || uploading}>
                {saving ? <><i className="fa-solid fa-circle-notch fa-spin" /> Saving...</> : <><i className="fa-solid fa-floppy-disk" /> Save Product</>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}