'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigation } from '@/context/NavigationContext';

interface NavigationCardProps {
    /** Card number (01, 02, etc.) */
    index: number;
    /** Main label (Projects, Profile, etc.) */
    label: string;
    /** Sublabel shown above main label (Explore, About, etc.) */
    sublabel: string;
    /** Panel ID to open on click */
    panelId: 'projects' | 'profile' | 'certificates' | 'github' | 'contact';
    /** Animation delay in seconds */
    delay?: number;
}

/**
 * Animated navigation card for opening panels
 */
export default function NavigationCard({
    index,
    label,
    sublabel,
    panelId,
    delay = 0.8
}: NavigationCardProps) {
    const { openPanel } = useNavigation();
    const formattedIndex = String(index).padStart(2, '0');

    return (
        <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay }}
            onClick={() => openPanel(panelId)}
            className="group w-full text-left"
        >
            <div className="relative p-4 sm:p-5 md:p-6 border border-border bg-background/50 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground group-hover:text-accent-foreground/70 uppercase tracking-widest block mb-1 sm:mb-2">
                            {formattedIndex} — {sublabel}
                        </span>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                            {label}
                        </h2>
                    </div>
                    <ArrowRight size={20} className="text-muted-foreground group-hover:text-accent-foreground group-hover:translate-x-2 transition-all sm:w-6 sm:h-6" />
                </div>
            </div>
        </motion.button>
    );
}
