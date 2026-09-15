import React from "react";
import { Icon } from "@iconify/react";
import { Input, Button, Badge, OptimizedImage } from "@/shared/ui";
import styles from "../../../admin/styles/AdminTable.module.css";

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
        <Icon icon="carbon:image" className="w-4 h-4 mr-1 inline" /> Linked Product Images
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

      <div className="flex flex-col gap-4 mb-6">
        {form.images.map((imgItem, i) => {
          const displaySrc = imgItem.local || imgItem.url || "";
          return (
            <div
              key={i}
              className="flex flex-col sm:flex-row gap-4 p-4 border border-[var(--border)] rounded-lg bg-[var(--bg-surface)] items-start sm:items-center relative"
            >
              {/* Thumbnail Preview */}
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-[var(--bg-surface-secondary)] border border-[var(--border)] flex items-center justify-center relative shrink-0">
                {displaySrc ? (
                  <OptimizedImage
                    src={displaySrc}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Icon
                    icon="carbon:image"
                    className="w-6 h-6 text-slate-400"
                  />
                )}
                {i === 0 && (
                  <span className="absolute bottom-0 inset-x-0 bg-[var(--brand-primary)] text-white text-[10px] font-bold text-center py-0.5 uppercase tracking-wide">
                    Primary
                  </span>
                )}
              </div>

              {/* Path & URL Inputs */}
              <div className="flex-1 flex flex-col gap-2.5 w-full">
                <div className="flex gap-3 items-center">
                  <span className="text-xs font-semibold text-[var(--text-muted)] w-24 shrink-0">
                    Local Upload:
                  </span>
                  <span className="text-xs text-[var(--text-primary)] font-mono truncate max-w-[240px]">
                    {imgItem.local ? imgItem.local.split("/").pop() : "None"}
                  </span>
                  <label className="ml-auto cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSingleImageReplace(e, i)}
                      style={{ display: "none" }}
                    />
                    <span className="text-xs font-semibold px-2.5 py-1 rounded border border-[var(--border)] bg-[var(--bg-surface-secondary)] hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors">
                      {imgItem.local ? "Replace File" : "Upload File"}
                    </span>
                  </label>
                </div>

                <div className="flex gap-3 items-center">
                  <span className="text-xs font-semibold text-[var(--text-muted)] w-24 shrink-0">
                    External URL:
                  </span>
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Enter external/direct URL (e.g. https://...)"
                      value={imgItem.url || ""}
                      onChange={(e) => handleImageUrlChange(e.target.value, i)}
                    />
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex sm:flex-col gap-2 justify-center items-end shrink-0 sm:ml-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteImage(i)}
                  className="!p-1.5 !h-auto text-rose-500 hover:text-rose-700 hover:bg-rose-500/10 rounded-lg"
                  title="Delete Image Slot"
                >
                  <Icon icon="carbon:trash-can" className="w-4 h-4" />
                </Button>
                {i > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleMakePrimary(i)}
                    className="!text-xs !h-7 !px-2.5"
                  >
                    Set Primary
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action row to add brand-new slots */}
      <div className="flex flex-wrap gap-3">
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-secondary)] text-[var(--text-primary)] transition-colors shadow-sm">
            <Icon icon="carbon:upload" className="w-4 h-4" /> Upload Multiple Images
          </span>
        </label>
        <Button
          type="button"
          variant="outline"
          size="md"
          icon={<Icon icon="carbon:link" className="w-4 h-4 mr-1.5" />}
          onClick={handleAddBlankImage}
        >
          Add External Image URL Only
        </Button>
      </div>
    </div>
  );
}
