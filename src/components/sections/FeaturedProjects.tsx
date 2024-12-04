'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FeaturedProject {
	title: string;
	category: string;
	url: string;
	year: string;
	description?: string;
	link?: string;
}

interface FeaturedProjectsProps {
	projects: FeaturedProject[];
}

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
		<section className="py-16 md:py-24 bg-background-dark min-h-screen flex items-center">
			<div className="max-w-[110rem] mx-auto w-full px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-12 md:mb-16 max-w-3xl">
					<h2 className="text-4xl md:text-5xl font-light text-brand-primary mb-4">
						Featured work
					</h2>
					<p className="text-base md:text-lg text-brand-secondary">
						Selected projects I&apos;ve worked on
					</p>
				</div>

				{/* Project Showcase */}
				<div className="relative">
					<AnimatePresence mode="wait">
						<motion.div
							key={currentIndex}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5, ease: 'easeInOut' }}
							className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
							{/* Project Info */}
							<div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
								<div className="space-y-4">
									<motion.p
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										className="text-brand-secondary uppercase tracking-wider text-sm">
										{projects[currentIndex].category}
									</motion.p>
									<motion.h3
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										className="text-3xl md:text-4xl font-medium text-brand-primary">
										{projects[currentIndex].title}
									</motion.h3>
									<motion.p
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										className="text-brand-secondary text-base md:text-lg leading-relaxed">
										{projects[currentIndex].description}
									</motion.p>
								</div>

								<div className="flex flex-wrap items-center gap-4 md:gap-6">
									<span className="text-brand-secondary">{projects[currentIndex].year}</span>
									{projects[currentIndex].link && (
										<a
											href={projects[currentIndex].link}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 text-brand-primary 
                                hover:text-brand-secondary transition-all duration-300 group">
											<span className="text-lg">View Project</span>
											<svg
												className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={1.5}
													d="M17 8l4 4m0 0l-4 4m4-4H3"
												/>
											</svg>
										</a>
									)}
								</div>

								{/* Navigation Controls */}
								<div className="flex items-center gap-6 pt-8">
									<button
										onClick={() => {
											setIsAutoPlaying(false);
											handlePrev();
										}}
										className="p-2 hover:bg-background-light rounded-full transition-colors">
										<svg
											className="w-6 h-6 text-brand-primary"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={1.5}
												d="M15 19l-7-7 7-7"
											/>
										</svg>
									</button>
									<div className="flex gap-2">
										{projects.map((_, index) => (
											<button
												key={index}
												onClick={() => {
													setIsAutoPlaying(false);
													setCurrentIndex(index);
												}}
												className={`h-1.5 rounded-full transition-all duration-300 ${
													index === currentIndex
														? 'w-12 bg-brand-primary'
														: 'w-6 bg-border-dark hover:bg-border-dark/80'
												}`}
											/>
										))}
									</div>
									<button
										onClick={() => {
											setIsAutoPlaying(false);
											handleNext();
										}}
										className="p-2 hover:bg-background-light rounded-full transition-colors">
										<svg
											className="w-6 h-6 text-brand-primary"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={1.5}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</button>
								</div>
							</div>

							{/* Project Preview */}
							<div className="lg:col-span-8">
								<motion.div
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.5 }}
									className="relative aspect-[16/10] rounded-xl overflow-hidden 
                                    bg-background-light border border-border-dark
                                    shadow-lg hover:shadow-xl transition-shadow duration-300">
									<iframe
										src={projects[currentIndex].url}
										className="w-full h-full border-0"
										style={{ pointerEvents: 'none' }}
									/>
									<div
										className="absolute inset-0 bg-gradient-to-b from-transparent 
                                    to-background-dark/10 pointer-events-none"
									/>
								</motion.div>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</section>
	);
}
