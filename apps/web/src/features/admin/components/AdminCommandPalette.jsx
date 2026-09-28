import React from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import { Input, Badge } from "@/shared/ui";
import { NAV_ITEMS } from "../constants/adminNav.constants";
import { fadeInVariants, modalScaleVariants } from "@/shared/constants/motion.constants";

export default function AdminCommandPalette({
  showSearchCmd,
  setShowSearchCmd,
  searchQuery,
  setSearchQuery,
  navigate,
}) {
  const filteredNavs = NAV_ITEMS.filter((n) =>
    n.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {showSearchCmd && (
        <Motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-[var(--z-modal,1300)] flex items-start justify-center pt-24 px-4"
          onClick={() => setShowSearchCmd(false)}
        >
          <Motion.div
            variants={modalScaleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-lg bg-[var(--bg-card)] rounded-[var(--radius-admin,8px)] shadow-2xl border border-[var(--border-subtle)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 border-b border-[var(--border-subtle)] flex items-center gap-2">
              <div className="flex-1">
                <Input
                  type="text"
                  size="md"
                  leftIcon="solar:magnifer-linear"
                  placeholder="Type a command or page name..."
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Badge
                variant="neutral"
                size="sm"
                className="font-mono text-xs cursor-pointer select-none"
                onClick={() => setShowSearchCmd(false)}
              >
                ESC
              </Badge>
            </div>

            <div className="p-3 max-h-80 overflow-y-auto">
              <div className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider px-2.5 py-1.5">
                Navigation Shortcuts
              </div>

              {filteredNavs.length === 0 ? (
                <div className="p-6 text-center text-[var(--text-muted)] text-sm">
                  No matching pages found for "{searchQuery}"
                </div>
              ) : (
                filteredNavs.map((n) => {
                  const iconName = typeof n.icon === "string" ? n.icon : "solar:box-minimalistic-bold";
                  return (
                    <button
                      key={n.path}
                      type="button"
                      onClick={() => {
                        navigate(n.path);
                        setShowSearchCmd(false);
                        setSearchQuery("");
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-[var(--radius-admin,8px)] bg-transparent hover:bg-[var(--bg-surface-secondary)] cursor-pointer text-left transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon icon={iconName} className="w-5 h-5 text-[var(--text-secondary)]" />
                        <span className="text-sm font-semibold text-[var(--text-primary)]">
                          {n.label}
                        </span>
                      </div>
                      <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4 text-[var(--text-muted)]" />
                    </button>
                  );
                })
              )}
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
