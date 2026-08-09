import React from "react";
import { Search, ChevronRight } from "lucide-react";
import { NAV_ITEMS } from "./adminNav.constants";

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
        background: "rgba(15, 23, 42, 0.4)",
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
          background: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          border: "1px solid var(--line)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: "16px",
            borderBottom: "1px solid var(--line)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Search size={20} className="text-slate-400" />
          <input
            type="text"
            placeholder="Type a command or page name..."
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: "1rem",
              fontWeight: 500,
              color: "var(--ink)",
            }}
          />
          <kbd
            style={{
              fontSize: "0.68rem",
              fontWeight: 700,
              background: "#F1F5F9",
              color: "#475569",
              padding: "2px 6px",
              borderRadius: "4px",
              border: "1px solid #E2E8F0",
            }}
          >
            ESC
          </kbd>
        </div>

        <div style={{ padding: "12px", maxHeight: "320px", overflowY: "auto" }}>
          <div
            style={{
              fontSize: "0.7rem",
              fontWeight: 800,
              color: "#94A3B8",
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
                color: "#64748B",
                fontSize: "0.85rem",
              }}
            >
              No matching pages found for "{searchQuery}"
            </div>
          ) : (
            filteredNavs.map((n) => {
              const Icon = n.icon;
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
                    borderRadius: "8px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.15s",
                  }}
                  className="hover:bg-slate-100"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <Icon size={18} className="text-slate-600" />
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
                  <ChevronRight size={16} className="text-slate-400" />
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
