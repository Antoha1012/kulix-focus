"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Menu,
	X,
	FileText,
	Target,
	Lightbulb,
	BookOpen,
	Home,
} from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetClose,
	SheetTitle,
	SheetDescription,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo";

export default function Header() {
	const pathname = usePathname();

	const navigationItems = [
		{ href: "/", label: "Home", icon: Home },
		{ href: "/writing", label: "Writing", icon: FileText },
		{ href: "/focus", label: "Focus", icon: Target },
		{ href: "/ideas", label: "Ideas", icon: Lightbulb },
		{ href: "/about", label: "About", icon: BookOpen },
	];

	return (
		<header className="sticky top-0 z-40 backdrop-blur-sm bg-[#1b0f3a]/40 border-b border-white/10">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex h-14 items-center justify-between">
					<Logo showText={true} size="md" />

					<nav className="hidden md:flex items-center gap-2">
						{navigationItems.map(item => (
							<Link
								key={item.href}
								href={item.href}
								className="px-3 py-1.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
							>
								{item.label}
							</Link>
						))}
					</nav>

					<div className="md:hidden">
						<Sheet>
							<SheetTrigger asChild>
								<button
									type="button"
									aria-label="Open mobile menu"
									className="inline-flex items-center justify-center rounded-md p-2 text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
								>
									<Menu className="h-6 w-6" />
								</button>
							</SheetTrigger>
							<SheetContent
								side="left"
								className="w-full bg-gradient-to-br from-[#1a0939] via-[#1e0d3f] to-[#120024] border-r border-white/10 p-0 [&>button]:hidden"
							>
								<SheetTitle className="sr-only">
									Navigation Menu
								</SheetTitle>
								<SheetDescription className="sr-only">
									Main navigation menu for KuliX Focus
									application
								</SheetDescription>

								<motion.div
									className="sticky top-0 z-40 backdrop-blur-sm bg-[#1b0f3a]/40 border-b border-white/10"
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3, delay: 0.1 }}
								>
									<div className="container mx-auto px-4 sm:px-6 lg:px-8">
										<div className="flex h-14 items-center justify-between">
											<div className="relative">
												<Logo
													showText={true}
													size="sm"
													className="drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]"
												/>
											</div>

											<div className="flex items-center space-x-4">
												<SheetClose asChild>
													<motion.button
														type="button"
														aria-label="Close mobile menu"
														className="inline-flex items-center justify-center rounded-md p-2 text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
														whileHover={{
															scale: 1.05,
														}}
														whileTap={{
															scale: 0.95,
														}}
													>
														<X className="h-6 w-6" />
													</motion.button>
												</SheetClose>
											</div>
										</div>
									</div>
								</motion.div>

								<nav className="flex-1 p-6 space-y-1">
									{navigationItems.map((item, index) => {
										const isActive = pathname === item.href;
										return (
											<motion.div
												key={item.href}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{
													duration: 0.3,
													delay: 0.2 + index * 0.1,
												}}
											>
												<SheetClose asChild>
													<Link
														href={item.href}
														className={`group flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
															isActive
																? "bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-white border border-violet-400/30 shadow-lg shadow-violet-500/10"
																: "text-slate-200 hover:text-white hover:bg-white/6 hover:translate-x-1"
														}`}
													>
														<motion.div
															className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
																isActive
																	? "bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30"
																	: "bg-gradient-to-br from-slate-700/50 to-slate-800/50 group-hover:from-slate-600/50 group-hover:to-slate-700/50 group-hover:shadow-lg group-hover:shadow-white/10"
															}`}
															whileHover={{
																scale: 1.05,
															}}
															whileTap={{
																scale: 0.95,
															}}
														>
															<item.icon
																className={`h-4 w-4 transition-colors duration-300 ${
																	isActive
																		? "text-white"
																		: "text-slate-300 group-hover:text-white"
																}`}
															/>
														</motion.div>
														<span className="flex-1">
															{item.label}
														</span>
														{isActive && (
															<motion.div
																className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"
																initial={{
																	scale: 0,
																}}
																animate={{
																	scale: 1,
																}}
																transition={{
																	duration: 0.2,
																}}
															/>
														)}
														{!isActive && (
															<div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
														)}
													</Link>
												</SheetClose>
											</motion.div>
										);
									})}
								</nav>

								<motion.div
									className="p-6 border-t border-white/10"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3, delay: 0.8 }}
								>
									<div className="text-center">
										<p className="text-xs text-slate-500">
											KuliX Focus • AI Productivity Tool
										</p>
									</div>
								</motion.div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</header>
	);
}
