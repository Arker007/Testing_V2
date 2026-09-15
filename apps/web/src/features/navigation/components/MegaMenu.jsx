/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "motion/react";
import styles from "../styles/navbar.module.css";
import { ProductService } from "../../products/services/product.service";
import { CategoryService } from "../../categories";

// Solar icon mapping for standard category slugs & naming patterns
const CATEGORY_ICONS = {
  "plastic-pallets": "solar:box-minimalistic-linear",
  "plastic-lumber": "solar:ruler-angular-linear",
  "garden-bench": "solar:armchair-linear",
  "plastic-table": "solar:tuning-square-2-linear",
  "garden-fence": "solar:shield-check-linear",
  "outdoor-furniture": "solar:sofa-2-linear",
  "custom-products": "solar:widget-2-linear",
};

const getCategoryIcon = (slug = "", name = "") => {
  const s = slug.toLowerCase();
  if (CATEGORY_ICONS[s]) return CATEGORY_ICONS[s];
  const n = `${slug} ${name}`.toLowerCase();
  if (n.includes("pallet")) return "solar:box-minimalistic-linear";
  if (n.includes("lumber") || n.includes("profile") || n.includes("plank"))
    return "solar:ruler-angular-linear";
  if (n.includes("bench") || n.includes("seating"))
    return "solar:armchair-linear";
  if (n.includes("table") || n.includes("picnic") || n.includes("dining"))
    return "solar:tuning-square-2-linear";
  if (n.includes("fence") || n.includes("fencing"))
    return "solar:shield-check-linear";
  if (n.includes("furniture"))
    return "solar:sofa-2-linear";
  if (n.includes("custom") || n.includes("molded") || n.includes("part"))
    return "solar:widget-2-linear";
  return "solar:box-minimalistic-linear";
};

