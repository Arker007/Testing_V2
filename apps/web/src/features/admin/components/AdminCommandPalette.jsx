import React from "react";
import { Icon } from "@iconify/react";
import { Input, Badge } from "@/shared/ui";
import { NAV_ITEMS } from "../constants/adminNav.constants";

export default function AdminCommandPalette({
  showSearchCmd,
  setShowSearchCmd,
  searchQuery,
  setSearchQuery,
  navigate,
}) {
  if (!showSearchCmd) return null;

  const filteredNavs = NAV_ITEMS.filter((n) =>
    n.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--bg-modal-backdrop, rgba(15, 20, 26, 0.6))",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "100px",
      }}
      onClick={() => setShowSearchCmd(false)}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "540px",
          background: "var(--bg-card)",
          borderRadius: "var(--radius-admin, 8px)",
          boxShadow: "0 25px 50px -12px var(--shadow-md)",
          border: "1px solid var(--line)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: "12px 16px",
            borderBottom: "1px solid var(--line)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div className="flex-1">
            <Input
              type="text"
              size="md"
              leftIcon="carbon:search"
              placeholder="Type a command or page name..."
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Badge variant="neutral" size="sm" className="font-mono text-xs cursor-pointer" onClick={() => setShowSearchCmd(false)}>
            ESC
          </Badge>
        </div>

        <div style={{ padding: "12px", maxHeight: "320px", overflowY: "auto" }}>
          <div
            style={{
              fontSize: "0.7rem",
              fontWeight: 800,
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              padding: "6px 10px",
            }}
          >
            Navigation Shortcuts
          </div>

          {filteredNavs.length === 0 ? (
            <div
              style={{
                padding: "24px",
                textAlign: "center",
                color: "var(--text-muted)",
                fontSize: "0.85rem",
              }}
            >
              No matching pages found for "{searchQuery}"
            </div>
          ) : (
            filteredNavs.map((n) => {
              const iconName = typeof n.icon === "string" ? n.icon : "carbon:cube";
              return (
                <button
                  key={n.path}
                  onClick={() => {
                    navigate(n.path);
                    setShowSearchCmd(false);
                    setSearchQuery("");
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    borderRadius: "var(--radius-admin, 8px)",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.15s",
                  }}
                  className="hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <Icon icon={iconName} className="w-4.5 h-4.5 text-slate-600 dark:text-slate-300" />
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--ink)",
                      }}
                    >
                      {n.label}
                    </span>
                  </div>
                  <Icon icon="carbon:chevron-right" className="w-4 h-4 text-slate-400" />
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
