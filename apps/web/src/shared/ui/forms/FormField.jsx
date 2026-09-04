import React from "react";
import { Icon } from "@iconify/react";

/**
 * Unified FormField Wrapper for labels, error text, hints, and required badges.
 *
 * @param {Object} props
 * @param {string} [props.label]
 * @param {string} [props.htmlFor]
 * @param {boolean} [props.required=false]
 * @param {string} [props.hint]
 * @param {string} [props.error]
 * @param {string} [props.tooltip]
 * @param {'vertical' | 'horizontal' | 'compact'} [props.layout='vertical']
 * @param {string} [props.className='']
 * @param {React.ReactNode} props.children
 */
export default function FormField({
  label,
  htmlFor,
  required = false,
  hint,
  error,
  tooltip,
  layout = "vertical",
  className = "",
  children,
}) {
  const isHorizontal = layout === "horizontal";

  return (
    <div
      className={`w-full ${
        isHorizontal ? "grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-start" : "flex flex-col gap-1.5"
      } ${className}`.trim()}
    >
      {label && (
        <div className={`flex items-center justify-between ${isHorizontal ? "pt-2" : ""}`}>
          <label
            htmlFor={htmlFor}
            className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-[var(--text-primary)] select-none cursor-pointer"
          >
            <span>{label}</span>
            {required && <span className="text-[var(--color-danger)] font-bold">*</span>}
            {tooltip && (
              <span className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors" title={tooltip}>
                <Icon icon="solar:info-circle-linear" className="w-3.5 h-3.5 inline" />
              </span>
            )}
          </label>
        </div>
      )}

      <div className={isHorizontal ? "md:col-span-2 flex flex-col gap-1.5" : "flex flex-col gap-1"}>
        {children}

        {error ? (
          <p className="text-xs font-medium text-[var(--color-danger)] flex items-center gap-1 mt-0.5 animate-fadeIn">
            <Icon icon="solar:danger-triangle-linear" className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        ) : hint ? (
          <p className="text-xs text-[var(--text-muted)] mt-0.5">{hint}</p>
        ) : null}
      </div>
    </div>
  );
}
