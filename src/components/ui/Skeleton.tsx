'use client';

import { motion } from 'framer-motion';

export function PanelSkeleton() {
    return (
        <div className="h-full animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
                {/* Left Column Skeleton */}
                <div className="lg:col-span-4 p-4 sm:p-6 md:p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-border flex flex-col">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-6 h-[1px] bg-muted" />
                            <div className="h-3 w-16 bg-muted rounded" />
                        </div>
                        <div className="h-8 w-48 bg-muted rounded mb-2" />
                        <div className="h-4 w-32 bg-muted rounded" />
                    </div>

                    {/* Stats */}
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between py-3 border-b border-border">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 bg-muted rounded" />
                                    <div className="h-4 w-24 bg-muted rounded" />
                                </div>
                                <div className="h-6 w-8 bg-muted rounded" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column Skeleton */}
                <div className="lg:col-span-8 p-4 sm:p-6 md:p-8 lg:p-12">
                    {/* Section Header */}
                    <div className="flex items-center gap-3 mb-6 border-b border-border pb-3">
                        <div className="h-3 w-8 bg-muted rounded" />
                        <div className="h-4 w-32 bg-muted rounded" />
                    </div>

                    {/* Grid Items */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-16 bg-muted/30 border border-border rounded" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function CardSkeleton() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-border p-4 animate-pulse"
        >
            <div className="w-full h-48 bg-muted/30 mb-4" />
            <div className="h-5 w-3/4 bg-muted rounded mb-2" />
            <div className="h-4 w-full bg-muted/50 rounded mb-1" />
            <div className="h-4 w-2/3 bg-muted/50 rounded" />
        </motion.div>
    );
}

export function CommitSkeleton() {
    return (
        <div className="flex items-start gap-3 p-3 border border-border animate-pulse">
            <div className="h-5 w-16 bg-muted rounded" />
            <div className="flex-1">
                <div className="h-4 w-full bg-muted/50 rounded mb-2" />
                <div className="h-3 w-24 bg-muted/30 rounded" />
            </div>
        </div>
    );
}
