"use client";

import { memo, useMemo } from "react";
import {
	BookOpen,
	FileText,
	Target,
	Lightbulb,
	Code,
	Database,
	Shield,
	Rocket,
} from "lucide-react";
import { PageLayout } from "@/components/common/PageLayout";
import {
	StatsSection,
	FeaturesSection,
	TechStackSection,
	ArchitectureSection,
	ProjectGoalsSection,
} from "@/components/about";

const AboutPageComponent = () => {
	const techStack = useMemo(
		() => [
			{
				name: "Next.js 15",
				category: "Framework",
				description: "App Router, SSR, ISR",
			},
			{
				name: "TypeScript",
				category: "Language",
				description: "Type safety & IntelliSense",
			},
			{
				name: "Tailwind CSS",
				category: "Styling",
				description: "Utility-first CSS framework",
			},
			{
				name: "shadcn/ui",
				category: "UI Library",
				description: "Accessible component system",
			},
			{
				name: "Zustand",
				category: "State",
				description: "Lightweight state management",
			},
			{
				name: "Zod",
				category: "Validation",
				description: "Runtime type validation",
			},
			{
				name: "Framer Motion",
				category: "Animation",
				description: "Production-ready animations",
			},
			{
				name: "Vitest",
				category: "Testing",
				description: "Fast unit testing framework",
			},
		],
		[]
	);

	const features = useMemo(
		() => [
			{
				title: "AI Writing Companion",
				description:
					"Generate high-quality drafts with customizable tone and length using AI-powered content generation.",
				icon: <FileText className="h-8 w-8 text-violet-300" />,
				highlights: [
					"AI-powered generation",
					"Customizable tone",
					"Multiple formats",
				],
			},
			{
				title: "AI Focus Tracker",
				description:
					"Track your top 3 priorities for today with progress visualization and completion tracking.",
				icon: <Target className="h-8 w-8 text-purple-300" />,
				highlights: [
					"Priority management",
					"Progress tracking",
					"Daily focus",
				],
			},
			{
				title: "AI Idea Board",
				description:
					"Generate and organize ideas with drag&drop workflow for creative brainstorming sessions.",
				icon: <Lightbulb className="h-8 w-8 text-fuchsia-300" />,
				highlights: [
					"Drag & drop",
					"Idea clustering",
					"Visual organization",
				],
			},
		],
		[]
	);

	const stats = useMemo(
		() => [
			{ label: "Modules", value: "3", description: "Core features" },
			{
				label: "Lighthouse",
				value: "95+",
				description: "Performance score",
			},
			{
				label: "Type Safety",
				value: "100%",
				description: "TypeScript coverage",
			},
			{
				label: "Bundle Size",
				value: "< 200KB",
				description: "Optimized build",
			},
		],
		[]
	);

	const architecture = useMemo(
		() => [
			{
				title: "Modern Architecture",
				description:
					"Built with Next.js 15 App Router for optimal performance and SEO",
				icon: <Code className="h-6 w-6 text-blue-400" />,
				details: [
					"Server-side rendering",
					"Static generation",
					"API routes",
					"Middleware",
				],
			},
			{
				title: "Type Safety",
				description:
					"End-to-end TypeScript with Zod validation for runtime safety",
				icon: <Shield className="h-6 w-6 text-green-400" />,
				details: [
					"Strict TypeScript",
					"Zod schemas",
					"API validation",
					"Form validation",
				],
			},
			{
				title: "Performance",
				description:
					"Optimized for speed with code splitting and lazy loading",
				icon: <Rocket className="h-6 w-6 text-orange-400" />,
				details: [
					"Code splitting",
					"Lazy loading",
					"Image optimization",
					"Bundle analysis",
				],
			},
			{
				title: "Developer Experience",
				description:
					"Modern tooling with hot reload, linting, and testing",
				icon: <Database className="h-6 w-6 text-purple-400" />,
				details: [
					"Hot reload",
					"ESLint + Prettier",
					"Vitest testing",
					"GitHub Actions",
				],
			},
		],
		[]
	);

	return (
		<PageLayout
			title="About KuliX Focus"
			description="A full-stack AI productivity application showcasing
			modern web development practices, built with Next.js 15,
			TypeScript, and cutting-edge technologies. This project
			demonstrates expertise in React ecosystem, state
			management, API design, and performance optimization."
			icon={<BookOpen className="h-8 w-8" />}
		>
			<StatsSection stats={stats} />
			<FeaturesSection features={features} />
			<TechStackSection techStack={techStack} />
			<ArchitectureSection architecture={architecture} />
			<ProjectGoalsSection />
		</PageLayout>
	);
};

export default memo(AboutPageComponent);
