'use client';

import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeTransitionContextType {
    toggleTheme: () => void;
    isTransitioning: boolean;
}

const ThemeTransitionContext = createContext<ThemeTransitionContextType | undefined>(undefined);

export function useThemeTransition() {
    const context = useContext(ThemeTransitionContext);
    if (!context) {
        throw new Error('useThemeTransition must be used within ThemeTransitionProvider');
    }
    return context;
}

export function ThemeTransitionProvider({ children }: { children: React.ReactNode }) {
    const { theme, setTheme } = useTheme();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [nextTheme, setNextTheme] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = useCallback(() => {
        if (isTransitioning || !mounted) return;

        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setNextTheme(newTheme);
        setIsTransitioning(true);
    }, [theme, isTransitioning, mounted]);

    const handleAnimationComplete = useCallback(() => {
        if (nextTheme) {
            setTheme(nextTheme);
            setTimeout(() => {
                setIsTransitioning(false);
                setNextTheme(null);
            }, 100);
        }
    }, [nextTheme, setTheme]);

    return (
        <ThemeTransitionContext.Provider value={{ toggleTheme, isTransitioning }}>
            {children}



            <AnimatePresence>
                {isTransitioning && nextTheme && (
                    <motion.div
                        initial={{ clipPath: 'circle(0% at 100% 0%)' }}
                        animate={{ clipPath: 'circle(150% at 100% 0%)' }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.5, 1],
                        }}
                        onAnimationComplete={handleAnimationComplete}
                        className={`fixed inset-0 z-[200] ${nextTheme === 'dark'
                            ? 'bg-[hsl(0,0%,8%)]'
                            : 'bg-[hsl(0,0%,92%)]'
                            }`}
                        style={{ pointerEvents: 'none' }}
                    />
                )}
            </AnimatePresence>
        </ThemeTransitionContext.Provider>
    );
}
