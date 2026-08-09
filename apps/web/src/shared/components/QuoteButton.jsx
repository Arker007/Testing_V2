import React from "react";
import { Link } from "react-router-dom";

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
        <svg
          className="btn-arrow-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </>
  );

  if (type === "button") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={combinedClasses}
        style={style}
      >
        {content}
      </button>
    );
  }

  if (type === "a" || href) {
    return (
      <a
        href={href || to}
        onClick={onClick}
        className={combinedClasses}
        style={style}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={to} onClick={onClick} className={combinedClasses} style={style}>
      {content}
    </Link>
  );
}
