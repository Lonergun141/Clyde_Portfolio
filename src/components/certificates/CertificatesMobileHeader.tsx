'use client';

import { motion } from 'framer-motion';

interface MobileHeaderProps {
    totalCount: number;
}

export default function CertificatesMobileHeader({ totalCount }: MobileHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4"
        >
            <div className="flex items-center justify-between mb-2">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-[1px] bg-accent" />
                        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                            Registry
                        </span>
                    </div>
                    <h1 className="text-lg font-bold tracking-tight text-foreground">
                        Credentials
                    </h1>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-bold text-foreground">{totalCount}</span>
                    <p className="text-[9px] font-mono text-muted-foreground uppercase">Total</p>
                </div>
            </div>
        </motion.div>
    );
}
