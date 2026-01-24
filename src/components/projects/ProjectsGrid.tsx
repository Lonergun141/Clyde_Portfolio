import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { Project } from '@/lib/types/types';

interface ProjectsGridProps {
    projects: Project[];
    hasNDA: (title: string) => boolean;
}

const ProjectsGrid = ({ projects, hasNDA }: ProjectsGridProps) => {
    // Reverse the projects as requested by user
    const sortedProjects = [...projects].reverse();

    return (
        <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
        >
            {sortedProjects.map((project, index) => (
                <motion.div
                    key={project.title}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.05, ease: "backOut" }}
                    className="h-full"
                >
                    <ProjectCard
                        title={project.title.replace('(Signed NDA)', '').trim()}
                        description={project.description}
                        tags={project.technologies}
                        categories={project.categories}
                        image={project.image}
                        year={project.year}
                        links={project.links}
                        isNDA={hasNDA(project.title)}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
};

export default ProjectsGrid;
