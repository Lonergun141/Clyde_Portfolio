'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface Props {
    children: React.ReactNode;
    width?: 'fit-content' | '100%';
    delay?: number;
}

export const Reveal = ({ children, width = '100%', delay = 0.25 }: Props) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start('visible');
        }
    }, [isInView, mainControls]);

    return (
        <div ref={ref} style={{ position: 'relative', width, overflow: 'hidden' }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.8, delay: delay, ease: [0.33, 1, 0.68, 1] }} // smooth ease
            >
                {children}
            </motion.div>
        </div>
    );
};
