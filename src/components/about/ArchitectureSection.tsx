"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnimations } from "@/hooks/useAnimations";

interface ArchitectureItem {
	title: string;
	description: string;
	icon: React.ReactNode;
	details: string[];
}

interface ArchitectureSectionProps {
	architecture: ArchitectureItem[];
}

const ArchitectureSectionComponent = ({
	architecture,
}: ArchitectureSectionProps) => {
	const { itemVariants } = useAnimations();

	return (
		<motion.div
			className="mb-20"
			variants={itemVariants}
			initial="hidden"
			animate="visible"
		>
			<h2 className="text-3xl font-bold text-slate-100 text-center mb-12">
				Technical Architecture
			</h2>
			<div className="grid md:grid-cols-2 gap-6 lg:gap-8">
				{architecture.map((item, index) => (
					<motion.div
						key={item.title}
						variants={itemVariants}
						initial="hidden"
						animate="visible"
						transition={{ delay: index * 0.1 }}
					>
						<Card className="h-full bg-gradient-to-br from-[#1a0939] to-[#120024] border-violet-400/40">
							<CardHeader>
								<div className="flex items-center gap-3 mb-2">
									<div className="p-2 bg-gradient-to-br from-violet-500/20 to-violet-600/10 rounded-lg border border-violet-400/40">
										{item.icon}
									</div>
									<CardTitle className="text-xl font-semibold text-slate-100">
										{item.title}
									</CardTitle>
								</div>
								<p className="text-slate-300 text-sm">
									{item.description}
								</p>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{item.details.map((detail, detailIndex) => (
										<div
											key={detailIndex}
											className="flex items-start gap-3"
										>
											<div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
											<p className="text-slate-300 text-sm">
												{detail}
											</p>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
};

export const ArchitectureSection = memo(ArchitectureSectionComponent);
