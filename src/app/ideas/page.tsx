"use client";

/**
 * Purpose: Ideas page with unified design matching home page style.
 * Boundaries: Client-only demo; production page can be refactored later.
 * Owner: @anton (initial)
 */
import Board from "@/components/lazy/LazyBoard";
import { Toaster } from "@/components/ui/sonner";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

export default function IdeasPage() {
	return (
		<div className="min-h-screen bg-transparent">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 max-w-6xl">
				{/* Hero Section with improved typography */}
				<motion.div
					className="text-center mb-20"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
				>
					<div className="text-fuchsia-300 bg-gradient-to-br from-fuchsia-500/20 to-fuchsia-600/10 mb-6 w-16 h-16 rounded-2xl flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_8px_18px_rgba(0,0,0,.35)] mx-auto border border-fuchsia-400/40">
						<Lightbulb className="h-8 w-8" />
					</div>
					<h1 className="text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight bg-gradient-to-r from-violet-300 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent mb-6">
						AI Idea Board
					</h1>
					<p className="mt-4 max-w-2xl mx-auto text-lg leading-7 text-gray-400">
						Generate and organize ideas with drag&drop workflow for
						creative brainstorming. Features AI-powered idea
						generation, visual clustering, and intuitive
						organization tools.
					</p>
				</motion.div>

				{/* Main Content */}
				<motion.div
					className="space-y-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					<Board />
				</motion.div>
			</div>
			<Toaster />
		</div>
	);
}
