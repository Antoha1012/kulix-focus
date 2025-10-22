import { z } from "zod";

export const writeSchema = z.object({
	topic: z.string().min(1, "Topic is required"),
	tone: z
		.enum([
			"neutral",
			"professional",
			"friendly",
			"bold",
			"playful",
			"academic",
		])
		.optional(),
	length: z.enum(["short", "medium", "long"]).optional(),
	outline: z.array(z.string().min(1)).optional(),
});

export type WriteInputZ = z.infer<typeof writeSchema>;
