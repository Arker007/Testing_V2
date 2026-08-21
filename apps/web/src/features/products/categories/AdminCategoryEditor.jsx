import { useEffect, useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { Icon } from "@iconify/react";
import styles from "../../admin/components/AdminTable.module.css";

const EMPTY = { name: "", description: "", image: "", fields: [] };

export default function AdminCategoryEditor() {
  const { id } = useParams();
  const isNew = !id || id === "new";

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
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
  const headers = { Authorization: `Bearer ${localStorage.getItem("admin_token")}`, "Content-Type": "application/json" };

  useEffect(() => {
    if (!setHeaderActions || loading) return;
    setHeaderActions(
      <button
        type="submit"
        form="category-editor-form"
        className={styles.actionBtnPrimary}
        disabled={saving || uploading}
        style={{ minWidth: 150 }}
      >
        {saving ? <><Icon icon="solar:restart-linear" className="w-4 h-4 animate-spin mr-1 inline" /> Syncing…</> : <><Icon icon="solar:diskette-linear" className="w-4 h-4 mr-1 inline" /> Save Category</>}
      </button>
    );
    return () => setHeaderActions(null);
  }, [saving, uploading, loading, setHeaderActions]);

  useEffect(() => {
    if (!isNew) {
      setLoading(true);
      const headers = { Authorization: `Bearer ${localStorage.getItem("admin_token")}` };
      fetch(`/api/categories/${id}`, { headers })
        .then((r) => r.json())
        .then((c) => {
          if (c.error) { alert("Category not found."); navigate("/admin/categories"); return; }
          setForm({ name: c.name || "", description: c.description || "", image: c.image || "", fields: Array.isArray(c.fields) ? c.fields : [] });
        })
        .finally(() => setLoading(false));
    }
  }, [id, isNew, navigate]);

  const f = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    setUploading(true); const fd = new FormData(); fd.append("images", file);
    try {
      const res = await fetch("/api/upload/images", { method: "POST", headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }, body: fd });
      const data = await res.json();
      if (data.images && data.images[0]) setForm((f) => ({ ...f, image: data.images[0] }));
    } catch { alert("Image upload failed."); } finally { setUploading(false); }
  };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      const res = await fetch(isNew ? "/api/categories" : `/api/categories/${id}`, { method: isNew ? "POST" : "PUT", headers, body: JSON.stringify(form) });
      if (res.ok) navigate("/admin/categories");
      else { const d = await res.json(); alert(d.error || "Failed to save category."); }
    } catch { alert("A network error occurred. Please try again."); } finally { setSaving(false); }
  };

  if (loading) return <div className={styles.loadingState}><Icon icon="solar:restart-linear" className="w-5 h-5 animate-spin inline mr-2" /> Loading Category Editor...</div>;

  return (
    <div className={styles.dashboard}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
        <button className={styles.actionBtnSecondary} style={{ padding: "8px 16px" }} onClick={() => navigate("/admin/categories")}>
          <Icon icon="solar:arrow-left-linear" className="w-4 h-4 mr-1 inline" /> Back
        </button>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--gray-800)", margin: 0 }}>
          {isNew ? "Add New Category" : `Edit Category: ${form.name}`}
        </h2>
      </div>

      <div className={styles.card} style={{ padding: "30px" }}>
        <form id="category-editor-form" onSubmit={handleSave}>
          <div className={styles.formGrid} style={{ gridTemplateColumns: "1.4fr 0.6fr" }}>
            <div>
              <div className={styles.formSectionTitle}><Icon icon="solar:info-circle-linear" className="w-4 h-4 mr-1 inline" /> Category Details</div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Category Name *</label>
                <input className={styles.formInput} required value={form.name} onChange={f("name")} placeholder="e.g., Plastic Lumber" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Description</label>
                <textarea className={styles.formTextarea} rows={4} value={form.description} onChange={f("description")} placeholder="Enter category description..." />
              </div>

              <div className={styles.formSectionTitle} style={{ marginTop: "32px" }}><Icon icon="solar:checklist-minimalistic-linear" className="w-4 h-4 mr-1 inline" /> Specifications Fields Template</div>
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
                    <Icon icon="solar:hamburger-menu-linear" className="w-4 h-4" />
                  </div>
                  <input className={styles.formInput} value={fld.name} onChange={(e) => setForm(p => ({ ...p, fields: p.fields.map((x, idx) => idx === i ? { ...x, name: e.target.value } : x) }))} placeholder="e.g. dimensions" />
                  <input className={styles.formInput} value={fld.label} onChange={(e) => setForm(p => ({ ...p, fields: p.fields.map((x, idx) => idx === i ? { ...x, label: e.target.value } : x) }))} placeholder="e.g. Dimensions (mm)" />
                  <input className={styles.formInput} value={fld.placeholder} onChange={(e) => setForm(p => ({ ...p, fields: p.fields.map((x, idx) => idx === i ? { ...x, placeholder: e.target.value } : x) }))} placeholder="e.g. 1200 x 1000 x 150" />
                  <button type="button" className={styles.delBtn} style={{ height: "36px", width: "36px", borderRadius: "8px" }} onClick={() => setForm(p => ({ ...p, fields: p.fields.filter((_, idx) => idx !== i) }))}>
                    <Icon icon="solar:trash-bin-trash-linear" className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button type="button" className={styles.actionBtnSecondary} onClick={() => setForm(p => ({ ...p, fields: [...p.fields, { name: "", label: "", type: "text", placeholder: "" }] }))}>
                <Icon icon="solar:add-circle-linear" className="w-4 h-4 mr-1 inline" /> Add Custom Field
              </button>
            </div>

            <div>
              <div className={styles.formSectionTitle}>
                <Icon icon="solar:gallery-linear" className="w-4 h-4 mr-1 inline" /> Category Image
              </div>
              <p style={{ fontSize: "0.78rem", color: "var(--muted)", marginBottom: "16px" }}>Upload a thumbnail image to represent this category in the catalog.</p>
              <div className={styles.imgSection}>
                <div className={styles.imgGrid}>
                  {form.image && (
                    <div className={styles.imgThumb} style={{ width: "160px", height: "120px" }}>
                      <img src={form.image} alt="" />
                      <button type="button" className={styles.imgDel} onClick={() => setForm(p => ({ ...p, image: "" }))}>
                        <Icon icon="solar:close-circle-linear" className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  {!form.image && (
                    <label className={styles.imgAdd} style={{ width: "160px", height: "120px" }}>
                      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                      {uploading ? <Icon icon="solar:restart-linear" className="w-6 h-6 animate-spin" /> : <Icon icon="solar:add-circle-linear" className="w-6 h-6" />}
                      <span style={{ fontSize: "11px", fontWeight: "600", marginTop: "4px" }}>Add Image</span>
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.modalFooter} style={{ borderTop: "1px solid var(--gray-200)", paddingTop: "20px", marginTop: "32px" }}>
            <button type="button" className={styles.actionBtnSecondary} onClick={() => navigate("/admin/categories")}>Cancel</button>
            <button type="submit" className={styles.actionBtnPrimary} disabled={saving || uploading} style={{ minWidth: "160px" }}>
              {saving ? <><Icon icon="solar:restart-linear" className="w-4 h-4 animate-spin mr-1 inline" /> Saving category...</> : <><Icon icon="solar:diskette-linear" className="w-4 h-4 mr-1 inline" /> Save Category</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}