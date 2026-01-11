'use client';

import { motion } from 'framer-motion';

export default function StageBackground() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Subtle Grid */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Floating Geometric Elements */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.02 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="absolute top-[10%] right-[15%] w-64 h-64 border border-foreground"
                style={{ transform: 'rotate(15deg)' }}
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.015 }}
                transition={{ duration: 2, delay: 0.8 }}
                className="absolute bottom-[20%] left-[10%] w-48 h-48 border border-foreground"
                style={{ transform: 'rotate(-10deg)' }}
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.02 }}
                transition={{ duration: 2, delay: 1.1 }}
                className="absolute top-[60%] right-[25%] w-32 h-32 border border-foreground"
                style={{ transform: 'rotate(45deg)' }}
            />

            {/* Crosshair Marker */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 1.5, delay: 1.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
                <div className="relative w-8 h-8">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-foreground" />
                    <div className="absolute top-0 left-1/2 w-[1px] h-full bg-foreground" />
                </div>
            </motion.div>

            {/* Corner Markers */}
            <div className="absolute top-8 left-8 w-6 h-6 border-l border-t border-foreground/10" />
            <div className="absolute top-8 right-8 w-6 h-6 border-r border-t border-foreground/10" />
            <div className="absolute bottom-8 left-8 w-6 h-6 border-l border-b border-foreground/10" />
            <div className="absolute bottom-8 right-8 w-6 h-6 border-r border-b border-foreground/10" />
        </div>
    );
}
