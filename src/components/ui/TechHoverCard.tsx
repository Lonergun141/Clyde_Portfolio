"use client";

import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TechHoverCardProps {
    name: string;
    description: string;
    logo: string;
    children: React.ReactNode;
}

export const TechHoverCard = ({ name, description, logo, children }: TechHoverCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [xOffset, setXOffset] = useState(0);
    const [placement, setPlacement] = useState<'top' | 'bottom'>('top');
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const center = rect.left + rect.width / 2;
            const windowWidth = window.innerWidth;
            const tooltipWidth = 256;
            const buffer = 20;

            let offset = 0;
            if (center + tooltipWidth / 2 > windowWidth - buffer) {
                offset = (windowWidth - buffer) - (center + tooltipWidth / 2);
            } else if (center - tooltipWidth / 2 < buffer) {
                offset = buffer - (center - tooltipWidth / 2);
            }
            setXOffset(offset);

            if (rect.top < 220) {
                setPlacement('bottom');
            } else {
                setPlacement('top');
            }
        }
        setIsHovered(true);
    };

    return (
        <div
            ref={containerRef}
            className="relative flex items-center justify-center w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: placement === 'top' ? 8 : -8,
                            scale: 0.95,
                            x: '-50%'
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            x: `calc(-50% + ${xOffset}px)`
                        }}
                        exit={{
                            opacity: 0,
                            y: placement === 'top' ? 4 : -4,
                            scale: 0.95,
                            x: `calc(-50% + ${xOffset}px)`
                        }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`absolute left-1/2 z-50 pointer-events-none whitespace-normal ${placement === 'top' ? 'bottom-full mb-3' : 'top-full mt-3'
                            }`}
                        style={{ width: 'max-content', maxWidth: '16rem' }}
                    >
                        <div className="relative bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-2xl flex flex-col items-center gap-3 text-center">

                            <div className="w-12 h-12 relative flex items-center justify-center p-2 bg-zinc-50 dark:bg-zinc-800/80 rounded-lg border border-zinc-100 dark:border-zinc-700">
                                <Image
                                    src={`https://cdn.simpleicons.org/${logo}`}
                                    alt={name}
                                    width={32}
                                    height={32}
                                    className="w-full h-full object-contain"
                                    unoptimized
                                />
                            </div>


                            <div>
                                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{name}</h4>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                                    {description}
                                </p>
                            </div>

                            {/* Arrow Pointer */}
                            <div
                                className={`absolute left-1/2 w-3 h-3 bg-white/95 dark:bg-zinc-900/95 border-zinc-200 dark:border-zinc-800 rotate-45 ${placement === 'top'
                                    ? '-bottom-[5px] border-r border-b'
                                    : '-top-[5px] border-l border-t'
                                    }`}
                                style={{ transform: `translateX(calc(-50% - ${xOffset}px)) rotate(45deg)` }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {children}
        </div>
    );
};
