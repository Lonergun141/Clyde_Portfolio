import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { greetings } from '@/lib/constants/constants';
import ParticleField from './interactive/ParticleField';

export default function HeroSection() {
    const containerRef = useRef(null);
    const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setCurrentGreetingIndex((prev) => (prev + 1) % greetings.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div ref={containerRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background px-6 md:px-12">
            {/* Mesh Gradient Background */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]" />
                <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-secondary/20 blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-primary/10 blur-[130px]" />
            </div>

            {/* Interactive Particle Animation (Replaces massive text) */}
            <ParticleField />

            <div className="max-w-[1920px] mx-auto w-full relative z-20 h-screen flex flex-col justify-between py-12 md:py-16 pointer-events-none">

                {/* Top Section: Intro & Location */}
                <div className="flex justify-between items-start pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xs text-sm md:text-base font-light text-muted-foreground/80 leading-relaxed"
                    >
                        <p className="font-bold text-foreground text-xl md:text-2xl">Clyde Gevero</p>
                        <p>Frontend Developer & UI/UX Designer.</p>
                        <p>Based in Bukidnon, Philippines.</p>
                    </motion.div>

                    {/* Greeting - Top Right */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-right"
                    >
                        <span className="text-xl md:text-2xl font-light tracking-widest uppercase text-muted-foreground/80">
                            {mounted ? greetings[currentGreetingIndex].text : greetings[0].text}
                        </span>
                    </motion.div>
                </div>

                {/* puhon na*/}
                <div className="flex-grow" />

                {/* Bottom Section: Pseudo-Nav & Scroll Indicator */}
                <div className="flex justify-between items-end pointer-events-auto">
                    {/* Pseudo Bottom Nav */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="hidden md:flex gap-12 text-sm font-medium tracking-widest uppercase text-muted-foreground"
                    >
                        <Link href="/" className="text-foreground hover:text-primary transition-colors cursor-pointer">Home</Link>
                        <Link href="/projects" className="hover:text-primary transition-colors cursor-pointer">Projects</Link>
                        <Link href="/profile" className="hover:text-primary transition-colors cursor-pointer">About</Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex flex-col items-center gap-2 text-xs font-mono text-muted-foreground/50 uppercase tracking-widest"
                    >
                        <motion.div
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ArrowDown size={14} />
                        </motion.div>
                        <span>Scroll</span>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}
