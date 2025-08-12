'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FeaturedProjectsProps } from '@/lib/types/types';

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	const handleNext = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1));
	}, [projects.length]);

	const handlePrev = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));
	}, [projects.length]);

	useEffect(() => {
		if (!isAutoPlaying) return;
		const interval = setInterval(handleNext, 10000);
		return () => clearInterval(interval);
	}, [handleNext, isAutoPlaying]);

	return (
		<section className="py-32 md:py-40 bg-background-dark">
			<div className="max-w-[160rem] mx-auto w-full px-4 sm:px-6 lg:px-8">
				{/* Minimalist Header */}
				<div className="mb-24 md:mb-32">
					<h2 className="text-6xl md:text-7xl font-light text-brand-primary tracking-[-0.02em]">
						Selected Works
					</h2>
				</div>

				<div className="relative">
					<AnimatePresence mode="wait">
						<motion.div
							key={currentIndex}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
							className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
							
							{/* Cinematic Project Preview */}
							<div className="order-2 lg:order-1">
								<motion.div
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
									className="relative aspect-[16/9] group overflow-hidden">
									<div className="absolute inset-0 w-full h-full">
										<iframe
											src={projects[currentIndex].url}
											className="w-[200%] h-[200%] border-0 absolute 
												top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
												scale-50 origin-center
												transition-transform duration-700 ease-out
												group-hover:scale-[0.51]"
											style={{ 
												pointerEvents: 'none',
												transform: 'translate(-50%, -50%) scale(0.5)',
											}}
										/>
									</div>
									<div
										className="absolute inset-0 bg-gradient-to-t 
											from-background-dark via-transparent to-transparent 
											opacity-60 mix-blend-multiply pointer-events-none"
									/>
								</motion.div>
							</div>

							{/* Minimal Project Info */}
							<div className="order-1 lg:order-2 lg:pl-16">
								<div className="space-y-8">
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										className="space-y-6">
										<p className="text-brand-secondary/70 uppercase tracking-[0.2em] text-sm">
											{projects[currentIndex].category} • {projects[currentIndex].year}
										</p>
										<h3 className="text-5xl md:text-6xl font-light text-brand-primary tracking-[-0.02em]">
											{projects[currentIndex].title}
										</h3>
										<p className="text-xl md:text-2xl text-brand-secondary/80 leading-relaxed font-light">
											{projects[currentIndex].description}
										</p>
									</motion.div>

									{/* Minimal Link */}
									{projects[currentIndex].link && (
										<a
											href={projects[currentIndex].link}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center text-brand-primary hover:text-brand-primary/80 
												transition-all duration-300 group text-lg tracking-wide">
											<span className="border-b border-current pb-1">View Project</span>
											<svg
												className="w-5 h-5 ml-3 transform transition-transform duration-300 group-hover:translate-x-1"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={1}
													d="M17 8l4 4m0 0l-4 4m4-4H3"
												/>
											</svg>
										</a>
									)}

									{/* Minimal Navigation */}
									<div className="flex items-center gap-12 pt-16">
										<button
											onClick={() => {
												setIsAutoPlaying(false);
												handlePrev();
											}}
											className="text-brand-primary hover:text-brand-primary/80 transition-colors">
											<span className="sr-only">Previous project</span>
											<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
											</svg>
										</button>
										
										<div className="flex-1 flex justify-center gap-3">
											{projects.map((_, index) => (
												<button
													key={index}
													onClick={() => {
														setIsAutoPlaying(false);
														setCurrentIndex(index);
													}}
													className={`h-[1px] transition-all duration-500 ${
														index === currentIndex
															? 'w-16 bg-brand-primary'
															: 'w-8 bg-brand-secondary/30 hover:bg-brand-secondary/50'
													}`}
												/>
											))}
										</div>

										<button
											onClick={() => {
												setIsAutoPlaying(false);
												handleNext();
											}}
											className="text-brand-primary hover:text-brand-primary/80 transition-colors">
											<span className="sr-only">Next project</span>
											<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
											</svg>
										</button>
									</div>
								</div>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</section>
	);
}
