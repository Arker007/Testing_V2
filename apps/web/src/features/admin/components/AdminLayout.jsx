import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSite } from "../../../shared/context/SiteContext";
import styles from "./AdminLayout.module.css";
import AdminSidebar from "./AdminSidebar";
import AdminTopBar from "./AdminTopBar";
import AdminCommandPalette from "./AdminCommandPalette";

const MOBILE_BREAKPOINT = 900;

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: "New Enterprise Inquiry",
    body: "Special request for recycled polypropylene from PolymerTech Ltd.",
    time: "5m ago",
    type: "inquiry",
    read: false,
  },
  {
    id: 2,
    title: "Database Sync Alert",
    body: "Registry index backfilled successfully with 0 latency issues.",
    time: "1h ago",
    type: "sync",
    read: false,
  },
  {
    id: 3,
    title: "Lumber Category Updated",
    body: "Catalog products updated under 'Plastic Lumber'.",
    time: "3h ago",
    type: "catalog",
    read: false,
  },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth > MOBILE_BREAKPOINT : true
  );
  const [headerActions, setHeaderActions] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showSearchCmd, setShowSearchCmd] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [unreadCount, setUnreadCount] = useState(3);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { co } = useSite();
  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        navigate("/admin/login", { replace: true });
        return;
      }
      try {
        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          localStorage.removeItem("admin_token");
          navigate("/admin/login", { replace: true });
          return;
        }
      } catch {
        localStorage.removeItem("admin_token");
        navigate("/admin/login", { replace: true });
        return;
      } finally {
        setCheckingAuth(false);
      }
    };
    verifyToken();
  }, [token, navigate]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearchCmd((prev) => !prev);
      }
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
        e.preventDefault();
        setShowSearchCmd(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const logout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login", { replace: true });
  };

  if (checkingAuth) {
    return (
      <div className={styles.loadingScreen}>
        <Icon icon="solar:restart-linear" className="w-5 h-5 animate-spin inline mr-2" /> Verifying Authentication...
      </div>
    );
  }

  const isMobile = typeof window !== "undefined" && window.innerWidth <= MOBILE_BREAKPOINT;

  const pageTitle =
    pathname === "/admin/dashboard"
      ? "Overview Dashboard"
      : pathname === "/admin/products"
      ? "Product Inventory"
      : pathname === "/admin/categories"
      ? "Categories Manager"
      : pathname === "/admin/inquiries"
      ? "Lead Inquiries"
      : pathname === "/admin/content"
      ? "CMS Content Management"
      : pathname === "/admin/catalog"
      ? "Interactive Catalog Builder"
      : pathname === "/admin/settings"
      ? "System Settings"
      : "Admin Portal";

  const pageCrumb = pathname.split("/").filter(Boolean).slice(-1)[0] || "admin";
  const todayLabel = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className={styles.shell}>
      {isMobile && sidebarOpen && (
        <button
          className={styles.backdrop}
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar Component */}
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        co={co}
        logout={logout}
        pathname={pathname}
      />

      {/* Primary Workspace Panel */}
      <div className={`${styles.main} ${!sidebarOpen ? styles.mainCollapsed : ""}`}>
        <AdminTopBar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          pageTitle={pageTitle}
          pageCrumb={pageCrumb}
          todayLabel={todayLabel}
          setShowSearchCmd={setShowSearchCmd}
          headerActions={headerActions}
          showNotifDropdown={showNotifDropdown}
          setShowNotifDropdown={setShowNotifDropdown}
          unreadCount={unreadCount}
          setUnreadCount={setUnreadCount}
          notifications={notifications}
          setNotifications={setNotifications}
          navigate={navigate}
        />

        {/* Command Palette Modal */}
        <AdminCommandPalette
          showSearchCmd={showSearchCmd}
          setShowSearchCmd={setShowSearchCmd}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          navigate={navigate}
        />

        <div className={styles.content}>
          <Outlet context={{ setHeaderActions }} />
        </div>
      </div>
    </div>
  );
}
