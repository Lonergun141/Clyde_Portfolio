import { motion } from 'framer-motion';
import Link from 'next/link';
import { Project } from '@/lib/types/types';

interface ProjectsListProps {
    projects: Project[];
    hasNDA: (title: string) => boolean;
}

const ProjectsList = ({ projects, hasNDA }: ProjectsListProps) => {
    return (
        <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col space-y-2 border-t border-border/20 pt-2"
        >
            {/* Credits Style List Header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground font-mono opacity-50 border-b border-border/10 mb-2">
                <div className="col-span-1">#</div>
                <div className="col-span-11 md:col-span-4">Title</div>
                <div className="col-span-3 hidden md:block">Genre</div>
                <div className="col-span-3 md:col-span-2 hidden md:block">Year</div>
                <div className="col-span-3 md:col-span-2 text-right hidden md:block">Link</div>
            </div>

            {projects.map((project, index) => (
                <motion.div
                    key={project.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    className="group grid grid-cols-12 gap-4 items-center px-4 py-4 hover:bg-muted/30 border-b border-border/10 transition-colors"
                >
                    <div className="col-span-1 text-xs font-mono text-muted-foreground">
                        {(index + 1).toString().padStart(2, '0')}
                    </div>
                    <div className="col-span-11 md:col-span-4 flex items-center gap-2">
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-sm md:text-base uppercase tracking-wider truncate">
                            {project.title.replace('(Signed NDA)', '').trim()}
                        </h3>
                        {hasNDA(project.title) && (
                            <span className="text-[9px] font-mono text-primary/70 border border-primary/20 px-1.5 py-0.5 inline-block shrink-0">
                                NDA
                            </span>
                        )}
                    </div>
                    <div className="col-span-3 hidden md:block text-xs text-muted-foreground font-mono uppercase">
                        {project.categories[0]}
                    </div>
                    <div className="col-span-3 md:col-span-2 hidden md:block text-xs font-mono text-muted-foreground">
                        {project.year}
                    </div>
                    <div className="col-span-3 md:col-span-2 hidden md:flex justify-end">
                        {(project.links.live || project.links.github || project.links.figma || project.links.other) ? (
                            <Link
                                href={project.links.live || project.links.github || project.links.figma || project.links.other || '#'}
                                target="_blank"
                                className="text-xs font-bold uppercase tracking-widest text-foreground hover:text-primary underline decoration-primary/30 hover:decoration-primary underline-offset-4 transition-all"
                            >
                                View
                            </Link>
                        ) : (
                            <span className="text-[10px] uppercase text-muted-foreground/30">
                                Locked
                            </span>
                        )}
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default ProjectsList;
