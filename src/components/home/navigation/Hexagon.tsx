'use client';

import { motion } from 'framer-motion';
import { useNavigation } from '@/context/NavigationContext';
import { cn } from '@/lib/utils';
import { HexagonProps } from './types';

export default function Hexagon({ icon: Icon, panelId, isActive, onHover, delay = 0, size = 100 }: HexagonProps) {
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
            }}
            className={cn(
                'relative',
                '[clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]',
                "before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:transition-all before:duration-300",
                isActive
                    ? 'before:bg-accent'
                    : 'before:bg-border hover:before:bg-accent/50',
                "after:content-[''] after:absolute after:inset-[var(--hexagon-margin)]",
                'after:[clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]',
                'after:transition-all after:duration-300',
                isActive
                    ? 'after:bg-accent'
                    : 'after:bg-background hover:after:bg-accent/10',
                panelId ? 'cursor-pointer' : 'cursor-default',
            )}
        >
            {Icon && (
                <Icon
                    size={size * 0.28}
                    className={cn(
                        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-colors duration-300',
                        isActive ? 'text-accent-foreground' : 'text-muted-foreground',
                        panelId && 'group-hover:text-accent'
                    )}
                />
            )}
        </motion.button>
    );
}
