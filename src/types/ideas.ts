/**
 * Ideas page types and interfaces
 * Centralized type definitions for better maintainability
 */

import type { ReactNode } from "react";

// Idea item types
export interface Idea {
	readonly id: string;
	readonly text: string;
	readonly category: string;
	readonly createdAt: Date;
	readonly updatedAt: Date;
	readonly isCompleted: boolean;
	readonly priority: "low" | "medium" | "high";
	readonly tags: readonly string[];
}

// Board column types
export interface Column {
	readonly id: string;
	readonly title: string;
	readonly color: string;
	readonly ideas: readonly Idea[];
}

// Board state types
export interface IdeasState {
	readonly columns: readonly Column[];
	readonly isLoading: boolean;
	readonly error: string | null;
}

// AI suggestion types
export interface AIIdeaSuggestion {
	readonly id: string;
	readonly text: string;
	readonly category: string;
	readonly confidence: number;
	readonly reasoning: string;
}

export interface AIIdeasResponse {
	readonly ok: boolean;
	readonly data: {
		readonly items: readonly AIIdeaSuggestion[];
	};
	readonly error?: string;
}

// Component props types
export interface IdeasPageProps {
	readonly children?: ReactNode;
}

export interface IdeasHeroProps {
	readonly title: string;
	readonly description: string;
	readonly icon: ReactNode;
	readonly variants: {
		readonly hidden: { readonly opacity: number; readonly y?: number };
		readonly visible: {
			readonly opacity: number;
			readonly y?: number;
			readonly transition: {
				readonly duration: number;
				readonly ease?: readonly number[] | string;
				readonly delay?: number;
			};
		};
	};
}

export interface IdeasBoardProps {
	readonly columns: readonly Column[];
	readonly onIdeaMove: (
		ideaId: string,
		fromColumnId: string,
		toColumnId: string
	) => void;
	readonly onIdeaAdd: (text: string, category: string) => void;
	readonly onIdeaUpdate: (id: string, updates: Partial<Idea>) => void;
	readonly onIdeaDelete: (id: string) => void;
	readonly isLoading: boolean;
	readonly error: string | null;
}

// Hook return types
export interface UseIdeasActionsReturn {
	readonly handleIdeaMove: (
		ideaId: string,
		fromColumnId: string,
		toColumnId: string
	) => void;
	readonly handleIdeaAdd: (text: string, category: string) => void;
	readonly handleIdeaUpdate: (id: string, updates: Partial<Idea>) => void;
	readonly handleIdeaDelete: (id: string) => void;
	readonly handleClearCompleted: () => void;
	readonly handleResetBoard: () => void;
	readonly columns: readonly Column[];
	readonly isLoading: boolean;
	readonly error: string | null;
}

export interface UseIdeasAPIReturn {
	readonly getAIIdeas: (
		context: string,
		category: string,
		count?: number
	) => Promise<readonly AIIdeaSuggestion[]>;
}

// Constants
export const IDEAS_CONSTANTS = {
	MIN_TEXT_LENGTH: 3,
	MAX_TEXT_LENGTH: 200,
	MAX_TAGS_PER_IDEA: 5,
	MAX_IDEAS_PER_COLUMN: 20,
	AI_SUGGESTIONS_COUNT: 5,
} as const;

export type IdeasConstants = typeof IDEAS_CONSTANTS;
