/**
 * Writing page types and interfaces
 * Centralized type definitions for better maintainability
 */

import type { ReactNode } from "react";

// Writing prompt types
export interface WritingPrompt {
	readonly topic: string;
	readonly tone:
		| "professional"
		| "casual"
		| "creative"
		| "academic"
		| "conversational";
	readonly length: "short" | "medium" | "long";
	readonly style?: string;
	readonly audience?: string;
	readonly keywords?: readonly string[];
}

// Writing result types
export interface WritingResult {
	readonly id: string;
	readonly content: string;
	readonly prompt: WritingPrompt;
	readonly createdAt: Date;
	readonly wordCount: number;
	readonly readingTime: number;
	readonly isCompleted: boolean;
	readonly quality: "draft" | "good" | "excellent";
}

// Writing state types
export interface WritingState {
	readonly currentPrompt: WritingPrompt | null;
	readonly results: readonly WritingResult[];
	readonly isLoading: boolean;
	readonly error: string | null;
	readonly currentResult: WritingResult | null;
}

// AI generation types
export interface AIWritingRequest {
	readonly topic: string;
	readonly tone: string;
	readonly length: string;
	readonly style?: string;
	readonly audience?: string;
	readonly keywords?: readonly string[];
}

export interface AIWritingResponse {
	readonly ok: boolean;
	readonly data: {
		readonly content: string;
		readonly wordCount: number;
		readonly readingTime: number;
		readonly quality: string;
	};
	readonly error?: string;
}

// Component props types
export interface WritingPageProps {
	readonly children?: ReactNode;
}

export interface WritingHeroProps {
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

export interface PromptBarProps {
	readonly onGenerate: (prompt: WritingPrompt) => void;
	readonly isLoading: boolean;
	readonly disabled?: boolean;
}

export interface ResultPanelProps {
	readonly result: WritingResult | null;
	readonly isLoading: boolean;
	readonly error: string | null;
	readonly onRegenerate: () => void;
	readonly onSave: (result: WritingResult) => void;
	readonly onCopy: (content: string) => void;
}

// Hook return types
export interface UseWritingActionsReturn {
	readonly handleGenerate: (prompt: WritingPrompt) => void;
	readonly handleRegenerate: () => void;
	readonly handleSave: (result: WritingResult) => void;
	readonly handleCopy: (content: string) => void;
	readonly handleClearResults: () => void;
	readonly currentPrompt: WritingPrompt | null;
	readonly results: readonly WritingResult[];
	readonly currentResult: WritingResult | null;
	readonly isLoading: boolean;
	readonly error: string | null;
}

export interface UseWritingAPIReturn {
	readonly generateContent: (
		request: AIWritingRequest
	) => Promise<WritingResult | null>;
}

// Constants
export const WRITING_CONSTANTS = {
	MIN_TOPIC_LENGTH: 3,
	MAX_TOPIC_LENGTH: 200,
	MIN_WORD_COUNT: 50,
	MAX_WORD_COUNT: 2000,
	MAX_RESULTS: 10,
	READING_SPEED_WPM: 200,
} as const;

export type WritingConstants = typeof WRITING_CONSTANTS;
