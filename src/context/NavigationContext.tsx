'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type PanelType = 'projects' | 'profile' | 'certificates' | 'github' | 'contact' | 'chat' | null;

interface NavigationContextType {
    activePanel: PanelType;
    openPanel: (panel: PanelType) => void;
    closePanel: () => void;
    isCommandPaletteOpen: boolean;
    toggleCommandPalette: () => void;
    openCommandPalette: () => void;
    closeCommandPalette: () => void;
    isKeyboardHelpOpen: boolean;
    openKeyboardHelp: () => void;
    closeKeyboardHelp: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
    const [activePanel, setActivePanel] = useState<PanelType>(null);
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
    const [isKeyboardHelpOpen, setIsKeyboardHelpOpen] = useState(false);

    const openPanel = useCallback((panel: PanelType) => {
        setActivePanel(panel);
        setIsCommandPaletteOpen(false);
        setIsKeyboardHelpOpen(false);
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

    const openKeyboardHelp = useCallback(() => {
        setIsKeyboardHelpOpen(true);
        setIsCommandPaletteOpen(false);
    }, []);

    const closeKeyboardHelp = useCallback(() => {
        setIsKeyboardHelpOpen(false);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                toggleCommandPalette();
                return;
            }

            if (e.key === '?' && !e.metaKey && !e.ctrlKey && !e.altKey) {
                e.preventDefault();
                setIsKeyboardHelpOpen(prev => !prev);
                return;
            }

            if (e.key === 'Escape') {
                if (isKeyboardHelpOpen) {
                    closeKeyboardHelp();
                } else if (isCommandPaletteOpen) {
                    closeCommandPalette();
                } else if (activePanel) {
                    closePanel();
                }
                return;
            }

            if (!e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey && !isCommandPaletteOpen && !isKeyboardHelpOpen) {
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
                    case '6':
                        e.preventDefault();
                        openPanel('chat');
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [toggleCommandPalette, closeCommandPalette, closePanel, openPanel, closeKeyboardHelp, isCommandPaletteOpen, isKeyboardHelpOpen, activePanel]);

    useEffect(() => {
        if (activePanel || isCommandPaletteOpen || isKeyboardHelpOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [activePanel, isCommandPaletteOpen, isKeyboardHelpOpen]);

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
                isKeyboardHelpOpen,
                openKeyboardHelp,
                closeKeyboardHelp,
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
