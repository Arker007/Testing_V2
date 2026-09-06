import React, { useCallback, useEffect } from "react";
import { Icon } from "@iconify/react";
import styles from "../../admin/styles/AdminTable.module.css";
import cStyles from "../styles/SiteContent.module.css";
import { TimelineModalFields } from "./TimelineModalFields";
import { TeamModalFields } from "./TeamModalFields";

export default function ModalEditor({ modalItem, setModalItem, handleModalSave }) {
  const handleFieldChange = useCallback((field, value) => {
    setModalItem((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        data: { ...prev.data, [field]: value },
      };
    });
  }, [setModalItem]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setModalItem(null);
      }
    };
    if (modalItem) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalItem, setModalItem]);

  if (!modalItem) return null;

  const isTimeline = modalItem.type === "timeline";

  return (
    <div
      className={cStyles.modalOverlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) setModalItem(null);
      }}
    >
      <div className={cStyles.modalContainer}>
        <form onSubmit={handleModalSave}>
          <div className={cStyles.modalHeader}>
            <h4 className={cStyles.modalTitle}>
              <Icon
                icon={isTimeline ? "solar:calendar-date-bold" : "solar:user-bold"}
                className="w-5 h-5 text-emerald-600"
              />
              {isTimeline
                ? "Configure Milestone Entry"
                : "Configure Team Profile Details"}
            </h4>
            <button
              type="button"
              className={cStyles.modalCloseBtn}
              onClick={() => setModalItem(null)}
              title="Close modal (Esc)"
            >
              <Icon icon="solar:close-circle-linear" className="w-5 h-5" />
            </button>
          </div>

          <div className={cStyles.modalBody}>
            {isTimeline ? (
              <TimelineModalFields
                data={modalItem.data}
                onChange={handleFieldChange}
              />
            ) : (
              <TeamModalFields
                data={modalItem.data}
                onChange={handleFieldChange}
              />
            )}
          </div>

          <div className={cStyles.modalFooter}>
            <button
              type="button"
              className={styles.actionBtnSecondary}
              style={{ padding: "8px 16px" }}
              onClick={() => setModalItem(null)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.actionBtnPrimary}
              style={{ padding: "8px 20px" }}
            >
              Apply Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
