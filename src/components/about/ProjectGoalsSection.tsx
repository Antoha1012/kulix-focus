"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useAnimations } from "@/hooks/useAnimations";

const ProjectGoalsSectionComponent = () => {
	const { itemVariants } = useAnimations();

	return (
		<motion.div
			className="mb-20"
			variants={itemVariants}
			initial="hidden"
			animate="visible"
		>
			<Card className="max-w-4xl mx-auto bg-gradient-to-br from-[#1a0939] to-[#120024] border-violet-400/40">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-slate-100 text-center">
						Project Objectives
					</CardTitle>
					<CardDescription className="text-slate-200 text-center">
						This project demonstrates expertise in modern web
						development and showcases best practices for building
						scalable applications.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-6">
						<div className="grid md:grid-cols-2 gap-6">
							<div>
								<h3 className="text-lg font-semibold text-violet-300 mb-3">
									Technical Excellence
								</h3>
								<div className="space-y-3">
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
											Created reusable component library
											with shadcn/ui
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
							<div>
								<h3 className="text-lg font-semibold text-violet-300 mb-3">
									User Experience
								</h3>
								<div className="space-y-3">
									<div className="flex items-start gap-3">
										<div className="w-2 h-2 bg-purple-300 rounded-full mt-2 flex-shrink-0"></div>
										<p className="text-slate-300 text-sm">
											Designed intuitive interfaces with
											smooth animations
										</p>
									</div>
									<div className="flex items-start gap-3">
										<div className="w-2 h-2 bg-purple-300 rounded-full mt-2 flex-shrink-0"></div>
										<p className="text-slate-300 text-sm">
											Implemented responsive design for
											all device sizes
										</p>
									</div>
									<div className="flex items-start gap-3">
										<div className="w-2 h-2 bg-purple-300 rounded-full mt-2 flex-shrink-0"></div>
										<p className="text-slate-300 text-sm">
											Ensured accessibility compliance
											with WCAG guidelines
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
};

export const ProjectGoalsSection = memo(ProjectGoalsSectionComponent);
