import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import styles from "./Navbar.module.css";

// Fallback SVG image if image URL fails
const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 24 24' fill='none' stroke='%2310b981' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><rect x='2' y='4' width='20' height='16' rx='2'/><path d='M2 10h20'/><path d='M6 10v6'/><path d='M12 10v6'/><path d='M18 10v6'/></svg>";

const CATEGORY_ICON_NAMES = {
  "plastic-lumber": "solar:layers-3-linear",
  "lumber": "solar:layers-3-linear",
  "plastic-pallets": "solar:box-minimalistic-linear",
  "pallets": "solar:box-minimalistic-linear",
  "garden-bench": "solar:chair-2-linear",
  "bench": "solar:chair-2-linear",
  "benches": "solar:chair-2-linear",
  "plastic-table": "solar:desk-linear",
  "tables": "solar:desk-linear",
  "garden-fence": "solar:rows-linear",
  "fencing": "solar:rows-linear",
  "outdoor-furniture": "solar:sofa-linear",
  "furniture": "solar:sofa-linear",
  "custom-products": "solar:settings-minimalistic-linear",
  "custom": "solar:settings-minimalistic-linear",
};

function resolveCategoryIcon(cat) {
  if (!cat) return "solar:box-minimalistic-linear";

  if (typeof cat.icon === "string" && cat.icon.startsWith("solar:")) return cat.icon;
  if (typeof cat.iconName === "string" && cat.iconName.startsWith("solar:")) return cat.iconName;

  const id = String(cat.id || cat.slug || "").toLowerCase();
  if (CATEGORY_ICON_NAMES[id]) {
    return CATEGORY_ICON_NAMES[id];
  }

  const name = String(cat.name || "").toLowerCase();
  
  if (name.includes("lumber") || name.includes("plank") || name.includes("timber") || name.includes("board")) {
    return "solar:layers-3-linear";
  }
  if (name.includes("pallet") || name.includes("skid") || name.includes("export")) {
    return "solar:box-minimalistic-linear";
  }
  if (name.includes("bench") || name.includes("seat") || name.includes("chair")) {
    return "solar:chair-2-linear";
  }
  if (name.includes("table") || name.includes("desk") || name.includes("dining")) {
    return "solar:desk-linear";
  }
  if (name.includes("fence") || name.includes("fencing") || name.includes("barrier")) {
    return "solar:rows-linear";
  }
  if (name.includes("furniture") || name.includes("patio") || name.includes("outdoor")) {
    return "solar:sofa-linear";
  }
  if (name.includes("custom") || name.includes("mould") || name.includes("spec") || name.includes("part")) {
    return "solar:settings-minimalistic-linear";
  }

  return "solar:box-minimalistic-linear";
}

