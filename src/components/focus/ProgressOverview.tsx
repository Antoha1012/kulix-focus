"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, RotateCcw } from "lucide-react";
import { FocusItem } from "./FocusItem";
import { EmptyState } from "./EmptyState";
import type { ProgressOverviewProps } from "@/types/focus";

export function ProgressOverview({
	completedCount,
	totalCount,
	progressPercentage,
	focusItems,
	onClearCompleted,
	onResetDay,
	onToggleItem,
	onRemoveItem,
	hasItems,
	onAddFirstFocus,
}: ProgressOverviewProps) {
	return (
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
								{completedCount} of {totalCount} completed
							</p>
						</div>
						<Badge
							variant="outline"
							className="text-purple-300 border-purple-400/40 bg-purple-500/10"
						>
							{progressPercentage}%
						</Badge>
					</div>

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

					<div className="flex flex-col sm:flex-row gap-2 mb-6">
						<Button
							variant="outline"
							size="sm"
							onClick={onClearCompleted}
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
							onClick={onResetDay}
							className="text-slate-300 border-slate-600 hover:bg-slate-700/50"
						>
							<RotateCcw className="h-4 w-4 mr-2" />
							<span className="hidden sm:inline">Reset day</span>
							<span className="sm:hidden">Reset</span>
						</Button>
					</div>

					<div className="mt-6">
						{hasItems ? (
							<div className="space-y-3">
								{focusItems.map((item, index) => (
									<FocusItem
										key={item.id}
										item={item}
										index={index}
										onToggle={onToggleItem}
										onRemove={onRemoveItem}
										variant="embedded"
									/>
								))}
							</div>
						) : (
							onAddFirstFocus && (
								<EmptyState
									onAddFirstFocus={onAddFirstFocus}
									variant="embedded"
								/>
							)
						)}
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
