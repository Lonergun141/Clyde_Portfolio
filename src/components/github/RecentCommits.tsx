'use client';

import { motion } from 'framer-motion';

interface Commit {
    sha: string;
    message: string;
    repo: string;
    date: string;
    url: string;
}

interface RecentCommitsProps {
    commits: Commit[];
}

export default function RecentCommits({ commits }: RecentCommitsProps) {
    return (
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
                    <div
                        key={`${commit.sha}-${index}`}
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
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
