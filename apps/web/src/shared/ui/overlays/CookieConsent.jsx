import React, { useState, useEffect } from "react";
import Button from "../buttons/Button";
import { Icon } from "@iconify/react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already made a choice
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Small delay so it doesn't instantly block the user on first load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:bottom-4 z-[9999] max-w-sm w-full bg-[var(--bg-surface,#ffffff)] dark:bg-[var(--bg-surface,#1e2530)] border border-[var(--border-subtle)] p-5 rounded-[var(--radius-card,8px)] shadow-xl animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="flex items-start gap-3 mb-3">
        <div className="text-[var(--brand-primary,#059669)] mt-0.5 shrink-0">
          <Icon icon="carbon:cookie" className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-[var(--text-primary)] font-bold text-sm mb-1 tracking-tight">We value your privacy</h3>
          <p className="text-[var(--text-secondary)] text-xs leading-relaxed">
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[var(--border-subtle)]">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 text-xs px-2 h-9" 
          onClick={handleDecline}
        >
          Decline
        </Button>
        <Button 
          variant="primary" 
          size="sm" 
          className="flex-1 text-xs px-2 h-9" 
          onClick={handleAccept}
        >
          Accept All
        </Button>
      </div>
    </div>
  );
}
