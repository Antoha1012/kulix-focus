import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "AI Writing Companion - Content Generation Tool | KuliX Focus",
	description:
		"Generate high-quality content with AI-powered writing assistant. Customizable tone, length, and style for professional writing needs.",
	keywords: [
		"AI writing",
		"content generation",
		"writing assistant",
		"AI tools",
		"text generation",
	],
	openGraph: {
		title: "AI Writing Companion - Content Generation Tool",
		description:
			"Generate high-quality content with AI-powered writing assistant. Customizable tone, length, and style for professional writing needs.",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "AI Writing Companion - Content Generation Tool",
		description:
			"Generate high-quality content with AI-powered writing assistant. Customizable tone, length, and style for professional writing needs.",
	},
};

export default function WritingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
