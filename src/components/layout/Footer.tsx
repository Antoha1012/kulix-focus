"use client";

import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
	return (
		<motion.footer
			className="border-t border-white/10 pt-4 pb-4 mt-auto"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8, delay: 0.2 }}
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col md:flex-row justify-between items-center gap-4">
					<div className="text-slate-400 text-sm">
						© {new Date().getFullYear()} KuliX Focus. Open source
						productivity tool.
					</div>
					<div className="flex items-center gap-4">
						<Link
							href="https://github.com/Antoha1012/kulix-focus"
							className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform"
							aria-label="GitHub repository"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Github className="h-5 w-5" />
						</Link>
						<Link
							href="https://www.linkedin.com/in/akulitsa/"
							className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform"
							aria-label="LinkedIn profile"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Linkedin className="h-5 w-5" />
						</Link>
					</div>
				</div>
			</div>
		</motion.footer>
	);
}
