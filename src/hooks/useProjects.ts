import { useState, useMemo } from 'react';
import { projects, projectCategories } from '@/lib/constants/projects';

export type SortOrder = 'none' | 'asc' | 'desc';
export type ViewMode = 'grid' | 'list';

export const useProjects = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [sortOrder, setSortOrder] = useState<SortOrder>('none');
    const [viewMode, setViewMode] = useState<ViewMode>('grid');

    const filteredAndSortedProjects = useMemo(() => {
        return projects
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

                // Handle date ranges "2021-2022" by taking the start year
                const getYear = (y: string) => parseInt(y.split('-')[0]) || 0;
                const yearA = getYear(a.year);
                const yearB = getYear(b.year);

                return sortOrder === 'asc' ? yearA - yearB : yearB - yearA;
            });
    }, [searchTerm, selectedCategory, sortOrder]);

    const hasNDA = (title: string) => title.includes('(Signed NDA)');

    const handleSortToggle = () => {
        setSortOrder(prev => prev === 'none' ? 'desc' : prev === 'desc' ? 'asc' : 'none');
    };

    const totalProjects = projects.length;
    const publicProjects = projects.filter(p => !hasNDA(p.title)).length;

    return {
        // State
        searchTerm,
        selectedCategory,
        sortOrder,
        viewMode,
        filteredAndSortedProjects,
        categories: projectCategories,
        totalProjects,
        publicProjects,

        // Actions
        setSearchTerm,
        setSelectedCategory,
        setSortOrder,
        setViewMode,
        handleSortToggle,
        hasNDA
    };
};
