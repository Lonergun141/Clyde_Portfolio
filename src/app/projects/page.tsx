'use client';
import { useState } from 'react';
import Image from 'next/image';

const projects = [
	{
		title: 'QuickEase Web',
		description:
			'QuickEase simplifies study sessions using AI to create summaries, flashcards, and quizzes from various inputs. It boosts productivity with tools like a Pomodoro Timer and gamification. Designed for efficiency, it saves time and complements traditional study methods.',
		technologies: ['React', 'Tailwind', 'Vite', 'Redux', 'RestAPI'],
		link: 'https://github.com/Lonergun141/QuickEase',
		categories: ['Web Development', 'UI/UX Design'],
		image: '/web.png',
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
		image: '/path-to-your-image.jpg',
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
//samok
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
		<main className="min-h-screen bg-background pt-24 px-8 pb-8">
			{' '}
			{/* Added pt-24 for navbar spacing */}
			<div className="max-w-7xl mx-auto">
				<h1 className="text-4xl font-bold text-brand-primary mb-8">Projects</h1>

				{/* Search and Filter Section */}
				<div className="mb-8 space-y-4">
					<input
						type="text"
						placeholder="Search projects..."
						className="w-full md:w-96 px-4 py-2 rounded-lg border border-border-DEFAULT 
                     focus:border-border-dark focus:outline-none
                     bg-background-light text-brand-primary"
						onChange={(e) => setSearchTerm(e.target.value)}
					/>

					<div className="flex flex-wrap gap-2">
						{categories.map((category) => (
							<button
								key={category}
								onClick={() => setSelectedCategory(category)}
								className={`px-4 py-2 rounded-lg text-sm transition-colors duration-300
                          ${
										selectedCategory === category
											? 'bg-brand-primary text-background-light'
											: 'bg-background-light text-brand-primary border border-border-DEFAULT'
									}`}>
								{category}
							</button>
						))}
					</div>
				</div>

				{/* Projects Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{filteredProjects.map((project, index) => (
						<div
							key={index}
							className="group bg-background-light rounded-xl border border-border-DEFAULT
                             hover:border-border-dark transition-all duration-300
                             hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                             flex flex-col h-full"
						>
							{project.categories.some(cat =>
								["UI/UX Design", "Photography", "Video Editing"].includes(cat)
							) && project.image && (
								<div className="relative w-full h-56 rounded-t-xl overflow-hidden">
									<Image
										src={project.image}
										alt={project.title}
										fill
										className="object-cover transform group-hover:scale-105 transition-transform duration-500"
										sizes="(max-width: 768px) 100vw,
												(max-width: 1200px) 50vw,
												33vw"
									/>
								</div>
							)}
							
							<div className="p-6 flex flex-col flex-grow">
								{/* Categories */}
								<div className="flex flex-wrap gap-2 mb-3">
									{project.categories.map((category, catIndex) => (
										<span
											key={catIndex}
											className="px-2.5 py-1 text-xs font-medium bg-background-accent 
                                                             rounded-full text-brand-secondary"
										>
											{category}
										</span>
									))}
								</div>

								{/* Title */}
								<h2 className="text-xl font-semibold text-brand-primary mb-2 
                                                             group-hover:text-brand-secondary transition-colors duration-300">
									{project.title}
								</h2>

								{/* Description */}
								<p className="text-brand-secondary text-sm mb-4 flex-grow">
									{project.description}
								</p>

								{/* Technologies */}
								<div className="flex flex-wrap gap-2 mb-4">
									{project.technologies.map((tech, techIndex) => (
										<span
											key={techIndex}
											className="px-3 py-1 text-xs font-medium bg-background
                                                             border border-border-DEFAULT rounded-full
                                                             text-brand-secondary"
										>
											{tech}
										</span>
									))}
								</div>

								{/* Link */}
								<a
									href={project.link}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center text-sm font-medium text-brand-primary 
                                                             hover:text-brand-secondary transition-colors duration-300
                                                             group-hover:translate-x-1 transform transition-transform"
								>
									View Project
									<svg 
										className="ml-1 w-4 h-4" 
										fill="none" 
										viewBox="0 0 24 24" 
										stroke="currentColor"
									>
										<path 
											strokeLinecap="round" 
											strokeLinejoin="round" 
											strokeWidth={2} 
											d="M9 5l7 7-7 7" 
										/>
									</svg>
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
