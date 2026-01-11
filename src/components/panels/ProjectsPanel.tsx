'use client';

import WorkspacePanel from '@/components/spatial/WorkspacePanel';
import { useProjects } from '@/hooks/useProjects';
import ProjectsControls from '@/components/projects/ProjectsControls';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import ProjectsList from '@/components/projects/ProjectsList';
import { Code, Aperture, Film } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProjectsPanel() {
    const {
        searchTerm,
        selectedCategory,
        sortOrder,
        viewMode,
        filteredAndSortedProjects,
        categories,
        setSearchTerm,
        setSelectedCategory,
        handleSortToggle,
        setViewMode,
        hasNDA
    } = useProjects();

    // Split projects into two groups
    const creativeCategories = ['Video Editing', 'Photography'];

    const systemProjects = filteredAndSortedProjects.filter(p =>
        !p.categories.some(cat => creativeCategories.includes(cat))
    );

    const creativeProjects = filteredAndSortedProjects.filter(p =>
        p.categories.some(cat => creativeCategories.includes(cat))
    );

    return (
        <WorkspacePanel panelId="projects" title="Deployed Systems">
            <div className="p-8 max-w-[1920px] mx-auto">

                {/* Controls */}
                <ProjectsControls
                    selectedCategory={selectedCategory}
                    categories={categories}
                    onSelectCategory={setSelectedCategory}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    sortOrder={sortOrder}
                    onSortToggle={handleSortToggle}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                />

                <div className="space-y-24 mt-8">

                    {/* SECTION 1: ENGINEERING & DESIGN */}
                    {systemProjects.length > 0 && (
                        <section>
                            <div className="flex items-center gap-3 mb-8 border-b border-border pb-4">
                                <Code size={18} className="text-muted-foreground" />
                                <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
                                    Engineering & Systems
                                </h2>
                                <span className="text-xs font-mono text-muted-foreground ml-auto">
                                    [{String(systemProjects.length).padStart(2, '0')}]
                                </span>
                            </div>

                            {viewMode === 'grid' ? (
                                <ProjectsGrid projects={systemProjects} hasNDA={hasNDA} />
                            ) : (
                                <ProjectsList projects={systemProjects} hasNDA={hasNDA} />
                            )}
                        </section>
                    )}

                    {/* SECTION 2: CREATIVE WORKS */}
                    {creativeProjects.length > 0 && (
                        <section>
                            <div className="flex items-center gap-3 mb-8 border-b border-border pb-4">
                                <Aperture size={18} className="text-muted-foreground" />
                                <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
                                    Creative Works & Media
                                </h2>
                                <span className="text-xs font-mono text-muted-foreground ml-auto">
                                    [{String(creativeProjects.length).padStart(2, '0')}]
                                </span>
                            </div>

                            {viewMode === 'grid' ? (
                                <ProjectsGrid projects={creativeProjects} hasNDA={hasNDA} />
                            ) : (
                                <ProjectsList projects={creativeProjects} hasNDA={hasNDA} />
                            )}
                        </section>
                    )}

                    {/* Empty State */}
                    {systemProjects.length === 0 && creativeProjects.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-[40vh] flex flex-col items-center justify-center text-center opacity-50"
                        >
                            <Film size={48} className="mb-6 text-muted-foreground" />
                            <h3 className="text-2xl font-bold uppercase tracking-widest text-foreground">No Footage Found</h3>
                            <p className="text-muted-foreground font-mono mt-2">The archives are incomplete.</p>
                        </motion.div>
                    )}

                </div>
            </div>
        </WorkspacePanel>
    );
}
