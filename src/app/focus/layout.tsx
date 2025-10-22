import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "AI Focus Tracker - Daily Priority Management | KuliX Focus",
	description:
		"Track your top 3 daily priorities with AI-powered suggestions. Get personalized focus recommendations based on your context and goals.",
	keywords: [
		"AI focus tracker",
		"daily priorities",
		"productivity",
		"task management",
		"AI suggestions",
	],
	openGraph: {
		title: "AI Focus Tracker - Daily Priority Management",
		description:
			"Track your top 3 daily priorities with AI-powered suggestions. Get personalized focus recommendations based on your context and goals.",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "AI Focus Tracker - Daily Priority Management",
		description:
			"Track your top 3 daily priorities with AI-powered suggestions. Get personalized focus recommendations based on your context and goals.",
	},
};

export default function FocusLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
