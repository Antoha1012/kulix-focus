"use client";

import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { useWritingStore } from "@/lib/store/writing.store";
import { toast } from "sonner";
import EmptyState from "@/components/ui/EmptyState";
import { FileText, Copy } from "lucide-react";
import { motion } from "framer-motion";

export default function ResultPanel() {
	const { draft } = useWritingStore();

	async function copy() {
		try {
			await navigator.clipboard.writeText(draft || "");
			toast.success("Copied");
		} catch {
			toast.error("Copy failed");
		}
	}

	if (!draft) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
			>
				<div>
					<div className="p-12 text-center">
						<EmptyState
							icon={
								<FileText className="h-16 w-16 text-slate-500" />
							}
							title="No draft yet"
							description="Enter a topic and click Generate to create your first draft."
						/>
					</div>
				</div>
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.2 }}
		>
			<div>
				<CardHeader className="flex flex-row items-center justify-between pb-4">
					<div>
						<CardTitle className="text-2xl font-bold text-slate-200">
							Generated Draft
						</CardTitle>
						<p className="text-slate-400 mt-1">
							Your AI-generated content is ready
						</p>
					</div>
					<Button
						variant="secondary"
						onClick={copy}
						className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-[0_0_15px_rgba(120,80,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-xl"
					>
						<Copy className="h-4 w-4 mr-2" />
						Copy to Clipboard
					</Button>
				</CardHeader>
				<div>
					<div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600/40 backdrop-blur-sm">
						<pre className="whitespace-pre-wrap text-slate-300 leading-relaxed text-base font-medium">
							{draft}
						</pre>
					</div>
					<p className="text-xs text-slate-500/70 mt-4 text-center">
						Not right? Adjust tone or length and generate again.
					</p>
				</div>
			</div>
		</motion.div>
	);
}
