"use client";

import Link from "next/link";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Target, Lightbulb, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
	const modules = [
		{
			title: "AI Writing Companion",
			description: "Generate drafts with customizable tone and length",
			href: "/writing",
			icon: <FileText className="h-8 w-8" />,
			color: "text-violet-300",
			bgColor: "bg-gradient-to-br from-violet-500/20 to-violet-600/10",
			borderColor: "border-violet-400/40",
			borderGradient: "from-violet-300/60 to-violet-400/40",
			hoverGlow: "hover:shadow-violet-400/40",
			ctaText: "Start writing",
		},
		{
			title: "AI Focus Tracker",
			description:
				"Track your top 3 priorities for today and mark them as done",
			href: "/focus",
			icon: <Target className="h-8 w-8" />,
			color: "text-purple-300",
			bgColor: "bg-gradient-to-br from-purple-500/20 to-purple-600/10",
			borderColor: "border-purple-400/40",
			borderGradient: "from-purple-300/60 to-purple-400/40",
			hoverGlow: "hover:shadow-purple-400/40",
			ctaText: "View focus",
		},
		{
			title: "AI Idea Board",
			description: "Generate and organize ideas with drag&drop workflow",
			href: "/ideas",
			icon: <Lightbulb className="h-8 w-8" />,
			color: "text-fuchsia-300",
			bgColor: "bg-gradient-to-br from-fuchsia-500/20 to-fuchsia-600/10",
			borderColor: "border-fuchsia-400/40",
			borderGradient: "from-fuchsia-300/60 to-fuchsia-400/40",
			hoverGlow: "hover:shadow-fuchsia-400/40",
			ctaText: "Explore ideas",
		},
	];

	// Animation variants for staggered entrance
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: [0.25, 0.46, 0.45, 0.94] as const,
			},
		},
	};

	return (
		<div className="min-h-screen bg-transparent">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
				{/* Hero Section with improved typography */}
				<motion.div
					className="text-center mb-20"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
				>
					<h1 className="text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight bg-gradient-to-r from-violet-300 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent mb-6">
						KuliX Focus
					</h1>
					<p className="mt-4 max-w-2xl mx-auto text-lg leading-7 text-gray-400">
						A modern, full-stack AI productivity application with three powerful modules:
						AI Writing Companion, Focus Tracker, and Idea Board. Built with Next.js 15, 
						TypeScript, and cutting-edge web technologies to demonstrate expertise in React
						ecosystem, state management, and performance optimization.
					</p>
				</motion.div>

				{/* Modules Grid with enhanced cards */}
				<motion.div
					className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					{modules.map(module => (
						<motion.div key={module.href} variants={itemVariants}>
							<Link href={module.href} className="block group">
								<Card
									className={`relative h-[300px] bg-gradient-to-br from-[#1a0939] to-[#120024] backdrop-blur-lg border ${module.borderColor} shadow-purple-700/30 shadow-lg ${module.hoverGlow} hover:scale-[1.03] hover:-translate-y-2 hover:shadow-purple-600/50 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden`}
								>
									{/* Gradient border effect */}
									<div
										className={`absolute inset-0 bg-gradient-to-r ${module.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg`}
										style={{ padding: "1px" }}
									>
										<div className="w-full h-full bg-gradient-to-br from-[#1a0939] to-[#120024] rounded-lg"></div>
									</div>

									<div className="relative z-10 h-full flex flex-col">
										<CardHeader className="pb-4">
											<div
												className={`${module.color} ${module.bgColor} mb-4 w-12 h-12 rounded-xl flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_8px_18px_rgba(0,0,0,.35)] group-hover:shadow-lg group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(120,80,255,0.3)] transition-all duration-300`}
											>
												{module.icon}
											</div>
											<CardTitle className="text-xl font-bold text-slate-100 group-hover:text-white transition-colors">
												{module.title}
											</CardTitle>
											<CardDescription className="text-slate-200 group-hover:text-slate-100 transition-colors leading-relaxed">
												{module.description}
											</CardDescription>
										</CardHeader>
										<CardContent className="flex-1 flex items-end">
											<div className="flex items-center text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
												{module.ctaText}
												<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
											</div>
										</CardContent>
									</div>
								</Card>
							</Link>
						</motion.div>
					))}
				</motion.div>

				{/* Tech Stack Section */}
				<motion.div
					className="text-center mb-32"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.6 }}
				>
					<Card className="max-w-4xl mx-auto bg-gradient-to-br from-[#1a0939] to-[#120024] backdrop-blur-lg border border-white/10 shadow-purple-700/20 shadow-xl">
						<CardHeader>
							<h2 className="text-2xl font-bold text-slate-100">
								Technology Stack
							</h2>
							<CardDescription className="text-slate-200 text-lg">
								Built with modern web technologies for optimal
								performance, developer experience, and
								maintainability.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								{[
									{
										name: "Next.js 15",
										category: "Framework",
									},
									{
										name: "TypeScript",
										category: "Language",
									},
									{
										name: "Tailwind CSS",
										category: "Styling",
									},
									{
										name: "shadcn/ui",
										category: "Components",
									},
									{ name: "Zustand", category: "State" },
									{ name: "Zod", category: "Validation" },
									{
										name: "Framer Motion",
										category: "Animation",
									},
									{ name: "Vitest", category: "Testing" },
								].map(tech => (
									<div
										key={tech.name}
										className="bg-gradient-to-br from-slate-800/40 to-slate-700/20 rounded-lg p-3 border border-slate-600/30 hover:border-slate-500/50 transition-colors"
									>
										<div className="text-sm font-semibold text-slate-200">
											{tech.name}
										</div>
										<div className="text-xs text-slate-400">
											{tech.category}
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{/* CTA Section */}
				<motion.div
					className="text-center mb-32"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.8 }}
				>
					<Card className="max-w-2xl mx-auto bg-gradient-to-br from-[#1a0939] to-[#120024] backdrop-blur-lg border border-white/10 shadow-purple-700/20 shadow-xl">
						<CardHeader>
							<h2 className="text-2xl font-bold text-slate-100 mb-4">
								Ready to Get Started?
							</h2>
							<CardDescription className="text-slate-200 text-lg">
								Explore the modules or learn more about this
								project.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
								<Button
									variant="outline"
									size="lg"
									className="text-slate-300 border-slate-600 hover:bg-slate-700/50 hover:text-white transition-colors"
									asChild
								>
									<Link href="/about">
										Learn More
										<ArrowRight className="h-4 w-4 ml-2" />
									</Link>
								</Button>
								<Button
									variant="outline"
									size="lg"
									className="text-slate-300 border-slate-600 hover:bg-slate-700/50 hover:text-white transition-colors"
									asChild
								>
									<Link
										href="https://github.com/Antoha1012/kulix-focus"
										target="_blank"
										rel="noopener noreferrer"
									>
										View on GitHub
										<ArrowRight className="h-4 w-4 ml-2" />
									</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</div>
	);
}
