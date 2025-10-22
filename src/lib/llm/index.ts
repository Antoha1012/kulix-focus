export type Tool = "write" | "ideas" | "focus";

export interface WriteInput {
	topic: string;
	tone?:
		| "neutral"
		| "professional"
		| "friendly"
		| "bold"
		| "playful"
		| "academic";
	length?: "short" | "medium" | "long";
	outline?: string[];
}

export interface IdeasInput {
	topic: string;
	count?: number;
	tags?: string[];
}

export interface IdeasOutputItem {
	content: string;
	tags: string[];
}

export interface FocusInput {
	context: string;
	existingPriorities?: string[];
	count?: number;
}

export interface FocusOutputItem {
	priority: string;
	reason: string;
	category: string;
}

export interface LLMProvider {
	write(input: WriteInput): Promise<string>;
	ideas(input: IdeasInput): Promise<{ items: IdeasOutputItem[] }>;
	focus(input: FocusInput): Promise<{ items: FocusOutputItem[] }>;
}

/**
 * Returns OpenRouter provider. Requires OPENROUTER_API_KEY to be set.
 */
export async function getProvider(): Promise<LLMProvider> {
	const apiKey = process.env.OPENROUTER_API_KEY;
	if (!apiKey) {
		throw new Error(
			"OpenRouter API key is required. Set OPENROUTER_API_KEY environment variable."
		);
	}

	const { openrouterProvider } = await import("./providers/openrouter");
	return openrouterProvider;
}
