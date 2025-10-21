/**
 * Purpose: Merge conditional class names resolving Tailwind conflicts.
 * Boundaries: Pure helper; no DOM access.
 * Owner: @anton (initial)
 */
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Returns merged Tailwind className string. */
export function cn(
	...inputs: Array<string | false | null | undefined>
): string {
	return twMerge(clsx(inputs));
}
