import React from "react";
import styles from "../../../admin/components/AdminTable.module.css";

export default function ImagesTab({
  form,
  handleSingleImageReplace,
  handleImageUrlChange,
  handleDeleteImage,
  handleMakePrimary,
  handleImageUpload,
  handleAddBlankImage,
}) {
  return (
    <div>
      <div className={styles.formSectionTitle} style={{ marginTop: 0 }}>
        <i className="fa-solid fa-photo-film" /> Linked Product Images
      </div>
      <p
        style={{
          fontSize: "0.78rem",
          color: "var(--muted)",
          marginBottom: "20px",
        }}
      >
        Add local uploaded files, external URL fallbacks, or both. If either the
        local file or external URL is down or unavailable at runtime, the
        application automatically fails over to the other. The first image
        listed acts as the primary showcase image.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {form.images.map((imgItem, i) => {
          const displaySrc = imgItem.local || imgItem.url || "";
          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "16px",
                padding: "16px",
                border: "1px solid rgba(5, 40, 63, 0.08)",
                borderRadius: "12px",
                backgroundColor: "#fff",
                alignItems: "center",
                position: "relative",
              }}
            >
              {/* Thumbnail Preview */}
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: "#f8fafc",
                  border: "1px solid rgba(5, 40, 63, 0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                {displaySrc ? (
                  <img
                    src={displaySrc}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <i
                    className="fa-solid fa-image"
                    style={{ color: "#cbd5e1", fontSize: "1.5rem" }}
                  />
                )}
                {i === 0 && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: "var(--brand, #98d12a)",
                      color: "#fff",
                      fontSize: "9px",
                      fontWeight: "bold",
                      textAlign: "center",
                      padding: "2px 0",
                    }}
                  >
                    Primary
                  </span>
                )}
              </div>

              {/* Path & URL Inputs */}
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#64748b",
                      width: "95px",
                    }}
                  >
                    Local Upload:
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      color: imgItem.local ? "#1e293b" : "#94a3b8",
                      fontFamily: "monospace",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "280px",
                    }}
                  >
                    {imgItem.local ? imgItem.local.split("/").pop() : "None"}
                  </span>
                  <label
                    style={{
                      fontSize: "11px",
                      fontWeight: "bold",
                      color: "var(--brand, #98d12a)",
                      cursor: "pointer",
                      padding: "4px 8px",
                      border: "1px solid var(--brand, #98d12a)",
                      borderRadius: "4px",
                      backgroundColor: "transparent",
                      marginLeft: "auto",
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSingleImageReplace(e, i)}
                      style={{ display: "none" }}
                    />
                    {imgItem.local ? "Replace File" : "Upload File"}
                  </label>
                </div>

                <div
                  style={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#64748b",
                      width: "95px",
                    }}
                  >
                    External URL:
                  </span>
                  <input
                    type="text"
                    placeholder="Enter external/direct URL (e.g. https://...)"
                    value={imgItem.url || ""}
                    onChange={(e) => handleImageUrlChange(e.target.value, i)}
                    style={{
                      flexGrow: 1,
                      padding: "6px 12px",
                      borderRadius: "6px",
                      border: "1px solid #e2e8f0",
                      fontSize: "13px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  flexShrink: 0,
                  marginLeft: "12px",
                }}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteImage(i)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#ef4444",
                    cursor: "pointer",
                    padding: "4px 8px",
                    fontSize: "14px",
                  }}
                  title="Delete Image Slot"
                >
                  <i className="fa-solid fa-trash-can" />
                </button>
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => handleMakePrimary(i)}
                    style={{
                      backgroundColor: "#f1f5f9",
                      border: "none",
                      color: "#475569",
                      borderRadius: "4px",
                      padding: "4px 8px",
                      fontSize: "11px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Set Primary
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action row to add brand-new slots */}
      <div style={{ display: "flex", gap: "12px" }}>
        <label
          className={styles.actionBtnSecondary}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <i className="fa-solid fa-cloud-arrow-up" /> Upload Multiple Images
        </label>
        <button
          type="button"
          className={styles.actionBtnSecondary}
          style={{
            padding: "8px 16px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
          onClick={handleAddBlankImage}
        >
          <i className="fa-solid fa-link" /> Add External Image URL Only
        </button>
      </div>
    </div>
  );
}
