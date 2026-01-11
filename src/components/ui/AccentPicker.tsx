'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { useState } from 'react';
import { useAccent, accentPresets, AccentColorKey } from '@/context/AccentContext';

export default function AccentPicker() {
    const { accentColor, setAccentColor } = useAccent();
    const [isOpen, setIsOpen] = useState(false);

    const colorEntries = Object.entries(accentPresets) as [AccentColorKey, typeof accentPresets[AccentColorKey]][];

    return (
        <div className="relative">
            {/* Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 border border-border hover:border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                title="Change accent color"
            >
                <Palette size={14} />
            </motion.button>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Picker Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 top-full mt-2 z-50 bg-card border border-border shadow-xl p-3 min-w-[180px]"
                        >
                            <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
                                Accent Color
                            </div>

                            <div className="space-y-1">
                                {colorEntries.map(([key, preset]) => (
                                    <button
                                        key={key}
                                        onClick={() => {
                                            setAccentColor(key);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 px-2 py-2 transition-colors ${accentColor === key
                                                ? 'bg-accent/10'
                                                : 'hover:bg-secondary/50'
                                            }`}
                                    >
                                        {/* Color Swatch */}
                                        <div
                                            className="w-4 h-4 flex-shrink-0 border border-border"
                                            style={{ backgroundColor: `hsl(${preset.hsl})` }}
                                        />
                                        {/* Name */}
                                        <span className="text-xs font-mono text-foreground flex-1 text-left">
                                            {preset.name}
                                        </span>
                                        {/* Check */}
                                        {accentColor === key && (
                                            <Check size={12} className="text-accent" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
