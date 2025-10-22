"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const CallToActionSectionComponent = () => {
	return (
		<motion.div
			className="text-center mb-32"
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, delay: 0.8 }}
		>
			<Card className="mx-auto bg-gradient-to-br from-[#1a0939] to-[#120024] backdrop-blur-lg border border-white/10 shadow-purple-700/20 shadow-xl">
				<CardHeader>
					<CardTitle className="text-3xl font-bold text-slate-100 mb-4">
						Ready to Get Started?
					</CardTitle>
					<CardDescription className="text-slate-200 text-lg">
						Choose a module above to begin your productivity journey
						with AI-powered tools.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							variant="outline"
							className="border-slate-400/40 text-slate-300 hover:bg-slate-500/10 hover:border-slate-300/60"
							asChild
						>
							<Link
								href="https://github.com/Antoha1012/kulix-focus"
								target="_blank"
								rel="noopener noreferrer"
							>
								View on GitHub
								<ArrowRight className="h-4 w-4 ml-2" />
							</Link>
						</Button>
						<Button
							variant="outline"
							className="border-slate-400/40 text-slate-300 hover:bg-slate-500/10 hover:border-slate-300/60"
							asChild
						>
							<Link href="/about">
								Learn More
								<ArrowRight className="h-4 w-4 ml-2" />
							</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
};

export const CallToActionSection = memo(CallToActionSectionComponent);
