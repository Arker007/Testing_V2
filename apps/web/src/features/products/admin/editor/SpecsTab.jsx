import React from "react";
import { Icon } from "@iconify/react";
import { Input, Button, Alert } from "@/shared/ui";
import styles from "../../../admin/styles/AdminTable.module.css";

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
        <Icon icon="carbon:settings" className="w-4 h-4 mr-1 inline" /> Category Specification Matrix
      </div>
      {filteredCatFields.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {filteredCatFields.map((fld, idx) => (
            <div key={idx}>
              <Input
                label={fld.label || fld.name}
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
        <div className="mb-8">
          <Alert variant="info">
            Select a category directory on the Core Details tab to enable product specification attributes.
          </Alert>
        </div>
      )}

      <div className={styles.formSectionTitle}>
        <Icon icon="carbon:list-checked" className="w-4 h-4 mr-1 inline" /> Core Bullet Features
      </div>
      <p
        style={{
          fontSize: "0.8125rem",
          color: "var(--text-muted)",
          marginBottom: "16px",
        }}
      >
        Add features that will render as high-priority bullet highlights in the
        B2B catalog.
      </p>

      <div className="flex flex-col gap-3">
        {form.features.map((feat, idx) => (
          <div
            key={idx}
            draggable
            onDragStart={(e) => handleFeatureDragStart(e, idx)}
            onDragOver={handleFeatureDragOver}
            onDrop={(e) => handleFeatureDrop(e, idx)}
            className={`flex gap-2.5 items-center rounded-lg transition-colors ${
              draggedFeatureIndex === idx ? "bg-[var(--warning-bg)]" : ""
            }`}
          >
            <div
              className="cursor-grab flex items-center justify-center w-9 h-10 border border-[var(--border)] rounded-lg bg-[var(--bg-surface)] text-[var(--text-muted)] shrink-0"
              title="Drag to reorder"
            >
              <Icon icon="carbon:menu" className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <Input
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
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="!p-1.5 !h-auto text-rose-500 hover:text-rose-700 hover:bg-rose-500/10 rounded-lg shrink-0"
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  features: prev.features.filter((_, i) => i !== idx),
                }))
              }
              title="Remove Feature"
            >
              <Icon icon="carbon:trash-can" className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <div className="pt-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={<Icon icon="carbon:add-alt" className="w-4 h-4 mr-1.5" />}
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                features: [...prev.features, ""],
              }))
            }
          >
            Add Highlight Feature
          </Button>
        </div>
      </div>
    </div>
  );
}
