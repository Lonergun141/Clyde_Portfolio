'use client';

import { motion } from 'framer-motion';
import { TextReveal } from '@/components/ui/TextReveal';
import { TextGenerateEffect } from '@/components/ui/TextGenerateEffect';
/**
 * Left side identity section with name, role, and tagline
 */
export default function IdentitySection() {
    return (
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-8 lg:py-0">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="max-w-lg"
            >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.9] text-foreground mb-6">
                    Clyde H. Gevero
                </h1>

                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-[1px] bg-accent" />
                    <TextGenerateEffect
                        words="Fullstack Developer & UI/UX Designer"
                        className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground"
                        duration={0.8}
                        staggerDelay={0.05}
                    />
                </div>

                <div className="mb-8 max-w-md">
                    <div className="mb-8 max-w-md">
                        <TextGenerateEffect
                            words="My only ambition has been to engrave my name at the feet of great men and in the service of grand ideas"
                            className="text-sm sm:text-base font-normal text-muted-foreground leading-relaxed"
                            duration={0.7}
                        />
                    </div>
                </div>



                {/* Text Reveal Easter Egg */}
                <div className="mt-8 pt-6 border-t border-border/30 relative z-30">
                    <TextReveal
                        text="You know the business"
                        revealText="I know the chemistry"
                    />
                </div>
            </motion.div>
        </div>
    );
}
