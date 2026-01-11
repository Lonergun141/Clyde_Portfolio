"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface BlueprintBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    gridSize?: number;
}

export const BlueprintBackground = ({
    className,
    children,
    gridSize = 40,
    ...props
}: BlueprintBackgroundProps) => {
    return (
        <div
            className={cn(
                "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white dark:bg-black transition-colors duration-500",
                className
            )}
            {...props}
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-white via-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-black" />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 z-0 opacity-[0.15] dark:opacity-[0.07] pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #808080 1px, transparent 1px),
                        linear-gradient(to bottom, #808080 1px, transparent 1px)
                    `,
                    backgroundSize: `${gridSize}px ${gridSize}px`,
                    maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)'
                }}
            />

            {/* Content */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
};
