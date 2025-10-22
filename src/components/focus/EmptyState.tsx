"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Plus } from "lucide-react";
import type { EmptyStateProps } from "@/types/focus";

export function EmptyState({
	onAddFirstFocus,
	variant = "default",
}: EmptyStateProps) {
	const isEmbedded = variant === "embedded";

	if (isEmbedded) {
		return (
			<div className="text-center py-8">
				<Target className="h-10 w-10 text-purple-300/50 mx-auto mb-3" />
				<h3 className="text-base font-semibold text-slate-200 mb-2">
					No focus items yet
				</h3>
				<p className="text-sm text-slate-400 mb-4">
					Add up to 3 priorities for today to start tracking your
					progress
				</p>
				<Button
					onClick={onAddFirstFocus}
					size="sm"
					className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
				>
					<Plus className="h-4 w-4 mr-2" />
					Add your first focus
				</Button>
			</div>
		);
	}

	return (
		<Card className="bg-gradient-to-br from-[#1a0939] to-[#120024] border-purple-400/40">
			<CardContent className="p-12 text-center">
				<Target className="h-12 w-12 text-purple-300/50 mx-auto mb-4" />
				<h3 className="text-lg font-semibold text-slate-200 mb-2">
					No focus items yet
				</h3>
				<p className="text-slate-400 mb-6">
					Add up to 3 priorities for today to start tracking your
					progress
				</p>
				<Button
					onClick={onAddFirstFocus}
					className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
				>
					<Plus className="h-4 w-4 mr-2" />
					Add your first focus
				</Button>
			</CardContent>
		</Card>
	);
}
