import React from "react";
import RichTextEditor from "../../../admin/components/RichTextEditor";
import styles from "../../../admin/components/AdminTable.module.css";

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
      <div className="form-group" style={{ gridColumn: "span 2" }}>
        <label
          className="form-label"
          style={{
            fontWeight: 600,
            fontSize: "13px",
            display: "block",
            marginBottom: "6px",
          }}
        >
          Product Name *
        </label>
        <input
          className="form-input"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #edf2f7",
          }}
          required
          value={form.name}
          onChange={f("name")}
          placeholder="Enter product name..."
        />
      </div>

      <div className="form-group" style={{ gridColumn: "span 1" }}>
        <label
          className="form-label"
          style={{
            fontWeight: 600,
            fontSize: "13px",
            display: "block",
            marginBottom: "6px",
          }}
        >
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
              borderRadius: "8px",
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
            <i
              className={`fa-solid fa-chevron-down ${
                catDropdownOpen ? styles.chevronOpen : ""
              }`}
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

      <div className="form-group" style={{ gridColumn: "span 1" }}>
        <label
          className="form-label"
          style={{
            fontWeight: 600,
            fontSize: "13px",
            display: "block",
            marginBottom: "6px",
          }}
        >
          Original Price (MRP)
        </label>
        <input
          className="form-input"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #edf2f7",
          }}
          value={form.oldPrice}
          onChange={(e) => handlePricingChange("oldPrice", e.target.value)}
          placeholder="e.g. 1500"
        />
      </div>

      <div className="form-group" style={{ gridColumn: "span 1" }}>
        <label
          className="form-label"
          style={{
            fontWeight: 600,
            fontSize: "13px",
            display: "block",
            marginBottom: "6px",
          }}
        >
          Discount (%)
        </label>
        <input
          className="form-input"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #edf2f7",
          }}
          value={form.discountRate}
          onChange={(e) => handlePricingChange("discountRate", e.target.value)}
          placeholder="e.g. 10"
        />
      </div>

      <div className="form-group" style={{ gridColumn: "span 1" }}>
        <label
          className="form-label"
          style={{
            fontWeight: 600,
            fontSize: "13px",
            display: "block",
            marginBottom: "6px",
          }}
        >
          Selling Price (Auto-Calculated)
        </label>
        <input
          className="form-input"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #edf2f7",
            background: "#f8fafc",
            color: "#64748b",
          }}
          disabled
          value={form.price}
        />
      </div>

      <div className="form-group" style={{ gridColumn: "1 / -1" }}>
        <label
          className="form-label"
          style={{
            fontWeight: 600,
            fontSize: "13px",
            display: "block",
            marginBottom: "6px",
          }}
        >
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
