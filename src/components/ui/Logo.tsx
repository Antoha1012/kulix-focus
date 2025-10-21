"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import React, { useState } from "react";

/**
 * Purpose: Header logo component with particle effects
 * Boundaries: UI component only; optimized for header use
 * Owner: @anton (initial)
 */

interface LogoProps {
	className?: string;
	showText?: boolean;
	size?: "sm" | "md" | "lg";
}

export default function Logo({
	className = "",
	showText = true,
	size = "md",
}: LogoProps) {
	const [isHovered, setIsHovered] = useState(false);
	const [particleOffsets, setParticleOffsets] = useState<
		Array<{ x: number; y: number }>
	>([]);

	// Generate random values once on mount to avoid calling Math.random during render
	React.useEffect(() => {
		setParticleOffsets(
			[...Array(4)].map(() => ({
				x: (Math.random() - 0.5) * 15,
				y: (Math.random() - 0.5) * 15,
			}))
		);
	}, []);

	const sizeClasses = {
		sm: "h-5 w-5",
		md: "h-6 w-6",
		lg: "h-8 w-8",
	};

	const textSizeClasses = {
		sm: "text-sm",
		md: "text-lg",
		lg: "text-xl",
	};

	const iconSizeClasses = {
		sm: "h-3/4 w-3/4",
		md: "h-3/4 w-3/4",
		lg: "h-4/5 w-4/5",
	};

	return (
		<Link
			href="/"
			className={`group flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#2e2054] to-[#3a2a66] shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_8px_18px_rgba(0,0,0,.35)] hover:shadow-[0_12px_24px_rgba(0,0,0,.4)] transition-all duration-300 ${className}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Icon Container */}
			<motion.div
				className={`${sizeClasses[size]} items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 via-purple-400 to-indigo-400 shadow-lg group-hover:shadow-blue-400/50 transition-all duration-300 relative overflow-hidden`}
				whileHover={{
					scale: 1.1,
					rotate: 5,
				}}
				whileTap={{ scale: 0.95 }}
			>
				{/* Animated background gradient */}
				<motion.div
					className="absolute inset-0 rounded-lg"
					animate={{
						background: [
							"linear-gradient(45deg, #60a5fa, #a855f7)",
							"linear-gradient(45deg, #a855f7, #3b82f6)",
							"linear-gradient(45deg, #3b82f6, #60a5fa)",
						],
					}}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: "linear",
					}}
				/>

				{/* Particles */}
				<div className="absolute inset-0">
					{[...Array(4)].map((_, i) => (
						<motion.div
							key={i}
							className="absolute w-1 h-1 bg-white rounded-full"
							style={{
								left: "50%",
								top: "50%",
							}}
							animate={
								isHovered && particleOffsets[i]
									? {
											opacity: [0, 1, 0],
											scale: [0, 1, 0],
											x: [0, particleOffsets[i].x],
											y: [0, particleOffsets[i].y],
										}
									: {}
							}
							transition={{
								duration: 1.5,
								delay: i * 0.2,
								repeat: Infinity,
								repeatDelay: 2,
							}}
						/>
					))}
				</div>

				{/* Main Icon */}
				<motion.div
					className={`flex ${iconSizeClasses[size]} items-center justify-center relative z-10`}
				>
					<svg
						className="h-full w-full text-white"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M4 4v16M4 12h8M12 8l4 4-4 4" />
						<circle cx="18" cy="6" r="2" fill="currentColor" />
					</svg>
				</motion.div>
			</motion.div>

			{/* Text */}
			{showText && (
				<motion.span
					className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:via-purple-300 group-hover:to-indigo-300 transition-all duration-300`}
					whileHover={{ scale: 1.02 }}
				>
					KuliX Focus
				</motion.span>
			)}
		</Link>
	);
}
