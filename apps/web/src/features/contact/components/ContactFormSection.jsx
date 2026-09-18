import React, { useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import { useSite } from "../../../shared/context/SiteContext";
import {
  Card,
  IconBox,
  Input,
  Textarea,
  FormField,
  Button,
  CustomSelect,
  Badge,
  Alert
} from "@/shared/ui";
import { ContactTrustedRow } from "./ContactTrustedRow";
import { useContactForm } from "../hooks/useContactForm";
import styles from "../styles/quote-form.module.css";
import mapStyles from "../styles/contact-map.module.css";

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
  const [copiedCardKey, setCopiedCardKey] = useState(null);

  const handleCopyCardText = (text, key) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopiedCardKey(key);
      setTimeout(() => setCopiedCardKey(null), 2000);
    }
  };

  const productOptions = useMemo(() => [
    { value: "Industrial Pallets", label: "Industrial Pallets" },
    { value: "Plastic Lumber", label: "Plastic Lumber" },
    { value: "Garden Benches", label: "Garden Benches" },
    { value: "Plastic Table", label: "Plastic Table" },
    { value: "Garden Fence", label: "Garden Fence" },
    { value: "Outdoor Furniture", label: "Outdoor Furniture" },
    { value: "Custom Moulding", label: "Custom Moulding / Other" },
  ], []);

  const handleCopyRef = () => {
    if (referenceId) {
      navigator.clipboard.writeText(referenceId);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  // Fallbacks matching the website copy specs
  const contactPerson = c("contact_person", "Mr. Vinod Kumar Sharma");
  const rawAddress = c("contact_address", "Plot No. 1706/06, South 9 Road, G.I.D.C., Ankleshwar, Bharuch, Gujarat, 393002");
  const address = useMemo(() => {
    if (!rawAddress) return "";
    return rawAddress.replace(/\s+,/g, ",").replace(/PLOT NO\./gi, "Plot No.");
  }, [rawAddress]);

  const phoneVal = co("phone", "+91 9898686379");
  const emailVal = c("contact_email", "Info@vishalenterpriseank.com");
  const gstinVal = co("gstin", "24AXCPS0336E1ZV");

  return (
    <section id="contact-form-anchor" className={`${styles.mainSection} bg-[var(--surface-page)] transition-colors duration-300`}>
      {/* Decorative slant backgrounds */}
      <div className={`${styles.bgSlantBright} dark:opacity-20`} />
      <div className={styles.bgSlantDark} />
      <div className={`${styles.dotsPattern} dark:opacity-10`} />

      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* BEGIN: RequestAQuoteForm */}
          <Card
            variant="default"
            className="lg:col-span-7 p-5 sm:p-6 shadow-sm border border-[var(--border-subtle)] transition-all duration-200 hover:border-[var(--border-default)]"
            data-purpose="quote-request-card"
            id="enquiry-card"
          >
            {/* Header Section */}
            <header className="mb-4 sm:mb-5">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-4 h-[2px] bg-[var(--brand-primary)] inline-block shrink-0" />
                <span className="text-[11px] font-bold tracking-[0.16em] text-slate-500 dark:text-slate-400 uppercase">GET A QUOTE</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight mb-1.5">
                Request a <span className="text-[var(--brand-primary)]">Quote</span>
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                Share your requirements and our team will get back to you with the best solution and pricing for your business.
              </p>
            </header>

            {status === "sent" ? (
              <div className={styles.successBox}>
                <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/20 flex items-center justify-center mx-auto mb-2.5 text-[var(--brand-primary)]">
                  <Icon icon="carbon:checkmark" className="w-5 h-5" />
                </div>
                <h3 className="text-[var(--text-primary)] font-bold text-base mb-1">Quote Request Sent</h3>
                
                {referenceId && (
                  <div className="my-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)]">
                    <span className="text-[11px] text-[var(--text-muted)] font-mono">Ref:</span>
                    <span className="text-[11px] font-mono font-semibold text-[var(--text-primary)]">
                      {referenceId}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyRef}
                      className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer ml-0.5"
                      title="Copy Reference Code"
                      aria-label="Copy reference code"
                    >
                      <Icon icon={copiedRef ? "carbon:checkmark" : "carbon:copy"} className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                    </button>
                  </div>
                )}

                <p className="text-[var(--text-secondary)] text-xs mb-3.5">
                  Thank you. We have received your inquiry and will follow up with pricing shortly.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={resetStatus}
                >
                  Submit Another Request
                </Button>
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
                      <h2 className={`${styles.stepTitle} !text-sm sm:!text-base font-bold text-[var(--text-primary)] leading-tight`}>
                        Product / Requirement
                      </h2>
                      <p className={`${styles.stepSubTitle} !text-xs text-[var(--text-secondary)] mt-0.5`}>
                        Select the product category that best matches your requirement.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2.5 pt-0.5 pl-0 sm:pl-9">
                    <CustomSelect
                      value={form.productService || ""}
                      onChange={(val) => f("productService")({ target: { value: val } })}
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
                            onClick={() => f("productService")({ target: { value: cat } })}
                            className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-1 text-center ${
                              isSelected
                                ? "bg-[var(--bg-surface)] text-[var(--brand-primary)] border-2 border-[var(--brand-primary)] font-bold shadow-2xs"
                                : "bg-[var(--bg-surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-default)] hover:border-[var(--brand-primary)]/40"
                            }`}
                          >
                            <span>{cat}</span>
                            {isSelected && (
                              <Icon icon="carbon:checkmark" className="w-3 h-3 text-[var(--brand-primary)] shrink-0" />
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
                      <h2 className={`${styles.stepTitle} !text-sm sm:!text-base font-bold text-[var(--text-primary)] leading-tight`}>
                        Your Details
                      </h2>
                      <p className={`${styles.stepSubTitle} !text-xs text-[var(--text-secondary)] mt-0.5`}>
                        Let us know how to get in touch with you.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-0.5 pl-0 sm:pl-9">
                    {/* Full Name */}
                    <FormField label="Full Name" htmlFor="fullName" required>
                      <Input
                        id="fullName"
                        required
                        type="text"
                        size="sm"
                        leftIcon="carbon:user"
                        placeholder="Full name"
                        value={form.fullName || ""}
                        onChange={f("fullName")}
                      />
                    </FormField>

                    {/* Email Address */}
                    <FormField label="Email Address" htmlFor="email" required>
                      <Input
                        id="email"
                        required
                        type="email"
                        size="sm"
                        leftIcon="carbon:email"
                        placeholder="name@company.com"
                        value={form.email || ""}
                        onChange={f("email")}
                      />
                    </FormField>

                    {/* Phone Number */}
                    <FormField label="Phone Number" htmlFor="phone" required>
                      <div className="flex items-center rounded-[var(--radius-input,6px)] border border-[var(--border-default)] bg-[var(--bg-surface)] focus-within:border-[var(--brand-primary)] focus-within:ring-2 focus-within:ring-[var(--brand-primary)]/20 transition-all overflow-hidden h-9 min-h-[36px]">
                        <div className="relative flex items-center h-full shrink-0 border-r border-[var(--border-default)] bg-[var(--bg-surface-secondary)]">
                          <select
                            id="phonePrefix"
                            className="h-full pl-2.5 pr-5 bg-transparent appearance-none text-xs font-medium text-[var(--text-primary)] focus:outline-none cursor-pointer z-10"
                            value={form.phonePrefix || "+91"}
                            onChange={f("phonePrefix")}
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
                          <Icon icon="carbon:chevron-down" className="w-2.5 h-2.5 text-[var(--text-muted)] absolute right-1.5 pointer-events-none z-0" />
                        </div>
                        <input
                          id="phone"
                          required
                          type="tel"
                          className="w-full h-full px-2.5 bg-transparent text-xs font-normal text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:outline-none"
                          placeholder="Phone number"
                          value={form.phone || ""}
                          onChange={f("phone")}
                        />
                      </div>
                    </FormField>

                    {/* Company Name */}
                    <FormField label="Company Name (Optional)" htmlFor="company">
                      <Input
                        id="company"
                        type="text"
                        size="sm"
                        leftIcon="carbon:enterprise"
                        placeholder="Company name"
                        value={form.company || ""}
                        onChange={f("company")}
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
                      <h2 className={`${styles.stepTitle} !text-sm sm:!text-base font-bold text-[var(--text-primary)] leading-tight`}>
                        Requirement Details
                      </h2>
                      <p className={`${styles.stepSubTitle} !text-xs text-[var(--text-secondary)] mt-0.5`}>
                        Help us understand your requirement better.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2.5 pt-0.5 pl-0 sm:pl-9">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      {/* Estimated Quantity */}
                      <FormField label="Estimated Quantity (Optional)" htmlFor="estimatedVolume">
                        <Input
                          id="estimatedVolume"
                          type="text"
                          size="sm"
                          leftIcon="carbon:box"
                          placeholder="e.g. 500 units"
                          value={form.estimatedVolume || ""}
                          onChange={f("estimatedVolume")}
                        />
                      </FormField>

                      {/* Target Application */}
                      <FormField label="Target Application (Optional)" htmlFor="targetApplication">
                        <Input
                          id="targetApplication"
                          type="text"
                          size="sm"
                          leftIcon="carbon:settings"
                          placeholder="e.g. Warehouse, Outdoor"
                          value={form.targetApplication || ""}
                          onChange={f("targetApplication")}
                        />
                      </FormField>
                    </div>

                    {/* Specifications or Message */}
                    <FormField label="Specifications or Message" htmlFor="message" required>
                      <div className="relative">
                        <div className="absolute top-2.5 left-2.5 pointer-events-none text-[var(--text-muted)] z-10">
                          <Icon icon="carbon:edit" className="w-3.5 h-3.5" />
                        </div>
                        <Textarea
                          id="message"
                          required
                          rows={2.5}
                          maxLength={1000}
                          showCount
                          size="sm"
                          className="pl-8 py-2 px-2.5 min-h-[75px] text-xs"
                          placeholder="Specifications, dimensions, or notes..."
                          value={form.message || ""}
                          onChange={f("message")}
                        />
                      </div>
                    </FormField>
                  </div>
                </div>

                {status === "error" && (
                  <Alert status="danger" variant="subtle" className="text-xs">
                    Submission failed. Please try again or contact us directly.
                  </Alert>
                )}

                {/* Bottom Action Buttons & Trust Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2.5 border-t border-[var(--border-subtle)]">
                  {/* Submit CTA */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    loading={status === "sending" || status === "loading"}
                    loadingText="Sending..."
                    className="w-full sm:w-auto shrink-0 font-bold min-h-[40px] text-xs sm:text-sm px-5 shadow-2xs"
                    icon={<Icon icon="carbon:arrow-right" className="w-3.5 h-3.5 ml-1 inline" />}
                    id="submit-message-btn"
                  >
                    Send Quote Request
                  </Button>

                  {/* Secure Info Badge - Clean Unboxed Layout */}
                  <div className="flex items-center gap-2.5 px-1 py-1 text-left sm:border-l sm:border-[var(--border-subtle)] sm:pl-4">
                    <div className="text-[var(--brand-primary)] dark:text-emerald-400 shrink-0">
                      <Icon icon="carbon:security" className="w-5 h-5" />
                    </div>
                    <div className="text-[11px] leading-tight">
                      <span className="block font-bold text-[var(--text-primary)]">Your information is secure.</span>
                      <span className="block text-[var(--text-muted)] text-[10px] mt-0.5">We respect your privacy and never share your data.</span>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </Card>
          {/* END: RequestAQuoteForm */}

          {/* BEGIN: ContactVishalEnterprise */}
          <section
            className="lg:col-span-5 flex flex-col justify-between h-full relative"
            data-purpose="contact-info-panel"
            id="contact-details-column"
          >
            {/* Top Container */}
            <div>
              {/* Header Info */}
              <div className="mb-4 sm:mb-5">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="w-5 h-[2px] bg-[var(--brand-primary)] inline-block shrink-0" />
                  <span className="text-[11px] font-bold tracking-[0.18em] text-slate-600 dark:text-slate-300 uppercase">GET IN TOUCH</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] tracking-tight leading-snug">
                  Contact Information
                </h2>
                <p className="text-[var(--text-secondary)] text-xs sm:text-sm mt-1 leading-relaxed">
                  Direct channels for sales inquiries, technical support, and plant visits. We&apos;re here to help.
                </p>
              </div>

              {/* Contact Cards Stack */}
              <div className="space-y-3">
                {/* Card 1: Sales Contact */}
                <div
                  className="bg-[var(--bg-surface)] p-4 sm:p-4.5 border border-[var(--border-subtle)] shadow-xs flex items-start gap-3.5 rounded-xl transition-all duration-200 hover:border-[var(--border-default)] hover:shadow-sm"
                  id="info-card-person"
                >
                  <div className="w-10 h-10 rounded-[8px] bg-[#eef8ef] dark:bg-emerald-950/40 text-[#15803d] dark:text-emerald-400 border border-[#bbf7d0] dark:border-emerald-800/60 flex items-center justify-center shrink-0">
                    <Icon icon="carbon:user" className="w-5 h-5" />
                  </div>
                  <div className="pt-0.5 flex-1 min-w-0">
                    <span className="block text-[11px] !text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Sales & Technical Contact</span>
                    <h3 className="text-sm sm:text-[15px] !text-sm font-extrabold text-[var(--text-primary)] mt-0.5">{contactPerson}</h3>
                    <p className="text-xs text-[var(--text-secondary)] dark:text-slate-300 mt-0.5 leading-relaxed">Product guidance, technical support, and quotations.</p>
                  </div>
                </div>

                {/* Card 2: Plant & Works */}
                <div
                  className="bg-[var(--bg-surface)] p-4 sm:p-4.5 border border-[var(--border-subtle)] shadow-xs flex items-start gap-3.5 rounded-xl transition-all duration-200 hover:border-[var(--border-default)] hover:shadow-sm group"
                  id="info-card-address"
                >
                  <div className="w-10 h-10 rounded-[8px] bg-[#eef8ef] dark:bg-emerald-950/40 text-[#15803d] dark:text-emerald-400 border border-[#bbf7d0] dark:border-emerald-800/60 flex items-center justify-center shrink-0">
                    <Icon icon="carbon:location" className="w-5 h-5" />
                  </div>
                  <div className="pt-0.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="block text-[11px] !text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Manufacturing Plant & Works</span>
                      <button
                        type="button"
                        onClick={() => handleCopyCardText(address, "address")}
                        className="inline-flex items-center gap-1 text-[10px] font-semibold text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors py-0.5 px-1.5 rounded bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] cursor-pointer shrink-0"
                        title="Copy full address"
                      >
                        {copiedCardKey === "address" ? (
                          <>
                            <Icon icon="carbon:checkmark-filled" className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600 font-semibold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Icon icon="carbon:copy" className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <h3 className="text-sm sm:text-[15px] !text-sm font-extrabold text-[var(--text-primary)] leading-snug mt-0.5">
                      {address}
                    </h3>
                  </div>
                </div>

                {/* Card 3: Direct Sales Line */}
                <div
                  className="bg-[var(--bg-surface)] p-4 sm:p-4.5 border border-[var(--border-subtle)] shadow-xs flex items-start gap-3.5 rounded-xl transition-all duration-200 hover:border-[var(--border-default)] hover:shadow-sm"
                  id="info-card-mobile"
                >
                  <div className="w-10 h-10 rounded-[8px] bg-[#eef8ef] dark:bg-emerald-950/40 text-[#15803d] dark:text-emerald-400 border border-[#bbf7d0] dark:border-emerald-800/60 flex items-center justify-center shrink-0">
                    <Icon icon="carbon:phone" className="w-5 h-5" />
                  </div>
                  <div className="pt-0.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="block text-[11px] !text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Direct Sales Line</span>
                      <button
                        type="button"
                        onClick={() => handleCopyCardText(phoneVal, "phone")}
                        className="inline-flex items-center gap-1 text-[10px] font-semibold text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors py-0.5 px-1.5 rounded bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] cursor-pointer shrink-0"
                        title="Copy phone number"
                      >
                        {copiedCardKey === "phone" ? (
                          <>
                            <Icon icon="carbon:checkmark-filled" className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600 font-semibold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Icon icon="carbon:copy" className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <h3 className="!text-sm sm:!text-[15px] !font-extrabold text-[var(--text-primary)]">
                        <a
                          className="hover:text-[var(--brand-primary)] transition-colors inline-flex items-center gap-1.5"
                          href={`tel:${phoneVal.replace(/\s+/g, "")}`}
                        >
                          <span>{phoneVal}</span>
                          <Icon icon="carbon:chevron-right" className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                        </a>
                      </h3>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] font-medium mt-0.5">Mon – Sat, 9:00 AM – 6:00 PM</p>
                  </div>
                </div>

                {/* Card 4: Official Email */}
                <div
                  className="bg-[var(--bg-surface)] p-4 sm:p-4.5 border border-[var(--border-subtle)] shadow-xs flex items-start gap-3.5 rounded-xl transition-all duration-200 hover:border-[var(--border-default)] hover:shadow-sm"
                  id="info-card-email"
                >
                  <div className="w-10 h-10 rounded-[8px] bg-[#eef8ef] dark:bg-emerald-950/40 text-[#15803d] dark:text-emerald-400 border border-[#bbf7d0] dark:border-emerald-800/60 flex items-center justify-center shrink-0">
                    <Icon icon="carbon:email" className="w-5 h-5" />
                  </div>
                  <div className="pt-0.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="block text-[11px] !text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Official Procurement Email</span>
                      <button
                        type="button"
                        onClick={() => handleCopyCardText(emailVal, "email")}
                        className="inline-flex items-center gap-1 text-[10px] font-semibold text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors py-0.5 px-1.5 rounded bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] cursor-pointer shrink-0"
                        title="Copy email address"
                      >
                        {copiedCardKey === "email" ? (
                          <>
                            <Icon icon="carbon:checkmark-filled" className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600 font-semibold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Icon icon="carbon:copy" className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <h3 className="!text-sm sm:!text-[15px] !font-extrabold text-[var(--text-primary)] mt-0.5">
                      <a
                        className="hover:text-[var(--brand-primary)] transition-colors inline-flex items-center gap-1.5 break-all"
                        href={`mailto:${emailVal}`}
                      >
                        <span>{emailVal}</span>
                        <Icon icon="carbon:chevron-right" className="w-3.5 h-3.5 text-[var(--brand-primary)] shrink-0" />
                      </a>
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] dark:text-slate-300 mt-0.5 leading-relaxed">For purchase orders, RFQs, and bulk inquiries.</p>
                  </div>
                </div>

                {/* Card 5: GSTIN Details */}
                <div
                  className="bg-[var(--bg-surface)] p-4 sm:p-4.5 border border-[var(--border-subtle)] shadow-xs flex items-start gap-3.5 rounded-xl transition-all duration-200 hover:border-[var(--border-default)] hover:shadow-sm"
                  id="info-card-gstin"
                >
                  <div className="w-10 h-10 rounded-[8px] bg-[#eef8ef] dark:bg-emerald-950/40 text-[#15803d] dark:text-emerald-400 border border-[#bbf7d0] dark:border-emerald-800/60 flex items-center justify-center shrink-0">
                    <Icon icon="carbon:document" className="w-5 h-5" />
                  </div>
                  <div className="pt-0.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="block text-[11px] !text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Goods & Services Tax (GSTIN)</span>
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-300 dark:border-emerald-700">
                          <Icon icon="carbon:checkmark-filled" className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                          <span>Verified</span>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyCardText(gstinVal, "gstin")}
                        className="inline-flex items-center gap-1 text-[10px] font-semibold text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors py-0.5 px-1.5 rounded bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] cursor-pointer shrink-0"
                        title="Copy GSTIN"
                      >
                        {copiedCardKey === "gstin" ? (
                          <>
                            <Icon icon="carbon:checkmark-filled" className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600 font-semibold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Icon icon="carbon:copy" className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <h3 className="!text-sm sm:!text-[15px] !font-extrabold text-[var(--text-primary)] tracking-wider mt-0.5 font-mono">{gstinVal}</h3>
                    <p className="text-xs text-[var(--text-secondary)] dark:text-slate-300 mt-0.5 leading-relaxed">Official tax registration for billing and compliance.</p>
                  </div>
                </div>

                {/* Card 6: Immediate Assistance CTA */}
                <div
                  className="bg-[var(--bg-surface)] p-4 sm:p-5 border border-[var(--border-subtle)] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl transition-all duration-200 hover:border-[var(--border-default)] hover:shadow-sm"
                  id="assistance-banner"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-[8px] bg-[#eef8ef] dark:bg-emerald-950/40 text-[#15803d] dark:text-emerald-400 border border-[#bbf7d0] dark:border-emerald-800/60 flex items-center justify-center shrink-0">
                      <Icon icon="carbon:headphones" className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-[var(--text-primary)]">Need Immediate Assistance?</h4>
                      <p className="text-xs text-[var(--text-secondary)] dark:text-slate-300 mt-0.5">Our technical team is ready to assist your bulk order.</p>
                    </div>
                  </div>
                  <a
                    className="px-4 py-2 bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-hover)] text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap rounded-lg no-underline cursor-pointer shadow-xs"
                    href={`tel:${phoneVal.replace(/\s+/g, "")}`}
                  >
                    <Icon icon="carbon:phone-incoming" className="w-3.5 h-3.5 text-white" />
                    <span>Call Sales Now</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* END: ContactVishalEnterprise */}
        </div>

        {/* Embedded Map Section */}
        <Card variant="default" className="mt-10 p-6 border border-[var(--border-subtle)] rounded-xl shadow-sm" id="embedded-map-container">
          <div className={mapStyles.mapHeader}>
            <div className={mapStyles.mapTitleGroup}>
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
