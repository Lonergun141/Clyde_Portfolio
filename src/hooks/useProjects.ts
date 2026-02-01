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

    const getCreatedAtTime = (p: Project): number => {
        const v = p.created_at;
        if (v == null) return 0;
        const t = typeof v === 'string' ? new Date(v).getTime() : (v as number);
        return Number.isFinite(t) ? t : 0;
    };

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
                // Default: newest first by date added (created_at), then by id
                if (sortOrder === 'none') {
                    const timeA = getCreatedAtTime(a);
                    const timeB = getCreatedAtTime(b);
                    if (timeA !== timeB) return timeB - timeA;
                    return (b.id ?? 0) - (a.id ?? 0);
                }
                if (!a.year && !b.year) return 0;
                if (!a.year) return 1;
                if (!b.year) return -1;

                const getYear = (y: string) => {
                    if (!y) return 0;
                    if (/present/i.test(y)) return new Date().getFullYear();
                    return parseInt(y.split(/[-–—]/)[0].trim(), 10) || 0;
                };
                const yearA = getYear(a.year);
                const yearB = getYear(b.year);

                return sortOrder === 'asc' ? yearA - yearB : yearB - yearA;
            });
    }, [projects, searchTerm, selectedCategory, sortOrder]);

    const hasNDA = (title: string) => (title || '').trim().includes('(Signed NDA)');

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
