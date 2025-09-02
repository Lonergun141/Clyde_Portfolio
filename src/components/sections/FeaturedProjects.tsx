'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FeaturedProjectsProps } from '@/lib/types/types';

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);
	const [isHovered, setIsHovered] = useState(false);

	const handleNext = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1));
	}, [projects.length]);

	const handlePrev = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));
	}, [projects.length]);

	useEffect(() => {
		if (!isAutoPlaying || isHovered) return;
		const interval = setInterval(handleNext, 8000);
		return () => clearInterval(interval);
	}, [handleNext, isAutoPlaying, isHovered]);

	const currentProject = projects[currentIndex];

	return (
		<section className="relative min-h-screen bg-neutral-900 overflow-hidden">
			{/* Ultra-minimal grid overlay */}
			<div className="absolute inset-0 opacity-[0.02]">
				<div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
				<div className="absolute inset-0" 
					 style={{
						 backgroundImage: `
							 linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
							 linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
						 `,
						 backgroundSize: '60px 60px'
					 }} />
			</div>

			<div className="relative z-10 max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-20">
				{/* Refined Header */}
				<div className="pt-24 lg:pt-32 pb-16 lg:pb-24">
					<div className="flex items-end justify-between">
						<div>
							<motion.p 
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.1 }}
								className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-6 font-medium">
								Portfolio Selection
							</motion.p>
							<motion.h2 
								initial={{ opacity: 0, y: 40 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 1, delay: 0.2 }}
								className="text-7xl lg:text-8xl xl:text-9xl font-extralight text-white tracking-[-0.04em] leading-[0.85]">
								Featured
								<br />
								<span className="text-neutral-500">Works</span>
							</motion.h2>
						</div>
						
						{/* Elegant counter */}
						<motion.div 
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.6 }}
							className="text-right text-neutral-400 font-light">
							<div className="text-6xl lg:text-7xl font-extralight leading-none">
								<span className="text-white">{String(currentIndex + 1).padStart(2, '0')}</span>
								<span className="text-neutral-600 text-4xl lg:text-5xl">/{String(projects.length).padStart(2, '0')}</span>
							</div>
						</motion.div>
					</div>
				</div>

				{/* Main Content */}
				<div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-20 min-h-[70vh] items-center">
					
					{/* Project Preview - Cinematic */}
					<div className="xl:col-span-8 order-2 xl:order-1">
						<AnimatePresence mode="wait">
							<motion.div
								key={currentIndex}
								initial={{ opacity: 0, scale: 0.96, y: 40 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 1.04, y: -40 }}
								transition={{ 
									duration: 1.2, 
									ease: [0.16, 1, 0.3, 1],
									scale: { duration: 1.4 }
								}}
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
								className="group relative">
								
								{/* Main preview container */}
								<div className="relative aspect-[16/9] overflow-hidden bg-neutral-800/50 backdrop-blur-sm">
									{/* Subtle border gradient */}
									<div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 p-[1px]">
										<div className="w-full h-full bg-neutral-900/90 overflow-hidden">
											<iframe
												src={currentProject.url}
												className="w-[200%] h-[200%] border-0 absolute 
													top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
													scale-50 origin-center
													transition-all duration-1000 ease-out
													group-hover:scale-[0.52]"
												style={{ 
													pointerEvents: 'none',
													transform: 'translate(-50%, -50%) scale(0.5)',
												}}
											/>
										</div>
									</div>
									
									{/* Refined overlay */}
									<div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-80" />
									
									{/* Hover glow effect */}
									<div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
								</div>

								{/* Floating project link */}
								{currentProject.link && (
									<motion.a
										href={currentProject.link}
										target="_blank"
										rel="noopener noreferrer"
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: 0.8 }}
										className="absolute top-6 right-6 
											bg-white/10 backdrop-blur-md border border-white/20
											px-4 py-2 text-xs uppercase tracking-[0.2em] text-white
											hover:bg-white hover:text-neutral-900
											transition-all duration-500 group/link">
										<span>Explore</span>
										<svg className="w-3 h-3 inline ml-2 transition-transform duration-300 group-hover/link:translate-x-1" 
											 fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
										</svg>
									</motion.a>
								)}
							</motion.div>
						</AnimatePresence>
					</div>

					{/* Project Information - Ultra Clean */}
					<div className="xl:col-span-4 order-1 xl:order-2 space-y-8">
						<AnimatePresence mode="wait">
							<motion.div
								key={currentIndex}
								initial={{ opacity: 0, x: 40 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -40 }}
								transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
								className="space-y-8">
								
								{/* Meta information */}
								<div className="space-y-3">
									<p className="text-xs uppercase tracking-[0.3em] text-neutral-500 font-medium">
										{currentProject.category}
									</p>
									<p className="text-2xl font-extralight text-neutral-400">
										{currentProject.year}
									</p>
								</div>

								{/* Project title */}
								<h3 className="text-4xl lg:text-5xl font-extralight text-white leading-[1.1] tracking-[-0.02em]">
									{currentProject.title}
								</h3>

								{/* Description */}
								<p className="text-lg font-light text-neutral-300 leading-relaxed max-w-md">
									{currentProject.description}
								</p>

							</motion.div>
						</AnimatePresence>

						{/* Minimal Navigation */}
						<div className="flex items-center justify-between pt-16 border-t border-neutral-800">
							<button
								onClick={() => {
									setIsAutoPlaying(false);
									handlePrev();
								}}
								className="w-12 h-12 flex items-center justify-center
									border border-neutral-700 hover:border-white
									text-neutral-400 hover:text-white
									transition-all duration-300 group">
								<svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" 
									 fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
								</svg>
							</button>

							{/* Progress dots */}
							<div className="flex gap-2">
								{projects.map((_, index) => (
									<button
										key={index}
										onClick={() => {
											setIsAutoPlaying(false);
											setCurrentIndex(index);
										}}
										className="group">
										<div className={`h-[1px] transition-all duration-500 ${
											index === currentIndex
												? 'w-12 bg-white'
												: 'w-6 bg-neutral-600 group-hover:bg-neutral-400'
										}`} />
									</button>
								))}
							</div>

							<button
								onClick={() => {
									setIsAutoPlaying(false);
									handleNext();
								}}
								className="w-12 h-12 flex items-center justify-center
									border border-neutral-700 hover:border-white
									text-neutral-400 hover:text-white
									transition-all duration-300 group">
								<svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" 
									 fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
								</svg>
							</button>
						</div>
					</div>

				</div>
			</div>

			{/* Auto-play indicator */}
			{isAutoPlaying && (
				<motion.div 
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
					<div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-[0.2em]">
						<div className="w-2 h-2 bg-neutral-500 rounded-full animate-pulse" />
						Auto-advancing
					</div>
				</motion.div>
			)}
		</section>
	);
}