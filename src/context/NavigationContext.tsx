'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type PanelType = 'projects' | 'profile' | 'certificates' | 'github' | 'contact' | null;

interface NavigationContextType {
    activePanel: PanelType;
    openPanel: (panel: PanelType) => void;
    closePanel: () => void;
    isCommandPaletteOpen: boolean;
    toggleCommandPalette: () => void;
    openCommandPalette: () => void;
    closeCommandPalette: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
    const [activePanel, setActivePanel] = useState<PanelType>(null);
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

    const openPanel = useCallback((panel: PanelType) => {
        setActivePanel(panel);
        setIsCommandPaletteOpen(false);
    }, []);

    const closePanel = useCallback(() => {
        setActivePanel(null);
    }, []);

    const toggleCommandPalette = useCallback(() => {
        setIsCommandPaletteOpen(prev => !prev);
    }, []);

    const openCommandPalette = useCallback(() => {
        setIsCommandPaletteOpen(true);
    }, []);

    const closeCommandPalette = useCallback(() => {
        setIsCommandPaletteOpen(false);
    }, []);

    // Global keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't trigger if typing in an input
            const target = e.target as HTMLElement;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

            // Cmd+K / Ctrl+K for command palette
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                toggleCommandPalette();
                return;
            }

            // Escape to close
            if (e.key === 'Escape') {
                if (isCommandPaletteOpen) {
                    closeCommandPalette();
                } else if (activePanel) {
                    closePanel();
                }
                return;
            }

            // Number keys 1-5 to open panels (when no modifiers)
            if (!e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
                switch (e.key) {
                    case '1':
                        e.preventDefault();
                        openPanel('projects');
                        break;
                    case '2':
                        e.preventDefault();
                        openPanel('profile');
                        break;
                    case '3':
                        e.preventDefault();
                        openPanel('certificates');
                        break;
                    case '4':
                        e.preventDefault();
                        openPanel('github');
                        break;
                    case '5':
                        e.preventDefault();
                        openPanel('contact');
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [toggleCommandPalette, closeCommandPalette, closePanel, openPanel, isCommandPaletteOpen, activePanel]);

    // Lock body scroll when panel or palette is open
    useEffect(() => {
        if (activePanel || isCommandPaletteOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [activePanel, isCommandPaletteOpen]);

    return (
        <NavigationContext.Provider
            value={{
                activePanel,
                openPanel,
                closePanel,
                isCommandPaletteOpen,
                toggleCommandPalette,
                openCommandPalette,
                closeCommandPalette,
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
}

export function useNavigation() {
    const context = useContext(NavigationContext);
    if (context === undefined) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
}
