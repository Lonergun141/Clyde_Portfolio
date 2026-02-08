'use client';

import { motion } from 'framer-motion';
import { TextGenerateEffect } from '@/components/ui/TextGenerateEffect';
import { TypewriterEffect } from '@/components/ui/TypewriterEffect';
import DecryptedText from '@/components/ui/DecryptedText';
import { useState, useEffect } from 'react';

/**
 * Left side identity section with name, role, and tagline
 */
export default function IdentitySection() {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-8 lg:py-0 relative z-20">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="max-w-xl w-full"
            >
                <div className="flex gap-4 sm:gap-6">
                    {/* Technical Bracket / Status Bar */}
                    <div className="hidden sm:flex flex-col items-center shrink-0 select-none">
                        <div className="w-2 h-2 border-t-2 border-l-2 border-accent/80" />
                        <div className="w-px flex-1 bg-gradient-to-b from-accent/80 via-accent/20 to-transparent my-1" />
                        <div className="[writing-mode:vertical-rl] text-[9px] font-mono text-accent/60 tracking-widest py-2 uppercase rotate-180">
                            SYS.ID.V3.2.0
                        </div>
                        <div className="w-px flex-1 bg-gradient-to-b from-transparent via-accent/20 to-accent/80 my-1" />
                        <div className="w-2 h-2 border-b-2 border-l-2 border-accent/80" />
                    </div>

                    <div className="flex flex-col space-y-6 pt-2 w-full">
                        {/* Header Group */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 text-xs font-mono text-accent/80 tracking-widest uppercase mb-1">
                                <span className="w-2 h-2 bg-accent/80 rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--accent),0.6)]" />
                                <span>The developer</span>
                            </div>

                            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-foreground relative">
                                <DecryptedText
                                    text="Clyde H. Gevero"
                                    animateOn="view"
                                    speed={80}
                                    maxIterations={20}
                                    sequential={true}
                                    revealDirection="start"
                                    className="text-foreground"
                                    encryptedClassName="opacity-30"
                                />
                            </h1>

                            <div className="text-sm sm:text-base font-mono tracking-[0.1em] text-muted-foreground uppercase flex flex-col sm:flex-row sm:items-center gap-2">
                                <span className="text-foreground font-semibold">Fullstack Developer</span>
                                <span className="hidden sm:inline text-accent/50">//</span>
                                <span className="text-[#D9381E] font-medium">UI/UX Designer</span>
                            </div>
                        </div>

                        {/* Tech Stack Terminal */}
                        <div className="relative group max-w-md">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/10 to-transparent rounded-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                            <div className="relative font-mono text-sm text-accent/90 bg-background/50 border border-accent/20 p-4 rounded-md backdrop-blur-sm overflow-hidden">
                                {/* Scanline effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none animate-scan" style={{ backgroundSize: '100% 4px' }} />

                                <div className="flex items-center gap-2 mb-3 opacity-50 text-[10px] border-b border-accent/10 pb-2 select-none">
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                                    </div>
                                    <span className="ml-auto">Terminal</span>
                                </div>
                                <div className="flex items-center min-h-[1.5em]">
                                    <span className="mr-3 text-accent select-none">$</span>
                                    <TypewriterEffect
                                        words={[
                                            "Kamusta!",
                                            "I'm a Fullstack Developer",
                                            "I'm a UI/UX Designer",
                                            "I'm a Systems Designer",
                                            "Let's work together."
                                        ]}
                                        typingSpeed={60}
                                        deletingSpeed={30}
                                        pauseTime={1000}
                                        className="font-medium text-xs sm:text-sm"
                                        cursorClassName="bg-accent h-[1.2em] w-[8px]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Quote */}
                        <div className="pl-4 border-l-2 border-accent/20 max-w-md my-2">
                            <TextGenerateEffect
                                words="My only ambition has been to engrave my name at the feet of great men and in the service of grand ideas."
                                className="text-sm sm:text-base font-normal text-muted-foreground leading-relaxed italic"
                                duration={0.5}
                            />
                        </div>

                        {/* Functional Metadata HUD */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-dashed border-border/40 pt-4 mt-2 select-none">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-mono text-accent/60 uppercase tracking-widest mb-1">Coordinates</span>
                                <span className="text-[10px] font-mono text-muted-foreground hover:text-accent transition-colors cursor-crosshair">8.361° N, 124.868° E</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-mono text-accent/60 uppercase tracking-widest mb-1">Status</span>
                                <span className="text-[10px] font-mono text-green-500/80 flex items-center gap-1.5 uppercase font-semibold">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                                    </span>
                                    Available
                                </span>
                            </div>
                            <div className="hidden sm:flex flex-col">
                                <span className="text-[9px] font-mono text-accent/60 uppercase tracking-widest mb-1">System Time</span>
                                <span className="text-[10px] font-mono text-muted-foreground">{currentTime}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Background enhancement */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--accent),0.03),transparent_70%)] pointer-events-none" />
        </div>
    );
}
