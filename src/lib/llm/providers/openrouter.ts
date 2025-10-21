/**
 * Purpose: OpenRouter LLM provider for production use with real AI generation.
 * Boundaries: Interacts with OpenRouter API; uses OpenAI-compatible interface.
 * Owner: @anton (initial)
 */
import type {
	IdeasInput,
	LLMProvider,
	WriteInput,
	FocusInput,
	FocusOutputItem,
} from "@/lib/llm";
import OpenAI from "openai";

function getOpenRouterConfig() {
	const apiKey = process.env.OPENROUTER_API_KEY;
	if (!apiKey) {
		throw new Error(
			"OpenRouter API key is not configured. Set OPENROUTER_API_KEY in your environment."
		);
	}

	return {
		apiKey,
		baseURL: "https://openrouter.ai/api/v1",
		model: process.env.OPENROUTER_MODEL || "gpt-4o-mini",
		maxTokens: parseInt(process.env.OPENROUTER_MAX_TOKENS || "1000"),
		temperature: parseFloat(process.env.OPENROUTER_TEMPERATURE || "0.7"),
	};
}

/**
 * Maps OpenRouter API errors to normalized error objects with quota detection
 */
function mapOpenRouterError(error: unknown): {
	isQuota: boolean;
	status: number;
	code: string;
	message: string;
} {
	const err = error as {
		code?: string;
		error?: { type?: string };
		status?: number;
		message?: string;
	};
	const code = err?.code || err?.error?.type || "runtime_error";
	const status = err?.status ?? 500;
	const isQuota = code === "insufficient_quota" || status === 429;

	return {
		isQuota,
		status,
		code,
		message: isQuota
			? "OpenRouter quota exceeded. Please check your plan/billing."
			: err?.message || "OpenRouter provider error",
	};
}

