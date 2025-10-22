"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
	className?: string;
	animate?: boolean;
}

export function Skeleton({ className = "", animate = true }: SkeletonProps) {
	const baseClasses = "bg-muted rounded-md";

	if (!animate) {
		return <div className={`${baseClasses} ${className}`} />;
	}

	return (
		<motion.div
			className={`${baseClasses} ${className}`}
			animate={{ opacity: [0.5, 1, 0.5] }}
			transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
		/>
	);
}

export function CardSkeleton() {
	return (
		<div className="border rounded-lg p-4 space-y-3">
			<Skeleton className="h-4 w-3/4" />
			<Skeleton className="h-3 w-full" />
			<Skeleton className="h-3 w-2/3" />
		</div>
	);
}

export function ListSkeleton({ count = 3 }: { count?: number }) {
	return (
		<div className="space-y-3">
			{Array.from({ length: count }).map((_, i) => (
				<motion.div
					key={i}
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: i * 0.1 }}
				>
					<CardSkeleton />
				</motion.div>
			))}
		</div>
	);
}
