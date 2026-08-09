import React, { useCallback } from "react";
import styles from "../admin/components/AdminTable.module.css";
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
          background: "#ffffff",
          borderRadius: "16px",
          border: "1px solid rgba(5, 40, 63, 0.1)",
          width: "100%",
          maxWidth: "480px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
          overflow: "hidden",
        }}
      >
        <form onSubmit={handleModalSave}>
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid rgba(5, 40, 63, 0.06)",
              display: "flex",
              justifyItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h4
              style={{
                margin: 0,
                fontSize: "1rem",
                fontWeight: 800,
                color: "var(--ink)",
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
                color: "var(--muted)",
                cursor: "pointer",
              }}
            >
              <i className="fa-solid fa-xmark" />
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
              background: "#fbfdff",
              borderTop: "1px solid rgba(5, 40, 63, 0.06)",
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
