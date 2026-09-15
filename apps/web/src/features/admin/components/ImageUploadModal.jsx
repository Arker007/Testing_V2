import React, { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { Modal, Button, Alert, Badge } from "@/shared/ui";

export default function ImageUploadModal({
  isOpen,
  onClose,
  onUploadSuccess,
  title = "Upload Media Asset",
  accept = "image/*",
  maxSizeMB = 10,
}) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const resetState = () => {
    setFile(null);
    setPreview("");
    setError("");
    setUploading(false);
    setDragOver(false);
  };

  const handleClose = () => {
    if (uploading) return;
    resetState();
    if (onClose) onClose();
  };

  const validateAndSetFile = (selectedFile) => {
    setError("");
    if (!selectedFile) return;

    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds limit of ${maxSizeMB}MB.`);
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    validateAndSetFile(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files?.[0];
    validateAndSetFile(dropped);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image file first.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("images", file);

      const token = localStorage.getItem("admin_token");
      const res = await fetch("/api/upload/images", {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to upload file.");
      }

      const uploadedUrl = data.images?.[0] || data.url || "";
      if (onUploadSuccess) {
        onUploadSuccess(uploadedUrl, data);
      }
      handleClose();
    } catch (err) {
      setError(err.message || "An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  const footer = (
    <div className="flex items-center justify-end gap-3 w-full">
      <Button
        type="button"
        variant="outline"
        size="md"
        onClick={handleClose}
        disabled={uploading}
      >
        Cancel
      </Button>
      <Button
        type="button"
        variant="primary"
        size="md"
        onClick={handleUpload}
        loading={uploading}
        loadingText="Uploading..."
        disabled={!file || uploading}
        icon={<Icon icon="carbon:upload" className="w-4 h-4 mr-1.5" />}
      >
        Upload Image
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      size="md"
      footer={footer}
      preventClose={uploading}
    >
      <div className="space-y-4">
        {error && (
          <Alert status="danger" variant="subtle" className="text-xs">
            {error}
          </Alert>
        )}

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
            dragOver
              ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]/5"
              : "border-[var(--border-subtle)] hover:border-[var(--brand-primary)] bg-[var(--bg-surface-secondary)]"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />

          {preview ? (
            <div className="space-y-3">
              <div className="relative inline-block max-h-48 max-w-full overflow-hidden rounded-md border border-[var(--border-subtle)]">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-44 object-contain mx-auto"
                />
              </div>
              <div className="flex items-center justify-center gap-2">
                <Badge variant="brand" size="sm">
                  {file.name}
                </Badge>
                <Badge variant="neutral" size="sm">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </Badge>
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                Click or drag another image to replace
              </p>
            </div>
          ) : (
            <div className="space-y-2 py-4">
              <div className="w-12 h-12 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center justify-center mx-auto mb-2">
                <Icon icon="carbon:cloud-upload" className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                Click to upload or drag & drop
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                Supports JPG, PNG, WebP up to {maxSizeMB}MB
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
