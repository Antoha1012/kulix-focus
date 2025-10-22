"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import Board from "@/components/ideas/Board";
import { Toaster } from "@/components/ui/sonner";
import { PageLayout } from "@/components/common/PageLayout";
import { useAnimations } from "@/hooks/useAnimations";

const IdeasPageComponent = () => {
	const { itemVariants } = useAnimations();

	return (
		<PageLayout
			title="AI Idea Board"
			description="Generate and organize ideas with drag&drop workflow for
			creative brainstorming. Features AI-powered idea
			generation, visual clustering, and intuitive
			organization tools."
			icon={<Lightbulb className="h-8 w-8" />}
		>
			<motion.div
				className="space-y-8"
				variants={itemVariants}
				initial="hidden"
				animate="visible"
			>
				<Board />
			</motion.div>
			<Toaster />
		</PageLayout>
	);
};

export default memo(IdeasPageComponent);
