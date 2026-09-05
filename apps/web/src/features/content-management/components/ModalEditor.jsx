import React, { useCallback } from "react";
import { Icon } from "@iconify/react";
import styles from "../../admin/styles/AdminTable.module.css";
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

  if (!modalItem) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(5, 40, 63, 0.4)",
        backdropFilter: "blur(4px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "var(--surface-card)",
          borderRadius: "var(--radius-admin, 8px)",
          border: "1px solid var(--border)",
          width: "100%",
          maxWidth: "480px",
          boxShadow: "0 20px 40px var(--shadow-md)",
          overflow: "hidden",
        }}
      >
        <form onSubmit={handleModalSave}>
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h4
              style={{
                margin: 0,
                fontSize: "1rem",
                fontWeight: 800,
                color: "var(--text-primary)",
              }}
            >
              {modalItem.type === "timeline"
                ? "Configure Milestone Entry"
                : "Configure Team Profile Details"}
            </h4>
            <button
              type="button"
              onClick={() => setModalItem(null)}
              style={{
                border: "none",
                background: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
              }}
            >
              <Icon icon="solar:close-circle-linear" className="w-5 h-5" />
            </button>
          </div>

          <div
            style={{
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {modalItem.type === "timeline" ? (
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

          <div
            style={{
              padding: "16px 24px",
              background: "var(--gray-50)",
              borderTop: "1px solid var(--navy-subtle)",
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
            }}
          >
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
