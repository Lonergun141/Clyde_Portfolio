'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import PhilosophySection from '@/components/sections/PhilosophySection';
import { works, featuredProjects } from '@/lib/constants/constants';
import { greetings } from '@/lib/constants/constants';
import { ArrowRight } from 'lucide-react';
import CertificatesSection from '@/components/sections/CertificatesSection';

export default function Home() {
	const containerRef = useRef(null);
	const [selectedProject, setSelectedProject] = useState<number | null>(null);
	const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentGreetingIndex((prev) => (prev + 1) % greetings.length);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	return (
		<main className="min-h-screen bg-background">
			<div
				ref={containerRef}
				className="relative min-h-screen  flex items-center justify-center overflow-hidden bg-white">
				<div className="relative z-10 w-full md:px-16 lg:px-24 py-20 max-w-6xl mx-auto px-6">
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 0.3 }}
						className="absolute top-24 right-8 md:right-16 lg:right-24 text-right max-w-xs">
						<p className="text-neutral-600 text-xs md:text-sm font-light leading-relaxed tracking-wide">
							Mobile Developer, Web Developer & UI/UX 
						</p>
						<div className="w-full h-px bg-neutral-300 mt-4"></div>
					</motion.div>

			
					<div className="max-w-7xl mx-auto flex flex-col justify-center min-h-screen">
						<div className="pl-0 md:pl-4">
							<AnimatePresence mode="wait">
								<motion.h1
									key={currentGreetingIndex}
									initial={{ opacity: 0, x: -50 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: 50 }}
									transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
									className="text-[clamp(3.5rem,12vw,9rem)] font-extralight leading-[0.9] tracking-[-0.04em] text-neutral-900 mb-8">
									{greetings[currentGreetingIndex].text}
								</motion.h1>
							</AnimatePresence>

							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 1, delay: 0.6 }}
								className="space-y-2">
								<p className="text-neutral-500 text-sm md:text-base font-light tracking-widest">
									I&apos;m Clyde
								</p>
								<p className="text-neutral-400 text-xs md:text-sm font-light max-w-md leading-relaxed">
									Crafting digital experiences through thoughtful design and clean code
								</p>
							</motion.div>

				
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 1, delay: 0.9 }}
								className="mt-12">
								<Link href="/projects">
									<button className="group relative px-8 py-4 border border-neutral-300 text-neutral-900 text-xs tracking-[0.2em] font-light overflow-hidden transition-all duration-500 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white">
										<span className="relative z-10 flex items-center gap-3">
											VIEW MY PROJECTS
											<motion.span
												animate={{ x: [0, 5, 0] }}
												transition={{
													duration: 1.5,
													repeat: Number.POSITIVE_INFINITY,
													ease: 'easeInOut',
												}}>
												<ArrowRight className="w-4 h-4" />
											</motion.span>
										</span>
									</button>
								</Link>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
			<CertificatesSection />
			<PhilosophySection />

			<FeaturedProjects projects={featuredProjects} />

			<section className="bg-white py-24 md:py-32">
				<div className="max-w-6xl mx-auto px-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className="space-y-8">
							<div className="flex items-center gap-4">
								<div className="w-8 h-px bg-black/20" />
								<p className="text-black/40 text-xs font-light tracking-[0.3em] uppercase">
									Selected Work
								</p>
							</div>

							<h2 className="text-4xl md:text-5xl font-light text-black leading-tight">
								Experiences
							</h2>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className="space-y-0">
							{works.map((project, index) => (
								<motion.article
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
									className="border-b border-black/10 py-6 cursor-pointer group"
									onClick={() =>
										setSelectedProject(selectedProject === index ? null : index)
									}>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-6">
											<span className="text-sm font-mono text-black/30">
												{String(index + 1).padStart(2, '0')}
											</span>
											<h3 className="text-xl font-light text-black group-hover:text-black/70 transition-colors">
												{project.title}
											</h3>
										</div>
										<div className="flex items-center gap-4">
											<motion.span
												className="text-black/30"
												animate={{ rotate: selectedProject === index ? 180 : 0 }}
												transition={{ duration: 0.3 }}>
												↓
											</motion.span>
										</div>
									</div>

									<AnimatePresence>
										{selectedProject === index && (
											<motion.div
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: 'auto' }}
												exit={{ opacity: 0, height: 0 }}
												transition={{ duration: 0.4 }}
												className="overflow-hidden">
												<div className="pl-12 pt-6 space-y-4">
													<p className="text-base text-black/60 leading-relaxed">
														{project.description}
													</p>
													<div className="flex flex-wrap gap-2">
														{project.tags.map((tag, tagIndex) => (
															<span
																key={tagIndex}
																className="text-xs text-black/50 bg-black/5 px-3 py-1 rounded-full">
																{tag}
															</span>
														))}
													</div>
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</motion.article>
							))}
						</motion.div>
					</div>
				</div>
			</section>

			<section className="bg-black text-white py-24 md:py-32 overflow-hidden">
				<div className="max-w-6xl mx-auto px-6">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="mb-20 md:mb-32">
						<div className="flex items-center gap-4 mb-6">
							<div className="w-8 h-px bg-gradient-to-r from-white/20 to-transparent" />
							<p className="text-white/40 text-xs font-light tracking-[0.3em] uppercase">
								How I Work
							</p>
						</div>
						<h2 className="text-4xl md:text-6xl font-light text-white leading-tight">
							Process
						</h2>
					</motion.div>

					<div className="relative">
						<div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent hidden md:block" />

						<div className="space-y-16 md:space-y-24">
							{[
								{
									num: '01',
									title: 'Research & Discovery',
									desc: 'Understanding your needs and goals',
									details: ['User interviews', 'Market analysis', 'Technical audit'],
									color: 'from-blue-500/20 to-cyan-500/20',
								},
								{
									num: '02',
									title: 'Design & Prototype',
									desc: 'Creating user-centered solutions',
									details: ['Wireframing', 'Visual design', 'Interactive prototypes'],
									color: 'from-purple-500/20 to-pink-500/20',
								},
								{
									num: '03',
									title: 'Develop & Test',
									desc: 'Building with modern technologies',
									details: [
										'Frontend development',
										'Quality assurance',
										'Performance optimization',
									],
									color: 'from-green-500/20 to-emerald-500/20',
								},
								{
									num: '04',
									title: 'Launch & Support',
									desc: 'Delivering results and ongoing care',
									details: ['Deployment', 'Monitoring', 'Continuous improvement'],
									color: 'from-orange-500/20 to-yellow-500/20',
								},
							].map((step, index) => (
								<motion.div
									key={step.num}
									initial={{ opacity: 0, x: -50 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.8, delay: index * 0.2 }}
									viewport={{ once: true }}
									className="relative group">
									<div className="flex items-start gap-8 md:gap-12">
										<div className="relative flex-shrink-0">
											<div className="w-16 h-16 rounded-full border border-white/20 bg-black flex items-center justify-center text-white/60 text-sm font-mono relative z-10">
												{step.num}
											</div>
											<div
												className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}
											/>
										</div>

										<div className="flex-1 pt-2">
											<div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
												<div className="flex-1">
													<div className="flex items-center gap-3 mb-3">
														<h3 className="text-2xl md:text-3xl font-light text-white group-hover:text-white/80 transition-colors">
															{step.title}
														</h3>
													</div>
													<p className="text-white/60 text-base md:text-lg leading-relaxed mb-6">
														{step.desc}
													</p>

													<div className="flex flex-wrap gap-2">
														{step.details.map((detail, i) => (
															<motion.span
																key={i}
																initial={{ opacity: 0, scale: 0.8 }}
																whileInView={{ opacity: 1, scale: 1 }}
																transition={{
																	duration: 0.4,
																	delay: index * 0.2 + i * 0.1,
																}}
																viewport={{ once: true }}
																className="px-3 py-1 text-xs text-white/50 border border-white/10 rounded-full hover:border-white/20 hover:text-white/70 transition-colors">
																{detail}
															</motion.span>
														))}
													</div>
												</div>

												<div className="hidden lg:block mt-8 lg:mt-0">
													<div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden">
														<motion.div
															initial={{ width: 0 }}
															whileInView={{ width: `${((index + 1) / 4) * 100}%` }}
															transition={{ duration: 1, delay: index * 0.2 }}
															viewport={{ once: true }}
															className={`h-full bg-gradient-to-r ${step.color.replace(
																'/20',
																'/50'
															)} rounded-full`}
														/>
													</div>
													<p className="text-xs text-white/30 mt-2 font-mono">
														{Math.round(((index + 1) / 4) * 100)}%
													</p>
												</div>
											</div>
										</div>
									</div>

									{index < 3 && (
										<motion.div
											initial={{ opacity: 0, scale: 0 }}
											whileInView={{ opacity: 1, scale: 1 }}
											transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
											viewport={{ once: true }}
											className="absolute left-8 -bottom-8 w-px h-8 bg-gradient-to-b from-white/20 to-white/10 hidden md:block">
											<div className="absolute -bottom-1 -left-1 w-2 h-2 border-r border-b border-white/20 rotate-45" />
										</motion.div>
									)}
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
