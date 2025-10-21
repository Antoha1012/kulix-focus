/**
 * Purpose: Manage daily focus priorities with simple tracking
 * Boundaries: Only handles focus items, no complex scheduling
 * Owner: @anton (initial)
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FocusItem {
	id: string;
	text: string;
	completed: boolean;
	createdAt: Date;
	completedAt?: Date;
}

interface FocusState {
	// Current day's focus items (max 3)
	focusItems: FocusItem[];

	// Actions
	addFocusItem: (text: string) => void;
	toggleFocusItem: (id: string) => void;
	removeFocusItem: (id: string) => void;
	clearCompleted: () => void;
	resetDay: () => void;

	// Computed values
	getCompletedCount: () => number;
	getTotalCount: () => number;
	getProgressPercentage: () => number;
}

export const useFocusStore = create<FocusState>()(
	persist(
		(set, get) => ({
			focusItems: [],

			addFocusItem: (text: string) => {
				const state = get();

				// Limit to 3 focus items per day
				if (state.focusItems.length >= 3) {
					return;
				}

				const newItem: FocusItem = {
					id: crypto.randomUUID(),
					text: text.trim(),
					completed: false,
					createdAt: new Date(),
				};

				set(state => ({
					focusItems: [...state.focusItems, newItem],
				}));
			},

			toggleFocusItem: (id: string) => {
				set(state => ({
					focusItems: state.focusItems.map(item =>
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
				}));
			},

			removeFocusItem: (id: string) => {
				set(state => ({
					focusItems: state.focusItems.filter(item => item.id !== id),
				}));
			},

			clearCompleted: () => {
				set(state => ({
					focusItems: state.focusItems.filter(
						item => !item.completed
					),
				}));
			},

			resetDay: () => {
				set({ focusItems: [] });
			},

			// Computed values
			getCompletedCount: () => {
				return get().focusItems.filter(item => item.completed).length;
			},

			getTotalCount: () => {
				return get().focusItems.length;
			},

			getProgressPercentage: () => {
				const focusItems = get().focusItems;
				const completedCount = focusItems.filter(
					item => item.completed
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
			partialize: state => ({ focusItems: state.focusItems }),
			// Handle date deserialization
			onRehydrateStorage: () => state => {
				if (state?.focusItems) {
					state.focusItems = state.focusItems.map(item => ({
						...item,
						createdAt: new Date(item.createdAt),
						completedAt: item.completedAt
							? new Date(item.completedAt)
							: undefined,
					}));
				}
			},
		}
	)
);
