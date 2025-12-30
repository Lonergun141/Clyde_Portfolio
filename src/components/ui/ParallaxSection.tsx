'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxSectionProps {
    children: ReactNode;
    offset?: number;
    direction?: 'up' | 'down';
    scale?: boolean;
    opacity?: boolean;
}

export default function ParallaxSection({
    children,
    offset = 50,
    direction = 'up',
    scale = false,
    opacity = true,
}: ParallaxSectionProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    // Parallax Y movement
    const yRange = direction === 'up' ? [offset, -offset] : [-offset, offset];
    const y = useTransform(scrollYProgress, [0, 1], yRange);

    // FIX: Call hooks unconditionally
    const scaleMotionValue = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
    const opacityMotionValue = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

    // Apply logic conditionally AFTER the hooks run
    const scaleValue = scale ? scaleMotionValue : 1;
    const opacityValue = opacity ? opacityMotionValue : 1;

    return (
        <motion.div
            ref={ref}
            style={{
                y,
                scale: scaleValue,
                opacity: opacityValue,
            }}
        >
            {children}
        </motion.div>
    );
}