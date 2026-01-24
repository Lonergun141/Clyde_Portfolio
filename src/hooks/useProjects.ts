import { useState, useMemo, useEffect } from 'react';
import { Project } from '@/lib/types/types';

export type SortOrder = 'none' | 'asc' | 'desc';
export type ViewMode = 'grid' | 'list';

export const projectCategories = [
    'All',
    'Web Development',
    'Mobile',
    'Photography',
    'UI/UX Design',
    'Video Editing',
];

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [sortOrder, setSortOrder] = useState<SortOrder>('none');
    const [viewMode, setViewMode] = useState<ViewMode>('grid');

    // Fetch projects from database
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects');
                const data = await response.json();

                if (data.success) {
                    setProjects(data.projects);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

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

                const getYear = (y: string) => parseInt(y.split('-')[0]) || 0;
                const yearA = getYear(a.year);
                const yearB = getYear(b.year);

                return sortOrder === 'asc' ? yearA - yearB : yearB - yearA;
            });
    }, [projects, searchTerm, selectedCategory, sortOrder]);

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
        loading,

        // Actions
        setSearchTerm,
        setSelectedCategory,
        setSortOrder,
        setViewMode,
        handleSortToggle,
        hasNDA
    };
};
