import { useState, useEffect } from "react";
import { useSite } from "../../context/SiteContext";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  const siteCtx = useSite();
  const mobileMenuOpen = Boolean(siteCtx?.mobileMenuOpen);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const scrollPercent = (window.scrollY / totalHeight) * 100;
            // Clamp between 0 and 100
            setProgress(Math.min(100, Math.max(0, scrollPercent)));
          } else {
            setProgress(0);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to handle initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="scroll-progress-container"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "3px",
        backgroundColor: "transparent",
        zIndex: 9998,
        pointerEvents: "none",
        opacity: mobileMenuOpen || progress <= 0 ? 0 : 1,
        transition: "opacity 0.15s ease",
      }}
    >
      <div
        id="scroll-progress-bar"
        style={{
          width: `${progress}%`,
          height: "100%",
          backgroundColor: "var(--brand-primary, #6BBF54)",
          boxShadow: "0 0 8px rgba(107, 191, 84, 0.4)",
          transition: "width 0.1s ease-out",
        }}
      />
    </div>
  );
}
