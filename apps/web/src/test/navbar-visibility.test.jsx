import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../features/navigation/components/Navbar";
import { SiteContext } from "../shared/context/SiteContext";
import { ALL_SECTIONS_LIST } from "../features/content-management/constants/allSectionsList";
import { CMS_FIELDS } from "../features/content-management/constants/cmsFields.constants";
import { TAB_SECTIONS, SECTION_DISPLAY_NAMES } from "../features/content-management/constants/siteContent.constants";

function renderWithSiteContext(ui, cmsValue = {}) {
  const mockContext = {
    co: (key, fallback) => fallback || "",
    company: {},
    cms: cmsValue,
    mobileMenuOpen: false,
    setMobileMenuOpen: () => {},
    quickQuoteOpen: false,
    setQuickQuoteOpen: () => {},
    siteConfig: {},
  };

  return render(
    <MemoryRouter>
      <SiteContext.Provider value={mockContext}>
        {ui}
      </SiteContext.Provider>
    </MemoryRouter>
  );
}

describe("Navbar Page Visibility in Site Content CMS", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve([]),
      })
    ));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });
  it("includes Navbar Pages in content management constants", () => {
    const navbarSection = ALL_SECTIONS_LIST.find((s) => s.key === "Navbar Pages");
    expect(navbarSection).toBeDefined();
    expect(navbarSection.group).toBe("Navigation");

    expect(TAB_SECTIONS["Navigation"]).toContain("Navbar Pages");
    expect(SECTION_DISPLAY_NAMES["Navbar Pages"]).toBe("Navigation Bar Pages");

    const cmsGroup = CMS_FIELDS.find((g) => g.section === "Navbar Pages");
    expect(cmsGroup).toBeDefined();
    const fieldKeys = cmsGroup.fields.map((f) => f.key);
    expect(fieldKeys).toEqual(
      expect.arrayContaining([
        "nav_show_home",
        "nav_show_products",
        "nav_show_manufacturing",
        "nav_show_sustainability",
        "nav_show_about",
        "nav_show_contact",
      ])
    );
  });

  it("renders all navigation links by default when no toggles are disabled", () => {
    renderWithSiteContext(<Navbar />);

    expect(screen.getByRole("link", { name: /^home$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^manufacturing$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^sustainability$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^about$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^contact$/i })).toBeInTheDocument();
  });

  it("hides Manufacturing and Sustainability links when their toggles are set to '0'", () => {
    renderWithSiteContext(<Navbar />, {
      nav_show_manufacturing: "0",
      nav_show_sustainability: "0",
    });

    expect(screen.getByRole("link", { name: /^home$/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /^manufacturing$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /^sustainability$/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^about$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^contact$/i })).toBeInTheDocument();
  });

  it("hides Home, About, and Contact links when their toggles are set to '0'", () => {
    renderWithSiteContext(<Navbar />, {
      nav_show_home: "0",
      nav_show_about: "0",
      nav_show_contact: "0",
    });

    expect(screen.queryByRole("link", { name: /^home$/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^manufacturing$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^sustainability$/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /^about$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /^contact$/i })).not.toBeInTheDocument();
  });
});
