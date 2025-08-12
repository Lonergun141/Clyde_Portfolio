'use client';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import { projects, featuredProjects } from '@/lib/constants/constants';

export default function Home() {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end start'],
	});

	const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
	const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
	const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);



	return (
		<main className="min-h-screen bg-background font-inter">
			{/* Hero Section */}
			<div ref={containerRef} className="relative h-screen bg-white">
				<motion.div
					style={{ y, opacity, scale }}
					className="absolute inset-0 flex items-center justify-center px-6 bg-gradient-to-b from-transparent via-white/50 to-white">
					<div className="max-w-7xl mx-auto w-full relative">
						{/* Subtle geometric background patterns */}
						<motion.div 
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.03 }}
							transition={{ duration: 2 }}
							className="absolute -top-[20vh] left-0 right-0 text-[20vw] text-black font-bold select-none pointer-events-none overflow-hidden">
							DEVELOPER
						</motion.div>

						{/* Floating elements in background */}
						<motion.div
							animate={{ 
								y: [0, -20, 0],
								rotate: [0, 5, 0]
							}}
							transition={{ 
								duration: 10,
								repeat: Infinity,
								ease: "easeInOut"
							}}
							className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 opacity-20"
						/>

						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
							className="space-y-16 relative z-10">
							<motion.p 
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 1, delay: 0.5 }}
								className="text-black/50 tracking-[0.4em] uppercase text-xs font-light">
								Portfolio {new Date().getFullYear()}
							</motion.p>

							<h1 className="text-[clamp(3rem,15vw,12rem)] font-thin leading-[0.8] tracking-[-0.04em] text-black">
								<motion.span
									initial={{ opacity: 0, y: 50 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 1, delay: 0.3 }}
									className="block">
									CLYDE
								</motion.span>
								<motion.span
									initial={{ opacity: 0, y: 50 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 1, delay: 0.5 }}
									className="block font-extralight mt-4 bg-gradient-to-r from-black via-black/80 to-black/60 text-transparent bg-clip-text">
									GEVERO
								</motion.span>
							</h1>

							<div className="flex flex-col md:flex-row gap-16 text-sm font-extralight tracking-wider">
								{['Mobile Developer', 'Web Developer', 'UI/UX Designer'].map((text, index) => (
									<motion.span
										key={text}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										whileHover={{ scale: 1.05 }}
										transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
										className="text-black/60 hover:text-black transition-colors duration-300 cursor-default"
									>
										{text}
										{index < 2 && (
											<motion.span 
												className="hidden md:inline text-black/20 ml-16"
												animate={{ opacity: [0.2, 0.5, 0.2] }}
												transition={{ duration: 2, repeat: Infinity }}
											>
												|
											</motion.span>
										)}
									</motion.span>
								))}
							</div>
						</motion.div>
					</div>
				</motion.div>
			</div>

			{/* Featured Projects */}
			<FeaturedProjects projects={featuredProjects} />

			{/* Projects Section */}
			<section className="py-32 bg-black text-white">
				<div className="max-w-[90vw] mx-auto">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className="text-2xl tracking-tight mb-24 px-6"
						>
						Experiences
					</motion.h2>
					
					<div className="space-y-32">
						{projects.map((project, index) => (
							<motion.article
								key={project.title}
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								transition={{ duration: 0.8, delay: index * 0.2 }}
								viewport={{ once: true, margin: "-100px" }}
								className="group relative flex flex-col md:flex-row items-center gap-8 md:gap-16"
							>
								<div className="w-full md:w-1/2 relative aspect-[16/9] overflow-hidden">
									<motion.img
										src={project.image}
										alt={project.title}
										className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
										whileHover={{ scale: 1.02 }}
									/>
								</div>
								
								<div className="w-full md:w-1/2 space-y-6 px-6">
									<div className="space-y-2">
										<motion.h3 
											className="text-4xl font-light tracking-wide"
											whileHover={{ x: 20 }}
											transition={{ duration: 0.3 }}
										>
											{project.title}
										</motion.h3>
										<span className="text-sm text-gray-400">{project.year}</span>
									</div>
									
									<p className="text-lg text-gray-400 font-light leading-relaxed max-w-xl">
										{project.description}
									</p>
									
									<div className="flex flex-wrap gap-3">
										{project.tags.map((tag) => (
											<span 
												key={tag}
												className="text-sm text-gray-400 border border-gray-800 px-3 py-1.5 hover:border-gray-600 transition-colors"
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							</motion.article>
						))}
					</div>
				</div>
			</section>


		</main>
	);
}
