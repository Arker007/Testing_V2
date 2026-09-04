import React, { useState, useCallback } from "react";
import { Icon } from "@iconify/react";
import { ToastContext } from "./useToast";

/**
 * Toast Provider wrapping application or layout to manage notification toasts.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const toast = {
    success: (msg, duration) => addToast(msg, "success", duration),
    error: (msg, duration) => addToast(msg, "error", duration),
    info: (msg, duration) => addToast(msg, "info", duration),
    warning: (msg, duration) => addToast(msg, "warning", duration),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function ToastItem({ toast, onClose }) {
  const icons = {
    success: "solar:check-circle-bold",
    error: "solar:danger-circle-bold",
    warning: "solar:danger-triangle-bold",
    info: "solar:info-square-bold",
  };

  const stylesMap = {
    success: "bg-emerald-900/90 border-emerald-700 text-emerald-100",
    error: "bg-rose-900/90 border-rose-700 text-rose-100",
    warning: "bg-amber-900/90 border-amber-700 text-amber-100",
    info: "bg-slate-900/90 border-slate-700 text-slate-100",
  };

  const iconColors = {
    success: "text-emerald-400",
    error: "text-rose-400",
    warning: "text-amber-400",
    info: "text-blue-400",
  };

  return (
    <div
      className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border shadow-xl backdrop-blur-md transition-all animate-in slide-in-from-bottom-5 duration-200 ${stylesMap[toast.type] || stylesMap.info}`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <Icon
          icon={icons[toast.type] || icons.info}
          className={`w-5 h-5 shrink-0 ${iconColors[toast.type] || iconColors.info}`}
        />
        <p className="text-xs sm:text-sm font-medium leading-snug truncate">
          {toast.message}
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors ml-2 cursor-pointer shrink-0"
        aria-label="Dismiss toast"
      >
        <Icon icon="solar:close-circle-linear" className="w-4 h-4" />
      </button>
    </div>
  );
}

export default ToastItem;
