import { useCallback } from "react";
import { useFocusStore } from "@/lib/store/focus.store";
import type { UseFocusActionsReturn } from "@/types/focus";

export function useFocusActions(): UseFocusActionsReturn {
	const {
		addFocusItem,
		toggleFocusItem,
		removeFocusItem,
		clearCompleted,
		resetDay,
		getCompletedCount,
		getTotalCount,
		getProgressPercentage,
	} = useFocusStore();

	const handleAddFocus = useCallback(
		(text: string) => {
			addFocusItem(text);
		},
		[addFocusItem]
	);

	const handleToggleItem = useCallback(
		(id: string) => {
			toggleFocusItem(id);
		},
		[toggleFocusItem]
	);

	const handleRemoveItem = useCallback(
		(id: string) => {
			removeFocusItem(id);
		},
		[removeFocusItem]
	);

	const handleClearCompleted = useCallback(() => {
		clearCompleted();
	}, [clearCompleted]);

	const handleResetDay = useCallback(() => {
		resetDay();
	}, [resetDay]);

	const handleAddFirstFocus = useCallback(() => {
		document.querySelector("input")?.focus();
	}, []);

	const completedCount = getCompletedCount();
	const totalCount = getTotalCount();
	const progressPercentage = getProgressPercentage();

	return {
		handleAddFocus,
		handleToggleItem,
		handleRemoveItem,
		handleClearCompleted,
		handleResetDay,
		handleAddFirstFocus,
		completedCount,
		totalCount,
		progressPercentage,
	};
}
