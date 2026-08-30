import React from "react";
import Badge from "./Badge";

/**
 * Reusable PageHeader component for public and interior view headers.
 *
 * @param {Object} props
 * @param {string} [props.eyebrow] - Small top badge or category label
 * @param {string | React.ReactNode} props.title - Primary page headline
 * @param {string | React.ReactNode} [props.description] - Subtitle or overview text
 * @param {React.ReactNode} [props.actions] - Right side action controls
 * @param {boolean} [props.centered=false] - Whether to center align title text
 * @param {string} [props.className=''] - Additional custom CSS classes
 */
export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  centered = false,
  className = "",
}) {
  return (
    <div
      className={`mb-8 sm:mb-10 ${
        centered
          ? "text-center max-w-3xl mx-auto"
          : "flex flex-col md:flex-row md:items-end justify-between gap-6"
      } ${className}`.trim()}
    >
      <div className={centered ? "" : "max-w-2xl"}>
        {eyebrow && (
          <Badge variant="brand" className="mb-3 uppercase tracking-wider text-[11px] font-bold">
            {eyebrow}
          </Badge>
        )}
        {title && (
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
            {title}
          </h1>
        )}
        {description && (
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className={`flex items-center gap-3 ${centered ? "justify-center mt-6" : "shrink-0"}`}>
          {actions}
        </div>
      )}
    </div>
  );
}
