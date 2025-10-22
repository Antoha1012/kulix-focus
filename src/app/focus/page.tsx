"use client";

import { Target } from "lucide-react";
import dynamic from "next/dynamic";
import { useFocusStore } from "@/lib/store/focus.store";
import { useFocusActions } from "@/hooks/useFocusActions";
import { PageLayout } from "@/components/common/PageLayout";
import { FocusTips } from "@/components/focus";

const ProgressOverview = dynamic(
	() =>
		import("@/components/focus/ProgressOverview").then(mod => ({
			default: mod.ProgressOverview,
		})),
	{
		ssr: false,
	}
);

const AddFocusSection = dynamic(
	() =>
		import("@/components/focus/AddFocusSection").then(mod => ({
			default: mod.AddFocusSection,
		})),
	{
		ssr: false,
	}
);

export default function FocusPage() {
	const { focusItems } = useFocusStore();
	const {
		handleAddFocus,
		handleToggleItem,
		handleRemoveItem,
		handleClearCompleted,
		handleResetDay,
		handleAddFirstFocus,
		completedCount,
		totalCount,
		progressPercentage,
	} = useFocusActions();

	const canAddMore = focusItems.length < 3;
	const hasItems = focusItems.length > 0;

	return (
		<PageLayout
			title="AI Focus Tracker"
			description="Track your top 3 priorities for today with AI-powered suggestions.
			Get personalized focus recommendations based on your context."
			icon={<Target className="h-8 w-8" />}
		>
			<ProgressOverview
				completedCount={completedCount}
				totalCount={totalCount}
				progressPercentage={progressPercentage}
				focusItems={focusItems}
				onClearCompleted={handleClearCompleted}
				onResetDay={handleResetDay}
				onToggleItem={handleToggleItem}
				onRemoveItem={handleRemoveItem}
				hasItems={hasItems}
				onAddFirstFocus={handleAddFirstFocus}
			/>

			{canAddMore && (
				<AddFocusSection
					onAddFocus={handleAddFocus}
					focusItemsCount={focusItems.length}
					maxItems={3}
					existingPriorities={focusItems.map(item => item.text)}
				/>
			)}

			<FocusTips />
		</PageLayout>
	);
}
