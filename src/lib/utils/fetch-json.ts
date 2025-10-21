/**
 * Purpose: Thin fetch wrapper returning JSON with unified error on non-2xx.
 * Boundaries: No retries; caller handles errors.
 * Owner: @anton (initial)
 */
export async function fetchJson<T>(
	input: RequestInfo | URL,
	init?: RequestInit
): Promise<T> {
	const res = await fetch(input, init);
	const data = await res.json().catch(() => ({}));
	if (!res.ok) {
		const message =
			(data && data.error && data.error.message) ||
			res.statusText ||
			"Request failed";
		throw new Error(message);
	}
	return data as T;
}
