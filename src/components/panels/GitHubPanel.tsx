'use client';

import WorkspacePanel from '@/components/spatial/WorkspacePanel';
import { motion } from 'framer-motion';
import { useGitHub } from '@/hooks/useGitHub';
import { Github, GitCommit, Code2, Calendar, ExternalLink, Loader2 } from 'lucide-react';

export default function GitHubPanel() {
    const { contributions, commits, languages, totalContributions, isLoading, error } = useGitHub();

    // Generate weeks for the heatmap (52 weeks x 7 days)
    const generateWeeks = () => {
        const weeks: typeof contributions[] = [];
        for (let i = 0; i < 52; i++) {
            weeks.push(contributions.slice(i * 7, (i + 1) * 7));
        }
        return weeks;
    };

    const weeks = generateWeeks();

    const getLevelColor = (level: 0 | 1 | 2 | 3 | 4) => {
        const colors = {
            0: 'bg-muted/30',
            1: 'bg-accent/30',
            2: 'bg-accent/50',
            3: 'bg-accent/70',
            4: 'bg-accent',
        };
        return colors[level];
    };

    return (
        <WorkspacePanel panelId="github" title="GitHub Activity">
            <div className="h-full">

                {/* Asymmetric Split Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 h-full">

                    {/* Left Column: Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-4 p-4 sm:p-6 md:p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-border flex flex-col"
                    >
                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-6 h-[1px] bg-accent" />
                                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
                                    Activity
                                </span>
                            </div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2">
                                GitHub
                            </h1>
                            <p className="text-sm text-muted-foreground font-mono">
                                Live Contribution Data
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="space-y-4 mb-auto">
                            <div className="flex items-center justify-between py-3 border-b border-border">
                                <div className="flex items-center gap-3">
                                    <Calendar size={14} className="text-muted-foreground" />
                                    <span className="text-xs sm:text-sm font-mono text-muted-foreground">This Year</span>
                                </div>
                                <span className="text-xl font-bold text-foreground">
                                    {isLoading ? '...' : totalContributions}
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-border">
                                <div className="flex items-center gap-3">
                                    <GitCommit size={14} className="text-muted-foreground" />
                                    <span className="text-xs sm:text-sm font-mono text-muted-foreground">Recent Commits</span>
                                </div>
                                <span className="text-xl font-bold text-foreground">
                                    {isLoading ? '...' : commits.length}
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-border">
                                <div className="flex items-center gap-3">
                                    <Code2 size={14} className="text-muted-foreground" />
                                    <span className="text-xs sm:text-sm font-mono text-muted-foreground">Languages</span>
                                </div>
                                <span className="text-xl font-bold text-foreground">
                                    {isLoading ? '...' : languages.length}
                                </span>
                            </div>
                        </div>

                        {/* GitHub Link */}
                        <div className="pt-8 border-t border-border mt-8">
                            <a
                                href="https://github.com/Lonergun141"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-accent hover:text-primary transition-colors font-mono"
                            >
                                <Github size={14} />
                                @Lonergun141
                                <ExternalLink size={10} className="opacity-50" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Column: Activity Details */}
                    <div className="lg:col-span-8 p-4 sm:p-6 md:p-8 lg:p-12 overflow-y-auto">

                        {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <Loader2 size={24} className="animate-spin text-muted-foreground" />
                            </div>
                        ) : error ? (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-sm text-muted-foreground font-mono">{error}</p>
                            </div>
                        ) : (
                            <>
                                {/* Contribution Heatmap */}
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
                                        {[0, 1, 2, 3, 4].map((level) => (
                                            <div
                                                key={level}
                                                className={`w-2.5 h-2.5 ${getLevelColor(level as 0 | 1 | 2 | 3 | 4)}`}
                                            />
                                        ))}
                                        <span className="text-[10px] font-mono text-muted-foreground">More</span>
                                    </div>
                                </motion.section>

                                {/* Languages */}
                                <motion.section
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="mb-10"
                                >
                                    <div className="flex items-center gap-3 mb-4 border-b border-border pb-3">
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                                            02
                                        </span>
                                        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
                                            Languages
                                        </h2>
                                    </div>

                                    <div className="space-y-3">
                                        {languages.map((lang) => (
                                            <div key={lang.name} className="flex items-center gap-3">
                                                <div
                                                    className="w-3 h-3 flex-shrink-0"
                                                    style={{ backgroundColor: lang.color }}
                                                />
                                                <span className="text-sm font-mono text-foreground w-24">{lang.name}</span>
                                                <div className="flex-1 h-2 bg-muted/30 overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${lang.percentage}%` }}
                                                        transition={{ duration: 0.8, delay: 0.5 }}
                                                        className="h-full"
                                                        style={{ backgroundColor: lang.color }}
                                                    />
                                                </div>
                                                <span className="text-xs font-mono text-muted-foreground w-10 text-right">
                                                    {lang.percentage}%
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.section>

                                {/* Recent Commits */}
                                <motion.section
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    <div className="flex items-center gap-3 mb-4 border-b border-border pb-3">
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                                            03
                                        </span>
                                        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
                                            Recent Commits
                                        </h2>
                                        <span className="text-[10px] font-mono text-muted-foreground ml-auto">
                                            [{String(commits.length).padStart(2, '0')}]
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        {commits.map((commit, index) => (
                                            <a
                                                key={`${commit.sha}-${index}`}
                                                href={commit.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-start gap-3 p-3 border border-border hover:border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                                            >
                                                <code className="text-[10px] font-mono text-accent group-hover:text-accent-foreground/80 bg-accent/10 group-hover:bg-accent-foreground/10 px-1.5 py-0.5">
                                                    {commit.sha}
                                                </code>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-foreground group-hover:text-accent-foreground truncate">
                                                        {commit.message}
                                                    </p>
                                                    <p className="text-[10px] font-mono text-muted-foreground group-hover:text-accent-foreground/70 mt-1">
                                                        {commit.repo} • {commit.date}
                                                    </p>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </motion.section>
                            </>
                        )}

                    </div>

                </div>

            </div>
        </WorkspacePanel>
    );
}
