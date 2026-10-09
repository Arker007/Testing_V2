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
  alignLabel = "auto",
  className = "",
  children,
}) {
  const isHorizontal = layout === "horizontal";
  const shouldRightAlignLabel = isHorizontal && alignLabel !== "left";

  const formattedLabel = React.useMemo(() => {
    if (!label || typeof label !== "string") return label;
    const trimmed = label.trim();
    if (isHorizontal && !trimmed.endsWith(":") && !trimmed.endsWith("?")) {
      return `${trimmed}:`;
    }
    return trimmed;
  }, [label, isHorizontal]);

  return (
    <div
      className={`w-full ${
        isHorizontal
          ? "grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-center"
          : "flex flex-col gap-1.5"
      } ${className}`.trim()}
    >
      {label && (
        <div
          className={`flex items-center ${
            shouldRightAlignLabel ? "justify-end text-right md:pr-1" : "justify-start text-left"
          }`}
        >
          <label
            htmlFor={htmlFor}
            className={`flex items-center gap-1.5 text-xs md:text-sm font-semibold text-[var(--text-primary)] select-none cursor-pointer ${
              shouldRightAlignLabel ? "justify-end text-right w-full" : "justify-start"
            }`}
          >
            <span>{formattedLabel}</span>
            {required && <span className="text-[var(--color-danger)] font-bold ml-0.5">*</span>}
            {tooltip && (
              <span
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors ml-0.5"
                title={tooltip}
              >
                <Icon icon="carbon:information" className="w-3.5 h-3.5 inline shrink-0" />
              </span>
            )}
          </label>
        </div>
      )}

      <div className={isHorizontal ? "md:col-span-2 flex flex-col gap-1.5 w-full" : "flex flex-col gap-1.5 w-full"}>
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
