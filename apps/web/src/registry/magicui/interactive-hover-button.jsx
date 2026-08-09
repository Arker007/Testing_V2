import React from "react";
import { ArrowRight } from "lucide-react";

/**
 * InteractiveHoverButton - A premium, high-fidelity responsive button component
 * with sleek hover transitions.
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
        <div className="interactive-hover-button-content">
          <div className="interactive-hover-button-dot" />
          <span className="interactive-hover-button-text">{labelText}</span>
        </div>

        <div className="interactive-hover-button-hover">
          <span>{labelText}</span>
          <ArrowRight className="interactive-hover-button-arrow" />
        </div>
      </button>
    );
  }
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export default InteractiveHoverButton;

