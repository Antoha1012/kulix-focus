import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

// Mock Next.js router
vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: vi.fn(),
		replace: vi.fn(),
		prefetch: vi.fn(),
		back: vi.fn(),
		forward: vi.fn(),
		refresh: vi.fn(),
	}),
	useSearchParams: () => ({
		get: vi.fn(),
	}),
	usePathname: () => "/",
}));

// Mock Next.js Image component
vi.mock("next/image", () => ({
	default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
		return React.createElement("img", props);
	},
}));

// Mock environment variables
vi.mock("process", () => ({
	env: {
		OPENROUTER_API_KEY: "test-api-key",
		OPENROUTER_MODEL: "gpt-4o-mini",
		OPENROUTER_MAX_TOKENS: "1000",
		OPENROUTER_TEMPERATURE: "0.7",
	},
}));

// Mock crypto.randomUUID for consistent testing
Object.defineProperty(global, "crypto", {
	value: {
		randomUUID: vi.fn(() => "test-uuid-123"),
	},
});

// Mock fetch globally
global.fetch = vi.fn();

// Mock localStorage
const localStorageMock = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	removeItem: vi.fn(),
	clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", {
	value: localStorageMock,
});

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: vi.fn().mockImplementation(query => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});
