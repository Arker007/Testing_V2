import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import { Icon } from "@iconify/react";
import { OptimizedImage } from "@/shared/ui";
import { useProducts } from "@/shared/hooks/useProducts";
import { getImg, simplifyFeature } from "@/features/products";

const DEFAULT_SPECIFICATIONS = [
  { title: "Waterproof", icon: "carbon:rain-drop" },
  { title: "UV Resistant", icon: "carbon:sun" },
  { title: "Termite Proof", icon: "carbon:security" },
  { title: "Zero Maintenance", icon: "carbon:tool-box" },
];

const simplifyFeatureText = (text) => {
  return simplifyFeature(text);
};

const renderFeatureIcon = (iconName, title = "") => {
  const name = (typeof iconName === "string" ? iconName : "").toLowerCase();
  const titleLower = title.toLowerCase();

  if (name.includes("drop") || name.includes("water") || titleLower.includes("water") || titleLower.includes("export") || titleLower.includes("fumigation")) {
    return (
      <svg className="w-3.5 h-3.5 text-[var(--brand-primary)] shrink-0 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    );
  }
  if (name.includes("sun") || name.includes("uv") || titleLower.includes("uv") || titleLower.includes("sun") || titleLower.includes("rack")) {
    return (
      <svg className="w-3.5 h-3.5 text-[var(--brand-primary)] shrink-0 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    );
  }
  if (name.includes("shield") || name.includes("termite") || name.includes("check") || titleLower.includes("termite") || titleLower.includes("shield") || titleLower.includes("grip") || titleLower.includes("anti-slip")) {
    return (
      <svg className="w-3.5 h-3.5 text-[var(--brand-primary)] shrink-0 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }
  if (name.includes("wrench") || name.includes("maintenance") || name.includes("tool") || titleLower.includes("maintenance") || titleLower.includes("washable") || titleLower.includes("chemical")) {
    return (
      <svg className="w-3.5 h-3.5 text-[var(--brand-primary)] shrink-0 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    );
  }

  return <Icon icon={iconName || "carbon:checkmark-outline"} className="w-3.5 h-3.5 text-[var(--brand-primary)] shrink-0" />;
};

const getCardFeatures = (prod) => {
  if (prod && Array.isArray(prod.features) && prod.features.length > 0) {
    return prod.features.map((f, i) => {
      if (typeof f === "string") {
        const title = simplifyFeatureText(f);
        const icons = [
          "carbon:rain-drop",
          "carbon:sun",
          "carbon:security",
          "carbon:tool-box",
        ];
        return { title, icon: icons[i % icons.length] };
      }
      const rawTitle = f.title || f.label || f.name || f.key || "Feature";
      const title = simplifyFeatureText(rawTitle);
      let icon = f.icon;
      if (!icon) {
        const titleLower = title.toLowerCase();
        const keyLower = (f.key || "").toLowerCase();
        if (keyLower === "maintenance" || titleLower.includes("maintenance") || titleLower.includes("zero")) {
          icon = "carbon:tool-box";
        } else if (keyLower === "waterproof" || titleLower.includes("water") || titleLower.includes("export") || titleLower.includes("fumigation")) {
          icon = "carbon:rain-drop";
        } else if (keyLower === "uv" || titleLower.includes("uv") || titleLower.includes("sun") || titleLower.includes("rack")) {
          icon = "carbon:sun";
        } else if (keyLower === "termite" || titleLower.includes("termite") || titleLower.includes("shield") || titleLower.includes("grip") || titleLower.includes("anti-slip")) {
          icon = "carbon:security";
        } else {
          icon = "carbon:checkmark-outline";
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
    borderColor: "rgba(107, 191, 84, 0.45)",
    boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.65), 0 0 20px -5px rgba(107, 191, 84, 0.25)",
    transition: {
      type: "tween",
      duration: 0.12,
      delay: 0,
      ease: [0.16, 1, 0.3, 1],
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
  const { products: fetchedProducts, loading } = useProducts();

  const products = useMemo(() => {
    return Array.isArray(fetchedProducts) ? fetchedProducts.slice(0, 6) : [];
  }, [fetchedProducts]);

  const featuredProduct = products[0];
  const gridProducts = products.slice(1, 6);

  const handleCardClick = (prod) => {
    if (!prod) return;
    if (prod.id) {
      navigate(`/products?category=${encodeURIComponent(prod.category_name || prod.name || "")}`);
    } else {
      navigate("/products");
    }
  };

  const getImgUrl = (prod) => {
    return getImg(prod) || prod?.image_url || prod?.image || "";
  };

  const featuredFeatures = featuredProduct ? getCardFeatures(featuredProduct) : [];

  if (!featuredProduct) {
    return null;
  }

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
              src={getImgUrl(featuredProduct)}
              fallbackSrc="/images/products/profiles.png"
              alt={featuredProduct.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            {/* Soft black tint gradient from bottom for clean contrast and visibility */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/40 via-45% to-transparent pointer-events-none" />
          </div>

          {/* TOP BAR: Badge '01 / 06' + Top Right Action Arrow with Dark Backdrops */}
          <div className="relative z-20 flex items-center justify-between w-full">
            <Motion.div
              variants={badgeHoverVariant}
              style={{
                backgroundColor: "var(--brand-primary)",
                borderColor: "var(--brand-primary)",
                color: "var(--brand-btn-text)",
              }}
              className="inline-flex items-center gap-2 !bg-[var(--brand-primary)] !text-[var(--brand-btn-text)] border !border-[var(--brand-primary)] px-3.5 py-1.5 rounded-[var(--radius-btn,8px)] shadow-md font-extrabold"
            >
              <span className="!text-[var(--brand-btn-text)] font-black text-xs tracking-wide">
                01
              </span>
              <span className="!text-[var(--brand-btn-text)]/70 font-semibold text-xs tracking-wider">
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
              style={{
                backgroundColor: "var(--brand-primary)",
                borderColor: "var(--brand-primary)",
                color: "var(--brand-btn-text)",
              }}
              aria-label="View collection"
              className="relative z-30 w-11 h-11 rounded-[var(--radius-btn,8px)] !bg-[var(--brand-primary)] hover:opacity-90 active:scale-95 !text-[var(--brand-btn-text)] flex items-center justify-center cursor-pointer border !border-[var(--brand-primary)] shrink-0 shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <Icon icon="carbon:launch" className="w-5 h-5 !text-[var(--brand-btn-text)]" />
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
                  const iconName = typeof feat.icon === "string" ? feat.icon : "carbon:rain-drop";
                  return (
                    <Motion.div
                      key={idx}
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1.5 bg-black/55 backdrop-blur-md px-3 py-1.5 rounded-[var(--radius-btn,8px)] border border-white/20 shadow-xs text-[var(--brand-primary)]"
                    >
                      {renderFeatureIcon(iconName, feat.title)}
                      <span className="!text-[#F4F5F7] text-[11px] sm:text-xs font-semibold">{feat.title}</span>
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
                style={{
                  backgroundColor: "var(--brand-primary)",
                  borderColor: "var(--brand-primary)",
                  color: "var(--brand-btn-text)",
                }}
                className="relative z-30 min-h-[var(--btn-h-md,42px)] !bg-[var(--brand-primary)] hover:opacity-90 active:scale-95 !text-[var(--brand-btn-text)] font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-[var(--radius-btn,8px)] flex items-center gap-2 cursor-pointer border !border-[var(--brand-primary)] shrink-0 shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <span className="!text-[var(--brand-btn-text)] font-bold">Explore collection</span>
                <Icon icon="carbon:arrow-right" className="w-4 h-4 !text-[var(--brand-btn-text)]" />
              </Motion.button>
            </div>
          </div>
        </Motion.div>

        {/* CARDS 02 AND 03: Top Right Stacked Cards */}
        {gridProducts.slice(0, 2).map((prod, idx) => {
          const cardNum = String(idx + 2).padStart(2, "0");
          const title = prod.name || prod.title || "Product";
          const desc = prod.description || prod.headline || "";
          const img = getImgUrl(prod);

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
                  fallbackSrc="/images/products/profiles.png"
                  alt={title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Soft black tint gradient from bottom for natural visibility and readability */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/65 via-black/35 via-35% to-transparent pointer-events-none" />
              </div>

              {/* TOP BAR */}
              <div className="relative z-20 flex items-center justify-between w-full">
                <Motion.span
                  variants={badgeHoverVariant}
                  style={{
                    backgroundColor: "var(--brand-primary)",
                    borderColor: "var(--brand-primary)",
                    color: "var(--brand-btn-text)",
                  }}
                  className="inline-flex items-center !bg-[var(--brand-primary)] !text-[var(--brand-btn-text)] font-black text-xs px-3 py-1 rounded-[var(--radius-btn,8px)] shadow-md border !border-[var(--brand-primary)]"
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
                  style={{
                    backgroundColor: "var(--brand-primary)",
                    borderColor: "var(--brand-primary)",
                    color: "var(--brand-btn-text)",
                  }}
                  aria-label="View product"
                  className="relative z-30 w-9 h-9 rounded-[var(--radius-btn,8px)] !bg-[var(--brand-primary)] hover:opacity-90 active:scale-95 !text-[var(--brand-btn-text)] flex items-center justify-center cursor-pointer border !border-[var(--brand-primary)] shrink-0 shadow-md transition-colors duration-200"
                >
                  <Icon icon="carbon:launch" className="w-4 h-4 !text-[var(--brand-btn-text)]" />
                </Motion.button>
              </div>

              {/* BOTTOM DIRECT OVERLAY TEXT */}
              <div className="relative z-20 mt-auto pt-8">
                <h3 className="text-lg sm:text-xl font-black !text-white tracking-tight mb-1 drop-shadow-md">
                  {title}
                </h3>
                <p className="!text-slate-100 text-xs sm:text-[13px] leading-relaxed font-semibold line-clamp-2 drop-shadow-sm">
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
          const img = getImgUrl(prod);

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
                  fallbackSrc="/images/products/profiles.png"
                  alt={title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Soft black tint gradient from bottom for natural visibility and readability */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/65 via-black/35 via-35% to-transparent pointer-events-none" />
              </div>

              {/* TOP BAR */}
              <div className="relative z-20 flex items-center justify-between w-full">
                <Motion.span
                  variants={badgeHoverVariant}
                  style={{
                    backgroundColor: "var(--brand-primary)",
                    borderColor: "var(--brand-primary)",
                    color: "var(--brand-btn-text)",
                  }}
                  className="inline-flex items-center !bg-[var(--brand-primary)] !text-[var(--brand-btn-text)] font-black text-xs px-3 py-1 rounded-[var(--radius-btn,8px)] shadow-md border !border-[var(--brand-primary)]"
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
                  style={{
                    backgroundColor: "var(--brand-primary)",
                    borderColor: "var(--brand-primary)",
                    color: "var(--brand-btn-text)",
                  }}
                  aria-label="View product"
                  className="relative z-30 w-9 h-9 rounded-[var(--radius-btn,8px)] !bg-[var(--brand-primary)] hover:opacity-90 active:scale-95 !text-[var(--brand-btn-text)] flex items-center justify-center cursor-pointer border !border-[var(--brand-primary)] shrink-0 shadow-md transition-colors duration-200"
                >
                  <Icon icon="carbon:launch" className="w-4 h-4 !text-[var(--brand-btn-text)]" />
                </Motion.button>
              </div>

              {/* BOTTOM DIRECT OVERLAY TEXT */}
              <div className="relative z-20 mt-auto pt-8">
                <h3 className="text-lg sm:text-xl font-black !text-white tracking-tight mb-1 drop-shadow-md">
                  {title}
                </h3>
                <p className="!text-slate-100 text-xs sm:text-[13px] leading-relaxed font-semibold line-clamp-2 drop-shadow-sm">
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
