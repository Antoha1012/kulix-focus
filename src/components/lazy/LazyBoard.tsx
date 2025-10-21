"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skeleton";

// Lazy load the Board component with loading fallback
const Board = dynamic(() => import("@/components/ideas/Board"), {
	loading: () => (
		<div className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{Array.from({ length: 3 }).map((_, i) => (
					<div key={i} className="space-y-3">
						<Skeleton className="h-8 w-24" />
						<div className="space-y-2">
							<Skeleton className="h-20 w-full" />
							<Skeleton className="h-20 w-full" />
							<Skeleton className="h-20 w-full" />
						</div>
					</div>
				))}
			</div>
		</div>
	),
	ssr: false, // Disable SSR for better performance
});

export default Board;
