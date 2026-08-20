import React from "react";

export default function TeamFormFields({ data, onChange }) {
  return (
    <>
      <div className="form-group">
        <label
          className="form-label"
          style={{ fontWeight: 600, fontSize: "13px" }}
        >
          Full Representative Name *
        </label>
        <input
          className="form-input"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid var(--gray-200)",
          }}
          required
          value={data.name || ""}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="e.g. John Doe"
        />
      </div>
      <div className="form-group">
        <label
          className="form-label"
          style={{ fontWeight: 600, fontSize: "13px" }}
        >
          Functional Role Title *
        </label>
        <input
          className="form-input"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid var(--gray-200)",
          }}
          required
          value={data.role || ""}
          onChange={(e) => onChange("role", e.target.value)}
          placeholder="e.g. Senior Polymer Analyst"
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
        }}
      >
        <div className="form-group">
          <label
            className="form-label"
            style={{ fontWeight: 600, fontSize: "13px" }}
          >
            Avatar Initials *
          </label>
          <input
            className="form-input"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid var(--gray-200)",
            }}
            required
            value={data.init || ""}
            onChange={(e) =>
              onChange("init", e.target.value.toUpperCase().slice(0, 2))
            }
            placeholder="e.g. JD"
          />
        </div>
        <div className="form-group">
          <label
            className="form-label"
            style={{ fontWeight: 600, fontSize: "13px" }}
          >
            Graphic Color (Hex) *
          </label>
          <input
            className="form-input"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid var(--gray-200)",
            }}
            required
            value={data.color || ""}
            onChange={(e) => onChange("color", e.target.value)}
            placeholder="e.g. var(--brand)"
          />
        </div>
      </div>
    </>
  );
}
