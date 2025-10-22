"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useAnimations } from "@/hooks/useAnimations";
import type { PageProps } from "@/types/common";

interface PageLayoutProps extends PageProps {
	readonly title: string;
	readonly description: string;
	readonly icon?: React.ReactNode;
	readonly children: React.ReactNode;
	readonly maxWidth?: string;
}

const PageLayoutComponent = ({
	title,
	description,
	icon,
	children,
	maxWidth = "max-w-6xl",
}: PageLayoutProps) => {
	const { heroVariants } = useAnimations();

	return (
		<ErrorBoundary>
			<div className="min-h-screen bg-transparent">
				<div
					className={`container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 ${maxWidth}`}
				>
					<motion.div
						className="text-center mb-20"
						variants={heroVariants}
						initial="hidden"
						animate="visible"
					>
						{icon && (
							<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl mb-6 border border-purple-400/40">
								{icon}
							</div>
						)}
						<h1 className="text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight bg-gradient-to-r from-violet-300 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent mb-6">
							{title}
						</h1>
						<p className="mt-4 max-w-2xl mx-auto text-lg leading-7 text-gray-400">
							{description}
						</p>
					</motion.div>

					{children}
				</div>
			</div>
		</ErrorBoundary>
	);
};

export const PageLayout = memo(PageLayoutComponent);
