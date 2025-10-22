"use client";

import { memo, useMemo } from "react";
import { FileText, Target, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { useAnimations } from "@/hooks/useAnimations";
import { PageLayout } from "@/components/common/PageLayout";
import {
	ModuleCard,
	TechStack,
	HowItWorksSection,
	ExamplesSection,
	CallToActionSection,
} from "@/components/home";
import type { PageModule, TechStackItem } from "@/types/common";

const HomePageComponent = () => {
	const { containerVariants, itemVariants } = useAnimations();

	const modules = useMemo(
		(): readonly PageModule[] => [
			{
				title: "AI Writing Companion",
				description:
					"Create blog posts, articles, and content with AI assistance. Choose tone, length, and style to match your needs.",
				href: "/writing",
				icon: <FileText className="h-8 w-8" />,
				color: "text-violet-300",
				bgColor:
					"bg-gradient-to-br from-violet-500/20 to-violet-600/10",
				borderColor: "border-violet-400/40",
				borderGradient: "from-violet-300/60 to-violet-400/40",
				hoverGlow: "hover:shadow-violet-400/40",
				ctaText: "Start writing",
			},
			{
				title: "AI Focus Tracker",
				description:
					"Stay focused on what matters most. Set your top 3 daily priorities and track progress with visual indicators.",
				href: "/focus",
				icon: <Target className="h-8 w-8" />,
				color: "text-purple-300",
				bgColor:
					"bg-gradient-to-br from-purple-500/20 to-purple-600/10",
				borderColor: "border-purple-400/40",
				borderGradient: "from-purple-300/60 to-purple-400/40",
				hoverGlow: "hover:shadow-purple-400/40",
				ctaText: "View focus",
			},
			{
				title: "AI Idea Board",
				description:
					"Brainstorm and organize creative ideas visually. Drag & drop to categorize and develop your concepts.",
				href: "/ideas",
				icon: <Lightbulb className="h-8 w-8" />,
				color: "text-fuchsia-300",
				bgColor:
					"bg-gradient-to-br from-fuchsia-500/20 to-fuchsia-600/10",
				borderColor: "border-fuchsia-400/40",
				borderGradient: "from-fuchsia-300/60 to-fuchsia-400/40",
				hoverGlow: "hover:shadow-fuchsia-400/40",
				ctaText: "Explore ideas",
			},
		],
		[]
	);

	const techStack = useMemo(
		(): readonly TechStackItem[] => [
			{ name: "Next.js 15", category: "Framework" },
			{ name: "TypeScript", category: "Language" },
			{ name: "Tailwind CSS", category: "Styling" },
			{ name: "shadcn/ui", category: "Components" },
			{ name: "Zustand", category: "State" },
			{ name: "Zod", category: "Validation" },
			{ name: "Framer Motion", category: "Animation" },
			{ name: "Vitest", category: "Testing" },
		],
		[]
	);

	return (
		<PageLayout
			title="KuliX Focus"
			description="Boost your productivity with AI-powered tools. Write better content, stay focused on priorities, and organize your ideas with three powerful modules designed to help you achieve more."
		>
			<motion.div
				className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				{modules.map(module => (
					<ModuleCard
						key={module.href}
						module={module}
						variants={itemVariants}
					/>
				))}
			</motion.div>

			<HowItWorksSection />

			<ExamplesSection />

			<motion.div
				className="text-center mb-32"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.6 }}
			>
				<TechStack techStack={techStack} variants={itemVariants} />
			</motion.div>

			<CallToActionSection />
		</PageLayout>
	);
};

export default memo(HomePageComponent);
