'use client';

import { motion } from 'framer-motion';
import { useNavigation } from '@/context/NavigationContext';
import { useThemeTransition } from '@/context/ThemeTransitionContext';
import StageBackground from '@/components/spatial/StageBackground';
import { useTheme } from 'next-themes';
import { Moon, Sun, Terminal, ArrowRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

export default function Home() {
	const { openPanel, openCommandPalette } = useNavigation();
	const { toggleTheme } = useThemeTransition();
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleKeyDown = useCallback((e: KeyboardEvent) => {
		if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'l') {
			e.preventDefault();
			toggleTheme();
		}
	}, [toggleTheme]);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [handleKeyDown]);

	return (
		<main className="min-h-screen w-full bg-background overflow-x-hidden relative">
			<StageBackground />

			{/* Giant Background Name - Hidden on mobile for performance */}
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden hidden sm:flex">
				<motion.h1
					initial={{ opacity: 0, scale: 1.2 }}
					animate={{ opacity: 0.03, scale: 1 }}
					transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
					className="text-[40vw] md:text-[35vw] font-black tracking-tighter text-foreground whitespace-nowrap"
				>
					CLYDE
				</motion.h1>
			</div>

			{/* Main Content Layer */}
			<div className="relative z-10 w-full min-h-screen flex flex-col">

				{/* Top Bar */}
				<header className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-16 py-4 md:py-6">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.5 }}
						className="flex items-center gap-2 sm:gap-3"
					>
						<div className="w-2 h-2 bg-accent" />
						<span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground">
							Open for Work
						</span>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.5 }}
						className="flex items-center gap-2 sm:gap-4"
					>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={openCommandPalette}
							className="flex items-center gap-2 px-2 sm:px-3 py-2 border border-border hover:border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
						>
							<Terminal size={14} />
							<span className="text-[10px] font-mono uppercase tracking-widest hidden sm:inline">⌘K</span>
						</motion.button>
						<motion.button
							whileTap={{ scale: 0.9 }}
							onClick={toggleTheme}
							className="p-2 border border-border hover:border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
						>
							{mounted && (theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />)}
						</motion.button>
					</motion.div>
				</header>

				{/* Main Content */}
				<div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-visible">

					{/* Left: Identity */}
					<div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8 lg:py-12">
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
							className="max-w-lg mx-auto lg:mx-0"
						>
							<div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
								<div className="w-8 sm:w-12 h-[2px] bg-accent" />
								<span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] sm:tracking-[0.4em] text-accent">
									Fullstack Developer & UI/UX Designer
								</span>
							</div>

							<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-tighter leading-[0.85] text-foreground mb-4 sm:mb-6 md:mb-8">
								CLYDE
								<br />
								<span className="text-muted-foreground/50">GEVERO</span>
							</h1>

							<p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-md mb-6 sm:mb-8">
								My only ambition has been to engrave my name at the feet of great men and in the service of grand ideas
							</p>

							{/* Decorative line - Hidden on mobile */}
							<div className="hidden sm:block pt-6 border-t border-border" />
						</motion.div>
					</div>

					{/* Right: Navigation Cards */}
					<div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 lg:py-8 lg:border-l border-border">
						<div className="space-y-3 sm:space-y-4 max-w-lg mx-auto lg:mx-0 w-full">

							{/* Projects */}
							<motion.button
								initial={{ opacity: 0, x: 30 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, delay: 0.8 }}
								onClick={() => openPanel('projects')}
								className="group w-full text-left"
							>
								<div className="relative p-4 sm:p-5 md:p-6 border border-border bg-background/50 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-500 overflow-hidden">
									<div className="absolute top-0 left-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
									<div className="flex items-center justify-between">
										<div>
											<span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground group-hover:text-accent-foreground/70 uppercase tracking-widest block mb-1 sm:mb-2">
												01 — Explore
											</span>
											<h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
												Projects
											</h2>
										</div>
										<ArrowRight size={20} className="text-muted-foreground group-hover:text-accent-foreground group-hover:translate-x-2 transition-all sm:w-6 sm:h-6" />
									</div>
								</div>
							</motion.button>

							{/* Profile */}
							<motion.button
								initial={{ opacity: 0, x: 30 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, delay: 0.9 }}
								onClick={() => openPanel('profile')}
								className="group w-full text-left"
							>
								<div className="relative p-4 sm:p-5 md:p-6 border border-border bg-background/50 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-500 overflow-hidden">
									<div className="absolute top-0 left-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
									<div className="flex items-center justify-between">
										<div>
											<span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground group-hover:text-accent-foreground/70 uppercase tracking-widest block mb-1 sm:mb-2">
												02 — About
											</span>
											<h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
												Profile
											</h2>
										</div>
										<ArrowRight size={20} className="text-muted-foreground group-hover:text-accent-foreground group-hover:translate-x-2 transition-all sm:w-6 sm:h-6" />
									</div>
								</div>
							</motion.button>

							{/* Credentials */}
							<motion.button
								initial={{ opacity: 0, x: 30 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, delay: 1.0 }}
								onClick={() => openPanel('certificates')}
								className="group w-full text-left"
							>
								<div className="relative p-4 sm:p-5 md:p-6 border border-border bg-background/50 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-500 overflow-hidden">
									<div className="absolute top-0 left-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
									<div className="flex items-center justify-between">
										<div>
											<span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground group-hover:text-accent-foreground/70 uppercase tracking-widest block mb-1 sm:mb-2">
												03 — Verify
											</span>
											<h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
												Credentials
											</h2>
										</div>
										<ArrowRight size={20} className="text-muted-foreground group-hover:text-accent-foreground group-hover:translate-x-2 transition-all sm:w-6 sm:h-6" />
									</div>
								</div>
							</motion.button>

							{/* GitHub */}
							<motion.button
								initial={{ opacity: 0, x: 30 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, delay: 1.1 }}
								onClick={() => openPanel('github')}
								className="group w-full text-left"
							>
								<div className="relative p-4 sm:p-5 md:p-6 border border-border bg-background/50 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-500 overflow-hidden">
									<div className="absolute top-0 left-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
									<div className="flex items-center justify-between">
										<div>
											<span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground group-hover:text-accent-foreground/70 uppercase tracking-widest block mb-1 sm:mb-2">
												04 — Activity
											</span>
											<h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
												GitHub
											</h2>
										</div>
										<ArrowRight size={20} className="text-muted-foreground group-hover:text-accent-foreground group-hover:translate-x-2 transition-all sm:w-6 sm:h-6" />
									</div>
								</div>
							</motion.button>

							{/* Contact
							<motion.button
								initial={{ opacity: 0, x: 30 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, delay: 1.2 }}
								onClick={() => openPanel('contact')}
								className="group w-full text-left"
							>
								<div className="relative p-4 sm:p-5 md:p-6 border border-border bg-background/50 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-500 overflow-hidden">
									<div className="absolute top-0 left-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
									<div className="flex items-center justify-between">
										<div>
											<span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground group-hover:text-accent-foreground/70 uppercase tracking-widest block mb-1 sm:mb-2">
												05 — Connect
											</span>
											<h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
												Contact
											</h2>
										</div>
										<ArrowRight size={20} className="text-muted-foreground group-hover:text-accent-foreground group-hover:translate-x-2 transition-all sm:w-6 sm:h-6" />
									</div>
								</div>
							</motion.button> */}

						</div>
					</div>

				</div>

				{/* Footer */}
				<footer className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-16 py-4 md:py-6 mt-auto">
					<motion.span
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 1.2 }}
						className="text-[8px] sm:text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider sm:tracking-widest"
					>
						© 2026
					</motion.span>
					<motion.span
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 1.3 }}
						className="text-[8px] sm:text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider sm:tracking-widest"
					>
						v3.2 — Spatial
					</motion.span>
				</footer>

			</div>
		</main>
	);
}
