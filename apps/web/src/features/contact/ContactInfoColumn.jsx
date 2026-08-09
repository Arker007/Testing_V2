import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactInfoItem } from "./ContactInfoItem";
import styles from "../../pages/Contact.module.css";

const WhatsAppIcon = () => (
  <motion.svg
    className="w-5 h-5 fill-current shrink-0"
    viewBox="0 0 24 24"
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
  </motion.svg>
);

export default function ContactInfoColumn({
  c,
  addr,
  phone,
  email,
  waLink,
  copiedKey,
  handleCopy,
  mapSrc,
}) {
  if (c("show_contact_info", "1") === "0") return null;

  return (
    <div className={styles.infoCol}>
      <span className="section-eyebrow">Factory &amp; Sales Desk</span>
      <h2 className={styles.infoTitle}>
        {c("contact_info_title", "Reach Our Sales Team")}
      </h2>

      <p className={styles.infoIntro}>
        Our main factory and sales office is located in Ankleshwar, Gujarat. We
        process and deliver orders across India.
      </p>

      <div className={styles.infoItems}>
        <ContactInfoItem
          icon={MapPin}
          label="Factory Address"
          value={addr}
          copyKey="addr"
          copiedKey={copiedKey}
          handleCopy={handleCopy}
          iconAnimation={{
            whileHover: { y: -4, scale: 1.1 },
            transition: { type: "spring", stiffness: 400, damping: 15 },
          }}
        />

        <ContactInfoItem
          icon={Phone}
          label="Sales Phone"
          value={phone}
          copyKey="phone"
          copiedKey={copiedKey}
          handleCopy={handleCopy}
          iconAnimation={{
            whileHover: { rotate: [0, -15, 15, -15, 15, 0] },
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        />

        <ContactInfoItem
          icon={Mail}
          label="Email Address"
          value={email}
          copyKey="email"
          copiedKey={copiedKey}
          handleCopy={handleCopy}
          iconAnimation={{
            whileHover: { scale: 1.15, y: -2 },
            transition: { type: "spring", stiffness: 400, damping: 15 },
          }}
        />

        <ContactInfoItem
          icon={Clock}
          label="Working Hours"
          value="Monday – Saturday: 9:00 AM – 6:00 PM"
          iconAnimation={{
            whileHover: { rotate: 180 },
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
        />
      </div>

      <div className={styles.directBlock}>
        <div>
          <div className={styles.directHeading}>Need an Urgent Response?</div>
          <div className={styles.directSub}>
            WhatsApp our lead engineer for technical specifications and fast quote estimates.
          </div>
        </div>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.waButton} flex items-center justify-center gap-2`}
        >
          <WhatsAppIcon /> Chat on WhatsApp
        </a>
      </div>

      {mapSrc && (
        <div className="mt-6 rounded-2xl overflow-hidden border border-slate-100 shadow-sm h-64 relative">
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="GIDC Industrial Estate, Ankleshwar"
          />
        </div>
      )}
    </div>
  );
}
