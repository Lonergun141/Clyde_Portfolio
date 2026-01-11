'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, FolderKanban, User, Award, Terminal, ArrowRight, Github } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigation, PanelType } from '@/context/NavigationContext';

interface CommandItem {
    id: PanelType;
    label: string;
    description: string;
    icon: React.ReactNode;
    shortcut?: string;
}

const commands: CommandItem[] = [
    {
        id: 'projects',
        label: 'Projects',
        description: 'View deployed systems and case studies',
        icon: <FolderKanban size={18} />,
        shortcut: '1',
    },
    {
        id: 'profile',
        label: 'Profile',
        description: 'About me and experience',
        icon: <User size={18} />,
        shortcut: '2',
    },
    {
        id: 'certificates',
        label: 'Certificates',
        description: 'Credentials and achievements',
        icon: <Award size={18} />,
        shortcut: '3',
    },
    {
        id: 'github',
        label: 'GitHub',
        description: 'Contribution activity and repositories',
        icon: <Github size={18} />,
        shortcut: '4',
    },
];

export default function CommandPalette() {
    const { isCommandPaletteOpen, closeCommandPalette, openPanel } = useNavigation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredCommands = commands.filter(
        cmd =>
            cmd.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cmd.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Focus input when opened
    useEffect(() => {
        if (isCommandPaletteOpen) {
            setSearchTerm('');
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isCommandPaletteOpen]);

    // Keyboard navigation
    useEffect(() => {
        if (!isCommandPaletteOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const selected = filteredCommands[selectedIndex];
                if (selected) {
                    openPanel(selected.id);
                }
            } else if (['1', '2', '3', '4'].includes(e.key) && !searchTerm) {
                const idx = parseInt(e.key) - 1;
                if (commands[idx]) {
                    openPanel(commands[idx].id);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isCommandPaletteOpen, filteredCommands, selectedIndex, openPanel, searchTerm]);

    return (
        <AnimatePresence>
            {isCommandPaletteOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
                        onClick={closeCommandPalette}
                    />

                    {/* Palette */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-lg"
                    >
                        <div className="bg-card border border-border shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-secondary/20">
                                <Terminal size={14} className="text-muted-foreground" />
                                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                                    Command Palette
                                </span>
                                <button
                                    onClick={closeCommandPalette}
                                    className="ml-auto p-1 hover:bg-secondary/50 transition-colors"
                                >
                                    <X size={14} className="text-muted-foreground" />
                                </button>
                            </div>

                            {/* Search */}
                            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                                <Search size={16} className="text-muted-foreground" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    placeholder="Search destinations..."
                                    className="flex-1 bg-transparent text-foreground text-sm placeholder:text-muted-foreground/50 outline-none font-mono"
                                />
                            </div>

                            {/* Commands List */}
                            <div className="max-h-64 overflow-y-auto">
                                {filteredCommands.length === 0 ? (
                                    <div className="px-4 py-8 text-center">
                                        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                                            No results found
                                        </span>
                                    </div>
                                ) : (
                                    filteredCommands.map((cmd, index) => (
                                        <button
                                            key={cmd.id}
                                            onClick={() => openPanel(cmd.id)}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                            className={`w-full flex items-center gap-4 px-4 py-3 text-left transition-colors ${selectedIndex === index
                                                ? 'bg-accent text-accent-foreground'
                                                : 'hover:bg-secondary/30'
                                                }`}
                                        >
                                            <div className="text-muted-foreground">{cmd.icon}</div>
                                            <div className="flex-1">
                                                <div className="text-sm font-bold uppercase tracking-wide">{cmd.label}</div>
                                                <div className="text-xs text-muted-foreground font-mono">{cmd.description}</div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {cmd.shortcut && (
                                                    <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-secondary border border-border text-muted-foreground">
                                                        {cmd.shortcut}
                                                    </kbd>
                                                )}
                                                <ArrowRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100" />
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>

                            {/* Footer Hint */}
                            <div className="px-4 py-2 border-t border-border bg-secondary/10 flex items-center gap-4">
                                <span className="text-[10px] font-mono text-muted-foreground/60">
                                    <kbd className="px-1 py-0.5 bg-secondary border border-border mr-1">↑↓</kbd> Navigate
                                </span>
                                <span className="text-[10px] font-mono text-muted-foreground/60">
                                    <kbd className="px-1 py-0.5 bg-secondary border border-border mr-1">Enter</kbd> Select
                                </span>
                                <span className="text-[10px] font-mono text-muted-foreground/60">
                                    <kbd className="px-1 py-0.5 bg-secondary border border-border mr-1">Esc</kbd> Close
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
