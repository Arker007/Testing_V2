import React from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Icon } from "@iconify/react";

/**
 * Unified Button Primitive
 *
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'outline' | 'ghost' | 'swipe' | 'explore' | 'danger' | 'success'} [props.variant='primary']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {'button' | 'link' | 'a'} [props.as='button']
 * @param {string} [props.to]
 * @param {string} [props.href]
 * @param {React.ReactNode} [props.icon]
 * @param {boolean} [props.showArrow=false]
 * @param {boolean} [props.disabled=false]
 * @param {boolean} [props.loading=false]
 * @param {string} [props.loadingText]
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style={}]
 * @param {React.ReactNode} props.children
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  as = "button",
  to,
  href,
  icon,
  showArrow = false,
  disabled = false,
  loading = false,
  loadingText,
  className = "",
  style = {},
  onClick,
  type = "button",
  ...props
}) {
  const sizeClasses = {
    sm: "min-h-[var(--btn-h-sm,34px)] px-[var(--btn-px-sm,0.875rem)] py-[var(--btn-py-sm,0.375rem)] text-xs rounded-[var(--radius-btn,8px)] gap-1.5 font-semibold",
    md: "min-h-[var(--btn-h-md,42px)] px-[var(--btn-px-md,1.375rem)] py-[var(--btn-py-md,0.625rem)] text-sm rounded-[var(--radius-btn,8px)] gap-2 font-semibold",
    lg: "min-h-[var(--btn-h-lg,48px)] px-[var(--btn-px-lg,1.75rem)] py-[var(--btn-py-lg,0.75rem)] text-base rounded-[var(--radius-btn,8px)] gap-2.5 font-semibold",
  };

  const spinnerSizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const baseClasses =
    "inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-200 cursor-pointer select-none relative overflow-hidden isolate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas)] disabled:opacity-55 disabled:cursor-not-allowed disabled:pointer-events-none disabled:shadow-none";

  const variantClasses = {
    primary:
      "bg-[var(--brand-primary)] text-[var(--brand-btn-text)] hover:bg-[var(--brand-hover)] active:bg-[var(--brand-active)] shadow-[var(--shadow-sm)] border border-transparent",
    secondary:
      "bg-[var(--navy)] text-[var(--text-inverse)] hover:bg-[var(--navy-hover)] active:bg-[var(--navy-active)] shadow-[var(--shadow-sm)] border border-transparent",
    outline:
      "bg-transparent border border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--brand-primary)] hover:text-[var(--text-brand)] active:scale-98",
    ghost:
      "bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-surface-secondary)] hover:text-[var(--text-brand)] border border-transparent",
    swipe:
      "bg-[var(--brand-primary)] text-[var(--brand-btn-text)] hover:bg-[var(--brand-hover)] shadow-[var(--shadow-sm)] border border-transparent",
    explore:
      "bg-[var(--navy)] text-[var(--text-inverse)] hover:bg-[var(--navy-hover)] shadow-[var(--shadow-sm)] border border-transparent",
    danger:
      "bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-[var(--shadow-sm)] border border-transparent",
    success:
      "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-[var(--shadow-sm)] border border-transparent",
  };

  const selectedSizeClass = sizeClasses[size] || sizeClasses.md;
  const selectedVariantClass = variantClasses[variant] || variantClasses.primary;
  const selectedSpinnerSize = spinnerSizeClasses[size] || spinnerSizeClasses.md;
  const isInteractive = !disabled && !loading;

  const content = (
    <>
      {loading ? (
        <Icon
          icon="solar:restart-linear"
          className={`${selectedSpinnerSize} animate-spin shrink-0`}
          aria-hidden="true"
        />
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      <span>{loading && loadingText ? loadingText : children}</span>
      {showArrow && !loading && (
        <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-1">
          {variant === "outline" || variant === "ghost" ? (
            <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
          ) : (
            <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
          )}
        </span>
      )}
    </>
  );

  const combinedClasses = `${baseClasses} ${selectedSizeClass} ${selectedVariantClass} ${
    !isInteractive ? "opacity-60 cursor-not-allowed pointer-events-none shadow-none" : ""
  } ${className}`.trim();

  if (as === "link" || to) {
    return (
      <Motion.div
        whileHover={isInteractive ? { scale: 1.02 } : undefined}
        whileTap={isInteractive ? { scale: 0.98 } : undefined}
        className="inline-block"
      >
        <Link
          to={isInteractive ? to || "/" : "#"}
          onClick={isInteractive ? onClick : (e) => e.preventDefault()}
          aria-disabled={!isInteractive}
          aria-busy={loading}
          tabIndex={!isInteractive ? -1 : undefined}
          className={combinedClasses}
          style={style}
          {...props}
        >
          {content}
        </Link>
      </Motion.div>
    );
  }

  if (as === "a" || href) {
    return (
      <Motion.div
        whileHover={isInteractive ? { scale: 1.02 } : undefined}
        whileTap={isInteractive ? { scale: 0.98 } : undefined}
        className="inline-block"
      >
        <a
          href={isInteractive ? href || to : "#"}
          onClick={isInteractive ? onClick : (e) => e.preventDefault()}
          aria-disabled={!isInteractive}
          aria-busy={loading}
          tabIndex={!isInteractive ? -1 : undefined}
          className={combinedClasses}
          style={style}
          {...props}
        >
          {content}
        </a>
      </Motion.div>
    );
  }

  return (
    <Motion.button
      type={type}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      onClick={isInteractive ? onClick : undefined}
      whileHover={isInteractive ? { scale: 1.02 } : undefined}
      whileTap={isInteractive ? { scale: 0.98 } : undefined}
      className={combinedClasses}
      style={style}
      {...props}
    >
      {content}
    </Motion.button>
  );
}
