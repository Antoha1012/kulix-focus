import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchJson } from "../fetch-json";

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("fetchJson utility function", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("successful responses", () => {
		it("should return parsed JSON for successful response", async () => {
			const mockData = { message: "Success", data: [1, 2, 3] };
			const mockResponse = {
				ok: true,
				status: 200,
				json: vi.fn().mockResolvedValue(mockData),
			};

			mockFetch.mockResolvedValue(mockResponse);

			const result = await fetchJson<typeof mockData>("/api/test");

			expect(result).toEqual(mockData);
			expect(mockFetch).toHaveBeenCalledWith("/api/test", undefined);
			expect(mockResponse.json).toHaveBeenCalled();
		});

		it("should handle different response types", async () => {
			const mockData = "Simple string response";
			const mockResponse = {
				ok: true,
				status: 200,
				json: vi.fn().mockResolvedValue(mockData),
			};

			mockFetch.mockResolvedValue(mockResponse);

			const result = await fetchJson<string>("/api/test");

			expect(result).toBe(mockData);
		});

		it("should handle array responses", async () => {
			const mockData = [
				{ id: 1, name: "Item 1" },
				{ id: 2, name: "Item 2" },
			];
			const mockResponse = {
				ok: true,
				status: 200,
				json: vi.fn().mockResolvedValue(mockData),
			};

			mockFetch.mockResolvedValue(mockResponse);

			const result = await fetchJson<typeof mockData>("/api/items");

			expect(result).toEqual(mockData);
		});

		it("should pass RequestInit options", async () => {
			const mockData = { success: true };
			const mockResponse = {
				ok: true,
				status: 200,
				json: vi.fn().mockResolvedValue(mockData),
			};

			mockFetch.mockResolvedValue(mockResponse);

			const options: RequestInit = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ test: "data" }),
			};

			await fetchJson("/api/test", options);

			expect(mockFetch).toHaveBeenCalledWith("/api/test", options);
		});
	});

	describe("error responses", () => {
		it("should throw error for 400 status", async () => {
			const mockErrorData = { error: { message: "Bad Request" } };
			const mockResponse = {
				ok: false,
				status: 400,
				statusText: "Bad Request",
				json: vi.fn().mockResolvedValue(mockErrorData),
			};

			mockFetch.mockResolvedValue(mockResponse);

			await expect(fetchJson("/api/test")).rejects.toThrow("Bad Request");
		});

		it("should throw error for 404 status", async () => {
			const mockErrorData = { error: { message: "Not Found" } };
			const mockResponse = {
				ok: false,
				status: 404,
				statusText: "Not Found",
				json: vi.fn().mockResolvedValue(mockErrorData),
			};

			mockFetch.mockResolvedValue(mockResponse);

			await expect(fetchJson("/api/test")).rejects.toThrow("Not Found");
		});

		it("should throw error for 500 status", async () => {
			const mockErrorData = {
				error: { message: "Internal Server Error" },
			};
			const mockResponse = {
				ok: false,
				status: 500,
				statusText: "Internal Server Error",
				json: vi.fn().mockResolvedValue(mockErrorData),
			};

			mockFetch.mockResolvedValue(mockResponse);

			await expect(fetchJson("/api/test")).rejects.toThrow(
				"Internal Server Error"
			);
		});

		it("should use statusText when error message is not available", async () => {
			const mockResponse = {
				ok: false,
				status: 403,
				statusText: "Forbidden",
				json: vi.fn().mockResolvedValue({}),
			};

			mockFetch.mockResolvedValue(mockResponse);

			await expect(fetchJson("/api/test")).rejects.toThrow("Forbidden");
		});

		it("should use fallback message when both error message and statusText are unavailable", async () => {
			const mockResponse = {
				ok: false,
				status: 418,
				statusText: "",
				json: vi.fn().mockResolvedValue({}),
			};

			mockFetch.mockResolvedValue(mockResponse);

			await expect(fetchJson("/api/test")).rejects.toThrow(
				"Request failed"
			);
		});
	});

	describe("JSON parsing errors", () => {
		it("should handle invalid JSON response", async () => {
			const mockResponse = {
				ok: true,
				status: 200,
				json: vi.fn().mockRejectedValue(new Error("Invalid JSON")),
			};

			mockFetch.mockResolvedValue(mockResponse);

			const result = await fetchJson("/api/test");

			expect(result).toEqual({});
		});

		it("should handle JSON parsing error in error response", async () => {
			const mockResponse = {
				ok: false,
				status: 400,
				statusText: "Bad Request",
				json: vi.fn().mockRejectedValue(new Error("Invalid JSON")),
			};

			mockFetch.mockResolvedValue(mockResponse);

			await expect(fetchJson("/api/test")).rejects.toThrow("Bad Request");
		});
	});

	describe("network errors", () => {
		it("should propagate network errors", async () => {
			const networkError = new Error("Network error");
			mockFetch.mockRejectedValue(networkError);

			await expect(fetchJson("/api/test")).rejects.toThrow(
				"Network error"
			);
		});

		it("should handle timeout errors", async () => {
			const timeoutError = new Error("Request timeout");
			mockFetch.mockRejectedValue(timeoutError);

			await expect(fetchJson("/api/test")).rejects.toThrow(
				"Request timeout"
			);
		});
	});

	describe("edge cases", () => {
		it("should handle empty response", async () => {
			const mockResponse = {
				ok: true,
				status: 200,
				json: vi.fn().mockResolvedValue(null),
			};

			mockFetch.mockResolvedValue(mockResponse);

			const result = await fetchJson("/api/test");

			expect(result).toBeNull();
		});

		it("should handle different URL types", async () => {
			const mockData = { success: true };
			const mockResponse = {
				ok: true,
				status: 200,
				json: vi.fn().mockResolvedValue(mockData),
			};

			mockFetch.mockResolvedValue(mockResponse);

			// Test with URL object
			const url = new URL("https://api.example.com/test");
			await fetchJson(url);

			expect(mockFetch).toHaveBeenCalledWith(url, undefined);
		});

		it("should handle Request object", async () => {
			const mockData = { success: true };
			const mockResponse = {
				ok: true,
				status: 200,
				json: vi.fn().mockResolvedValue(mockData),
			};

			mockFetch.mockResolvedValue(mockResponse);

			const request = new Request("https://api.example.com/test");
			await fetchJson(request);

			expect(mockFetch).toHaveBeenCalledWith(request, undefined);
		});
	});
});
