'use client';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import FeaturedProjects from '@/components/sections/FeaturedProjects';

export default function Home() {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end start'],
	});

	const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
	const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

	const projects = [
		{
			title: 'Mobile Development',
			description:
				'Creating seamless mobile experiences with React Native. Building cross-platform applications that deliver native performance.',
			tags: ['React Native', 'TypeScript', 'Mobile', 'UI/UX'],
			image: '/mobile.png',
			year: '2024',
		},
		{
			title: 'Web Development',
			description:
				'Crafting modern web applications using Next.js and React. Focus on performance, accessibility, and user experience.',
			tags: ['Next.js', 'React', 'TailwindCSS', 'TypeScript'],
			image: '/web.png',
			size: 'small' as const,
		},
		{
			title: 'UI/UX Design',
			description:
				'Designing intuitive interfaces and comprehensive design systems that enhance user engagement and satisfaction.',
			tags: ['Figma', 'Design Systems', 'Prototyping', 'User Research'],
			image: '/design.png',
		},
		{
			title: 'Former Video Editor and Photographer',
			description:
				'Developed and edited videos for events and marketing purposes.',
			tags: ['Lightroom', 'Premiere Pro', 'Photoshop', 'Cannon'],
			image: '/IMG_9748.JPG',
		},
	];

	const featuredProjects = [
		{
			title: 'QuickEase',
			category: 'Web and Mobile App',
			url: 'https://quick-ease-alpha.vercel.app/',
			year: '2024',
			description:
				'A revolutionary web and mobile application designed to quickly generate summary notes, flashcards, and quizzes from text, files, and images.',
			link: 'https://quick-ease-alpha.vercel.app/',
		},
	];

	return (
		<main className="min-h-screen bg-background font-inter">
			{/* Hero Section */}
			<div ref={containerRef} className="relative h-screen bg-white">
				<motion.div
					style={{ y, opacity }}
					className="absolute inset-0 flex items-center justify-center px-6 bg-gradient-to-b from-transparent to-white/30">
					<div className="max-w-7xl mx-auto w-full">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 1.5, ease: "easeOut" }}
								className="space-y-16">
							<p className="text-black/50 tracking-[0.4em] uppercase text-[10px] font-light">
								Portfolio 2024
							</p>
							<h1 className="text-[clamp(3rem,15vw,12rem)] font-thin leading-[0.8] tracking-[-0.04em] text-black">
								CLYDE
								<span className="block font-extralight mt-4">GEVERO</span>
							</h1>
							<div className="flex flex-col md:flex-row gap-16 text-sm font-extralight tracking-wider">
								<span className="text-black/60">Mobile Developer</span>
								<span className="hidden md:block text-black/20">―</span>
								<span className="text-black/60">Web Developer</span>
								<span className="hidden md:block text-black/20">―</span>
								<span className="text-black/60">UI/UX Designer</span>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</div>

			{/* Featured Projects */}
			<FeaturedProjects projects={featuredProjects} />

			{/* Projects Section */}
			<section className="py-32 bg-black text-white">
				<div className="max-w-8xl mx-auto px-6">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-2xl tracking-tight mb-16">
						Experiences
					</motion.h2>
					
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
						{projects.map((project, index) => (
							<motion.article
								key={project.title}
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
								className="group cursor-pointer"
							>
								<div className="aspect-[16/9] overflow-hidden mb-4">
									<motion.img
										src={project.image}
										alt={project.title}
										className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
										whileHover={{ scale: 1.05 }}
									/>
								</div>
								
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<h3 className="text-lg font-light tracking-wide">{project.title}</h3>
										<span className="text-sm text-gray-400">{project.year}</span>
									</div>
									
									<p className="text-sm text-gray-400 font-light leading-relaxed">
										{project.description}
									</p>
									
									<div className="flex flex-wrap gap-2">
										{project.tags.map((tag) => (
											<span 
												key={tag}
												className="text-xs text-gray-400 border border-gray-800 px-2 py-1"
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
