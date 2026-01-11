'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { Certificate } from '@/lib/utils/certificates';

type CardVariant = 'mobile' | 'tablet' | 'desktop';

interface CertificateCardProps {
    certificate: Certificate;
    index: number;
    variant?: CardVariant;
}

const variantStyles = {
    mobile: {
        container: 'group flex items-center gap-3 p-3 border border-border hover:border-accent bg-background/50 hover:bg-accent hover:text-accent-foreground transition-all duration-300 active:scale-[0.98]',
        logo: 'w-8 h-8',
        title: 'text-xs font-bold text-foreground group-hover:text-accent-foreground leading-tight line-clamp-1 transition-colors',
        subtitle: 'text-[9px] text-muted-foreground group-hover:text-accent-foreground/70 font-mono truncate transition-colors',
        iconSize: 10,
        animation: { initial: { opacity: 0, x: -10 }, delay: 0.03 },
    },
    tablet: {
        container: 'group flex items-start gap-3 p-4 border border-border hover:border-accent bg-background/50 hover:bg-accent hover:text-accent-foreground transition-all duration-300',
        logo: 'w-9 h-9',
        title: 'text-xs font-bold text-foreground group-hover:text-accent-foreground leading-tight line-clamp-2 transition-colors',
        subtitle: 'text-[9px] text-muted-foreground group-hover:text-accent-foreground/70 font-mono truncate transition-colors mt-1',
        iconSize: 11,
        animation: { initial: { opacity: 0, y: 10 }, delay: 0.04 },
    },
    desktop: {
        container: 'group flex items-start gap-4 p-4 border border-border hover:border-accent bg-background/50 hover:bg-accent hover:text-accent-foreground transition-all duration-300 h-24',
        logo: 'w-10 h-10',
        title: 'text-sm font-bold text-foreground group-hover:text-accent-foreground leading-tight line-clamp-1 transition-colors',
        subtitle: 'text-[10px] text-muted-foreground group-hover:text-accent-foreground/70 font-mono truncate transition-colors mt-0.5',
        iconSize: 12,
        animation: { initial: { opacity: 0, y: 10 }, delay: 0.05 },
    },
};

export default function CertificateCard({ certificate, index, variant = 'desktop' }: CertificateCardProps) {
    const styles = variantStyles[variant];
    const { initial, delay } = styles.animation;

    return (
        <motion.a
            key={certificate.title}
            href={certificate.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={initial}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.3, delay: index * delay }}
            className={styles.container}
            title={certificate.title}
        >
            {/* Logo */}
            <div className={`${styles.logo} flex-shrink-0 flex items-center justify-center`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={certificate.logo}
                    alt={certificate.issuer}
                    className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity dark:invert"
                />
            </div>

            {/* Content */}
            <div className={`flex-1 min-w-0 ${variant === 'desktop' ? 'flex flex-col justify-between h-full' : ''}`}>
                <div>
                    <h3 className={styles.title}>
                        {certificate.title}
                    </h3>
                    <p className={styles.subtitle}>
                        {variant === 'mobile' ? `${certificate.issuer} · ${certificate.date}` : certificate.issuer}
                    </p>
                </div>
                {variant !== 'mobile' && (
                    <span className="text-[9px] font-mono text-muted-foreground/60 group-hover:text-accent-foreground/60 uppercase tracking-widest transition-colors">
                        {certificate.date}
                    </span>
                )}
            </div>

            {/* External Link Icon */}
            <ExternalLink
                size={styles.iconSize}
                className={`flex-shrink-0 text-muted-foreground/50 group-hover:text-accent-foreground/70 transition-colors ${variant === 'desktop' ? 'mt-1' : variant === 'tablet' ? 'mt-0.5' : ''}`}
            />
        </motion.a>
    );
}