// Fallback category catalog ensuring complete layout representation
const DEFAULT_CATEGORIES = [
  {
    id: "plastic-pallets",
    slug: "plastic-pallets",
    name: "Plastic Pallets",
    icon: "solar:box-minimalistic-linear",
    eyebrow: "PLASTIC PALLETS",
    description:
      "Durable, weather-resistant plastic pallets for industrial, export and high-performance applications.",
    image: "/uploads/products/pallets/pallets-1770374237161-67758.webp",
    defaultProducts: [
      {
        id: "pallet-hd-racking-1210",
        name: "Heavy-Duty Rackable Plastic Pallet 1200x1000",
        spec: "1200 × 1000 × 150 mm",
        badge: "RACKING",
        image: "/uploads/products/pallets/pallets-1770374237161-67758.webp",
      },
      {
        id: "pallet-euro-export-1208",
        name: "Euro Standard Export Pallet 1200x800",
        spec: "1200 × 800 × 144 mm",
        badge: "EXPORT",
        image: "/uploads/products/pallets/pallets-1770374237161-67758.webp",
      },
      {
        id: "pallet-2way-entry-1111",
        name: "Medium-Duty 2-Way Pallet 1100x1100",
        spec: "1100 × 1100 × 140 mm",
        badge: "2-WAY",
        image: "/uploads/products/pallets/pallets-1770374237161-67758.webp",
      },
      {
        id: "pallet-4way-reversible-1212",
        name: "Heavy-Duty Reversible Pallet 1200x1200",
        spec: "1200 × 1200 × 160 mm",
        badge: "REVERSIBLE",
        image: "/uploads/products/pallets/pallets-1770374237161-67758.webp",
      },
      {
        id: "pallet-plastic-lumber-skid",
        name: "Custom Recycled Plastic Lumber Skid 1300x1100",
        spec: "1300 × 1100 × 150 mm (Customizable)",
        badge: "CUSTOM",
        image: "/uploads/products/pallets/pallets-1770374237161-67758.webp",
      },
    ],
  },
  {
    id: "plastic-lumber",
    slug: "plastic-lumber",
    name: "Plastic Lumber",
    icon: "solar:ruler-angular-linear",
    eyebrow: "PLASTIC LUMBER",
    description:
      "Structural profiles, heavy posts, decking, and tongue-groove battens for construction & industry.",
    image: "/uploads/products/categories/plastic-lumber-1770446410430-0.webp",
    defaultProducts: [
      {
        id: "lumber-rpl-2x4",
        name: "RPL 2x4 Structural Lumber (38x89mm)",
        spec: "38 × 89 × 2400 mm",
        badge: "STRUCTURAL",
        image: "/uploads/products/lumber/plastic-lumber-pallet-1770447286569-0.webp",
      },
      {
        id: "lumber-rpl-4x4-post",
        name: "Heavy-Duty RPL Post 4x4 (90x90mm)",
        spec: "90 × 90 × 2400 mm",
        badge: "POST",
        image: "/uploads/products/categories/plastic-lumber-1770446410430-0.webp",
      },
      {
        id: "lumber-rpl-tongue-groove",
        name: "Tongue & Groove Interlocking Plank",
        spec: "25 × 125 × 2400 mm",
        badge: "INTERLOCK",
        image: "/uploads/products/categories/plastic-lumber-1770446410430-0.webp",
      },
      {
        id: "lumber-rpl-2x6-decking",
        name: "Anti-Slip RPL Decking Plank 2x6",
        spec: "38 × 140 × 2400 mm",
        badge: "DECKING",
        image: "/uploads/products/categories/plastic-lumber-1770446410430-0.webp",
      },
      {
        id: "lumber-custom-profile",
        name: "Machined Solid Plastic Timber Profile",
        spec: "Custom Dimensions & Colors",
        badge: "CUSTOM",
        image: "/uploads/products/lumber/plastic-lumber-pallet-1770447286569-0.webp",
      },
    ],
  },
  {
    id: "garden-bench",
    slug: "garden-bench",
    name: "Garden Benches",
    icon: "solar:armchair-linear",
    eyebrow: "GARDEN BENCHES",
    description:
      "Park, society, municipal, and heritage benches engineered with maintenance-free recycled polymer.",
    image: "/uploads/products/garden-bench/gardenbench-1770441701366-1.webp",
    defaultProducts: [
      {
        id: "bench-classic-municipal-180",
        name: "Classic Municipal Park Bench (1.8m)",
        spec: "1800 × 600 × 750 mm (4-5 Seater)",
        badge: "MUNICIPAL",
        image: "/uploads/products/garden-bench/gardenbench-1770441701366-1.webp",
      },
      {
        id: "bench-cast-iron-hybrid-150",
        name: "Cast Iron Heritage Bench (1.5m)",
        spec: "1500 × 580 × 780 mm",
        badge: "HERITAGE",
        image: "/uploads/products/categories/garden-bench-1770446422580-0.webp",
      },
      {
        id: "bench-backless-promenade-180",
        name: "Contemporary Backless Promenade Bench",
        spec: "1800 × 450 × 450 mm",
        badge: "PROMENADE",
        image: "/uploads/products/garden-bench/gardenbench-1770441701366-1.webp",
      },
      {
        id: "bench-tree-surround-hex",
        name: "Hexagonal Tree Surround Bench",
        spec: "2200 mm Outer Diameter",
        badge: "TREE SURROUND",
        image: "/uploads/products/categories/garden-bench-1770446422580-0.webp",
      },
      {
        id: "bench-memorial-inscribed",
        name: "Memorial & Inscribed Park Bench",
        spec: "1800 × 600 × 750 mm (Custom Plaque)",
        badge: "MEMORIAL",
        image: "/uploads/products/garden-bench/gardenbench-1770441701366-1.webp",
      },
    ],
  },
  {
    id: "plastic-table",
    slug: "plastic-table",
    name: "Recycled Plastic Tables",
    icon: "solar:tuning-square-2-linear",
    eyebrow: "RECYCLED PLASTIC TABLES",
    description:
      "Heavy-duty outdoor picnic tables, park dining sets, and commercial courtyard furniture.",
    image: "/uploads/products/categories/plastic-table-1770446441648-0.webp",
    defaultProducts: [
      {
        id: "table-picnic-integrated-180",
        name: "Heavy-Duty Integrated Picnic Table & Benches",
        spec: "1800 × 1500 × 750 mm (6-8 Seater)",
        badge: "PICNIC",
        image: "/uploads/products/categories/plastic-table-1770446441648-0.webp",
      },
      {
        id: "table-accessible-ada-picnic",
        name: "ADA Wheelchair-Accessible Picnic Table",
        spec: "2400 × 1500 × 750 mm",
        badge: "ADA COMPLIANT",
        image: "/uploads/products/categories/plastic-table-1770446441648-0.webp",
      },
      {
        id: "table-round-courtyard-set",
        name: "Circular Plaza Table with Attached Stools",
        spec: "1200 mm Table Dia + 4 Stools",
        badge: "COURTYARD",
        image: "/uploads/products/categories/plastic-table-1770446441648-0.webp",
      },
      {
        id: "table-industrial-work-bench",
        name: "Industrial Heavy Assembly & Work Table",
        spec: "2000 × 900 × 850 mm",
        badge: "HEAVY DUTY",
        image: "/uploads/products/categories/plastic-table-1770446441648-0.webp",
      },
    ],
  },
  {
    id: "custom-products",
    slug: "custom-products",
    name: "Custom Products",
    icon: "solar:widget-2-linear",
    eyebrow: "CUSTOM PRODUCTS",
    description:
      "Bespoke industrial fabrications, custom molds, machinery skids, and tailor-made plastic components.",
    image: "/uploads/products/1770374592312-377465318.webp",
    defaultProducts: [
      {
        id: "custom-machinery-skid",
        name: "Heavy Machinery & Transformer Skid",
        spec: "Engineered to Customer Drawings",
        badge: "BESPOKE",
        image: "/uploads/products/1770374592312-377465318.webp",
      },
      {
        id: "custom-molded-component",
        name: "Precision Machined Polymer Components",
        spec: "High Molecular Weight HDPE",
        badge: "CUSTOM",
        image: "/uploads/products/1770374592312-377465318.webp",
      },
      {
        id: "custom-spill-containment",
        name: "Custom Chemical Spill Containment Base",
        spec: "Acid & Alkali Resistant",
        badge: "CHEMICAL",
        image: "/uploads/products/1770374592312-377465318.webp",
      },
      {
        id: "custom-rebar-support-block",
        name: "Construction Rebar & Foundation Spacer Blocks",
        spec: "Heavy Compressive Strength",
        badge: "FOUNDATION",
        image: "/uploads/products/1770374592312-377465318.webp",
      },
    ],
  },
];

