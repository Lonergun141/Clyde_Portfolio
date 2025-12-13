'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { works } from '@/lib/constants/constants';

export default function ExperienceSection() {
    const [selectedProject, setSelectedProject] = useState<number | null>(null);

    return (
        <section className="bg-background py-32 relative z-10">
            <div className="max-w-[1920px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32">
                    {/* Header */}
                    <div className="lg:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="sticky top-32">
                            <h2 className="text-6xl md:text-8xl font-light tracking-tighter text-foreground mb-8">
                                WORK
                                <br />
                                <span className="text-muted-foreground/30">History</span>
                            </h2>
                            <p className="text-xl font-light text-muted-foreground max-w-sm leading-relaxed">
                                A timeline of professional roles and contributions to the tech industry.
                            </p>
                        </motion.div>
                    </div>

                    {/* List */}
                    <div className="lg:col-span-8">
                        <div className="divide-y divide-border/30 border-t border-border/30">
                            {works.map((project, index) => (
                                <motion.article
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group cursor-pointer py-12"
                                    onClick={() =>
                                        setSelectedProject(selectedProject === index ? null : index)
                                    }>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex items-baseline gap-8 md:gap-16">
                                            <span className="text-sm font-mono text-muted-foreground/40">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <h3 className="text-3xl md:text-5xl font-light text-foreground group-hover:text-primary transition-colors duration-500">
                                                {project.title}
                                            </h3>
                                        </div>

                                        <div className="flex items-center gap-4 pl-12 md:pl-0">
                                            <motion.div
                                                animate={{ rotate: selectedProject === index ? 45 : 0 }}
                                                transition={{ duration: 0.4 }}
                                                className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                                                <span className="text-xl font-light">+</span>
                                            </motion.div>
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {selectedProject === index && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                                className="overflow-hidden">
                                                <div className="pt-8 pl-0 md:pl-[calc(2rem+24px)] grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <p className="text-lg text-muted-foreground font-light leading-relaxed">
                                                        {project.description}
                                                    </p>
                                                    <div className="flex flex-wrap content-start gap-2">
                                                        {project.tags.map((tag, tagIndex) => (
                                                            <span
                                                                key={tagIndex}
                                                                className="text-xs uppercase tracking-widest text-muted-foreground border border-border rounded-full px-4 py-2 hover:bg-border/30 transition-colors">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
