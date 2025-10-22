"use client";

import { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFocusAPI } from "@/hooks/useFocusAPI";
import type {
	AISuggestion,
	AddFocusSectionProps,
	TabType,
} from "@/types/focus";

const AddFocusSectionComponent = ({
	onAddFocus,
	focusItemsCount,
	maxItems,
	existingPriorities,
}: AddFocusSectionProps) => {
	const [newFocusText, setNewFocusText] = useState("");
	const [aiContext, setAiContext] = useState("");
	const [showAiSuggestions, setShowAiSuggestions] = useState(false);
	const [aiSuggestions, setAiSuggestions] = useState<readonly AISuggestion[]>(
		[]
	);
	const [isLoadingAi, setIsLoadingAi] = useState(false);
	const [activeTab, setActiveTab] = useState<TabType>("manual");
	const { getAISuggestions } = useFocusAPI();

	const canAddMore = focusItemsCount < maxItems;

	const handleAddFocus = useCallback(() => {
		if (newFocusText.trim()) {
			onAddFocus(newFocusText);
			setNewFocusText("");
		}
	}, [newFocusText, onAddFocus]);

	const handleGetAiSuggestions = useCallback(async () => {
		if (!aiContext.trim()) return;

		setIsLoadingAi(true);
		try {
			// Request AI suggestions based on user context
			// Pass existing priorities to avoid duplicates
			const suggestions = await getAISuggestions(
				aiContext,
				existingPriorities,
				3
			);
			setAiSuggestions(suggestions);
			setShowAiSuggestions(true);
		} catch (error) {
			console.error("AI suggestions error:", error);
		} finally {
			setIsLoadingAi(false);
		}
	}, [aiContext, existingPriorities, getAISuggestions]);

	const handleAddAiSuggestion = useCallback(
		(suggestion: AISuggestion) => {
			// Add AI suggestion as a new focus item
			// Clear the modal and context after adding
			onAddFocus(suggestion.priority);
			setShowAiSuggestions(false);
			setAiContext("");
		},
		[onAddFocus]
	);

	const handleKeyPress = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Enter") {
				if (activeTab === "manual") {
					handleAddFocus();
				} else {
					handleGetAiSuggestions();
				}
			}
		},
		[activeTab, handleAddFocus, handleGetAiSuggestions]
	);

	const handleTabChange = useCallback((tab: TabType) => {
		setActiveTab(tab);
	}, []);

	const handleExampleClick = useCallback((example: string) => {
		setAiContext(example);
	}, []);

	if (!canAddMore) {
		return null;
	}

	const quickExamples = [
		"Important work presentation",
		"Family weekend day",
		"Exam preparation",
		"New project start",
	];

	return (
		<>
			<motion.div
				className="mb-8"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.3 }}
			>
				<Card className="bg-gradient-to-br from-[#1a0939] to-[#120024] border-purple-400/40">
					<CardContent className="p-4 sm:p-6">
						<div className="flex gap-2 mb-4">
							<Button
								variant={
									activeTab === "manual"
										? "default"
										: "outline"
								}
								size="sm"
								onClick={() => handleTabChange("manual")}
								className={cn(
									"flex-1",
									activeTab === "manual"
										? "bg-purple-500 hover:bg-purple-600"
										: "text-slate-400 border-slate-600 hover:border-purple-400"
								)}
							>
								<Plus className="h-4 w-4 mr-2" />
								Manual
							</Button>
							<Button
								variant={
									activeTab === "ai" ? "default" : "outline"
								}
								size="sm"
								onClick={() => handleTabChange("ai")}
								className={cn(
									"flex-1",
									activeTab === "ai"
										? "bg-purple-500 hover:bg-purple-600"
										: "text-slate-400 border-slate-600 hover:border-purple-400"
								)}
							>
								<Sparkles className="h-4 w-4 mr-2" />
								AI Assistant
							</Button>
						</div>

						{activeTab === "manual" && (
							<div className="space-y-3">
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
								<p className="text-xs text-slate-500 text-center sm:text-left">
									{focusItemsCount}/{maxItems} focus items •
									Press Enter to add
								</p>
							</div>
						)}

						{activeTab === "ai" && (
							<div className="space-y-3">
								<div className="flex flex-col sm:flex-row gap-3">
									<Input
										value={aiContext}
										onChange={e =>
											setAiContext(e.target.value)
										}
										onKeyPress={handleKeyPress}
										placeholder="e.g., 'Important presentation tomorrow, need to prepare report and meet with client'"
										className="flex-1 bg-slate-800/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-purple-400"
										maxLength={200}
									/>
									<Button
										onClick={handleGetAiSuggestions}
										disabled={
											!aiContext.trim() || isLoadingAi
										}
										className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white w-full sm:w-auto"
									>
										<Sparkles className="h-4 w-4 mr-2" />
										{isLoadingAi
											? "Thinking..."
											: "Get AI Suggestions"}
									</Button>
								</div>
								<p className="text-xs text-slate-500 text-center sm:text-left">
									AI will suggest personalized priorities
									based on your context
								</p>
								<div className="mt-3">
									<p className="text-xs text-slate-400 mb-2">
										Quick examples:
									</p>
									<div className="flex flex-wrap gap-2">
										{quickExamples.map((example, index) => (
											<Button
												key={index}
												variant="outline"
												size="sm"
												onClick={() =>
													handleExampleClick(example)
												}
												className="text-xs text-slate-400 border-slate-600 hover:border-purple-400 hover:text-purple-300 h-6 px-2"
											>
												{example}
											</Button>
										))}
									</div>
								</div>
							</div>
						)}
					</CardContent>
				</Card>
			</motion.div>

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
								<Card
									key={index}
									className="bg-slate-800/50 border-slate-600/40"
								>
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
												onClick={() =>
													handleAddAiSuggestion(
														suggestion
													)
												}
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
		</>
	);
};

export const AddFocusSection = memo(AddFocusSectionComponent);
