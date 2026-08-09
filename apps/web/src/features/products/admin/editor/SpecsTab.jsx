import React from "react";
import styles from "../../../admin/components/AdminTable.module.css";

export default function SpecsTab({
  form,
  setForm,
  filteredCatFields,
  handleFeatureDragStart,
  handleFeatureDragOver,
  handleFeatureDrop,
  draggedFeatureIndex,
}) {
  return (
    <div>
      <div className={styles.formSectionTitle} style={{ marginTop: 0 }}>
        <i className="fa-solid fa-gears" /> Category Specification Matrix
      </div>
      {filteredCatFields.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          {filteredCatFields.map((fld, idx) => (
            <div key={idx} className="form-group">
              <label
                className="form-label"
                style={{
                  fontWeight: 600,
                  fontSize: "13px",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                {fld.label || fld.name}
              </label>
              <input
                className="form-input"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #edf2f7",
                }}
                value={form.specifications[fld.name] || ""}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    specifications: {
                      ...prev.specifications,
                      [fld.name]: e.target.value,
                    },
                  }))
                }
                placeholder={
                  fld.placeholder ||
                  `e.g., enter ${fld.label || fld.name}...`
                }
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            background: "var(--bg-light)",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid rgba(5, 40, 63, 0.05)",
            color: "var(--muted)",
            fontSize: "0.8rem",
            marginBottom: "32px",
          }}
        >
          <i className="fa-solid fa-circle-info" /> Select a category tree
          directory on the Core Details tab to unlock product specification
          attributes.
        </div>
      )}

      <div className={styles.formSectionTitle}>
        <i className="fa-solid fa-list-check" /> Core Bullet Features
      </div>
      <p
        style={{
          fontSize: "0.78rem",
          color: "var(--muted)",
          marginBottom: "16px",
        }}
      >
        Add features that will render as high-priority bullet highlights in the
        B2B catalog.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {form.features.map((feat, idx) => (
          <div
            key={idx}
            draggable
            onDragStart={(e) => handleFeatureDragStart(e, idx)}
            onDragOver={handleFeatureDragOver}
            onDrop={(e) => handleFeatureDrop(e, idx)}
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              background:
                draggedFeatureIndex === idx
                  ? "rgba(244, 178, 24, 0.05)"
                  : "transparent",
              borderRadius: "8px",
              transition: "background 0.2s",
            }}
          >
            <div
              style={{
                cursor: "grab",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "42px",
                border: "1px solid #edf2f7",
                borderRadius: "8px",
                background: "#f8fafc",
                color: "#a0aec0",
              }}
              title="Drag to reorder"
            >
              <i className="fa-solid fa-grip-vertical" />
            </div>
            <input
              className="form-input"
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #edf2f7",
              }}
              value={feat}
              onChange={(e) =>
                setForm((prev) => {
                  const copy = [...prev.features];
                  copy[idx] = e.target.value;
                  return { ...prev, features: copy };
                })
              }
              placeholder="e.g. UV Stabilised polymer construction..."
            />
            <button
              type="button"
              className={styles.delBtn}
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  features: prev.features.filter((_, i) => i !== idx),
                }))
              }
            >
              <i className="fa-solid fa-trash" />
            </button>
          </div>
        ))}
        <button
          type="button"
          className={styles.actionBtnSecondary}
          style={{ alignSelf: "flex-start", marginTop: "4px" }}
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              features: [...prev.features, ""],
            }))
          }
        >
          <i className="fa-solid fa-plus" /> Add Highlight Feature
        </button>
      </div>
    </div>
  );
}
