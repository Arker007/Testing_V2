import React from "react";
import { Icon } from "@iconify/react";
import { Input, Textarea } from "@/shared/ui";
import styles from "../../../admin/styles/AdminTable.module.css";

export default function FaqsTab({ form, setForm }) {
  return (
    <div>
      <div className={styles.formSectionTitle} style={{ marginTop: 0 }}>
        <Icon icon="carbon:help" className="w-4 h-4 mr-1 inline" /> Product FAQs
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

      <div className="flex flex-col gap-6">
        {form.faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border-b border-[var(--border-subtle)] pb-5 space-y-3"
          >
            <Input
              label={`Question ${idx + 1}:`}
              value={faq.question}
              onChange={(e) =>
                setForm((prev) => {
                  const copy = [...prev.faqs];
                  copy[idx] = { ...copy[idx], question: e.target.value };
                  return { ...prev, faqs: copy };
                })
              }
              placeholder="Enter FAQ question..."
            />
            <Textarea
              label="Answer:"
              rows={3}
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
        ))}
      </div>
    </div>
  );
}
