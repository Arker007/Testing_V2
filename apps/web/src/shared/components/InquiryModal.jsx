import React, { useState } from "react";
import { X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useInquiry } from "../hooks/useInquiry";
import styles from "../../pages/ProductDetail.module.css";

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
      <div className={styles.modalCard} style={{ maxWidth: "520px" }}>
        <button
          type="button"
          onClick={handleClose}
          className={styles.modalCloseBtn}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div style={{ marginBottom: "1rem" }}>
          <span className={styles.catTag} style={{ position: "static" }}>
            Inquire for Quote
          </span>
          <h2 className={styles.gridCardTitle} style={{ fontSize: "1.25rem", marginTop: "0.5rem" }}>
            {product?.name ? `Quote Request: ${product.name}` : "Product Inquiry"}
          </h2>
        </div>

        {success ? (
          <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
            <CheckCircle size={48} style={{ color: "#98d12a", margin: "0 auto 1rem" }} />
            <h3 style={{ fontSize: "1.1rem", color: "#0B2F63", fontWeight: 700 }}>Inquiry Submitted!</h3>
            <p style={{ fontSize: "0.875rem", color: "#5B6873", margin: "0.5rem 0 1.5rem" }}>
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
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <div>
              <label htmlFor="name" style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#0B2F63", marginBottom: "0.25rem" }}>
                Full Name *
              </label>
              <input
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Rahul Patel"
                style={{ width: "100%", padding: "0.6rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div>
                <label htmlFor="email" style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#0B2F63", marginBottom: "0.25rem" }}>
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
                  style={{ width: "100%", padding: "0.6rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                />
              </div>

              <div>
                <label htmlFor="phone" style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#0B2F63", marginBottom: "0.25rem" }}>
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
                  style={{ width: "100%", padding: "0.6rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div>
                <label htmlFor="company" style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#0B2F63", marginBottom: "0.25rem" }}>
                  Company Name
                </label>
                <input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company Inc."
                  style={{ width: "100%", padding: "0.6rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                />
              </div>

              <div>
                <label htmlFor="quantity" style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#0B2F63", marginBottom: "0.25rem" }}>
                  Estimated Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 100 units"
                  style={{ width: "100%", padding: "0.6rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#0B2F63", marginBottom: "0.25rem" }}>
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
                style={{ width: "100%", padding: "0.6rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
              />
            </div>

            {error && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#dc2626", fontSize: "0.8rem" }}>
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "0.5rem", justifyContent: "center" }}
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
