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
import type { TechStackItem, AnimationVariants } from "@/types/common";

interface TechStackProps {
	readonly techStack: readonly TechStackItem[];
	readonly variants: AnimationVariants;
}

const TechStackComponent = ({ techStack, variants }: TechStackProps) => {
	return (
		<motion.div variants={variants}>
			<Card className="mx-auto bg-gradient-to-br from-[#1a0939] to-[#120024] backdrop-blur-lg border border-white/10 shadow-purple-700/20 shadow-xl">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-slate-100">
						Technology Stack
					</CardTitle>
					<CardDescription className="text-slate-200 text-lg">
						Built with modern web technologies for optimal
						performance, developer experience, and maintainability.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{techStack.map(tech => (
							<div
								key={tech.name}
								className="bg-gradient-to-br from-slate-800/40 to-slate-700/20 rounded-lg p-3 border border-slate-600/30"
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
	);
};

export const TechStack = memo(TechStackComponent);
