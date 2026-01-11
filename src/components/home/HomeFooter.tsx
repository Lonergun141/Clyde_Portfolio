'use client';

import { motion } from 'framer-motion';

/**
 * Footer with copyright and version info
 */
export default function HomeFooter() {
    return (
        <footer className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-16 py-4 md:py-6 mt-auto">
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-[8px] sm:text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider sm:tracking-widest"
            >
                © 2026
            </motion.span>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="text-[8px] sm:text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider sm:tracking-widest"
            >
                v3.2 — Spatial
            </motion.span>
        </footer>
    );
}
