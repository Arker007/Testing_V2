import React from "react";
import { Icon } from "@iconify/react";
import "./interactive-hover-button.css";

/**
 * InteractiveHoverButton - A premium, high-fidelity responsive button component
 * with sleek hover transitions where text always stays crisp, visible, and accessible.
 */
export const InteractiveHoverButton = React.forwardRef(
  ({ text = "Hover Me", children, className = "", style = {}, ...props }, ref) => {
    const labelText = children || text;

    return (
      <button
        ref={ref}
        type="button"
        className={`interactive-hover-button ${className}`}
        style={style}
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
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export default InteractiveHoverButton;