export const openrouterProvider: LLMProvider = {
	async write(input: WriteInput): Promise<string> {
		const config = getOpenRouterConfig();
		const client = new OpenAI({
			apiKey: config.apiKey,
			baseURL: config.baseURL,
		});

		try {
			const {
				topic,
				tone = "neutral",
				length = "medium",
				outline = [],
			} = input;

			// Build a comprehensive prompt based on user preferences
			const toneInstructions = {
				neutral: "Use a neutral, professional tone",
				formal: "Use a formal, academic tone with proper structure",
				casual: "Use a casual, conversational tone",
				friendly: "Use a warm, friendly tone that's approachable",
			};

			const lengthInstructions = {
				short: "Keep it concise (2-3 paragraphs)",
				medium: "Write a well-developed piece (4-6 paragraphs)",
				long: "Write a comprehensive piece (8+ paragraphs)",
			};

			const outlineText =
				outline.length > 0
					? `\n\nFollow this outline:\n${outline.map((item, i) => `${i + 1}. ${item}`).join("\n")}`
					: "";

			const prompt = `Write a ${length} ${tone} draft about "${topic}".

${toneInstructions[tone]}
${lengthInstructions[length]}
${outlineText}

Make it engaging, well-structured, and informative.`;

			const response = await client.chat.completions.create({
				model: config.model,
				messages: [{ role: "user", content: prompt }],
				max_tokens: config.maxTokens,
				temperature: config.temperature,
			});

			return (
				response.choices[0]?.message?.content ||
				"Failed to generate content from OpenRouter."
			);
		} catch (error: unknown) {
			console.error("OpenRouter write error:", error);
			const mappedError = mapOpenRouterError(error);
			throw Object.assign(new Error(mappedError.message), {
				code: mappedError.code,
				status: mappedError.status,
				isQuota: mappedError.isQuota,
			});
		}
	},


	async ideas(
		input: IdeasInput
	): Promise<{ items: { content: string; tags: string[] }[] }> {
		const config = getOpenRouterConfig();
		const client = new OpenAI({
			apiKey: config.apiKey,
			baseURL: config.baseURL,
		});

		try {
			const { topic, count = 5, tags = [] } = input;

			const tagsText =
				tags.length > 0
					? `Focus on these areas: ${tags.join(", ")}`
					: "";

			const prompt = `Generate ${count} creative and practical ideas related to "${topic}".

${tagsText}

For each idea, provide:
- A clear, actionable concept
- Relevant tags/categories

Return ONLY a JSON array in this format:
[{"content": "Idea description", "tags": ["tag1", "tag2"]}]`;

			const response = await client.chat.completions.create({
				model: config.model,
				messages: [{ role: "user", content: prompt }],
				max_tokens: config.maxTokens,
				temperature: 0.8, // Higher temperature for more creative ideas
			});

			const content = response.choices[0]?.message?.content || "[]";

			// Clean and parse the JSON response
			let cleanedContent = content.trim();

			// Remove markdown code blocks if present
			if (cleanedContent.includes("```json")) {
				cleanedContent = cleanedContent
					.replace(/```json\s*/, "")
					.replace(/```\s*$/, "");
			} else if (cleanedContent.includes("```")) {
				cleanedContent = cleanedContent
					.replace(/```\s*/, "")
					.replace(/```\s*$/, "");
			}

			// Extract JSON array from the response
			const jsonMatch = cleanedContent.match(/\[[\s\S]*\]/);
			if (jsonMatch) {
				cleanedContent = jsonMatch[0];
			}

			let items;
			try {
				items = JSON.parse(cleanedContent);
			} catch (parseError) {
				console.error("JSON parse error:", parseError);
				console.error("Cleaned content:", cleanedContent);
				throw new Error(
					`Invalid JSON response from OpenRouter: ${parseError instanceof Error ? parseError.message : "Unknown parse error"}`
				);
			}

			if (!Array.isArray(items)) {
				throw new Error(
					"Invalid response format from OpenRouter - expected array"
				);
			}

			return { items };
		} catch (error: unknown) {
			console.error("OpenRouter ideas error:", error);
			const mappedError = mapOpenRouterError(error);
			throw Object.assign(new Error(mappedError.message), {
				code: mappedError.code,
				status: mappedError.status,
				isQuota: mappedError.isQuota,
			});
		}
	},

	async focus(input: FocusInput): Promise<{ items: FocusOutputItem[] }> {
		const config = getOpenRouterConfig();
		const client = new OpenAI({
			apiKey: config.apiKey,
			baseURL: config.baseURL,
		});

		try {
			const { context, existingPriorities = [], count = 3 } = input;

			const existingText = existingPriorities.length > 0 
				? `\n\nCurrent priorities to avoid duplicating:\n${existingPriorities.map((p, i) => `${i + 1}. ${p}`).join("\n")}`
				: "";

			const prompt = `You are a productivity coach. Based on the user's context, suggest ${count} clear, actionable daily priorities.

User Context: "${context}"
${existingText}

For each priority, provide:
- A specific, achievable task (1-2 sentences)
- Why this is important right now
- Category (work, personal, health, learning, etc.)

Return ONLY a JSON array in this format:
[{"priority": "Specific task description", "reason": "Why this matters", "category": "work"}]`;

			const response = await client.chat.completions.create({
				model: config.model,
				messages: [{ role: "user", content: prompt }],
				max_tokens: config.maxTokens,
				temperature: 0.7, // Balanced creativity and consistency
			});

			const content = response.choices[0]?.message?.content || "[]";

			// Clean and parse the JSON response
			let cleanedContent = content.trim();

			// Remove markdown code blocks if present
			if (cleanedContent.includes("```json")) {
				cleanedContent = cleanedContent
					.replace(/```json\s*/, "")
					.replace(/```\s*$/, "");
			} else if (cleanedContent.includes("```")) {
				cleanedContent = cleanedContent
					.replace(/```\s*/, "")
					.replace(/```\s*$/, "");
			}

			// Extract JSON array from the response
			const jsonMatch = cleanedContent.match(/\[[\s\S]*\]/);
			if (jsonMatch) {
				cleanedContent = jsonMatch[0];
			}

			let items;
			try {
				items = JSON.parse(cleanedContent);
			} catch (parseError) {
				console.error("JSON parse error:", parseError);
				console.error("Cleaned content:", cleanedContent);
				throw new Error(
					`Invalid JSON response from OpenRouter: ${parseError instanceof Error ? parseError.message : "Unknown parse error"}`
				);
			}

			if (!Array.isArray(items)) {
				throw new Error(
					"Invalid response format from OpenRouter - expected array"
				);
			}

			return { items };
		} catch (error: unknown) {
			console.error("OpenRouter focus error:", error);
			const mappedError = mapOpenRouterError(error);
			throw Object.assign(new Error(mappedError.message), {
				code: mappedError.code,
				status: mappedError.status,
				isQuota: mappedError.isQuota,
			});
		}
	},
};
