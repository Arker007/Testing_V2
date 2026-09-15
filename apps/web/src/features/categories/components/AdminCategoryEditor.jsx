import { useEffect, useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { Icon } from "@iconify/react";
import styles from "@/features/admin/styles/AdminTable.module.css";
import {
  Input,
  Textarea,
  Button,
  Card,
  Spinner,
  OptimizedImage,
} from "@/shared/ui";
import { ImageUploadModal } from "@/features/admin/components";
import { CategoryService } from "../services/category.service";

const EMPTY = { name: "", description: "", image: "", fields: [] };

export default function AdminCategoryEditor() {
  const { id } = useParams();
  const isNew = !id || id === "new";

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const navigate = useNavigate();

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    
    setForm(prev => {
      const fieldsCopy = [...prev.fields];
      const [draggedItem] = fieldsCopy.splice(draggedIndex, 1);
      fieldsCopy.splice(targetIndex, 0, draggedItem);
      return { ...prev, fields: fieldsCopy };
    });
    setDraggedIndex(null);
  };
  const { setHeaderActions } = useOutletContext() || {};

  useEffect(() => {
    if (!setHeaderActions || loading) return;
    setHeaderActions(
      <Button
        type="submit"
        form="category-editor-form"
        variant="primary"
        size="md"
        disabled={saving}
        loading={saving}
        loadingText="Syncing…"
        icon={<Icon icon="carbon:save" className="w-4 h-4 mr-1.5" />}
        className="min-w-[150px]"
      >
        Save Category
      </Button>
    );
    return () => setHeaderActions(null);
  }, [saving, loading, setHeaderActions]);

  useEffect(() => {
    if (!isNew) {
      setLoading(true);
      CategoryService.getById(id)
        .then((c) => {
          if (c.error) { alert("Category not found."); navigate("/admin/categories"); return; }
          setForm({ name: c.name || "", description: c.description || "", image: c.image || "", fields: Array.isArray(c.fields) ? c.fields : [] });
        })
        .finally(() => setLoading(false));
    }
  }, [id, isNew, navigate]);

  const f = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleImagesSelected = (urls) => {
    if (urls && urls[0]) {
      setForm((p) => ({ ...p, image: urls[0] }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    const token = localStorage.getItem("admin_token");
    try {
      if (isNew) {
        await CategoryService.create(form, token);
      } else {
        await CategoryService.update(id, form, token);
      }
      navigate("/admin/categories");
    } catch (err) { alert(err.message || "A network error occurred. Please try again."); } finally { setSaving(false); }
  };

  if (loading) return <div className={styles.loadingState}><Icon icon="carbon:renew" className="w-5 h-5 animate-spin inline mr-2" /> Loading Category Editor...</div>;

  return (
    <div className={styles.dashboard}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
        <Button variant="outline" size="sm" onClick={() => navigate("/admin/categories")}>
          <Icon icon="carbon:arrow-left" className="w-4 h-4 mr-1 inline" /> Back
        </Button>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--gray-800)", margin: 0 }}>
          {isNew ? "Add New Category" : `Edit Category: ${form.name}`}
        </h2>
      </div>

      <Card className="p-6 md:p-8">
        <form id="category-editor-form" onSubmit={handleSave}>
          <div className={styles.formGrid} style={{ gridTemplateColumns: "1.4fr 0.6fr" }}>
            <div className="space-y-4">
              <div className={styles.formSectionTitle}><Icon icon="carbon:information" className="w-4 h-4 mr-1 inline" /> Category Details</div>
              <Input
                label="Category Name *"
                required
                value={form.name}
                onChange={f("name")}
                placeholder="e.g., Plastic Lumber"
              />
              <Textarea
                label="Description"
                rows={4}
                value={form.description}
                onChange={f("description")}
                placeholder="Enter category description..."
              />

              <div className={styles.formSectionTitle} style={{ marginTop: "32px" }}><Icon icon="carbon:list-checked" className="w-4 h-4 mr-1 inline" /> Specifications Fields Template</div>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginBottom: "16px" }}>Define custom fields (e.g. dimensions, material) that products in this category will use.</p>
              
              {form.fields.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr 1fr auto", gap: "8px", marginBottom: "8px", paddingBottom: "8px", borderBottom: "1px solid var(--border-subtle)" }}>
                  <span style={{ width: "36px", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textAlign: "center" }}>Grip</span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>Field Name (Key)</span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>Display Label</span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>Placeholder</span>
                  <span style={{ width: "36px" }} />
                </div>
              )}

              {form.fields.map((fld, i) => (
                <div 
                  key={i} 
                  draggable
                  onDragStart={(e) => handleDragStart(e, i)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, i)}
                  style={{ 
                    display: "grid", 
                    gridTemplateColumns: "auto 1fr 1fr 1fr auto", 
                    gap: "8px", 
                    marginBottom: "10px", 
                    alignItems: "center",
                    background: draggedIndex === i ? "var(--warning-bg)" : "transparent",
                    borderRadius: "8px",
                    transition: "background 0.2s"
                  }}
                >
                  <div 
                    style={{ 
                      cursor: "grab", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      width: "36px", 
                      height: "36px", 
                      border: "1px solid var(--border)", 
                      borderRadius: "8px", 
                      background: "var(--bg-surface)",
                      color: "var(--text-muted)"
                    }}
                    title="Drag to reorder"
                  >
                    <Icon icon="carbon:menu" className="w-4 h-4" />
                  </div>
                  <Input value={fld.name} onChange={(e) => setForm(p => ({ ...p, fields: p.fields.map((x, idx) => idx === i ? { ...x, name: e.target.value } : x) }))} placeholder="e.g. dimensions" />
                  <Input value={fld.label} onChange={(e) => setForm(p => ({ ...p, fields: p.fields.map((x, idx) => idx === i ? { ...x, label: e.target.value } : x) }))} placeholder="e.g. Dimensions (mm)" />
                  <Input value={fld.placeholder} onChange={(e) => setForm(p => ({ ...p, fields: p.fields.map((x, idx) => idx === i ? { ...x, placeholder: e.target.value } : x) }))} placeholder="e.g. 1200 x 1000 x 150" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="!p-1.5 !h-auto text-rose-500 hover:text-rose-700 hover:bg-rose-500/10 rounded-lg"
                    onClick={() => setForm(p => ({ ...p, fields: p.fields.filter((_, idx) => idx !== i) }))}
                    title="Remove Field"
                  >
                    <Icon icon="carbon:trash-can" className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setForm(p => ({ ...p, fields: [...p.fields, { name: "", label: "", type: "text", placeholder: "" }] }))}
              >
                <Icon icon="carbon:add-alt" className="w-4 h-4 mr-1.5 inline" /> Add Custom Field
              </Button>
            </div>

            <div>
              <div className={styles.formSectionTitle}>
                <Icon icon="carbon:image" className="w-4 h-4 mr-1 inline" /> Category Image
              </div>
              <p style={{ fontSize: "0.78rem", color: "var(--muted)", marginBottom: "16px" }}>Upload a thumbnail image to represent this category in the catalog.</p>
              <div className={styles.imgSection}>
                <div className={styles.imgGrid}>
                  {form.image && (
                    <div className="relative w-40 h-32 rounded-lg border border-[var(--border)] overflow-hidden group">
                      <OptimizedImage src={form.image} alt={form.name || "Category"} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        className="absolute top-1.5 right-1.5 p-1 bg-black/60 text-white hover:bg-rose-600 rounded-full transition-colors"
                        onClick={() => setForm(p => ({ ...p, image: "" }))}
                        title="Remove image"
                      >
                        <Icon icon="carbon:close" className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                  {!form.image && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setUploadModalOpen(true)}
                      className="w-40 h-32 !flex !flex-col items-center justify-center gap-2 border-dashed border-2 border-[var(--border)] hover:border-[var(--brand-primary)] bg-[var(--bg-surface-secondary)]/50 rounded-lg"
                    >
                      <Icon icon="carbon:add-alt" className="w-6 h-6 text-[var(--text-muted)]" />
                      <span className="text-xs font-semibold text-[var(--text-secondary)]">Add Image</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-[var(--border-subtle)] pt-5 mt-8">
            <Button type="button" variant="outline" size="md" onClick={() => navigate("/admin/categories")}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={saving}
              loading={saving}
              loadingText="Saving category..."
              icon={<Icon icon="carbon:save" className="w-4 h-4 mr-1.5" />}
              className="min-w-[160px]"
            >
              Save Category
            </Button>
          </div>
        </form>
      </Card>

      <ImageUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUploadSuccess={handleImagesSelected}
        multiple={false}
      />
    </div>
  );
}
