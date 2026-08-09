import { useEffect, useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
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
        {saving ? <><i className="fa-solid fa-spinner fa-spin" /> Syncing…</> : <><i className="fa-solid fa-floppy-disk" /> Save Category</>}
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

  if (loading) return <div className={styles.loadingState}><i className="fa-solid fa-spinner fa-spin" /> Loading Category Editor...</div>;

  return (
    <div className={styles.dashboard}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
        <button className={styles.actionBtnSecondary} style={{ padding: "8px 16px" }} onClick={() => navigate("/admin/categories")}>
          <i className="fa-solid fa-arrow-left" /> Back
        </button>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1e2229", margin: 0 }}>
          {isNew ? "Add New Category" : `Edit Category: ${form.name}`}
        </h2>
      </div>

      <div className={styles.card} style={{ padding: "30px" }}>
        <form id="category-editor-form" onSubmit={handleSave}>
          <div className={styles.formGrid} style={{ gridTemplateColumns: "1.4fr 0.6fr" }}>
            <div>
              <div className={styles.formSectionTitle}><i className="fa-solid fa-circle-info" /> Category Details</div>
              <div className="form-group" style={{ marginBottom: "16px" }}>
                <label className="form-label" style={{ fontWeight: 600, fontSize: "13px" }}>Category Name *</label>
                <input className="form-input" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #edf2f7" }} required value={form.name} onChange={f("name")} placeholder="e.g., Plastic Lumber" />
              </div>
              <div className="form-group" style={{ marginBottom: "16px" }}>
                <label className="form-label" style={{ fontWeight: 600, fontSize: "13px" }}>Description</label>
                <textarea className="form-textarea" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #edf2f7", fontFamily: "inherit" }} rows={4} value={form.description} onChange={f("description")} placeholder="Enter category description..." />
              </div>

              <div className={styles.formSectionTitle} style={{ marginTop: "32px" }}><i className="fa-solid fa-list-check" /> Specifications Fields Template</div>
              <p style={{ fontSize: "0.78rem", color: "var(--muted)", marginBottom: "16px" }}>Define custom fields (e.g. dimensions, material) that products in this category will use.</p>
              
              {form.fields.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr 1fr auto", gap: "8px", marginBottom: "8px", paddingBottom: "8px", borderBottom: "1px solid rgba(5, 40, 63, 0.06)" }}>
                  <span style={{ width: "36px", fontSize: "11px", fontWeight: 700, color: "var(--muted)", textAlign: "center" }}>Grip</span>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--muted)" }}>Field Name (Key)</span>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--muted)" }}>Display Label</span>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--muted)" }}>Placeholder</span>
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
                    background: draggedIndex === i ? "rgba(244, 178, 24, 0.05)" : "transparent",
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
                      border: "1px solid #edf2f7", 
                      borderRadius: "8px", 
                      background: "#f8fafc",
                      color: "#a0aec0"
                    }}
                    title="Drag to reorder"
                  >
                    <i className="fa-solid fa-grip-vertical" />
                  </div>
                  <input className="form-input" style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #edf2f7" }} value={fld.name} onChange={(e) => setForm(p => ({ ...p, fields: p.fields.map((x, idx) => idx === i ? { ...x, name: e.target.value } : x) }))} placeholder="e.g. dimensions" />
                  <input className="form-input" style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #edf2f7" }} value={fld.label} onChange={(e) => setForm(p => ({ ...p, fields: p.fields.map((x, idx) => idx === i ? { ...x, label: e.target.value } : x) }))} placeholder="e.g. Dimensions (mm)" />
                  <input className="form-input" style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #edf2f7" }} value={fld.placeholder} onChange={(e) => setForm(p => ({ ...p, fields: p.fields.map((x, idx) => idx === i ? { ...x, placeholder: e.target.value } : x) }))} placeholder="e.g. 1200 x 1000 x 150" />
                  <button type="button" className={styles.delBtn} style={{ height: "36px", width: "36px", borderRadius: "8px" }} onClick={() => setForm(p => ({ ...p, fields: p.fields.filter((_, idx) => idx !== i) }))}><i className="fa-solid fa-trash" /></button>
                </div>
              ))}
              <button type="button" className={styles.actionBtnSecondary} style={{ padding: "8px 16px", marginTop: "8px" }} onClick={() => setForm(p => ({ ...p, fields: [...p.fields, { name: "", label: "", type: "text", placeholder: "" }] }))}>
                <i className="fa-solid fa-plus" /> Add Custom Field
              </button>
            </div>

            <div>
              <div className={styles.formSectionTitle}><i className="fa-solid fa-photo-film" /> Category Image</div>
              <p style={{ fontSize: "0.78rem", color: "var(--muted)", marginBottom: "16px" }}>Upload a thumbnail image to represent this category in the catalog.</p>
              <div className={styles.imgSection}>
                <div className={styles.imgGrid}>
                  {form.image && (
                    <div className={styles.imgThumb} style={{ width: "160px", height: "120px" }}>
                      <img src={form.image} alt="" />
                      <button type="button" className={styles.imgDel} onClick={() => setForm(p => ({ ...p, image: "" }))}><i className="fa-solid fa-xmark" /></button>
                    </div>
                  )}
                  {!form.image && (
                    <label className={styles.imgAdd} style={{ width: "160px", height: "120px" }}>
                      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                      {uploading ? <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: "1.5rem" }} /> : <i className="fa-solid fa-plus" style={{ fontSize: "1.5rem" }} />}
                      <span style={{ fontSize: "11px", fontWeight: "600", marginTop: "4px" }}>Add Image</span>
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.modalFooter} style={{ borderTop: "1px solid #edf2f7", paddingTop: "20px", marginTop: "32px" }}>
            <button type="button" className={styles.actionBtnSecondary} onClick={() => navigate("/admin/categories")}>Cancel</button>
            <button type="submit" className={styles.actionBtnPrimary} disabled={saving || uploading} style={{ minWidth: "160px" }}>
              {saving ? <><i className="fa-solid fa-circle-notch fa-spin" /> Saving category...</> : <><i className="fa-solid fa-floppy-disk" /> Save Category</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}