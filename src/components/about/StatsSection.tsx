"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useAnimations } from "@/hooks/useAnimations";

interface Stat {
	label: string;
	value: string;
	description: string;
}

interface StatsSectionProps {
	stats: Stat[];
}

const StatsSectionComponent = ({ stats }: StatsSectionProps) => {
	const { itemVariants } = useAnimations();

	return (
		<motion.div
			className="mb-20"
			variants={itemVariants}
			initial="hidden"
			animate="visible"
		>
			<Card className="bg-gradient-to-br from-[#1a0939] to-[#120024] border-violet-400/40">
				<CardContent className="p-8">
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
						{stats.map((stat, index) => (
							<motion.div
								key={stat.label}
								className="text-center"
								variants={itemVariants}
								initial="hidden"
								animate="visible"
								transition={{ delay: index * 0.1 }}
							>
								<div className="text-3xl sm:text-4xl font-bold text-violet-300 mb-2">
									{stat.value}
								</div>
								<div className="text-sm font-medium text-slate-200 mb-1">
									{stat.label}
								</div>
								<div className="text-xs text-slate-400">
									{stat.description}
								</div>
							</motion.div>
						))}
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
};

export const StatsSection = memo(StatsSectionComponent);
