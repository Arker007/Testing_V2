import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../../features/navigation/Navbar";
import MobileBottomNav from "../../features/navigation/MobileBottomNav";
import Footer from "../../features/navigation/Footer";
import ScrollProgressBar from "../../shared/components/ScrollProgressBar";

export default function PublicLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  // FIX: Detect active scroll motion to dynamically pause hover layout recalculations
  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      document.body.classList.add("is-scrolling");
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove("is-scrolling");
      }, 150); // timeout matches typical scroll-wheel end latency
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll("#main-content [data-reveal]"),
    );
    if (targets.length === 0) return;

    targets.forEach((el) => el.classList.add("reveal-init"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((el) => el.classList.add("reveal-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -24px 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      <a
        href="#main-content"
        style={{
          position: "absolute",
          top: "-100%",
          left: "1rem",
          background: "var(--brand)",
          color: "#fff",
          padding: "0.5rem 1rem",
          borderRadius: "0 0 0.5rem 0.5rem",
          fontWeight: 700,
          zIndex: 9999,
          transition: "top 0.2s",
        }}
        onFocus={(e) => {
          e.currentTarget.style.top = "0";
        }}
        onBlur={(e) => {
          e.currentTarget.style.top = "-100%";
        }}
      >
        Skip to main content
      </a>
      <ScrollProgressBar />
      <Navbar />
      <div id="main-content">
        <Outlet />
      </div>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
