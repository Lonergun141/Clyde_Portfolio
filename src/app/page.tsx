'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import { works, featuredProjects } from '@/lib/constants/constants';
import { greetings } from '@/lib/constants/constants';

export default function Home() {
	const containerRef = useRef(null);
	const projectRef = useRef(null);
	const [selectedProject, setSelectedProject] = useState<number | null>(null);
	const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentGreetingIndex((prev) => (prev + 1) % greetings.length);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	const { scrollYProgress: projectScrollY } = useScroll({
		target: projectRef,
		offset: ['start end', 'end start'],
	});

	const imageY = useTransform(projectScrollY, [0, 1], ['20%', '-20%']);
	const imageScale = useTransform(projectScrollY, [0, 0.5, 1], [1.2, 1, 1.2]);
	const textY = useTransform(projectScrollY, [0, 1], ['0%', '10%']);

	return (
		<main className="min-h-screen bg-background">
			{/* Hero Section */}
			<div
				ref={containerRef}
				className="relative min-h-screen bg-white flex items-center justify-center px-6">
				<div className="max-w-4xl mx-auto w-full">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
						className="space-y-12">
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 1, delay: 0.3 }}
							className="text-black/40 text-xs font-light tracking-[0.3em] uppercase">
							Portfolio {new Date().getFullYear()}
						</motion.p>

						<div className="space-y-4">
							<motion.h1
								key={currentGreetingIndex}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -30 }}
								transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
								className="text-[clamp(4rem,12vw,8rem)] font-extralight leading-[0.9] tracking-[-0.02em] text-black">
								{greetings[currentGreetingIndex].text}
							</motion.h1>

							<motion.h1
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 1, delay: 0.7 }}
								className="text-[clamp(4rem,12vw,8rem)] font-thin leading-[0.9] tracking-[-0.02em] text-black">
								I&apos;m Clyde
							</motion.h1>
						</div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1, delay: 0.9 }}
							className="space-y-3 pt-8">
							{['(01) Mobile Developer', '(02) Web Developer', '(03) UI/UX Designer'].map(
								(text, index) => (
									<motion.div
										key={text}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.8, delay: 1.1 + index * 0.1 }}
										className="text-sm font-light text-black/60 tracking-wide hover:text-black transition-colors duration-300 cursor-default">
										{text}
									</motion.div>
								)
							)}
						</motion.div>

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 1, delay: 1.5 }}
							className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
							<motion.div
								animate={{ y: [0, 8, 0] }}
								transition={{
									duration: 2,
									repeat: Number.POSITIVE_INFINITY,
									ease: 'easeInOut',
								}}
								className="w-px h-12 bg-black/20"></motion.div>
						</motion.div>
					</motion.div>
				</div>
			</div>

			{/* Featured Projects */}
			<FeaturedProjects projects={featuredProjects} />

			{/* Projects Section */}
			<section className="relative bg-black">
				<div className="py-24 md:py-32 max-w-6xl mx-auto px-6">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
						viewport={{ once: true }}
						className="mb-20 md:mb-32 text-center">
						<p className="text-white/60 uppercase tracking-[0.3em] text-sm font-medium mb-4">
							Selected Work
						</p>
						<h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-light tracking-tight">
							Experiences
						</h2>
					</motion.div>
				</div>

				{/* Full-screen project cards */}
				<div className="space-y-0">
					{works.map((project, index) => {
						return (
							<motion.article
								key={project.title}
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
								viewport={{ once: true, margin: '-20%' }}
								className="relative h-screen flex items-center justify-center overflow-hidden cursor-pointer group"
								onClick={() =>
									setSelectedProject(selectedProject === index ? null : index)
								}>
								<motion.div
									style={{ y: imageY, scale: imageScale }}
									className="absolute inset-0 w-full h-full">
									<img
										src={
											project.image ||
											'/placeholder.svg?height=1200&width=1920&query=abstract project background' ||
											'/placeholder.svg'
										}
										alt={project.title}
										className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000"
									/>
									<div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-700" />
								</motion.div>

								{/* Project content overlay */}
								<motion.div
									style={{ y: textY }}
									className="relative z-10 text-center max-w-4xl mx-auto px-6">
									{/* Project number */}
									<motion.span
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.8, delay: 0.2 }}
										className="block text-8xl md:text-9xl  font-light text-white/20 leading-none mb-4">
										{String(index + 1).padStart(2, '0')}
									</motion.span>

									{/* Project title */}
									<motion.h3
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.8, delay: 0.4 }}
										className=" text-5xl md:text-7xl lg:text-8xl text-white font-light leading-tight mb-6 group-hover:scale-105 transition-transform duration-500">
										{project.title}
									</motion.h3>

									{/* Project year and category */}
									<motion.div
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.8, delay: 0.6 }}
										className="flex items-center justify-center gap-8 mb-8">
										<span className="text-white/60 uppercase tracking-[0.2em] text-sm">
											{project.year}
										</span>
										<span className="text-white/40">|</span>
									</motion.div>

									{/* Expandable project details */}
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{
											opacity: selectedProject === index ? 1 : 0,
											height: selectedProject === index ? 'auto' : 0,
										}}
										transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
										className="overflow-hidden">
										<div className="space-y-6 pt-8">
											<p className="text-lg md:text-xl text-white/80 leading-relaxed font-light max-w-2xl mx-auto">
												{project.description}
											</p>

											{/* Tags */}
											<div className="flex flex-wrap justify-center gap-3">
												{project.tags.map((tag) => (
													<span
														key={tag}
														className="text-sm text-white/70 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-300">
														{tag}
													</span>
												))}
											</div>
										</div>
									</motion.div>
								</motion.div>
							</motion.article>
						);
					})}
				</div>
			</section>
		</main>
	);
}
