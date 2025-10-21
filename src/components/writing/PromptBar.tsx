"use client";

/**
 * Purpose: Prompt controls for the Writing module with validation and generate action.
 * Boundaries: Client-only; calls server route /api/ai/router.
 * Owner: @anton (initial)
 */
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
	useWritingStore,
	type Tone,
	type Length,
} from "@/lib/store/writing.store";
import { fetchJson } from "@/lib/utils/fetch-json";
import { motion } from "framer-motion";
import { Sparkles, PenTool } from "lucide-react";

export default function PromptBar() {
	const { topic, tone, length, setTopic, setTone, setLength, setDraft } =
		useWritingStore();
	const [loading, setLoading] = useState(false);
	const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

	// Rotating placeholders for better UX
	const placeholders = [
		"e.g., Landing page copy for a note-taking app",
		"e.g., YouTube script about healthy sleep",
		"e.g., LinkedIn post: lessons from a failed startup",
		"e.g., Product update email for beta users",
		"e.g., Blog post about AI productivity tools",
	];

	// Rotate placeholder on focus/mount
	React.useEffect(() => {
		const interval = setInterval(() => {
			setCurrentPlaceholder(prev => (prev + 1) % placeholders.length);
		}, 3000);
		return () => clearInterval(interval);
	}, [placeholders.length]);

	// Common styles for all form elements - elegant writing theme style
	const commonInputStyles =
		"h-12 min-h-[48px] max-h-[48px] py-3 px-4 bg-slate-900/50 border border-slate-700/50 text-white rounded-lg shadow-sm hover:border-violet-400/50 hover:bg-slate-800/50 focus:border-violet-400 focus:bg-slate-800 focus:ring-2 focus:ring-violet-400/20 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 text-base flex items-center backdrop-blur-sm";

	async function onGenerate() {
		if (!topic.trim()) {
			toast.error("Please add a topic (5–80 words).");
			return;
		}
		if (topic.length > 300) {
			toast.error(
				"That brief looks too long. Keep it under 300 characters."
			);
			return;
		}
		setLoading(true);
		try {
			// Use unified fetchJson helper to keep error handling consistent across app
			const json = await fetchJson<
				| { ok: true; data: string }
				| { ok: false; error: { code: string; message: string } }
			>("/api/ai/router", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					tool: "write",
					payload: { topic, tone, length },
				}),
			});
			if (!("ok" in json) || json.ok !== true) {
				const msg =
					("error" in json && json.error?.message) ||
					"Failed to generate";
				throw new Error(msg);
			}
			setDraft(json.data);
			toast.success("Draft generated");
		} catch (e: unknown) {
			const message =
				e instanceof Error
					? e.message
					: "Something went wrong. Try again in a moment.";
			toast.error(message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
		>
			<div>
				<CardHeader className="pb-6">
					<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
						<motion.div
							className="text-violet-300 bg-gradient-to-br from-violet-500/20 to-violet-600/10 w-16 h-16 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_8px_18px_rgba(0,0,0,.35)] flex-shrink-0 mx-auto sm:mx-0"
							animate={{
								scale: [1, 1.05, 1],
								rotate: [0, 5, -5, 0],
							}}
							transition={{
								duration: 3,
								repeat: Infinity,
								ease: "easeInOut",
							}}
							whileHover={{
								scale: 1.1,
								boxShadow: "0 0 20px rgba(120,80,255,0.3)",
							}}
						>
							<Sparkles className="h-8 w-8 sm:h-7 sm:w-7" />
						</motion.div>
						<div className="text-center sm:text-left">
							<CardTitle className="text-2xl sm:text-3xl font-bold text-white mb-1">
								Create Your Draft
							</CardTitle>
							<CardDescription className="text-slate-400/80 text-sm">
								Describe your topic below, then customize tone
								and length.
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<div>
					{/* Input Form */}
					<div className="space-y-4">
						<div className="flex flex-col sm:flex-row gap-4">
							{/* Topic Input */}
							<div className="flex-1 relative min-w-0">
								<PenTool className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-violet-400/70 z-10" />
								<Input
									value={topic}
									onChange={e => setTopic(e.target.value)}
									placeholder={
										placeholders[currentPlaceholder]
									}
									disabled={loading}
									onKeyDown={e =>
										e.key === "Enter" &&
										!loading &&
										onGenerate()
									}
									aria-describedby="topic-help"
									aria-label="Topic or brief"
									className={`${commonInputStyles} pl-10 placeholder:text-white/50`}
									style={{
										height: "48px",
										minHeight: "48px",
										maxHeight: "48px",
									}}
								/>
							</div>

							{/* Tone Select */}
							<div className="w-full sm:w-38 flex-shrink-0">
								<Select
									value={tone}
									onValueChange={(v: Tone) => setTone(v)}
									disabled={loading}
								>
									<SelectTrigger
										className={`${commonInputStyles} w-full`}
										style={{
											height: "48px",
											minHeight: "48px",
											maxHeight: "48px",
										}}
										aria-label="Tone"
									>
										<SelectValue placeholder="Tone" />
									</SelectTrigger>
									<SelectContent className="bg-slate-900/95 border-slate-700/50 backdrop-blur-sm">
										<SelectItem
											value="neutral"
											className="text-white hover:bg-violet-500/20 focus:bg-violet-500/20"
										>
											Neutral
										</SelectItem>
										<SelectItem
											value="professional"
											className="text-white hover:bg-violet-500/20 focus:bg-violet-500/20"
										>
											Professional
										</SelectItem>
										<SelectItem
											value="friendly"
											className="text-white hover:bg-violet-500/20 focus:bg-violet-500/20"
										>
											Friendly
										</SelectItem>
										<SelectItem
											value="bold"
											className="text-white hover:bg-violet-500/20 focus:bg-violet-500/20"
										>
											Bold
										</SelectItem>
										<SelectItem
											value="playful"
											className="text-white hover:bg-violet-500/20 focus:bg-violet-500/20"
										>
											Playful
										</SelectItem>
										<SelectItem
											value="academic"
											className="text-white hover:bg-violet-500/20 focus:bg-violet-500/20"
										>
											Academic
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Length Select */}
							<div className="w-full sm:w-42 flex-shrink-0">
								<Select
									value={length}
									onValueChange={(v: Length) => setLength(v)}
									disabled={loading}
								>
									<SelectTrigger
										className={`${commonInputStyles} w-full`}
										style={{
											height: "48px",
											minHeight: "48px",
											maxHeight: "48px",
										}}
										aria-label="Length"
									>
										<SelectValue placeholder="Length" />
									</SelectTrigger>
									<SelectContent className="bg-slate-900/95 border-slate-700/50 backdrop-blur-sm">
										<SelectItem
											value="short"
											className="text-white hover:bg-violet-500/20 focus:bg-violet-500/20"
										>
											Short (~300)
										</SelectItem>
										<SelectItem
											value="medium"
											className="text-white hover:bg-violet-500/20 focus:bg-violet-500/20"
										>
											Medium (~700)
										</SelectItem>
										<SelectItem
											value="long"
											className="text-white hover:bg-violet-500/20 focus:bg-violet-500/20"
										>
											Long (~1200)
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Generate Button */}
							<div className="w-full sm:w-40 flex-shrink-0">
								<Button
									onClick={onGenerate}
									disabled={loading}
									className="w-full h-14 sm:h-12 px-6 sm:px-4 text-base sm:text-sm font-semibold bg-gradient-to-r from-violet-600 via-purple-600 to-violet-700 hover:from-violet-700 hover:via-purple-700 hover:to-violet-800 text-white shadow-[0_0_20px_rgba(120,80,255,0.4)] hover:shadow-[0_0_25px_rgba(120,80,255,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-xl border border-violet-400/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
								>
									{loading ? (
										<div className="flex items-center gap-2">
											<div className="animate-spin rounded-full h-5 w-5 sm:h-4 sm:w-4 border-b-2 border-white"></div>
											<span className="text-base sm:text-sm">
												Generating…
											</span>
										</div>
									) : (
										<div className="flex items-center gap-2">
											<motion.div
												animate={{
													rotate: [0, 15, -15, 0],
												}}
												transition={{
													duration: 0.6,
													repeat: Infinity,
													repeatDelay: 2,
												}}
												className="text-xl sm:text-lg"
											>
												<Sparkles className="h-5 w-5 sm:h-4 sm:w-4" />
											</motion.div>
											<span className="text-base sm:text-sm">
												Generate Draft
											</span>
										</div>
									)}
								</Button>
							</div>
						</div>
					</div>

					{/* Help Text */}
					<p
						id="topic-help"
						className="text-xs text-slate-500/70 mt-4 text-center"
					>
						Tip: 5–80 words. Bulleted notes work great too. Press
						Enter to generate.
					</p>
				</div>
			</div>
		</motion.div>
	);
}
