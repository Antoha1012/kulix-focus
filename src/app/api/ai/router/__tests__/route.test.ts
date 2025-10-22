import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "../route";
import { getProvider } from "@/lib/llm";

// Mock the LLM provider
vi.mock("@/lib/llm", () => ({
	getProvider: vi.fn(),
}));

const mockGetProvider = vi.mocked(getProvider);

describe("AI Router API", () => {
	const mockProvider = {
		write: vi.fn(),
		ideas: vi.fn(),
		focus: vi.fn(),
	};

	beforeEach(() => {
		vi.clearAllMocks();
		mockGetProvider.mockResolvedValue(mockProvider);
	});

	describe("POST /api/ai/router", () => {
		describe("write tool", () => {
			it("should handle write tool request successfully", async () => {
				const mockResponse = "Generated article content...";
				mockProvider.write.mockResolvedValue(mockResponse);

				const request = new NextRequest(
					"http://localhost/api/ai/router",
					{
						method: "POST",
						body: JSON.stringify({
							tool: "write",
							payload: {
								topic: "Productivity tips",
								tone: "professional",
								length: "medium",
							},
						}),
					}
				);

				const response = await POST(request);
				const data = await response.json();

				expect(response.status).toBe(200);
				expect(data).toEqual({
					ok: true,
					data: mockResponse,
				});
				expect(mockProvider.write).toHaveBeenCalledWith({
					topic: "Productivity tips",
					tone: "professional",
					length: "medium",
				});
			});

			it("should handle write tool with outline", async () => {
				const mockResponse = "Generated article with outline...";
				mockProvider.write.mockResolvedValue(mockResponse);

				const request = new NextRequest(
					"http://localhost/api/ai/router",
					{
						method: "POST",
						body: JSON.stringify({
							tool: "write",
							payload: {
								topic: "React patterns",
								tone: "academic",
								length: "long",
								outline: [
									"Introduction",
									"Hooks",
									"Context",
									"Conclusion",
								],
							},
						}),
					}
				);

				const response = await POST(request);
				const data = await response.json();

				expect(response.status).toBe(200);
				expect(data).toEqual({
					ok: true,
					data: mockResponse,
				});
				expect(mockProvider.write).toHaveBeenCalledWith({
					topic: "React patterns",
					tone: "academic",
					length: "long",
					outline: ["Introduction", "Hooks", "Context", "Conclusion"],
				});
			});

			it("should handle write tool validation errors", async () => {
				const request = new NextRequest(
					"http://localhost/api/ai/router",
					{
						method: "POST",
						body: JSON.stringify({
							tool: "write",
							payload: {
								// Missing required topic field
								tone: "professional",
								length: "medium",
							},
						}),
					}
				);

				const response = await POST(request);
				const data = await response.json();

				expect(response.status).toBe(400);
				expect(data).toEqual({
					ok: false,
					error: {
						code: "VALIDATION_OR_RUNTIME",
						message: expect.stringContaining("Required"),
					},
				});
			});
		});

		describe("ideas tool", () => {
			it("should handle ideas tool request successfully", async () => {
				const mockResponse = {
					items: [
						{ content: "Idea 1", tags: ["tag1", "tag2"] },
						{ content: "Idea 2", tags: ["tag3"] },
					],
				};
				mockProvider.ideas.mockResolvedValue(mockResponse);

				const request = new NextRequest(
					"http://localhost/api/ai/router",
					{
						method: "POST",
						body: JSON.stringify({
							tool: "ideas",
							payload: {
								topic: "Creative writing",
								count: 5,
								tags: ["writing", "creativity"],
							},
						}),
					}
				);

				const response = await POST(request);
				const data = await response.json();

				expect(response.status).toBe(200);
				expect(data).toEqual({
					ok: true,
					data: mockResponse,
				});
				expect(mockProvider.ideas).toHaveBeenCalledWith({
					topic: "Creative writing",
					count: 5,
					tags: ["writing", "creativity"],
				});
			});

			it("should handle ideas tool validation errors", async () => {
				const request = new NextRequest(
					"http://localhost/api/ai/router",
					{
						method: "POST",
						body: JSON.stringify({
							tool: "ideas",
							payload: {
								// Missing required topic field
								count: 5,
								tags: ["test"],
							},
						}),
					}
				);

				const response = await POST(request);
				const data = await response.json();

				expect(response.status).toBe(400);
				expect(data).toEqual({
					ok: false,
					error: {
						code: "VALIDATION_OR_RUNTIME",
						message: expect.stringContaining("Required"),
					},
				});
			});
		});

		describe("focus tool", () => {
			it("should handle focus tool request successfully", async () => {
				const mockResponse = {
					items: [
						{
							priority: "Complete project documentation",
							reason: "Important for team understanding",
							category: "work",
						},
						{
							priority: "Review code changes",
							reason: "Ensure quality before deployment",
							category: "work",
						},
					],
				};
				mockProvider.focus.mockResolvedValue(mockResponse);

				const request = new NextRequest(
					"http://localhost/api/ai/router",
					{
						method: "POST",
						body: JSON.stringify({
							tool: "focus",
							payload: {
								context: "Working on a new project",
								existingPriorities: ["existing task"],
								count: 3,
							},
						}),
					}
				);

				const response = await POST(request);
				const data = await response.json();

				expect(response.status).toBe(200);
				expect(data).toEqual({
					ok: true,
					data: mockResponse,
				});
				expect(mockProvider.focus).toHaveBeenCalledWith({
					context: "Working on a new project",
					existingPriorities: ["existing task"],
					count: 3,
				});
			});

			it("should handle focus tool validation errors", async () => {
				const request = new NextRequest(
					"http://localhost/api/ai/router",
					{
						method: "POST",
						body: JSON.stringify({
							tool: "focus",
							payload: {
								// Missing required context field
								existingPriorities: ["task"],
								count: 3,
							},
						}),
					}
				);

				const response = await POST(request);
				const data = await response.json();

				expect(response.status).toBe(400);
				expect(data).toEqual({
					ok: false,
					error: {
						code: "VALIDATION_OR_RUNTIME",
						message: expect.stringContaining("Required"),
					},
				});
			});
		});

		describe("invalid requests", () => {
			it("should handle invalid tool", async () => {
				const request = new NextRequest(
					"http://localhost/api/ai/router",
					{
						method: "POST",
						body: JSON.stringify({
							tool: "invalid-tool",
							payload: {},
						}),
					}
				);

				const response = await POST(request);
				const data = await response.json();

				expect(response.status).toBe(400);
				expect(data).toEqual({
					ok: false,
					error: {
						code: "VALIDATION_OR_RUNTIME",
						message: "Invalid request",
					},
				});
			});

			it("should handle invalid JSON", async () => {
				const request = new NextRequest(
					"http://localhost/api/ai/router",
					{
						method: "POST",
						body: "invalid json",
					}
				);

				const response = await POST(request);
				const data = await response.json();

				expect(response.status).toBe(500);
				expect(data).toEqual({
					ok: false,
					error: {
						code: "RUNTIME_ERROR",
						message: expect.stringContaining("not valid JSON"),
					},
				});
			});

			it("should handle missing tool field", async () => {
				const request = new NextRequest(
					"http://localhost/api/ai/router",
					{
						method: "POST",
						body: JSON.stringify({
							payload: { topic: "test" },
						}),
					}
				);

				const response = await POST(request);
				const data = await response.json();

				expect(response.status).toBe(400);
				expect(data).toEqual({
					ok: false,
					error: {
						code: "VALIDATION_OR_RUNTIME",
						message: expect.stringContaining("Invalid request"),
					},
				});
			});
		});

		describe("error handling", () => {
			it("should handle provider errors", async () => {
				mockProvider.write.mockRejectedValue(
					new Error("Provider error")
				);

				const request = new NextRequest(
					"http://localhost/api/ai/router",
					{
						method: "POST",
						body: JSON.stringify({
							tool: "write",
							payload: {
								topic: "Test topic",
								tone: "neutral",
								length: "short",
							},
						}),
					}
				);

				const response = await POST(request);
				const data = await response.json();

				expect(response.status).toBe(500);
				expect(data).toEqual({
					ok: false,
					error: {
						code: "RUNTIME_ERROR",
						message: "Provider error",
					},
				});
			});

			it("should handle OpenRouter specific errors", async () => {
				mockProvider.write.mockRejectedValue(
					new Error("OpenRouter quota exceeded")
				);

				const request = new NextRequest(
					"http://localhost/api/ai/router",
					{
						method: "POST",
						body: JSON.stringify({
							tool: "write",
							payload: {
								topic: "Test topic",
								tone: "neutral",
								length: "short",
							},
						}),
					}
				);

				const response = await POST(request);
				const data = await response.json();

				expect(response.status).toBe(503);
				expect(data).toEqual({
					ok: false,
					error: {
						code: "OPENROUTER_ERROR",
						message: "OpenRouter quota exceeded",
					},
				});
			});

			it("should handle validation errors", async () => {
				mockProvider.write.mockRejectedValue(
					new Error("validation error")
				);

				const request = new NextRequest(
					"http://localhost/api/ai/router",
					{
						method: "POST",
						body: JSON.stringify({
							tool: "write",
							payload: {
								topic: "Test topic",
								tone: "neutral",
								length: "short",
							},
						}),
					}
				);

				const response = await POST(request);
				const data = await response.json();

				expect(response.status).toBe(400);
				expect(data).toEqual({
					ok: false,
					error: {
						code: "VALIDATION_ERROR",
						message: "validation error",
					},
				});
			});
		});
	});
});
