import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useSite } from "../../../shared/context/SiteContext";
import { Card, IconBox } from "@/shared/ui";
import { ContactTrustedRow } from "./ContactTrustedRow";
import { useContactForm } from "../hooks/useContactForm";
import styles from "../styles/contact.module.css";

export default function ContactFormSection() {
  const { c, co } = useSite();
  const {
    form,
    status,
    referenceId,
    handleChange: f,
    handleSubmit,
    resetStatus,
  } = useContactForm();

  const [copiedRef, setCopiedRef] = useState(false);

  const handleCopyRef = () => {
    if (referenceId) {
      navigator.clipboard.writeText(referenceId);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  // Fallbacks matching the website copy specs
  const contactPerson = c("contact_person", "Mr. Vinod Kumar Sharma");
  const address = c("contact_address", "PLOT NO. 1706/06 , South 9 Road, G.I.D.C, Ankleshwar, Bharuch, GUJARAT, 393002");
  const phoneVal = co("phone", "+91 9898686379");
  const emailVal = c("contact_email", "Info@vishalenterpriseank.com");
  const gstinVal = co("gstin", "24AXCPS0336E1ZV");

  return (
    <section id="contact-form-anchor" className={`${styles.mainSection} bg-[var(--surface-page)] transition-colors duration-300`}>
      {/* Decorative slant backgrounds */}
      <div className={`${styles.bgSlantBright} dark:opacity-20`} />
      <div className={styles.bgSlantDark} />
      <div className={`${styles.dotsPattern} dark:opacity-10`} />

      <div className="container relative z-10">
        <div className={styles.grid}>
          {/* Left Column: Interactive Enquiry Form */}
          <div className={`${styles.enquiryCard} bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-[var(--shadow-lg)] text-[var(--text-primary)]`} id="enquiry-card">
            <div className={styles.formHeader}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs uppercase font-bold tracking-wider text-[var(--brand-primary)] px-2.5 py-0.5 rounded-[var(--radius-sm,4px)] bg-[var(--brand-soft)]">
                  Direct Factory Desk
                </span>
              </div>
              <h2 className={`${styles.formTitle} text-[var(--text-primary)]`}>
                Procurement & Inquiry Form
              </h2>
              <p className={styles.formSubText}>
                Specify your volume, dimensions, or application requirements. Our sales team responds within 2 business hours.
              </p>
            </div>

            {status === "sent" ? (
              <div className={styles.successBox}>
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mx-auto mb-2 text-emerald-500">
                  <Icon icon="carbon:checkmark-filled" className="w-10 h-10" />
                </div>
                <p className="text-[var(--text-primary)] font-bold text-xl">Inquiry Sent Successfully</p>
                
                {referenceId && (
                  <div className="my-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-btn,8px)] bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)]">
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

                <p className="text-[var(--text-secondary)]">
                  Thank you for contacting us. Our sales team will get back to you within{" "}
                  <strong className="text-[var(--text-primary)]">2 business hours</strong> with pricing and spec sheets.
                </p>
                <button
                  type="button"
                  className={styles.successBtn}
                  onClick={resetStatus}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.contactForm}>
                {/* Step 2 & 7: Visual Selectable Category Cards */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-[var(--text-secondary)]">
                      Select Category or Type Below:
                    </span>
                    {form.productService && (
                      <span className="text-[11px] font-medium text-[var(--brand-text)] flex items-center gap-1">
                        <Icon icon="carbon:checkmark-filled" className="w-3.5 h-3.5" />
                        Selected
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Industrial Pallets", icon: "carbon:cube" },
                      { label: "Plastic Lumber", icon: "carbon:layers" },
                      { label: "Garden Benches", icon: "carbon:tree" },
                      { label: "Custom Profile", icon: "carbon:settings-adjust" },
                    ].map((cat) => {
                      const isSelected = form.productService === cat.label;
                      return (
                        <button
                          key={cat.label}
                          type="button"
                          onClick={() => {
                            const syntheticEvent = { target: { value: cat.label } };
                            f("productService")(syntheticEvent);
                          }}
                          className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-[var(--radius-btn,8px)] border transition-all text-left cursor-pointer min-h-[40px] whitespace-nowrap ${
                            isSelected
                              ? "bg-[var(--brand-soft)] text-[var(--text-brand)] border-[var(--brand-primary)] shadow-sm font-bold"
                              : "bg-[var(--bg-surface-secondary)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--brand-primary)] hover:text-[var(--text-primary)]"
                          }`}
                        >
                          <Icon icon={cat.icon} className="w-4 h-4 shrink-0 text-[var(--brand-text)]" />
                          <span className="font-medium">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Product/Service & Name */}
                <div className={styles.row2}>
                  <div className={styles.inputFieldWrapper}>
                    <div className={`${styles.inputIcon} text-[var(--brand-text)]`}>
                      <Icon icon="carbon:cube" className="w-5 h-5" />
                    </div>
                    <input
                      id="productService"
                      required
                      className={`${styles.customInput} bg-[var(--bg-surface-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand-primary)]`}
                      value={form.productService || ""}
                      onChange={f("productService")}
                      placeholder="e.g. Heavy Duty Pallets, Lumber"
                    />
                  </div>

                  <div className={styles.inputFieldWrapper}>
                    <div className={`${styles.inputIcon} text-[var(--brand-text)]`}>
                      <Icon icon="carbon:user" className="w-5 h-5" />
                    </div>
                    <input
                      id="fullName"
                      required
                      className={`${styles.customInput} bg-[var(--bg-surface-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand-primary)]`}
                      value={form.fullName || ""}
                      onChange={f("fullName")}
                      placeholder="Your Name"
                    />
                  </div>
                </div>

                {/* Email & Country */}
                <div className={styles.row2}>
                  <div className={styles.inputFieldWrapper}>
                    <div className={`${styles.inputIcon} text-[var(--brand-text)]`}>
                      <Icon icon="carbon:email" className="w-5 h-5" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      className={`${styles.customInput} bg-[var(--bg-surface-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand-primary)]`}
                      value={form.email || ""}
                      onChange={f("email")}
                      placeholder="Email"
                    />
                  </div>

                  <div className={styles.inputFieldWrapper}>
                    <div className={`${styles.inputIcon} text-[var(--brand-text)]`}>
                      <Icon icon="carbon:globe" className="w-5 h-5" />
                    </div>
                    <select
                      id="country"
                      required
                      className={`${styles.customSelect} bg-[var(--bg-surface-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] focus:border-[var(--brand-primary)]`}
                      value={form.country || "India"}
                      onChange={f("country")}
                    >
                      <option value="India" className="bg-[var(--bg-surface-secondary)] text-[var(--text-primary)]">India</option>
                      <option value="United States" className="bg-[var(--bg-surface-secondary)] text-[var(--text-primary)]">United States</option>
                      <option value="United Kingdom" className="bg-[var(--bg-surface-secondary)] text-[var(--text-primary)]">United Kingdom</option>
                      <option value="United Arab Emirates" className="bg-[var(--bg-surface-secondary)] text-[var(--text-primary)]">United Arab Emirates</option>
                      <option value="Saudi Arabia" className="bg-[var(--bg-surface-secondary)] text-[var(--text-primary)]">Saudi Arabia</option>
                      <option value="Singapore" className="bg-[var(--bg-surface-secondary)] text-[var(--text-primary)]">Singapore</option>
                      <option value="Germany" className="bg-[var(--bg-surface-secondary)] text-[var(--text-primary)]">Germany</option>
                      <option value="Canada" className="bg-[var(--bg-surface-secondary)] text-[var(--text-primary)]">Canada</option>
                      <option value="Australia" className="bg-[var(--bg-surface-secondary)] text-[var(--text-primary)]">Australia</option>
                    </select>
                  </div>
                </div>

                {/* Phone prefix and input */}
                <div className={styles.phoneInputRow}>
                  <div>
                    <select
                      id="phonePrefix"
                      className={`${styles.phonePrefixSelect} bg-[var(--bg-surface-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] focus:border-[var(--brand-primary)]`}
                      value={form.phonePrefix || "+91"}
                      onChange={f("phonePrefix")}
                    >
                      <option value="+91" className="bg-[var(--bg-surface-secondary)] text-[var(--text-primary)]">+91</option>
                      <option value="+1" className="bg-[var(--bg-surface-secondary)] text-[var(--text-primary)]">+1</option>
                      <option value="+44" className="bg-[var(--bg-surface-secondary)] text-[var(--text-primary)]">+44</option>
                      <option value="+971" className="bg-[var(--bg-surface-secondary)] text-[var(--text-primary)]">+971</option>
                      <option value="+966" className="bg-[var(--bg-surface-secondary)] text-[var(--text-primary)]">+966</option>
                      <option value="+65" className="bg-[var(--bg-surface-secondary)] text-[var(--text-primary)]">+65</option>
                      <option value="+49" className="bg-[var(--bg-surface-secondary)] text-[var(--text-primary)]">+49</option>
                      <option value="+61" className="bg-[var(--bg-surface-secondary)] text-[var(--text-primary)]">+61</option>
                    </select>
                  </div>
                  <div className={styles.inputFieldWrapper}>
                    <div className={`${styles.inputIcon} text-[var(--brand-text)]`}>
                      <Icon icon="carbon:phone" className="w-5 h-5" />
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      required
                      className={`${styles.customInput} bg-[var(--bg-surface-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand-primary)]`}
                      value={form.phone || ""}
                      onChange={f("phone")}
                      placeholder="Phone / Mobile"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className={styles.inputFieldWrapper}>
                  <div className={`${styles.inputIcon} text-[var(--brand-text)]`} style={{ top: "1rem" }}>
                    <Icon icon="carbon:chat" className="w-5 h-5" />
                  </div>
                  <textarea
                    id="message"
                    required
                    className={`${styles.customTextarea} bg-[var(--bg-surface-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand-primary)]`}
                    style={{ paddingLeft: "2.75rem" }}
                    rows={4}
                    value={form.message || ""}
                    onChange={f("message")}
                    placeholder="Leave a Message for us"
                  />
                </div>

                {status === "error" && (
                  <p className={styles.errorText} role="alert">
                    <Icon icon="carbon:warning-alt" className="w-5 h-5 text-[var(--color-error)] shrink-0" />
                    Sending failed. Please try again or contact us directly.
                  </p>
                )}

                <div className={styles.actionArea}>
                  <button
                    type="submit"
                    className="swipe-btn magic-shimmer-btn"
                    disabled={status === "sending"}
                    id="submit-message-btn"
                  >
                    {status === "sending" ? (
                      <>
                        <Icon icon="carbon:renew" className="w-5 h-5 animate-spin" />
                        <span className="btn-text">Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span className="btn-text">Send Message</span>
                        <span className="btn-icon-bubble">
                          <Icon icon="carbon:send-alt" className="btn-arrow-icon w-4 h-4" />
                        </span>
                      </>
                    )}
                  </button>

                  <div className={styles.privacyNote}>
                    <Icon icon="carbon:security" className={`${styles.privacyIcon} text-[var(--brand-text)] w-4 h-4`} />
                    <span>We respect your privacy. Your information is safe with us.</span>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Contact Details & Info Cards */}
          <div id="contact-details-column">
            <div className={styles.rightTitleSection}>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-text)]">Get in Touch</span>
              <h2 className={`${styles.rightTitle} text-[var(--heading)]`}>
                Contact <span className="text-[var(--brand-text)]">Vishal</span> Enterprise
              </h2>
            </div>

            {/* Info Cards List */}
            <div className={styles.infoCardsGrid}>
              {/* Card 1: Contact Person */}
              <Card variant="default" className="p-4 flex items-center gap-4 transition-all hover:border-[var(--brand-primary)]/40" id="info-card-person">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 flex items-center justify-center shrink-0">
                  <Icon icon="carbon:user" className="w-5 h-5" />
                </div>
                <div className={styles.infoCardContent}>
                  <span className={`${styles.infoCardLabel} text-[var(--text-muted)]`}>Sales & Technical Contact</span>
                  <p className={`${styles.infoCardValue} text-[var(--text-primary)] font-bold`}>{contactPerson}</p>
                </div>
              </Card>

              {/* Card 2: Address */}
              <Card variant="default" className="p-4 flex items-center gap-4 transition-all hover:border-[var(--brand-primary)]/40" id="info-card-address">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 flex items-center justify-center shrink-0">
                  <Icon icon="carbon:location" className="w-5 h-5" />
                </div>
                <div className={styles.infoCardContent}>
                  <span className={`${styles.infoCardLabel} text-[var(--text-muted)]`}>Manufacturing Plant & Works</span>
                  <p className={`${styles.infoCardValue} text-[var(--text-primary)] font-semibold leading-snug tabular-nums`}>{address}</p>
                </div>
              </Card>

              {/* Card 3: Mobile */}
              <Card variant="default" className="p-4 flex items-center gap-4 transition-all hover:border-[var(--brand-primary)]/40" id="info-card-mobile">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 flex items-center justify-center shrink-0">
                  <Icon icon="carbon:phone" className="w-5 h-5" />
                </div>
                <div className={styles.infoCardContent}>
                  <span className={`${styles.infoCardLabel} text-[var(--text-muted)]`}>Direct Sales Line</span>
                  <p className={`${styles.infoCardValue} text-[var(--text-primary)] font-semibold tabular-nums`}>
                    <a href={`tel:${phoneVal.replace(/\s+/g, "")}`} className="hover:underline text-[var(--text-primary)] hover:text-[var(--brand-primary)] transition-colors">
                      {phoneVal}
                    </a>
                  </p>
                </div>
              </Card>

              {/* Card 4: Email */}
              <Card variant="default" className="p-4 flex items-center gap-4 transition-all hover:border-[var(--brand-primary)]/40" id="info-card-email">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 flex items-center justify-center shrink-0">
                  <Icon icon="carbon:email" className="w-5 h-5" />
                </div>
                <div className={styles.infoCardContent}>
                  <span className={`${styles.infoCardLabel} text-[var(--text-muted)]`}>Official Procurement Email</span>
                  <p className={`${styles.infoCardValue} text-[var(--text-primary)]`}>
                    <a href={`mailto:${emailVal}`} className="hover:underline text-[var(--text-brand)] font-bold">
                      {emailVal}
                    </a>
                  </p>
                </div>
              </Card>

              {/* Card 5: GSTIN */}
              <Card variant="default" className="p-4 flex items-center gap-4 transition-all hover:border-[var(--brand-primary)]/40" id="info-card-gstin">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 flex items-center justify-center shrink-0">
                  <Icon icon="carbon:certificate" className="w-5 h-5" />
                </div>
                <div className={styles.infoCardContent}>
                  <span className={`${styles.infoCardLabel} text-[var(--text-muted)]`}>Goods & Services Tax (GSTIN)</span>
                  <p className={`${styles.infoCardValue} text-[var(--text-primary)] font-bold tracking-wider tabular-nums`}>
                    {gstinVal}
                  </p>
                </div>
              </Card>
            </div>

            {/* Immediate Assistance Banner */}
            <div className="mt-6 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--brand-primary)]/40 rounded-[var(--radius-card,12px)] shadow-[var(--shadow-sm)]" id="assistance-banner">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 flex items-center justify-center shrink-0">
                  <Icon icon="carbon:headset" className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-[var(--text-primary)] text-sm sm:text-base">Need Immediate Assistance?</span>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">Our team is ready to help you with your requirements.</p>
                </div>
              </div>
              <a href={`tel:${phoneVal.replace(/\s+/g, "")}`} className="inline-flex items-center gap-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white font-bold text-xs px-4 py-2.5 rounded-[var(--radius-btn,8px)] shadow-xs transition-all shrink-0 no-underline">
                <Icon icon="carbon:phone" className="w-4 h-4 text-white" />
                Call Now
              </a>
            </div>
          </div>
        </div>

        {/* Embedded Map Section */}
        <Card variant="default" className="mt-10 p-6" id="embedded-map-container">
          <div className={styles.mapHeader}>
            <div className={styles.mapTitleGroup}>
              <IconBox icon="carbon:location" variant="brand" size="md" />
              <div>
                <span className="block font-bold text-[var(--text-primary)] text-base">Find Our Manufacturing Facility</span>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{address}</p>
              </div>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="swipe-btn magic-shimmer-btn"
              style={{ fontSize: "0.85rem", padding: "0.6rem 1.5rem" }}
            >
              <span className="btn-text">Get Directions</span>
              <span className="btn-icon-bubble">
                <Icon icon="carbon:direction-straight" className="btn-arrow-icon w-4 h-4" />
              </span>
            </a>
          </div>
          <div className="w-full h-96 rounded-[var(--radius-lg,12px)] overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface-secondary)] mt-4">
            <iframe
              title="Factory Location Map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </Card>

        {/* Dynamic Trusted Row below form if needed */}
        <ContactTrustedRow />
      </div>
    </section>
  );
}
