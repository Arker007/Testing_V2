import React, { useState } from "react";
import { X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useInquiry } from "../hooks/useInquiry";
import styles from "./InquiryModal.module.css";

export default function InquiryModal({ product, onClose }) {
  const { submitInquiry, submitting, success, error, resetState } = useInquiry();

  const handleClose = () => {
    resetState();
    onClose();
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    quantity: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitInquiry({
        ...formData,
        product_id: product?.id,
        product_name: product?.name,
      });
    } catch {
      // Error handled by hook
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className={styles.modalCard}>
        <button
          type="button"
          onClick={handleClose}
          className={styles.modalCloseBtn}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className={styles.modalHeader}>
          <span className={styles.catTag}>
            Inquire for Quote
          </span>
          <h2 className={styles.gridCardTitle}>
            {product?.name ? `Quote Request: ${product.name}` : "Product Inquiry"}
          </h2>
        </div>

        {success ? (
          <div className={styles.successState}>
            <CheckCircle size={48} className={styles.successIcon} />
            <h3 className={styles.successTitle}>Inquiry Submitted!</h3>
            <p className={styles.successSub}>
              Our sales team will contact you with pricing and product specifications within 2 hours.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>
                Full Name *
              </label>
              <input
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Rahul Patel"
                className={styles.formInput}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.formLabel}>
                  Phone / Mobile *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={styles.formInput}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="company" className={styles.formLabel}>
                  Company Name
                </label>
                <input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company Inc."
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="quantity" className={styles.formLabel}>
                  Estimated Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 100 units"
                  className={styles.formInput}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>
                Requirement Details *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Mention required dimensions, color preference, or delivery timeline..."
                className={styles.formTextarea}
              />
            </div>

            {error && (
              <div className={styles.errorBanner}>
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className={`btn btn-primary ${styles.submitBtn}`}
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Submitting Inquiry...</span>
                </>
              ) : (
                <span>Submit Quote Request</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
