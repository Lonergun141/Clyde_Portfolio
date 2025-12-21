'use client';

import { mainTechnologies, creativeTools } from '@/lib/constants/constants';
import { cn } from '@/lib/utils';

export default function TechMarquee() {
    const allSkills = [...mainTechnologies, ...creativeTools];
    const topRow = allSkills.slice(0, Math.ceil(allSkills.length / 2));
    const bottomRow = allSkills.slice(Math.ceil(allSkills.length / 2));

    return (
        <section className="py-24 overflow-hidden bg-background">
            <MarqueeRow items={topRow} direction="left" speed="normal" />
            <MarqueeRow items={bottomRow} direction="right" speed="slow" className="mt-8" />
        </section>
    );
}

interface MarqueeRowProps {
    items: string[];
    direction?: 'left' | 'right';
    speed?: 'fast' | 'normal' | 'slow';
    className?: string;
}

const MarqueeRow = ({ items, direction = 'left', speed = 'normal', className }: MarqueeRowProps) => {
    const animationClass = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse';


    return (
        <div className={cn("relative flex w-full overflow-hidden select-none group", className)}>
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

            <div className={cn("flex min-w-full shrink-0 gap-8 items-center justify-around whitespace-nowrap py-4",
                animationClass, "group-hover:[animation-play-state:paused]")}
                style={{ animationDuration: speed === 'slow' ? '40s' : speed === 'fast' ? '15s' : '25s' }}
            >
                {items.map((item, idx) => (
                    <span key={idx} className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-muted-foreground/20 hover:text-foreground transition-colors duration-300 px-4">
                        {item}
                    </span>
                ))}
            </div>
            {/* Duplicated for seamless loop */}
            <div className={cn("flex min-w-full shrink-0 gap-8 items-center justify-around whitespace-nowrap py-4",
                animationClass, "group-hover:[animation-play-state:paused]")}
                style={{ animationDuration: speed === 'slow' ? '40s' : speed === 'fast' ? '15s' : '25s' }}
            >
                {items.map((item, idx) => (
                    <span key={`dup-${idx}`} className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-muted-foreground/20 hover:text-foreground transition-colors duration-300 px-4">
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}