// Safely extract product image URL from various database representations
const resolveProductImage = (product) => {
  if (!product) return null;
  if (product.image) {
    if (typeof product.image === "string") {
      try {
        const parsed = JSON.parse(product.image);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed[0];
      } catch {
        if (product.image.includes(",")) return product.image.split(",")[0].trim();
        return product.image;
      }
    }
    if (Array.isArray(product.image) && product.image.length > 0) {
      return product.image[0];
    }
  }
  if (Array.isArray(product.images) && product.images.length > 0) {
    return product.images[0];
  }
  if (product.thumbnail) return product.thumbnail;
  return null;
};

// Extract technical specification string for menu list item
const extractProductSpec = (product) => {
  if (!product) return null;
  let specsObj = null;
  if (product.specifications) {
    if (typeof product.specifications === "object") {
      specsObj = product.specifications;
    } else if (typeof product.specifications === "string") {
      try {
        specsObj = JSON.parse(product.specifications);
      } catch {
        specsObj = null;
      }
    }
  }

  if (specsObj) {
    if (specsObj["Dimensions"]) return specsObj["Dimensions"];
    if (specsObj["Profile Size"]) return specsObj["Profile Size"];
    if (specsObj["Size"]) return specsObj["Size"];
    if (specsObj["Seating Capacity"]) return specsObj["Seating Capacity"];
    if (specsObj["Static Load"]) return `Load: ${specsObj["Static Load"]}`;
  }

  if (product.dimensions) return product.dimensions;
  if (product.capacity) {
    return product.capacity.split("/")[0].trim();
  }
  if (product.type) return product.type;

  return null;
};

