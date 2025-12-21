'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { greetings } from '@/lib/constants/constants';

export default function HeroSection() {
    const containerRef = useRef(null);
    const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentGreetingIndex((prev) => (prev + 1) % greetings.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div ref={containerRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background px-6 md:px-12">
            <div className="max-w-[1920px] mx-auto w-full relative z-10 pt-20">

                {/* Greeting - Top Right */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute top-24 md:top-28 right-6 md:right-12 flex items-center gap-4">

                    <span className="text-2xl md:text-3xl lg:text-4xl font-light tracking-widest uppercase text-muted-foreground/80">
                        {greetings[currentGreetingIndex].text}
                    </span>
                </motion.div>

                {/* Massive Typography & Spotlight Image */}
                <div className="relative">
                    <div className="flex flex-col relative z-20 mix-blend-difference">
                        <motion.h1
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[15vw] leading-[0.8] font-bold tracking-tighter text-foreground">
                            CLYDE
                        </motion.h1>
                        <motion.h1
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[15vw] leading-[0.8] font-bold tracking-tighter text-foreground ml-[5vw]">
                            GEVERO
                        </motion.h1>
                    </div>

                    {/* Spotlight Image - Positioned absolutely to interact with text */}
                    <motion.div
                        style={{ y: y1 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-1/2 left-[45%] -translate-y-[40%] w-[30vw] md:w-[25vw] aspect-[3/4] z-10 hidden md:block">
                        <div className="relative w-full h-full overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
                            <Image
                                src="/fullscreen_grad.jpeg"
                                alt="Clyde Gevero Spotlight"
                                fill
                                className="object-cover object-center"
                                priority
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-30" />
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Info */}
                <div className="flex flex-col md:flex-row justify-between items-end mt-24 md:mt-32 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-md space-y-6">
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-muted-foreground">
                            Crafting digital experiences through thoughtful design and clean code.
                            <br />
                            <span className="text-foreground font-medium">Mobile</span>, <span className="text-foreground font-medium">Web</span>, & <span className="text-foreground font-medium">UI/UX</span>.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="/projects">
                                <button className="group relative px-6 py-3 bg-transparent border border-border rounded-full text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300">
                                    View Projects
                                </button>
                            </Link>
                        </div>

                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex items-center gap-4 text-xs font-mono text-muted-foreground/50 uppercase tracking-widest">
                        <span>Scroll</span>
                        <motion.div
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                            <ArrowDown size={14} />
                        </motion.div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}
