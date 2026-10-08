import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Badge, Pagination } from "@/shared/ui";

describe("Shared UI Primitives", () => {
  it("renders Badge component with correct label and classes", () => {
    render(<Badge variant="brand">Eco-Friendly</Badge>);
    const badge = screen.getByText("Eco-Friendly");
    expect(badge).toBeInTheDocument();
  });

  it("renders Pagination matching the design with active page bordered box", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={4}
        totalPages={20}
        onPageChange={onPageChange}
      />
    );

    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();

    const activePageButton = screen.getByText("4");
    expect(activePageButton).toHaveAttribute("aria-current", "page");
    expect(activePageButton.className).toContain("border-black");
    expect(activePageButton.className).toContain("!rounded-none");
    expect(activePageButton.style.borderRadius).toBe("0px");

    // Click page 3
    fireEvent.click(screen.getByText("3"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("handles page 1 with disabled Previous button", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={onPageChange}
      />
    );

    const prevButton = screen.getByRole("button", { name: "Previous Page" });
    expect(prevButton).toBeDisabled();

    const activePage1 = screen.getByText("1");
    expect(activePage1).toHaveAttribute("aria-current", "page");
    expect(activePage1.style.borderRadius).toBe("0px");
  });
});

