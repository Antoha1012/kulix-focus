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

const HowItWorksSectionComponent = () => {
	return (
		<motion.div
			className="text-center mb-32"
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, delay: 0.4 }}
		>
			<Card className="mx-auto bg-gradient-to-br from-[#1a0939] to-[#120024] backdrop-blur-lg border border-white/10 shadow-purple-700/20 shadow-xl">
				<CardHeader>
					<CardTitle className="text-3xl font-bold text-slate-100 mb-4">
						How It Works
					</CardTitle>
					<CardDescription className="text-slate-200 text-lg">
						Three simple steps to boost your productivity
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="text-center">
							<div className="w-12 h-12 bg-gradient-to-br from-violet-500/20 to-violet-600/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-violet-400/40">
								<span className="text-violet-300 font-bold text-lg">
									1
								</span>
							</div>
							<h3 className="text-lg font-semibold text-slate-100 mb-2">
								Choose Your Tool
							</h3>
							<p className="text-slate-300 text-sm">
								Select the module that matches your current
								need: writing, focus tracking, or idea
								organization.
							</p>
						</div>
						<div className="text-center">
							<div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-purple-400/40">
								<span className="text-purple-300 font-bold text-lg">
									2
								</span>
							</div>
							<h3 className="text-lg font-semibold text-slate-100 mb-2">
								Set Your Preferences
							</h3>
							<p className="text-slate-300 text-sm">
								Customize settings like tone, length,
								priorities, or categories to match your
								workflow.
							</p>
						</div>
						<div className="text-center">
							<div className="w-12 h-12 bg-gradient-to-br from-fuchsia-500/20 to-fuchsia-600/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-fuchsia-400/40">
								<span className="text-fuchsia-300 font-bold text-lg">
									3
								</span>
							</div>
							<h3 className="text-lg font-semibold text-slate-100 mb-2">
								Get Results
							</h3>
							<p className="text-slate-300 text-sm">
								AI assists you in creating content, tracking
								progress, or organizing ideas efficiently.
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
};

export const HowItWorksSection = memo(HowItWorksSectionComponent);
