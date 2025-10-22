import { z } from "zod";

export const ideasSchema = z.object({
	topic: z.string().min(1),
	count: z.number().int().min(1).max(10).optional(),
	tags: z.array(z.string().min(1)).optional(),
});

export type IdeasInputZ = z.infer<typeof ideasSchema>;
