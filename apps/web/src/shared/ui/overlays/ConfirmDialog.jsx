import React from "react";
import Modal from "./Modal";
import Button from "../buttons/Button";
import { Icon } from "@iconify/react";

/**
 * Reusable ConfirmDialog component for confirmation popups (e.g., delete actions).
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Visibility state
 * @param {() => void} props.onClose - Close callback
 * @param {() => void} props.onConfirm - Confirm action callback
 * @param {string} [props.title='Are you sure?'] - Dialog header title
 * @param {string} [props.message='This action cannot be undone.'] - Explanation message
 * @param {string} [props.confirmText='Confirm'] - Confirm button text
 * @param {string} [props.cancelText='Cancel'] - Cancel button text
 * @param {'danger' | 'warning' | 'brand'} [props.variant='danger'] - Action severity variant
 * @param {boolean} [props.loading=false] - Loading spinner state during confirm
 */
export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  loading = false,
}) {
  const variantConfig = {
    danger: {
      icon: "solar:trash-bin-trash-bold-duotone",
      iconBg: "bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400",
      btnVariant: "danger"
    },
    warning: {
      icon: "solar:danger-triangle-bold-duotone",
      iconBg: "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
      btnVariant: "warning"
    },
    brand: {
      icon: "solar:info-circle-bold-duotone",
      iconBg: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
      btnVariant: "primary"
    },
  };

  const config = variantConfig[variant] || variantConfig.danger;

  const handleClose = () => {
    if (!loading && onClose) onClose();
  };

  const footerContent = (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 w-full sm:w-auto">
      <Button
        type="button"
        variant="outline"
        onClick={handleClose}
        disabled={loading}
        className="w-full sm:w-auto"
        autoFocus
      >
        {cancelText}
      </Button>
      <Button
        type="button"
        variant={config.btnVariant}
        onClick={onConfirm}
        loading={loading}
        className="w-full sm:w-auto"
      >
        {confirmText}
      </Button>
    </div>
  );

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} 
      size="sm" 
      className="sm:max-w-[400px]"
      footer={footerContent}
      preventClose={loading}
    >
      <div className="flex flex-col sm:flex-row gap-4 p-1 sm:p-0">
        {/* Icon */}
        <div className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-full ${config.iconBg}`}>
          <Icon icon={config.icon} className="w-6 h-6" />
        </div>

        {/* Content */}
        <div className="flex-1 pt-1">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
            {title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </Modal>
  );
}
