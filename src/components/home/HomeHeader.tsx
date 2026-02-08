'use client';

import { motion } from 'framer-motion';
import { useNavigation } from '@/context/NavigationContext';
import { useThemeTransition } from '@/context/ThemeTransitionContext';
import { useTheme } from 'next-themes';
import { Moon, Sun, Terminal, Keyboard } from 'lucide-react';
import { useState, useEffect } from 'react';
import AccentPicker from '@/components/ui/AccentPicker';

/**
 * Top bar with status indicator and action buttons
 */
export default function HomeHeader() {
    const { openCommandPalette, openKeyboardHelp } = useNavigation();
    const { toggleTheme } = useThemeTransition();
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-16 py-4 md:py-6">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex items-center gap-2 sm:gap-3"
            >
                <div className="w-2 h-2 bg-accent" />
                {/* <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground">
                    Open for Work
                </span> */}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex items-center gap-2 sm:gap-4"
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openCommandPalette}
                    className="flex items-center gap-2 px-2 sm:px-3 py-2 border border-border hover:border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                    <Terminal size={14} />
                    <span className="text-[10px] font-mono uppercase tracking-widest hidden sm:inline">⌘K</span>
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openKeyboardHelp}
                    className="p-2 border border-border hover:border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 hidden sm:flex"
                    title="Keyboard shortcuts (?)"
                >
                    <Keyboard size={14} />
                </motion.button>
                <AccentPicker />
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleTheme}
                    className="p-2 border border-border hover:border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                    {mounted && (theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />)}
                </motion.button>
            </motion.div>
        </header>
    );
}
