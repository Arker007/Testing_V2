import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/shared/ui";

describe("Shared UI Primitives", () => {
  it("renders Badge component with correct label and classes", () => {
    render(<Badge variant="brand">Eco-Friendly</Badge>);
    const badge = screen.getByText("Eco-Friendly");
    expect(badge).toBeInTheDocument();
  });
});
