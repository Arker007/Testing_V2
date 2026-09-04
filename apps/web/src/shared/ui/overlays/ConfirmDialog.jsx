import React from "react";
import Modal from "./Modal";
import Button from "../buttons/Button";
import IconBox from "../data-display/IconBox";

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
  const iconMap = {
    danger: "solar:trash-bin-trash-bold",
    warning: "solar:danger-triangle-bold",
    brand: "solar:info-square-bold",
  };

  const iconVariantMap = {
    danger: "subtle",
    warning: "subtle",
    brand: "brand",
  };

  const buttonVariantMap = {
    danger: "danger",
    warning: "warning",
    brand: "primary",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center p-2">
        <IconBox
          icon={iconMap[variant] || iconMap.danger}
          variant={iconVariantMap[variant] || "subtle"}
          size="xl"
          className="mb-4 text-rose-500"
        />
        <h3 className="text-lg font-bold text-[var(--text-primary)]">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed">
          {message}
        </p>

        <div className="flex items-center justify-center gap-3 mt-6 w-full">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={buttonVariantMap[variant] || "danger"}
            onClick={onConfirm}
            loading={loading}
            className="flex-1"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
