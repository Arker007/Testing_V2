import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import styles from "../../admin/styles/AdminTable.module.css";
import { toPlainPreview } from "../../../shared/utils/parsers";
import {
  AdminPageHeader,
  StatusToggle,
  EmptyState,
  ConfirmDialog,
  Spinner,
  InteractiveHoverButton,
  Badge,
  Button,
  OptimizedImage,
  CustomSelect,
} from "@/shared/ui";
import { ProductService } from "../services/product.service";
import { CategoryService } from "../services/category.service";

import { Virtuoso } from "react-virtuoso";

export default function AdminProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [deleting, setDeleting] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    Promise.all([
      ProductService.getProducts(),
      CategoryService.getAll(),
    ])
      .then(([p, c]) => {
        setProducts(p.products || []);
        setCategories(c.categories || c || []);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (id) => {
    setDeleting(id);
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        "Content-Type": "application/json",
      },
    });
    load();
    setDeleting(null);
    setConfirmDelete(null);
  };

  const handleTogglePublish = async (product, newChecked) => {
    const id = product.id;
    setTogglingId(id);
    const token = localStorage.getItem("admin_token");
    const nextPublished = newChecked ? 1 : 0;
    try {
      await ProductService.updateProduct(id, { published: nextPublished }, token);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, published: nextPublished } : p))
      );
    } catch {
      // Revert / refresh on failure
      load();
    } finally {
      setTogglingId(null);
    }
  };

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      (p.category_name || "").toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "all" || String(p.category) === catFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className={styles.dashboard}>
      <AdminPageHeader
        title="Product Catalog"
        count={filtered.length}
        countLabel="products"
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        onSearchClear={() => setSearch("")}
        searchPlaceholder="Search catalog products..."
        filter={
          <div className="w-56">
            <CustomSelect
              options={[
                { value: "all", label: "All Categories" },
                ...categories.map((c) => ({ value: String(c.id), label: c.name })),
              ]}
              value={catFilter}
              onChange={(val) => setCatFilter(val)}
              placeholder="All Categories"
            />
          </div>
        }
        actions={
          <InteractiveHoverButton onClick={() => navigate("/admin/products/new")} className="font-bold shadow-sm">
            Add Product
          </InteractiveHoverButton>
        }
      />

      {/* Structured Ventixe Ledger */}
      <div className={styles.card}>
        <div className={styles.thead} style={{ gridTemplateColumns: "2.2fr 1fr 1fr 1fr 1fr auto" }}>
          <span>Product</span>
          <span>Category</span>
          <span>Publish Status</span>
          <span>MOQ</span>
          <span>Date Added</span>
          <span style={{ textDirection: "rtl", paddingRight: "16px" }}>Actions</span>
        </div>
        {loading ? (
          [1, 2, 3, 4, 5].map((i) => <div key={i} className={styles.skeleRow} />)
        ) : filtered.length === 0 ? (
          <EmptyState
            icon="carbon:box"
            title={search || catFilter !== "all" ? "No products match your search filters." : "No products found."}
            description={!search && catFilter === "all" ? "Start by adding your first product to the enterprise catalog." : "Try clearing your search query or selecting a different category."}
            action={
              !search && catFilter === "all" ? (
                <InteractiveHoverButton onClick={() => navigate("/admin/products/new")} className="font-bold shadow-sm">
                  Add First Product
                </InteractiveHoverButton>
              ) : undefined
            }
            size="sm"
          />
        ) : (
          <Virtuoso
            style={{ height: 'calc(100vh - 250px)' }}
            data={filtered}
            itemContent={(index, p) => {
              let img = null;
              try { img = JSON.parse(p.image)?.[0]; } catch { img = p.image; }
              const isLive = p.published !== null && p.published !== undefined && Number(p.published) !== 0;
              return (
                <div
                  className={`${styles.trow} ${activeItem?.id === p.id ? styles.trowActive || "" : ""}`}
                  style={{ gridTemplateColumns: "2.2fr 1fr 1fr 1fr 1fr auto", cursor: "pointer" }}
                  onClick={(e) => {
                    if (e.target.closest("a") || e.target.closest("button") || e.target.closest("input") || e.target.closest('[role="switch"]')) return;
                    setActiveItem(p);
                  }}
                >
                  <div className={styles.prodCell}>
                    <div className={styles.thumb}>
                      {img ? (
                        <OptimizedImage src={img} alt={p.name} className="w-full h-full object-cover rounded" />
                      ) : (
                        <Icon icon="carbon:image" className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <div className={styles.prodName}>{p.name}</div>
                      {p.description && <div className={styles.prodSub}>{toPlainPreview(p.description)}</div>}
                    </div>
                  </div>
                  <span>
                    <Badge variant="neutral" size="sm">
                      {p.category_name || "Unassigned"}
                    </Badge>
                  </span>
                  <span onClick={(e) => e.stopPropagation()}>
                    <StatusToggle
                      checked={isLive}
                      onChange={(checked) => handleTogglePublish(p, checked)}
                      disabled={togglingId === p.id}
                      size="sm"
                      showStatusLabel
                      onLabel="Live"
                      offLabel="Draft"
                    />
                  </span>
                  <span className={styles.muted}>{p.moq || "—"}</span>
                  <span className={styles.muted}>
                    {p.created_at ? new Date(p.created_at).toLocaleDateString("en-IN") : "—"}
                  </span>
                  <div className={styles.rowActions}>
                    <Link to={`/admin/products/${p.id}`} title="Edit Product">
                      <Button variant="ghost" size="sm" className="!p-1.5 !h-auto text-slate-500 hover:text-slate-800">
                        <Icon icon="carbon:edit" className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="!p-1.5 !h-auto text-rose-500 hover:text-rose-700 hover:bg-rose-500/10"
                      onClick={() => setConfirmDelete(p.id)}
                      title="Delete Product"
                      disabled={deleting === p.id}
                    >
                      {deleting === p.id ? <Spinner size="sm" /> : <Icon icon="carbon:trash-can" className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              );
            }}
          />
        )}
      </div>

      <ConfirmDialog
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => handleDelete(confirmDelete)}
        title="Delete Product?"
        message="Are you sure you want to delete this product from your catalog? This action cannot be undone."
        confirmText="Delete Product"
        loading={!!deleting}
      />

      {/* Right Slide Preview Drawer */}
      <div className={`${styles.previewDrawer} ${activeItem ? styles.previewDrawerActive : ""}`}>
        <div className={styles.drawerHeader}>
          <h2 className={styles.drawerTitle}>Product Preview</h2>
          <button className={styles.drawerCloseBtn} onClick={() => setActiveItem(null)}>
            <Icon icon="carbon:close" className="w-5 h-5" />
          </button>
        </div>
        {activeItem && (
          <div className={styles.drawerBody}>
            {(() => {
              let img = null;
              try { img = JSON.parse(activeItem.image)?.[0]; } catch { img = activeItem.image; }
              return img ? (
                <OptimizedImage
                  src={img}
                  alt={activeItem.name}
                  className="w-full h-44 object-contain rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] mb-3"
                />
              ) : null;
            })()}
            <div>
              <span className={styles.drawerLabel}>Product Name</span>
              <div className={styles.drawerValue} style={{ fontSize: "1.05rem", fontWeight: "700", marginTop: 4 }}>{activeItem.name}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <span className={styles.drawerLabel}>Category</span>
                <div className={styles.drawerValue} style={{ marginTop: 4 }}>
                  <Badge variant="neutral" size="sm">
                    {activeItem.category_name || "Unassigned"}
                  </Badge>
                </div>
              </div>
              <div>
                <span className={styles.drawerLabel}>Minimum Order</span>
                <div className={styles.drawerValue} style={{ marginTop: 4 }}>{activeItem.moq || "—"}</div>
              </div>
            </div>
            <div>
              <span className={styles.drawerLabel}>Detailed Description</span>
              <div className={styles.drawerValueTextarea} style={{ marginTop: 4 }}>
                {toPlainPreview(activeItem.description, 1000) || "No description provided."}
              </div>
            </div>
            <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--border)", display: "flex", gap: 12 }}>
              <Link to={`/admin/products/${activeItem.id}`} style={{ flex: 1, textDecoration: "none" }}>
                <Button variant="primary" size="md" className="w-full justify-center" icon={<Icon icon="carbon:edit" className="w-4 h-4 mr-1.5" />}>
                  Full Editor
                </Button>
              </Link>
              <Button variant="outline" size="md" style={{ flex: 1 }} className="justify-center" onClick={() => setActiveItem(null)}>
                Dismiss
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}