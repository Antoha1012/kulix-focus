"use client";

/**
 * Purpose: Writing page with unified design matching AI Writing Companion module style.
 * Boundaries: Client-only demo; production page can be refactored later.
 * Owner: @anton (initial)
 */
import PromptBar from "@/components/writing/PromptBar";
import ResultPanel from "@/components/lazy/LazyResultPanel";
import { Toaster } from "@/components/ui/sonner";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function WritingPage() {
	// Animation variants matching home page modules
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: [0.25, 0.46, 0.45, 0.94] as const,
			},
		},
	};

	return (
		<div className="min-h-screen bg-transparent">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 max-w-6xl">
				{/* Hero Section */}
				<motion.div
					className="text-center mb-20"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
				>
					<div className="text-violet-300 bg-gradient-to-br from-violet-500/20 to-violet-600/10 mb-6 w-16 h-16 rounded-2xl flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_8px_18px_rgba(0,0,0,.35)] mx-auto border border-violet-400/40">
						<FileText className="h-8 w-8" />
					</div>
					<h1 className="text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight bg-gradient-to-r from-violet-300 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent mb-6">
						AI Writing Companion
					</h1>
					<p className="mt-4 max-w-2xl mx-auto text-lg leading-7 text-gray-400">
						Generate high-quality drafts. Describe the topic, then
						choose tone and length.
					</p>
				</motion.div>

				{/* Main Content with staggered animations */}
				<motion.div
					className="space-y-8"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					{/* Prompt Bar Card */}
					<motion.div variants={itemVariants}>
						<div className="bg-gradient-to-br from-[#1a0939] to-[#120024] backdrop-blur-lg border border-violet-400/40 shadow-lg rounded-2xl overflow-hidden">
							<div className="p-6">
								<PromptBar />
							</div>
						</div>
					</motion.div>

					{/* Result Panel Card */}
					<motion.div variants={itemVariants}>
						<div className="bg-gradient-to-br from-[#1a0939] to-[#120024] backdrop-blur-lg border border-violet-400/40 shadow-lg rounded-2xl overflow-hidden">
							<div className="p-6">
								<ResultPanel />
							</div>
						</div>
					</motion.div>
				</motion.div>
			</div>
			<Toaster />
		</div>
	);
}
