'use client';

import { motion } from 'framer-motion';
import { languageIcons } from '@/lib/utils/github';

interface Language {
    name: string;
    color: string;
    percentage: number;
}

interface LanguagesListProps {
    languages: Language[];
}

export default function LanguagesList({ languages }: LanguagesListProps) {
    return (
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
                        {/* Language Icon or Color Fallback */}
                        {languageIcons[lang.name] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={languageIcons[lang.name]}
                                alt={lang.name}
                                className="w-4 h-4 flex-shrink-0 dark:invert"
                            />
                        ) : (
                            <div
                                className="w-4 h-4 flex-shrink-0 rounded-sm"
                                style={{ backgroundColor: lang.color }}
                            />
                        )}
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
    );
}
