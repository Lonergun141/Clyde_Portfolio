'use client';

import { motion } from 'framer-motion';
import { Award, Calendar, Building2 } from 'lucide-react';

interface CertificatesSummaryProps {
    totalCount: number;
    latestYear: string;
    uniqueIssuers: number;
}

export default function CertificatesSummary({
    totalCount,
    latestYear,
    uniqueIssuers
}: CertificatesSummaryProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 p-12 border-r border-border flex flex-col"
        >
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-[1px] bg-accent" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
                        Registry
                    </span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                    Credentials
                </h1>
                <p className="text-sm text-muted-foreground font-mono">
                    Certifications & Academic Records
                </p>
            </div>

            {/* Stats */}
            <div className="space-y-4 mb-auto">
                <div className="flex items-center justify-between py-3 border-b border-border">
                    <div className="flex items-center gap-3">
                        <Award size={14} className="text-muted-foreground" />
                        <span className="text-sm font-mono text-muted-foreground">Total Credentials</span>
                    </div>
                    <span className="text-xl font-bold text-foreground">{totalCount}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                    <div className="flex items-center gap-3">
                        <Calendar size={14} className="text-muted-foreground" />
                        <span className="text-sm font-mono text-muted-foreground">Latest Year</span>
                    </div>
                    <span className="text-xl font-bold text-foreground">{latestYear}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                    <div className="flex items-center gap-3">
                        <Building2 size={14} className="text-muted-foreground" />
                        <span className="text-sm font-mono text-muted-foreground">Issuers</span>
                    </div>
                    <span className="text-xl font-bold text-foreground">{uniqueIssuers}</span>
                </div>
            </div>

            {/* Note */}
            <div className="pt-8 border-t border-border mt-8">
                <p className="text-xs text-muted-foreground leading-relaxed font-mono">
                    Click any credential to view verification document.
                </p>
            </div>
        </motion.div>
    );
}
