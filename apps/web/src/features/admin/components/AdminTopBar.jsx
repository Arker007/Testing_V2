import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Badge, Input } from "@/shared/ui";
import AdminNotificationsDropdown from "./AdminNotificationsDropdown";
import styles from "../styles/AdminLayout.module.css";

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
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header className={`${styles.topbar} ${!sidebarOpen ? styles.topbarCollapsed : ""}`}>
      <div className={styles.topLeft}>
        <button className={styles.toggleBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <Icon icon="carbon:close-outline" className="w-5 h-5" /> : <Icon icon="carbon:menu" className="w-5 h-5" />}
        </button>
        <div>
          <h1 className={styles.pageTitle}>{pageTitle}</h1>
          <p className={styles.pageMeta}>
            {pageCrumb} | {todayLabel}
          </p>
        </div>
      </div>

      <div className={styles.topRight} style={{ position: "relative" }}>
        <div
          className="w-[280px] cursor-pointer"
          onClick={() => setShowSearchCmd(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setShowSearchCmd(true)}
        >
          <Input
            size="sm"
            leftIcon="carbon:search"
            placeholder="Search anything... (/)"
            readOnly
            className="cursor-pointer pointer-events-none"
          />
        </div>

        {headerActions && <div className={styles.headerActions}>{headerActions}</div>}

        <div style={{ position: "relative" }}>
          <button
            className={styles.topIconBtn}
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Icon icon="carbon:sun" className="w-5 h-5" />
            ) : (
              <Icon icon="carbon:moon" className="w-5 h-5" />
            )}
          </button>
        </div>
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
            <Icon icon="carbon:notification" className="w-5 h-5" />
            {unreadCount > 0 && (
              <Badge
                variant="danger"
                size="sm"
                pill
                className="!absolute -top-1 -right-1 !h-4 !min-w-[16px] !px-1 !text-[10px] !leading-none flex items-center justify-center font-bold"
              >
                {unreadCount}
              </Badge>
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
