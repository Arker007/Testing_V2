import React, { useState, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import OptimizedImage from "../../shared/components/OptimizedImage";
import styles from "../../pages/ProductDetail.module.css";

function ImageZoom({ src, alt }) {
  const [showLens, setShowLens] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  const zoomFactor = 2;
  const lensSize = 160;

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();

    if (dimensions.width !== width || dimensions.height !== height) {
      setDimensions({ width, height });
    }

    // Get position relative to container
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Center lens on cursor
    const lensX = x - lensSize / 2;
    const lensY = y - lensSize / 2;

    setLensPos({ x: lensX, y: lensY });
  };

  const handleMouseEnter = () => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
    setShowLens(true);
  };

  const handleMouseLeave = () => {
    setShowLens(false);
  };

  const mouseX = lensPos.x + lensSize / 2;
  const mouseY = lensPos.y + lensSize / 2;

  const innerImgTransform = `translate3d(${-mouseX * zoomFactor + lensSize / 2}px, ${-mouseY * zoomFactor + lensSize / 2}px, 0) scale(${zoomFactor})`;

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        cursor: "zoom-in",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        sizes="(max-width: 768px) 100vw, 800px"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
          pointerEvents: "none",
        }}
      />

      <AnimatePresence>
        {showLens && dimensions.width > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: `${lensPos.x}px`,
              top: `${lensPos.y}px`,
              width: `${lensSize}px`,
              height: `${lensSize}px`,
              borderRadius: "50%",
              border: "3px solid var(--brand)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25), inset 0 0 15px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              pointerEvents: "none",
              zIndex: 10,
              backgroundColor: "var(--white)",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: `${dimensions.width}px`,
                height: `${dimensions.height}px`,
                transformOrigin: "top left",
                transform: innerImgTransform,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={src}
                alt={alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductGallery({
  images,
  currentImgIdx,
  setImg,
  productName,
  setShowImageModal,
  handlePrevImage,
  handleNextImage,
}) {
  return (
    <div className={styles.bentoGalleryCard}>
      <div className={styles.galleryWrap}>
        <div className={styles.mainImgContainer}>
          <div className={styles.mainImg}>
            {images[currentImgIdx] ? (
               <ImageZoom src={images[currentImgIdx]} alt={productName} />
             ) : (
               <div className={styles.noImg}>
                 <Icon icon="solar:gallery-linear" className="w-12 h-12 text-slate-400" />
               </div>
             )}
           </div>

           <div className={styles.imageBadgeOverlay}>
             <Icon icon="solar:shield-check-linear" className="w-4 h-4 inline mr-1 text-emerald-400 align-middle" />
             <span>50+ Year Lifespan</span>
           </div>

           {images[currentImgIdx] && (
             <button
               type="button"
               className={styles.fullscreenBtn}
               onClick={() => setShowImageModal(true)}
               aria-label="View image full screen"
               title="Expand View"
             >
               <Icon icon="solar:full-screen-square-linear" className="w-4 h-4" />
             </button>
           )}
         </div>

         {images.length > 1 && (
           <div className={styles.thumbRow}>
             <button
               type="button"
               className={styles.thumbNav}
               onClick={handlePrevImage}
               aria-label="Previous image"
             >
               <Icon icon="solar:alt-arrow-left-linear" className="w-4 h-4" />
             </button>
             <div className={styles.thumbs}>
               {images.map((src, i) => (
                 <button
                   key={i}
                   className={`${styles.thumb} ${i === currentImgIdx ? styles.thumbActive : ""}`}
                   onClick={() => setImg(i)}
                   aria-label={`View image ${i + 1} of ${productName}`}
                 >
                   <OptimizedImage src={src} alt={`${productName} image ${i + 1}`} />
                 </button>
               ))}
             </div>
             <button
               type="button"
               className={styles.thumbNav}
               onClick={handleNextImage}
               aria-label="Next image"
             >
               <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
             </button>
           </div>
         )}
       </div>

       <div className={styles.galleryGuarantees}>
         <div className={styles.galleryGuaranteeItem}>
           <Icon icon="solar:verified-check-linear" className="w-4 h-4 text-emerald-500" />
           <span>ISPM-15 Exempt</span>
         </div>
         <div className={styles.galleryGuaranteeItem}>
           <Icon icon="solar:leaf-linear" className="w-4 h-4 text-emerald-500" />
           <span>Zero Rot / Splinter</span>
         </div>
         <div className={styles.galleryGuaranteeItem}>
           <Icon icon="solar:refresh-circle-linear" className="w-4 h-4 text-emerald-500" />
           <span>100% Recycled Polyethylene</span>
         </div>
       </div>
    </div>
  );
}
