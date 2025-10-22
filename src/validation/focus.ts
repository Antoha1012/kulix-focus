import { z } from "zod";

export const focusSchema = z.object({
	context: z.string().min(1, "Context is required"),
	existingPriorities: z.array(z.string()).optional(),
	count: z.number().int().min(1).max(5).optional(),
});

export type FocusInputZ = z.infer<typeof focusSchema>;
