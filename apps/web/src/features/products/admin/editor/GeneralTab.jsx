import React from "react";
import RichTextEditor from "../../../admin/components/RichTextEditor";
import { Input, CustomSelect } from "@/shared/ui";
import styles from "../../../admin/styles/AdminTable.module.css";

export default function GeneralTab({
  form,
  setForm,
  categories,
  f,
  handlePricingChange,
}) {
  const categoryOptions = [
    { value: "", label: "Select Category" },
    ...categories.map((c) => ({ value: String(c.id), label: c.name })),
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="md:col-span-2">
        <Input
          label="Product Name *"
          required
          value={form.name}
          onChange={f("name")}
          placeholder="Enter product name..."
        />
      </div>

      <div className="md:col-span-1">
        <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
          Product Category *
        </label>
        <CustomSelect
          options={categoryOptions}
          value={String(form.category || "")}
          onChange={(val) => setForm((p) => ({ ...p, category: val }))}
          placeholder="Select Category"
        />
      </div>

      <div className="md:col-span-1">
        <Input
          label="Original Price (MRP)"
          value={form.oldPrice}
          onChange={(e) => handlePricingChange("oldPrice", e.target.value)}
          placeholder="e.g. 1500"
        />
      </div>

      <div className="md:col-span-1">
        <Input
          label="Discount (%)"
          value={form.discountRate}
          onChange={(e) => handlePricingChange("discountRate", e.target.value)}
          placeholder="e.g. 10"
        />
      </div>

      <div className="md:col-span-1">
        <Input
          label="Selling Price (Auto-Calculated)"
          disabled
          value={form.price}
        />
      </div>

      <div className="md:col-span-3">
        <label className={styles.formLabel}>
          Product Description
        </label>
        <RichTextEditor
          value={form.description}
          onChange={(html) => setForm((p) => ({ ...p, description: html }))}
        />
      </div>
    </div>
  );
}
