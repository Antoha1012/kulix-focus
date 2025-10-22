"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FocusItemProps } from "@/types/focus";

const FocusItemComponent = ({
	item,
	index,
	onToggle,
	onRemove,
	variant = "default",
}: FocusItemProps) => {
	const isEmbedded = variant === "embedded";

	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{
				duration: 0.4,
				delay: index * 0.1,
			}}
		>
			{isEmbedded ? (
				<div
					className={cn(
						"bg-slate-800/30 border border-slate-600/40 rounded-lg p-3 transition-all duration-300 cursor-pointer hover:border-slate-500/60 hover:bg-slate-800/50",
						item.completed &&
							"border-violet-400/40 bg-violet-500/10"
					)}
					onClick={() => onToggle(item.id)}
				>
					<div className="flex items-start gap-3">
						<div
							className={cn(
								"flex-shrink-0 mt-1",
								item.completed && "text-violet-300"
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
								{new Date(item.createdAt).toLocaleTimeString()}
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
								e.stopPropagation();
								onRemove(item.id);
							}}
							className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 p-1 h-auto flex-shrink-0"
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				</div>
			) : (
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
						onClick={() => onToggle(item.id)}
					>
						<div className="flex items-start gap-3">
							<div
								className={cn(
									"flex-shrink-0 mt-1",
									item.completed && "text-violet-300"
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
									e.stopPropagation();
									onRemove(item.id);
								}}
								className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 p-1 h-auto flex-shrink-0"
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						</div>
					</CardContent>
				</Card>
			)}
		</motion.div>
	);
};

export const FocusItem = memo(FocusItemComponent);
