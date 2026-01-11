'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, ReactNode } from 'react';
import { useNavigation } from '@/context/NavigationContext';

interface DockItemProps {
    label: string;
    sublabel: string;
    description: string;
    panelId: 'projects' | 'profile' | 'certificates' | 'github' | 'contact';
    previewContent: ReactNode;
    index: number;
}

export default function DockItem({
    label,
    sublabel,
    description,
    panelId,
    previewContent,
    index
}: DockItemProps) {
    const [isHovered, setIsHovered] = useState(false);
    const { openPanel } = useNavigation();

    return (
        <div className="relative">
            {/* Tooltip with Preview */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-56 pointer-events-none z-50"
                    >
                        {/* Preview Card */}
                        <div className="bg-background/95 backdrop-blur-xl border border-border rounded-lg overflow-hidden shadow-2xl">
                            {/* Mini Preview */}
                            <div className="h-28 overflow-hidden border-b border-border bg-muted/30 relative">
                                <div className="absolute inset-0 scale-[0.35] origin-top-left w-[285%] h-[285%]">
                                    {previewContent}
                                </div>
                                <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-background/80 to-transparent" />
                            </div>

                            {/* Info */}
                            <div className="p-2.5">
                                <p className="text-[9px] text-muted-foreground leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        </div>

                        {/* Arrow */}
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1">
                            <div className="w-2 h-2 bg-background border-r border-b border-border rotate-45" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Text Button */}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => openPanel(panelId)}
                className="group text-left px-4 py-3 hover:bg-accent/10 rounded-lg transition-colors duration-200"
            >
                <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground block mb-0.5">
                    {sublabel}
                </span>
                <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                    {label}
                </span>
            </motion.button>
        </div>
    );
}
