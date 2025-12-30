'use client';

import { motion } from 'framer-motion';

export default function ProcessSection() {
    const sdlcPhases = [
        {
            num: '01',
            phase: 'Planning',
            title: 'Discovery',
            description: 'Requirements analysis and sprint planning',
            svg: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            num: '02',
            phase: 'Design',
            title: 'Prototype',
            description: 'UI/UX design and system architecture',
            svg: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            num: '03',
            phase: 'Development',
            title: 'Build',
            description: '2-week sprints with CI/CD integration',
            svg: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            num: '04',
            phase: 'Testing',
            title: 'Quality',
            description: 'Automated testing and UAT',
            svg: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            num: '05',
            phase: 'Deployment',
            title: 'Launch',
            description: 'Production deployment and monitoring',
            svg: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            num: '06',
            phase: 'Maintenance',
            title: 'Iterate',
            description: 'Continuous improvement and support',
            svg: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
    ];

    return (
        <section className="bg-background py-32 relative z-10 overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12">
                {/* Header Section */}
                <div className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-8"
                    >
                        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                            Methodology
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-border/50 to-transparent" />
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 items-end mb-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-6xl md:text-8xl font-light tracking-tighter text-foreground leading-[0.9]"
                        >
                            Development
                            <br />
                            <span className="text-muted-foreground">Process</span>
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <p className="text-muted-foreground leading-relaxed">
                                <span className="text-foreground font-medium">SDLC</span> methodology with <span className="text-foreground font-medium">Scrum Agile</span> framework
                            </p>
                            <div className="flex gap-3 flex-wrap">
                                <span className="px-3 py-1 text-xs uppercase tracking-wider bg-muted-foreground/10 text-muted-foreground rounded-md">
                                    Agile
                                </span>
                                <span className="px-3 py-1 text-xs uppercase tracking-wider bg-muted-foreground/10 text-muted-foreground rounded-md">
                                    2-Week Sprints
                                </span>
                                <span className="px-3 py-1 text-xs uppercase tracking-wider bg-muted-foreground/10 text-muted-foreground rounded-md">
                                    CI/CD
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* SDLC Phases Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {sdlcPhases.map((phase, index) => (
                        <motion.div
                            key={phase.num}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true, margin: '-50px' }}
                            className="relative group"
                        >
                            {/* Connecting Line */}
                            {index < sdlcPhases.length - 1 && (
                                <div className="hidden lg:block absolute top-16 left-full w-6 h-px bg-gradient-to-r from-border/40 to-transparent z-0" />
                            )}

                            {/* Card */}
                            <div className="relative bg-transparent border border-border/20 rounded-lg p-6 hover:bg-muted/10 hover:border-foreground/30 transition-all duration-500 h-full flex flex-col">
                                {/* Icon */}
                                <div className="mb-6 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                                    {phase.svg}
                                </div>

                                {/* Phase Number */}
                                <span className="text-[10px] font-mono text-muted-foreground/40 mb-2">
                                    {phase.num}
                                </span>

                                {/* Title */}
                                <h3 className="text-xl font-light text-foreground mb-2 group-hover:text-muted-foreground transition-colors duration-300">
                                    {phase.title}
                                </h3>

                                {/* Phase Tag */}
                                <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50 mb-3">
                                    {phase.phase}
                                </span>

                                {/* Description */}
                                <p className="text-xs text-muted-foreground/70 leading-relaxed mt-auto">
                                    {phase.description}
                                </p>

                                {/* Hover Indicator */}
                                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-foreground/0 via-foreground/30 to-foreground/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Agile Ceremonies - Simplified */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-24 pt-12 border-t border-border/20"
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-light text-foreground mb-2">
                                Scrum <span className="text-muted-foreground">Ceremonies</span>
                            </h3>
                            <p className="text-sm text-muted-foreground/70">
                                Regular touchpoints for transparency and collaboration
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {['Planning', 'Daily Standup', 'Review', 'Retrospective'].map((ceremony, index) => (
                                <motion.div
                                    key={ceremony}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="px-4 py-2 bg-muted/10 border border-border/20 rounded-full hover:bg-muted/20 transition-colors duration-300"
                                >
                                    <span className="text-xs text-foreground">{ceremony}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
