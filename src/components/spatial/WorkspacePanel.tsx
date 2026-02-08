'use client';

import { motion, AnimatePresence, Transition, Variants } from 'framer-motion';
import { X } from 'lucide-react';
import { useNavigation } from '@/context/NavigationContext';

interface WorkspacePanelProps {
    panelId: string;
    title: string;
    children: React.ReactNode;
}

// Spring physics configuration for smooth, natural motion
const springTransition: Transition = {
    type: 'spring',
    damping: 30,
    stiffness: 300,
    mass: 0.8,
};

// Staggered content reveal variants
const contentVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            ...springTransition,
            staggerChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: { duration: 0.2 }
    },
};

const headerVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.15,
            ...springTransition,
        }
    },
};

const closeButtonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0.2,
            type: 'spring',
            damping: 20,
            stiffness: 400,
        }
    },
};

export default function WorkspacePanel({ panelId, title, children }: WorkspacePanelProps) {
    const { activePanel, closePanel } = useNavigation();
    const isOpen = activePanel === panelId;

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <>
                    {/* Dimmed Background with blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[50] bg-background/90 backdrop-blur-md"
                        onClick={closePanel}
                    />

                    {/* Panel Container with spring physics */}
                    <motion.div
                        initial={{ opacity: 0, y: '100%', scale: 0.95 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            y: '100%',
                            scale: 0.98,
                            transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] }
                        }}
                        transition={springTransition}
                        className="fixed inset-0 z-[51] flex flex-col bg-background overflow-hidden"
                    >
                        {/* Panel Header with staggered reveal */}
                        <motion.header
                            variants={headerVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 md:py-6 border-b border-border bg-secondary/5"
                        >
                            <div className="flex items-center gap-4">
                                <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: 32, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                    className="h-[1px] bg-accent"
                                />
                                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                                    {title}
                                </h2>
                            </div>
                            <motion.button
                                variants={closeButtonVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={closePanel}
                                className="group flex items-center gap-2 px-2 sm:px-3 py-2 border border-border hover:border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                            >
                                <span className="text-[10px] font-mono uppercase tracking-widest hidden sm:inline">Close</span>
                                <X size={14} />
                            </motion.button>
                        </motion.header>

                        {/* Panel Content with staggered children reveal */}
                        <motion.div
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex-1 overflow-y-auto"
                        >
                            {children}
                        </motion.div>

                        {/* Panel Footer */}
                        <motion.footer
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, ...springTransition }}
                            className="px-4 sm:px-6 md:px-8 py-3 md:py-4 border-t border-border bg-secondary/5 flex items-center justify-between"
                        >
                            <span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                                <kbd className="px-1 sm:px-1.5 py-0.5 bg-secondary border border-border mr-1 sm:mr-2">Esc</kbd>
                                to return
                            </span>
                            <span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground/50">
                                {panelId.toUpperCase()}_PANEL
                            </span>
                        </motion.footer>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
