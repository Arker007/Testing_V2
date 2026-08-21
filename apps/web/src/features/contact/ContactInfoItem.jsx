import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import styles from "../../pages/Contact.module.css";

export const ContactInfoItem = React.memo(function ContactInfoItem({
  icon: IconComponent,
  iconName,
  label,
  value,
  copyKey,
  copiedKey,
  handleCopy,
  iconAnimation = { whileHover: { scale: 1.15 } },
}) {
  return (
    <div className={styles.infoItem}>
      <div className={styles.infoIcon}>
        <motion.div {...iconAnimation}>
          {iconName ? (
            <Icon icon={iconName} className="w-5 h-5" />
          ) : IconComponent ? (
            typeof IconComponent === "string" ? (
              <Icon icon={IconComponent} className="w-5 h-5" />
            ) : (
              <IconComponent className="w-5 h-5" />
            )
          ) : null}
        </motion.div>
      </div>
      <div style={{ flexGrow: 1 }}>
        <div className={styles.infoLabel}>
          {label}
          {copyKey && (
            <button
              type="button"
              className={styles.copyIconBtn}
              onClick={() => handleCopy(value, copyKey)}
              title={`Copy ${label}`}
            >
              {copiedKey === copyKey ? (
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <Icon icon="solar:check-read-linear" className="w-3.5 h-3.5 text-[var(--brand-dark)]" />
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
                >
                  <Icon icon="solar:copy-linear" className="w-3.5 h-3.5" />
                </motion.div>
              )}
            </button>
          )}
        </div>
        <div className={styles.infoVal}>{value}</div>
      </div>
    </div>
  );
});
