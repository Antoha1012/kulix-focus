import { useCallback } from "react";
import { fetchJson } from "@/lib/utils/fetch-json";
import type {
	AISuggestion,
	AISuggestionsResponse,
	UseFocusAPIReturn,
} from "@/types/focus";

export function useFocusAPI(): UseFocusAPIReturn {
	const getAISuggestions = useCallback(
		async (
			context: string,
			existingPriorities: readonly string[],
			count: number = 3
		): Promise<readonly AISuggestion[]> => {
			try {
				const data = await fetchJson<AISuggestionsResponse>(
					"/api/ai/router",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							tool: "focus",
							payload: {
								context,
								existingPriorities,
								count,
							},
						}),
					}
				);

				if (data.ok) {
					return data.data.items;
				}

				throw new Error("Failed to get AI suggestions");
			} catch (error) {
				console.error("AI suggestions error:", error);
				throw error;
			}
		},
		[]
	);

	return { getAISuggestions };
}
