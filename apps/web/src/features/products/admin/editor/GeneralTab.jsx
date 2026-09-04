import React from "react";
import { Icon } from "@iconify/react";
import RichTextEditor from "../../../admin/components/RichTextEditor";
import styles from "../../../admin/styles/AdminTable.module.css";

export default function GeneralTab({
  form,
  setForm,
  categories,
  f,
  handlePricingChange,
  catDropdownOpen,
  setCatDropdownOpen,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "20px",
      }}
    >
      <div className={styles.formGroup} style={{ gridColumn: "span 2" }}>
        <label className={styles.formLabel}>
          Product Name *
        </label>
        <input
          className={styles.formInput}
          required
          value={form.name}
          onChange={f("name")}
          placeholder="Enter product name..."
        />
      </div>

      <div className={styles.formGroup} style={{ gridColumn: "span 1" }}>
        <label className={styles.formLabel}>
          Product Category *
        </label>
        <div
          className={styles.customSelectContainer}
          style={{ width: "100%" }}
        >
          <button
            type="button"
            className={styles.customSelectTrigger}
            onClick={(e) => {
              e.stopPropagation();
              setCatDropdownOpen(!catDropdownOpen);
            }}
            style={{
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <span>
              {form.category
                ? categories.find(
                    (c) => String(c.id) === String(form.category)
                  )?.name || "Select Category"
                : "Select Category"}
            </span>
            <Icon
              icon="solar:alt-arrow-down-linear"
              className={`${catDropdownOpen ? styles.chevronOpen : ""} w-4 h-4`}
            />
          </button>
          {catDropdownOpen && (
            <div
              className={styles.customSelectOptions}
              style={{ width: "100%", maxHeight: "240px", overflowY: "auto" }}
            >
              <div
                className={`${styles.customSelectOption} ${
                  !form.category ? styles.customSelectOptionActive : ""
                }`}
                onClick={() => {
                  setForm((prev) => ({ ...prev, category: "" }));
                  setCatDropdownOpen(false);
                }}
              >
                Select Category
              </div>
              {categories.map((c) => (
                <div
                  key={c.id}
                  className={`${styles.customSelectOption} ${
                    String(form.category) === String(c.id)
                      ? styles.customSelectOptionActive
                      : ""
                  }`}
                  onClick={() => {
                    setForm((prev) => ({ ...prev, category: String(c.id) }));
                    setCatDropdownOpen(false);
                  }}
                >
                  {c.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.formGroup} style={{ gridColumn: "span 1" }}>
        <label className={styles.formLabel}>
          Original Price (MRP)
        </label>
        <input
          className={styles.formInput}
          value={form.oldPrice}
          onChange={(e) => handlePricingChange("oldPrice", e.target.value)}
          placeholder="e.g. 1500"
        />
      </div>

      <div className={styles.formGroup} style={{ gridColumn: "span 1" }}>
        <label className={styles.formLabel}>
          Discount (%)
        </label>
        <input
          className={styles.formInput}
          value={form.discountRate}
          onChange={(e) => handlePricingChange("discountRate", e.target.value)}
          placeholder="e.g. 10"
        />
      </div>

      <div className={styles.formGroup} style={{ gridColumn: "span 1" }}>
        <label className={styles.formLabel}>
          Selling Price (Auto-Calculated)
        </label>
        <input
          className={styles.formInput}
          disabled
          value={form.price}
        />
      </div>

      <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
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
