"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import PromptBar from "@/components/writing/PromptBar";
import ResultPanel from "@/components/writing/ResultPanel";
import { Toaster } from "@/components/ui/sonner";
import { PageLayout } from "@/components/common/PageLayout";
import { useAnimations } from "@/hooks/useAnimations";

const WritingPageComponent = () => {
	const { containerVariants, itemVariants } = useAnimations();

	return (
		<PageLayout
			title="AI Writing Companion"
			description="Generate high-quality drafts. Describe the topic, then
			choose tone and length."
			icon={<FileText className="h-8 w-8" />}
		>
			<motion.div
				className="space-y-8"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<motion.div variants={itemVariants}>
					<div className="bg-gradient-to-br from-[#1a0939] to-[#120024] backdrop-blur-lg border border-violet-400/40 shadow-lg rounded-2xl overflow-hidden">
						<div className="p-6">
							<PromptBar />
						</div>
					</div>
				</motion.div>

				<motion.div variants={itemVariants}>
					<div className="bg-gradient-to-br from-[#1a0939] to-[#120024] backdrop-blur-lg border border-violet-400/40 shadow-lg rounded-2xl overflow-hidden">
						<div className="p-6">
							<ResultPanel />
						</div>
					</div>
				</motion.div>
			</motion.div>
			<Toaster />
		</PageLayout>
	);
};

export default memo(WritingPageComponent);
