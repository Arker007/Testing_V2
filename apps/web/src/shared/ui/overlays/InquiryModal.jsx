/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { useInquiry } from "../../hooks/useInquiry";
import { getSkuCode } from "@/features/products/utils/product.utils";
import styles from "./InquiryModal.module.css";

const PRESET_VOLUMES = ["50 units", "100 units", "500 units", "1,000+ units", "Custom Batch"];

export default function InquiryModal({ product, onClose }) {
  const { submitInquiry, submitting, success, error, referenceId, resetState } = useInquiry();
  const [copiedRef, setCopiedRef] = useState(false);
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  const sku = product ? getSkuCode(product) : "";
  const rawProductName = product?.name || product?.title || "";
  const productName = rawProductName ? rawProductName.replace(/^Custom Specification for\s*"?/i, "").replace(/"?$/i, "") : "";
  const productCategory = product?.category_name || product?.category || "Industrial Recycled Plastic";

  const defaultMessage = product
    ? `Requesting technical datasheet, load rating verification, and tiered volume pricing for ${productName || "custom specification"}${sku ? ` (REF: ${sku})` : ""}.`
    : "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    quantity: "100 units",
    message: defaultMessage,
  });

  const [contactError, setContactError] = useState("");

  const handleClose = useCallback(() => {
    resetState();
    onClose();
  }, [resetState, onClose]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    
    const timer = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 150);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [handleClose]);

  useEffect(() => {
    if (product) {
      setFormData((prev) => ({
        ...prev,
        message: prev.message || defaultMessage,
      }));
    }
  }, [product, defaultMessage]);

  const handleCopyRef = () => {
    if (referenceId) {
      navigator.clipboard.writeText(referenceId);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (contactError && (e.target.name === "email" || e.target.name === "phone")) {
      setContactError("");
    }
  };

  const handleSelectPreset = (vol) => {
    setFormData((prev) => ({ ...prev, quantity: vol }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setContactError("Please provide your name so our sales team knows whom to address.");
      return;
    }
    if (!formData.phone.trim() && !formData.email.trim()) {
      setContactError("Please provide either a Phone/WhatsApp number or Work Email so we can provide your quote.");
      return;
    }

    try {
      await submitInquiry({
        ...formData,
        product_id: product?.id,
        product_name: productName || "Custom Specification",
        product_sku: sku || "CUSTOM-RFP",
        product_category: productCategory,
      });
    } catch {
      // Error handled by hook
    }
  };

  const whatsAppText = encodeURIComponent(
    `Hello Vishal Enterprise, I would like to request an official quote for:\nProduct: ${productName || "Industrial Recycled Plastic"}\nRef/SKU: ${sku || "CUSTOM-RFP"}\nQuantity: ${formData.quantity || "100 units"}`
  );

  const modalContent = (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
    >
      <motion.div
        ref={modalRef}
        className={styles.modalCard}
        initial={{ opacity: 0, scale: 0.96, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 14 }}
        transition={{ type: "spring", damping: 30, stiffness: 380 }}
      >
        {/* Fixed Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerInfo}>
            <div className={styles.tagRow}>
              <span className={styles.rfqBadge}>
                <Icon icon="carbon:badge" className="w-3.5 h-3.5" />
                Direct Factory RFQ
              </span>
              {sku && (
                <span className={styles.skuBadge}>
                  REF: {sku}
                </span>
              )}
            </div>
            <h2 id="inquiry-modal-title" className={styles.modalTitle}>
              {productName ? `Quote Request: ${productName}` : "Direct Factory Quote"}
            </h2>
            <p className={styles.modalSubtitle}>
              Official pricing, technical drawings & dispatch schedule from Ankleshwar Plant
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className={styles.modalCloseBtn}
            aria-label="Close dialog"
            title="Close (Esc)"
          >
            <Icon icon="carbon:close" className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className={styles.modalBody}>
          {/* Product Snapshot Banner */}
          {product && (
            <div className={styles.productSnapshot}>
              <div className={styles.snapshotContent}>
                <span className={styles.snapshotCategory}>
                  {productCategory}
                </span>
                <span className={styles.snapshotName} title={productName}>
                  {productName || "Custom Industrial Fabrication"}
                </span>
              </div>
              <div className={styles.snapshotResponse}>
                <Icon icon="carbon:time" className="w-3.5 h-3.5" />
                <span>Response ~2h</span>
              </div>
            </div>
          )}

          {success ? (
            <div className={styles.successState}>
              <div className={styles.successIconCircle}>
                <Icon icon="carbon:checkmark-filled" className="w-10 h-10" />
              </div>
              
              <h3 className={styles.successTitle}>Inquiry Submitted Successfully</h3>
              
              {referenceId && (
                <div className={styles.referenceBadge}>
                  <span className="text-xs text-[var(--text-muted)] font-medium">Ref No:</span>
                  <span className="text-xs font-bold text-[var(--text-primary)] tracking-wider">
                    {referenceId}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyRef}
                    className={styles.copyRefBtn}
                    title="Copy Reference Code"
                    aria-label="Copy reference code"
                  >
                    <Icon
                      icon={copiedRef ? "carbon:checkmark" : "carbon:copy"}
                      className="w-4 h-4"
                    />
                  </button>
                </div>
              )}

              <p className={styles.successDescription}>
                Our engineering sales desk in Ankleshwar has received your quote request for{" "}
                <strong>{productName || "custom items"}</strong>. An engineer will follow up within{" "}
                <strong>2 business hours</strong> with technical datasheets, CAD drawings, and volume tiered pricing.
              </p>

              <div className={styles.successActionRow}>
                <button
                  type="button"
                  onClick={resetState}
                  className="btn btn-secondary flex-1 min-h-[44px] justify-center"
                >
                  <Icon icon="carbon:renew" className="w-4 h-4" />
                  <span>New Inquiry</span>
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn btn-primary flex-1 min-h-[44px] justify-center"
                >
                  <span>Done</span>
                </button>
              </div>
            </div>
          ) : (
            <form id="inquiry-modal-form" onSubmit={handleSubmit} className={styles.modalForm}>
              {/* Full Name */}
              <div className={styles.formGroup}>
                <label htmlFor="inquiry-name" className={styles.formLabel}>
                  <span>Full Name<span className={styles.requiredMarker}>*</span></span>
                </label>
                <div className={styles.inputWrapper}>
                  <Icon icon="carbon:user" className={styles.inputIcon} />
                  <input
                    ref={firstInputRef}
                    id="inquiry-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Patel"
                    className={styles.formInput}
                  />
                </div>
              </div>

              {/* Phone & Work Email Grid */}
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="inquiry-phone" className={styles.formLabel}>
                    <span>Phone / WhatsApp<span className={styles.requiredMarker}>*</span></span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <Icon icon="carbon:phone" className={styles.inputIcon} />
                    <input
                      id="inquiry-phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={styles.formInput}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="inquiry-email" className={styles.formLabel}>
                    <span>Work Email</span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <Icon icon="carbon:email" className={styles.inputIcon} />
                    <input
                      id="inquiry-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className={styles.formInput}
                    />
                  </div>
                </div>
              </div>

              {/* Company & Order Volume Grid */}
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="inquiry-company" className={styles.formLabel}>
                    <span>Company Name <span className="text-[11px] font-normal text-[var(--text-muted)]">(Optional)</span></span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <Icon icon="carbon:enterprise" className={styles.inputIcon} />
                    <input
                      id="inquiry-company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Apex Logistics Ltd."
                      className={styles.formInput}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="inquiry-quantity" className={styles.formLabel}>
                    <span>Order Volume</span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <Icon icon="carbon:package" className={styles.inputIcon} />
                    <input
                      id="inquiry-quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="e.g. 100 units"
                      className={styles.formInput}
                    />
                  </div>
                </div>
              </div>

              {/* Quick Volume Preset Chips */}
              <div className="flex flex-col gap-1.5 -mt-1">
                <span className="text-[11px] text-[var(--text-muted)] font-medium">
                  Standard batch sizes:
                </span>
                <div className={styles.volumePillRow}>
                  {PRESET_VOLUMES.map((vol) => (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => handleSelectPreset(vol)}
                      className={`${styles.volumePill} ${
                        formData.quantity === vol ? styles.volumePillActive : ""
                      }`}
                    >
                      {vol}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specifications / Notes Textarea */}
              <div className={styles.formGroup}>
                <label htmlFor="inquiry-message" className={styles.formLabel}>
                  <span>Specifications & Requirements</span>
                </label>
                <textarea
                  id="inquiry-message"
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Mention required dimensions, static/dynamic load ratings, delivery PIN code, or custom color specifications..."
                  className={styles.formTextarea}
                />
              </div>

              {/* Validation & Server Error Messages */}
              {(contactError || error) && (
                <div className={styles.errorBanner} role="alert">
                  <Icon icon="carbon:warning-alt" className="w-4 h-4 shrink-0" />
                  <span>{contactError || error}</span>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Fixed Footer Actions (when form is active) */}
        {!success && (
          <div className={styles.modalFooter}>
            <a
              href={`https://wa.me/919898686379?text=${whatsAppText}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsAppBtn}
              title="Chat with factory sales on WhatsApp"
            >
              <Icon icon="carbon:chat" className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Quick RFQ</span>
            </a>

            <button
              type="submit"
              form="inquiry-modal-form"
              disabled={submitting}
              className={styles.submitBtn}
            >
              {submitting ? (
                <>
                  <Icon icon="carbon:renew" className="w-4 h-4 animate-spin" />
                  <span>Dispatching RFQ...</span>
                </>
              ) : (
                <>
                  <span>Submit Quote Request</span>
                  <Icon icon="carbon:arrow-right" className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : modalContent;
}
