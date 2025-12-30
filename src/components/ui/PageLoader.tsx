'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PageLoader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
                >
                    {/* Rotating Geometric Elements */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
                        {/* Outer Rotating Ring */}
                        <motion.div
                            initial={{ rotate: 0, scale: 1 }}
                            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                            transition={{
                                rotate: { duration: 3, ease: 'linear', repeat: Infinity },
                                scale: { duration: 2, ease: 'easeInOut', repeat: Infinity },
                            }}
                            className="absolute inset-0 rounded-full border border-foreground/20"
                        />

                        {/* Middle Ring */}
                        <motion.div
                            initial={{ rotate: 0, scale: 1 }}
                            animate={{ rotate: -360, scale: [1, 0.9, 1] }}
                            transition={{
                                rotate: { duration: 4, ease: 'linear', repeat: Infinity },
                                scale: { duration: 2.5, ease: 'easeInOut', repeat: Infinity, delay: 0.2 },
                            }}
                            className="absolute inset-3 sm:inset-3.5 md:inset-4 rounded-full border border-foreground/30"
                        />

                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-6 sm:inset-7 md:inset-8 rounded-full bg-foreground/5 backdrop-blur-sm flex items-center justify-center"
                        >

                        </motion.div>

                        {/* Orbiting Dots */}
                        {[0, 120, 240].map((angle, i) => (
                            <motion.div
                                key={i}
                                initial={{ rotate: angle }}
                                animate={{ rotate: angle + 360 }}
                                transition={{
                                    duration: 3,
                                    ease: 'linear',
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                }}
                                className="absolute inset-0"
                            >
                                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-foreground/40 absolute top-0 left-1/2 -translate-x-1/2" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Horizontal Line Animation */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: [0, 1, 1, 0] }}
                        transition={{ duration: 2.5, times: [0, 0.4, 0.6, 1], ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent origin-center"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

