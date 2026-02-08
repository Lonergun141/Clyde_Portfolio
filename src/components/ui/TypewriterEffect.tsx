'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TypewriterEffectProps {
    words: string[];
    className?: string;
    cursorClassName?: string;
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseTime?: number;
}

export function TypewriterEffect({
    words,
    className,
    cursorClassName,
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseTime = 1500,
}: TypewriterEffectProps) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (isDeleting) {
            if (currentText === '') {
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
            } else {
                timeout = setTimeout(() => {
                    setCurrentText(words[currentWordIndex].substring(0, currentText.length - 1));
                }, deletingSpeed);
            }
        } else {
            if (currentText === words[currentWordIndex]) {
                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, pauseTime);
            } else {
                timeout = setTimeout(() => {
                    setCurrentText(words[currentWordIndex].substring(0, currentText.length + 1));
                }, typingSpeed);
            }
        }

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

    return (
        <div className={cn("inline-flex items-center", className)}>
            <span>{currentText}</span>
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className={cn("inline-block w-[2px] h-[1.2em] bg-current ml-1 align-middle", cursorClassName)}
            />
        </div>
    );
}
