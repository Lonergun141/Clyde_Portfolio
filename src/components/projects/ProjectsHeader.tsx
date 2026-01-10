import { motion } from 'framer-motion';

interface ProjectsHeaderProps {
    totalProjects: number;
    publicProjects: number;
}

const ProjectsHeader = ({ totalProjects, publicProjects }: ProjectsHeaderProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="flex flex-col gap-6 mb-16 md:mb-24 pt-8 border-b border-border/20 pb-8"
        >
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h2 className="text-xs font-mono text-primary uppercase tracking-[0.3em] mb-2 pl-1">
                        {'//'}Selected Works
                    </h2>
                    <h1 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase text-foreground max-w-4xl leading-[0.9]">
                        The <span className="text-muted-foreground">Archive</span>
                    </h1>
                </div>

                {/* Stats / Counter */}
                <div className="flex items-center gap-8 text-xs font-mono text-muted-foreground uppercase tracking-widest border-l border-border/30 pl-6 h-12">
                    <div>
                        <span className="block text-foreground text-lg">{totalProjects}</span>
                        <span>Total</span>
                    </div>
                    <div>
                        <span className="block text-foreground text-lg">{publicProjects}</span>
                        <span>Public</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectsHeader;
