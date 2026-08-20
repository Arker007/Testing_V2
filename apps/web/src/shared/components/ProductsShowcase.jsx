import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import {
  Leaf,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Droplets,
  Sun,
  Key,
} from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import { useProducts } from "../hooks/useProducts";
import { getImg } from "../../features/products/productUtils";

const DEFAULT_SPECIFICATIONS = [
  { title: "Waterproof", icon: Droplets },
  { title: "UV Resistant", icon: Sun },
  { title: "Termite Proof", icon: ShieldCheck },
  { title: "Zero Maintenance", icon: Key },
];

const DEFAULT_BENTO_PRODUCTS = [
  {
    id: "plastic-lumber",
    name: "Plastic Lumber",
    category_name: "Plastic Lumber",
    description: "Durable recycled plastic profiles for construction framing, decking, walkways and industrial applications.",
    image_url: "/uploads/products/categories/plastic-lumber-1770446410430-0.webp",
    fallback_image: "https://images.unsplash.com/photo-1541888081254-20a2e374ff19?q=80&w=1200&auto=format&fit=crop",
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
    id: "plastic-tables",
    name: "Plastic Tables",
    category_name: "Plastic Tables",
    description: "All-weather tables for cafeterias, picnic spots, and industrial breakrooms.",
    image_url: "/uploads/products/categories/plastic-table-1770446441648-0.webp",
    fallback_image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop",
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
    id: "outdoor-furniture",
    name: "Outdoor Furniture",
    category_name: "Outdoor Furniture",
    description: "Ergonomic and long-lasting furniture for resorts, parks and public spaces.",
    image_url: "/uploads/products/garden-bench/gardenbench-1770441701366-1.webp",
    fallback_image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=1200&auto=format&fit=crop",
  },
];

