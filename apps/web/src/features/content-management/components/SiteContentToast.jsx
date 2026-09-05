import React from "react";

export default function SiteContentToast({
  showToast,
  setShowToast,
  toastMessage,
}) {
  if (!showToast) return null;

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
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: toastMessage.includes("Failed") ? "var(--color-error)" : "var(--brand)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--white)",
        }}
      >
        <i
          className={`fa-solid ${
            toastMessage.includes("Failed") ? "fa-xmark" : "fa-check"
          }`}
          style={{ fontSize: "0.7rem" }}
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
        }}
      >
        <i className="fa-solid fa-xmark" />
      </button>
    </div>
  );
}
