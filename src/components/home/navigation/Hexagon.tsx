'use client';

import { motion } from 'framer-motion';
import { useNavigation } from '@/context/NavigationContext';
import { cn } from '@/lib/utils';
import { HexagonProps } from './types';

export default function Hexagon({
    icon: Icon,
    panelId,
    isActive,
    onHover,
    delay = 0,
    size = 100,
    label,
    gridX = 0,
    gridY = 0,
}: HexagonProps) {
    const { openPanel } = useNavigation();
    const hexMargin = 1;

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay }}
            whileHover={panelId ? { scale: 1.05 } : undefined}
            whileTap={panelId ? { scale: 0.95 } : undefined}
            onClick={() => panelId && openPanel(panelId)}
            onMouseEnter={onHover}
            disabled={!panelId}
            style={{
                width: size,
                height: size * 1.1,
                ['--hexagon-margin' as string]: `${hexMargin}px`,
                ['--hex-x' as string]: `${gridX}px`,
                ['--hex-y' as string]: `${gridY}px`,
            }}
            className={cn(
                'relative group',
                panelId ? 'cursor-pointer' : 'cursor-default',
                // Hexagon shape clip-path
                '[clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]',

                // Spotlight Glow Container (before pseudo-element)
                "before:content-[''] before:absolute before:inset-0 before:transition-all before:duration-300",
                // Base background
                'before:bg-border/20',

                // Active/Hover States
                isActive
                    ? 'before:bg-accent/40 drop-shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]'
                    : panelId
                        ? 'before:bg-border/60 hover:before:bg-accent/40 hover:drop-shadow-[0_0_10px_rgba(var(--accent-rgb),0.3)]'
                        : '',

                // Inner content background (after pseudo-element)
                "after:content-[''] after:absolute after:inset-[calc(var(--hexagon-margin)+2px)]",
                'after:[clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]',
                'after:transition-colors after:duration-300',
                isActive
                    ? 'after:bg-accent'
                    : 'after:bg-background/90 hover:after:bg-accent/10',
            )}
        >
            {/* We need to apply the spotlight to the 'before' element (the border).
                Since we can't easily style pseudo-elements with inline styles for dynamic gradients,
                we can use a separate div for the border glow if needed, or rely on the radial gradient above overlaying.

                Actually, let's refine:
                The 'before' element handles the border color.
                We can add a motion.div or div BEHIND everything that has the spotlight gradient, and mask it to the hexagon shape.
            */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                    background: `radial-gradient(250px circle at calc(var(--mouse-x) - var(--hex-x)) calc(var(--mouse-y) - var(--hex-y)), rgba(var(--accent-rgb), 0.3), transparent 70%)`,
                    opacity: isActive ? 0 : 1
                }}
            />

            {/* Icon - Fades out on hover */}
            {Icon && (
                <div className={cn(
                    "absolute inset-0 flex items-center justify-center z-10 transition-all duration-300 transform",
                    panelId && "group-hover:opacity-0 group-hover:scale-75",
                    isActive ? 'text-accent-foreground' : 'text-muted-foreground'
                )}>
                    <Icon size={size * 0.28} />
                </div>
            )}

            {/* Label - Fades in on hover */}
            {label && panelId && (
                <div className={cn(
                    "absolute inset-0 flex items-center justify-center z-10 transition-all duration-300 transform opacity-0 scale-75",
                    "group-hover:opacity-100 group-hover:scale-100",
                    isActive ? 'text-accent-foreground' : 'text-foreground'
                )}>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-center px-2 leading-tight">
                        {label}
                    </span>
                </div>
            )}
        </motion.button>
    );
}