const getCardFeatures = (prod) => {
  if (prod && Array.isArray(prod.features) && prod.features.length > 0) {
    return prod.features.map((f, i) => {
      if (typeof f === "string") {
        const icons = [Droplets, Sun, ShieldCheck, Key];
        return { title: f, icon: icons[i % icons.length] };
      }
      return f;
    });
  }
  return DEFAULT_SPECIFICATIONS;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 25, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  hover: {
    y: -8,
    scale: 1.01,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 22,
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
    <div className="w-full py-4">
      {/* Bento Grid matching image.png (3 columns on lg breakpoint) */}
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
          className="group relative lg:col-span-2 lg:row-span-2 min-h-[460px] lg:min-h-[520px] w-full rounded-2xl overflow-hidden border border-[var(--border-card)] flex flex-col justify-between p-6 sm:p-8 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          {/* Background Image Layer (Positioned behind content) */}
          <div className="absolute inset-0 z-0 bg-slate-900 pointer-events-none overflow-hidden">
            <OptimizedImage
              src={getImgUrl(featuredProduct, 0)}
              fallbackSrc={DEFAULT_BENTO_PRODUCTS[0].fallback_image}
              alt={featuredProduct.name}
              className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out opacity-100"
            />
            {/* Bottom Dark Gradient for Text Contrast while keeping top image 100% visible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent group-hover:via-black/75 transition-colors duration-300" />
          </div>

          {/* TOP BAR: Badge '01 / 06' + Top Right Action Arrow */}
          <div className="relative z-20 flex items-center justify-between w-full">
            <Motion.div
              variants={badgeHoverVariant}
              className="flex items-center gap-2"
            >
              <span className="bg-[var(--brand)] text-slate-950 font-black text-xs px-3 py-1 rounded-md shadow-md">
                01
              </span>
              <span className="text-white font-extrabold text-xs tracking-wider drop-shadow-sm">
                / 06
              </span>
            </Motion.div>

            <Motion.button
              type="button"
              whileHover={{ scale: 1.12, rotate: 4 }}
              whileTap={{ scale: 0.92 }}
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick(featuredProduct);
              }}
              aria-label="View Collection"
              className="relative z-30 w-11 h-11 rounded-xl bg-[var(--brand)] text-white flex items-center justify-center cursor-pointer border border-white/20 shrink-0 shadow-md"
            >
              <ArrowUpRight className="w-5 h-5 stroke-[3]" style={{ stroke: '#ffffff', color: '#ffffff' }} />
            </Motion.button>
          </div>

          {/* BOTTOM CONTENT AREA */}
          <div className="relative z-20 mt-auto pt-8">
            <div className="max-w-2xl">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight flex items-center gap-2 mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                <span>{featuredProduct.name || "Plastic Lumber"}</span>
                <Leaf className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--brand)] shrink-0 drop-shadow-md" />
              </h3>

              <p className="text-white text-xs sm:text-sm leading-relaxed font-semibold max-w-xl drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                {featuredProduct.description ||
                  "Durable recycled plastic profiles for construction framing, decking, walkways and industrial applications."}
              </p>
            </div>

            {/* FEATURES / SPECIFICATIONS BAR + ACTION BUTTON */}
            <div className="mt-5 pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold text-white">
                {featuredFeatures.map((feat, idx) => {
                  const IconComp = feat.icon || Droplets;
                  return (
                    <Motion.div
                      key={idx}
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1.5 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/20 shadow-xs"
                    >
                      <IconComp className="w-3.5 h-3.5 text-[var(--brand)] shrink-0" />
                      <span className="text-white text-[11px] sm:text-xs font-bold">{feat.title}</span>
                    </Motion.div>
                  );
                })}
              </div>

              <Motion.button
                type="button"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(featuredProduct);
                }}
                className="relative z-30 bg-[var(--brand)] text-white font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer border border-white/20 shrink-0 opacity-100 shadow-md"
              >
                <span className="font-black" style={{ color: '#ffffff' }}>
                  Explore Collection
                </span>
                <ArrowRight className="w-4 h-4 stroke-[3]" style={{ stroke: '#ffffff', color: '#ffffff' }} />
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
              className="group relative aspect-square w-full rounded-2xl overflow-hidden border border-[var(--border-card)] flex flex-col justify-between p-5 sm:p-6 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Background Image Layer (Positioned behind content) */}
              <div className="absolute inset-0 z-0 bg-slate-900 pointer-events-none overflow-hidden">
                <OptimizedImage
                  src={img}
                  fallbackSrc={DEFAULT_BENTO_PRODUCTS[idx + 1]?.fallback_image}
                  alt={title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent group-hover:via-black/75 transition-colors duration-300" />
              </div>

              {/* TOP BAR */}
              <div className="relative z-20 flex items-center justify-between w-full">
                <Motion.span
                  variants={badgeHoverVariant}
                  className="bg-[var(--brand)] text-slate-950 font-black text-xs px-3 py-1 rounded-md shadow-md"
                >
                  {cardNum}
                </Motion.span>

                <Motion.button
                  type="button"
                  whileHover={{ scale: 1.12, rotate: 4 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(prod);
                  }}
                  aria-label="View Product"
                  className="relative z-30 w-9 h-9 rounded-xl bg-[var(--brand)] text-white flex items-center justify-center cursor-pointer border border-white/20 shrink-0 shadow-md"
                >
                  <ArrowUpRight className="w-4 h-4 stroke-[3]" style={{ stroke: '#ffffff', color: '#ffffff' }} />
                </Motion.button>
              </div>

              {/* BOTTOM TEXT */}
              <div className="relative z-20 mt-auto pt-8">
                <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {title}
                </h3>
                <p className="text-white text-xs leading-relaxed font-semibold line-clamp-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
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
              className="group relative aspect-square w-full rounded-2xl overflow-hidden border border-[var(--border-card)] flex flex-col justify-between p-5 sm:p-6 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Background Image Layer (Positioned behind content) */}
              <div className="absolute inset-0 z-0 bg-slate-900 pointer-events-none overflow-hidden">
                <OptimizedImage
                  src={img}
                  fallbackSrc={DEFAULT_BENTO_PRODUCTS[idx + 3]?.fallback_image}
                  alt={title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent group-hover:via-black/75 transition-colors duration-300" />
              </div>

              {/* TOP BAR */}
              <div className="relative z-20 flex items-center justify-between w-full">
                <Motion.span
                  variants={badgeHoverVariant}
                  className="bg-[var(--brand)] text-slate-950 font-black text-xs px-3 py-1 rounded-md shadow-md"
                >
                  {cardNum}
                </Motion.span>

                <Motion.button
                  type="button"
                  whileHover={{ scale: 1.12, rotate: 4 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(prod);
                  }}
                  aria-label="View Product"
                  className="relative z-30 w-9 h-9 rounded-xl bg-[var(--brand)] text-white flex items-center justify-center cursor-pointer border border-white/20 shrink-0 shadow-md"
                >
                  <ArrowUpRight className="w-4 h-4 stroke-[3]" style={{ stroke: '#ffffff', color: '#ffffff' }} />
                </Motion.button>
              </div>

              {/* BOTTOM TEXT */}
              <div className="relative z-20 mt-auto pt-8">
                <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {title}
                </h3>
                <p className="text-white text-xs leading-relaxed font-semibold line-clamp-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
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
