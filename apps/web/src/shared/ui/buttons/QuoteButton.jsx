import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion as Motion } from "framer-motion";

export default function QuoteButton({
  to = "/contact?quote=1",
  onClick,
  text = "Get a Free Quote",
  className = "",
  style = {},
  type = "link", // "link", "button", "a"
  href,
  disabled = false,
}) {
  const isInteractive = !disabled;
  const combinedClasses = `swipe-btn magic-shimmer-btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas)] ${
    !isInteractive ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
  } ${className}`.trim();

  const content = (
    <>
      <span className="btn-text">{text}</span>
      <span className="btn-icon-bubble">
        <Icon icon="solar:arrow-right-linear" className="btn-arrow-icon w-4 h-4" />
      </span>
    </>
  );

  if (type === "button") {
    return (
      <Motion.button
        type="button"
        disabled={disabled}
        aria-disabled={disabled}
        onClick={isInteractive ? onClick : undefined}
        className={combinedClasses}
        style={style}
        whileHover={isInteractive ? { scale: 1.03 } : undefined}
        whileTap={isInteractive ? { scale: 0.97 } : undefined}
      >
        {content}
      </Motion.button>
    );
  }

  if (type === "a" || href) {
    return (
      <Motion.a
        href={isInteractive ? href || to : "#"}
        onClick={isInteractive ? onClick : (e) => e.preventDefault()}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        className={combinedClasses}
        style={style}
        whileHover={isInteractive ? { scale: 1.03 } : undefined}
        whileTap={isInteractive ? { scale: 0.97 } : undefined}
      >
        {content}
      </Motion.a>
    );
  }

  return (
    <Motion.div
      whileHover={isInteractive ? { scale: 1.03 } : undefined}
      whileTap={isInteractive ? { scale: 0.97 } : undefined}
      className="inline-block"
    >
      <Link
        to={isInteractive ? to : "#"}
        onClick={isInteractive ? onClick : (e) => e.preventDefault()}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        className={combinedClasses}
        style={style}
      >
        {content}
      </Link>
    </Motion.div>
  );
}
