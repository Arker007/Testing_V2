import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import styles from "@/features/admin/styles/AdminTable.module.css";
import AdminPageHeader from "@/shared/ui/layout/AdminPageHeader";
import {
  StatusToggle,
  EmptyState,
  ConfirmDialog,
  Spinner,
  InteractiveHoverButton,
  Button,
  OptimizedImage,
} from "@/shared/ui";
import { CategoryService } from "../services/category.service";

export default function AdminCategories() {
  const navigate = useNavigate();
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    CategoryService.getAll()
      .then((d) => setCats(d.categories || d || []))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id) => {
    setDeleting(id);
    const token = localStorage.getItem("admin_token");
    await CategoryService.delete(id, token);
    load(); setDeleting(null); setConfirmDelete(null);
  };

  const handleToggleStatus = async (cat, newChecked) => {
    const id = cat.id;
    setTogglingId(id);
    const token = localStorage.getItem("admin_token");
    const nextStatus = newChecked ? 1 : 0;
    try {
      await CategoryService.update(id, { status: nextStatus, is_active: newChecked }, token);
      setCats((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: nextStatus, is_active: newChecked } : c))
      );
    } catch {
      load();
    } finally {
      setTogglingId(null);
    }
  };

  const filteredCats = cats.filter((c) => {
    const term = search.trim().toLowerCase();
    if (!term) return true;
    return (
      c.name?.toLowerCase().includes(term) ||
      c.description?.toLowerCase().includes(term)
    );
  });

  return (
    <div className={styles.dashboard}>
      <AdminPageHeader
        title="Category Directory"
        count={filteredCats.length}
        countLabel="categories"
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        onSearchClear={() => setSearch("")}
        searchPlaceholder="Search category directories..."
        actions={
          <InteractiveHoverButton onClick={() => navigate("/admin/categories/new")} className="font-bold shadow-sm">
            Add Category
          </InteractiveHoverButton>
        }
      />

      <div className={styles.card}>
        <div className={styles.thead} style={{ gridTemplateColumns: "1.8fr 2fr 100px 1fr 100px" }}>
          <span>Directory Route Cluster</span>
          <span>Subtext Summary</span>
          <span>Status</span>
          <span>Timestamp Map</span>
          <span style={{ textDirection: "rtl", paddingRight: "16px" }}>Actions</span>
        </div>
        {loading ? [1, 2, 3].map((i) => <div key={i} className={styles.skeleRow} />) :
          filteredCats.length === 0 ? (
            <EmptyState
              icon="carbon:tag"
              title={search ? "No matching categories found" : "No categorisation parameters defined"}
              description={search ? "Try searching for a different keyword." : "Create root categories to organize your product catalog."}
              action={
                !search ? (
                  <InteractiveHoverButton onClick={() => navigate("/admin/categories/new")} className="font-bold shadow-sm">
                    Add Category
                  </InteractiveHoverButton>
                ) : undefined
              }
              size="sm"
            />
          ) : filteredCats.map((c) => {
            const isActive = c.status !== 0 && c.status !== "0" && c.is_active !== false;
            return (
              <div key={c.id} className={styles.trow} style={{ gridTemplateColumns: "1.8fr 2fr 100px 1fr 100px" }}>
                <div className={styles.prodCell}>
                  {c.image ? (
                    <div className={styles.thumb}>
                      <OptimizedImage src={c.image} alt={c.name} className="w-full h-full object-cover rounded" />
                    </div>
                  ) : (
                    <div className={styles.catIcon}><Icon icon="carbon:tag" className="w-4 h-4" /></div>
                  )}
                  <span className={styles.prodName}>{c.name}</span>
                </div>
                <span className={styles.muted}>{c.description || "—"}</span>
                <span onClick={(e) => e.stopPropagation()}>
                  <StatusToggle
                    checked={isActive}
                    onChange={(checked) => handleToggleStatus(c, checked)}
                    disabled={togglingId === c.id}
                    size="sm"
                    showStatusLabel
                    onLabel="Live"
                    offLabel="Hidden"
                  />
                </span>
                <span className={styles.muted}>{c.created_at ? new Date(c.created_at).toLocaleDateString("en-IN") : "—"}</span>
                <div className={styles.rowActions}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="!p-1.5 !h-auto text-slate-500 hover:text-slate-800"
                    onClick={() => navigate(`/admin/categories/${c.id}`)}
                    title="Edit Category"
                  >
                    <Icon icon="carbon:edit" className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="!p-1.5 !h-auto text-rose-500 hover:text-rose-700 hover:bg-rose-500/10"
                    onClick={() => setConfirmDelete(c.id)}
                    title="Delete Category"
                    disabled={deleting === c.id}
                  >
                    {deleting === c.id ? <Spinner size="sm" /> : <Icon icon="carbon:trash-can" className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            );
          })}
      </div>

      <ConfirmDialog
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => handleDelete(confirmDelete)}
        title="Delete Category?"
        message="Are you sure you want to delete this category? Associated products may become uncategorized."
        confirmText="Delete Category"
        loading={!!deleting}
      />
    </div>
  );
}
