import { describe, it, expect, beforeEach, vi } from "vitest";
import api, { ApiError } from "../shared/api/client";

describe("API Client", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("attaches Authorization header when admin_token exists in localStorage", async () => {
    localStorage.setItem("admin_token", "test-token-xyz");

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ "content-type": "application/json" }),
      json: async () => ({ success: true }),
    });
    global.fetch = fetchMock;

    const result = await api.get("/test-endpoint");
    expect(result).toEqual({ success: true });
    expect(fetchMock).toHaveBeenCalled();
    const callHeaders = fetchMock.mock.calls[0][1].headers;
    expect(callHeaders.Authorization).toBe("Bearer test-token-xyz");
  });

  it("appends query params cleanly to URL", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ "content-type": "application/json" }),
      json: async () => ({ items: [] }),
    });
    global.fetch = fetchMock;

    await api.get("/products", { params: { category: "valves", page: 2 } });
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/products?category=valves&page=2",
      expect.objectContaining({ method: "GET" })
    );
  });

  it("throws ApiError with status and message when response is not ok", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
      headers: new Headers({ "content-type": "application/json" }),
      json: async () => ({ success: false, error: "Resource not found" }),
    });
    global.fetch = fetchMock;

    await expect(api.get("/missing")).rejects.toThrowError("Resource not found");
    try {
      await api.get("/missing");
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
      expect(err.statusCode).toBe(404);
    }
  });

  it("handles POST request with JSON body serialization", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ "content-type": "application/json" }),
      json: async () => ({ id: 123, status: "created" }),
    });
    global.fetch = fetchMock;

    const payload = { name: "Test Item", quantity: 5 };
    const result = await api.post("/items", payload);
    expect(result).toEqual({ id: 123, status: "created" });
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/items",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(payload),
        headers: expect.objectContaining({ "Content-Type": "application/json" }),
      })
    );
  });

  it("normalizes validation error details from API responses", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      statusText: "Bad Request",
      headers: new Headers({ "content-type": "application/json" }),
      json: async () => ({
        error: "Validation failed",
        details: [{ field: "email", message: "Invalid email" }],
      }),
    });
    global.fetch = fetchMock;

    try {
      await api.post("/submit", {});
      expect.fail("Should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
      expect(err.status).toBe(400);
      expect(err.message).toBe("Validation failed");
      expect(err.details).toEqual([{ field: "email", message: "Invalid email" }]);
    }
  });
});
