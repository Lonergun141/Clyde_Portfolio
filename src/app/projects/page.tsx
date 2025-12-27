'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { Lock, ArrowUpDown, ArrowUp, ArrowDown, LayoutGrid, List as ListIcon, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { projects, projectCategories } from '@/lib/constants/projects';

type SortOrder = 'none' | 'asc' | 'desc';
type ViewMode = 'list' | 'grid';

export default function Projects() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [selectedCategory, setSelectedCategory] = useState<string>('All');
	const [sortOrder, setSortOrder] = useState<SortOrder>('none');
	const [viewMode, setViewMode] = useState<ViewMode>('grid');

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

	const toggleViewMode = () => {
		setViewMode(prev => prev === 'list' ? 'grid' : 'list');
	};

	return (
		<main className="min-h-screen bg-background pt-32 px-4 md:px-8 pb-16">
			<div className="max-w-[1800px] mx-auto">
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
							<div className="hidden md:flex justify-between items-center mb-12 border-b border-border/40 pb-4">
								<div className="flex gap-8 overflow-x-auto pb-2 scrollbar-hide">
									{projectCategories.map((category) => (
										<button
											key={category}
											onClick={() => setSelectedCategory(category)}
											className={`text-sm tracking-wider uppercase transition-colors relative pb-4 -mb-4 ${selectedCategory === category
												? 'text-foreground font-medium'
												: 'text-muted-foreground hover:text-foreground'
												}`}
										>
											{category}
											{selectedCategory === category && (
												<motion.span
													layoutId="category-underline"
													className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"
												/>
											)}
										</button>
									))}
								</div>
							</div>
							<div className="flex flex-wrap gap-2 md:hidden"> {/* Mobile categories */}
								{projectCategories.map((category) => (
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

								<button
									onClick={toggleViewMode}
									className="flex items-center space-x-2 px-3 py-2 border border-border 
								   hover:bg-muted rounded-md transition-all duration-300
								   text-sm font-medium text-muted-foreground hover:text-foreground shrink-0"
									title={viewMode === 'list' ? "Switch to Grid View" : "Switch to List View"}
								>
									{viewMode === 'list' ? <LayoutGrid size={16} /> : <ListIcon size={16} />}
								</button>
							</div>
						</div>
					</div>
				</motion.div>

				<AnimatePresence mode="wait">
					{viewMode === 'grid' ? (
						<motion.div
							key="grid"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24 md:gap-y-32"
						>
							{filteredAndSortedProjects.map((project, index) => {
								// Gallery Staggered Layout Logic (2 Columns)
								// Shift every 2nd item (right column) down
								const isStaggered = (index % 2 === 1);

								return (
									<motion.div
										key={project.title}
										layout
										initial={{ opacity: 0, scale: 0.95, y: 20 }}
										animate={{ opacity: 1, scale: 1, y: 0 }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										className={`${isStaggered ? 'md:mt-32' : ''}`}
									>
										<ProjectCard
											title={project.title.replace('(Signed NDA)', '').trim()}
											description={project.description}
											tags={project.technologies}
											image={project.image}
											year={project.year}
											links={project.links}
											variant="minimal"
											isNDA={hasNDA(project.title)}
										/>
									</motion.div>
								)
							})}
						</motion.div>
					) : (
						<motion.div
							key="list"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="flex flex-col gap-8"
						>
							{filteredAndSortedProjects.map((project, index) => {
								const simpleTitle = project.title.replace('(Signed NDA)', '').trim();
								const primaryLink = project.links?.live || project.links?.github || project.links?.figma || project.links?.other || '#';
								const isConfidential = hasNDA(project.title);

								return (
									<motion.div
										key={project.title}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3, delay: index * 0.05 }}
										className="group border-b border-border/40 pb-8 last:border-0"
									>
										<div className="flex flex-col md:flex-row md:items-center gap-8">
											{/* Image - Static */}
											<Link href={primaryLink} target="_blank" className="relative w-full md:w-64 aspect-[16/9] shrink-0 overflow-hidden rounded-md bg-muted/20">
												{project.image ? (
													<Image
														src={project.image}
														alt={simpleTitle}
														fill
														className={`object-cover transition-transform duration-500 group-hover:scale-105 ${isConfidential ? 'blur-[2px] opacity-70 grayscale' : ''}`}
													/>
												) : (
													<div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground uppercase">No Preview</div>
												)}

												{isConfidential && (
													<div className="absolute inset-0 z-10 flex items-center justify-center">
														<Lock size={16} className="text-primary" />
													</div>
												)}
											</Link>

											{/* Content */}
											<div className="flex-1 min-w-0 flex flex-col justify-between gap-4">
												<div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
													<div>
														<div className="flex items-baseline gap-4 mb-2">
															<span className="text-xs font-mono text-muted-foreground/50">
																{index < 9 ? `0${index + 1}` : index + 1}
															</span>
															<Link href={primaryLink} target="_blank" className="hover:text-primary transition-colors flex items-center gap-3">
																<h3 className="text-2xl md:text-3xl font-light tracking-tight text-foreground truncate max-w-xl">
																	{simpleTitle}
																</h3>
																{isConfidential && (
																	<span className="text-[10px] uppercase tracking-wider text-primary border border-primary/20 px-2 py-0.5 rounded-full font-bold">
																		NDA
																	</span>
																)}
															</Link>
														</div>
														<div className="flex flex-wrap gap-2 text-xs text-muted-foreground uppercase tracking-wider pl-8 md:pl-0">
															{project.categories.slice(0, 3).map(cat => (
																<span key={cat}>{cat} •</span>
															))}
															<span className="font-mono text-foreground/60">{project.year}</span>
														</div>
													</div>

													{/* Links */}
													<div className="flex items-center gap-4 shrink-0 pl-8 md:pl-0">
														{project.links.live && (
															<Link href={project.links.live} target="_blank" className="p-2 rounded-full border border-foreground/10 hover:bg-foreground hover:text-background transition-all" title="Live Demo">
																<ArrowUpRight size={18} />
															</Link>
														)}
														{project.links.github && (
															<Link href={project.links.github} target="_blank" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
																GitHub
															</Link>
														)}
														{project.links.figma && (
															<Link href={project.links.figma} target="_blank" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
																Figma
															</Link>
														)}
													</div>
												</div>

												<p className="text-sm text-muted-foreground line-clamp-2 max-w-3xl pl-8 md:pl-0">
													{project.description}
												</p>
											</div>
										</div>
									</motion.div>
								)
							})}
						</motion.div>
					)}
				</AnimatePresence>

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
