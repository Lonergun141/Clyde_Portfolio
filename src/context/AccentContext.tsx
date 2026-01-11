'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export const accentPresets = {
    orange: { name: 'Safety Orange', hsl: '12 85% 55%' },
    blue: { name: 'Electric Blue', hsl: '217 91% 60%' },
    green: { name: 'Emerald', hsl: '142 71% 45%' },
    purple: { name: 'Royal Purple', hsl: '271 81% 56%' },
    pink: { name: 'Hot Pink', hsl: '330 81% 60%' },
    cyan: { name: 'Cyan', hsl: '186 94% 50%' },
} as const;

export type AccentColorKey = keyof typeof accentPresets;

interface AccentContextType {
    accentColor: AccentColorKey;
    setAccentColor: (color: AccentColorKey) => void;
}

const AccentContext = createContext<AccentContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio-accent-color';

export function AccentProvider({ children }: { children: React.ReactNode }) {
    const [accentColor, setAccentColorState] = useState<AccentColorKey>('orange');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && stored in accentPresets) {
            setAccentColorState(stored as AccentColorKey);
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const preset = accentPresets[accentColor];
        document.documentElement.style.setProperty('--accent', preset.hsl);
    }, [accentColor, mounted]);

    const setAccentColor = useCallback((color: AccentColorKey) => {
        setAccentColorState(color);
        localStorage.setItem(STORAGE_KEY, color);
    }, []);

    return (
        <AccentContext.Provider value={{ accentColor, setAccentColor }}>
            {children}
        </AccentContext.Provider>
    );
}

export function useAccent() {
    const context = useContext(AccentContext);
    if (context === undefined) {
        throw new Error('useAccent must be used within an AccentProvider');
    }
    return context;
}
