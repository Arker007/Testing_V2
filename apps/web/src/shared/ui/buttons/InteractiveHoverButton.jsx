import React from "react";
import { Icon } from "@iconify/react";
import styles from "./interactive-hover-button.module.css";

export function InteractiveHoverButton({
  children,
  text,
  className = "",
  onClick,
  disabled = false,
  type = "button",
  ...props
}) {
  const labelText = children || text;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${styles.interactiveHoverButton} ${className}`.trim()}
      {...props}
    >
      <span className={styles.dot} />
      <span className={styles.text}>{labelText}</span>
      <span className={styles.arrowWrap}>
        <Icon icon="hugeicons:arrow-right-01" className={`${styles.arrow} w-4 h-4`} />
      </span>
    </button>
  );
}

export default InteractiveHoverButton;
