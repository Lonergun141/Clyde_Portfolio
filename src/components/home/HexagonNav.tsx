'use client';

import { motion } from 'framer-motion';
import { FolderKanban, User, Award, Github, Mail, LucideIcon } from 'lucide-react';
import { useNavigation } from '@/context/NavigationContext';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface HexagonProps {
    icon?: LucideIcon;
    panelId?: 'projects' | 'profile' | 'certificates' | 'github' | 'contact';
    isActive?: boolean;
    onHover?: () => void;
    delay?: number;
    size?: number;
}

function Hexagon({ icon: Icon, panelId, isActive, onHover, delay = 0, size = 100 }: HexagonProps) {
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

const navItems = [
    { icon: FolderKanban, label: 'Projects', description: 'Explore my portfolio of web applications, fullstack systems, and creative works.', panelId: 'projects' as const },
    { icon: User, label: 'Profile', description: 'Learn about my background, skills, and technical expertise.', panelId: 'profile' as const },
    { icon: Award, label: 'Credentials', description: 'View my certifications and professional achievements.', panelId: 'certificates' as const },
    { icon: Github, label: 'GitHub', description: 'See my contributions, commits, and open source work.', panelId: 'github' as const },
    { icon: Mail, label: 'Contact', description: 'Get in touch for collaborations, projects, or opportunities.', panelId: 'contact' as const },
];

export default function HexagonNav() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const activeItem = activeIndex !== null ? navItems[activeIndex] : null;

    const hexSize = 120;
    const hexHeight = hexSize * 1.1;
    const hexMargin = 4;
    const rowSpacing = hexSize * 0.82;
    const oddRowOffset = hexSize / 2 + hexMargin / 2;

    return (
        <div className="relative h-full flex items-center">
            <div className="relative" style={{ width: hexSize * 3 + hexMargin * 3, height: rowSpacing * 4 + hexHeight }}>

                <div
                    className="absolute flex"
                    style={{ top: 0, left: oddRowOffset }}
                >
                    <Hexagon size={hexSize} delay={0.1} />
                    <div style={{ marginLeft: hexMargin }}>
                        <Hexagon
                            icon={navItems[0].icon}
                            panelId={navItems[0].panelId}
                            isActive={activeIndex === 0}
                            onHover={() => setActiveIndex(0)}
                            size={hexSize}
                            delay={0.15}
                        />
                    </div>
                </div>

                <div
                    className="absolute flex"
                    style={{ top: rowSpacing, left: 0 }}
                >
                    <Hexagon
                        icon={navItems[1].icon}
                        panelId={navItems[1].panelId}
                        isActive={activeIndex === 1}
                        onHover={() => setActiveIndex(1)}
                        size={hexSize}
                        delay={0.2}
                    />
                    <div style={{ marginLeft: hexMargin }}>
                        <Hexagon
                            icon={navItems[2].icon}
                            panelId={navItems[2].panelId}
                            isActive={activeIndex === 2}
                            onHover={() => setActiveIndex(2)}
                            size={hexSize}
                            delay={0.25}
                        />
                    </div>
                    <div style={{ marginLeft: hexMargin }}>
                        <Hexagon size={hexSize} delay={0.3} />
                    </div>
                </div>

                <div
                    className="absolute flex"
                    style={{ top: rowSpacing * 2, left: oddRowOffset }}
                >
                    <Hexagon
                        icon={navItems[3].icon}
                        panelId={navItems[3].panelId}
                        isActive={activeIndex === 3}
                        onHover={() => setActiveIndex(3)}
                        size={hexSize}
                        delay={0.35}
                    />
                    <div style={{ marginLeft: hexMargin }}>
                        <Hexagon
                            icon={navItems[4].icon}
                            panelId={navItems[4].panelId}
                            isActive={activeIndex === 4}
                            onHover={() => setActiveIndex(4)}
                            size={hexSize}
                            delay={0.4}
                        />
                    </div>
                </div>

                <div
                    className="absolute flex"
                    style={{ top: rowSpacing * 3, left: 0 }}
                >
                    <Hexagon size={hexSize} delay={0.45} />
                    <div style={{ marginLeft: hexMargin }}>
                        <Hexagon size={hexSize} delay={0.5} />
                    </div>
                </div>
            </div>

            <div className="absolute right-full mr-8 w-64 top-1/2 -translate-y-1/2">
                {activeItem ? (
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-right"
                    >
                        <div className="flex items-center justify-end gap-3 mb-4">
                            <span className="text-sm font-medium text-accent uppercase tracking-widest">
                                {activeItem.label}
                            </span>
                            <div className="w-8 h-[1px] bg-accent" />
                        </div>
                        <motion.div
                            className="mb-6 flex justify-end"
                            key={activeItem.description}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className="text-sm text-muted-foreground leading-relaxed text-right max-w-[250px]">
                                {activeItem.description}
                            </p>
                        </motion.div>
                        <motion.button
                            whileHover={{ x: -4 }}
                            className="text-xs font-mono uppercase tracking-widest text-foreground hover:text-accent transition-colors flex items-center gap-2 ml-auto"
                        >
                            <span>←</span>
                            View Panel
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-muted-foreground text-right"
                    >
                        <p className="text-xs font-mono uppercase tracking-widest mb-2">
                            Navigate
                        </p>
                        <p className="text-sm">
                            Hover over a hexagon to explore
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
