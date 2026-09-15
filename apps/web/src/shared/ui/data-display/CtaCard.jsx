import React from "react";
import Badge from "./Badge";

/**
 * Reusable CTA Card component for unified CTA banners across all pages.
 *
 * @param {Object} props
 * @param {string | React.ReactNode} [props.badge] - Badge text or element
 * @param {string} [props.badgeVariant="brand"] - Variant for Badge
 * @param {string | React.ReactNode} [props.badgeIcon] - Optional icon for Badge
 * @param {string | React.ReactNode} props.title - Main CTA headline
 * @param {string | React.ReactNode} [props.subtitle] - Subtitle/description paragraph
 * @param {React.ReactNode} props.children - Action buttons / controls
 * @param {string} [props.className=""] - Additional custom wrapper class
 */
export default function CtaCard({
  badge,
  badgeVariant = "brand",
  badgeIcon,
  title,
  subtitle,
  children,
  className = "",
  ...props
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-card,8px)] bg-[var(--bg-surface,#ffffff)] dark:bg-[var(--bg-surface,#1e2530)] text-[var(--text-primary)] border border-[var(--border-subtle)] shadow-[var(--shadow-sm)] p-6 sm:p-8 lg:p-10 w-full max-w-full ${className}`.trim()}
      {...props}
    >
      {/* Background Decorative Ambient Radial Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--brand-primary,#059669)]/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-500/5 dark:bg-slate-400/5 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 md:gap-8 w-full min-w-0">
        <div className="space-y-2.5 w-full min-w-0 flex-1">
          {badge && (
            <div className="mb-2 max-w-full">
              {typeof badge === "string" ? (
                <Badge variant={badgeVariant} icon={badgeIcon} size="md">
                  {badge}
                </Badge>
              ) : (
                badge
              )}
            </div>
          )}
          {title && (
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[var(--text-primary)] tracking-tight leading-tight break-words">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-[var(--text-secondary)] text-sm sm:text-base mt-2 max-w-2xl font-normal leading-relaxed break-words">
              {subtitle}
            </p>
          )}
        </div>

        {children && (
          <div className="shrink-0 self-start sm:self-auto flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
