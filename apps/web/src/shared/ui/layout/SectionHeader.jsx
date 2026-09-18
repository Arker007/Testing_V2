import React from "react";
import Badge from "../data-display/Badge";

/**
 * Unified SectionHeader Component
 * Standardized typography scales, eyebrow badge, two-tone heading, subtitle description, and alignment.
 *
 * @param {Object} props
 * @param {string|React.ReactNode} [props.eyebrow] - Text or element for the eyebrow badge
 * @param {string|React.ReactNode} [props.eyebrowIcon] - Optional icon for the eyebrow badge
 * @param {string} [props.eyebrowVariant='eyebrow'] - Badge variant
 * @param {string|React.ReactNode} props.title - Primary heading text or nodes
 * @param {string} [props.highlightText] - Specific word or phrase in the title to highlight in brand accent
 * @param {string|React.ReactNode} [props.subtitle] - Secondary descriptive paragraph
 * @param {string|React.ReactNode} [props.description] - Alias for subtitle
 * @param {'center' | 'left'} [props.align='center'] - Alignment mode
 * @param {boolean} [props.accentLine=false] - Whether to render a horizontal brand accent rule
 * @param {boolean} [props.light=false] - Whether header sits on dark/light background
 * @param {boolean} [props.verticalAxis=false] - Renders vertical accent line on left-aligned headers
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Header scale
 * @param {string} [props.className=''] - Custom wrapper classes
 */
export default function SectionHeader({
  eyebrow,
  badge,
  eyebrowIcon,
  eyebrowVariant = "eyebrow",
  title,
  highlightText,
  subtitle,
  description,
  align = "center",
  accentLine = false,
  light = false,
  verticalAxis = false,
  size = "md",
  className = "",
  ...props
}) {
  const effectiveSubtitle = subtitle || description;
  const effectiveEyebrow = eyebrow || badge;

  const alignClasses =
    align === "left"
      ? `text-left items-start ${
          verticalAxis
            ? "vertical-axis-left pl-6 border-l-2 border-[var(--border-subtle)]"
            : ""
        }`
      : "text-center items-center mx-auto";

  const sizeTitleClasses = {
    sm: "text-lg sm:text-xl md:text-2xl font-bold tracking-tight leading-snug",
    md: "text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-snug",
    lg: "text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-snug",
  };

  const renderTitle = () => {
    if (!title) return null;
    if (typeof title !== "string" || !highlightText) {
      return title;
    }

    if (title.includes(highlightText)) {
      const parts = title.split(highlightText);
      return (
        <>
          {parts[0]}
          <span className="text-[var(--brand-primary,#059669)] dark:text-emerald-400 font-extrabold">
            {highlightText}
          </span>
          {parts.slice(1).join(highlightText)}
        </>
      );
    }

    return (
      <>
        {title}{" "}
        <span className="text-[var(--brand-primary,#059669)] dark:text-emerald-400 font-extrabold">
          {highlightText}
        </span>
      </>
    );
  };

  return (
    <div
      className={`flex flex-col mb-8 md:mb-12 max-w-3xl ${alignClasses} ${className}`.trim()}
      {...props}
    >
      {effectiveEyebrow && (
        <div className="mb-4">
          {typeof effectiveEyebrow === "string" ? (
            <Badge variant={eyebrowVariant} size="lg" icon={eyebrowIcon}>
              {effectiveEyebrow}
            </Badge>
          ) : (
            effectiveEyebrow
          )}
        </div>
      )}

      {title && (
        <h2
          className={`${sizeTitleClasses[size] || sizeTitleClasses.md} mb-3 ${
            light ? "!text-white" : "text-[var(--text-primary)]"
          }`}
        >
          {renderTitle()}
        </h2>
      )}

      {accentLine && (
        <div className={`h-1 w-16 bg-[var(--brand-primary,#059669)] rounded-full my-3 ${align === "center" ? "mx-auto" : ""}`} />
      )}

      {effectiveSubtitle && (
        <p
          className={`text-sm sm:text-base leading-relaxed font-normal ${
            accentLine ? "mt-2" : "mt-1"
          } ${
            light ? "!text-slate-200" : "text-[var(--text-secondary)]"
          }`}
        >
          {effectiveSubtitle}
        </p>
      )}
    </div>
  );
}
