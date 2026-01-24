import { motion } from 'framer-motion';
import { Project } from '@/lib/types/types';
import ProjectsGrid from './ProjectsGrid';
import ProjectsList from './ProjectsList';

interface ProjectSectionProps {
    projects: Project[];
    viewMode: 'grid' | 'list';
    hasNDA: (title: string) => boolean;
    loading?: boolean;
}

const ProjectSection = ({ projects, viewMode, hasNDA, loading = false }: ProjectSectionProps) => {
    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center"
            >
                <div className="inline-block w-12 h-12 border-2 border-border border-t-[#FF6B35] rounded-full animate-spin mb-4" />
                <p className="text-sm font-mono text-muted-foreground/50 uppercase tracking-widest">
                    Loading projects...
                </p>
            </motion.div>
        );
    }

    if (projects.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center"
            >
                <div className="w-16 h-16 mb-4 border border-dashed border-border/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl text-muted-foreground/30">∅</span>
                </div>
                <p className="text-sm font-mono text-muted-foreground/50 uppercase tracking-widest">
                    No projects in this category
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            key={`${viewMode}-${projects.length}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            {viewMode === 'grid' ? (
                <ProjectsGrid projects={projects} hasNDA={hasNDA} />
            ) : (
                <ProjectsList projects={projects} hasNDA={hasNDA} />
            )}
        </motion.div>
    );
};

export default ProjectSection;
