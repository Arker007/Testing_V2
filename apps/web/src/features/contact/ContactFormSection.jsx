import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useSite } from "../../shared/context/SiteContext";
import Card from "../../shared/components/ui/Card";
import IconBox from "../../shared/components/ui/IconBox";
import { ContactTrustedRow } from "./ContactTrustedRow";
import { useContactForm } from "./useContactForm";
import styles from "./contact.module.css";

export default function ContactFormSection() {
  const { c, co } = useSite();
  const {
    form,
    status,
    handleChange: f,
    handleSubmit,
    resetStatus,
  } = useContactForm();

  const [showMobile, setShowMobile] = useState(false);

  // Fallbacks matching the website copy specs
  const contactPerson = c("contact_person", "Mr. Harsh Maru");
  const address = c("contact_address", "Plot No. 45-B, GIDC Industrial Estate, Ankleshwar, Gujarat 393002, India");
  const phoneVal = co("phone", "+91 98986 86379");
  const emailVal = c("contact_email", "info@vishalenterprise.com");

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
              <div className={styles.formEyebrowContainer}>
                <span className={`${styles.formEyebrow} text-[var(--brand-text)]`}>We're Here to Help</span>
                <div className={`${styles.formEyebrowLine} bg-[var(--brand-primary)]`} />
              </div>
              <h2 className={`${styles.formTitle} text-[var(--text-primary)]`}>
                Quick <span className="text-[var(--brand-text)]">Enquiry</span>
              </h2>
              <p className={styles.formSubText}>
                Have a question or need a quote? Send us your details and we'll get back to you shortly.
              </p>
            </div>

            {status === "sent" ? (
              <div className={styles.successBox}>
                <Icon icon="solar:check-circle-linear" className="w-16 h-16 text-[var(--color-success)]" />
                <p className="text-[var(--text-primary)] font-bold text-xl">Inquiry Sent Successfully!</p>
                <p className="text-[var(--text-secondary)]">
                  Thank you for contacting us. Our sales team will get back to you within{" "}
                  <strong className="text-[var(--text-primary)]">2 business hours</strong> with pricing and spec sheets.
                </p>
                <button
                  type="button"
                  className={styles.successBtn}
                  onClick={resetStatus}
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.contactForm}>
                {/* Product/Service & Name */}
                <div className={styles.row2}>
                  <div className={styles.inputFieldWrapper}>
                    <div className={`${styles.inputIcon} text-[var(--brand-text)]`}>
                      <Icon icon="solar:box-minimalistic-linear" className="w-5 h-5" />
                    </div>
                    <input
                      id="productService"
                      required
                      className={`${styles.customInput} bg-[var(--bg-surface-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand-primary)]`}
                      value={form.productService || ""}
                      onChange={f("productService")}
                      placeholder="Product / Service Looking for"
                    />
                  </div>

                  <div className={styles.inputFieldWrapper}>
                    <div className={`${styles.inputIcon} text-[var(--brand-text)]`}>
                      <Icon icon="solar:user-linear" className="w-5 h-5" />
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
                      <Icon icon="solar:letter-linear" className="w-5 h-5" />
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
                      <Icon icon="solar:global-linear" className="w-5 h-5" />
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
                      <Icon icon="solar:phone-calling-linear" className="w-5 h-5" />
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
                    <Icon icon="solar:chat-round-dots-linear" className="w-5 h-5" />
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
                    <Icon icon="solar:danger-triangle-linear" className="w-5 h-5 text-[var(--color-error)] shrink-0" />
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
                        <Icon icon="solar:restart-linear" className="w-5 h-5 animate-spin" />
                        <span className="btn-text">Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span className="btn-text">Send Message</span>
                        <span className="btn-icon-bubble">
                          <Icon icon="solar:plain-2-linear" className="btn-arrow-icon w-4 h-4" />
                        </span>
                      </>
                    )}
                  </button>

                  <div className={styles.privacyNote}>
                    <Icon icon="solar:shield-check-linear" className={`${styles.privacyIcon} text-[var(--brand-text)] w-4 h-4`} />
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
              <div className={`${styles.rightUnderline} bg-[var(--brand)]`} />
            </div>

            {/* Info Cards List */}
            <div className={styles.infoCardsGrid}>
              {/* Card 1: Contact Person */}
              <Card variant="default" className="p-4 flex items-center gap-4 transition-all hover:border-[var(--brand-primary)]/40" id="info-card-person">
                <IconBox icon="solar:user-linear" variant="brand" size="md" />
                <div className={styles.infoCardContent}>
                  <span className={`${styles.infoCardLabel} text-[var(--text-muted)]`}>Contact Person</span>
                  <p className={`${styles.infoCardValue} text-[var(--text-primary)] font-bold`}>{contactPerson}</p>
                </div>
              </Card>

              {/* Card 2: Address */}
              <Card variant="default" className="p-4 flex items-center gap-4 transition-all hover:border-[var(--brand-primary)]/40" id="info-card-address">
                <IconBox icon="solar:map-point-linear" variant="brand" size="md" />
                <div className={styles.infoCardContent}>
                  <span className={`${styles.infoCardLabel} text-[var(--text-muted)]`}>Address</span>
                  <p className={`${styles.infoCardValue} text-[var(--text-primary)] font-semibold leading-snug`}>{address}</p>
                </div>
              </Card>

              {/* Card 3: Mobile */}
              <Card variant="default" className="p-4 flex items-center gap-4 transition-all hover:border-[var(--brand-primary)]/40" id="info-card-mobile">
                <IconBox icon="solar:phone-calling-linear" variant="brand" size="md" />
                <div className={styles.infoCardContent}>
                  <span className={`${styles.infoCardLabel} text-[var(--text-muted)]`}>Mobile</span>
                  {showMobile ? (
                    <p className={`${styles.infoCardValue} text-[var(--text-primary)]`}>
                      <a href={`tel:${phoneVal.replace(/\s+/g, "")}`} className="hover:underline text-[#1E622A] dark:text-[#6BBF54] font-bold">
                        {phoneVal}
                      </a>
                    </p>
                  ) : (
                    <button
                      type="button"
                      className="text-[#1E622A] dark:text-[#6BBF54] font-bold hover:underline bg-transparent border-none p-0 text-sm cursor-pointer"
                      onClick={() => setShowMobile(true)}
                    >
                      View Mobile Number
                    </button>
                  )}
                </div>
              </Card>

              {/* Card 4: Email */}
              <Card variant="default" className="p-4 flex items-center gap-4 transition-all hover:border-[var(--brand-primary)]/40" id="info-card-email">
                <IconBox icon="solar:letter-linear" variant="brand" size="md" />
                <div className={styles.infoCardContent}>
                  <span className={`${styles.infoCardLabel} text-[var(--text-muted)]`}>Email</span>
                  <p className={`${styles.infoCardValue} text-[var(--text-primary)]`}>
                    <a href={`mailto:${emailVal}`} className="hover:underline text-[#1E622A] dark:text-[#6BBF54] font-bold">
                      {emailVal}
                    </a>
                  </p>
                </div>
              </Card>
            </div>

            {/* Immediate Assistance Banner */}
            <div className={`${styles.assistanceBanner} mt-6 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[var(--brand-border)]/50 rounded-2xl`} id="assistance-banner">
              <div className="flex items-center gap-3.5">
                <IconBox icon="solar:headphones-round-linear" variant="brand" size="lg" />
                <div>
                  <span className="block font-bold text-[var(--text-primary)] text-sm sm:text-base">Need Immediate Assistance?</span>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">Our team is ready to help you with your requirements.</p>
                </div>
              </div>
              <a href={`tel:${phoneVal.replace(/\s+/g, "")}`} className="inline-flex items-center gap-2 bg-[#6BBF54] hover:bg-[#5fbf50] text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all shrink-0 no-underline">
                <Icon icon="solar:phone-calling-linear" className="w-4 h-4 text-slate-950" />
                Call Now
              </a>
            </div>
          </div>
        </div>

        {/* Embedded Map Section */}
        <Card variant="default" className="mt-10 p-6" id="embedded-map-container">
          <div className={styles.mapHeader}>
            <div className={styles.mapTitleGroup}>
              <IconBox icon="solar:map-point-linear" variant="brand" size="md" />
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
                <Icon icon="solar:routing-2-linear" className="btn-arrow-icon w-4 h-4" />
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
