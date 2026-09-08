import React from "react";
import Card from "./Card";
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
 * @param {'elevated' | 'glass' | 'bordered' | 'brand'} [props.variant="elevated"] - Card variant
 */
export default function CtaCard({
  badge,
  badgeVariant = "brand",
  badgeIcon,
  title,
  subtitle,
  children,
  className = "",
  variant = "elevated",
  ...props
}) {
  return (
    <Card
      variant={variant}
      className={`p-6 sm:p-8 lg:p-10 text-[var(--text-primary)] relative overflow-hidden bg-[var(--bg-surface,#ffffff)] border border-[var(--border-subtle)] rounded-[var(--radius-card,8px)] shadow-[var(--shadow-sm)] w-full max-w-full ${className}`.trim()}
      {...props}
    >
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
            <p className="text-[var(--text-secondary)] text-sm sm:text-base mt-2 max-w-xl font-medium leading-relaxed break-words">
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
    </Card>
  );
}
