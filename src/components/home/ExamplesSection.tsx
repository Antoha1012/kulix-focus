"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { FileText, Target, Lightbulb } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const ExamplesSectionComponent = () => {
	return (
		<motion.div
			className="text-center mb-32"
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, delay: 0.5 }}
		>
			<Card className="mx-auto bg-gradient-to-br from-[#1a0939] to-[#120024] backdrop-blur-lg border border-white/10 shadow-purple-700/20 shadow-xl">
				<CardHeader>
					<CardTitle className="text-3xl font-bold text-slate-100 mb-4">
						Real-World Examples
					</CardTitle>
					<CardDescription className="text-slate-200 text-lg">
						See how KuliX Focus can help you in different scenarios
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="text-left p-4 rounded-lg bg-gradient-to-br from-violet-500/10 to-violet-600/5 border border-violet-400/20">
							<div className="flex items-center mb-3">
								<FileText className="h-6 w-6 text-violet-300 mr-2" />
								<h3 className="text-lg font-semibold text-slate-100">
									Content Creator
								</h3>
							</div>
							<p className="text-slate-300 text-sm mb-2">
								<strong>Use case:</strong> Writing blog posts
								and social media content
							</p>
							<p className="text-slate-400 text-xs">
								Generate engaging articles with AI assistance,
								customize tone for different audiences, and
								maintain consistent quality across all your
								content.
							</p>
						</div>
						<div className="text-left p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-400/20">
							<div className="flex items-center mb-3">
								<Target className="h-6 w-6 text-purple-300 mr-2" />
								<h3 className="text-lg font-semibold text-slate-100">
									Project Manager
								</h3>
							</div>
							<p className="text-slate-300 text-sm mb-2">
								<strong>Use case:</strong> Managing daily
								priorities and deadlines
							</p>
							<p className="text-slate-400 text-xs">
								Set your top 3 daily priorities, track progress
								visually, and ensure nothing important falls
								through the cracks.
							</p>
						</div>
						<div className="text-left p-4 rounded-lg bg-gradient-to-br from-fuchsia-500/10 to-fuchsia-600/5 border border-fuchsia-400/20">
							<div className="flex items-center mb-3">
								<Lightbulb className="h-6 w-6 text-fuchsia-300 mr-2" />
								<h3 className="text-lg font-semibold text-slate-100">
									Entrepreneur
								</h3>
							</div>
							<p className="text-slate-300 text-sm mb-2">
								<strong>Use case:</strong> Brainstorming and
								organizing business ideas
							</p>
							<p className="text-slate-400 text-xs">
								Capture innovative concepts, organize them by
								category, and develop promising ideas into
								actionable plans.
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
};

export const ExamplesSection = memo(ExamplesSectionComponent);
