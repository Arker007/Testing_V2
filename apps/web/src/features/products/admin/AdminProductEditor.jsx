import { useEffect, useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Button, Card, StatusToggle } from "@/shared/ui";
import styles from "../../admin/styles/AdminTable.module.css";
import GeneralTab from "./editor/GeneralTab";
import ImagesTab from "./editor/ImagesTab";
import SpecsTab from "./editor/SpecsTab";
import FaqsTab from "./editor/FaqsTab";
import { useProductEditor } from "./hooks/useProductEditor";

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
            style={{ accentColor: "var(--brand-primary)", transform: "scale(1.2)" }}
          />
          <span style={{ fontSize: "13px", fontWeight: 700, color: form.published ? "var(--brand-primary)" : "var(--text-muted)" }}>
            Show in Catalog
          </span>
        </label>
        <Button
          type="submit"
          form="product-editor-form"
          variant="primary"
          size="md"
          disabled={saving || uploading}
          loading={saving}
          loadingText="Syncing…"
          icon={<Icon icon="carbon:save" className="w-4 h-4 mr-1.5" />}
          className="min-w-[150px]"
        >
          Save Product
        </Button>
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
        <Icon icon="carbon:renew" className="w-5 h-5 animate-spin inline mr-2" /> Loading Product Editor...
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <div style={{ display: "flex", alignItems: "center", justifyItems: "center", gap: "16px", marginBottom: "8px" }}>
        <Button variant="outline" size="sm" onClick={() => navigate("/admin/products")}>
          <Icon icon="carbon:arrow-left" className="w-4 h-4 mr-1 inline" /> Back
        </Button>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--gray-800)", margin: 0 }}>
          {isNew ? "Add New Product" : `Edit Product: ${form.name}`}
        </h2>
      </div>

      <Card className="p-6 md:p-8">
        <form id="product-editor-form" onSubmit={handleSave}>
          {/* Tab Selector Headers */}
          <div className="flex gap-2 border-b border-[var(--border-subtle)] pb-3 mb-6 flex-wrap">
            {[
              { id: "general", label: "Core Details", icon: "carbon:information" },
              { id: "media", label: "Image Gallery", icon: "carbon:image" },
              { id: "specs", label: "Technical Specs", icon: "carbon:settings" },
              { id: "faqs", label: "FAQ Templates", icon: "carbon:help" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  activeTab === t.id
                    ? "bg-[var(--brand-primary)] text-white shadow-sm"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface-secondary)]"
                }`}
                onClick={() => setActiveTab(t.id)}
              >
                <Icon icon={t.icon} className="w-4 h-4" /> {t.label}
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
          <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-5 mt-8 flex-wrap gap-4">
            <Button type="button" variant="outline" size="md" onClick={() => navigate("/admin/products")}>
              Cancel
            </Button>
            <div className="flex items-center gap-5 ml-auto">
              <StatusToggle
                checked={Boolean(form.published)}
                onChange={(checked) => setForm((p) => ({ ...p, published: checked }))}
                label="Visible on Website"
                size="md"
              />
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={saving || uploading}
                loading={saving}
                loadingText="Saving..."
                icon={<Icon icon="carbon:save" className="w-4 h-4 mr-1.5" />}
                className="min-w-[150px]"
              >
                Save Product
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}