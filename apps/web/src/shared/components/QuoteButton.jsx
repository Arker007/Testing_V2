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
}) {
  const combinedClasses = `swipe-btn magic-shimmer-btn ${className}`.trim();

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
        onClick={onClick}
        className={combinedClasses}
        style={style}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {content}
      </Motion.button>
    );
  }

  if (type === "a" || href) {
    return (
      <Motion.a
        href={href || to}
        onClick={onClick}
        className={combinedClasses}
        style={style}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {content}
      </Motion.a>
    );
  }

  return (
    <Motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      <Link to={to} onClick={onClick} className={combinedClasses} style={style}>
        {content}
      </Link>
    </Motion.div>
  );
}
