import React from "react";
import { Icon } from "@iconify/react";
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
        <Icon icon="solar:gallery-linear" className="w-4 h-4 mr-1 inline" /> Linked Product Images
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
                border: "1px solid var(--border)",
                borderRadius: "12px",
                backgroundColor: "var(--bg-card)",
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
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border)",
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
                  <Icon
                    icon="solar:gallery-linear"
                    className="w-6 h-6 text-slate-400"
                  />
                )}
                {i === 0 && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: "var(--brand)",
                      color: "var(--white)",
                      fontSize: "0.625rem",
                      fontWeight: 700,
                      textAlign: "center",
                      padding: "2px 0",
                      textTransform: "uppercase",
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
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      width: "95px",
                    }}
                  >
                    Local Upload:
                  </span>
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      color: imgItem.local ? "var(--text-primary)" : "var(--text-muted)",
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
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      color: "var(--brand-dark)",
                      cursor: "pointer",
                      padding: "4px 8px",
                      border: "1px solid var(--brand-border)",
                      borderRadius: "6px",
                      backgroundColor: "var(--brand-glow-subtle)",
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
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--text-muted)",
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
                    className={styles.formInput}
                    style={{
                      flexGrow: 1,
                      padding: "6px 12px",
                      fontSize: "0.8125rem",
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
                  className={styles.delBtn}
                  title="Delete Image Slot"
                >
                  <Icon icon="solar:trash-bin-trash-linear" className="w-4 h-4" />
                </button>
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => handleMakePrimary(i)}
                    className={styles.actionBtnSecondary}
                    style={{
                      height: "28px",
                      padding: "0 10px",
                      fontSize: "0.6875rem",
                      fontWeight: 700,
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
          <Icon icon="solar:upload-track-linear" className="w-4 h-4" /> Upload Multiple Images
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
          <Icon icon="solar:link-linear" className="w-4 h-4" /> Add External Image URL Only
        </button>
      </div>
    </div>
  );
}
