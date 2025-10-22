"use client";

import { memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import type { PageModule, AnimationVariants } from "@/types/common";

interface ModuleCardProps {
	readonly module: PageModule;
	readonly variants: AnimationVariants;
}

const ModuleCardComponent = ({ module, variants }: ModuleCardProps) => {
	return (
		<motion.div variants={variants}>
			<Link href={module.href} className="block group">
				<Card
					className={`relative h-[300px] bg-gradient-to-br from-[#1a0939] to-[#120024] backdrop-blur-lg border ${module.borderColor} shadow-purple-700/30 shadow-lg ${module.hoverGlow} hover:scale-[1.03] hover:-translate-y-2 hover:shadow-purple-600/50 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden`}
				>
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
	);
};

export const ModuleCard = memo(ModuleCardComponent);
