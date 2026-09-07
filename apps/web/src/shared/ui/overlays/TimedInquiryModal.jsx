/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { useSite } from "../../../shared/context/SiteContext";
import styles from "./TimedInquiryModal.module.css";

const USAGE_THRESHOLD_MS = 60 * 1000; // 1 minute (60 seconds)
const STORAGE_DISMISSED_KEY = "timed_inquiry_modal_dismissed";
const STORAGE_START_TIME_KEY = "site_session_start_time";

export default function TimedInquiryModal() {
  const { c } = useSite();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [copiedRef, setCopiedRef] = useState(false);

  const [form, setForm] = useState({
    productService: "",
    fullName: "",
    email: "",
    country: "India",
    phonePrefix: "+91",
    phone: "",
    message: "",
  });

  const handleCopyRef = () => {
    if (referenceId) {
      navigator.clipboard.writeText(referenceId);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const handleResetForm = () => {
    setForm({
      productService: "",
      fullName: "",
      email: "",
      country: "India",
      phonePrefix: "+91",
      phone: "",
      message: "",
    });
    setStatus("idle");
    setErrorMessage("");
    setReferenceId("");
  };

  // Track site usage time across public navigation
  useEffect(() => {
    // If user has already dismissed or submitted in this session, do not auto-open
    if (sessionStorage.getItem(STORAGE_DISMISSED_KEY) === "true") {
      return;
    }

    let startTime = parseInt(sessionStorage.getItem(STORAGE_START_TIME_KEY), 10);
    if (!startTime || isNaN(startTime)) {
      startTime = Date.now();
      sessionStorage.setItem(STORAGE_START_TIME_KEY, String(startTime));
    }

    const elapsed = Date.now() - startTime;
    const remainingTime = Math.max(500, USAGE_THRESHOLD_MS - elapsed);

    const timer = setTimeout(() => {
      if (sessionStorage.getItem(STORAGE_DISMISSED_KEY) !== "true") {
        setIsOpen(true);
      }
    }, remainingTime);

    // Global event listener to allow manual triggering from anywhere
    const handleManualOpen = (e) => {
      if (e?.detail?.product) {
        setForm((prev) => ({
          ...prev,
          productService: e.detail.product.name || prev.productService,
        }));
      }
      setIsOpen(true);
    };

    window.addEventListener("open-inquiry-modal", handleManualOpen);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("open-inquiry-modal", handleManualOpen);
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    sessionStorage.setItem(STORAGE_DISMISSED_KEY, "true");
  }, []);

  const handleChange = useCallback((field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }, []);

  // Handle ESC key and body scroll locking
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const composedMessage = `
Product/Service Looking For: ${form.productService || "General B2B Inquiry"}
Country: ${form.country || "Not specified"}
Phone Code: ${form.phonePrefix || "+91"}

Message:
${form.message || "Requested product catalog and bulk pricing quote."}
`.trim();

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          phone: `${form.phonePrefix || "+91"} ${form.phone || ""}`.trim(),
          company: form.productService || "Quick Inquiry",
          message: composedMessage,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit inquiry. Please try again.");
      }

      let generatedRef = "";
      try {
        const data = await res.json();
        const rawId = data?.id ?? Math.floor(10000 + Math.random() * 90000);
        generatedRef = `RFQ-VE-${String(rawId).padStart(5, "0")}`;
      } catch {
        generatedRef = `RFQ-VE-${Math.floor(10000 + Math.random() * 90000)}`;
      }

      setReferenceId(generatedRef);
      setStatus("sent");
      sessionStorage.setItem(STORAGE_DISMISSED_KEY, "true");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "Sending failed. Please try again or reach out directly.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="timed-inquiry-title"
        >
          <motion.div
            className={styles.modalDialog}
            id="modal-enquiry-card"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 360 }}
          >
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          className={styles.closeBtn}
          aria-label="Close inquiry dialog"
        >
          <Icon icon="carbon:close" className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className={styles.header}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs uppercase font-bold tracking-wider text-[var(--brand-primary)] px-2.5 py-0.5 rounded-[var(--radius-sm,4px)] bg-[var(--brand-soft)]">
              Direct Engineering & Sales Desk
            </span>
          </div>
          <h2 id="timed-inquiry-title" className={styles.title}>
            Direct Factory Quote
          </h2>
          <p className={styles.subtitle}>
            Specify your technical application or volume requirements. Our factory engineering team responds within 2 business hours.
          </p>
        </div>

        {status === "sent" ? (
          <div className={styles.successContainer}>
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mx-auto mb-3 text-emerald-500">
              <Icon icon="carbon:checkmark-filled" className="w-10 h-10" />
            </div>
            <h3 className={styles.successHeading}>Inquiry Sent Successfully</h3>
            
            {referenceId && (
              <div className="my-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-btn,8px)] bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)]">
                <span className="text-xs text-[var(--text-muted)] font-mono font-medium">Reference:</span>
                <span className="text-xs font-mono font-bold text-[var(--text-primary)] tracking-wider">
                  {referenceId}
                </span>
                <button
                  type="button"
                  onClick={handleCopyRef}
                  className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer ml-1"
                  title="Copy Reference Code"
                  aria-label="Copy reference code"
                >
                  <Icon icon={copiedRef ? "carbon:checkmark" : "carbon:copy"} className="w-4 h-4 text-[var(--brand-primary)]" />
                </button>
              </div>
            )}

            <p className={styles.successBody}>
              Thank you for reaching out. Our engineering and sales team will contact you within{" "}
              <strong className="text-[var(--text-primary)]">2 business hours</strong> with technical specifications and pricing.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2.5 mt-4 w-full justify-center">
              <button
                type="button"
                className="btn btn-secondary min-h-[44px] px-6 justify-center w-full sm:w-auto"
                onClick={handleResetForm}
              >
                <Icon icon="carbon:renew" className="w-4 h-4" />
                <span>New Inquiry</span>
              </button>
              <button
                type="button"
                className="btn btn-primary min-h-[44px] px-8 justify-center w-full sm:w-auto"
                onClick={handleClose}
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Row 1: Product/Service & Full Name */}
            <div className={styles.grid2}>
              <div className={styles.inputWrapper}>
                <div className={styles.inputIcon}>
                  <Icon icon="carbon:cube" className="w-5 h-5" />
                </div>
                <input
                  id="modalProductService"
                  required
                  className={styles.inputField}
                  value={form.productService}
                  onChange={handleChange("productService")}
                  placeholder="Product / Service Looking for"
                />
              </div>

              <div className={styles.inputWrapper}>
                <div className={styles.inputIcon}>
                  <Icon icon="carbon:user" className="w-5 h-5" />
                </div>
                <input
                  id="modalFullName"
                  required
                  className={styles.inputField}
                  value={form.fullName}
                  onChange={handleChange("fullName")}
                  placeholder="Your Name"
                />
              </div>
            </div>

            {/* Row 2: Email & Country */}
            <div className={styles.grid2}>
              <div className={styles.inputWrapper}>
                <div className={styles.inputIcon}>
                  <Icon icon="carbon:email" className="w-5 h-5" />
                </div>
                <input
                  id="modalEmail"
                  type="email"
                  required
                  className={styles.inputField}
                  value={form.email}
                  onChange={handleChange("email")}
                  placeholder="Email Address"
                />
              </div>

              <div className={styles.inputWrapper}>
                <div className={styles.inputIcon}>
                  <Icon icon="carbon:globe" className="w-5 h-5" />
                </div>
                <select
                  id="modalCountry"
                  required
                  className={styles.selectField}
                  value={form.country}
                  onChange={handleChange("country")}
                >
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Germany">Germany</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>

            {/* Row 3: Phone Prefix & Phone Number */}
            <div className={styles.phoneRow}>
              <div>
                <select
                  id="modalPhonePrefix"
                  className={styles.phonePrefixSelect}
                  value={form.phonePrefix}
                  onChange={handleChange("phonePrefix")}
                >
                  <option value="+91">+91 (IN)</option>
                  <option value="+1">+1 (US/CA)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+971">+971 (UAE)</option>
                  <option value="+966">+966 (KSA)</option>
                  <option value="+65">+65 (SG)</option>
                  <option value="+49">+49 (DE)</option>
                  <option value="+61">+61 (AU)</option>
                </select>
              </div>
              <div className={styles.inputWrapper} style={{ flex: 1 }}>
                <div className={styles.inputIcon}>
                  <Icon icon="carbon:phone" className="w-5 h-5" />
                </div>
                <input
                  id="modalPhone"
                  type="tel"
                  required
                  className={styles.inputField}
                  value={form.phone}
                  onChange={handleChange("phone")}
                  placeholder="Phone / Mobile Number"
                />
              </div>
            </div>

            {/* Row 4: Message */}
            <div className={styles.inputWrapper}>
              <div className={`${styles.inputIcon} ${styles.inputIconTextarea}`}>
                <Icon icon="carbon:chat" className="w-5 h-5" />
              </div>
              <textarea
                id="modalMessage"
                required
                className={styles.textareaField}
                rows={3}
                value={form.message}
                onChange={handleChange("message")}
                placeholder="Leave a message or specify required dimensions/volume..."
              />
            </div>

            {status === "error" && (
              <div className={styles.errorBox} role="alert">
                <Icon icon="carbon:warning-alt" className="w-5 h-5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Action Row & Privacy */}
            <div className={styles.actionRow}>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    <Icon icon="carbon:renew" className="w-5 h-5 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span className={styles.btnIconBubble}>
                      <Icon icon="carbon:send-alt" className="w-4 h-4" />
                    </span>
                  </>
                )}
              </button>

              <div className={styles.privacyNote}>
                <Icon icon="carbon:security" className="w-4 h-4 text-[var(--brand-text,#16a34a)]" />
                <span>We respect your privacy. Your details remain confidential.</span>
              </div>
            </div>
          </form>
        )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
