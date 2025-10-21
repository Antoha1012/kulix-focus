"use client";

/**
 * Purpose: Empty state component for when no content is available.
 * Boundaries: Pure UI component; receives content via props.
 * Owner: @anton (initial)
 */
import { motion } from "framer-motion";

interface EmptyStateProps {
	icon?: React.ReactNode;
	title: string;
	description: string;
	action?: React.ReactNode;
}

export default function EmptyState({
	icon,
	title,
	description,
	action,
}: EmptyStateProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="flex flex-col items-center justify-center py-12 px-4 text-center"
		>
			{icon && (
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ delay: 0.1, duration: 0.3 }}
					className="mb-4 text-muted-foreground"
				>
					{icon}
				</motion.div>
			)}

			<h3 className="text-lg font-semibold mb-2">{title}</h3>
			<p className="text-muted-foreground mb-6 max-w-md">{description}</p>

			{action && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
				>
					{action}
				</motion.div>
			)}
		</motion.div>
	);
}
