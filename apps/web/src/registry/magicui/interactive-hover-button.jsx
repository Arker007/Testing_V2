import React from "react";
import { Icon } from "@iconify/react";
import "./interactive-hover-button.css";

export function InteractiveHoverButton({
  children,
  text,
  className = "",
  onClick,
  disabled = false,
  type = "button",
  ...props
}) {
  const labelText = children || text;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`interactive-hover-button ${className}`}
      {...props}
    >
      <span className="interactive-hover-button-dot" />
      <span className="interactive-hover-button-text">{labelText}</span>
      <span className="interactive-hover-button-arrow-wrap">
        <Icon icon="solar:arrow-right-linear" className="interactive-hover-button-arrow w-4 h-4" />
      </span>
    </button>
  );
}

export default InteractiveHoverButton;
