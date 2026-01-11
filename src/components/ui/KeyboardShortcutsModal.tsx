'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard } from 'lucide-react';

interface ShortcutItem {
    keys: string[];
    description: string;
}

const shortcuts: ShortcutItem[] = [
    { keys: ['1'], description: 'Open Projects' },
    { keys: ['2'], description: 'Open Profile' },
    { keys: ['3'], description: 'Open Credentials' },
    { keys: ['4'], description: 'Open GitHub' },
    { keys: ['5'], description: 'Open Contact' },
    { keys: ['⌘', 'K'], description: 'Command Palette' },
    { keys: ['⌘', '⇧', 'L'], description: 'Toggle Theme' },
    { keys: ['Esc'], description: 'Close Panel/Modal' },
    { keys: ['?'], description: 'Show This Help' },
];

interface KeyboardShortcutsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-md"
                    >
                        <div className="bg-card border border-border shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-secondary/20">
                                <Keyboard size={14} className="text-muted-foreground" />
                                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                                    Keyboard Shortcuts
                                </span>
                                <button
                                    onClick={onClose}
                                    className="ml-auto p-1 hover:bg-secondary/50 transition-colors"
                                >
                                    <X size={14} className="text-muted-foreground" />
                                </button>
                            </div>

                            {/* Shortcuts List */}
                            <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
                                {shortcuts.map((shortcut, index) => (
                                    <motion.div
                                        key={shortcut.description}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                                    >
                                        <span className="text-sm text-foreground">
                                            {shortcut.description}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            {shortcut.keys.map((key, i) => (
                                                <kbd
                                                    key={i}
                                                    className="px-2 py-1 text-[10px] font-mono bg-secondary border border-border text-muted-foreground min-w-[24px] text-center"
                                                >
                                                    {key}
                                                </kbd>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="px-4 py-2 border-t border-border bg-secondary/10">
                                <span className="text-[10px] font-mono text-muted-foreground/60">
                                    Press <kbd className="px-1 py-0.5 bg-secondary border border-border mx-1">Esc</kbd> to close
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