export default function MegaMenu({
  categories = [],
  products = [],
  isProductsActive,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState("");
  const leaveTimeoutRef = useRef(null);
  const navigate = useNavigate();

  // Standardize categories array
  const formattedCategories = categories.map((cat) => ({
    id: cat.id || cat.slug,
    name: cat.name,
    subtitle: cat.description || cat.desc || "Recycled plastic solutions",
    iconName: resolveCategoryIcon(cat),
  }));

  // Default to first category when categories load
  useEffect(() => {
    if (categories.length > 0 && !selectedCatId) {
      const firstCat = categories[0];
      setSelectedCatId(firstCat.id || firstCat.slug);
    }
  }, [categories, selectedCatId]);

  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
    leaveTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
    };
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const activeCat =
    formattedCategories.find((c) => c.id === selectedCatId) ||
    formattedCategories[0] || {
      id: "all",
      name: "Products",
      subtitle: "Sustainable recycled plastic solutions",
      iconName: "solar:box-minimalistic-bold-duotone",
    };

  // Match products for selected category
  const activeProducts = products.filter((p) => {
    if (!p) return false;
    const catStr = String(
      p.category || p.category_id || p.category_name || ""
    ).toLowerCase();
    const activeId = activeCat.id ? String(activeCat.id).toLowerCase() : "";
    const activeName = activeCat.name ? String(activeCat.name).toLowerCase() : "";
    return (
      catStr === activeId ||
      catStr === activeName ||
      catStr.includes(activeId) ||
      activeId.includes(catStr)
    );
  });

  // Display up to 6 items in clean grid
  const displayProducts =
    activeProducts.length > 0
      ? activeProducts.slice(0, 6)
      : products.slice(0, 6);

  return (
    <div
      className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to="/products"
        onClick={handleLinkClick}
        className={`${styles.dropdownBtn} ${
          isProductsActive ? styles.dropdownBtnActive : ""
        }`}
      >
        <span>Products</span>
        <Icon icon="solar:alt-arrow-down-linear" className="w-3.5 h-3.5 ml-1 inline" />
      </Link>

      <div className={styles.dropdownMenu}>
        <div className="bg-white dark:bg-[#111820] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-2xl rounded-xl p-6 w-[1020px] max-w-[95vw]">
          <div className="flex gap-7 items-stretch">
            {/* Left Column: Category Navigation List */}
            <div className="w-72 shrink-0 border-r border-slate-200 dark:border-slate-800 pr-5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3.5 px-3">
                Categories
              </div>

              <div className="flex flex-col gap-1.5">
                {formattedCategories.map((cat) => {
                  const isActive = activeCat.id === cat.id;

                  return (
                    <div
                      key={cat.id}
                      onMouseEnter={() => setSelectedCatId(cat.id)}
                      onClick={() => {
                        handleLinkClick();
                        navigate(`/products?cat=${cat.id}`);
                      }}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-lg cursor-pointer transition-colors ${
                        isActive
                          ? "bg-slate-100 dark:bg-slate-800/90 text-slate-900 dark:text-white font-semibold"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          icon={cat.iconName}
                          className={`w-4.5 h-4.5 shrink-0 transition-colors ${
                            isActive
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                          }`}
                        />
                        <span className="text-xs font-medium truncate">{cat.name}</span>
                      </div>
                      <Icon
                        icon="solar:alt-arrow-right-linear"
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isActive
                            ? "text-emerald-600 dark:text-emerald-400 translate-x-0.5"
                            : "text-slate-300 dark:text-slate-600 group-hover:text-slate-400"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Main Content: Category Products Grid */}
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div>
                {/* Header Strip */}
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {activeCat.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {activeCat.subtitle}
                    </p>
                  </div>

                  <Link
                    to={`/products?cat=${activeCat.id}`}
                    onClick={handleLinkClick}
                    className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 px-3 py-1.5 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-950/40 flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    <span>View All</span>
                    <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                  </Link>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 gap-3.5">
                  {displayProducts.map((prod, idx) => {
                    const targetUrl = `/products/${prod.id}`;
                    const imgSrc =
                      prod.img ||
                      prod.image ||
                      (Array.isArray(prod.images) && prod.images[0]) ||
                      FALLBACK_IMAGE;

                    return (
                      <Link
                        key={prod.id || idx}
                        to={targetUrl}
                        onClick={handleLinkClick}
                        className="group flex items-center gap-3.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all shadow-xs hover:shadow-md"
                      >
                        <div className="w-14 h-14 rounded-lg bg-slate-100 dark:bg-slate-800 p-1.5 flex items-center justify-center shrink-0 border border-slate-200/80 dark:border-slate-700/80">
                          <img
                            src={imgSrc}
                            alt={prod.name}
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = FALLBACK_IMAGE;
                            }}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {prod.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-1">
                            {prod.type || prod.desc || "Industrial Grade"}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Bottom CTA Strip */}
              <div className="mt-6 pt-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">
                  Custom dimensions, specialized plastic profiles, or bulk orders?
                </span>
                <Link
                  to="/contact"
                  onClick={handleLinkClick}
                  className="font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 flex items-center gap-1.5 transition-colors"
                >
                  <span>Request Fast Quote</span>
                  <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
