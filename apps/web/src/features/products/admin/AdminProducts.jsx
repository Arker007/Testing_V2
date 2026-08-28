import { useEffect, useState, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import styles from "../../admin/components/AdminTable.module.css";
import { toPlainPreview } from "../../../shared/utils/parsers";
import { InteractiveHoverButton } from "../../../registry/magicui/interactive-hover-button";
import SearchInput from "../../../shared/components/ui/SearchInput";
import EmptyState from "../../../shared/components/ui/EmptyState";
import ConfirmDialog from "../../../shared/components/ui/ConfirmDialog";
import Spinner from "../../../shared/components/ui/Spinner";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const load = useCallback(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      "Content-Type": "application/json",
    };
    const ts = Date.now();
    setLoading(true);
    Promise.all([
      fetch(`/api/products?_t=${ts}`, { headers }).then((r) => r.json()),
      fetch("/api/categories", { headers }).then((r) => r.json()),
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

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      (p.category_name || "").toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "all" || String(p.category) === catFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className={styles.dashboard}>
      {/* Ventixe Clean Control Toolbar */}
      <div className={styles.toolbar}>
        <div style={{ display: "flex", gap: "12px", flex: 1, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ minWidth: "240px", flex: "1 1 300px" }}>
            <SearchInput
              placeholder="Search catalog products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch("")}
            />
          </div>
          <div className={styles.customSelectContainer} ref={dropdownRef}>
            <button
              type="button"
              className={styles.customSelectTrigger}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>
                {catFilter === "all" ? "All Categories" : (categories.find(c => String(c.id) === catFilter)?.name || "All Categories")}
              </span>
              <Icon icon="solar:alt-arrow-down-linear" className={`${dropdownOpen ? styles.chevronOpen : ""} w-4 h-4`} />
            </button>
            {dropdownOpen && (
              <div className={styles.customSelectOptions} style={{ maxHeight: '240px', overflowY: 'auto' }}>
                <div
                  className={`${styles.customSelectOption} ${catFilter === "all" ? styles.customSelectOptionActive : ""}`}
                  onClick={() => {
                    setCatFilter("all");
                    setDropdownOpen(false);
                  }}
                >
                  All Categories
                </div>
                {categories.map((c) => (
                  <div
                    key={c.id}
                    className={`${styles.customSelectOption} ${catFilter === String(c.id) ? styles.customSelectOptionActive : ""}`}
                    onClick={() => {
                      setCatFilter(String(c.id));
                      setDropdownOpen(false);
                    }}
                  >
                    {c.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <InteractiveHoverButton onClick={() => navigate("/admin/products/new")} className="font-bold shadow-sm">
          Add Product
        </InteractiveHoverButton>
      </div>

      <div className={styles.countBar}>
        <span className={styles.count}>
          {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
        </span>
      </div>

      {/* Structured Ventixe Ledger */}
      <div className={styles.card}>
        <div className={styles.thead} style={{ gridTemplateColumns: "2.2fr 1fr 0.8fr 1fr 1fr auto" }}>
          <span>Product</span>
          <span>Category</span>
          <span>Status</span>
          <span>MOQ</span>
          <span>Date Added</span>
          <span style={{ textDirection: "rtl", paddingRight: "16px" }}>Actions</span>
        </div>
        {loading ? (
          [1, 2, 3, 4, 5].map((i) => <div key={i} className={styles.skeleRow} />)
        ) : filtered.length === 0 ? (
          <EmptyState
            icon="solar:box-open-linear"
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
          filtered.map((p) => {
            let img = null;
            try { img = JSON.parse(p.image)?.[0]; } catch { img = p.image; }
            return (
              <div
                key={p.id}
                className={`${styles.trow} ${activeItem?.id === p.id ? styles.trowActive || "" : ""}`}
                style={{ gridTemplateColumns: "2.2fr 1fr 0.8fr 1fr 1fr auto", cursor: "pointer" }}
                onClick={(e) => {
                  if (e.target.closest("a") || e.target.closest("button") || e.target.closest("input")) return;
                  setActiveItem(p);
                }}
              >
                <div className={styles.prodCell}>
                  <div className={styles.thumb}>
                    {img ? <img src={img} alt="" /> : <Icon icon="solar:gallery-linear" className="w-4 h-4 text-slate-400" />}
                  </div>
                  <div>
                    <div className={styles.prodName}>{p.name}</div>
                    {p.description && <div className={styles.prodSub}>{toPlainPreview(p.description)}</div>}
                  </div>
                </div>
                <span>
                  <span className={styles.badge} style={{ background: "var(--gray-100)", color: "var(--gray-800)" }}>
                    {p.category_name || "Unassigned"}
                  </span>
                </span>
                <span>
                  {(p.published !== null && p.published !== undefined && Number(p.published) === 0) ? (
                    <span className={styles.badge} style={{ background: "var(--color-warning-bg)", color: "var(--color-warning)" }}>
                      <Icon icon="solar:pen-linear" className="w-3 h-3 inline mr-1" /> Draft
                    </span>
                  ) : (
                    <span className={styles.badge}>
                      <Icon icon="solar:check-circle-linear" className="w-3 h-3 inline mr-1" /> Live
                    </span>
                  )}
                </span>
                <span className={styles.muted}>{p.moq || "—"}</span>
                <span className={styles.muted}>
                  {p.created_at ? new Date(p.created_at).toLocaleDateString("en-IN") : "—"}
                </span>
                <div className={styles.rowActions}>
                  <Link to={`/admin/products/${p.id}`} className={styles.editBtn} title="Edit Product">
                    <Icon icon="solar:pen-linear" className="w-4 h-4" />
                  </Link>
                  <button className={styles.delBtn} onClick={() => setConfirmDelete(p.id)} title="Delete Product">
                    {deleting === p.id ? <Spinner size="sm" /> : <Icon icon="solar:trash-bin-trash-linear" className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })
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
          <h4 className={styles.drawerTitle}>Product Preview</h4>
          <button className={styles.drawerCloseBtn} onClick={() => setActiveItem(null)}>
            <Icon icon="solar:close-circle-linear" className="w-5 h-5" />
          </button>
        </div>
        {activeItem && (
          <div className={styles.drawerBody}>
            {(() => {
              let img = null;
              try { img = JSON.parse(activeItem.image)?.[0]; } catch { img = activeItem.image; }
              return img ? <img src={img} style={{ width: "100%", height: 180, objectFit: "contain", borderRadius: 12, border: "1px solid var(--border)", background: "var(--bg-surface)", marginBottom: 12 }} alt="" /> : null;
            })()}
            <div>
              <span className={styles.drawerLabel}>Product Name</span>
              <div className={styles.drawerValue} style={{ fontSize: "1.05rem", fontWeight: "700", marginTop: 4 }}>{activeItem.name}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <span className={styles.drawerLabel}>Category</span>
                <div className={styles.drawerValue} style={{ marginTop: 4 }}>
                  <span className={styles.badge} style={{ background: "var(--gray-100)", color: "var(--gray-800)", padding: "2px 8px" }}>
                    {activeItem.category_name || "Unassigned"}
                  </span>
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
              <Link to={`/admin/products/${activeItem.id}`} className={styles.actionBtnPrimary} style={{ flex: 1, justifyContent: "center", textDecoration: "none" }}>
                <Icon icon="solar:pen-linear" className="w-4 h-4 mr-1 inline" /> Full Editor
              </Link>
              <button type="button" className={styles.actionBtnSecondary} style={{ flex: 1, justifyContent: "center" }} onClick={() => setActiveItem(null)}>
                Dismiss
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}