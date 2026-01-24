import { motion } from 'framer-motion';
import { Lock, Edit2, Trash2 } from 'lucide-react';
import { Project } from '@/lib/types/types';

interface ProjectsListProps {
    isLoading: boolean;
    projects: Project[];
    onEdit: (project: Project) => void;
    onDelete: (id: number) => void;
}

export default function ProjectsList({ isLoading, projects, onEdit, onDelete }: ProjectsListProps) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-sm overflow-hidden">
            {/* List Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <div className="col-span-5 md:col-span-4 pl-2">Project Name</div>
                <div className="col-span-3 hidden md:block">Category</div>
                <div className="col-span-3 hidden md:block">Period</div>
                <div className="col-span-4 md:col-span-2 text-right pr-2">Actions</div>
            </div>

            {/* List Body */}
            {isLoading ? (
                <div className="p-12 flex justify-center">
                    <div className="w-8 h-8 border-2 border-white/10 border-t-[#FF6B35] rounded-full animate-spin" />
                </div>
            ) : projects.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground text-xs uppercase tracking-widest">
                    No projects found in database
                </div>
            ) : (
                <div className="divide-y divide-white/5">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id || project.title}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-12 gap-4 p-4 hover:bg-white/5 transition-colors items-center group"
                        >
                            <div className="col-span-5 md:col-span-4 pl-2 font-medium text-sm flex flex-col">
                                <span className="group-hover:text-[#FF6B35] transition-colors">{project.title.replace('(Signed NDA)', '')}</span>
                                {project.title.includes('NDA') && (
                                    <span className="flex items-center gap-1 text-[9px] text-muted-foreground mt-1">
                                        <Lock size={8} className="text-[#FF6B35]" /> Protected
                                    </span>
                                )}
                            </div>
                            <div className="col-span-3 hidden md:block text-xs text-muted-foreground">
                                {project.categories[0]}
                                {project.categories.length > 1 && ` +${project.categories.length - 1}`}
                            </div>
                            <div className="col-span-3 hidden md:block text-xs text-muted-foreground">
                                <span className={`
                                    px-2 py-1 rounded-full text-[10px] uppercase tracking-wider
                                    ${project.period === 'current' ? 'bg-[#FF6B35]/10 text-[#FF6B35]' : 'bg-white/5'}
                                `}>
                                    {project.period}
                                </span>
                            </div>
                            <div className="col-span-4 md:col-span-2 flex justify-end gap-2 pr-2">
                                <button
                                    onClick={() => onEdit(project)}
                                    className="p-2 hover:bg-white/10 text-muted-foreground hover:text-foreground rounded-sm transition-colors"
                                    title="Edit details"
                                >
                                    <Edit2 size={14} />
                                </button>
                                <button
                                    onClick={() => project.id && onDelete(project.id)}
                                    className="p-2 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 rounded-sm transition-colors"
                                    title="Delete project"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
