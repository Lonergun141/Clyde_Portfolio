'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import Footer from '@/components/sections/Footer';
import ProjectCard from '@/components/ProjectCard';
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
			size: 'large' as const,
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
			image: '/tech.png',
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
    {
			title: 'VortexNews',
			category: 'Web App and Mobile',
			url: 'https://lonergun141.github.io/VortexMedia/',
			year: '2024',
			description:
				'A simple site to view news and articles from various sources.',
			link: 'https://lonergun141.github.io/VortexMedia/',
		},
	];

	return (
		<main className="min-h-screen bg-background font-inter">
			{/* Hero Section */}
			<div ref={containerRef} className="relative h-screen">
				<motion.div
					style={{ y, opacity }}
					className="absolute inset-0 flex items-center justify-center px-6">
					<div className="max-w-7xl mx-auto w-full">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1 }}
							className="space-y-8">
							<p className="text-brand-secondary tracking-widest uppercase text-sm">
								Portfolio 2024
							</p>
							<h1 className="text-[clamp(3rem,15vw,12rem)] font-light leading-[0.9] tracking-tight text-brand-primary">
								CLYDE
								<span className="block font-medium">GEVERO</span>
							</h1>
							<div className="flex flex-col md:flex-row gap-8 text-lg">
								<span className="text-brand-secondary">Mobile Developer</span>
								<span className="hidden md:block text-border-dark">/</span>
								<span className="text-brand-secondary">Web Developer</span>
								<span className="hidden md:block text-border-dark">/</span>
								<span className="text-brand-secondary">UI/UX Designer</span>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</div>

			{/* Featured Projects */}
			<FeaturedProjects projects={featuredProjects} />

			{/* Projects Section */}
			<motion.section
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true, margin: '-100px' }}
				className="mt-32 py-24 bg-background-light relative overflow-hidden">
				<div className="max-w-8xl mx-auto px-6">
					<motion.h2
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="text-5xl md:text-6xl font-light mb-24 text-brand-primary">
						Project <span className="font-medium">Experiences</span>
					</motion.h2>
					<div className="grid grid-cols-4 auto-rows-[320px] gap-6">
						{projects.map((project, index) => (
							<motion.div
								key={project.title}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.7,
									delay: index * 0.15,
									ease: [0.23, 1, 0.32, 1],
								}}
								viewport={{ once: true, margin: '-50px' }}
								className={`
									relative
									${project.size === 'large' ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}
									${index === 3 ? 'col-span-2' : ''}
								`}>
								<ProjectCard {...project} />
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			<motion.footer
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true }}>
				<Footer />
			</motion.footer>
		</main>
	);
}
