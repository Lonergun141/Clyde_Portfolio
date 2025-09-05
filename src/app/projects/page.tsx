'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { Lock, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Project } from '@/lib/types/types';

const projects: Project[] = [
	{
		title: 'Personal Blog Website (Development)',
		description: 'T3 stack blog website',
		technologies: ['Nextjs', 'Tailwind', 'Prisma', 'NextAuth', 'tRPC'],
		links: {
			github: 'https://github.com/Lonergun141/Chika',
			figma: 'https://www.figma.com/design/7iJIpyDJziK0DabM4OqRHt/Blog-Website?node-id=1-3&t=App18fCpzbKqgEZl-1',
		},
		categories: ['Web Development', 'UI/UX Design'],
		image: '/Landing Page.png',
		year: '2025',
	},
	{
		title: '(Signed NDA) CHED Regional Office X Theses and Dissertations Archive Library',
		description: 'Masters theses Digital repository for CHED regional office X archives',
		technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'JQuery'],
		links: {
			github: 'https://bitbucket.org/capstonecgnt/chedrox_theses_archive/src/main/',
			figma: 'https://www.figma.com/design/ss0riR9VUwEgfqPae0zhzM/CHEDeTeX?node-id=0-1&t=dZ9CWZszc6D3QqDG-1',
		},
		categories: ['Web Development', 'UI/UX Design'],
		image: '/CHED.png',
		year: '2025',
	},
	{
		title: 'QuickEase Web',
		description:
			'QuickEase simplifies study sessions using AI to create summaries, flashcards, and quizzes from various inputs. It boosts productivity with tools like a Pomodoro Timer and gamification.',
		technologies: ['React', 'Tailwind', 'Vite', 'Redux', 'RestAPI', 'Vercel'],
		links: {
			github: 'https://github.com/Lonergun141/QuickEase',
			figma: 'https://www.figma.com/design/d1lYnIMuJg9gXzVJK9AzFk/QuickEase-WEB?node-id=0-1&t=H00IXSWGgC6DD91X-1',
		},
		categories: ['Web Development', 'UI/UX Design'],
		image: '/web.png',
		year: '2024',
	},
	{
		title: 'QuickEase Mobile',
		description:
			'QuickEase simplifies study sessions using AI to create summaries, flashcards, and quizzes from various inputs. It boosts productivity with tools like a Pomodoro Timer and gamification. Designed for efficiency, it saves time and complements traditional study methods.',
		technologies: ['ReactNative', 'Expo', 'NativeWind', 'Redux', 'RestAPI'],
		links: {
			github: 'https://bitbucket.org/capstonecgnt/quickease/src/main/',
			figma: 'https://www.figma.com/design/mU4TyGyGioaRDqPypFM6TZ/QuickEase-App-Mobile?node-id=0-1&t=xDSyyhWJi5RXAJ3U-1',
		},
		categories: ['Mobile', 'UI/UX Design'],
		image: '/mobile.png',
		year: '2024',
	},
	{
		title: 'VortexNews Mobile',
		description: 'A simple site to view news and articles from various sources.',
		technologies: ['ReactNative', 'Redux', 'Expo', 'RestAPI'],
		links: {
			github: 'https://bitbucket.org/capstonecgnt/vortex_news_mobile/src/main/',
			figma: 'https://www.figma.com/design/02JyQUHe2MOu9Dxp8pXivL/QuickEase?node-id=828-290&t=ZrNjJgmkDgKIoPqx-1',
		},
		categories: ['Mobile', 'UI/UX Design'],
		year: '2023',
	},
	{
		title: 'VortexNews Web',
		description: 'A simple site to view news and articles from various sources.',
		technologies: ['React', 'Redux', 'Vite', 'RestAPI'],
		links: {
			github: 'https://github.com/Lonergun141/VortexMedia',
			figma: 'https://www.figma.com/design/02JyQUHe2MOu9Dxp8pXivL/QuickEase?node-id=684-276&t=ZrNjJgmkDgKIoPqx-1',
		},
		categories: ['Web Development', 'UI/UX Design'],
		image: '/vortexm.png',
		year: '2023',
	},
	{
		title: 'FurEverMatch',
		description: 'A tinder-like app for dogs to find their forever match',
		technologies: ['ReactNative', 'Redux', 'Expo'],
		links: {
			github: 'https://bitbucket.org/it2r9-teampura/r_fem/src/main/',
			figma: 'https://www.figma.com/design/afvDReFmVmcLH6z3I5stXn/FurEverMatch?node-id=0-1&t=FSCGOT219KVRsT7Y-1',
		},
		categories: ['Mobile', 'UI/UX Design'],
		image: '/frever.png',
		year: '2022',
	},
	{
		title: 'LAMDAG - Recipe Website',
		description: 'A simple recipe website',
		technologies: ['HTML', 'CSS', 'JavaScript', 'PHP'],
		links: {
			github: 'https://github.com/Lonergun141/IT2R9-WST-Final-Project.git',
			figma: 'https://www.figma.com/design/fLsFxeqVxhKLyes9ouvXZe/Weebsisteam?node-id=0-1&t=yp33DFcBBQ50sY0D-1',
		},
		categories: ['Web Development'],
		year: '2022',
	},
	{
		title: 'Dahilayan Wedding Shoot',
		description: 'Wedding shoot on Dahilayan Resort',
		technologies: ['Video Editing', 'Premiere Pro', 'Photoshop'],
		links: {
			other: 'https://www.facebook.com/share/v/1D7mrSGCff/',
		},
		categories: ['Video Editing'],
		image: '/wed.png',
		year: '2019',
	},
	{
		title: 'Dahilayan Pre-Wedding Shoot',
		description: 'Wedding shoot on Dahilayan Resort',
		technologies: ['Video Editing', 'Premiere Pro', 'Photoshop'],
		links: {
			other: 'https://www.facebook.com/share/v/14iNNp9JbV/',
		},
		categories: ['Video Editing'],
		image: '/weddings.png',
		year: '2019',
	},
	{
		title: 'BANOG BANOG TV VOLUME 2 (2022)',
		description:
			'Banog2x Festival Manolo Fortich Videography, Photography, Technical Assistant, and Video Editing',
		technologies: ['Video Editing', 'Premiere Pro', 'Photoshop', 'OBS'],
		links: {
			other: 'https://www.facebook.com/hashtag/banogbanogfestival2022',
		},
		categories: ['Video Editing', 'Photography'],
		image: '/BBTV.png',
		year: '2021-2022',
	},

	{
		title: '(Signed NDA) CHED Regional Office X Maintenance Monitoring System',
		description: 'ICT Hardware and Software maintenance tracker for CHED',
		technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'JQuery'],
		links: {},
		categories: ['Web Development'],
		image: '/CHED.png',
		year: '2025',
	},
	{
		title: '(Signed NDA) CHED Regional Office X Form Controller System',
		description: 'Form Controller/Manager for CHED',
		technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'JQuery'],
		links: {},
		categories: ['Web Development'],
		image: '/CHED.png',
		year: '2025',
	},
];

