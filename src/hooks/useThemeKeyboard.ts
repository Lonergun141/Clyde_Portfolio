'use client';

import { useEffect, useCallback } from 'react';
import { useThemeTransition } from '@/context/ThemeTransitionContext';

/**
 * Hook that handles Ctrl+Shift+L keyboard shortcut for theme toggling
 */
export function useThemeKeyboard() {
    const { toggleTheme } = useThemeTransition();

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'l') {
            e.preventDefault();
            toggleTheme();
        }
    }, [toggleTheme]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
}
