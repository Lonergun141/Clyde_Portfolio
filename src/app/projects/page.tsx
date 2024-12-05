'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';

const projects = [
	{
		title: 'QuickEase Web',
		description:
			'QuickEase simplifies study sessions using AI to create summaries, flashcards, and quizzes from various inputs. It boosts productivity with tools like a Pomodoro Timer and gamification.',
		technologies: ['React', 'Tailwind', 'Vite', 'Redux', 'RestAPI'],
		link: 'https://github.com/Lonergun141/QuickEase',
		categories: ['Web Development', 'UI/UX Design'],
		image: '/web.png',
		year: '2024'
	},
	{
		title: 'QuickEase Mobile',
		description:
			'QuickEase simplifies study sessions using AI to create summaries, flashcards, and quizzes from various inputs. It boosts productivity with tools like a Pomodoro Timer and gamification. Designed for efficiency, it saves time and complements traditional study methods.',
		technologies: ['ReactNative', 'Expo', 'NativeWind', 'Redux', 'RestAPI'],
		link: 'https://bitbucket.org/capstonecgnt/quickease/src/main/',
		categories: ['Mobile', 'UI/UX Design'],
		image: '/mobile.png',
	},
	{
		title: 'VortexNews Mobile',
		description: 'A simple site to view news and articles from various sources.',
		technologies: ['ReactNative', 'Redux', 'Expo', 'RestAPI'],
		link: 'https://bitbucket.org/capstonecgnt/vortex_news_mobile/src/main/',
		categories: ['Mobile', 'UI/UX Design'],
	},
    {
		title: 'VortexNews Web',
		description: 'A simple site to view news and articles from various sources.',
		technologies: ['React', 'Redux', 'Vite', 'RestAPI'],
		link: 'https://github.com/Lonergun141/VortexMedia',
		categories: ['Web Development', 'UI/UX Design'],
		image: '/vortexm.png',
	},
    {
		title: 'FurEverMatch',
		description: 'A tinder-like app for dogs to find their forever match',
		technologies: ['ReactNative', 'Redux', 'Expo'],
		link: 'https://bitbucket.org/it2r9-teampura/r_fem/src/main/',
		categories: ['Mobile', 'UI/UX Design'],
		image: '/frever.png',
	},
    {
		title: 'LAMDAG - Recipe Website',
		description: 'A simple recipe website',
		technologies: ['HTML', 'CSS', 'JavaScript', 'PHP'],
		link: 'https://github.com/Lonergun141/IT2R9-WST-Final-Project',
		categories: ['Web Development'],
	},
	{
		title: "Dahilayan Wedding Shoot",
		description: "Wedding shoot on Dahilayan Resort",
		technologies: ["Video Editing", "Premiere Pro", "Photoshop"],
		link: "https://www.facebook.com/share/v/1D7mrSGCff/",
		categories: ["Video Editing"],
		image: "/wed.png"
	},
    {
		title: "Dahilayan Pre-Wedding Shoot",
		description: "Wedding shoot on Dahilayan Resort",
		technologies: ["Video Editing", "Premiere Pro", "Photoshop"],
		link: "https://www.facebook.com/share/v/14iNNp9JbV/",
		categories: ["Video Editing"],
		image: "/weddings.png"
	},
    {
		title: "BANOG BANOG TV VOLUME 2 (2022)",
		description: "Banog2x Festival Manolo Fortich Videography, Photography, Technical Assistant, and Video Editing",
		technologies: ["Video Editing", "Premiere Pro", "Photoshop", "OBS"],
		link: "https://www.facebook.com/hashtag/banogbanogfestival2022",
		categories: ["Video Editing", "Photography"],
		image: "/BBTV.png"
	},
];

const categories = [
	'All',
	'Web Development',
	'Mobile',
	'Photography',
	'UI/UX Design',
	'Video Editing',
];

export default function Projects() {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('All');

	const filteredProjects = projects.filter((project) => {
		const matchesSearch =
			project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			project.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory =
			selectedCategory === 'All' ||
			project.categories.includes(selectedCategory);
		return matchesSearch && matchesCategory;
	});

	return (
		<main className="min-h-screen bg-white pt-32 px-8 pb-16">
			<div className="max-w-6xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="mb-24"
				>
					<h1 className="text-sm tracking-[0.3em] uppercase text-black/40 font-light mb-16">
						Archive
					</h1>

					{/* Search and Filter Section */}
					<div className="space-y-8">
						<input
							type="text"
							placeholder="Search projects..."
							className="w-full md:w-96 px-4 py-3 
                     border-b border-black/10 focus:border-black/20
                     bg-transparent text-black/70 text-sm
                     focus:outline-none font-light"
							onChange={(e) => setSearchTerm(e.target.value)}
						/>

						<div className="flex flex-wrap gap-6">
							{categories.map((category) => (
								<button
									key={category}
									onClick={() => setSelectedCategory(category)}
									className={`text-xs tracking-wider uppercase transition-all duration-300
                          ${
										selectedCategory === category
											? 'text-black font-light'
											: 'text-black/40 hover:text-black/60 font-extralight'
									}`}>
									{category}
								</button>
							))}
						</div>
					</div>
				</motion.div>

				{/* Projects Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-16">
					{filteredProjects.map((project) => (
						<motion.div
							key={project.title}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.4 }}
						>
							<ProjectCard
								title={project.title}
								description={project.description}
								tags={project.technologies}
								image={project.image}
								year={project.year}
								link={project.link}
							/>
						</motion.div>
					))}
				</div>

				{filteredProjects.length === 0 && (
					<p className="text-center text-black/40 font-light mt-16">
						No projects found matching your criteria.
					</p>
				)}
			</div>
		</main>
	);
}