const categories: string[] = [
	'All',
	'Web Development',
	'Mobile',
	'Photography',
	'UI/UX Design',
	'Video Editing',
];

type SortOrder = 'none' | 'asc' | 'desc';

export default function Projects() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [selectedCategory, setSelectedCategory] = useState<string>('All');
	const [sortOrder, setSortOrder] = useState<SortOrder>('none');

	const filteredAndSortedProjects = projects
		.filter((project) => {
			const matchesSearch =
				project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				project.description.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesCategory =
				selectedCategory === 'All' || project.categories.includes(selectedCategory);
			return matchesSearch && matchesCategory;
		})
		.sort((a, b) => {
			if (sortOrder === 'none') return 0;

			if (!a.year && !b.year) return 0;
			if (!a.year) return 1;
			if (!b.year) return -1;

			const yearA = parseInt(a.year.split('-')[0]);
			const yearB = parseInt(b.year.split('-')[0]);

			if (isNaN(yearA) && isNaN(yearB)) return 0;
			if (isNaN(yearA)) return 1;
			if (isNaN(yearB)) return -1;

			if (sortOrder === 'asc') {
				return yearA - yearB;
			} else {
				return yearB - yearA;
			}
		});

	const hasNDA = (title: string): boolean => {
		return title.includes('(Signed NDA)');
	};

	const handleSortToggle = () => {
		if (sortOrder === 'none') {
			setSortOrder('desc'); // Start with newest first
		} else if (sortOrder === 'desc') {
			setSortOrder('asc'); // Then oldest first
		} else {
			setSortOrder('none'); // Then no sorting
		}
	};

	const getSortIcon = () => {
		switch (sortOrder) {
			case 'asc':
				return <ArrowUp size={16} className="text-black" />;
			case 'desc':
				return <ArrowDown size={16} className="text-black" />;
			default:
				return <ArrowUpDown size={16} className="text-black/40" />;
		}
	};

	const getSortLabel = () => {
		switch (sortOrder) {
			case 'asc':
				return 'Oldest First';
			case 'desc':
				return 'Newest First';
			default:
				return 'Sort by Year';
		}
	};

	return (
		<main className="min-h-screen bg-white pt-32 px-8 pb-16">
			<div className="max-w-6xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="mb-24">
					<h1 className="text-sm tracking-[0.3em] uppercase text-black/40 font-light mb-16">
						Archive
					</h1>

					{/* NDA Notice */}
					<div className="mb-8 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-md flex items-center">
						<p className="text-sm text-amber-800">
							Some projects are under{' '}
							<span className="font-semibold">Non-Disclosure Agreements (NDAs)</span>.
							Limited details are shared to respect confidentiality.
						</p>
					</div>

					{/* Search, Filter, and Sort Section */}
					<div className="space-y-8">
						<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
							<input
								type="text"
								placeholder="Search projects..."
								className="w-full md:w-96 px-4 py-3 
						   border-b border-black/10 focus:border-black/20
						   bg-transparent text-black/70 text-sm
						   focus:outline-none font-light"
								onChange={(e) => setSearchTerm(e.target.value)}
							/>

							{/* Sort Button */}
							<button
								onClick={handleSortToggle}
								className="flex items-center space-x-2 px-4 py-2 border border-black/10 
								   hover:border-black/20 rounded-md transition-all duration-300
								   text-sm font-light text-black/70 hover:text-black">
								{getSortIcon()}
								<span>{getSortLabel()}</span>
							</button>
						</div>

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
					{filteredAndSortedProjects.map((project) => (
						<motion.div
							key={project.title}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.4 }}>
							{hasNDA(project.title) && (
								<div className="mb-2 flex items-center space-x-2">
									<Lock className="text-amber-600" size={16} />
									<span className="text-xs uppercase tracking-wide text-amber-700 font-medium">
										Confidential Project
									</span>
								</div>
							)}
							<ProjectCard
								title={project.title.replace('(Signed NDA)', '').trim()}
								description={project.description}
								tags={project.technologies}
								image={project.image}
								year={project.year}
								links={project.links}
							/>
						</motion.div>
					))}
				</div>

				{filteredAndSortedProjects.length === 0 && (
					<p className="text-center text-black/40 font-light mt-16">
						No projects found matching your criteria.
					</p>
				)}
			</div>
		</main>
	);
}
