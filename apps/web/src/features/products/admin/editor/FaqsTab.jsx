import React from "react";
import { Icon } from "@iconify/react";
import styles from "../../../admin/styles/AdminTable.module.css";

export default function FaqsTab({ form, setForm }) {
  return (
    <div>
      <div className={styles.formSectionTitle} style={{ marginTop: 0 }}>
        <Icon icon="solar:question-circle-linear" className="w-4 h-4 mr-1 inline" /> Product FAQs
      </div>
      <p
        style={{
          fontSize: "0.78rem",
          color: "var(--muted)",
          marginBottom: "16px",
        }}
      >
        Provide answers to these standard questions to display on the website
        product page.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {form.faqs.map((faq, idx) => (
          <div
            key={idx}
            style={{
              borderBottom: "1px solid var(--border-subtle)",
              paddingBottom: "20px",
            }}
          >
            <div className="form-group" style={{ marginBottom: "10px" }}>
              <label
                className="form-label"
                style={{
                  fontWeight: 700,
                  fontSize: "13px",
                  display: "block",
                  color: "var(--ink)",
                  marginBottom: "6px",
                }}
              >
                Question {idx + 1}:
              </label>
              <input
                className="form-input"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "var(--radius-admin, 8px)",
                  border: "1px solid var(--border-default)",
                  fontWeight: 600,
                  background: "var(--bg-surface)",
                  color: "var(--text-primary)",
                }}
                value={faq.question}
                onChange={(e) =>
                  setForm((prev) => {
                    const copy = [...prev.faqs];
                    copy[idx] = { ...copy[idx], question: e.target.value };
                    return { ...prev, faqs: copy };
                  })
                }
              />
            </div>
            <div className="form-group">
              <label
                className="form-label"
                style={{
                  fontWeight: 600,
                  fontSize: "12px",
                  display: "block",
                  color: "var(--muted)",
                  marginBottom: "4px",
                }}
              >
                Answer:
              </label>
              <textarea
                className="form-textarea"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "var(--radius-admin, 8px)",
                  border: "1px solid var(--border-default)",
                  background: "var(--bg-surface)",
                  color: "var(--text-primary)",
                  fontFamily: "inherit",
                }}
                rows={2}
                value={faq.answer}
                onChange={(e) =>
                  setForm((prev) => {
                    const copy = [...prev.faqs];
                    copy[idx] = { ...copy[idx], answer: e.target.value };
                    return { ...prev, faqs: copy };
                  })
                }
                placeholder="Enter FAQ answer..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
