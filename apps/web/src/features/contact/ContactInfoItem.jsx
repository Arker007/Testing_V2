import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import styles from "../../pages/Contact.module.css";

export const ContactInfoItem = React.memo(function ContactInfoItem({
  icon: IconComponent,
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
          {IconComponent && <IconComponent className="w-5 h-5" />}
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
                  <Check className="w-3.5 h-3.5 text-[#7db018]" />
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
                >
                  <Copy className="w-3.5 h-3.5" />
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
