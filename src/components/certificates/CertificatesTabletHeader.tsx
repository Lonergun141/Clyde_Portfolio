'use client';

import { motion } from 'framer-motion';
import { Award, Calendar, Building2 } from 'lucide-react';

interface TabletHeaderProps {
    totalCount: number;
    latestYear: string;
    uniqueIssuers: number;
}

export default function CertificatesTabletHeader({
    totalCount,
    latestYear,
    uniqueIssuers
}: TabletHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border-b border-border p-6"
        >
            <div className="flex items-end justify-between mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-[1px] bg-accent" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                            Registry
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Credentials
                    </h1>
                    <p className="text-xs text-muted-foreground font-mono mt-1">
                        Certifications & Academic Records
                    </p>
                </div>

                {/* Inline Stats */}
                <div className="flex items-center gap-6">
                    <div className="text-center px-4 border-l border-border">
                        <div className="flex items-center gap-2 justify-center mb-1">
                            <Award size={12} className="text-muted-foreground" />
                            <span className="text-xl font-bold text-foreground">{totalCount}</span>
                        </div>
                        <span className="text-[9px] font-mono text-muted-foreground uppercase">Total</span>
                    </div>
                    <div className="text-center px-4 border-l border-border">
                        <div className="flex items-center gap-2 justify-center mb-1">
                            <Calendar size={12} className="text-muted-foreground" />
                            <span className="text-xl font-bold text-foreground">{latestYear}</span>
                        </div>
                        <span className="text-[9px] font-mono text-muted-foreground uppercase">Latest</span>
                    </div>
                    <div className="text-center px-4 border-l border-border">
                        <div className="flex items-center gap-2 justify-center mb-1">
                            <Building2 size={12} className="text-muted-foreground" />
                            <span className="text-xl font-bold text-foreground">{uniqueIssuers}</span>
                        </div>
                        <span className="text-[9px] font-mono text-muted-foreground uppercase">Issuers</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
