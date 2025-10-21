/**
 * Purpose: Unified AI router endpoint that validates input and dispatches to OpenRouter provider.
 * Boundaries: Server-only Route Handler; returns consistent { ok, data } | { ok: false, error }.
 * Owner: @anton (initial)
 */
import { NextResponse } from "next/server";
import { z } from "zod";
import { getProvider } from "@/lib/llm";
import { writeSchema } from "@/validation/writing";
import { ideasSchema } from "@/validation/ideas";
import { focusSchema } from "@/validation/focus";

const requestSchema = z.object({
	tool: z.enum(["write", "ideas", "focus"]),
	payload: z.unknown(),
});

function ok<T>(data: T, init?: number) {
	return NextResponse.json({ ok: true, data }, { status: init ?? 200 });
}

function err(code: string, message: string, init?: number) {
	return NextResponse.json(
		{ ok: false, error: { code, message } },
		{ status: init ?? 400 }
	);
}

export async function POST(req: Request) {
	try {
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
		const provider = await getProvider(); // Get OpenRouter provider

		if (tool === "write") {
			const v = writeSchema.safeParse(payload);
			if (!v.success)
				return err("VALIDATION_OR_RUNTIME", v.error.message, 400);
			const result = await provider.write(v.data);
			return ok(result, 200);
		}


		if (tool === "ideas") {
			const v = ideasSchema.safeParse(payload);
			if (!v.success)
				return err("VALIDATION_OR_RUNTIME", v.error.message, 400);
			const result = await provider.ideas(v.data);
			return ok(result, 200);
		}

		if (tool === "focus") {
			const v = focusSchema.safeParse(payload);
			if (!v.success)
				return err("VALIDATION_OR_RUNTIME", v.error.message, 400);
			const result = await provider.focus(v.data);
			return ok(result, 200);
		}

		return err("VALIDATION_OR_RUNTIME", "Unsupported tool", 400);
	} catch (e: unknown) {
		const message = e instanceof Error ? e.message : "Unknown error";

		// Handle specific OpenRouter errors
		if (message.includes("OpenRouter")) {
			return err("OPENROUTER_ERROR", message, 503);
		}

		// Handle validation errors
		if (message.includes("validation") || message.includes("required")) {
			return err("VALIDATION_ERROR", message, 400);
		}

		return err("RUNTIME_ERROR", message, 500);
	}
}
