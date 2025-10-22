import { NextResponse } from "next/server";
import { z } from "zod";
import { getProvider } from "@/lib/llm";
import { writeSchema } from "@/validation/writing";
import { ideasSchema } from "@/validation/ideas";
import { focusSchema } from "@/validation/focus";

// Schema for validating incoming API requests
// Ensures we only accept supported tools and validate their payloads
const requestSchema = z.object({
	tool: z.enum(["write", "ideas", "focus"]),
	payload: z.unknown(),
});

// Helper function to return successful API responses
// Standardizes response format across all endpoints
function ok<T>(data: T, init?: number) {
	return NextResponse.json({ ok: true, data }, { status: init ?? 200 });
}

// Helper function to return error responses
// Provides consistent error format with status codes
function err(code: string, message: string, init?: number) {
	return NextResponse.json(
		{ ok: false, error: { code, message } },
		{ status: init ?? 400 }
	);
}

export async function POST(req: Request) {
	try {
		// Parse and validate the incoming request
		const json = await req.json();
		const parsed = requestSchema.safeParse(json);
		if (!parsed.success) {
			return err(
				"VALIDATION_OR_RUNTIME",
				parsed.error.flatten().formErrors.join("; ") ||
					"Invalid request",
				400
			);
		}
		const { tool, payload } = parsed.data;

		// Get the configured LLM provider (OpenRouter)
		const provider = await getProvider();

		// Handle writing tool requests
		if (tool === "write") {
			const v = writeSchema.safeParse(payload);
			if (!v.success)
				return err("VALIDATION_OR_RUNTIME", v.error.message, 400);
			const result = await provider.write(v.data);
			return ok(result, 200);
		}

		// Handle ideas generation tool requests
		if (tool === "ideas") {
			const v = ideasSchema.safeParse(payload);
			if (!v.success)
				return err("VALIDATION_OR_RUNTIME", v.error.message, 400);
			const result = await provider.ideas(v.data);
			return ok(result, 200);
		}

		// Handle focus suggestions tool requests
		if (tool === "focus") {
			const v = focusSchema.safeParse(payload);
			if (!v.success)
				return err("VALIDATION_OR_RUNTIME", v.error.message, 400);
			const result = await provider.focus(v.data);
			return ok(result, 200);
		}

		// Return error for unsupported tools
		return err("VALIDATION_OR_RUNTIME", "Unsupported tool", 400);
	} catch (e: unknown) {
		const message = e instanceof Error ? e.message : "Unknown error";

		// Handle specific error types with appropriate status codes
		// OpenRouter API errors (quota, rate limits, etc.)
		if (message.includes("OpenRouter")) {
			return err("OPENROUTER_ERROR", message, 503);
		}

		// Validation errors from Zod schemas
		if (message.includes("validation") || message.includes("required")) {
			return err("VALIDATION_ERROR", message, 400);
		}

		// Generic runtime errors
		return err("RUNTIME_ERROR", message, 500);
	}
}
