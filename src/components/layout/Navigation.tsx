'use client';
import { useState, useEffect } from 'react';
import type React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ModeToggle } from '@/components/ui/mode-toggle';

const NavLink = ({
	href,
	onClick,
	children,
	number,
	delay = 0,
}: {
	href: string;
	onClick?: () => void;
	children: React.ReactNode;
	number: string;
	delay?: number;
}) => (
	<motion.div
		initial={{ opacity: 0, y: 30 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.6, delay }}
		className="w-full"
	>
		<Link href={href} onClick={onClick} className="group block">
			<div className="flex items-center justify-between py-8 border-b border-white/10 hover:border-white/30 transition-all duration-500">
				<div className="flex items-center gap-8">
					<span className="text-xs font-mono text-white/40 uppercase tracking-wider">
						{number}
					</span>
					<span className="text-4xl md:text-5xl lg:text-6xl font-light text-white group-hover:text-white/80 group-hover:translate-x-4 transition-all duration-500 tracking-tight">
						{children}
					</span>
				</div>
				<motion.div
					whileHover={{ rotate: 45, scale: 1.1 }}
					transition={{ duration: 0.3 }}
					className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors duration-500"
				>
					<span className="text-white/40 group-hover:text-white/80 text-lg">→</span>
				</motion.div>
			</div>
		</Link>
	</motion.div>
);

const MenuButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
	<button
		className="relative w-10 h-10 flex items-center justify-center group"
		onClick={onClick}
		aria-label={isOpen ? 'Close menu' : 'Open menu'}
	>
		<div className="relative w-6 h-6">
			<span
				className={`absolute block w-6 h-px bg-foreground transition-all duration-500 ease-out ${isOpen
					? 'rotate-45 top-1/2 -translate-y-1/2 bg-white'
					: 'top-2 rotate-0'
					}`}
			/>
			<span
				className={`absolute block w-6 h-px bg-foreground transition-all duration-300 ${isOpen ? 'opacity-0 bg-white' : 'opacity-100 top-1/2 -translate-y-1/2'
					}`}
			/>
			<span
				className={`absolute block w-6 h-px bg-foreground transition-all duration-500 ease-out ${isOpen
					? '-rotate-45 top-1/2 -translate-y-1/2 bg-white'
					: 'bottom-2 rotate-0'
					}`}
			/>
		</div>
	</button>
);


export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > lastScrollY && window.scrollY > 100) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
			}
			setLastScrollY(window.scrollY);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, [lastScrollY]);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	return (
		<>

			<motion.nav
				initial={{ y: -100 }}
				animate={{
					y: isVisible ? 0 : -100,
					opacity: isVisible ? 1 : 0
				}}
				transition={{ duration: 0.3 }}
				className="fixed top-0 w-full z-40 bg-background border-b border-border"
			>
				<div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
					<Link
						href="/"
						className="text-xl font-light text-foreground hover:text-muted-foreground transition-colors tracking-tight"
					>
						CHG.
					</Link>
					<div className="flex items-center gap-6">
						<div className="hidden md:flex items-center gap-1 text-xs font-mono text-muted-foreground uppercase tracking-wider">
							<span>Menu</span>
							<div className="w-px h-4 bg-border mx-2" />
							<span>
								{new Date().toLocaleTimeString('en-US', {
									hour: '2-digit',
									minute: '2-digit',
									hour12: false,
								})}
							</span>
						</div>
						<ModeToggle />
						<MenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
					</div>
				</div>
			</motion.nav>


			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
						className="fixed inset-0 z-50 bg-black"
					>

						<div className="absolute inset-0 opacity-5">
							<div className="absolute inset-0"
								style={{
									backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
									backgroundSize: '40px 40px'
								}}
							/>
						</div>


						<motion.div
							initial={{ y: -50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="relative border-b border-white/10 bg-black/50 backdrop-blur-sm"
						>
							<div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
								<h1 className="text-2xl font-light text-white tracking-tight">Navigation</h1>
								<div className="flex items-center gap-8">
									<div className="flex items-center gap-1 text-xs font-mono text-white/40 uppercase tracking-wider">
										<span>Close</span>
									</div>
									<MenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
								</div>
							</div>
						</motion.div>


						<div className="relative h-full flex items-center">
							<div className="w-full max-w-4xl mx-auto px-6">

								<motion.div
									initial={{ opacity: 0, x: -30 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.6, delay: 0.3 }}
									className="mb-16"
								>
									<div className="flex items-center gap-4">
										<div className="w-8 h-px bg-white/20" />
										<span className="text-xs font-light text-white/40 uppercase tracking-[0.3em]">
											Links
										</span>
										<span className="text-xs font-mono text-white/30">
											[04]
										</span>
									</div>
								</motion.div>


								<div className="space-y-0">
									<NavLink
										href="/projects"
										onClick={() => setIsOpen(false)}
										number="01"
										delay={0.4}
									>
										Projects
									</NavLink>
									<NavLink
										href="/profile"
										onClick={() => setIsOpen(false)}
										number="02"
										delay={0.5}
									>
										About
									</NavLink>

									<motion.div
										initial={{ opacity: 0, y: 30 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: 0.6 }}
										className="w-full"
									>
										<Link
											href="/Gevero_CV_2025.pdf"
											download
											target="_blank"
											onClick={() => setIsOpen(false)}
											className="group block"
										>
											<div className="flex items-center justify-between py-8 border-b border-white/10 hover:border-white/30 transition-all duration-500">
												<div className="flex items-center gap-8">
													<span className="text-xs font-mono text-white/40 uppercase tracking-wider">
														03
													</span>
													<span className="text-4xl md:text-5xl lg:text-6xl font-light text-white group-hover:text-white/80 group-hover:translate-x-4 transition-all duration-500 tracking-tight">
														Resume
													</span>
												</div>
												<motion.div
													whileHover={{ rotate: 45, scale: 1.1 }}
													transition={{ duration: 0.3 }}
													className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors duration-500"
												>
													<ArrowUpRight className="text-white/40 group-hover:text-white/80 text-lg" />
												</motion.div>
											</div>
										</Link>
									</motion.div>

									<motion.div
										initial={{ opacity: 0, y: 30 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: 0.7 }}
										className="w-full"
									>
										<a
											href="https://github.com/Lonergun141"
											target="_blank"
											rel="noopener noreferrer"
											onClick={() => setIsOpen(false)}
											className="group block"
										>
											<div className="flex items-center justify-between py-8 border-b border-white/10 hover:border-white/30 transition-all duration-500">
												<div className="flex items-center gap-8">
													<span className="text-xs font-mono text-white/40 uppercase tracking-wider">
														04
													</span>
													<span className="text-4xl md:text-5xl lg:text-6xl font-light text-white group-hover:text-white/80 group-hover:translate-x-4 transition-all duration-500 tracking-tight">
														GitHub
													</span>
												</div>
												<motion.div
													whileHover={{ rotate: 45, scale: 1.1 }}
													transition={{ duration: 0.3 }}
													className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors duration-500"
												>
													<ArrowUpRight className="text-white/40 group-hover:text-white/80 text-lg" />
												</motion.div>
											</div>
										</a>
									</motion.div>
								</div>



							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}