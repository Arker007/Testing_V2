import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import styles from "./CustomSelect.module.css";

export default function CustomSelect({ value, onChange, options = [], placeholder, className = "", style }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && options.length > 5 && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isOpen, options.length]);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  const filteredOptions = options.filter((opt) =>
    String(opt.label || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          {options.length > 5 && (
            <div className={styles.selectSearchContainer}>
              <Icon icon="solar:magnifer-linear" className={styles.selectSearchIcon} />
              <input
                ref={searchInputRef}
                type="text"
                className={styles.selectSearchInput}
                placeholder="Search options..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
              {searchQuery && (
                <button
                  type="button"
                  className={styles.selectSearchClear}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchQuery("");
                  }}
                  aria-label="Clear search"
                >
                  <Icon icon="solar:close-circle-linear" className={styles.clearIcon} />
                </button>
              )}
            </div>
          )}

          <ul className={styles.customSelectDropdown} role="listbox">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
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
                      setSearchQuery("");
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
              })
            ) : (
              <li className={styles.noOptionsMessage}>No matching options</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}


