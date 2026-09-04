import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/AdminLayout.module.css";
import { Icon } from "@iconify/react";
import { NAV_ITEMS } from "../constants/adminNav.constants";

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
              <Icon icon="solar:bolt-linear" className="w-5 h-5 text-white" />
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
            const iconName = typeof n.icon === "string" ? n.icon : "solar:box-minimalistic-linear";
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
                  icon={iconName}
                  className={`${styles.navIcon} w-4.5 h-4.5`}
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
          <Icon icon="solar:global-linear" className={`${styles.navIcon} w-4.5 h-4.5`} />
          {sidebarOpen && <span>View Website</span>}
        </a>
        <button
          className={`${styles.navItem} ${styles.logout}`}
          title="Logout"
          data-label="Logout"
          onClick={logout}
        >
          <Icon icon="solar:logout-2-linear" className={`${styles.navIcon} w-4.5 h-4.5`} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
