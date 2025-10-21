"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
	Target,
	Plus,
	Trash2,
	CheckCircle2,
	Circle,
	RotateCcw,
	Sparkles,
	X,
} from "lucide-react";
import { useFocusStore } from "@/lib/store/focus.store";
import { cn } from "@/lib/utils";
import { fetchJson } from "@/lib/utils/fetch-json";

export default function FocusPage() {
	const [newFocusText, setNewFocusText] = useState("");
	const [aiContext, setAiContext] = useState("");
	const [showAiSuggestions, setShowAiSuggestions] = useState(false);
	const [aiSuggestions, setAiSuggestions] = useState<{priority: string; reason: string; category: string}[]>([]);
	const [isLoadingAi, setIsLoadingAi] = useState(false);

	const {
		focusItems,
		addFocusItem,
		toggleFocusItem,
		removeFocusItem,
		clearCompleted,
		resetDay,
		getCompletedCount,
		getTotalCount,
		getProgressPercentage,
	} = useFocusStore();

	// Calculate values directly from store - no need for separate state
	const completedCount = getCompletedCount();
	const totalCount = getTotalCount();
	const progressPercentage = getProgressPercentage();

	const handleAddFocus = () => {
		if (newFocusText.trim() && focusItems.length < 3) {
			addFocusItem(newFocusText);
			setNewFocusText("");
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleAddFocus();
		}
	};

	const handleGetAiSuggestions = async () => {
		if (!aiContext.trim()) return;
		
		setIsLoadingAi(true);
		try {
			const data = await fetchJson<{ok: boolean; data: {items: {priority: string; reason: string; category: string}[]}}>("/api/ai/router", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					tool: "focus",
					payload: {
						context: aiContext,
						existingPriorities: focusItems.map(item => item.text),
						count: 3,
					},
				}),
			});

			if (data.ok) {
				setAiSuggestions(data.data.items);
				setShowAiSuggestions(true);
			}
		} catch (error) {
			console.error("AI suggestions error:", error);
		} finally {
			setIsLoadingAi(false);
		}
	};

	const handleAddAiSuggestion = (suggestion: {priority: string; reason: string; category: string}) => {
		addFocusItem(suggestion.priority);
		setShowAiSuggestions(false);
		setAiContext("");
	};

	const canAddMore = focusItems.length < 3;
	const hasItems = focusItems.length > 0;

	return (
		<div className="min-h-screen bg-transparent">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 max-w-6xl">
				{/* Header */}
				<motion.div
					className="text-center mb-20"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
				>
					<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl mb-6 border border-purple-400/40">
						<Target className="h-8 w-8 text-purple-300" />
					</div>
					<h1 className="text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight bg-gradient-to-r from-violet-300 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent mb-6">
						AI Focus Tracker
					</h1>
					<p className="mt-4 max-w-2xl mx-auto text-lg leading-7 text-gray-400">
						Track your top 3 priorities for today with AI-powered suggestions. 
						Get personalized focus recommendations based on your context.
					</p>
				</motion.div>

				{/* Progress Overview */}
				{hasItems && (
					<motion.div
						className="mb-8"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<Card className="bg-gradient-to-br from-[#1a0939] to-[#120024] border-purple-400/40">
							<CardContent className="p-6">
								<div className="flex items-center justify-between mb-4">
									<div>
										<h3 className="text-lg font-semibold text-slate-100">
											Today&apos;s Progress
										</h3>
										<p className="text-sm text-slate-400">
											{completedCount} of {totalCount}{" "}
											completed
										</p>
									</div>
									<Badge
										variant="outline"
										className="text-purple-300 border-purple-400/40 bg-purple-500/10"
									>
										{progressPercentage}%
									</Badge>
								</div>

								{/* Progress bar */}
								<div className="w-full bg-slate-700/50 rounded-full h-2 mb-4">
									<motion.div
										className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full"
										initial={{ width: 0 }}
										animate={{
											width: `${progressPercentage}%`,
										}}
										transition={{
											duration: 0.8,
											delay: 0.4,
										}}
									/>
								</div>

								{/* Action buttons */}
								<div className="flex flex-col sm:flex-row gap-2">
									<Button
										variant="outline"
										size="sm"
										onClick={clearCompleted}
										disabled={completedCount === 0}
										className="text-slate-300 border-slate-600 hover:bg-slate-700/50"
									>
										<Trash2 className="h-4 w-4 mr-2" />
										<span className="hidden sm:inline">
											Clear completed
										</span>
										<span className="sm:hidden">Clear</span>
									</Button>
									<Button
										variant="outline"
										size="sm"
										onClick={resetDay}
										className="text-slate-300 border-slate-600 hover:bg-slate-700/50"
									>
										<RotateCcw className="h-4 w-4 mr-2" />
										<span className="hidden sm:inline">
											Reset day
										</span>
										<span className="sm:hidden">Reset</span>
									</Button>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				)}

				{/* Add Focus Form */}
				{canAddMore && (
					<motion.div
						className="mb-8"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
					>
						<Card className="bg-gradient-to-br from-[#1a0939] to-[#120024] border-purple-400/40">
							<CardContent className="p-4 sm:p-6">
								<div className="flex flex-col sm:flex-row gap-3">
									<Input
										value={newFocusText}
										onChange={e =>
											setNewFocusText(e.target.value)
										}
										onKeyPress={handleKeyPress}
										placeholder="What's your focus for today?"
										className="flex-1 bg-slate-800/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-purple-400"
										maxLength={100}
									/>
									<Button
										onClick={handleAddFocus}
										disabled={!newFocusText.trim()}
										className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white w-full sm:w-auto"
									>
										<Plus className="h-4 w-4 mr-2" />
										<span className="hidden sm:inline">
											Add Focus
										</span>
										<span className="sm:hidden">Add</span>
									</Button>
								</div>
								<p className="text-xs text-slate-500 mt-2 text-center sm:text-left">
									{focusItems.length}/3 focus items • Press
									Enter to add
								</p>
							</CardContent>
						</Card>
					</motion.div>
				)}

				{/* AI Suggestions */}
				<motion.div
					className="mb-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
				>
					<Card className="bg-gradient-to-br from-[#1a0939] to-[#120024] border-purple-400/40">
						<CardContent className="p-4 sm:p-6">
							<div className="flex flex-col sm:flex-row gap-3">
								<Input
									value={aiContext}
									onChange={e => setAiContext(e.target.value)}
									placeholder="e.g., 'Important presentation tomorrow, need to prepare report and meet with client'"
									className="flex-1 bg-slate-800/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-purple-400"
									maxLength={200}
								/>
								<Button
									onClick={handleGetAiSuggestions}
									disabled={!aiContext.trim() || isLoadingAi}
									className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white w-full sm:w-auto"
								>
									<Sparkles className="h-4 w-4 mr-2" />
									{isLoadingAi ? "Thinking..." : "Get AI Suggestions"}
								</Button>
							</div>
							<p className="text-xs text-slate-500 mt-2 text-center sm:text-left">
								AI will suggest personalized priorities based on your context
							</p>
							<div className="mt-3">
								<p className="text-xs text-slate-400 mb-2">Quick examples:</p>
								<div className="flex flex-wrap gap-2">
									{[
										"Important work presentation",
										"Family weekend day", 
										"Exam preparation",
										"New project start"
									].map((example, index) => (
										<Button
											key={index}
											variant="outline"
											size="sm"
											onClick={() => setAiContext(example)}
											className="text-xs text-slate-400 border-slate-600 hover:border-purple-400 hover:text-purple-300 h-6 px-2"
										>
											{example}
										</Button>
									))}
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{/* AI Suggestions Modal */}
				{showAiSuggestions && (
					<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							className="bg-gradient-to-br from-[#1a0939] to-[#120024] border border-purple-400/40 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
						>
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-xl font-semibold text-slate-100">
									AI Suggestions
								</h3>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => setShowAiSuggestions(false)}
									className="text-slate-400 hover:text-slate-200"
								>
									<X className="h-4 w-4" />
								</Button>
							</div>
							<div className="space-y-3">
								{aiSuggestions.map((suggestion, index) => (
									<Card key={index} className="bg-slate-800/50 border-slate-600/40">
										<CardContent className="p-4">
											<div className="flex items-start justify-between">
												<div className="flex-1">
													<h4 className="font-medium text-slate-100 mb-2">
														{suggestion.priority}
													</h4>
													<p className="text-sm text-slate-400 mb-2">
														{suggestion.reason}
													</p>
													<Badge
														variant="outline"
														className="text-xs text-purple-300 border-purple-400/40"
													>
														{suggestion.category}
													</Badge>
												</div>
												<Button
													size="sm"
													onClick={() => handleAddAiSuggestion(suggestion)}
													disabled={!canAddMore}
													className="ml-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
												>
													<Plus className="h-4 w-4" />
												</Button>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						</motion.div>
					</div>
				)}

				{/* Focus Items List */}
				<motion.div
					className="space-y-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.4 }}
				>
					{!hasItems ? (
						<Card className="bg-gradient-to-br from-[#1a0939] to-[#120024] border-purple-400/40">
							<CardContent className="p-12 text-center">
								<Target className="h-12 w-12 text-purple-300/50 mx-auto mb-4" />
								<h3 className="text-lg font-semibold text-slate-200 mb-2">
									No focus items yet
								</h3>
								<p className="text-slate-400 mb-6">
									Add up to 3 priorities for today to start
									tracking your progress
								</p>
								<Button
									onClick={() =>
										document.querySelector("input")?.focus()
									}
									className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
								>
									<Plus className="h-4 w-4 mr-2" />
									Add your first focus
								</Button>
							</CardContent>
						</Card>
					) : (
						focusItems.map((item, index) => (
							<motion.div
								key={item.id}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{
									duration: 0.4,
									delay: index * 0.1,
								}}
							>
								<Card
									className={cn(
										"bg-gradient-to-br from-[#1a0939] to-[#120024] border transition-all duration-300 cursor-pointer hover:border-purple-300/60 hover:shadow-lg hover:shadow-purple-500/10",
										item.completed
											? "border-violet-400/40 bg-violet-500/5"
											: "border-purple-400/40"
									)}
								>
									<CardContent
										className="p-4"
										onClick={() => toggleFocusItem(item.id)}
									>
										<div className="flex items-start gap-3">
											<div
												className={cn(
													"flex-shrink-0 mt-1",
													item.completed &&
														"text-violet-300"
												)}
											>
												{item.completed ? (
													<CheckCircle2 className="h-5 w-5" />
												) : (
													<Circle className="h-5 w-5 text-slate-400" />
												)}
											</div>

											<div className="flex-1 min-w-0">
												<p
													className={cn(
														"text-slate-100 transition-all duration-300 break-words",
														item.completed &&
															"line-through text-slate-400"
													)}
												>
													{item.text}
												</p>
												<p className="text-xs text-slate-500 mt-1 break-words">
													Added{" "}
													{new Date(
														item.createdAt
													).toLocaleTimeString()}
													{item.completedAt && (
														<span className="text-violet-300 ml-2">
															• Completed{" "}
															{new Date(
																item.completedAt
															).toLocaleTimeString()}
														</span>
													)}
												</p>
											</div>

											<Button
												variant="ghost"
												size="sm"
												onClick={e => {
													e.stopPropagation(); // Prevent card click
													removeFocusItem(item.id);
												}}
												className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 p-1 h-auto flex-shrink-0"
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))
					)}
				</motion.div>

				{/* Tips Section */}
				{hasItems && (
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
									<li className="flex items-center gap-3">
										<div className="w-2 h-2 rounded-full bg-purple-300 flex-shrink-0"></div>
										<span>
											Keep your focus items specific and
											actionable
										</span>
									</li>
									<li className="flex items-center gap-3">
										<div className="w-2 h-2 rounded-full bg-purple-300 flex-shrink-0"></div>
										<span>
											Review and update them each morning
										</span>
									</li>
									<li className="flex items-center gap-3">
										<div className="w-2 h-2 rounded-full bg-purple-300 flex-shrink-0"></div>
										<span>
											Celebrate small wins when you
											complete items
										</span>
									</li>
									<li className="flex items-center gap-3">
										<div className="w-2 h-2 rounded-full bg-purple-300 flex-shrink-0"></div>
										<span>
											If you consistently don&apos;t
											complete items, they might be too
											ambitious
										</span>
									</li>
								</ul>
							</CardContent>
						</Card>
					</motion.div>
				)}
			</div>
		</div>
	);
}
