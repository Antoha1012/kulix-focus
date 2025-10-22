import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { vi } from "vitest";

// Mock Next.js router
const mockRouter = {
	push: vi.fn(),
	replace: vi.fn(),
	prefetch: vi.fn(),
	back: vi.fn(),
	forward: vi.fn(),
	refresh: vi.fn(),
};

// Mock Next.js useRouter hook
vi.mock("next/navigation", () => ({
	useRouter: () => mockRouter,
	useSearchParams: () => ({
		get: vi.fn(),
	}),
	usePathname: () => "/",
}));

// Custom render function that includes providers
const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">
) => {
	return render(ui, {
		// Add any global providers here if needed
		...options,
	});
};

// Re-export everything
export * from "@testing-library/react";
export { customRender as render };
export { mockRouter };
