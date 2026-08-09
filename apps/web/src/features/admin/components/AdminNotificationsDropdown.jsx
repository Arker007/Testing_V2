import React from "react";
import { BellRing, CheckCheck, Sparkles, Activity } from "lucide-react";

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
        background: "#ffffff",
        borderRadius: "16px",
        border: "1px solid var(--line)",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
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
          background: "#FAFAFA",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <BellRing size={16} className="text-[#98d12a]" />
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
              color: "#7db018",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <CheckCheck size={12} /> Mark read
          </button>
        )}
      </div>

      <div style={{ maxHeight: "280px", overflowY: "auto" }}>
        {notifications.length === 0 ? (
          <div
            style={{
              padding: "32px 16px",
              textAlign: "center",
              color: "#64748B",
              fontSize: "0.8rem",
            }}
          >
            <Sparkles
              size={24}
              style={{ margin: "0 auto 8px", color: "#94A3B8" }}
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
                borderBottom: "1px solid #F1F5F9",
                cursor: "pointer",
                background: n.read ? "transparent" : "#F4F9E8",
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
                  background: n.read ? "transparent" : "#98d12a",
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
                      color: "#94A3B8",
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
                    color: "#64748B",
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
          background: "#FAFAFA",
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
            color: "#475569",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            width: "100%",
          }}
        >
          <Activity size={12} /> View all system logs
        </button>
      </div>
    </div>
  );
}
