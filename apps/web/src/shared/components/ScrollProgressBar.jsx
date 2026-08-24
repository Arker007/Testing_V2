import { useState, useEffect } from "react";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const scrollPercent = (window.scrollY / totalHeight) * 100;
        // Clamp between 0 and 100
        setProgress(Math.min(100, Math.max(0, scrollPercent)));
      } else {
        setProgress(0);
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
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "3px",
        backgroundColor: "rgba(5, 40, 63, 0.08)", // subtle tint of dark navy
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <div
        id="scroll-progress-bar"
        style={{
          width: `${progress}%`,
          height: "100%",
          backgroundColor: "var(--brand, #6BBF54)", // brand emerald/green color
          transition: "width 0.1s ease-out",
        }}
      />
    </div>
  );
}
