import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { Button, Tooltip } from "@/shared/ui";
import styles from "../styles/contact-info-cards.module.css";

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
          <span>{label}</span>
          {copyKey && (
            <Tooltip content={copiedKey === copyKey ? "Copied!" : `Copy ${label}`}>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="!min-h-[24px] !h-6 !w-6 !p-0 ml-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                onClick={() => handleCopy(value, copyKey)}
                aria-label={`Copy ${label}`}
              >
                {copiedKey === copyKey ? (
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="inline-flex items-center justify-center text-[var(--brand-dark)]"
                  >
                    <Icon icon="carbon:checkmark" className="w-3.5 h-3.5" />
                  </motion.span>
                ) : (
                  <motion.span
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.85 }}
                    className="inline-flex items-center justify-center"
                  >
                    <Icon icon="carbon:copy" className="w-3.5 h-3.5" />
                  </motion.span>
                )}
              </Button>
            </Tooltip>
          )}
        </div>
        <div className={styles.infoVal}>{value}</div>
      </div>
    </div>
  );
});

export default ContactInfoItem;
