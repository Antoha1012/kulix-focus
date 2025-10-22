"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	useIdeasStore,
	type Column,
	type ColumnId,
} from "@/lib/store/ideas.store";
import IdeaCard from "./IdeaCard";
import EmptyState from "@/components/ui/EmptyState";
import { motion } from "framer-motion";
import { Lightbulb, Archive, Star, Trash2 } from "lucide-react";

interface ColumnProps {
	column: Column;
}

const columnIcons = {
	"to-explore": <Lightbulb className="h-12 w-12" />,
	shortlist: <Star className="h-12 w-12" />,
	archive: <Archive className="h-12 w-12" />,
};

const columnDescriptions = {
	"to-explore":
		"Generated ideas will appear here. Drag promising ones to Shortlist.",
	shortlist: "Your best ideas live here. Move completed ones to Archive.",
	archive: "Completed or discarded ideas. You can always move them back.",
};

const columnColors = {
	"to-explore": {
		border: "border-fuchsia-400/40",
		hover: "hover:shadow-fuchsia-400/40",
		iconBg: "bg-gradient-to-br from-fuchsia-500/20 to-fuchsia-600/10",
		iconColor: "text-fuchsia-300",
		buttonBg:
			"bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 hover:from-fuchsia-600 hover:to-fuchsia-700",
		buttonBorder: "border-fuchsia-400/40",
		buttonShadow: "hover:shadow-fuchsia-400/40",
	},
	shortlist: {
		border: "border-purple-400/40",
		hover: "hover:shadow-purple-400/40",
		iconBg: "bg-gradient-to-br from-purple-500/20 to-purple-600/10",
		iconColor: "text-purple-300",
		buttonBg:
			"bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
		buttonBorder: "border-purple-400/40",
		buttonShadow: "hover:shadow-purple-400/40",
	},
	archive: {
		border: "border-slate-400/40",
		hover: "hover:shadow-slate-400/40",
		iconBg: "bg-gradient-to-br from-slate-500/20 to-slate-600/10",
		iconColor: "text-slate-300",
		buttonBg:
			"bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700",
		buttonBorder: "border-slate-400/40",
		buttonShadow: "hover:shadow-slate-400/40",
	},
};

export default function Column({ column }: ColumnProps) {
	const { moveIdea, clearColumn } = useIdeasStore();
	const [isDragOver, setIsDragOver] = useState(false);
	const colors = columnColors[column.id];

	function handleDragOver(e: React.DragEvent) {
		e.preventDefault();
		setIsDragOver(true);
	}

	function handleDragLeave() {
		setIsDragOver(false);
	}

	function handleDrop(e: React.DragEvent) {
		e.preventDefault();
		setIsDragOver(false);

		const ideaId = e.dataTransfer.getData("text/plain");
		const fromColumn = e.dataTransfer.getData(
			"application/column"
		) as ColumnId;

		if (fromColumn !== column.id) {
			moveIdea(ideaId, fromColumn, column.id);
		}
	}

	function handleClear() {
		clearColumn(column.id);
	}

	return (
		<Card
			className={`bg-gradient-to-br from-[#1a0939] to-[#120024] backdrop-blur-lg border ${colors.border} shadow-lg ${colors.hover} transition-all duration-300 ${isDragOver ? "ring-2 ring-primary scale-105" : ""}`}
		>
			<CardHeader className="flex flex-row items-center justify-between">
				<div className="flex items-center gap-3">
					<div
						className={`${colors.iconColor} ${colors.iconBg} w-10 h-10 rounded-lg flex items-center justify-center p-2 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_8px_18px_rgba(0,0,0,.35)] border ${colors.border.replace("/40", "/40")}`}
					>
						{columnIcons[column.id]}
					</div>
					<CardTitle className="text-lg font-bold text-slate-200">
						{column.title}
					</CardTitle>
				</div>

				{column.items.length > 0 && (
					<Button
						variant="ghost"
						size="sm"
						onClick={handleClear}
						className="text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors"
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				)}
			</CardHeader>
			<CardContent
				className="space-y-3 min-h-[300px]"
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				role="region"
				aria-label={`${column.title} column`}
				aria-describedby={`${column.id}-description`}
			>
				{column.items.length === 0 ? (
					<>
						<EmptyState
							icon={columnIcons[column.id]}
							title={`No ${column.title.toLowerCase()}`}
							description={columnDescriptions[column.id]}
						/>
						<p id={`${column.id}-description`} className="sr-only">
							{columnDescriptions[column.id]}
						</p>
					</>
				) : (
					column.items.map((idea, index) => (
						<motion.div
							key={idea.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
						>
							<IdeaCard idea={idea} />
						</motion.div>
					))
				)}
			</CardContent>
		</Card>
	);
}