// Automatically classify industrial attribute micro-badges
const getItemBadge = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("racking") || n.includes("rackable")) return "RACKING";
  if (n.includes("reversible")) return "REVERSIBLE";
  if (n.includes("euro standard") || n.includes("ispm-15") || n.includes("export"))
    return "EXPORT";
  if (n.includes("2-way") || n.includes("2way")) return "2-WAY";
  if (n.includes("steel-reinforced")) return "STEEL CORE";
  if (n.includes("cleanroom") || n.includes("hygiene") || n.includes("food"))
    return "FOOD GRADE";
  if (n.includes("cold storage") || n.includes("-30°c")) return "-30°C";
  if (n.includes("chemical") || n.includes("acid")) return "CHEMICAL";
  if (n.includes("tongue") || n.includes("groove")) return "INTERLOCK";
  if (n.includes("post")) return "POST";
  if (n.includes("decking")) return "DECKING";
  if (n.includes("cast iron") || n.includes("heritage")) return "HERITAGE";
  if (n.includes("memorial")) return "MEMORIAL";
  if (n.includes("accessible") || n.includes("ada") || n.includes("wheelchair"))
    return "ADA COMPLIANT";
  if (n.includes("tree")) return "TREE SURROUND";
  if (n.includes("picnic")) return "PICNIC";
  if (n.includes("courtyard") || n.includes("plaza")) return "COURTYARD";
  if (n.includes("heavy-duty") || n.includes("4x4") || n.includes("6x6"))
    return "HEAVY DUTY";
  if (n.includes("custom") || n.includes("skid") || n.includes("bespoke"))
    return "CUSTOM";
  return "STANDARD";
};

// Helper to test if a product belongs to a category definition
const isProductMatchingCategory = (p, cat) => {
  if (!p || !p.id || !p.name) return false;
  if (p.published !== undefined && p.published !== null && Number(p.published) === 0) {
    return false;
  }
  const slug = String(cat?.slug || cat?.id || "").toLowerCase().trim();
  const id = String(cat?.id || cat?.slug || "").toLowerCase().trim();
  const name = String(cat?.name || "").toLowerCase().trim();

  const pCat = String(p.category || "").toLowerCase().trim();
  const pCatId = String(p.category_id || "").toLowerCase().trim();
  const pCatSlug = String(p.category_slug || "").toLowerCase().trim();
  const pCatName = String(p.category_name || "").toLowerCase().trim();

  return (
    pCat === slug ||
    pCat === id ||
    pCatId === slug ||
    pCatId === id ||
    pCatSlug === slug ||
    pCatSlug === id ||
    (name && pCatName === name) ||
    (name && pCat === name)
  );
};

