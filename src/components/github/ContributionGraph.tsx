'use client';

import { motion } from 'framer-motion';
import { getLevelColor, type ContributionDay } from '@/lib/utils/github';

interface ContributionGraphProps {
    weeks: ContributionDay[][];
}

export default function ContributionGraph({ weeks }: ContributionGraphProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10"
        >
            <div className="flex items-center gap-3 mb-4 border-b border-border pb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    01
                </span>
                <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
                    Contribution Graph
                </h2>
            </div>

            <div className="overflow-x-auto pb-2">
                <div className="flex gap-[2px] min-w-max">
                    {weeks.map((week, weekIdx) => (
                        <div key={weekIdx} className="flex flex-col gap-[2px]">
                            {week.map((day, dayIdx) => (
                                <div
                                    key={dayIdx}
                                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${getLevelColor(day.level)} transition-colors hover:ring-1 hover:ring-accent`}
                                    title={`${day.date}: ${day.count} contributions`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 mt-3 justify-end">
                <span className="text-[10px] font-mono text-muted-foreground">Less</span>
                {([0, 1, 2, 3, 4] as const).map((level) => (
                    <div
                        key={level}
                        className={`w-2.5 h-2.5 ${getLevelColor(level)}`}
                    />
                ))}
                <span className="text-[10px] font-mono text-muted-foreground">More</span>
            </div>
        </motion.section>
    );
}
