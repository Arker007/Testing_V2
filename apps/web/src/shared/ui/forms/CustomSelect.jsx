import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import styles from "./CustomSelect.module.css";

export default function CustomSelect({ value, onChange, options = [], placeholder, className = "", style }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div
      className={`${styles.customSelectContainer} ${isOpen ? styles.customSelectContainerOpen : ""} ${className}`}
      style={{ borderRadius: "8px", ...style }}
      ref={containerRef}
    >
      <button
        type="button"
        className={styles.customSelectTrigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.triggerLabelWrapper}>
          <span className={styles.triggerLabel}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {selectedOption && selectedOption.badge !== undefined && (
            <span className={styles.categoryCountBadge}>
              {selectedOption.badge}
            </span>
          )}
        </span>
        <Icon
          icon="solar:alt-arrow-down-linear"
          className={`${styles.selectChevron} ${isOpen ? styles.chevronRotate : ""}`}
        />
      </button>

      {isOpen && (
        <div className={styles.customSelectDropdownWrapper}>
          <ul className={styles.customSelectDropdown} role="listbox">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  className={`${styles.customSelectOption} ${isSelected ? styles.customSelectOptionActive : ""}`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  <div className={styles.optionContent}>
                    <span className={styles.optionLabel}>{option.label}</span>
                    {option.badge !== undefined && (
                      <span className={styles.categoryCountBadge}>{option.badge}</span>
                    )}
                  </div>
                  {isSelected && <Icon icon="solar:check-read-linear" className={styles.checkIcon} />}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}


