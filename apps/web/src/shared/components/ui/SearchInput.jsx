import React from "react";
import { Icon } from "@iconify/react";

/**
 * Reusable SearchInput component with search icon and quick clear button.
 *
 * @param {Object} props
 * @param {string} props.value - Search string value
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onChange - Input change callback
 * @param {() => void} [props.onClear] - Clear button click callback
 * @param {string} [props.placeholder='Search...'] - Input placeholder
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Input size variant
 * @param {string} [props.className=''] - Additional container classes
 */
export default function SearchInput({
  value = "",
  onChange,
  onClear,
  placeholder = "Search...",
  size = "md",
  className = "",
  ...props
}) {
  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange({ target: { value: "" } });
    }
  };

  const sizeClasses = {
    sm: "py-1.5 pl-8 pr-7 text-xs rounded-lg",
    md: "py-2 pl-9 pr-8 text-sm rounded-xl",
    lg: "py-3 pl-10 pr-9 text-base rounded-2xl",
  };

  const iconSizes = {
    sm: "left-2.5 w-3.5 h-3.5",
    md: "left-3 w-4 h-4",
    lg: "left-3.5 w-5 h-5",
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;
  const selectedIconSize = iconSizes[size] || iconSizes.md;

  return (
    <div className={`relative inline-flex items-center w-full ${className}`.trim()}>
      <Icon
        icon="solar:magnifer-linear"
        className={`absolute text-slate-400 pointer-events-none ${selectedIconSize}`}
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-slate-400 focus:outline-none focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] transition-all ${selectedSize}`}
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2.5 p-0.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Clear search"
        >
          <Icon icon="solar:close-circle-bold" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
