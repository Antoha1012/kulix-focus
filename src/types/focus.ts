/**
 * Core types for Focus Tracker application
 * Centralized type definitions for better maintainability
 */

// Base focus item interface
export interface FocusItem {
	readonly id: string;
	readonly text: string;
	readonly completed: boolean;
	readonly createdAt: Date;
	readonly completedAt?: Date;
}

// AI suggestion interface
export interface AISuggestion {
	readonly priority: string;
	readonly reason: string;
	readonly category: string;
}

// API response types
export interface AISuggestionsResponse {
	readonly ok: boolean;
	readonly data: {
		readonly items: readonly AISuggestion[];
	};
}

// Store state interface
export interface FocusState {
	readonly focusItems: readonly FocusItem[];

	// Actions
	readonly addFocusItem: (text: string) => void;
	readonly toggleFocusItem: (id: string) => void;
	readonly removeFocusItem: (id: string) => void;
	readonly clearCompleted: () => void;
	readonly resetDay: () => void;

	// Computed values
	readonly getCompletedCount: () => number;
	readonly getTotalCount: () => number;
	readonly getProgressPercentage: () => number;
}

// Component prop types
export interface FocusItemProps {
	readonly item: FocusItem;
	readonly index: number;
	readonly onToggle: (id: string) => void;
	readonly onRemove: (id: string) => void;
	readonly variant?: "default" | "embedded";
}

export interface ProgressOverviewProps {
	readonly completedCount: number;
	readonly totalCount: number;
	readonly progressPercentage: number;
	readonly focusItems: readonly FocusItem[];
	readonly onClearCompleted: () => void;
	readonly onResetDay: () => void;
	readonly onToggleItem: (id: string) => void;
	readonly onRemoveItem: (id: string) => void;
	readonly hasItems: boolean;
	readonly onAddFirstFocus?: () => void;
}

export interface AddFocusSectionProps {
	readonly onAddFocus: (text: string) => void;
	readonly focusItemsCount: number;
	readonly maxItems: number;
	readonly existingPriorities: readonly string[];
}

export interface EmptyStateProps {
	readonly onAddFirstFocus: () => void;
	readonly variant?: "default" | "embedded";
}

// Hook return types
export interface UseFocusActionsReturn {
	readonly handleAddFocus: (text: string) => void;
	readonly handleToggleItem: (id: string) => void;
	readonly handleRemoveItem: (id: string) => void;
	readonly handleClearCompleted: () => void;
	readonly handleResetDay: () => void;
	readonly handleAddFirstFocus: () => void;
	readonly completedCount: number;
	readonly totalCount: number;
	readonly progressPercentage: number;
}

export interface UseFocusAPIReturn {
	readonly getAISuggestions: (
		context: string,
		existingPriorities: readonly string[],
		count?: number
	) => Promise<readonly AISuggestion[]>;
}

// Utility types
export type FocusVariant = "default" | "embedded";
export type TabType = "manual" | "ai";
export type FocusAction = "add" | "toggle" | "remove" | "clear" | "reset";

// Constants
export const FOCUS_CONSTANTS = {
	MAX_ITEMS: 3,
	MIN_TEXT_LENGTH: 1,
	MAX_TEXT_LENGTH: 100,
	MAX_AI_CONTEXT_LENGTH: 200,
} as const;

export type FocusConstants = typeof FOCUS_CONSTANTS;
