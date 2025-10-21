"use client";

/**
 * Purpose: Ideas generation form and board with drag&drop columns.
 * Boundaries: Client-only; calls API and manages ideas state.
 * Owner: @anton (initial)
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIdeasStore } from "@/lib/store/ideas.store";
import { fetchJson } from "@/lib/utils/fetch-json";
import { toast } from "sonner";
import Column from "./Column";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Board() {
	const { columns, addIdea } = useIdeasStore();
	const [topic, setTopic] = useState("");
	const [loading, setLoading] = useState(false);

	async function generateIdeas() {
		if (!topic.trim()) {
			toast.error("Topic is required");
			return;
		}

		setLoading(true);
		try {
			const json = await fetchJson<
				| {
						ok: true;
						data: { items: { content: string; tags: string[] }[] };
				  }
				| { ok: false; error: { code: string; message: string } }
			>("/api/ai/router", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					tool: "ideas",
					payload: { topic: topic.trim(), count: 5 },
				}),
			});

			if (!("ok" in json) || json.ok !== true) {
				const msg =
					("error" in json && json.error?.message) ||
					"Failed to generate ideas";
				throw new Error(msg);
			}

			// Add generated ideas to "To Explore" column
			json.data.items.forEach(item => {
				addIdea({
					content: item.content,
					tags: item.tags,
					columnId: "to-explore",
				});
			});

			toast.success(`Generated ${json.data.items.length} ideas`);
			setTopic("");
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : "Unknown error";
			toast.error(message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="space-y-8">
			{/* Ideas Generation Card */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				<Card className="bg-gradient-to-br from-[#1a0939] to-[#120024] backdrop-blur-lg border border-fuchsia-400/40 shadow-lg hover:shadow-fuchsia-400/40 transition-all duration-300">
					<CardHeader>
						<div className="flex items-center gap-3">
							<div className="text-fuchsia-300 bg-gradient-to-br from-fuchsia-500/20 to-fuchsia-600/10 w-10 h-10 rounded-xl flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_8px_18px_rgba(0,0,0,.35)] border border-fuchsia-400/40">
								<Sparkles className="h-5 w-5" />
							</div>
							<CardTitle className="text-xl font-bold text-slate-100">
								Generate Ideas
							</CardTitle>
						</div>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col sm:flex-row gap-3">
							<Input
								value={topic}
								onChange={e => setTopic(e.target.value)}
								placeholder="Enter topic for idea generation..."
								onKeyDown={e =>
									e.key === "Enter" && generateIdeas()
								}
								className="bg-slate-800/50 border-slate-600/40 text-slate-200 placeholder:text-slate-400 focus:border-fuchsia-400/50 focus:ring-fuchsia-400/20 flex-1"
							/>
							<Button
								onClick={generateIdeas}
								disabled={loading}
								className="bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 hover:from-fuchsia-600 hover:to-fuchsia-700 text-white border-fuchsia-400/40 shadow-lg hover:shadow-fuchsia-400/40 transition-all duration-300 w-full sm:w-auto"
							>
								{loading ? "Generating..." : "Generate Ideas"}
							</Button>
						</div>
					</CardContent>
				</Card>
			</motion.div>

			{/* Columns Grid */}
			<motion.div
				className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
			>
				{columns.map(column => (
					<Column key={column.id} column={column} />
				))}
			</motion.div>
		</div>
	);
}
