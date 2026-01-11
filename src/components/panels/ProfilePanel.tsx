'use client';

import WorkspacePanel from '@/components/spatial/WorkspacePanel';
import { motion } from 'framer-motion';
import { mainTechnologies, creativeTools } from '@/lib/constants/constants';
import { MapPin, Briefcase, GraduationCap, FileKey } from 'lucide-react';
import { useState } from 'react';
import ResumeRequestModal from './ResumeRequestModal';
import { TechHoverCard } from '@/components/ui/TechHoverCard';

export default function ProfilePanel() {
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

    const handleRequestResume = () => {
        setIsResumeModalOpen(true);
    };

    return (
        <WorkspacePanel panelId="profile" title="System Operator">
            <div className="h-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 h-full">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-5 relative border-b lg:border-b-0 lg:border-r border-border flex flex-col overflow-hidden"
                    >
                        <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col h-full">
                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-6 h-[1px] bg-accent" />
                                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
                                        Operator
                                    </span>
                                </div>
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2">
                                    Clyde Gevero
                                </h1>
                                <p className="text-sm text-muted-foreground font-mono">
                                    Fullstack Developer & UI/UX Designer
                                </p>
                            </div>

                            <div className="space-y-3 sm:space-y-4 mb-auto">
                                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                                    <MapPin size={14} className="text-muted-foreground" />
                                    <span className="font-mono text-muted-foreground">Philippines</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Briefcase size={14} className="text-muted-foreground" />
                                    <span className="font-mono text-muted-foreground">Available for Projects</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <GraduationCap size={14} className="text-muted-foreground" />
                                    <span className="font-mono text-muted-foreground">BS Information Technology • Cum Laude</span>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-border/50 mt-6">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleRequestResume}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-border hover:border-accent hover:bg-accent hover:text-accent-foreground font-mono uppercase tracking-widest text-xs transition-all duration-300"
                                >
                                    <FileKey size={14} />
                                    Request Resume Access
                                </motion.button>
                            </div>

                            <ResumeRequestModal
                                isOpen={isResumeModalOpen}
                                onClose={() => setIsResumeModalOpen(false)}
                            />

                            <div className="pt-6 mt-6">
                                <p className="text-xs text-muted-foreground leading-relaxed font-mono">
                                    What I do is build build build no matter what
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="lg:col-span-7 p-4 sm:p-6 md:p-8 lg:p-12 overflow-y-auto">
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-12"
                        >
                            <div className="flex items-center gap-3 mb-6 border-b border-border pb-3">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                                    01
                                </span>
                                <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
                                    Development Stack
                                </h2>
                                <span className="text-[10px] font-mono text-muted-foreground ml-auto">
                                    [{String(mainTechnologies.length).padStart(2, '0')}]
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                                {mainTechnologies.map((tech, index) => (
                                    <TechHoverCard
                                        key={tech.name}
                                        name={tech.name}
                                        description={tech.description}
                                        logo={tech.logo}
                                    >
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3, delay: 0.3 + index * 0.03 }}
                                            className="group px-2 sm:px-3 md:px-4 py-2 sm:py-3 border border-border hover:border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 w-full text-center"
                                        >
                                            <span className="text-xs sm:text-sm font-mono">{tech.name}</span>
                                        </motion.div>
                                    </TechHoverCard>
                                ))}
                            </div>
                        </motion.section>

                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className="flex items-center gap-3 mb-6 border-b border-border pb-3">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                                    02
                                </span>
                                <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
                                    Creative Tools
                                </h2>
                                <span className="text-[10px] font-mono text-muted-foreground ml-auto">
                                    [{String(creativeTools.length).padStart(2, '0')}]
                                </span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {creativeTools.map((tool, index) => (
                                    <motion.div
                                        key={tool}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.5 + index * 0.03 }}
                                        className="group px-4 py-3 border border-border hover:border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                                    >
                                        <span className="text-sm font-mono">{tool}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    </div>
                </div>
            </div>
        </WorkspacePanel>
    );
}
