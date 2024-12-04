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

	const handleNext = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1));
	}, [projects.length]);

	useEffect(() => {
		const interval = setInterval(handleNext, 10000);
		return () => clearInterval(interval);
	}, [handleNext]);

	return (
		<section className="py-24 bg-background-dark min-h-screen flex items-center">
			<div className="max-w-[110rem] mx-auto w-full px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-16 max-w-3xl">
					<h2 className="text-5xl font-light text-brand-primary mb-4">Featured work</h2>
					<p className="text-lg text-brand-secondary">Selected projects I&apos;ve worked on</p>
				</div>

				{/* Project Showcase */}
				<AnimatePresence mode="wait">
					<motion.div
						key={currentIndex}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.5, ease: 'easeInOut' }}
						className="grid grid-cols-12 gap-8 items-center">
						{/* Project Info */}
						<div className="col-span-12 lg:col-span-4 space-y-6">
							<div className="space-y-4">
								<p className="text-brand-secondary uppercase tracking-wider text-sm">
									{projects[currentIndex].category}
								</p>
								<h3 className="text-4xl font-medium text-brand-primary">
									{projects[currentIndex].title}
								</h3>
								<p className="text-brand-secondary text-lg leading-relaxed">
									{projects[currentIndex].description}
								</p>
							</div>

							<div className="flex items-center gap-6">
								<span className="text-brand-secondary">{projects[currentIndex].year}</span>
								{projects[currentIndex].link && (
									<a
										href={projects[currentIndex].link}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 text-brand-primary 
                             transition-colors group">
										<span className="text-lg">View Project</span>
										<svg
											className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
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

							{/* Progress Indicators */}
							<div className="flex gap-2 pt-8">
								{projects.map((_, index) => (
									<button
										key={index}
										onClick={() => setCurrentIndex(index)}
										className={`h-1.5 rounded-full transition-all duration-300 ${
											index === currentIndex
												? 'w-12 bg-slate-800'
												: 'w-6 bg-border-dark hover:bg-border-dark/80'
										}`}
									/>
								))}
							</div>
						</div>

						{/* Project Preview */}
						<div className="col-span-12 lg:col-span-8">
							<div
								className="relative aspect-[16/10] rounded-xl overflow-hidden 
                            bg-background-light border border-border-dark">
								<iframe
									src={projects[currentIndex].url}
									className="w-full h-full border-0"
									style={{ pointerEvents: 'none' }}
								/>
								<div
									className="absolute inset-0 bg-gradient-to-b from-transparent 
                              to-background-dark/10 pointer-events-none"
								/>
							</div>
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</section>
	);
}
