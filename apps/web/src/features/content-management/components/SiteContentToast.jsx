import React from "react";
import { Icon } from "@iconify/react";

export default function SiteContentToast({
  showToast,
  setShowToast,
  toastMessage,
}) {
  if (!showToast) return null;

  const isError = toastMessage.includes("Failed") || toastMessage.includes("Error");

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        background: "var(--gray-800)",
        color: "var(--white)",
        padding: "12px 20px",
        borderRadius: "var(--radius-admin, 8px)",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        zIndex: 500,
        fontFamily: "inherit",
        fontSize: "0.85rem",
        fontWeight: 650,
      }}
    >
      <div
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          background: isError ? "var(--color-error)" : "var(--brand)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--white)",
          flexShrink: 0,
        }}
      >
        <Icon
          icon={isError ? "solar:close-circle-bold" : "solar:check-circle-bold"}
          className="w-4 h-4"
        />
      </div>
      <span>{toastMessage}</span>
      <button
        type="button"
        onClick={() => setShowToast(false)}
        style={{
          border: "none",
          background: "none",
          color: "var(--gray-400)",
          cursor: "pointer",
          marginLeft: "12px",
          display: "flex",
          alignItems: "center",
        }}
        title="Dismiss"
      >
        <Icon icon="solar:close-circle-linear" className="w-4 h-4" />
      </button>
    </div>
  );
}
