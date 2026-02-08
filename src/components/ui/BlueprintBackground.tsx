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
    gridSize = 120,
    ...props
}: BlueprintBackgroundProps) => {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    return (
        <div
            className={cn(
                "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white dark:bg-black transition-colors duration-500",
                className
            )}
            onMouseMove={handleMouseMove}
            {...props}
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-white via-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-black" />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 z-0 opacity-[0.25] dark:opacity-[0.15] pointer-events-none transition-opacity duration-300"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #808080 1px, transparent 1px),
                        linear-gradient(to bottom, #808080 1px, transparent 1px)
                    `,
                    backgroundSize: `${gridSize}px ${gridSize}px`,
                    maskImage: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
                    WebkitMaskImage: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`
                }}
            />

            {/* Content */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
};
