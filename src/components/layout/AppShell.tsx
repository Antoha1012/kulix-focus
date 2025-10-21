"use client";

/**
 * Purpose: Simple layout with header, main content area, and footer.
 * Boundaries: UI-only; no sidebar complexity.
 * Owner: @anton (initial)
 */
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-transparent flex flex-col">
			<Header />
			<main className="w-full bg-transparent flex-1">{children}</main>
			<Footer />
		</div>
	);
}
