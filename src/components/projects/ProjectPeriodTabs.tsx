import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PeriodTab {
    id: string;
    label: string;
    icon: LucideIcon;
    count: number;
    isPrimary?: boolean;
}

interface ProjectPeriodTabsProps {
    tabs: PeriodTab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

const ProjectPeriodTabs = ({ tabs, activeTab, onTabChange }: ProjectPeriodTabsProps) => {
    return (
        <div className="border-b border-border/20 mb-8">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <motion.button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`
                                relative flex items-center gap-2 px-4 sm:px-6 py-3
                                text-[10px] sm:text-xs font-mono uppercase tracking-[0.15em] whitespace-nowrap
                                transition-all duration-200 group
                                ${isActive
                                    ? 'text-[#FF6B35]'
                                    : 'text-muted-foreground hover:text-foreground'
                                }
                            `}
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                        >
                            {/* Background glow for active */}
                            {isActive && (
                                <motion.div
                                    layoutId="tabBackground"
                                    className="absolute inset-0 bg-[#FF6B35]/5"
                                    initial={false}
                                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                                />
                            )}

                            {/* Content */}
                            <div className="relative flex items-center gap-2">
                                <Icon
                                    size={12}
                                    className={`${isActive ? 'text-[#FF6B35]' : 'text-muted-foreground group-hover:text-foreground'} transition-colors`}
                                />

                                {/* Full label on desktop, short on mobile */}
                                <span className="hidden sm:inline">
                                    {tab.label}
                                </span>
                                <span className="inline sm:hidden">
                                    {tab.label.split(' ')[0]}
                                </span>

                                {/* Count badge */}
                                <span className={`
                                    text-[9px] sm:text-[10px] font-mono
                                    ${isActive
                                        ? 'text-[#FF6B35]/70'
                                        : 'text-muted-foreground/50 group-hover:text-muted-foreground'
                                    }
                                    transition-colors
                                `}>
                                    [{tab.count.toString().padStart(2, '0')}]
                                </span>
                            </div>

                            {/* Active indicator - bottom border */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6B35]"
                                    initial={false}
                                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                                />
                            )}

                            {/* Hover indicator */}
                            {!isActive && (
                                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border/0 group-hover:bg-border/50 transition-colors" />
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};

export default ProjectPeriodTabs;
