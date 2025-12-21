'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { Lock, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Project } from '@/lib/types/types';

const projects: Project[] = [
	{
		title: 'QuickEase Reimagined Landing Page',
		description: 'My personal latest redesign take on QuickEase',
		technologies: ['Figma'],
		links: {
			figma: 'https://www.figma.com/design/Y27G8iAlPgQsRv97Cbfxta/QuickEase-Reimagined?node-id=0-1&t=DUCYHaBGkwAM9pQO-1',
		},
		categories: ['UI/UX Design'],
		image: '/QuickEase Landing Page.png',
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
		title: 'Lamdag Recipe Website Reimagined (Development)',
		description: 'T3 stack blog website',
		technologies: ['Nextjs', 'Tailwind', 'API', 'Figma'],
		links: {
			figma: 'https://www.figma.com/design/QkuanD4WBAvwyYOvVV3kGu/Recipe-Website?node-id=0-1&t=Lx4T6j2SFM9B0mAf-1',
			github: 'https://github.com/Lonergun141/Project-Lamdag.git',
		},
		categories: ['Web Development', 'UI/UX Design'],
		image: '/lamdag_page.png',
		year: '2025',
	},
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
		title: 'Redesign Test',
		description: 'Redesign test web and mobile entry for job application',
		technologies: ['Figma'],
		links: {
			figma: 'https://www.figma.com/design/LJQMts3g5ESLcNJIZKnCkv/VIPTutorsCO-Design-Test?node-id=0-1&t=CUaAVzhGatJ96jHX-1',
		},
		categories: ['UI/UX Design'],
		image: '/Dashboard.png',
		year: '2025',
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
			setSortOrder('desc');
		} else if (sortOrder === 'desc') {
			setSortOrder('asc');
		} else {
			setSortOrder('none');
		}
	};

	const getSortIcon = () => {
		switch (sortOrder) {
			case 'asc':
				return <ArrowUp size={16} className="text-foreground" />;
			case 'desc':
				return <ArrowDown size={16} className="text-foreground" />;
			default:
				return <ArrowUpDown size={16} className="text-muted-foreground" />;
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
		<main className="min-h-screen bg-background pt-32 px-4 md:px-8 pb-16">
			<div className="max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="mb-16">

					<div className="flex flex-col gap-2 mb-12">
						<h1 className="text-4xl md:text-5xl font-bold tracking-tight">
							Selected Works
						</h1>
						<p className="text-muted-foreground text-lg max-w-2xl">
							A curated collection of projects exploring web development, design, and user experience.
						</p>
					</div>

					<div className="flex items-center gap-3 p-3 bg-secondary/30 border border-border/50 rounded-lg max-w-fit mb-12 text-sm text-muted-foreground">
						<Lock size={14} className="text-primary" />
						<p>
							Some projects are protected by{' '}
							<span className="font-medium text-foreground">NDA</span>.
						</p>
					</div>

					<div className="flex flex-col space-y-8">
						{/* Controls Section */}
						<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
							{/* Categories as Tabs/Pills */}
							<div className="flex flex-wrap gap-2">
								{categories.map((category) => (
									<button
										key={category}
										onClick={() => setSelectedCategory(category)}
										className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
										${selectedCategory === category
												? 'bg-primary text-primary-foreground shadow-sm'
												: 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
											}`}>
										{category}
									</button>
								))}
							</div>

							<div className="flex items-center gap-4 w-full md:w-auto">
								<input
									type="text"
									placeholder="Search projects..."
									className="flex-1 md:w-64 px-4 py-2 rounded-md
									border border-border bg-background focus:ring-1 focus:ring-ring
									text-sm transition-colors focus:outline-none"
									onChange={(e) => setSearchTerm(e.target.value)}
								/>

								<button
									onClick={handleSortToggle}
									className="flex items-center space-x-2 px-3 py-2 border border-border 
								   hover:bg-muted rounded-md transition-all duration-300
								   text-sm font-medium text-muted-foreground hover:text-foreground shrink-0">
									{getSortIcon()}
									<span className="hidden sm:inline">{getSortLabel()}</span>
								</button>
							</div>
						</div>
					</div>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
					{filteredAndSortedProjects.map((project) => (
						<motion.div
							key={project.title}
							layout
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3 }}>
							{hasNDA(project.title) && (
								<div className="mb-3 flex items-center space-x-2">
									<div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
									<span className="text-[10px] uppercase tracking-wider text-primary font-semibold">
										Confidential
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
					<div className="flex flex-col items-center justify-center py-24 text-center">
						<p className="text-lg font-medium text-foreground mb-2">No projects found</p>
						<p className="text-muted-foreground">Try adjusting your search or filters.</p>
					</div>
				)}
			</div>
		</main>
	);
}
