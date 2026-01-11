'use client';

import { motion } from 'framer-motion';
import { useNavigation } from '@/context/NavigationContext';
import { cn } from '@/lib/utils';
import { navItems } from './constants';

export default function MobileNav() {
    const { activePanel, openPanel } = useNavigation();

    return (
        <div className="fixed bottom-6 inset-x-4 h-16 bg-background/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg flex items-center justify-around px-2 z-50">
            {navItems.map((item) => {
                const isActive = activePanel === item.panelId;
                const Icon = item.icon;

                return (
                    <button
                        key={item.panelId}
                        onClick={() => openPanel(item.panelId)}
                        className={cn(
                            "relative flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-300",
                            isActive ? "bg-accent/10" : "hover:bg-accent/5"
                        )}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="mobile-nav-active"
                                className="absolute inset-0 bg-accent/10 rounded-xl"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <Icon
                            size={24}
                            className={cn(
                                "z-10 transition-colors duration-200",
                                isActive ? "text-accent" : "text-muted-foreground"
                            )}
                        />
                        <span className="sr-only">{item.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
