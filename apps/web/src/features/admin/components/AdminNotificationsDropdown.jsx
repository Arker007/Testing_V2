import React from "react";
import { Icon } from "@iconify/react";

export default function AdminNotificationsDropdown({
  showNotifDropdown,
  setShowNotifDropdown,
  unreadCount,
  setUnreadCount,
  notifications,
  setNotifications,
  navigate,
}) {
  if (!showNotifDropdown) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 12px)",
        right: 0,
        width: "340px",
        background: "var(--bg-card)",
        borderRadius: "16px",
        border: "1px solid var(--line)",
        boxShadow: "0 10px 30px var(--border-subtle)",
        zIndex: 300,
        overflow: "hidden",
        fontFamily: "inherit",
      }}
    >
      <div
        style={{
          padding: "14px 18px",
          borderBottom: "1px solid var(--line)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--bg-page)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Icon icon="solar:bell-bing-linear" className="w-4 h-4 text-[var(--brand)]" />
          <span
            style={{ fontWeight: 800, fontSize: "0.85rem", color: "var(--ink)" }}
          >
            Activity Notifications
          </span>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={() => {
              setUnreadCount(0);
              setNotifications((prev) =>
                prev.map((n) => ({ ...n, read: true }))
              );
            }}
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--brand-dark)",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Icon icon="solar:check-read-linear" className="w-3.5 h-3.5" /> Mark read
          </button>
        )}
      </div>

      <div style={{ maxHeight: "280px", overflowY: "auto" }}>
        {notifications.length === 0 ? (
          <div
            style={{
              padding: "32px 16px",
              textAlign: "center",
              color: "var(--text-muted)",
              fontSize: "0.8rem",
            }}
          >
            <Icon
              icon="solar:stars-linear"
              className="w-6 h-6 mx-auto mb-2 text-slate-400"
            />
            No new notifications
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                if (!n.read) {
                  setUnreadCount((prev) => Math.max(0, prev - 1));
                  setNotifications((prev) =>
                    prev.map((item) =>
                      item.id === n.id ? { ...item, read: true } : item
                    )
                  );
                }
                if (n.type === "inquiry") {
                  navigate("/admin/inquiries");
                } else if (n.type === "catalog") {
                  navigate("/admin/catalog");
                }
                setShowNotifDropdown(false);
              }}
              style={{
                padding: "12px 18px",
                borderBottom: "1px solid var(--bg-surface)",
                cursor: "pointer",
                background: n.read ? "transparent" : "var(--brand-light)",
                transition: "background 0.2s",
                display: "flex",
                gap: "10px",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: n.read ? "transparent" : "var(--brand)",
                  marginTop: "6px",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "2px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: n.read ? 600 : 800,
                      color: "var(--ink)",
                    }}
                  >
                    {n.title}
                  </span>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      color: "var(--text-muted)",
                      fontWeight: 500,
                    }}
                  >
                    {n.time}
                  </span>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    lineHeight: "1.35",
                  }}
                >
                  {n.body}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div
        style={{
          padding: "10px 18px",
          background: "var(--bg-page)",
          borderTop: "1px solid var(--line)",
          textAlign: "center",
        }}
      >
        <button
          onClick={() => {
            navigate("/admin/inquiries");
            setShowNotifDropdown(false);
          }}
          style={{
            background: "none",
            border: "none",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "var(--text-secondary)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            width: "100%",
          }}
        >
          <Icon icon="solar:pulse-linear" className="w-3.5 h-3.5" /> View all system logs
        </button>
      </div>
    </div>
  );
}
