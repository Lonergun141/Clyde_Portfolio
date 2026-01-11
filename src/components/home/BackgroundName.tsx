'use client';

import { motion } from 'framer-motion';

/**
 * Giant animated background name that appears behind the main content
 */
export default function BackgroundName() {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden hidden sm:flex">
            <motion.h1
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 0.03, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-[40vw] md:text-[35vw] font-black tracking-tighter text-foreground whitespace-nowrap"
            >
                CLYDE
            </motion.h1>
        </div>
    );
}
