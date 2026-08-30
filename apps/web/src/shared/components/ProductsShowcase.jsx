import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Icon } from "@iconify/react";
import OptimizedImage from "./OptimizedImage";
import { useProducts } from "../hooks/useProducts";
import { getImg } from "../utils/productUtils";

const DEFAULT_SPECIFICATIONS = [
  { title: "Waterproof", icon: "solar:waterdrops-linear" },
  { title: "UV Resistant", icon: "solar:sun-2-linear" },
  { title: "Termite Proof", icon: "solar:shield-check-linear" },
  { title: "Zero Maintenance", icon: "solar:wrench-linear" },
];

const DEFAULT_BENTO_PRODUCTS = [
  {
    id: "plastic-lumber",
    name: "Plastic Lumber",
    category_name: "Plastic Lumber",
    description: "Durable recycled plastic profiles for construction framing, decking, walkways and industrial applications.",
    image_url: "/uploads/products/categories/plastic-lumber-1770446410430-0.webp",
    fallback_image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
    features: DEFAULT_SPECIFICATIONS,
  },
  {
    id: "plastic-pallets",
    name: "Plastic Pallets",
    category_name: "Plastic Pallets",
    description: "Heavy-duty pallets for racking, warehousing, export and industrial logistics.",
    image_url: "/uploads/products/pallets/pallets-1770374237161-67758.webp",
    fallback_image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "garden-benches",
    name: "Garden Benches",
    category_name: "Garden Benches",
    description: "Comfortable and weatherproof benches designed for outdoor spaces.",
    image_url: "/uploads/products/categories/garden-bench-1770446422580-0.webp",
    fallback_image: "https://images.unsplash.com/photo-1519974719765-e6559eac2575?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "outdoor-furniture",
    name: "Outdoor Furniture",
    category_name: "Outdoor Furniture",
    description: "Ergonomic and long-lasting furniture for resorts, parks and public spaces.",
    image_url: "/uploads/products/garden-bench/gardenbench-1770441701366-1.webp",
    fallback_image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "garden-fences",
    name: "Garden Fences",
    category_name: "Garden Fences",
    description: "Strong and maintenance-free fencing solutions for gardens and landscapes.",
    image_url: "/uploads/products/categories/categories-1770374476904-61107.webp",
    fallback_image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "plastic-tables",
    name: "Plastic Tables",
    category_name: "Plastic Tables",
    description: "All-weather tables for cafeterias, picnic spots, and industrial breakrooms.",
    image_url: "/uploads/products/categories/plastic-table-1770446441648-0.webp",
    fallback_image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop",
  },
];

