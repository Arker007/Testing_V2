import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Badge from "../../shared/components/ui/Badge";
import { ContactInfoItem } from "./ContactInfoItem";
import styles from "./contact.module.css";

const WhatsAppIcon = () => (
  <motion.div
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    className="shrink-0"
  >
    <Icon icon="solar:chat-round-line-linear" className="w-5 h-5" />
  </motion.div>
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
      <Badge variant="eyebrow" className="mb-3">Factory &amp; Sales Desk</Badge>
      <h2 className={styles.infoTitle}>
        {c("contact_info_title", "Reach Our Sales Team")}
      </h2>

      <p className={styles.infoIntro}>
        Our main factory and sales office is located in Ankleshwar, Gujarat. We
        process and deliver orders across India.
      </p>

      <div className={styles.infoItems}>
        <ContactInfoItem
          iconName="solar:map-point-linear"
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
          iconName="solar:phone-calling-linear"
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
          iconName="solar:letter-linear"
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
          iconName="solar:clock-circle-linear"
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
        <div className="mt-6 rounded-lg overflow-hidden border border-slate-100 shadow-sm h-64 relative">
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
