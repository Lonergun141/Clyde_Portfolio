'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import PhilosophySection from '@/components/sections/PhilosophySection';
import { works, featuredProjects } from '@/lib/constants/constants';
import { greetings } from '@/lib/constants/constants';
import { ArrowRight } from 'lucide-react';

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
				className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
				<motion.div
					className="absolute inset-0"
					transition={{
						duration: 8,
						repeat: Number.POSITIVE_INFINITY,
						ease: 'easeInOut',
					}}
				/>

				<motion.div
					className="absolute inset-0"
					transition={{
						duration: 10,
						repeat: Number.POSITIVE_INFINITY,
						ease: 'easeInOut',
					}}
				/>
				<div className="max-w-6xl mx-auto w-full relative z-10">
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
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1, delay: 1.6 }}
							className="pt-12">
							<Link href="/projects">
								<motion.span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
								<p className="relative z-10 flex items-center gap-3 text-black hover:underline font-medium tracking-wide cursor-pointer w-max group">
									View All Projects
									<motion.span
										animate={{ x: [0, 4, 0] }}
										transition={{
											duration: 1.5,
											repeat: Number.POSITIVE_INFINITY,
											ease: 'easeInOut',
										}}
										className="text-xs">
										<ArrowRight className="text-sm text-black" />
									</motion.span>
								</p>
							</Link>
						</motion.div>

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 1, delay: 1.8 }}
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