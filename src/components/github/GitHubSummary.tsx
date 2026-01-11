'use client';

import { motion } from 'framer-motion';
import { Github, GitCommit, Code2, Calendar, ExternalLink } from 'lucide-react';

interface GitHubSummaryProps {
    totalContributions: number;
    commitsCount: number;
    languagesCount: number;
    isLoading: boolean;
}

export default function GitHubSummary({
    totalContributions,
    commitsCount,
    languagesCount,
    isLoading
}: GitHubSummaryProps) {
    return (
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
                        {isLoading ? '...' : commitsCount}
                    </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                    <div className="flex items-center gap-3">
                        <Code2 size={14} className="text-muted-foreground" />
                        <span className="text-xs sm:text-sm font-mono text-muted-foreground">Languages</span>
                    </div>
                    <span className="text-xl font-bold text-foreground">
                        {isLoading ? '...' : languagesCount}
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
    );
}
