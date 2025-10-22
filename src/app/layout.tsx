import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

const outfit = Outfit({
	variable: "--font-outfit",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
	preload: true,
});

export const metadata: Metadata = {
	title: "KuliX Focus - AI Productivity Tool",
	description:
		"Open-source AI Productivity Tool with three powerful modules for writing, focus tracking, and ideation.",
	keywords: [
		"AI",
		"productivity",
		"writing",
		"focus",
		"ideas",
		"Next.js",
		"TypeScript",
	],
	authors: [{ name: "KuliX Focus Team" }],
	robots: "index, follow",
	openGraph: {
		title: "KuliX Focus - AI Productivity Tool",
		description:
			"Open-source AI Productivity Tool with three powerful modules for writing, focus tracking, and ideation.",
		type: "website",
		locale: "en_US",
	},
	twitter: {
		card: "summary_large_image",
		title: "KuliX Focus - AI Productivity Tool",
		description:
			"Open-source AI Productivity Tool with three powerful modules for writing, focus tracking, and ideation.",
	},
};

export const viewport = {
	width: "device-width",
	initialScale: 1,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "WebApplication",
		name: "KuliX Focus",
		description:
			"Open-source AI Productivity Tool with three powerful modules for writing, focus tracking, and ideation.",
		url: "https://kulix-focus.vercel.app",
		applicationCategory: "ProductivityApplication",
		operatingSystem: "Web Browser",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
		},
		creator: {
			"@type": "Organization",
			name: "KuliX Focus Team",
		},
	};

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(structuredData),
					}}
				/>
			</head>
			<body className={`${outfit.variable} antialiased`}>
				<AppShell>{children}</AppShell>
			</body>
		</html>
	);
}
