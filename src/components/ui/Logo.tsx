"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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
			className={`group flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#2e2054] to-[#3a2a66] shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_8px_18px_rgba(0,0,0,.35)] transition-all duration-300 ${className}`}
		>
			<motion.div
				className={`${sizeClasses[size]} items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 via-purple-400 to-indigo-400 shadow-lg transition-all duration-300 relative overflow-hidden`}
				whileTap={{ scale: 0.95 }}
			>
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

			{showText && (
				<motion.span
					className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent transition-all duration-300`}
				>
					KuliX Focus
				</motion.span>
			)}
		</Link>
	);
}