export default function MegaMenu({
  categories: propCategories = [],
  products: propProducts = [],
  isProductsActive,
}) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState(propCategories);
  const [products, setProducts] = useState(propProducts);
  const [activeCategorySlug, setActiveCategorySlug] = useState("plastic-pallets");
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const triggerBtnRef = useRef(null);
  const panelRef = useRef(null);
  const leaveTimeoutRef = useRef(null);
  const categoryHoverTimerRef = useRef(null);
  const categoryButtonRefs = useRef([]);

  // Synchronize when props update
  useEffect(() => {
    if (propCategories?.length > 0) setCategories(propCategories);
  }, [propCategories]);

  useEffect(() => {
    if (propProducts?.length > 0) setProducts(propProducts);
  }, [propProducts]);

  // Fallback fetch if parent passed empty arrays
  useEffect(() => {
    if (
      !propCategories ||
      propCategories.length === 0 ||
      !propProducts ||
      propProducts.length === 0
    ) {
      Promise.all([
        CategoryService.getAll().catch(() => null),
        ProductService.getProducts().catch(() => null),
      ]).then(([catData, prodData]) => {
        if (catData?.categories?.length > 0) {
          setCategories(catData.categories);
        }
        if (prodData?.products?.length > 0) {
          setProducts(prodData.products);
        }
      });
    }
  }, [propCategories, propProducts]);

  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  // Forgiving leave timer prevents abrupt closing when crossing boundaries
  const handleMouseLeave = () => {
    if (categoryHoverTimerRef.current) {
      clearTimeout(categoryHoverTimerRef.current);
      categoryHoverTimerRef.current = null;
    }
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
    leaveTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 240);
  };

  // Safe Hover Intent: 120ms debounce prevents accidental category switching during diagonal cursor motion
  const handleCategoryMouseEnter = (slug) => {
    if (categoryHoverTimerRef.current) {
      clearTimeout(categoryHoverTimerRef.current);
    }
    categoryHoverTimerRef.current = setTimeout(() => {
      setActiveCategorySlug(slug);
      setHoveredProduct(null);
    }, 120);
  };

  // When cursor enters content area, cancel any pending switch timer to lock the selected category
  const handleContentMouseEnter = () => {
    if (categoryHoverTimerRef.current) {
      clearTimeout(categoryHoverTimerRef.current);
      categoryHoverTimerRef.current = null;
    }
  };

  // Direct Click on Category Tab: Navigates immediately to category listing page
  const handleCategoryClick = (slug) => {
    if (categoryHoverTimerRef.current) {
      clearTimeout(categoryHoverTimerRef.current);
    }
    setActiveCategorySlug(slug);
    navigate(`/products?cat=${encodeURIComponent(slug)}`);
    setIsOpen(false);
  };

  // Keyboard navigation across categories
  const handleSidebarKeyDown = (e, index) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % categoryList.length;
      setActiveCategorySlug(categoryList[nextIndex].slug);
      categoryButtonRefs.current[nextIndex]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + categoryList.length) % categoryList.length;
      setActiveCategorySlug(categoryList[prevIndex].slug);
      categoryButtonRefs.current[prevIndex]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveCategorySlug(categoryList[0].slug);
      categoryButtonRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      const lastIdx = categoryList.length - 1;
      setActiveCategorySlug(categoryList[lastIdx].slug);
      categoryButtonRefs.current[lastIdx]?.focus();
    } else if (e.key === "ArrowRight" || e.key === "Enter") {
      e.preventDefault();
      const firstInteractive = panelRef.current?.querySelector("a, button:not([disabled])");
      firstInteractive?.focus();
    }
  };

  const handlePanelKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const activeIdx = categoryList.findIndex((c) => c.slug === activeCategorySlug);
      if (activeIdx !== -1) {
        categoryButtonRefs.current[activeIdx]?.focus();
      }
    }
  };

  const handleTriggerClick = (e) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const handleTriggerKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(true);
      setTimeout(() => {
        const activeIdx = categoryList.findIndex((c) => c.slug === activeCategorySlug);
        categoryButtonRefs.current[activeIdx >= 0 ? activeIdx : 0]?.focus();
      }, 50);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
      if (categoryHoverTimerRef.current) {
        clearTimeout(categoryHoverTimerRef.current);
      }
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Derive consolidated category list
  const categoryList = useMemo(() => {
    const defaultSlugs = DEFAULT_CATEGORIES.map((c) => c.slug);
    const combined = [...DEFAULT_CATEGORIES];

    if (Array.isArray(categories) && categories.length > 0) {
      categories.forEach((cat) => {
        const slug = cat.slug || cat.id;
        const exists = combined.some((c) => c.slug === slug || c.id === slug);
        if (!exists) {
          combined.push({
            id: cat.id || slug,
            slug,
            name: cat.name || slug,
            icon: getCategoryIcon(slug, cat.name),
            eyebrow: (cat.name || slug).toUpperCase(),
            description: cat.description || "Browse industrial recycled plastic solutions.",
            image: cat.image || null,
            defaultProducts: [],
          });
        }
      });
    }

    return combined;
  }, [categories]);

  // Keep active category slug synchronized
  useEffect(() => {
    if (categoryList.length > 0) {
      if (!activeCategorySlug || !categoryList.some((c) => c.slug === activeCategorySlug)) {
        setActiveCategorySlug(categoryList[0].slug);
      }
    }
  }, [categoryList, activeCategorySlug]);

  // Active category metadata
  const activeCategoryData = useMemo(() => {
    const found = categoryList.find(
      (c) => c.slug === activeCategorySlug || c.id === activeCategorySlug
    );
    const defaultMeta =
      DEFAULT_CATEGORIES.find((c) => c.slug === activeCategorySlug) || DEFAULT_CATEGORIES[0];
    return {
      name: found?.name || defaultMeta.name,
      slug: activeCategorySlug || defaultMeta.slug,
      icon: found?.icon || defaultMeta.icon,
      eyebrow: found?.eyebrow || defaultMeta.eyebrow || found?.name?.toUpperCase(),
      description: found?.description || defaultMeta.description,
      image: found?.image || defaultMeta.image,
      defaultProducts: defaultMeta.defaultProducts || [],
    };
  }, [activeCategorySlug, categoryList]);

  // Filter actual products for active category or fallback to curated list
  const displayProducts = useMemo(() => {
    const matched = Array.isArray(products)
      ? products.filter((p) => isProductMatchingCategory(p, activeCategoryData))
      : [];

    if (matched.length > 0) {
      return matched.map((p) => ({
        id: p.id,
        name: p.name,
        badge: p.badge || p.type || getItemBadge(p.name),
        spec: extractProductSpec(p) || p.dimensions || "Industrial Specification",
        targetUrl: `/products/${p.id}`,
        image: resolveProductImage(p),
        raw: p,
      }));
    }

    // Use default products when database has no matched items
    return activeCategoryData.defaultProducts.map((p) => ({
      id: p.id,
      name: p.name,
      badge: p.badge || getItemBadge(p.name),
      spec: p.spec,
      targetUrl: `/products/${p.id}`,
      image: p.image,
      raw: p,
    }));
  }, [products, activeCategoryData]);

  // Preview Image for Spotlight Column
  const previewImageUrl = useMemo(() => {
    if (hoveredProduct) {
      const img = resolveProductImage(hoveredProduct) || hoveredProduct.image;
      if (img) return img;
    }
    if (displayProducts.length > 0 && displayProducts[0].image) {
      return displayProducts[0].image;
    }
    return (
      activeCategoryData?.image ||
      "/uploads/products/pallets/pallets-1770374237161-67758.webp"
    );
  }, [hoveredProduct, displayProducts, activeCategoryData]);

  const handleDownloadCatalog = (e) => {
    e.preventDefault();
    try {
      const catName = activeCategoryData?.name || "Industrial Products";
      const catDesc =
        activeCategoryData?.description ||
        "High-performance recycled plastic solutions engineered for longevity.";
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>Vishal Enterprise - ${catName} Catalog</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #0f172a; line-height: 1.6; max-width: 800px; margin: 0 auto; }
    .header { border-bottom: 2px solid #16532d; padding-bottom: 16px; margin-bottom: 24px; }
    h1 { color: #16532d; margin: 0 0 4px 0; font-size: 24px; letter-spacing: -0.02em; }
    .subtitle { color: #475569; font-size: 14px; margin: 0; }
    .section { margin: 20px 0; }
    .spec-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 12px; }
    .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="header">
    <h1>VISHAL ENTERPRISE</h1>
    <p class="subtitle">Technical Specifications & Engineering Catalog · ${catName}</p>
  </div>
  <div class="section">
    <h2>${catName} Overview</h2>
    <div class="spec-card">
      <p>${catDesc}</p>
      <p><strong>Available Catalog Items:</strong> Standard models + bespoke variations fabricated to project drawings.</p>
    </div>
  </div>
  <div class="footer">
    <p><strong>Factory Address:</strong> Plot No. 1706/06, South 9 Road, G.I.D.C., Ankleshwar, Bharuch, Gujarat - 393002</p>
    <p><strong>Export Clearance:</strong> 100% ISPM-15 Exempt · Ex-factory Nhava Sheva / Hazira Port</p>
  </div>
</body>
</html>`;
      const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const tempLink = document.createElement("a");
      tempLink.href = url;
      tempLink.setAttribute(
        "download",
        `Vishal_Enterprise_${activeCategorySlug}_Catalog.html`
      );
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      URL.revokeObjectURL(url);
    } catch {
      // safe fallback
    }
  };

  return (
    <div
      className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={triggerBtnRef}
        type="button"
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={`mega-panel-${activeCategorySlug}`}
        className={`${styles.dropdownBtn} ${
          isProductsActive ? styles.dropdownBtnActive : ""
        }`}
      >
        <span>Products</span>
        <Icon
          icon="solar:alt-arrow-down-linear"
          className={`w-3.5 h-3.5 ml-1 inline transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[var(--brand-primary)]" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.dropdownMenu}
            initial={{ opacity: 0, y: -6, scale: 0.992 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.992 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex" }}
          >
            <div className={styles.dropdownMenuPanel}>
              {/* 3-Column Redesigned Mega Menu Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_330px] gap-6 lg:gap-8 items-stretch min-h-[440px]">
                
                {/* 1. Left Column: Categories Sidebar & Bottom Sustainability Card */}
                <div className="flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-slate-800 pb-6 lg:pb-0 lg:pr-5">
                  {/* Category Nav List */}
                  <div
                    role="tablist"
                    aria-orientation="vertical"
                    aria-label="Product categories"
                    className="flex flex-col gap-1.5"
                  >
                    {categoryList.map((cat, idx) => {
                      const isActive = cat.slug === activeCategorySlug;
                      return (
                        <button
                          key={cat.slug}
                          ref={(el) => (categoryButtonRefs.current[idx] = el)}
                          type="button"
                          role="tab"
                          id={`mega-tab-${cat.slug}`}
                          aria-selected={isActive}
                          aria-controls={`mega-panel-${cat.slug}`}
                          tabIndex={isActive ? 0 : -1}
                          onClick={() => handleCategoryClick(cat.slug)}
                          onMouseEnter={() => handleCategoryMouseEnter(cat.slug)}
                          onKeyDown={(e) => handleSidebarKeyDown(e, idx)}
                          className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 cursor-pointer text-left border ${
                            isActive
                              ? "bg-[#eef8ef] dark:bg-emerald-950/40 text-[#15803d] dark:text-emerald-400 border-[#bbf7d0] dark:border-emerald-800/60 border-l-[3.5px] border-l-[#15803d] dark:border-l-emerald-400 font-bold shadow-2xs"
                              : "border-transparent text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60"
                          }`}
                          title={`View ${cat.name}`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Icon
                              icon={cat.icon || "solar:box-minimalistic-linear"}
                              className={`w-4.5 h-4.5 shrink-0 ${
                                isActive
                                  ? "text-[#15803d] dark:text-emerald-400"
                                  : "text-slate-500 dark:text-slate-400"
                              }`}
                            />
                            <span className="truncate">{cat.name}</span>
                          </div>
                          <Icon
                            icon="solar:alt-arrow-right-linear"
                            className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                              isActive
                                ? "text-[#15803d] dark:text-emerald-400 translate-x-0.5"
                                : "text-slate-400 dark:text-slate-500"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* Sustainability Commitment Box (Bottom Left) */}
                  <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col items-start gap-1">
                    <Icon
                      icon="solar:leaf-linear"
                      className="w-5 h-5 text-[#15803d] dark:text-emerald-400 mb-1"
                    />
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
                      Durable products.
                      <br />
                      A cleaner tomorrow.
                    </p>
                    <div className="w-7 h-[2px] bg-[#15803d] dark:bg-emerald-400 rounded-full my-1.5" />
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                      Made from recycled plastic.
                      <br />
                      Built for a sustainable world.
                    </p>
                  </div>
                </div>

                {/* 2. Middle Column: Product List for Active Category */}
                <div
                  ref={panelRef}
                  role="tabpanel"
                  id={`mega-panel-${activeCategorySlug}`}
                  aria-labelledby={`mega-tab-${activeCategorySlug}`}
                  tabIndex={-1}
                  className="flex flex-col justify-between min-w-0 outline-none"
                  onMouseEnter={handleContentMouseEnter}
                  onKeyDown={handlePanelKeyDown}
                >
                  <div>
                    {/* Header */}
                    <div className="mb-4">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-[#15803d] dark:text-emerald-400 mb-0.5">
                        {activeCategoryData.eyebrow}
                      </span>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {activeCategoryData.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed max-w-xl">
                        {activeCategoryData.description}
                      </p>
                    </div>

                    {/* Products List Rows */}
                    <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                      {displayProducts.map((product) => (
                        <div
                          key={product.id}
                          className="py-2.5 sm:py-3 transition-colors"
                          onMouseEnter={() => setHoveredProduct(product.raw || product)}
                          onMouseLeave={() => setHoveredProduct(null)}
                        >
                          <Link
                            to={product.targetUrl}
                            onClick={handleLinkClick}
                            className="flex items-center justify-between gap-3 group"
                          >
                            <div className="flex flex-col min-w-0 pr-2">
                              <span className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#15803d] dark:group-hover:text-emerald-400 transition-colors truncate">
                                {product.name}
                              </span>
                              {product.spec && (
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                                  {product.spec}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              {product.badge && (
                                <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold font-mono px-2 py-0.5 rounded tracking-wider uppercase border border-slate-200/60 dark:border-slate-700/60">
                                  {product.badge}
                                </span>
                              )}
                              <Icon
                                icon="solar:alt-arrow-right-linear"
                                className="w-4 h-4 text-slate-400 group-hover:text-[#15803d] dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all"
                              />
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* View All Link */}
                  <div className="pt-4 mt-2">
                    <Link
                      to={`/products?cat=${encodeURIComponent(activeCategorySlug)}`}
                      onClick={handleLinkClick}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#15803d] dark:text-emerald-400 hover:underline transition-all"
                    >
                      <span>View all {activeCategoryData.name}</span>
                      <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* 3. Right Column: Bespoke Manufacturing Spotlight & RFQ Card */}
                <div className="bg-slate-50/75 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 rounded-xl p-5 flex flex-col justify-between gap-3.5 h-full">
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#15803d] dark:text-emerald-400">
                        Bespoke & Bulk Supply
                      </span>
                      <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                        Factory Direct
                      </span>
                    </div>

                    {/* Image Preview Box */}
                    <div className="w-full h-36 rounded-lg overflow-hidden border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-900 flex items-center justify-center relative shadow-2xs mb-3.5">
                      <img
                        src={previewImageUrl}
                        alt={hoveredProduct?.name || activeCategoryData.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src =
                            "/uploads/products/pallets/pallets-1770374237161-67758.webp";
                        }}
                      />
                    </div>

                    {/* Content */}
                    <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug mb-1.5">
                      Need Custom Sizes or Heavy-Duty Specs?
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      We manufacture directly to your engineering drawings. Get custom
                      dimensions, specific color formulations, or large volume dispatch.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2.5 pt-2">
                    <Link
                      to="/contact"
                      onClick={handleLinkClick}
                      className="w-full bg-[#15803d] hover:bg-[#166534] text-white text-sm font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-xs"
                    >
                      <span>Request Custom RFQ</span>
                      <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                    </Link>

                    <button
                      type="button"
                      onClick={handleDownloadCatalog}
                      className="w-full text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-[#15803d] dark:hover:text-emerald-400 flex items-center justify-center gap-1.5 py-1 transition-colors cursor-pointer"
                      aria-label={`Download ${activeCategoryData.name} Catalog`}
                    >
                      <Icon
                        icon="solar:download-minimalistic-linear"
                        className="w-4 h-4 text-[#15803d] dark:text-emerald-400"
                      />
                      <span>Download {activeCategoryData.name} Catalog</span>
                    </button>

                    <div className="text-[10px] text-slate-400 dark:text-slate-500 text-center pt-2.5 border-t border-slate-200/60 dark:border-slate-700/40">
                      Factory Direct • Gujarat Manufacturing • Bulk Supply
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


