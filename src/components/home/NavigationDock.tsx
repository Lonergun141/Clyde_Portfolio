'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import DockItem from './DockItem';

// Mini preview components for each panel
function ProjectsPreview() {
    return (
        <div className="p-6 bg-background">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-[1px] bg-accent" />
                <span className="text-[8px] font-mono uppercase tracking-widest text-muted-foreground">Projects</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="aspect-video bg-muted/50 border border-border rounded-lg" />
                ))}
            </div>
        </div>
    );
}

function ProfilePreview() {
    return (
        <div className="p-6 bg-background">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-muted border border-border" />
                <div>
                    <div className="h-2 w-20 bg-foreground/20 rounded mb-1" />
                    <div className="h-1.5 w-16 bg-muted-foreground/20 rounded" />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-6 bg-muted/50 border border-border rounded" />
                ))}
            </div>
        </div>
    );
}

function CertificatesPreview() {
    return (
        <div className="p-6 bg-background">
            <div className="flex items-center gap-2 mb-4">
                <Award size={12} className="text-accent" />
                <span className="text-[8px] font-mono uppercase tracking-widest text-muted-foreground">Credentials</span>
            </div>
            <div className="space-y-2">
                {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-2 p-2 border border-border rounded">
                        <div className="w-6 h-6 bg-muted rounded" />
                        <div className="flex-1">
                            <div className="h-1.5 w-full bg-foreground/20 rounded mb-1" />
                            <div className="h-1 w-2/3 bg-muted-foreground/20 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function GitHubPreview() {
    // Deterministic pattern to avoid hydration mismatch
    const pattern = [1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1];

    return (
        <div className="p-6 bg-background">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-[8px] font-mono uppercase tracking-widest text-muted-foreground">Activity</span>
            </div>
            {/* Mini heatmap */}
            <div className="flex gap-[2px] mb-3">
                {Array.from({ length: 12 }).map((_, weekIdx) => (
                    <div key={weekIdx} className="flex flex-col gap-[2px]">
                        {Array.from({ length: 7 }).map((_, dayIdx) => (
                            <div
                                key={dayIdx}
                                className={`w-1.5 h-1.5 rounded-[1px] ${pattern[weekIdx * 7 + dayIdx] ? 'bg-accent' : 'bg-muted/50'
                                    }`}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div className="space-y-1">
                {[1, 2].map(i => (
                    <div key={i} className="h-2 bg-muted/30 rounded" />
                ))}
            </div>
        </div>
    );
}

const dockItems = [
    {
        label: 'Projects',
        sublabel: 'Explore',
        description: 'Web applications, systems, and creative works.',
        panelId: 'projects' as const,
        preview: <ProjectsPreview />
    },
    {
        label: 'Profile',
        sublabel: 'About',
        description: 'Background, skills, and technical expertise.',
        panelId: 'profile' as const,
        preview: <ProfilePreview />
    },
    {
        label: 'Credentials',
        sublabel: 'Verify',
        description: 'Certifications and achievements.',
        panelId: 'certificates' as const,
        preview: <CertificatesPreview />
    },
    {
        label: 'GitHub',
        sublabel: 'Activity',
        description: 'Contributions and open source work.',
        panelId: 'github' as const,
        preview: <GitHubPreview />
    }
];

export default function NavigationDock() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40"
        >
            {/* Dock Container - Row with medium gaps */}
            <div className="flex items-center gap-4 p-2 bg-background/60 backdrop-blur-xl border border-border rounded-xl shadow-2xl">
                {dockItems.map((item, index) => (
                    <DockItem
                        key={item.panelId}
                        label={item.label}
                        sublabel={item.sublabel}
                        description={item.description}
                        panelId={item.panelId}
                        previewContent={item.preview}
                        index={index}
                    />
                ))}
            </div>
        </motion.div>
    );
}
