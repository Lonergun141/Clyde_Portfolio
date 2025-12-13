'use client';

import { motion } from 'framer-motion';

export default function ProcessSection() {
    return (
        <section className="bg-background py-32 relative z-10 overflow-hidden">
            <div className="max-w-[1920px] mx-auto px-6 md:px-12">
                <div className="mb-32 max-w-4xl">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
                        Methodology
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-6xl md:text-8xl font-light tracking-tighter text-foreground leading-[0.9]">
                        THE
                        <br />
                        <span className="text-muted-foreground/30">Process</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            num: '01',
                            title: 'Discover',
                            desc: 'Understanding your needs through market analysis and technical audits.',
                        },
                        {
                            num: '02',
                            title: 'Design',
                            desc: 'Creating user-centered solutions with wireframes and interactive prototypes.',
                        },
                        {
                            num: '03',
                            title: 'Develop',
                            desc: 'Building scalable applications using modern frontend technologies.',
                        },
                        {
                            num: '04',
                            title: 'Deploy',
                            desc: 'Launching with performance optimization and continuous support.',
                        },
                    ].map((step, index) => (
                        <motion.div
                            key={step.num}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative group pt-8 border-t border-border/30 hover:border-foreground/50 transition-colors duration-500">
                            <span className="text-xs font-mono text-muted-foreground/40 mb-8 block">
                                {step.num}
                            </span>
                            <h3 className="text-3xl font-light text-foreground mb-6 group-hover:translate-x-2 transition-transform duration-300">
                                {step.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px]">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
