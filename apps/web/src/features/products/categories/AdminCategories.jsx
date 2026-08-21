import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import styles from "../../admin/components/AdminTable.module.css";
import { InteractiveHoverButton } from "../../../registry/magicui/interactive-hover-button";

export default function AdminCategories() {
  const navigate = useNavigate();
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    const headers = { Authorization: `Bearer ${localStorage.getItem("admin_token")}`, "Content-Type": "application/json" };
    fetch("/api/categories", { headers }).then((r) => r.json())
      .then((d) => setCats(d.categories || d || []))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id) => {
    setDeleting(id);
    const headers = { Authorization: `Bearer ${localStorage.getItem("admin_token")}`, "Content-Type": "application/json" };
    await fetch(`/api/categories/${id}`, { method: "DELETE", headers });
    load(); setDeleting(null); setConfirmDelete(null);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.toolbar}>
        <p className={styles.count}>{cats.length} functional hierarchy matrices defined</p>
        <InteractiveHoverButton onClick={() => navigate("/admin/categories/new")} className="font-bold shadow-sm">
          Add Category
        </InteractiveHoverButton>
      </div>

      <div className={styles.card}>
        <div className={styles.thead} style={{ gridTemplateColumns: "2fr 2fr 1fr 100px" }}>
          <span>Directory Route Cluster</span><span>Subtext Summary</span><span>Timestamp Map</span><span style={{ textDirection: "rtl", paddingRight: "16px" }}>Actions</span>
        </div>
        {loading ? [1, 2, 3].map((i) => <div key={i} className={styles.skeleRow} />) :
          cats.length === 0 ? (
            <div className={styles.empty}>
              <Icon icon="solar:tag-linear" className="w-8 h-8 text-slate-400 mb-2" />
              <p>No categorisation parameters defined</p>
              <InteractiveHoverButton onClick={() => navigate("/admin/categories/new")} className="font-bold shadow-sm" style={{ marginTop: "12px" }}>
                Inject Root Group
              </InteractiveHoverButton>
            </div>
          ) : cats.map((c) => (
            <div key={c.id} className={styles.trow} style={{ gridTemplateColumns: "2fr 2fr 1fr 100px" }}>
              <div className={styles.prodCell}>
                {c.image ? (
                  <div className={styles.thumb}><img src={c.image} alt="" /></div>
                ) : (
                  <div className={styles.catIcon}><Icon icon="solar:tag-linear" className="w-4 h-4" /></div>
                )}
                <span className={styles.prodName}>{c.name}</span>
              </div>
              <span className={styles.muted}>{c.description || "—"}</span>
              <span className={styles.muted}>{c.created_at ? new Date(c.created_at).toLocaleDateString("en-IN") : "—"}</span>
              <div className={styles.rowActions}>
                <button className={styles.editBtn} onClick={() => navigate(`/admin/categories/${c.id}`)}>
                  <Icon icon="solar:pen-linear" className="w-4 h-4" />
                </button>
                {confirmDelete === c.id ? (
                  <div className={styles.confirmRow}>
                    <span className={styles.confirmText}>Purge?</span>
                    <button className={styles.confirmYes} onClick={() => handleDelete(c.id)} disabled={deleting === c.id}>
                      {deleting === c.id ? <Icon icon="solar:restart-linear" className="w-3.5 h-3.5 animate-spin" /> : "Yes"}
                    </button>
                    <button className={styles.confirmNo} onClick={() => setConfirmDelete(null)}>No</button>
                  </div>
                ) : (
                  <button className={styles.delBtn} onClick={() => setConfirmDelete(c.id)}>
                    <Icon icon="solar:trash-bin-trash-linear" className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}