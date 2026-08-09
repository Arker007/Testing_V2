import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Leaf, ArrowRight, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import { useProducts } from "../hooks/useProducts";
import { getImg, getDimensionsStr, getStaticLoadKg } from "../../features/products/productUtils";

const cardVariant = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  hover: {
    y: -4,
    boxShadow: "0 20px 40px -15px rgba(6, 29, 18, 0.5), 0 0 25px -5px rgba(139, 214, 26, 0.2)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function ProductsShowcase() {
  const navigate = useNavigate();
  const { products, loading } = useProducts();

  const [activeIndex, setActiveIndex] = useState(0);

  // Active index safety
  useEffect(() => {
    if (products && products.length > 0 && activeIndex >= products.length) {
      setActiveIndex(0);
    }
  }, [products, activeIndex]);

  // Construct circular sequence starting from activeIndex
  const visibleProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return [
      ...products.slice(activeIndex),
      ...products.slice(0, activeIndex),
    ];
  }, [products, activeIndex]);

  const activeProduct = visibleProducts[0];
  const gridProducts = visibleProducts.slice(1, 6);

  // Handlers for navigation
  const handleNext = () => {
    if (!products || products.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    if (!products || products.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleCardClick = (prod) => {
    if (!products || !prod) return;
    const origIndex = products.findIndex((p) => String(p.id) === String(prod.id));
    if (origIndex !== -1) {
      setActiveIndex(origIndex);
    }
  };

  // Compute product position in total collection
  const getProductNumber = (prod) => {
    if (!products || !prod) return "01";
    const idx = products.findIndex((p) => String(p.id) === String(prod.id));
    return String(idx !== -1 ? idx + 1 : 1).padStart(2, "0");
  };

  const totalProductsCount = String(products ? products.length : 0).padStart(2, "0");

  // Dynamic specifications for activeProduct
  const activeSpecsObj = useMemo(() => {
    if (!activeProduct) return {};
    if (typeof activeProduct.specifications === "object" && activeProduct.specifications !== null) {
      return activeProduct.specifications;
    }
    return {};
  }, [activeProduct]);

  // Default specs for Card 01
  const selectedColor = activeProduct?.color || activeSpecsObj?.color || "Black";
  const selectedSize = "100 × 50";

  const specifications = useMemo(() => {
    if (!activeProduct) return [];
    const staticLoad = getStaticLoadKg(activeProduct);
    const dimStr = getDimensionsStr(activeProduct);

    return [
      {
        label: "Material",
        val: activeSpecsObj.Material || activeSpecsObj.material || activeProduct.material || "100% Recycled HDPE",
      },
      {
        label: "Density",
        val: activeSpecsObj.Density || activeSpecsObj.density || "0.95 – 1.05 g/cm³",
      },
      {
        label: "Size (mm)",
        val: dimStr !== "Standard Size" ? dimStr : `${selectedSize} × 3000`,
      },
      {
        label: "Color",
        val: selectedColor,
      },
      {
        label: "Surface Finish",
        val: activeSpecsObj.Surface || activeSpecsObj.surface || "Smooth / Textured",
      },
      {
        label: "Load Capacity",
        val: staticLoad > 0 ? `${staticLoad.toLocaleString()} kg` : "High",
      },
      {
        label: "Applications",
        val: activeSpecsObj.Applications || activeProduct.category_name || activeProduct.category || "Industrial & Framing",
      },
    ];
  }, [activeProduct, activeSpecsObj, selectedSize, selectedColor]);

  // Loading skeleton state
  if (loading && (!products || products.length === 0)) {
    return (
      <div className="w-full py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 animate-pulse">
          {/* Main Large Card Skeleton */}
          <div className="md:col-span-2 md:row-span-2 rounded-[24px] bg-gradient-to-br from-[#0B2F63]/80 to-[#071E40]/80 min-h-[500px] sm:min-h-[560px] border border-blue-900/30 flex flex-col justify-between p-4 sm:p-5 lg:p-6">
            <div className="flex justify-between items-start">
              <div className="flex gap-2">
                <div className="w-10 h-6 bg-blue-900/40 rounded"></div>
                <div className="w-8 h-6 bg-blue-900/40 rounded"></div>
              </div>
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-900/40"></div>
                <div className="w-6 h-6 rounded-full bg-blue-900/40"></div>
                <div className="w-6 h-6 rounded-full bg-blue-900/40"></div>
              </div>
            </div>
            <div className="w-full">
              <div className="w-40 h-6 bg-blue-900/40 rounded mb-3"></div>
              <div className="w-3/4 h-10 bg-blue-900/40 rounded mb-4"></div>
              <div className="w-full h-16 bg-blue-900/40 rounded mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-32 bg-blue-900/40 rounded-xl"></div>
                <div className="h-12 bg-blue-900/40 rounded-xl self-end"></div>
              </div>
            </div>
          </div>
          {/* Small Cards Skeleton */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-[24px] bg-gradient-to-br from-[#0B2F63]/80 to-[#071E40]/80 flex flex-col border border-blue-900/30 overflow-hidden min-h-[350px]">
              <div className="h-[200px] sm:h-[220px] bg-[#e4e8ec]/20 w-full"></div>
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="w-2/3 h-5 bg-blue-900/40 rounded mb-2"></div>
                  <div className="w-full h-3 bg-blue-900/40 rounded mb-1"></div>
                  <div className="w-4/5 h-3 bg-blue-900/40 rounded"></div>
                </div>
                <div className="w-8 h-1 bg-blue-900/40 mt-4 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty products state
  if (!loading && (!products || products.length === 0)) {
    return (
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8 text-center bg-gradient-to-br from-[#0B2F63] to-[#071E40] rounded-[24px] border border-blue-900/40 text-gray-300">
        <p className="text-sm font-medium">No products available in catalog.</p>
      </div>
    );
  }

  const activeTitle = activeProduct?.name || activeProduct?.title || "Recycled Plastic Product";
  const activeCategory = activeProduct?.category_name || activeProduct?.category || "Recycled Plastic";
  const activeDescription =
    activeProduct?.description ||
    activeProduct?.headline ||
    "Durable recycled plastic products engineered for construction framing, decking, walkways and industrial applications.";
  const activeImage = getImg(activeProduct);

  return (
    <div className="w-full py-4">
      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {/* Card 01: Active Featured Product */}
        <Motion.div
          key={activeProduct?.id || "active-product"}
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="group relative md:col-span-2 md:row-span-2 rounded-[24px] overflow-hidden border border-blue-900/50 bg-gradient-to-br from-[#0B2F63] to-[#071E40] flex flex-col justify-between p-6 lg:p-8 min-h-[500px] sm:min-h-[560px]"
        >
          {/* Background Product Image covering the entire card */}
          <div className="absolute inset-0 z-0">
            <OptimizedImage
              src={activeImage}
              fallbackSrc={activeImage}
              alt={activeTitle}
              className="w-full h-full object-cover filter brightness-90 group-hover:scale-102 transition-transform duration-500 ease-out"
            />
            {/* Gradient Overlay tuned for crisp image visibility and legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#071E40] via-[#0B2F63]/60 to-black/30 z-0" />
          </div>

          {/* Overlaid Content Container */}
          <div className="relative z-10 flex flex-col justify-between h-full w-full gap-6">
            {/* Top Section: Header & Title */}
            <div>
              {/* Header Row */}
              <div className="flex items-start justify-between w-full mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-[#8BD61A] text-slate-950 font-extrabold text-xs px-2.5 py-1 rounded">
                    {getProductNumber(activeProduct)}
                  </span>
                  <span className="text-white/90 font-semibold text-xs tracking-wider">
                    / {totalProductsCount}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Navigation Buttons */}
                  <button
                    type="button"
                    onClick={handlePrev}
                    title="Previous Product"
                    aria-label="Previous Product"
                    className="w-8 h-8 rounded-lg bg-[#0B2F63]/90 border border-blue-700/60 hover:bg-[#8BD61A] hover:border-[#8BD61A] hover:text-slate-950 text-white flex items-center justify-center transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    title="Next Product"
                    aria-label="Next Product"
                    className="w-8 h-8 rounded-lg bg-[#0B2F63]/90 border border-blue-700/60 hover:bg-[#8BD61A] hover:border-[#8BD61A] hover:text-slate-950 text-white flex items-center justify-center transition cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        activeProduct?.id
                          ? `/products/${activeProduct.id}`
                          : `/products?cat=${activeCategory}`
                      )
                    }
                    title="View Product Details"
                    className="w-9 h-9 rounded-lg bg-white text-[#0B2F63] flex items-center justify-center font-bold transition-all hover:bg-[#8BD61A] hover:text-slate-950 cursor-pointer ml-1"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Title & Description Header */}
              <div className="w-full py-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-[#8BD61A]/40 bg-[#0B2F63]/90 text-[#8BD61A] text-[11px] font-bold tracking-wider uppercase mb-2.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>MANUFACTURER & SUPPLIER</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight flex items-center gap-2.5 mb-1.5 uppercase">
                  <span>{activeTitle}</span>
                  <Leaf className="w-6 h-6 sm:w-7 sm:h-7 text-[#8BD61A] shrink-0 inline-block" />
                </h3>
                <div className="w-12 h-1 bg-[#8BD61A] rounded-full mb-2" />
                <p className="text-gray-100 text-xs sm:text-sm leading-relaxed font-normal line-clamp-2 max-w-2xl">
                  {activeDescription}
                </p>
              </div>
            </div>

            {/* Bottom Section: Specifications & Controls Overlaid on Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 w-full">
              {/* Left Box: CLEAN 2D SPECIFICATIONS TABLE */}
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 text-slate-900 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                  <h4 className="text-slate-900 font-bold text-xs tracking-wider uppercase flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#8BD61A] inline-block" />
                    SPECIFICATIONS
                  </h4>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase">
                    Technical Data
                  </span>
                </div>
                <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                  <table className="w-full text-left text-xs border-collapse">
                    <tbody>
                      {specifications.map((spec, i) => (
                        <tr
                          key={i}
                          className={`${
                            i % 2 === 0 ? "bg-white" : "bg-slate-50"
                          } border-b border-slate-200 last:border-none`}
                        >
                          <td className="py-1.5 px-3 text-slate-500 font-medium w-1/2">
                            {spec.label}
                          </td>
                          <td className="py-1.5 px-3 text-slate-900 font-semibold text-right w-1/2">
                            {spec.val}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Box: EXPLORE ACTION BUTTON */}
              <button
                type="button"
                onClick={() =>
                  navigate(
                    activeProduct?.id
                      ? `/products/${activeProduct.id}`
                      : `/products?cat=${activeCategory}`
                  )
                }
                className="exploreBtnGlobal w-full mt-auto"
              >
                <span>EXPLORE PRODUCT</span>
                <ArrowRight className="exploreBtnArrowGlobal" />
              </button>
            </div>
          </div>
        </Motion.div>

        {/* Small Cards */}
        {gridProducts.map((prod, idx) => {
          const title = prod.name || prod.title || "Product";
          const desc = prod.description || prod.headline || "";
          const img = getImg(prod);
          const num = getProductNumber(prod);

          return (
            <Motion.div
              key={prod.id}
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ delay: (idx + 1) * 0.05 }}
              onClick={() => handleCardClick(prod)}
              className="group relative rounded-[24px] overflow-hidden border border-blue-900/50 bg-gradient-to-br from-[#0B2F63] to-[#071E40] flex flex-col justify-between shadow-[0_15px_35px_-8px_rgba(7,30,64,0.5)] hover:shadow-[0_22px_45px_-5px_rgba(7,30,64,0.7)] transition-all duration-300 cursor-pointer"
            >
              {/* Top Product Image Container on light neutral background */}
              <div className="relative w-full h-[200px] sm:h-[220px] bg-[#e4e8ec] overflow-hidden flex items-center justify-center">
                {/* Green Number Badge Top Left */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-[#8BD61A] text-white font-black text-xs px-2.5 py-0.5 rounded-md shadow-sm">
                    {num}
                  </span>
                </div>

                {/* Arrow Button Top Right */}
                <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center font-bold shadow-md transition-all duration-300 group-hover:bg-[#8BD61A] group-hover:text-white">
                  <ArrowRight className="w-4 h-4" />
                </div>

                {/* Product Image */}
                <OptimizedImage
                  src={img}
                  fallbackSrc={img}
                  alt={title}
                  className="w-full h-full object-contain p-3 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out"
                />
              </div>

              {/* Bottom Dark Footer Navy Content Area */}
              <div className="p-5 lg:p-6 flex flex-col justify-between flex-1 bg-gradient-to-b from-[#0B2F63] to-[#071E40]">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-1 leading-snug line-clamp-1">
                    {title}
                  </h3>
                  <p className="text-gray-300 text-xs leading-relaxed line-clamp-2">
                    {desc}
                  </p>
                </div>
                <div className="w-8 h-0.5 bg-[#8BD61A] mt-3.5 rounded-full" />
              </div>
            </Motion.div>
          );
        })}
      </div>
    </div>
  );
}
