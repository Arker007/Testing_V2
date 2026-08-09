import React from "react";
import { Menu, X, Bell, Search } from "lucide-react";
import AdminNotificationsDropdown from "./AdminNotificationsDropdown";
import styles from "./AdminLayout.module.css";

export default function AdminTopBar({
  sidebarOpen,
  setSidebarOpen,
  pageTitle,
  pageCrumb,
  todayLabel,
  setShowSearchCmd,
  headerActions,
  showNotifDropdown,
  setShowNotifDropdown,
  unreadCount,
  setUnreadCount,
  notifications,
  setNotifications,
  navigate,
}) {
  return (
    <header className={`${styles.topbar} ${!sidebarOpen ? styles.topbarCollapsed : ""}`}>
      <div className={styles.topLeft}>
        <button className={styles.toggleBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
        </button>
        <div>
          <h1 className={styles.pageTitle}>{pageTitle}</h1>
          <p className={styles.pageMeta}>
            {pageCrumb} | {todayLabel}
          </p>
        </div>
      </div>

      <div className={styles.topRight} style={{ position: "relative" }}>
        <button
          className={styles.headerSearch}
          onClick={() => setShowSearchCmd(true)}
          style={{
            background: "#ffffff",
            border: "1px solid var(--line)",
            borderRadius: "9999px",
            padding: "8px 16px 8px 38px",
            fontSize: "0.875rem",
            color: "#64748B",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "280px",
            position: "relative",
            textAlign: "left",
          }}
        >
          <Search
            size={16}
            strokeWidth={2.2}
            style={{
              position: "absolute",
              left: "14px",
              color: "#94A3B8",
              pointerEvents: "none",
            }}
          />
          <span>Search anything...</span>
          <kbd
            style={{
              fontSize: "0.68rem",
              fontWeight: 700,
              background: "#F1F5F9",
              color: "#475569",
              padding: "2px 6px",
              borderRadius: "4px",
              border: "1px solid #E2E8F0",
              marginLeft: "auto",
            }}
          >
            /
          </kbd>
        </button>

        {headerActions && <div className={styles.headerActions}>{headerActions}</div>}

        <div style={{ position: "relative" }}>
          <button
            className={styles.topIconBtn}
            title="Notifications"
            onClick={() => {
              setShowNotifDropdown(!showNotifDropdown);
              setShowSearchCmd(false);
            }}
            style={{ position: "relative" }}
          >
            <Bell size={20} strokeWidth={2} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-2px",
                  right: "-2px",
                  background: "#EF4444",
                  color: "#ffffff",
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #ffffff",
                  boxShadow: "0 2px 4px rgba(239, 68, 68, 0.25)",
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          <AdminNotificationsDropdown
            showNotifDropdown={showNotifDropdown}
            setShowNotifDropdown={setShowNotifDropdown}
            unreadCount={unreadCount}
            setUnreadCount={setUnreadCount}
            notifications={notifications}
            setNotifications={setNotifications}
            navigate={navigate}
          />
        </div>

        <div className={styles.adminChip}>
          <div className={styles.adminAvatar}>AD</div>
          <div>
            <div className={styles.adminName}>Administrator</div>
            <div className={styles.adminRole}>Superuser</div>
          </div>
        </div>
      </div>
    </header>
  );
}
