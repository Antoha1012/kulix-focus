/**
 * Common types used across all pages
 * Centralized type definitions for better maintainability
 */

import type { ReactNode } from "react";

// Animation variants types
export interface AnimationVariants {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	readonly [key: string]: any;
	readonly hidden: {
		readonly opacity: number;
		readonly y?: number;
		readonly x?: number;
		readonly scale?: number;
	};
	readonly visible: {
		readonly opacity: number;
		readonly y?: number;
		readonly x?: number;
		readonly scale?: number;
		readonly transition: {
			readonly duration: number;
			readonly ease?: readonly number[] | string;
			readonly delay?: number;
		};
	};
}

export interface ContainerVariants {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	readonly [key: string]: any;
	readonly hidden: {
		readonly opacity: number;
		readonly y?: number;
		readonly x?: number;
		readonly scale?: number;
	};
	readonly visible: {
		readonly opacity: number;
		readonly transition: {
			readonly staggerChildren: number;
			readonly delayChildren: number;
		};
	};
}

// Page module types
export interface PageModule {
	readonly title: string;
	readonly description: string;
	readonly href: string;
	readonly icon: ReactNode;
	readonly color: string;
	readonly bgColor: string;
	readonly borderColor: string;
	readonly borderGradient: string;
	readonly hoverGlow: string;
	readonly ctaText: string;
}

// Tech stack item type
export interface TechStackItem {
	readonly name: string;
	readonly category: string;
}

// Common page props
export interface PageProps {
	readonly children?: ReactNode;
}

// Common animation constants
export const ANIMATION_CONSTANTS = {
	STAGGER_DELAY: 0.1,
	CHILDREN_DELAY: 0.2,
	DURATION: 0.6,
	EASE: [0.25, 0.46, 0.45, 0.94] as const,
	HERO_DURATION: 0.8,
	HERO_EASE: "easeOut" as const,
} as const;
