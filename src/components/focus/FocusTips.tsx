"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Target } from "lucide-react";

export function FocusTips() {
	const tips = [
		"Keep your focus items specific and actionable",
		"Review and update them each morning",
		"Celebrate small wins when you complete items",
		"If you consistently don't complete items, they might be too ambitious",
	];

	return (
		<motion.div
			className="mt-12"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.6 }}
		>
			<Card className="bg-gradient-to-br from-[#1a0939] to-[#120024] border-purple-400/40">
				<CardContent className="p-6">
					<div className="flex items-center gap-3 mb-4">
						<div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-lg flex items-center justify-center border border-purple-400/40">
							<Target className="h-4 w-4 text-purple-300" />
						</div>
						<h3 className="text-lg font-semibold text-slate-100">
							Focus Tips
						</h3>
					</div>
					<ul className="text-sm text-slate-300 space-y-3">
						{tips.map((tip, index) => (
							<li key={index} className="flex items-center gap-3">
								<div className="w-2 h-2 rounded-full bg-purple-300 flex-shrink-0"></div>
								<span>{tip}</span>
							</li>
						))}
					</ul>
				</CardContent>
			</Card>
		</motion.div>
	);
}
