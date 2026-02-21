'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Mouse positions
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring configuration for the outer ring
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over clickable elements
            if (
                target.tagName.toLowerCase() === 'button' ||
                target.tagName.toLowerCase() === 'a' ||
                target.closest('button') ||
                target.closest('a') ||
                window.getComputedStyle(target).cursor === 'pointer'
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [cursorX, cursorY, isVisible]);

    if (typeof window === 'undefined') return null;

    return (
        <>
            {/* Outer animated reticle */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[99998] mix-blend-difference hidden sm:flex items-center justify-center"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isVisible ? 1 : 0
                }}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 48 : 24,
                        height: isHovering ? 48 : 24,
                        borderColor: isHovering ? 'hsl(var(--accent))' : 'hsl(var(--foreground))',
                        borderWidth: isHovering ? '1px' : '2px',
                        rotate: isHovering ? 45 : 0
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="rounded-sm border flex items-center justify-center relative"
                >
                    {/* Corner accents for blueprint feel */}
                    <div className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t border-l border-current" />
                    <div className="absolute -top-1 -right-1 w-1.5 h-1.5 border-t border-r border-current" />
                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 border-b border-l border-current" />
                    <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b border-r border-current" />
                </motion.div>
            </motion.div>

            {/* Inner responsive dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference hidden sm:block w-1.5 h-1.5 bg-accent rounded-full"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isVisible ? 1 : 0
                }}
                animate={{
                    scale: isHovering ? 0 : 1
                }}
                transition={{ duration: 0.1 }}
            />
        </>
    );
}
