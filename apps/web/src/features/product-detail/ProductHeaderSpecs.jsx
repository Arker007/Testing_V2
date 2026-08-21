import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import styles from "../../pages/ProductDetail.module.css";

export default function ProductHeaderSpecs({
  product,
  categoryName,
  brand,
  sku,
  currentPrice,
  oldPrice,
  discount,
  sizeOptions,
  displaySwatches,
  currentImgIdx,
  setImg,
  waLink,
  setShowInquiry,
  setShowSpecsSheet,
}) {
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0] || "");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className={styles.bentoInfoStack}>
      {/* Card 1: Header & Pricing Info */}
      <div className={styles.bentoInfoCard}>
        <div className={styles.metaBadgeRow}>
          <span className={styles.categoryPill}>
            <Icon icon="solar:leaf-linear" className="w-3.5 h-3.5 mr-1 inline" /> {categoryName.toUpperCase()}
          </span>
          <span className={styles.stockBadge}>
            <Icon icon="solar:verified-check-linear" className="w-3.5 h-3.5 mr-1 inline text-emerald-500" /> Production Ready
          </span>
        </div>

        <div className={styles.brandSkuRow}>
          <span>{brand}</span>
          <span>&bull;</span>
          <span>SKU: {sku}</span>
        </div>

        <h1 className={styles.productTitle}>{product.name}</h1>

        {product.technical_blurb ? (
          <p className={styles.technicalBlurb}>{product.technical_blurb}</p>
        ) : (
          <p className={styles.technicalBlurb}>
            High-durability recycled composite material. Engineered for maximum load-bearing efficiency, environmental sustainability, and rot resistance.
          </p>
        )}

        <div className={styles.priceDivider} />

        <div className={styles.priceBox}>
          <div className={styles.priceGroup}>
            {currentPrice && currentPrice !== "0" ? (
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className={styles.currentPrice}>
                    ₹{currentPrice}
                  </span>
                  {oldPrice && (
                    <span className={`${styles.relatedOldPrice} text-base`}>
                      ₹{oldPrice}
                    </span>
                  )}
                  {discount && (
                    <span className={`${styles.discountBadge} bg-rose-600 text-white text-xs font-extrabold px-2 py-0.5 rounded-md uppercase ml-1`}>
                      {discount}% OFF
                    </span>
                  )}
                </div>
                <span className={styles.priceTax}>Excl. GST & Delivery</span>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <span className={styles.currentPrice}>
                  Enquire for Volume Quote
                </span>
                <span className={styles.priceTax}>Best wholesale prices guaranteed</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card 2: Key Parameters Matrix */}
      <div className={styles.bentoSpecsGridCard}>
        <div className={styles.bentoSpecsGridInner}>
          <div className={styles.bentoSpecTile}>
            <div className={styles.specIconBox}>
              <Icon icon="solar:box-minimalistic-linear" className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <span className={styles.matrixLabel}>Minimum Order</span>
              <strong className={styles.matrixVal}>{product.moq || "100 Units"}</strong>
            </div>
          </div>

          <div className={styles.bentoSpecTile}>
            <div className={styles.specIconBox}>
              <Icon icon="solar:delivery-linear" className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <span className={styles.matrixLabel}>Dispatch</span>
              <strong className={styles.matrixVal}>{product.dispatch || "Immediate Dispatch Available"}</strong>
            </div>
          </div>

          <div className={styles.bentoSpecTile}>
            <div className={styles.specIconBox}>
              <Icon icon="solar:wrench-linear" className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <span className={styles.matrixLabel}>Customization</span>
              <strong className={styles.matrixVal}>{product.customization || "Brand logo embossing & RFID tracking slots"}</strong>
            </div>
          </div>

          <div className={styles.bentoSpecTile}>
            <div className={styles.specIconBox}>
              <Icon icon="solar:scale-linear" className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <span className={styles.matrixLabel}>Load Capacity</span>
              <strong className={styles.matrixVal}>{product.capacity || "Static 5,000kg / Dynamic 1,500kg / Racking 1,000kg"}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Options Selector */}
      <div className={styles.bentoOptionsCard}>
        <div className={styles.optionRow}>
          <label className={styles.optionLabel} htmlFor="size-select">
            Configuration / Size
          </label>
          <div className={styles.selectWrapper} ref={dropdownRef}>
            <button
              id="size-select"
              type="button"
              className={`${styles.customSelectTrigger} ${isOpen ? styles.customSelectTriggerActive : ""}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
            >
              <span>{selectedSize}</span>
              <Icon icon="solar:alt-arrow-down-linear" className={`${styles.selectIcon} ${isOpen ? styles.selectIconRotated : ""}`} />
            </button>
            
            {isOpen && (
              <ul className={styles.customSelectDropdown} role="listbox">
                {sizeOptions.map((option) => (
                  <li
                    key={option}
                    role="option"
                    aria-selected={option === selectedSize}
                    className={`${styles.customSelectOption} ${option === selectedSize ? styles.customSelectOptionActive : ""}`}
                    onClick={() => {
                      setSelectedSize(option);
                      setIsOpen(false);
                    }}
                  >
                    {option}
                    {option === selectedSize && <Icon icon="solar:check-read-linear" className="ml-auto text-[var(--brand-dark)] w-4 h-4" />}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {displaySwatches.length > 0 && (
          <div className={styles.optionRow}>
            <label className={styles.optionLabel}>Color Palette</label>
            <div className={styles.colorSwatches}>
              {displaySwatches.map((swatch, i) => (
                <button
                  key={`${swatch}-${i}`}
                  type="button"
                  className={`${styles.colorTag} ${i === currentImgIdx ? styles.colorTagActive : ""}`}
                  onClick={() => setImg(i)}
                  aria-label={`Select color variant ${i + 1}`}
                >
                  Option {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card 4: Action Cluster */}
      <div className={styles.bentoActionsCard}>
        <div className={styles.mainActions}>
          <button
            type="button"
            className={styles.darkInquiryBtn}
            onClick={() => setShowInquiry(true)}
          >
            <span>Request Quote</span>
            <Icon icon="solar:arrow-right-linear" className="w-4 h-4 ml-1" />
          </button>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.waBtn}
          >
            <Icon icon="logos:whatsapp-icon" className="w-4 h-4" /> Whatsapp Us
          </a>
        </div>
        <button
          type="button"
          className={styles.datasheetBtn}
          onClick={() => setShowSpecsSheet(true)}
        >
          <Icon icon="solar:document-text-linear" className="w-4 h-4 text-emerald-500" /> View Tech Sheet
        </button>
      </div>
    </div>
  );
}

