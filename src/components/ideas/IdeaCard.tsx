"use client";

/**
 * Purpose: Individual idea card component with drag&drop support.
 * Boundaries: Client-only; receives callbacks via props.
 * Owner: @anton (initial)
 */
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIdeasStore, type IdeaItem } from "@/lib/store/ideas.store";
import { useFocusStore } from "@/lib/store/focus.store";
import { toast } from "sonner";
import { X, Target } from "lucide-react";

interface IdeaCardProps {
	idea: IdeaItem;
}

export default function IdeaCard({ idea }: IdeaCardProps) {
	const { removeIdea } = useIdeasStore();
	const { addFocusItem, focusItems } = useFocusStore();

	function handleDelete() {
		removeIdea(idea.id);
		toast.success("Idea removed");
	}

	function handleAddToFocus() {
		// Check if we can add more focus items
		if (focusItems.length >= 3) {
			toast.error("Maximum 3 focus items allowed per day");
			return;
		}

		addFocusItem(idea.content);
		toast.success("Added to today's focus");
	}

	function handleDragStart(e: React.DragEvent) {
		e.dataTransfer.setData("text/plain", idea.id);
		e.dataTransfer.setData("application/column", idea.columnId);
		e.dataTransfer.effectAllowed = "move";
	}

	return (
		<Card
			className="cursor-move hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-slate-800/50 border-slate-600/40 hover:border-slate-500/60 hover:shadow-slate-500/25"
			draggable
			onDragStart={handleDragStart}
			role="button"
			tabIndex={0}
			aria-label={`Idea: ${idea.content}`}
			onKeyDown={e => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					// Could add edit functionality here
				}
			}}
		>
			<CardContent className="p-4">
				<div className="space-y-3">
					<p className="text-sm text-slate-200 leading-relaxed">
						{idea.content}
					</p>

					{idea.tags.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{idea.tags.map((tag, index) => (
								<Badge
									key={index}
									variant="secondary"
									className="text-xs bg-slate-700/50 text-slate-300 border-slate-600/40 hover:bg-slate-600/50 transition-colors"
								>
									{tag}
								</Badge>
							))}
						</div>
					)}

					<div className="flex justify-between items-center">
						<Button
							variant="outline"
							size="sm"
							onClick={handleAddToFocus}
							disabled={focusItems.length >= 3}
							className="text-purple-300 border-purple-400/40 hover:bg-purple-500/10 hover:border-purple-400/60 transition-all duration-200"
						>
							<Target className="h-3 w-3 mr-1" />
							Add to Focus
						</Button>

						<Button
							variant="ghost"
							size="sm"
							onClick={handleDelete}
							className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
