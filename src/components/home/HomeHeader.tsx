'use client';

import { motion } from 'framer-motion';
import { useNavigation } from '@/context/NavigationContext';
import { useThemeTransition } from '@/context/ThemeTransitionContext';
import { useTheme } from 'next-themes';
import { Moon, Sun, Terminal, Keyboard, FileText, LayoutGrid } from 'lucide-react';
import { useState, useEffect } from 'react';
import AccentPicker from '@/components/ui/AccentPicker';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface HomeHeaderProps {
    isResumeView?: boolean;
    setIsResumeView?: (value: boolean) => void;
}

/**
 * Top bar with status indicator and action buttons
 */
export default function HomeHeader({ isResumeView, setIsResumeView }: HomeHeaderProps) {
    const { openCommandPalette, openKeyboardHelp } = useNavigation();
    const { toggleTheme } = useThemeTransition();
    const { theme, setTheme } = useTheme();
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
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex items-center gap-2 sm:gap-4"
            >
                {/* Resume / Portfolio Toggle */}
                {setIsResumeView && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsResumeView(!isResumeView)}
                        className="flex items-center gap-2 px-3 py-2 border border-border hover:border-accent hover:bg-accent/10 hover:text-accent transition-all duration-300 bg-transparent"
                        title={isResumeView ? "Switch to Portfolio View" : "Switch to Resume View"}
                    >
                        {isResumeView ? <LayoutGrid size={14} /> : <FileText size={14} />}
                        <span className="text-[10px] font-mono uppercase tracking-widest hidden sm:inline">
                            {isResumeView ? "Portfolio View" : "Resume View"}
                        </span>
                    </motion.button>
                )}

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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="p-2 border border-border hover:border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                        >
                            {mounted && (theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />)}
                        </motion.button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-background border-border text-foreground font-mono text-xs z-[10000]">
                        <DropdownMenuItem onClick={() => setTheme("light")} className="hover:bg-accent/20 hover:text-accent cursor-none transition-colors">
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")} className="hover:bg-accent/20 hover:text-accent cursor-none transition-colors">
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")} className="hover:bg-accent/20 hover:text-accent cursor-none transition-colors">
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </motion.div>
        </header>
    );
}
