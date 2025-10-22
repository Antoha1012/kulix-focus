import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FocusItem, FocusState } from "@/types/focus";
import { FOCUS_CONSTANTS } from "@/types/focus";

export const useFocusStore = create<FocusState>()(
	persist(
		(set, get) => ({
			focusItems: [],

			addFocusItem: (text: string): void => {
				const state = get();

				// Validate input text
				// Ensure text is not empty and meets minimum length requirement
				const trimmedText = text.trim();
				if (
					!trimmedText ||
					trimmedText.length < FOCUS_CONSTANTS.MIN_TEXT_LENGTH
				) {
					return;
				}

				// Enforce daily limit to prevent overwhelming users
				// Helps maintain focus on most important priorities
				if (state.focusItems.length >= FOCUS_CONSTANTS.MAX_ITEMS) {
					return;
				}

				// Create new focus item with validation
				const newItem: FocusItem = {
					id: crypto.randomUUID(),
					text: trimmedText.slice(0, FOCUS_CONSTANTS.MAX_TEXT_LENGTH),
					completed: false,
					createdAt: new Date(),
				};

				// Add to store using immutable update pattern
				set(
					(state): Partial<FocusState> => ({
						focusItems: [...state.focusItems, newItem],
					})
				);
			},

			toggleFocusItem: (id: string): void => {
				// Toggle completion status and track completion time
				// When marking as completed, record the timestamp
				// When unmarking, clear the completion timestamp
				set(
					(state): Partial<FocusState> => ({
						focusItems: state.focusItems.map(
							(item): FocusItem =>
								item.id === id
									? {
											...item,
											completed: !item.completed,
											completedAt: !item.completed
												? new Date()
												: undefined,
										}
									: item
						),
					})
				);
			},

			removeFocusItem: (id: string): void => {
				set(
					(state): Partial<FocusState> => ({
						focusItems: state.focusItems.filter(
							(item): boolean => item.id !== id
						),
					})
				);
			},

			clearCompleted: (): void => {
				set(
					(state): Partial<FocusState> => ({
						focusItems: state.focusItems.filter(
							(item): boolean => !item.completed
						),
					})
				);
			},

			resetDay: (): void => {
				set({ focusItems: [] });
			},

			// Computed values
			getCompletedCount: (): number => {
				return get().focusItems.filter(
					(item): boolean => item.completed
				).length;
			},

			getTotalCount: (): number => {
				return get().focusItems.length;
			},

			getProgressPercentage: (): number => {
				// Calculate completion percentage for progress tracking
				// Returns 0 if no items exist to avoid division by zero
				const focusItems = get().focusItems;
				const completedCount = focusItems.filter(
					(item): boolean => item.completed
				).length;
				const totalCount = focusItems.length;
				return totalCount > 0
					? Math.round((completedCount / totalCount) * 100)
					: 0;
			},
		}),
		{
			name: "focus-store",
			// Only persist focus items, not computed values
			// This prevents storing calculated values that should be recalculated
			partialize: state => ({ focusItems: state.focusItems }),
			// Skip persistence on server-side to avoid hydration issues
			skipHydration: typeof window === "undefined",
			// Handle date deserialization from localStorage
			// JSON doesn't preserve Date objects, so we need to recreate them
			onRehydrateStorage: () => state => {
				if (state?.focusItems) {
					// Create new array to avoid readonly mutation
					// Convert string dates back to Date objects
					const hydratedItems = state.focusItems.map(item => ({
						...item,
						createdAt: new Date(item.createdAt),
						completedAt: item.completedAt
							? new Date(item.completedAt)
							: undefined,
					}));
					// Return new state object instead of mutating existing state
					return { focusItems: hydratedItems };
				}
			},
		}
	)
);
