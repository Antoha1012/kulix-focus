/**
 * Purpose: Utility for handling OpenAI API errors with user-friendly messages.
 * Boundaries: Pure function for error message transformation.
 * Owner: @anton (initial)
 */

export function getOpenAIErrorMessage(error: unknown): string {
	const errorMessage =
		error instanceof Error ? error.message : "Unknown error";

	// Handle specific OpenAI error codes
	if (errorMessage.includes("429")) {
		return "OpenAI quota exceeded. Please check your billing and usage limits.";
	}
	if (errorMessage.includes("401")) {
		return "OpenAI API key is invalid or expired.";
	}
	if (errorMessage.includes("403")) {
		return "OpenAI API access forbidden. Check your API key permissions.";
	}
	if (errorMessage.includes("500")) {
		return "OpenAI server error. Please try again later.";
	}
	if (errorMessage.includes("502") || errorMessage.includes("503")) {
		return "OpenAI service temporarily unavailable. Please try again later.";
	}

	return errorMessage;
}
