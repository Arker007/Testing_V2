import React, { useState } from "react";
import { CheckCircle, AlertTriangle, Loader2, Package, User, Mail, Globe, Phone, MessageSquare, Send, ShieldCheck, Headphones, MapPin, Navigation, ExternalLink } from "lucide-react";
import { useSite } from "../../shared/context/SiteContext";
import { ContactTrustedRow } from "./ContactTrustedRow";
import { useContactForm } from "./useContactForm";
import styles from "../../pages/Contact.module.css";

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
          <div className={`${styles.enquiryCard} bg-[var(--surface-card)] border border-[var(--border-card)] shadow-[var(--shadow-lg)] text-[var(--text-primary)]`} id="enquiry-card">
            <div className={styles.formHeader}>
              <div className={styles.formEyebrowContainer}>
                <span className={`${styles.formEyebrow} text-[var(--brand-text)]`}>We're Here to Help</span>
                <div className={`${styles.formEyebrowLine} bg-[var(--brand)]`} />
              </div>
              <h2 className={`${styles.formTitle} text-[var(--heading)]`}>
                Quick <span className="text-[var(--brand-text)]">Enquiry</span>
              </h2>
              <p className={`${styles.formSubText} text-[var(--text-secondary)]`}>
                Have a question or need a quote? Send us your details and we'll get back to you shortly.
              </p>
            </div>

            {status === "sent" ? (
              <div className={styles.successBox}>
                <CheckCircle className="w-16 h-16 text-[var(--color-success)]" />
                <h3 className="text-[var(--heading)] font-bold text-xl">Inquiry Sent Successfully!</h3>
                <p className="text-[var(--text-secondary)]">
                  Thank you for contacting us. Our sales team will get back to you within{" "}
                  <strong className="text-[var(--heading)]">2 business hours</strong> with pricing and spec sheets.
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
                      <Package className="w-5 h-5" />
                    </div>
                    <input
                      id="productService"
                      required
                      className={`${styles.customInput} bg-[var(--surface-subtle)] border-[var(--border-card)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand)]`}
                      value={form.productService || ""}
                      onChange={f("productService")}
                      placeholder="Product / Service Looking for"
                    />
                  </div>

                  <div className={styles.inputFieldWrapper}>
                    <div className={`${styles.inputIcon} text-[var(--brand-text)]`}>
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      id="fullName"
                      required
                      className={`${styles.customInput} bg-[var(--surface-subtle)] border-[var(--border-card)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand)]`}
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
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      className={`${styles.customInput} bg-[var(--surface-subtle)] border-[var(--border-card)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand)]`}
                      value={form.email || ""}
                      onChange={f("email")}
                      placeholder="Email"
                    />
                  </div>

                  <div className={styles.inputFieldWrapper}>
                    <div className={`${styles.inputIcon} text-[var(--brand-text)]`}>
                      <Globe className="w-5 h-5" />
                    </div>
                    <select
                      id="country"
                      required
                      className={`${styles.customSelect} bg-[var(--surface-subtle)] border-[var(--border-card)] text-[var(--text-primary)] focus:border-[var(--brand)]`}
                      value={form.country || "India"}
                      onChange={f("country")}
                    >
                      <option value="India" className="bg-[var(--surface-card)] text-[var(--text-primary)]">India</option>
                      <option value="United States" className="bg-[var(--surface-card)] text-[var(--text-primary)]">United States</option>
                      <option value="United Kingdom" className="bg-[var(--surface-card)] text-[var(--text-primary)]">United Kingdom</option>
                      <option value="United Arab Emirates" className="bg-[var(--surface-card)] text-[var(--text-primary)]">United Arab Emirates</option>
                      <option value="Saudi Arabia" className="bg-[var(--surface-card)] text-[var(--text-primary)]">Saudi Arabia</option>
                      <option value="Singapore" className="bg-[var(--surface-card)] text-[var(--text-primary)]">Singapore</option>
                      <option value="Germany" className="bg-[var(--surface-card)] text-[var(--text-primary)]">Germany</option>
                      <option value="Canada" className="bg-[var(--surface-card)] text-[var(--text-primary)]">Canada</option>
                      <option value="Australia" className="bg-[var(--surface-card)] text-[var(--text-primary)]">Australia</option>
                    </select>
                  </div>
                </div>

                {/* Phone prefix and input */}
                <div className={styles.phoneInputRow}>
                  <div>
                    <select
                      id="phonePrefix"
                      className={`${styles.phonePrefixSelect} bg-[var(--surface-subtle)] border-[var(--border-card)] text-[var(--text-primary)] focus:border-[var(--brand)]`}
                      value={form.phonePrefix || "+91"}
                      onChange={f("phonePrefix")}
                    >
                      <option value="+91" className="bg-[var(--surface-card)] text-[var(--text-primary)]">+91</option>
                      <option value="+1" className="bg-[var(--surface-card)] text-[var(--text-primary)]">+1</option>
                      <option value="+44" className="bg-[var(--surface-card)] text-[var(--text-primary)]">+44</option>
                      <option value="+971" className="bg-[var(--surface-card)] text-[var(--text-primary)]">+971</option>
                      <option value="+966" className="bg-[var(--surface-card)] text-[var(--text-primary)]">+966</option>
                      <option value="+65" className="bg-[var(--surface-card)] text-[var(--text-primary)]">+65</option>
                      <option value="+49" className="bg-[var(--surface-card)] text-[var(--text-primary)]">+49</option>
                      <option value="+61" className="bg-[var(--surface-card)] text-[var(--text-primary)]">+61</option>
                    </select>
                  </div>
                  <div className={styles.inputFieldWrapper}>
                    <div className={`${styles.inputIcon} text-[var(--brand-text)]`}>
                      <Phone className="w-5 h-5" />
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      required
                      className={`${styles.customInput} bg-[var(--surface-subtle)] border-[var(--border-card)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand)]`}
                      value={form.phone || ""}
                      onChange={f("phone")}
                      placeholder="Phone / Mobile"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className={styles.inputFieldWrapper}>
                  <div className={`${styles.inputIcon} text-[var(--brand-text)]`} style={{ top: "1rem" }}>
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <textarea
                    id="message"
                    required
                    className={`${styles.customTextarea} bg-[var(--surface-subtle)] border-[var(--border-card)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand)]`}
                    style={{ paddingLeft: "2.75rem" }}
                    rows={4}
                    value={form.message || ""}
                    onChange={f("message")}
                    placeholder="Leave a Message for us"
                  />
                </div>

                {status === "error" && (
                  <p className={styles.errorText} role="alert">
                    <AlertTriangle className="w-5 h-5 text-[var(--color-error)] shrink-0" />
                    Sending failed. Please try again or contact us directly.
                  </p>
                )}

                <div className={styles.actionArea}>
                  <button
                    type="submit"
                    className={`${styles.submitBtn} swipe-btn magic-shimmer-btn bg-[var(--brand)] text-white font-semibold border-none`}
                    disabled={status === "sending"}
                    id="submit-message-btn"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="btn-text">Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span className="btn-text">Send Message</span>
                        <span className="btn-icon-bubble">
                          <Send className="btn-arrow-icon w-4 h-4" />
                        </span>
                      </>
                    )}
                  </button>

                  <div className={`${styles.privacyNote} text-[var(--text-muted)]`}>
                    <ShieldCheck className={`${styles.privacyIcon} text-[var(--brand-text)]`} />
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
              <div className={`${styles.infoCardAccent} bg-[var(--surface-card)] border border-[var(--border-card)] shadow-sm text-[var(--text-primary)]`} id="info-card-person">
                <div className={`${styles.infoCardIconCircle} bg-[var(--brand-light)] text-[var(--brand-text)] border border-[var(--brand-border)]`}>
                  <User className="w-5 h-5" />
                </div>
                <div className={styles.infoCardContent}>
                  <span className={`${styles.infoCardLabel} text-[var(--text-muted)]`}>Contact Person</span>
                  <p className={`${styles.infoCardValue} text-[var(--text-primary)]`}>{contactPerson}</p>
                </div>
              </div>

              {/* Card 2: Address */}
              <div className={`${styles.infoCardAccent} bg-[var(--surface-card)] border border-[var(--border-card)] shadow-sm text-[var(--text-primary)]`} id="info-card-address">
                <div className={`${styles.infoCardIconCircle} bg-[var(--brand-light)] text-[var(--brand-text)] border border-[var(--brand-border)]`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div className={styles.infoCardContent}>
                  <span className={`${styles.infoCardLabel} text-[var(--text-muted)]`}>Address</span>
                  <p className={`${styles.infoCardValue} text-[var(--text-primary)]`}>{address}</p>
                </div>
              </div>

              {/* Card 3: Mobile */}
              <div className={`${styles.infoCardAccent} bg-[var(--surface-card)] border border-[var(--border-card)] shadow-sm text-[var(--text-primary)]`} id="info-card-mobile">
                <div className={`${styles.infoCardIconCircle} bg-[var(--brand-light)] text-[var(--brand-text)] border border-[var(--brand-border)]`}>
                  <Phone className="w-5 h-5" />
                </div>
                <div className={styles.infoCardContent}>
                  <span className={`${styles.infoCardLabel} text-[var(--text-muted)]`}>Mobile</span>
                  {showMobile ? (
                    <p className={`${styles.infoCardValue} text-[var(--text-primary)]`}>
                      <a href={`tel:${phoneVal.replace(/\s+/g, "")}`} className="hover:underline text-[var(--brand-text)] font-semibold">
                        {phoneVal}
                      </a>
                    </p>
                  ) : (
                    <button
                      type="button"
                      className="text-[var(--brand-text)] font-semibold hover:underline bg-transparent border-none p-0 text-sm cursor-pointer"
                      onClick={() => setShowMobile(true)}
                    >
                      View Mobile Number
                    </button>
                  )}
                </div>
              </div>

              {/* Card 4: Email */}
              <div className={`${styles.infoCardAccent} bg-[var(--surface-card)] border border-[var(--border-card)] shadow-sm text-[var(--text-primary)]`} id="info-card-email">
                <div className={`${styles.infoCardIconCircle} bg-[var(--brand-light)] text-[var(--brand-text)] border border-[var(--brand-border)]`}>
                  <Mail className="w-5 h-5" />
                </div>
                <div className={styles.infoCardContent}>
                  <span className={`${styles.infoCardLabel} text-[var(--text-muted)]`}>Email</span>
                  <p className={`${styles.infoCardValue} text-[var(--text-primary)]`}>
                    <a href={`mailto:${emailVal}`} className="hover:underline text-[var(--brand-text)] font-semibold">
                      {emailVal}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Immediate Assistance Banner */}
            <div className={`${styles.assistanceBanner} bg-[var(--surface-subtle)] border border-[var(--border-card)] shadow-sm text-[var(--text-primary)]`} id="assistance-banner">
              <div className={styles.bannerLeft}>
                <div className={`${styles.bannerIconCircle} bg-[var(--brand-light)] text-[var(--brand-text)]`}>
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--heading)] text-sm">Need Immediate Assistance?</h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">Our team is ready to help you with your requirements.</p>
                </div>
              </div>
              <a href={`tel:${phoneVal.replace(/\s+/g, "")}`} className="inline-flex items-center gap-2 bg-[var(--brand)] text-white font-semibold text-xs px-4 py-2.5 rounded-[var(--radius-btn,8px)] shadow-sm hover:opacity-95 transition-all">
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </div>

        {/* Embedded Map Section */}
        <div className={`${styles.mapSectionWrapper} bg-[var(--surface-card)] border border-[var(--border-card)] shadow-md text-[var(--text-primary)] mt-10 p-6 rounded-[var(--radius-xl,16px)]`} id="embedded-map-container">
          <div className={styles.mapHeader}>
            <div className={styles.mapTitleGroup}>
              <div className={`${styles.mapIconCircle} bg-[var(--brand-light)] text-[var(--brand-text)] border border-[var(--brand-border)]`}>
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[var(--heading)] text-base">Find Our Manufacturing Facility</h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{address}</p>
              </div>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--navy)] text-white font-semibold text-xs px-4 py-2.5 rounded-[var(--radius-btn,8px)] shadow-sm hover:opacity-95 transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
          <div className="w-full h-96 rounded-[var(--radius-lg,12px)] overflow-hidden border border-[var(--border-card)] bg-[var(--surface-subtle)] mt-4">
            <iframe
              title="Factory Location Map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Dynamic Trusted Row below form if needed */}
        <ContactTrustedRow />
      </div>
    </section>
  );
}
