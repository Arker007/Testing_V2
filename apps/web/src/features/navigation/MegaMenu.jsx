import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ArrowRight,
  Leaf,
  ShieldCheck,
  Wrench,
  Recycle,
} from "lucide-react";
import styles from "./Navbar.module.css";
import Badge from "../../shared/components/ui/Badge";

// SVG data URI fallback for product images when original URL fails to load
const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 24 24' fill='none' stroke='%2365a30d' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><rect x='2' y='4' width='20' height='16' rx='2'/><path d='M2 10h20'/><path d='M6 10v6'/><path d='M12 10v6'/><path d='M18 10v6'/></svg>";

const FALLBACK_ICON = (isActive) => (
  <svg
    className={`w-5 h-5 transition-colors ${
      isActive
        ? "text-[var(--brand-dark)]"
        : "text-slate-500 group-hover:text-slate-800"
    }`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 10h20" />
    <path d="M6 10v6" />
    <path d="M12 10v6" />
    <path d="M18 10v6" />
  </svg>
);

const CATEGORIES_METADATA_LOOKUP = {
  "plastic-pallets": {
    subtitle: "Heavy-duty pallets for racking, warehousing & material handling.",
    icon: (isActive) => (
      <svg
        className={`w-5 h-5 transition-colors ${
          isActive
            ? "text-[var(--brand-dark)]"
            : "text-slate-500 group-hover:text-slate-800"
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 10h20" />
        <path d="M6 10v6" />
        <path d="M12 10v6" />
        <path d="M18 10v6" />
      </svg>
    ),
  },
  "plastic-lumber": {
    subtitle: "Durable recycled plastic profiles for construction & industrial use.",
    icon: (isActive) => (
      <svg
        className={`w-5 h-5 transition-colors ${
          isActive
            ? "text-[var(--brand-dark)]"
            : "text-slate-500 group-hover:text-slate-800"
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 6h18v4H3z" />
        <path d="M3 14h18v4H3z" />
        <path d="M14 6v12" />
      </svg>
    ),
  },
  "garden-bench": {
    subtitle: "Comfortable & weatherproof benches for outdoor spaces.",
    icon: (isActive) => (
      <svg
        className={`w-5 h-5 transition-colors ${
          isActive
            ? "text-[var(--brand-dark)]"
            : "text-slate-500 group-hover:text-slate-800"
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 11h18" />
        <path d="M5 11V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5" />
        <path d="M4 11v6" />
        <path d="M20 11v6" />
        <path d="M2 15h20" />
      </svg>
    ),
  },
  "plastic-table": {
    subtitle: "Sturdy all-weather tables for cafeterias, picnic spots & industrial areas.",
    icon: (isActive) => (
      <svg
        className={`w-5 h-5 transition-colors ${
          isActive
            ? "text-[var(--brand-dark)]"
            : "text-slate-500 group-hover:text-slate-800"
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 8h18" />
        <path d="M4 8v10" />
        <path d="M20 8v10" />
        <path d="M7 8v5" />
        <path d="M17 8v5" />
      </svg>
    ),
  },
  "garden-fence": {
    subtitle: "Maintenance-free fencing solutions for gardens & landscapes.",
    icon: (isActive) => (
      <svg
        className={`w-5 h-5 transition-colors ${
          isActive
            ? "text-[var(--brand-dark)]"
            : "text-slate-500 group-hover:text-slate-800"
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4l2-2 2 2v16H4Z" />
        <path d="M10 4l2-2 2 2v16h-4Z" />
        <path d="M16 4l2-2 2 2v16h-4Z" />
        <path d="M2 9h20" />
        <path d="M2 15h20" />
      </svg>
    ),
  },
  "outdoor-furniture": {
    subtitle: "Ergonomic & long-lasting furniture for resorts, parks & public spaces.",
    icon: (isActive) => (
      <svg
        className={`w-5 h-5 transition-colors ${
          isActive
            ? "text-[var(--brand-dark)]"
            : "text-slate-500 group-hover:text-slate-800"
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
        <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z" />
        <path d="M5 18v3" />
        <path d="M19 18v3" />
      </svg>
    ),
  },
  "custom-products": {
    subtitle: "Bespoke industrial shapes and parts molded to custom B2B drawings.",
    icon: (isActive) => (
      <svg
        className={`w-5 h-5 transition-colors ${
          isActive
            ? "text-[var(--brand-dark)]"
            : "text-slate-500 group-hover:text-slate-800"
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
};

export default function MegaMenu({
  categories = [],
  products = [],
  isProductsActive,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState("");
  const leaveTimeoutRef = useRef(null);
  const navigate = useNavigate();

  // Combine dynamic categories with our custom metadata lookup
  const combinedCategories = categories.map((cat) => {
    const meta =
      CATEGORIES_METADATA_LOOKUP[cat.id] ||
      CATEGORIES_METADATA_LOOKUP[cat.slug] ||
      {};
    return {
      id: cat.id || cat.slug,
      name: cat.name,
      subtitle:
        cat.description || cat.desc || meta.subtitle || "Recycled plastic solutions.",
      icon: meta.icon || FALLBACK_ICON,
    };
  });

  // Default to the first category once categories load
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
      if (combinedCategories.length > 0) {
        setSelectedCatId(combinedCategories[0].id);
      }
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

  // Determine active category metadata
  const activeCat =
    combinedCategories.find((c) => c.id === selectedCatId) ||
    combinedCategories[0] || {
      id: "all",
      name: "Products",
      subtitle: "Sustainable recycled plastic solutions",
      icon: FALLBACK_ICON,
    };

  // Match real products to active category
  const realCategoryProducts = products.filter((p) => {
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

  // Get display items
  let displayProducts = [...realCategoryProducts].slice(0, 6);
  let showCustomCTA = false;

  // If no items exist in database for this category, display a high-converting B2B customizing card
  // and populate remaining spaces with featured products from other categories
  if (displayProducts.length === 0) {
    showCustomCTA = true;
    const otherProducts = products.filter((p) => {
      const pCat = String(
        p.category || p.category_id || p.category_name || ""
      ).toLowerCase();
      const activeId = activeCat.id ? String(activeCat.id).toLowerCase() : "";
      return pCat !== activeId;
    });
    // Fill with up to 3 popular other products
    displayProducts = otherProducts.slice(0, 3);
  }

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
        <i className="fa-solid fa-chevron-down text-xs ml-1" />
      </Link>

      <div className={styles.dropdownMenu}>
        <div className={`${styles.dropdownMenuInner} relative overflow-hidden bg-white/95 dark:bg-[#0c0e14]/95 backdrop-blur-md border border-slate-200/90 dark:border-white/10 text-slate-800 dark:text-slate-200 shadow-2xl rounded-2xl p-4`}>
          {/* Ambient radial glow blobs across the MegaMenu container */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand)]/10 dark:bg-[var(--brand)]/8 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[var(--brand)]/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

          <div className="relative z-10 flex w-full items-stretch gap-5 text-left">
            {/* Column 1: Left Categories Sidebar */}
            <div className="w-[280px] shrink-0 pr-4 flex flex-col justify-between border-r border-slate-100 dark:border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-3 px-2">
                  <Badge variant="brand" size="sm">
                    Categories
                  </Badge>
                  <span className="text-[11px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                    Catalog
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 max-h-[380px] overflow-y-auto pr-1">
                  {combinedCategories.map((cat) => {
                    const isActive = activeCat.id === cat.id;
                    return (
                      <div
                        key={cat.id}
                        onMouseEnter={() => setSelectedCatId(cat.id)}
                        onClick={() => {
                          handleLinkClick();
                          navigate(`/products?cat=${cat.id}`);
                        }}
                        className={`group relative p-2.5 rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-between gap-2.5 border overflow-hidden ${
                          isActive
                            ? "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300/80 dark:border-emerald-500/40 shadow-xs"
                            : "bg-transparent hover:bg-slate-50/90 dark:hover:bg-white/5 border-transparent hover:border-slate-200/80 dark:hover:border-white/10"
                        }`}
                      >
                        {isActive && (
                          <div className="absolute top-0 right-0 w-20 h-20 bg-[var(--brand)]/15 dark:bg-[var(--brand)]/20 rounded-full blur-lg -mr-6 -mt-6 pointer-events-none" />
                        )}
                        <div className="relative z-10 flex items-start gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isActive
                                ? "bg-emerald-100 dark:bg-emerald-900/60 text-[var(--brand-dark)] dark:text-emerald-400 border border-emerald-300/60 dark:border-emerald-700/60"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200/80 dark:group-hover:bg-slate-700 group-hover:text-slate-800 dark:group-hover:text-slate-200 border border-slate-200/60 dark:border-white/5"
                            }`}
                          >
                            {cat.icon(isActive)}
                          </div>
                          <div>
                            <h4
                              className={`font-bold text-xs leading-tight transition-colors ${
                                isActive
                                  ? "text-slate-900 dark:text-white"
                                  : "text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white"
                              }`}
                            >
                              {cat.name}
                            </h4>
                            <p
                              className={`text-[11px] mt-0.5 leading-snug line-clamp-1 transition-colors ${
                                isActive
                                  ? "text-slate-600 dark:text-slate-300 font-medium"
                                  : "text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400"
                              }`}
                            >
                              {cat.subtitle}
                            </p>
                          </div>
                        </div>
                        <ChevronRight
                          className={`relative z-10 w-3.5 h-3.5 shrink-0 transition-all ${
                            isActive
                              ? "text-[var(--brand-dark)] dark:text-emerald-400 translate-x-0.5"
                              : "text-slate-300 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-400 group-hover:translate-x-0.5"
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Column 2: Middle Product Cards Grid */}
            <div className="flex-1 px-1 flex flex-col justify-between">
              {/* Header Bar */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--brand)] inline-block" />
                  <h3 className="text-xs font-black tracking-wider text-slate-900 dark:text-white uppercase">
                    {activeCat.name}
                  </h3>
                </div>
                <Link
                  to={`/products?cat=${activeCat.id}`}
                  onClick={handleLinkClick}
                  className="text-xs font-bold text-[var(--brand-dark)] dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1.5 px-3 py-1 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all"
                >
                  <span>View all {activeCat.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Grid with custom B2B customized CTA or dynamic product cards */}
              <div className="grid grid-cols-3 gap-3">
                {showCustomCTA && (
                  <Link
                    to="/contact?custom=1"
                    onClick={handleLinkClick}
                    className="col-span-2 group/item relative overflow-hidden bg-gradient-to-br from-emerald-500/10 to-teal-500/5 dark:from-emerald-950/30 dark:to-teal-950/10 border border-emerald-300/50 dark:border-emerald-500/30 rounded-xl p-4 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300"
                  >
                    <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="brand" size="sm">
                          Bespoke Engineering
                        </Badge>
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                          Direct Factory Sizing
                        </span>
                      </div>
                      <h4 className="font-black text-sm text-slate-900 dark:text-white mb-1.5 group-hover/item:text-[var(--brand-dark)] dark:group-hover/item:text-emerald-400 transition-colors">
                        Custom Recycled {activeCat.name} & Molds
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        Need bespoke dimensions, structural reinforcements, or custom color-matching? We manufacture all industrial shapes, profiles, and assemblies to B2B drawings.
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-200/40 dark:border-white/10 text-xs font-bold text-[var(--brand-dark)] dark:text-emerald-400">
                      <span>Submit Your B2B Inquiry Sheets</span>
                      <ArrowRight className="w-4 h-4 group-hover/item:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                )}

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
                      className="group/item relative overflow-hidden bg-white dark:bg-[#111820] hover:bg-slate-50/90 dark:hover:bg-[#171E26] border border-slate-200/90 dark:border-white/10 hover:border-emerald-400/80 dark:hover:border-emerald-500/60 rounded-xl p-3 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      {/* Radial glow accent on hover */}
                      <div className="absolute top-0 right-0 w-28 h-28 bg-[var(--brand)]/10 dark:bg-[var(--brand)]/20 rounded-full blur-xl -mr-8 -mt-8 pointer-events-none opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />

                      <div className="relative z-10">
                        <div className="w-full h-24 bg-slate-50/90 dark:bg-[#171E26] rounded-lg flex items-center justify-center p-2 mb-2.5 overflow-hidden border border-slate-100 dark:border-white/5 group-hover/item:border-emerald-200/60 dark:group-hover/item:border-emerald-900/40 transition-colors">
                          <img
                            src={imgSrc}
                            alt={prod.name}
                            className="max-h-full max-w-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.04)] group-hover/item:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = FALLBACK_IMAGE;
                            }}
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[9px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest truncate max-w-full">
                              {prod.type || "Catalog Item"}
                            </span>
                            {prod.capacity && (
                              <span className="text-[9px] font-bold text-slate-500 truncate shrink-0">
                                {prod.capacity.split("/")[0].trim()}
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1 group-hover/item:text-[var(--brand-dark)] dark:group-hover/item:text-emerald-400 transition-colors">
                            {prod.name}
                          </h4>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-snug mt-0.5 font-normal">
                            {prod.desc ||
                              prod.description ||
                              "High capacity recycled plastic product."}
                          </p>
                        </div>
                      </div>

                      <div className="relative z-10 flex items-center justify-between pt-2 mt-2 border-t border-slate-100 dark:border-white/5 text-[11px] font-bold text-[var(--brand-dark)] dark:text-emerald-400 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                        <span>View Specs</span>
                        <ArrowRight className="w-3 h-3 group-hover/item:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Column 3: Right Sidebar - WHY CHOOSE US & CTA CONTAINER */}
            <div className="w-[250px] shrink-0 pl-4 border-l border-slate-100 dark:border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="text-[11px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase mb-3 px-1">
                  WHY CHOOSE US?
                </h3>

                <div className="flex flex-col gap-2">
                  {/* Eco-Friendly */}
                  <div className="flex items-start gap-2.5 p-1.5 rounded-lg hover:bg-slate-50/80 dark:hover:bg-white/5 border border-transparent hover:border-slate-200/60 dark:hover:border-white/10 transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/70 dark:border-emerald-800/50 flex items-center justify-center shrink-0 text-[var(--brand-dark)] dark:text-emerald-400">
                      <Leaf className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white mb-0.5">
                        Eco-Friendly
                      </h5>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                        100% recycled plastic materials.
                      </p>
                    </div>
                  </div>

                  {/* Weather Resistant */}
                  <div className="flex items-start gap-2.5 p-1.5 rounded-lg hover:bg-slate-50/80 dark:hover:bg-white/5 border border-transparent hover:border-slate-200/60 dark:hover:border-white/10 transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/70 dark:border-emerald-800/50 flex items-center justify-center shrink-0 text-[var(--brand-dark)] dark:text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white mb-0.5">
                        Weather Resistant
                      </h5>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                        Withstands extreme climate.
                      </p>
                    </div>
                  </div>

                  {/* Low Maintenance */}
                  <div className="flex items-start gap-2.5 p-1.5 rounded-lg hover:bg-slate-50/80 dark:hover:bg-white/5 border border-transparent hover:border-slate-200/60 dark:hover:border-white/10 transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/70 dark:border-emerald-800/50 flex items-center justify-center shrink-0 text-[var(--brand-dark)] dark:text-emerald-400">
                      <Wrench className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white mb-0.5">
                        Zero Maintenance
                      </h5>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                        No rot, splintering, or painting.
                      </p>
                    </div>
                  </div>

                  {/* Long Lasting */}
                  <div className="flex items-start gap-2.5 p-1.5 rounded-lg hover:bg-slate-50/80 dark:hover:bg-white/5 border border-transparent hover:border-slate-200/60 dark:hover:border-white/10 transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/70 dark:border-emerald-800/50 flex items-center justify-center shrink-0 text-[var(--brand-dark)] dark:text-emerald-400">
                      <Recycle className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white mb-0.5">
                        Long Lasting
                      </h5>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                        Decades of heavy-duty reliability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Supply CTA Box - Matching Home CTA Style */}
              <div className="mt-3 relative overflow-hidden p-3.5 rounded-xl bg-white dark:bg-[#111820] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-md hover:border-emerald-400/70 dark:hover:border-emerald-500/60 transition-all group/cta">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--brand)]/15 dark:bg-[var(--brand)]/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                <div className="relative z-10">
                  <div className="mb-2">
                    <Badge variant="brand" size="sm">
                      Direct Factory Supply
                    </Badge>
                  </div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                    Custom Sizing or Bulk Pricing?
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 font-normal leading-snug mt-1 mb-2.5">
                    Connect with our technical team for instant quotations.
                  </p>
                  <Link
                    to="/contact"
                    onClick={handleLinkClick}
                    className="inline-flex items-center justify-between w-full px-3 py-2 rounded-lg bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-black font-extrabold text-xs shadow-xs transition-transform active:scale-95"
                  >
                    <span>Get Fast Quote</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
