/**
 * Purpose: Zod schema for Writing inputs.
 * Boundaries: Pure types/validation only.
 * Owner: @anton (initial)
 */
import { z } from "zod";

export const writeSchema = z.object({
	topic: z.string().min(1, "Topic is required"),
	tone: z.enum(["neutral", "formal", "casual", "friendly"]).optional(),
	length: z.enum(["short", "medium", "long"]).optional(),
	outline: z.array(z.string().min(1)).optional(),
});

export type WriteInputZ = z.infer<typeof writeSchema>;
