'use client';

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef, MouseEvent } from 'react';
import { works } from '@/lib/constants/constants';

export default function ExperienceSection() {
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="bg-background py-32 relative z-10 overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-8"
                    >
                        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                            Experience
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-border/50 to-transparent" />
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 items-end">
                        <motion.h2
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-6xl md:text-8xl font-light tracking-tighter text-foreground leading-[0.9]"
                        >
                            Work
                            <br />
                            <span className="text-muted-foreground">History</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-muted-foreground leading-relaxed"
                        >
                            Professional journey through innovative tech companies and impactful projects
                        </motion.p>
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-0 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-border/0 via-border/50 to-border/0 hidden md:block" />

                    <div className="space-y-16">
                        {works.map((work, index) => (
                            <ExperienceCard
                                key={index}
                                work={work}
                                index={index}
                                isSelected={selectedProject === index}
                                isHovered={hoveredIndex === index}
                                onToggle={() => setSelectedProject(selectedProject === index ? null : index)}
                                onHover={(hovered) => setHoveredIndex(hovered ? index : null)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

interface ExperienceCardProps {
    work: typeof works[0];
    index: number;
    isSelected: boolean;
    isHovered: boolean;
    onToggle: () => void;
    onHover: (hovered: boolean) => void;
}

function ExperienceCard({ work, index, isSelected, isHovered, onToggle, onHover }: ExperienceCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 300 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '-50px' }}
            className="relative"
        >

            {/* Card */}
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={() => onHover(true)}
                onClick={onToggle}
                style={{
                    rotateX: isHovered ? rotateX : 0,
                    rotateY: isHovered ? rotateY : 0,
                }}
                className="md:ml-24 group cursor-pointer relative"
            >
                <div className="relative bg-transparent border border-border/20 rounded-lg p-8 md:p-12 hover:border-foreground/30 transition-all duration-500 hover:shadow-2xl hover:shadow-foreground/5">
                    {/* Number */}
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.05 }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="absolute top-4 right-4 text-[120px] md:text-[180px] font-light text-foreground leading-none pointer-events-none select-none"
                    >
                        {String(index + 1).padStart(2, '0')}
                    </motion.span>

                    {/* Content */}
                    <div className="relative z-10">
                        {/* Date Badge */}
                        <motion.div
                            animate={{ scale: isHovered ? 1.05 : 1 }}
                            transition={{ duration: 0.3 }}
                            className="inline-block mb-4"
                        >

                        </motion.div>

                        {/* Title */}
                        <h3 className="text-3xl md:text-5xl font-light text-foreground mb-3 group-hover:text-muted-foreground transition-colors duration-300">
                            {work.title}
                        </h3>

                        {/* Company (if available in work data) */}
                        <p className="text-sm text-muted-foreground/70 mb-6 font-light tracking-wide">
                            {work.description?.split('.')[0] || ''}
                        </p>


                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                        {isSelected && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden relative z-10"
                            >
                                <div className="pt-8 border-t border-border/20 space-y-6">
                                    {/* Description */}
                                    <p className="text-base text-muted-foreground leading-relaxed">
                                        {work.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {work.tags.map((tag, tagIndex) => (
                                            <motion.span
                                                key={tagIndex}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3, delay: tagIndex * 0.05 }}
                                                className="text-xs uppercase tracking-wider text-foreground/70 bg-foreground/5 border border-foreground/10 rounded-full px-4 py-2 hover:bg-foreground/10 hover:border-foreground/20 transition-all duration-300"
                                            >
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Hover Glow Effect */}
                    <motion.div
                        animate={{
                            opacity: isHovered ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent rounded-lg pointer-events-none"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}

