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

interface TechItem {
	name: string;
	category: string;
	description: string;
}

interface TechStackSectionProps {
	techStack: TechItem[];
}

const TechStackSectionComponent = ({ techStack }: TechStackSectionProps) => {
	const { itemVariants } = useAnimations();

	return (
		<motion.div
			className="mb-20"
			variants={itemVariants}
			initial="hidden"
			animate="visible"
		>
			<Card className="bg-gradient-to-br from-[#1a0939] to-[#120024] border-violet-400/40">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-slate-100 text-center">
						Technology Stack
					</CardTitle>
					<CardDescription className="text-slate-200 text-center">
						Carefully selected modern technologies for optimal
						performance, developer experience, and maintainability.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
						{techStack.map((tech, index) => (
							<motion.div
								key={tech.name}
								className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
								variants={itemVariants}
								initial="hidden"
								animate="visible"
								transition={{ delay: index * 0.05 }}
							>
								<div className="text-sm font-medium text-violet-300 mb-1">
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
	);
};

export const TechStackSection = memo(TechStackSectionComponent);
