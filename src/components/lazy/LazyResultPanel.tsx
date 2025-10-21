"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skeleton";

// Lazy load the ResultPanel component with loading fallback
const ResultPanel = dynamic(() => import("@/components/writing/ResultPanel"), {
	loading: () => (
		<div className="space-y-4">
			<Skeleton className="h-8 w-32" />
			<Skeleton className="h-32 w-full" />
			<div className="flex space-x-2">
				<Skeleton className="h-10 w-20" />
				<Skeleton className="h-10 w-20" />
			</div>
		</div>
	),
	ssr: false, // Disable SSR for better performance
});

export default ResultPanel;
