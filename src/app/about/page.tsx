"use client";

import { motion } from "framer-motion";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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

export default function AboutPage() {
	const techStack = [
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
	];

	const features = [
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
	];

	const stats = [
		{ label: "Modules", value: "3", description: "Core features" },
		{ label: "Lighthouse", value: "95+", description: "Performance score" },
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
	];

	const architecture = [
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
			description: "Modern tooling with hot reload, linting, and testing",
			icon: <Database className="h-6 w-6 text-purple-400" />,
			details: [
				"Hot reload",
				"ESLint + Prettier",
				"Vitest testing",
				"GitHub Actions",
			],
		},
	];

	return (
		<div className="min-h-screen bg-transparent">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 max-w-6xl">
				{/* Hero Section */}
				<motion.div
					className="text-center mb-20"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
				>
					<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500/20 to-violet-600/10 rounded-2xl mb-6 border border-violet-400/40">
						<BookOpen className="h-8 w-8 text-violet-300" />
					</div>
					<h1 className="text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight bg-gradient-to-r from-violet-300 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent mb-6">
						About KuliX Focus
					</h1>
					<p className="mt-4 max-w-3xl mx-auto text-lg leading-7 text-gray-400">
						A full-stack AI productivity application showcasing
						modern web development practices, built with Next.js 15,
						TypeScript, and cutting-edge technologies. This project
						demonstrates expertise in React ecosystem, state
						management, API design, and performance optimization.
					</p>
				</motion.div>

				{/* Stats Section */}
				<motion.div
					className="mb-20"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					<Card className="bg-gradient-to-br from-[#1a0939] to-[#120024] border-violet-400/40">
						<CardContent className="p-8">
							<div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
								{stats.map((stat, index) => (
									<motion.div
										key={stat.label}
										className="text-center"
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{
											duration: 0.5,
											delay: 0.3 + index * 0.1,
										}}
									>
										<div className="text-3xl font-bold text-violet-300 mb-2">
											{stat.value}
										</div>
										<div className="text-sm text-slate-400 font-medium">
											{stat.label}
										</div>
										<div className="text-xs text-slate-500 mt-1">
											{stat.description}
										</div>
									</motion.div>
								))}
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Features Section */}
				<motion.div
					className="mb-20"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
				>
					<h2 className="text-3xl font-bold text-slate-100 text-center mb-12">
						Core Modules
					</h2>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
						{features.map((feature, index) => (
							<motion.div
								key={feature.title}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.6,
									delay: 0.5 + index * 0.1,
								}}
							>
								<Card className="bg-gradient-to-br from-[#1a0939] to-[#120024] border-violet-400/40 h-full hover:border-violet-400/60 transition-colors">
									<CardContent className="p-6">
										<div className="flex justify-center mb-4">
											<div className="bg-gradient-to-br from-violet-500/20 to-violet-600/10 w-16 h-16 rounded-2xl flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_8px_18px_rgba(0,0,0,.35)] border border-violet-400/40">
												{feature.icon}
											</div>
										</div>
										<h3 className="text-xl font-semibold text-slate-100 mb-3 text-center">
											{feature.title}
										</h3>
										<p className="text-slate-400 text-sm leading-relaxed mb-4">
											{feature.description}
										</p>
										<div className="space-y-2">
											{feature.highlights.map(
												(highlight, idx) => (
													<div
														key={idx}
														className="flex items-center gap-2 text-xs text-slate-500"
													>
														<div className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0"></div>
														<span>{highlight}</span>
													</div>
												)
											)}
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Tech Stack Section */}
				<motion.div
					className="mb-20"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6 }}
				>
					<Card className="bg-gradient-to-br from-[#1a0939] to-[#120024] border-violet-400/40">
						<CardHeader>
							<CardTitle className="text-2xl font-bold text-slate-100 text-center">
								Technology Stack
							</CardTitle>
							<CardDescription className="text-slate-200 text-center">
								Carefully selected modern technologies for
								optimal performance, developer experience, and
								maintainability.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
								{techStack.map((tech, index) => (
									<motion.div
										key={tech.name}
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{
											duration: 0.3,
											delay: 0.7 + index * 0.05,
										}}
										className="bg-gradient-to-br from-slate-800/40 to-slate-700/20 rounded-lg p-4 border border-slate-600/30 hover:border-slate-500/50 transition-colors"
									>
										<div className="text-sm font-semibold text-slate-200 mb-1">
											{tech.name}
										</div>
										<div className="text-xs text-slate-400 mb-2">
											{tech.category}
										</div>
										<div className="text-xs text-slate-500">
											{tech.description}
										</div>
									</motion.div>
								))}
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Architecture Section */}
				<motion.div
					className="mb-20"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.8 }}
				>
					<h2 className="text-3xl font-bold text-slate-100 text-center mb-12">
						Technical Architecture
					</h2>
					<div className="grid md:grid-cols-2 gap-6 lg:gap-8">
						{architecture.map((item, index) => (
							<motion.div
								key={item.title}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.6,
									delay: 0.9 + index * 0.1,
								}}
							>
								<Card className="bg-gradient-to-br from-[#1a0939] to-[#120024] border-violet-400/40 h-full hover:border-violet-400/60 transition-colors">
									<CardContent className="p-6">
										<div className="flex items-start gap-4">
											<div className="bg-gradient-to-br from-slate-700/40 to-slate-600/20 w-12 h-12 rounded-xl flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_8px_18px_rgba(0,0,0,.35)] border border-slate-500/40 flex-shrink-0">
												{item.icon}
											</div>
											<div className="flex-1">
												<h3 className="text-lg font-semibold text-slate-100 mb-2">
													{item.title}
												</h3>
												<p className="text-slate-400 text-sm leading-relaxed mb-4">
													{item.description}
												</p>
												<div className="space-y-2">
													{item.details.map(
														(detail, idx) => (
															<div
																key={idx}
																className="flex items-center gap-2 text-xs text-slate-500"
															>
																<div className="w-1.5 h-1.5 rounded-full bg-slate-500 flex-shrink-0"></div>
																<span>
																	{detail}
																</span>
															</div>
														)
													)}
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Project Goals Section */}
				<motion.div
					className="mb-20"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 1.2 }}
				>
					<Card className="max-w-4xl mx-auto bg-gradient-to-br from-[#1a0939] to-[#120024] border-violet-400/40">
						<CardHeader>
							<CardTitle className="text-2xl font-bold text-slate-100 text-center">
								Project Objectives
							</CardTitle>
							<CardDescription className="text-slate-200 text-center">
								This project demonstrates expertise in modern
								web development and showcases best practices for
								building scalable applications.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid md:grid-cols-2 gap-8">
								<div className="space-y-4">
									<h3 className="text-lg font-semibold text-slate-100 mb-4">
										Development Goals
									</h3>
									<div className="space-y-3">
										<div className="flex items-start gap-3">
											<div className="w-2 h-2 bg-violet-300 rounded-full mt-2 flex-shrink-0"></div>
											<p className="text-slate-300 text-sm">
												Demonstrate full-stack
												development skills with modern
												React ecosystem
											</p>
										</div>
										<div className="flex items-start gap-3">
											<div className="w-2 h-2 bg-violet-300 rounded-full mt-2 flex-shrink-0"></div>
											<p className="text-slate-300 text-sm">
												Showcase TypeScript expertise
												and type-safe development
												practices
											</p>
										</div>
										<div className="flex items-start gap-3">
											<div className="w-2 h-2 bg-violet-300 rounded-full mt-2 flex-shrink-0"></div>
											<p className="text-slate-300 text-sm">
												Implement performance
												optimization techniques and best
												practices
											</p>
										</div>
										<div className="flex items-start gap-3">
											<div className="w-2 h-2 bg-violet-300 rounded-full mt-2 flex-shrink-0"></div>
											<p className="text-slate-300 text-sm">
												Create accessible and responsive
												user interfaces
											</p>
										</div>
									</div>
								</div>
								<div className="space-y-4">
									<h3 className="text-lg font-semibold text-slate-100 mb-4">
										Technical Achievements
									</h3>
									<div className="space-y-3">
										<div className="flex items-start gap-3">
											<div className="w-2 h-2 bg-purple-300 rounded-full mt-2 flex-shrink-0"></div>
											<p className="text-slate-300 text-sm">
												Built scalable architecture with
												clean separation of concerns
											</p>
										</div>
										<div className="flex items-start gap-3">
											<div className="w-2 h-2 bg-purple-300 rounded-full mt-2 flex-shrink-0"></div>
											<p className="text-slate-300 text-sm">
												Implemented comprehensive state
												management with Zustand
											</p>
										</div>
										<div className="flex items-start gap-3">
											<div className="w-2 h-2 bg-purple-300 rounded-full mt-2 flex-shrink-0"></div>
											<p className="text-slate-300 text-sm">
												Created reusable component
												library with shadcn/ui
											</p>
										</div>
										<div className="flex items-start gap-3">
											<div className="w-2 h-2 bg-purple-300 rounded-full mt-2 flex-shrink-0"></div>
											<p className="text-slate-300 text-sm">
												Achieved high performance scores
												with Lighthouse optimization
											</p>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</div>
	);
}
