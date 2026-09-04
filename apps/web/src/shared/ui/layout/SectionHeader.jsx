import React from "react";
import Badge from "../data-display/Badge";

/**
 * Unified SectionHeader Component
 *
 * @param {Object} props
 * @param {string} [props.eyebrow]
 * @param {string|React.ReactNode} props.title
 * @param {string|React.ReactNode} [props.subtitle]
 * @param {'center' | 'left'} [props.align='center']
 * @param {boolean} [props.light=false]
 * @param {string} [props.className='']
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className = "",
  ...props
}) {
  const alignClasses =
    align === "left"
      ? "text-left items-start"
      : "text-center items-center mx-auto";

  return (
    <div
      className={`flex flex-col mb-8 md:mb-12 max-w-3xl ${alignClasses} ${className}`}
      {...props}
    >
      {eyebrow && (
        <Badge variant="eyebrow" size="lg" className="mb-4">
          {eyebrow}
        </Badge>
      )}

      {title && (
        <h2
          className={`text-2xl sm:text-3.5xl md:text-4xl font-extrabold tracking-tight leading-tight mb-3 ${
            light ? "text-[var(--white)]" : "text-[var(--text-primary)]"
          }`}
        >
          {title}
        </h2>
      )}

      {subtitle && (
        <p
          className={`text-sm sm:text-base leading-relaxed font-normal ${
            light ? "text-[var(--neutral-200)]" : "text-[var(--text-secondary)]"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
