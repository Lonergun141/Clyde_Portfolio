'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from './constants';
import Hexagon from './Hexagon';

export default function DesktopHexagonGrid() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const activeItem = activeIndex !== null ? navItems[activeIndex] : null;

    const hexSize = 150;
    const hexHeight = hexSize * 1.1;
    const hexMargin = 4;
    const rowSpacing = hexSize * 0.82;
    const oddRowOffset = hexSize / 2 + hexMargin / 2;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <div className="relative h-full flex items-center">
            <div
                className="relative group/grid"
                style={{ width: hexSize * 3 + hexMargin * 3, height: rowSpacing * 4 + hexHeight }}
                onMouseMove={handleMouseMove}
            >

                <div
                    className="absolute flex"
                    style={{ top: 0, left: oddRowOffset }}
                >
                    <Hexagon size={hexSize} delay={0.1} gridX={oddRowOffset} gridY={0} />
                    <div style={{ marginLeft: hexMargin }}>
                        <Hexagon
                            icon={navItems[0].icon}
                            label={navItems[0].label}
                            panelId={navItems[0].panelId}
                            isActive={activeIndex === 0}
                            onHover={() => setActiveIndex(0)}
                            size={hexSize}
                            delay={0.15}
                            gridX={oddRowOffset + hexSize + hexMargin}
                            gridY={0}
                        />
                    </div>
                </div>

                <div
                    className="absolute flex"
                    style={{ top: rowSpacing, left: 0 }}
                >
                    <Hexagon
                        icon={navItems[1].icon}
                        label={navItems[1].label}
                        panelId={navItems[1].panelId}
                        isActive={activeIndex === 1}
                        onHover={() => setActiveIndex(1)}
                        size={hexSize}
                        delay={0.2}
                        gridX={0}
                        gridY={rowSpacing}
                    />
                    <div style={{ marginLeft: hexMargin }}>
                        <Hexagon
                            icon={navItems[2].icon}
                            label={navItems[2].label}
                            panelId={navItems[2].panelId}
                            isActive={activeIndex === 2}
                            onHover={() => setActiveIndex(2)}
                            size={hexSize}
                            delay={0.25}
                            gridX={hexSize + hexMargin}
                            gridY={rowSpacing}
                        />
                    </div>
                    <div style={{ marginLeft: hexMargin }}>
                        <Hexagon
                            icon={navItems[5].icon}
                            label={navItems[5].label}
                            panelId={navItems[5].panelId}
                            isActive={activeIndex === 5}
                            onHover={() => setActiveIndex(5)}
                            size={hexSize}
                            delay={0.3}
                            gridX={(hexSize + hexMargin) * 2}
                            gridY={rowSpacing}
                        />
                    </div>
                </div>

                <div
                    className="absolute flex"
                    style={{ top: rowSpacing * 2, left: oddRowOffset }}
                >
                    <Hexagon
                        icon={navItems[3].icon}
                        label={navItems[3].label}
                        panelId={navItems[3].panelId}
                        isActive={activeIndex === 3}
                        onHover={() => setActiveIndex(3)}
                        size={hexSize}
                        delay={0.35}
                        gridX={oddRowOffset}
                        gridY={rowSpacing * 2}
                    />
                    <div style={{ marginLeft: hexMargin }}>
                        <Hexagon
                            icon={navItems[4].icon}
                            label={navItems[4].label}
                            panelId={navItems[4].panelId}
                            isActive={activeIndex === 4}
                            onHover={() => setActiveIndex(4)}
                            size={hexSize}
                            delay={0.4}
                            gridX={oddRowOffset + hexSize + hexMargin}
                            gridY={rowSpacing * 2}
                        />
                    </div>
                </div>

                <div
                    className="absolute flex"
                    style={{ top: rowSpacing * 3, left: 0 }}
                >
                    <Hexagon size={hexSize} delay={0.45} gridX={0} gridY={rowSpacing * 3} />
                    <div style={{ marginLeft: hexMargin }}>
                        <Hexagon size={hexSize} delay={0.5} gridX={hexSize + hexMargin} gridY={rowSpacing * 3} />
                    </div>
                </div>
            </div>

            <div className="absolute right-full mr-8 w-64 top-1/2 -translate-y-1/2">
                <AnimatePresence mode="wait">
                    {activeItem ? (
                        <motion.div
                            key={activeItem.panelId}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
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
                                initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
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
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
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
                </AnimatePresence>
            </div>
        </div>
    );
}
