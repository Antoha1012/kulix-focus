import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "AI Idea Board - Creative Brainstorming Tool | KuliX Focus",
	description: "Generate and organize creative ideas with AI-powered brainstorming. Drag & drop workflow for creative projects and innovation.",
	keywords: ["AI ideas", "brainstorming", "creative thinking", "idea generation", "innovation tools"],
	openGraph: {
		title: "AI Idea Board - Creative Brainstorming Tool",
		description: "Generate and organize creative ideas with AI-powered brainstorming. Drag & drop workflow for creative projects and innovation.",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "AI Idea Board - Creative Brainstorming Tool",
		description: "Generate and organize creative ideas with AI-powered brainstorming. Drag & drop workflow for creative projects and innovation.",
	},
};

export default function IdeasLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
