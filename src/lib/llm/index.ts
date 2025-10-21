/**
 * Purpose: LLM provider abstraction and selector.
 * Boundaries: Server-only usage; OpenRouter provider only.
 * Owner: @anton (initial)
 */

export type Tool = "write" | "ideas" | "focus";

export interface WriteInput {
	topic: string;
	tone?: "neutral" | "formal" | "casual" | "friendly";
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
	context: string; // User's current situation/goals
	existingPriorities?: string[]; // Current priorities to avoid duplicates
	count?: number; // Number of suggestions (default 3)
}

export interface FocusOutputItem {
	priority: string;
	reason: string; // Why this is important
	category: string; // work, personal, health, etc.
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
