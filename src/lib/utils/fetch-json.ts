// Generic fetch wrapper that handles JSON parsing and error responses
// Provides consistent error handling across all API calls
export async function fetchJson<T>(
	input: RequestInfo | URL,
	init?: RequestInit
): Promise<T> {
	const res = await fetch(input, init);

	// Parse JSON response, fallback to empty object if parsing fails
	const data = await res.json().catch(() => ({}));

	// Check if response is successful (status 200-299)
	if (!res.ok) {
		// Extract error message from response data or use status text
		// Prioritizes structured error messages from API
		const message =
			(data && data.error && data.error.message) ||
			res.statusText ||
			"Request failed";
		throw new Error(message);
	}

	return data as T;
}
