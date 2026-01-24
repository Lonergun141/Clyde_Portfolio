'use client';

import { useState, useMemo } from 'react';
import WorkspacePanel from '@/components/spatial/WorkspacePanel';
import { useProjects } from '@/hooks/useProjects';
import ProjectsControls from '@/components/projects/ProjectsControls';
import ProjectPeriodTabs from '@/components/projects/ProjectPeriodTabs';
import ProjectSection from '@/components/projects/ProjectSection';
import { Briefcase, Rocket, Code, Aperture } from 'lucide-react';

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
        hasNDA,
        loading
    } = useProjects();

    // Period tab state
    const [activePeriod, setActivePeriod] = useState('professional');

    // Split projects by period
    const projectsByPeriod = useMemo(() => ({
        professional: filteredAndSortedProjects.filter(p => p.period === 'current'),
        personal: filteredAndSortedProjects.filter(p => p.period === 'personal'),
        academic: filteredAndSortedProjects.filter(p => p.period === 'university'),
        creative: filteredAndSortedProjects.filter(p => p.period === 'creative'),
    }), [filteredAndSortedProjects]);

    // Tab configuration
    const periodTabs = [
        {
            id: 'professional',
            label: 'Professional Work',
            icon: Briefcase,
            count: projectsByPeriod.professional.length,
            isPrimary: true,
        },
        {
            id: 'personal',
            label: 'Personal Projects',
            icon: Rocket,
            count: projectsByPeriod.personal.length,
        },
        {
            id: 'academic',
            label: 'Academic Projects',
            icon: Code,
            count: projectsByPeriod.academic.length,
        },
        {
            id: 'creative',
            label: 'Media & Creative',
            icon: Aperture,
            count: projectsByPeriod.creative.length,
        },
    ];

    // Get current projects based on active tab
    const currentProjects = projectsByPeriod[activePeriod as keyof typeof projectsByPeriod];

    return (
        <WorkspacePanel panelId="projects" title="Deployed Systems">
            <div className="p-8 max-w-[1920px] mx-auto">

                {/* Search and Filter Controls */}
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

                {/* Period Tabs */}
                <div className="mt-8">
                    <ProjectPeriodTabs
                        tabs={periodTabs}
                        activeTab={activePeriod}
                        onTabChange={setActivePeriod}
                    />

                    {/* Project Section */}
                    <ProjectSection
                        projects={currentProjects}
                        viewMode={viewMode}
                        hasNDA={hasNDA}
                        loading={loading}
                    />
                </div>

            </div>
        </WorkspacePanel>
    );
}