const renderFeatureIcon = (iconName, title = "") => {
  const name = (typeof iconName === "string" ? iconName : "").toLowerCase();
  const titleLower = title.toLowerCase();

  if (name.includes("drop") || name.includes("water") || titleLower.includes("water")) {
    return (
      <svg className="w-3.5 h-3.5 text-[var(--brand-primary)] shrink-0 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    );
  }
  if (name.includes("sun") || name.includes("uv") || titleLower.includes("uv") || titleLower.includes("sun")) {
    return (
      <svg className="w-3.5 h-3.5 text-[var(--brand-primary)] shrink-0 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    );
  }
  if (name.includes("shield") || name.includes("termite") || name.includes("check") || titleLower.includes("termite") || titleLower.includes("shield")) {
    return (
      <svg className="w-3.5 h-3.5 text-[var(--brand-primary)] shrink-0 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }
  if (name.includes("wrench") || name.includes("maintenance") || name.includes("tool") || titleLower.includes("maintenance")) {
    return (
      <svg className="w-3.5 h-3.5 text-[var(--brand-primary)] shrink-0 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    );
  }

  return <Icon icon={iconName || "solar:check-circle-linear"} className="w-3.5 h-3.5 text-[var(--brand-primary)] shrink-0" />;
};

const getCardFeatures = (prod) => {
  if (prod && Array.isArray(prod.features) && prod.features.length > 0) {
    return prod.features.map((f, i) => {
      if (typeof f === "string") {
        const icons = [
          "solar:waterdrops-linear",
          "solar:sun-2-linear",
          "solar:shield-check-linear",
          "solar:wrench-linear",
        ];
        return { title: f, icon: icons[i % icons.length] };
      }
      const title = f.title || f.label || f.name || f.key || "Feature";
      let icon = f.icon;
      if (!icon) {
        const titleLower = title.toLowerCase();
        const keyLower = (f.key || "").toLowerCase();
        if (keyLower === "maintenance" || titleLower.includes("maintenance") || titleLower.includes("zero")) {
          icon = "solar:wrench-linear";
        } else if (keyLower === "waterproof" || titleLower.includes("water")) {
          icon = "solar:waterdrops-linear";
        } else if (keyLower === "uv" || titleLower.includes("uv") || titleLower.includes("sun")) {
          icon = "solar:sun-2-linear";
        } else if (keyLower === "termite" || titleLower.includes("termite") || titleLower.includes("shield")) {
          icon = "solar:shield-check-linear";
        } else {
          icon = "solar:check-circle-linear";
        }
      }
      return { title, icon };
    });
  }
  return DEFAULT_SPECIFICATIONS;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const cardVariant = {
  hidden: { 
    opacity: 0, 
    y: 20,
    borderColor: "var(--border-card)"
  },
  visible: {
    opacity: 1,
    y: 0,
    borderColor: "var(--border-card)",
    transition: {
      duration: 0.4,
      ease: [0.25, 1, 0.5, 1],
    },
  },
  hover: {
    y: -6,
    scale: 1.015,
    borderColor: "rgba(95, 191, 80, 0.4)",
    boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 20px -5px rgba(95, 191, 80, 0.2)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

const badgeHoverVariant = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
};

export default function ProductsShowcase() {
  const navigate = useNavigate();
  const { products: fetchedProducts } = useProducts();

  const products = useMemo(() => {
    if (fetchedProducts && fetchedProducts.length >= 6) {
      return fetchedProducts;
    }
    if (fetchedProducts && fetchedProducts.length > 0) {
      const existingIds = new Set(fetchedProducts.map((p) => String(p.id)));
      const extras = DEFAULT_BENTO_PRODUCTS.filter((p) => !existingIds.has(p.id));
      return [...fetchedProducts, ...extras].slice(0, 6);
    }
    return DEFAULT_BENTO_PRODUCTS;
  }, [fetchedProducts]);

  const featuredProduct = products[0] || DEFAULT_BENTO_PRODUCTS[0];
  const gridProducts = products.slice(1, 6);

  const handleCardClick = (prod) => {
    if (!prod) return;
    if (prod.id) {
      navigate(`/products?category=${encodeURIComponent(prod.category_name || prod.name || "")}`);
    } else {
      navigate("/products");
    }
  };

  const getImgUrl = (prod, fallbackIdx) => {
    const userImg = getImg(prod);
    if (userImg) return userImg;
    const fallback = DEFAULT_BENTO_PRODUCTS[fallbackIdx];
    return fallback?.image_url || fallback?.fallback_image;
  };

  const featuredFeatures = getCardFeatures(featuredProduct);

  return (
    <div className="w-full pt-4 pb-16 sm:pb-24">
      {/* Bento Grid matching full card container layout */}
      <Motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch"
      >
        {/* CARD 01: Featured Large Card (Spans 2 columns, 2 rows height) */}
        <Motion.div
          key={featuredProduct.id || "featured-01"}
          variants={cardVariant}
          whileHover="hover"
          onClick={() => handleCardClick(featuredProduct)}
          className="group relative lg:col-span-2 lg:row-span-2 min-h-[460px] lg:min-h-[520px] w-full rounded-lg overflow-hidden border border-[var(--border-card)] flex flex-col justify-between p-5 sm:p-7 cursor-pointer shadow-lg bg-slate-950"
        >
          {/* Full Container Background Image */}
          <div className="absolute inset-0 z-0 bg-slate-950 pointer-events-none overflow-hidden">
            <OptimizedImage
              src={getImgUrl(featuredProduct, 0)}
              fallbackSrc={DEFAULT_BENTO_PRODUCTS[0].fallback_image}
              alt={featuredProduct.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            {/* Seamless gradient overlay directly on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10 pointer-events-none" />
          </div>

          {/* TOP BAR: Badge '01 / 06' + Top Right Action Arrow with Dark Backdrops */}
          <div className="relative z-20 flex items-center justify-between w-full">
            <Motion.div
              variants={badgeHoverVariant}
              className="inline-flex items-center gap-2 bg-[#6BBF54] text-slate-950 border border-[#6BBF54] px-3.5 py-1.5 rounded-lg shadow-md font-extrabold"
            >
              <span className="text-slate-950 font-black text-xs tracking-wide">
                01
              </span>
              <span className="text-slate-950/70 font-semibold text-xs tracking-wider">
                / 06
              </span>
            </Motion.div>

            <Motion.button
              type="button"
              whileHover={{ scale: 1.1, rotate: 4 }}
              whileTap={{ scale: 0.92 }}
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick(featuredProduct);
              }}
              aria-label="View Collection"
              className="relative z-30 w-11 h-11 rounded-lg bg-[#6BBF54] text-slate-950 flex items-center justify-center cursor-pointer border border-[#6BBF54] backdrop-blur-md shrink-0 shadow-md transition-colors duration-200"
            >
              <Icon icon="solar:arrow-right-up-linear" className="w-5 h-5 text-slate-950" />
            </Motion.button>
          </div>

          {/* BOTTOM CONTENT AREA (Full-bleed direct overlay with high-contrast text) */}
          <div className="relative z-20 mt-auto pt-8">
            <div className="max-w-2xl">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black !text-white tracking-tight leading-tight mb-2 drop-shadow-sm">
                {featuredProduct.name || "Plastic Lumber"}
              </h3>

              <p className="!text-[#D8DEDA] text-xs sm:text-sm leading-relaxed font-medium max-w-xl drop-shadow-xs">
                {featuredProduct.description ||
                  "Durable recycled plastic profiles for construction framing, decking, walkways and industrial applications."}
              </p>
            </div>

            {/* FEATURES / SPECIFICATIONS BAR + ACTION BUTTON */}
            <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {featuredFeatures.map((feat, idx) => {
                  const iconName = typeof feat.icon === "string" ? feat.icon : "solar:waterdrops-linear";
                  return (
                    <Motion.div
                      key={idx}
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1.5 bg-black/55 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 shadow-xs text-[var(--brand-primary)]"
                    >
                      {renderFeatureIcon(iconName, feat.title)}
                      <span className="!text-[#E7EBE8] text-[11px] sm:text-xs font-semibold">{feat.title}</span>
                    </Motion.div>
                  );
                })}
              </div>

              <Motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(featuredProduct);
                }}
                className="relative z-30 bg-[#6BBF54] hover:bg-[#6BBF54] text-slate-950 font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer border border-white/25 shrink-0 shadow-md transition-all"
              >
                <span>Explore Collection</span>
                <Icon icon="solar:arrow-right-linear" className="w-4 h-4 text-slate-950" />
              </Motion.button>
            </div>
          </div>
        </Motion.div>

        {/* CARDS 02 AND 03: Top Right Stacked Cards */}
        {gridProducts.slice(0, 2).map((prod, idx) => {
          const cardNum = String(idx + 2).padStart(2, "0");
          const title = prod.name || prod.title || "Product";
          const desc = prod.description || prod.headline || "";
          const img = getImgUrl(prod, idx + 1);

          return (
            <Motion.div
              key={prod.id || idx}
              variants={cardVariant}
              whileHover="hover"
              onClick={() => handleCardClick(prod)}
              className="group relative aspect-square w-full rounded-lg overflow-hidden border border-[var(--border-card)] flex flex-col justify-between p-4 sm:p-5 cursor-pointer shadow-md bg-slate-950"
            >
              {/* Full Container Background Image */}
              <div className="absolute inset-0 z-0 bg-slate-950 pointer-events-none overflow-hidden">
                <OptimizedImage
                  src={img}
                  fallbackSrc={DEFAULT_BENTO_PRODUCTS[idx + 1]?.fallback_image}
                  alt={title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Smooth gradient overlay directly on bottom 45% */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />
              </div>

              {/* TOP BAR */}
              <div className="relative z-20 flex items-center justify-between w-full">
                <Motion.span
                  variants={badgeHoverVariant}
                  className="inline-flex items-center bg-[#6BBF54] text-slate-950 font-black text-xs px-3 py-1 rounded-lg shadow-md border border-[#6BBF54]"
                >
                  {cardNum}
                </Motion.span>

                <Motion.button
                  type="button"
                  whileHover={{ scale: 1.1, rotate: 4 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(prod);
                  }}
                  aria-label="View Product"
                  className="relative z-30 w-9 h-9 rounded-lg bg-[#6BBF54] text-slate-950 flex items-center justify-center cursor-pointer border border-[#6BBF54] backdrop-blur-md shrink-0 shadow-md transition-colors duration-200"
                >
                  <Icon icon="solar:arrow-right-up-linear" className="w-4 h-4 text-slate-950" />
                </Motion.button>
              </div>

              {/* BOTTOM DIRECT OVERLAY TEXT */}
              <div className="relative z-20 mt-auto pt-6">
                <h3 className="text-lg sm:text-xl font-black !text-white tracking-tight mb-1 drop-shadow-sm">
                  {title}
                </h3>
                <p className="!text-[#D8DEDA] text-xs leading-relaxed font-medium line-clamp-2 drop-shadow-xs">
                  {desc}
                </p>
              </div>
            </Motion.div>
          );
        })}

        {/* CARDS 04, 05, 06: Bottom Row 3 Cards */}
        {gridProducts.slice(2, 5).map((prod, idx) => {
          const cardNum = String(idx + 4).padStart(2, "0");
          const title = prod.name || prod.title || "Product";
          const desc = prod.description || prod.headline || "";
          const img = getImgUrl(prod, idx + 3);

          return (
            <Motion.div
              key={prod.id || idx + 3}
              variants={cardVariant}
              whileHover="hover"
              onClick={() => handleCardClick(prod)}
              className="group relative aspect-square w-full rounded-lg overflow-hidden border border-[var(--border-card)] flex flex-col justify-between p-4 sm:p-5 cursor-pointer shadow-md bg-slate-950"
            >
              {/* Full Container Background Image */}
              <div className="absolute inset-0 z-0 bg-slate-950 pointer-events-none overflow-hidden">
                <OptimizedImage
                  src={img}
                  fallbackSrc={DEFAULT_BENTO_PRODUCTS[idx + 3]?.fallback_image}
                  alt={title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Smooth gradient overlay directly on bottom 45% */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />
              </div>

              {/* TOP BAR */}
              <div className="relative z-20 flex items-center justify-between w-full">
                <Motion.span
                  variants={badgeHoverVariant}
                  className="inline-flex items-center bg-[#6BBF54] text-slate-950 font-black text-xs px-3 py-1 rounded-lg shadow-md border border-[#6BBF54]"
                >
                  {cardNum}
                </Motion.span>

                <Motion.button
                  type="button"
                  whileHover={{ scale: 1.1, rotate: 4 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(prod);
                  }}
                  aria-label="View Product"
                  className="relative z-30 w-9 h-9 rounded-lg bg-[#6BBF54] text-slate-950 flex items-center justify-center cursor-pointer border border-[#6BBF54] backdrop-blur-md shrink-0 shadow-md transition-colors duration-200"
                >
                  <Icon icon="solar:arrow-right-up-linear" className="w-4 h-4 text-slate-950" />
                </Motion.button>
              </div>

              {/* BOTTOM DIRECT OVERLAY TEXT */}
              <div className="relative z-20 mt-auto pt-6">
                <h3 className="text-lg sm:text-xl font-black !text-white tracking-tight mb-1 drop-shadow-sm">
                  {title}
                </h3>
                <p className="!text-[#D8DEDA] text-xs leading-relaxed font-medium line-clamp-2 drop-shadow-xs">
                  {desc}
                </p>
              </div>
            </Motion.div>
          );
        })}
      </Motion.div>
    </div>
  );
}
