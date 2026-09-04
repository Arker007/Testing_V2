import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

/**
 * Reusable BackHeader component for page back navigation with titles and actions.
 *
 * @param {Object} props
 * @param {string} [props.to] - Router path to navigate back to
 * @param {() => void} [props.onBack] - Custom back handler callback (overrides 'to')
 * @param {string} [props.backLabel='Back'] - Button label text
 * @param {string | React.ReactNode} [props.title] - Page section or view title
 * @param {string | React.ReactNode} [props.subtitle] - Supporting subtitle
 * @param {React.ReactNode} [props.actions] - Right side action buttons
 * @param {string} [props.className=''] - Additional custom CSS classes
 */
export default function BackHeader({
  to,
  onBack,
  backLabel = "Back",
  title,
  subtitle,
  actions,
  className = "",
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 ${className}`.trim()}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-btn,8px)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-elevated)] hover:border-[var(--brand-border)] text-xs font-bold text-[var(--text-primary)] shadow-2xs transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-1 active:scale-95"
        >
          <Icon icon="solar:arrow-left-linear" className="w-4 h-4 text-[var(--text-secondary)]" />
          <span>{backLabel}</span>
        </button>

        {(title || subtitle) && (
          <div>
            {title && (
              <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>

      {actions && <div className="flex items-center gap-2 self-start sm:self-auto">{actions}</div>}
    </div>
  );
}
