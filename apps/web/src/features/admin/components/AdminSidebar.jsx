import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./AdminLayout.module.css";
import { Globe, LogOut, Zap } from "lucide-react";
import { NAV_ITEMS } from "./adminNav.constants";

export default function AdminSidebar({
  sidebarOpen,
  co,
  logout,
}) {
  return (
    <aside
      className={`${styles.sidebar} ${
        !sidebarOpen ? styles.sidebarCollapsed : ""
      }`}
    >
      <div>
        <div className={styles.logo}>
          {co("logo") ? (
            <div className={styles.customLogo}>
              <img src={co("logo")} alt={co("name")} />
            </div>
          ) : (
            <div className={styles.logoIcon}>
              <Zap size={18} strokeWidth={2.5} />
            </div>
          )}
          {sidebarOpen && (
            <div>
              <div className={styles.logoName}>
                {co("name") || "VISHAL ENTERPRISE"}
              </div>
              <div className={styles.logoSub}>ADMIN PORTAL</div>
            </div>
          )}
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((n) => {
            const Icon = n.icon;
            return (
              <NavLink
                key={n.path}
                to={n.path}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.navActive : ""}`
                }
                title={n.label}
                data-label={n.label}
              >
                <Icon
                  className={styles.navIcon}
                  size={18}
                  strokeWidth={2.2}
                />
                {sidebarOpen && <span>{n.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className={styles.sideBottom}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.navItem}
          title="View Website"
          data-label="View Website"
        >
          <Globe className={styles.navIcon} size={18} strokeWidth={2.2} />
          {sidebarOpen && <span>View Website</span>}
        </a>
        <button
          className={`${styles.navItem} ${styles.logout}`}
          title="Logout"
          data-label="Logout"
          onClick={logout}
        >
          <LogOut className={styles.navIcon} size={18} strokeWidth={2.2} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
