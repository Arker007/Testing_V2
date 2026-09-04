import React, { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import Spinner from "../feedback/Spinner";

/**
 * Reusable FileUpload / DropZone component for image and document uploads.
 *
 * @param {Object} props
 * @param {string} [props.accept='image/*'] - File accept string
 * @param {boolean} [props.multiple=false] - Support multiple file selection
 * @param {(files: FileList | File[]) => void} props.onUpload - Upload handler callback
 * @param {boolean} [props.loading=false] - Loading spinner overlay state
 * @param {string} [props.label='Drag & drop files here or click to browse'] - Subtitle instruction
 * @param {string} [props.className=''] - Additional custom CSS classes
 */
export default function FileUpload({
  accept = "image/*",
  multiple = false,
  onUpload,
  loading = false,
  label = "Drag & drop files here or click to browse",
  className = "",
  ...props
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload?.(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload?.(e.target.files);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
        isDragging
          ? "border-[var(--brand-primary)] bg-[var(--brand-light)]/20 scale-[0.99]"
          : "border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--brand-primary)]/50 hover:bg-[var(--bg-surface-elevated)]"
      } ${loading ? "pointer-events-none opacity-80" : ""} ${className}`.trim()}
      {...props}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />

      {loading ? (
        <div className="flex flex-col items-center gap-2 py-2">
          <Spinner size="lg" label="Uploading assets..." />
        </div>
      ) : (
        <>
          <div className="w-12 h-12 rounded-2xl bg-[var(--brand-light)] text-[#1E622A] dark:text-[#6BBF54] border border-[var(--brand-border)] flex items-center justify-center mb-3">
            <Icon icon="solar:cloud-upload-linear" className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-[var(--text-primary)] text-center">
            Upload Files
          </p>
          <p className="text-xs text-[var(--text-muted)] text-center mt-1 max-w-xs">
            {label}
          </p>
        </>
      )}
    </div>
  );
}
