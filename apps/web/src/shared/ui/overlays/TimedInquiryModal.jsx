/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "motion/react";
import {
  Input,
  Textarea,
  FormField,
  Button,
  CustomSelect,
  Alert,
} from "@/shared/ui";
import styles from "./TimedInquiryModal.module.css";

const USAGE_THRESHOLD_MS = 60 * 1000; // 1 minute (60 seconds)
const STORAGE_DISMISSED_KEY = "timed_inquiry_modal_dismissed";
const STORAGE_START_TIME_KEY = "site_session_start_time";

export default function TimedInquiryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [copiedRef, setCopiedRef] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    phonePrefix: "+91",
    company: "",
    estimatedVolume: "",
    targetApplication: "",
    message: "",
    productService: "Industrial Pallets",
    country: "India",
  });

  const productOptions = useMemo(
    () => [
      { value: "Industrial Pallets", label: "Industrial Pallets" },
      { value: "Plastic Lumber", label: "Plastic Lumber" },
      { value: "Garden Benches", label: "Garden Benches" },
      { value: "Plastic Table", label: "Plastic Table" },
      { value: "Garden Fence", label: "Garden Fence" },
      { value: "Outdoor Furniture", label: "Outdoor Furniture" },
      { value: "Custom Moulding", label: "Custom Moulding / Other" },
    ],
    []
  );

  const handleCopyRef = () => {
    if (referenceId) {
      navigator.clipboard.writeText(referenceId);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const handleResetForm = () => {
    setForm({
      fullName: "",
      email: "",
      phone: "",
      phonePrefix: "+91",
      company: "",
      estimatedVolume: "",
      targetApplication: "",
      message: "",
      productService: "Industrial Pallets",
      country: "India",
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
    const value = e?.target ? e.target.value : e;
    setForm((prev) => ({ ...prev, [field]: value }));
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
      const composedMessage = [
        `Product/Service: ${form.productService || "Not specified"}`,
        form.estimatedVolume ? `Estimated Quantity / Volume: ${form.estimatedVolume}` : null,
        form.targetApplication ? `Target Application: ${form.targetApplication}` : null,
        form.company ? `Company / Organization: ${form.company}` : null,
        `Country: ${form.country || "India"}`,
        `Phone: ${form.phonePrefix || "+91"} ${form.phone || ""}`,
        `\nMessage / Details:\n${form.message}`,
      ]
        .filter(Boolean)
        .join("\n")
        .trim();

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          phone: `${form.phonePrefix || "+91"} ${form.phone || ""}`.trim(),
          company: form.company || form.productService || "Inquiry",
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
      setErrorMessage(err.message || "Submission failed. Please try again or reach out directly.");
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
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 360 }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={handleClose}
              className={styles.closeBtn}
              aria-label="Close inquiry dialog"
            >
              <Icon icon="carbon:close" className="w-5 h-5" />
            </button>

            {/* Header Section matching Contact Page */}
            <header className="mb-4 sm:mb-5 pr-8">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-4 h-[2px] bg-[var(--brand-primary)] inline-block shrink-0" />
                <span className="text-[11px] font-bold tracking-[0.16em] text-slate-500 dark:text-slate-400 uppercase">
                  GET A QUOTE
                </span>
              </div>
              <h2
                id="timed-inquiry-title"
                className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight mb-1.5"
              >
                Request a <span className="text-[var(--brand-primary)]">Quote</span>
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl">
                Share your requirements and our team will get back to you with the best solution and pricing for your business.
              </p>
            </header>

            {status === "sent" ? (
              <div className="text-center py-5 sm:py-6 flex flex-col items-center gap-2.5">
                <div className="w-12 h-12 rounded-full bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/20 flex items-center justify-center mx-auto mb-1 text-[var(--brand-primary)]">
                  <Icon icon="carbon:checkmark" className="w-6 h-6" />
                </div>
                <h3 className="text-[var(--text-primary)] font-bold text-lg">Quote Request Sent</h3>

                {referenceId && (
                  <div className="my-1.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)]">
                    <span className="text-xs text-[var(--text-muted)] font-mono">Ref:</span>
                    <span className="text-xs font-mono font-semibold text-[var(--text-primary)]">
                      {referenceId}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyRef}
                      className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer ml-0.5"
                      title="Copy Reference Code"
                      aria-label="Copy reference code"
                    >
                      <Icon
                        icon={copiedRef ? "carbon:checkmark" : "carbon:copy"}
                        className="w-4 h-4 text-[var(--brand-primary)]"
                      />
                    </button>
                  </div>
                )}

                <p className="text-[var(--text-secondary)] text-xs sm:text-sm max-w-md leading-relaxed">
                  Thank you. We have received your inquiry and will follow up with pricing shortly.
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleResetForm}
                  >
                    Submit Another Request
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={handleClose}
                  >
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Step 1: Select Product */}
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[var(--brand-primary)] dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] leading-tight">
                        Product / Requirement
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                        Select the product category that best matches your requirement.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-0.5 pl-0 sm:pl-8">
                    <CustomSelect
                      value={form.productService || ""}
                      onChange={(val) => handleChange("productService")(val)}
                      options={productOptions}
                      placeholder="Select product or requirement"
                    />

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-0.5">
                      {[
                        "Industrial Pallets",
                        "Plastic Lumber",
                        "Garden Benches",
                        "Custom Moulding",
                      ].map((cat) => {
                        const isSelected = form.productService === cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => handleChange("productService")(cat)}
                            className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-1 text-center ${
                              isSelected
                                ? "bg-[var(--bg-surface)] text-[var(--brand-primary)] border-2 border-[var(--brand-primary)] font-bold shadow-2xs"
                                : "bg-[var(--bg-surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-default)] hover:border-[var(--brand-primary)]/40"
                            }`}
                          >
                            <span>{cat}</span>
                            {isSelected && (
                              <Icon
                                icon="carbon:checkmark"
                                className="w-3 h-3 text-[var(--brand-primary)] shrink-0"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Step 2: Contact Details */}
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[var(--brand-primary)] dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] leading-tight">
                        Your Details
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                        Let us know how to get in touch with you.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-0.5 pl-0 sm:pl-8">
                    {/* Full Name */}
                    <FormField label="Full Name" htmlFor="modalFullName" required>
                      <Input
                        id="modalFullName"
                        required
                        type="text"
                        size="sm"
                        leftIcon="solar:user-linear"
                        placeholder="Full name"
                        value={form.fullName || ""}
                        onChange={handleChange("fullName")}
                      />
                    </FormField>

                    {/* Email Address */}
                    <FormField label="Email Address" htmlFor="modalEmail" required>
                      <Input
                        id="modalEmail"
                        required
                        type="email"
                        size="sm"
                        leftIcon="solar:letter-linear"
                        placeholder="name@company.com"
                        value={form.email || ""}
                        onChange={handleChange("email")}
                      />
                    </FormField>

                    {/* Phone Number */}
                    <FormField label="Phone Number" htmlFor="modalPhone" required>
                      <div className="flex items-center rounded-[var(--radius-input,6px)] border border-[var(--border-default)] bg-[var(--bg-surface)] focus-within:border-[var(--brand-primary)] focus-within:ring-2 focus-within:ring-[var(--brand-primary)]/20 transition-all overflow-hidden h-9 min-h-[36px]">
                        <div className="relative flex items-center h-full shrink-0 border-r border-[var(--border-default)] bg-[var(--bg-surface-secondary)]">
                          <select
                            id="modalPhonePrefix"
                            className="h-full pl-2.5 pr-5 bg-transparent appearance-none text-xs font-medium text-[var(--text-primary)] focus:outline-none cursor-pointer z-10"
                            value={form.phonePrefix || "+91"}
                            onChange={handleChange("phonePrefix")}
                            aria-label="Country phone code"
                          >
                            <option value="+91" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">+91</option>
                            <option value="+1" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">+1</option>
                            <option value="+44" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">+44</option>
                            <option value="+971" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">+971</option>
                            <option value="+966" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">+966</option>
                            <option value="+65" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">+65</option>
                            <option value="+49" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">+49</option>
                            <option value="+61" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">+61</option>
                          </select>
                          <Icon
                            icon="solar:alt-arrow-down-bold"
                            className="w-2.5 h-2.5 text-[var(--text-muted)] absolute right-1.5 pointer-events-none z-0"
                          />
                        </div>
                        <input
                          id="modalPhone"
                          required
                          type="tel"
                          className="w-full h-full px-2.5 bg-transparent text-xs font-normal text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:outline-none"
                          placeholder="Phone number"
                          value={form.phone || ""}
                          onChange={handleChange("phone")}
                        />
                      </div>
                    </FormField>

                    {/* Company Name */}
                    <FormField label="Company Name (Optional)" htmlFor="modalCompany">
                      <Input
                        id="modalCompany"
                        type="text"
                        size="sm"
                        leftIcon="solar:buildings-2-linear"
                        placeholder="Company name"
                        value={form.company || ""}
                        onChange={handleChange("company")}
                      />
                    </FormField>
                  </div>
                </div>

                {/* Step 3: Requirement Details */}
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[var(--brand-primary)] dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] leading-tight">
                        Requirement Details
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                        Help us understand your requirement better.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-0.5 pl-0 sm:pl-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      {/* Estimated Quantity */}
                      <FormField label="Estimated Quantity (Optional)" htmlFor="modalEstimatedVolume">
                        <Input
                          id="modalEstimatedVolume"
                          type="text"
                          size="sm"
                          leftIcon="solar:box-linear"
                          placeholder="e.g. 500 units"
                          value={form.estimatedVolume || ""}
                          onChange={handleChange("estimatedVolume")}
                        />
                      </FormField>

                      {/* Target Application */}
                      <FormField label="Target Application (Optional)" htmlFor="modalTargetApplication">
                        <Input
                          id="modalTargetApplication"
                          type="text"
                          size="sm"
                          leftIcon="solar:settings-minimalistic-linear"
                          placeholder="e.g. Warehouse, Outdoor"
                          value={form.targetApplication || ""}
                          onChange={handleChange("targetApplication")}
                        />
                      </FormField>
                    </div>

                    {/* Specifications or Message */}
                    <FormField label="Specifications or Message" htmlFor="modalMessage" required>
                      <div className="relative">
                        <div className="absolute top-2.5 left-2.5 pointer-events-none text-[var(--text-muted)] z-10">
                          <Icon icon="solar:pen-linear" className="w-3.5 h-3.5" />
                        </div>
                        <Textarea
                          id="modalMessage"
                          required
                          rows={2.5}
                          maxLength={1000}
                          showCount
                          size="sm"
                          className="pl-8 py-2 px-2.5 min-h-[75px] text-xs"
                          placeholder="Specifications, dimensions, or notes..."
                          value={form.message || ""}
                          onChange={handleChange("message")}
                        />
                      </div>
                    </FormField>
                  </div>
                </div>

                {status === "error" && (
                  <Alert status="danger" variant="subtle" className="text-xs">
                    {errorMessage || "Submission failed. Please try again or contact us directly."}
                  </Alert>
                )}

                {/* Bottom Action Buttons & Trust Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[var(--border-subtle)]">
                  {/* Submit CTA */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    loading={status === "sending"}
                    loadingText="Sending..."
                    className="w-full sm:w-auto shrink-0 font-bold min-h-[40px] text-xs sm:text-sm px-5 shadow-2xs"
                    icon={<Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5 ml-1 inline" />}
                    id="modal-submit-quote-btn"
                  >
                    Send Quote Request
                  </Button>

                  {/* Secure Info Badge */}
                  <div className="flex items-center gap-2.5 px-1 py-1 text-left sm:border-l sm:border-[var(--border-subtle)] sm:pl-4">
                    <div className="text-[var(--brand-primary)] dark:text-emerald-400 shrink-0">
                      <Icon icon="solar:shield-check-bold" className="w-5 h-5" />
                    </div>
                    <div className="text-[11px] leading-tight">
                      <span className="block font-bold text-[var(--text-primary)]">
                        Your information is secure.
                      </span>
                      <span className="block text-[var(--text-muted)] text-[10px] mt-0.5">
                        We respect your privacy and never share your data.
                      </span>
                    </div>
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

