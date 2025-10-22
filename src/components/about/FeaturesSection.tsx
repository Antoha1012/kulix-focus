"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnimations } from "@/hooks/useAnimations";

interface Feature {
	title: string;
	description: string;
	icon: React.ReactNode;
	highlights: string[];
}

interface FeaturesSectionProps {
	features: Feature[];
}

const FeaturesSectionComponent = ({ features }: FeaturesSectionProps) => {
	const { itemVariants } = useAnimations();

	return (
		<motion.div
			className="mb-20"
			variants={itemVariants}
			initial="hidden"
			animate="visible"
		>
			<h2 className="text-3xl font-bold text-slate-100 text-center mb-12">
				Core Modules
			</h2>
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
				{features.map((feature, index) => (
					<motion.div
						key={feature.title}
						variants={itemVariants}
						initial="hidden"
						animate="visible"
						transition={{ delay: index * 0.1 }}
					>
						<Card className="h-full bg-gradient-to-br from-[#1a0939] to-[#120024] border-violet-400/40">
							<CardHeader className="text-center">
								<div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-violet-500/20 to-violet-600/10 rounded-xl mb-4 border border-violet-400/40">
									{feature.icon}
								</div>
								<CardTitle className="text-xl font-semibold text-slate-100">
									{feature.title}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-slate-300 text-sm mb-4 text-center">
									{feature.description}
								</p>
								<div className="space-y-2">
									{feature.highlights.map(
										(highlight, highlightIndex) => (
											<div
												key={highlightIndex}
												className="flex items-center gap-2"
											>
												<div className="w-1.5 h-1.5 bg-violet-400 rounded-full flex-shrink-0"></div>
												<span className="text-slate-400 text-sm">
													{highlight}
												</span>
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
	);
};

export const FeaturesSection = memo(FeaturesSectionComponent);
