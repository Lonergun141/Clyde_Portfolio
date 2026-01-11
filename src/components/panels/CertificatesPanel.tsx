'use client';

import WorkspacePanel from '@/components/spatial/WorkspacePanel';
import { motion } from 'framer-motion';
import { ExternalLink, Award, Calendar, Building2 } from 'lucide-react';
import { certificates } from '@/lib/constants/constants';

export default function CertificatesPanel() {
    return (
        <WorkspacePanel panelId="certificates" title="Credentials Registry">
            <div className="h-full">

                {/* Asymmetric Split Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 h-full">

                    {/* Left Column: Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-4 p-4 sm:p-6 md:p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-border flex flex-col"
                    >
                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-6 h-[1px] bg-accent" />
                                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
                                    Registry
                                </span>
                            </div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2">
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
                                    <span className="text-xs sm:text-sm font-mono text-muted-foreground">Total Credentials</span>
                                </div>
                                <span className="text-xl font-bold text-foreground">{certificates.length}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-border">
                                <div className="flex items-center gap-3">
                                    <Calendar size={14} className="text-muted-foreground" />
                                    <span className="text-sm font-mono text-muted-foreground">Latest Year</span>
                                </div>
                                <span className="text-xl font-bold text-foreground">2025</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-border">
                                <div className="flex items-center gap-3">
                                    <Building2 size={14} className="text-muted-foreground" />
                                    <span className="text-sm font-mono text-muted-foreground">Issuers</span>
                                </div>
                                <span className="text-xl font-bold text-foreground">
                                    {new Set(certificates.map(c => c.issuer)).size}
                                </span>
                            </div>
                        </div>

                        {/* Note */}
                        <div className="pt-8 border-t border-border mt-8">
                            <p className="text-xs text-muted-foreground leading-relaxed font-mono">
                                Click any credential to view verification document.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Column: Credentials List */}
                    <div className="lg:col-span-8 p-4 sm:p-6 md:p-8 lg:p-12 overflow-y-auto">

                        {/* Header */}
                        <div className="flex items-center gap-3 mb-6 border-b border-border pb-3">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                                01
                            </span>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
                                All Credentials
                            </h2>
                            <span className="text-[10px] font-mono text-muted-foreground ml-auto">
                                [{String(certificates.length).padStart(2, '0')}]
                            </span>
                        </div>

                        {/* Credentials Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {certificates.map((cert, index) => (
                                <motion.a
                                    key={cert.title}
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                                    className="group flex items-start gap-4 p-4 border border-border hover:border-accent bg-background/50 hover:bg-accent hover:text-accent-foreground transition-all duration-300 h-24"
                                    title={cert.title}
                                >
                                    {/* Logo */}
                                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center p-1.5 group-hover:border-accent-foreground/30 transition-colors">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={cert.logo}
                                            alt={cert.issuer}
                                            className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                                        <div>
                                            <h3 className="text-sm font-bold text-foreground group-hover:text-accent-foreground leading-tight line-clamp-1 transition-colors">
                                                {cert.title}
                                            </h3>
                                            <p className="text-[10px] text-muted-foreground group-hover:text-accent-foreground/70 font-mono truncate transition-colors mt-0.5">
                                                {cert.issuer}
                                            </p>
                                        </div>
                                        <span className="text-[10px] font-mono text-muted-foreground/60 group-hover:text-accent-foreground/60 uppercase tracking-widest transition-colors">
                                            {cert.date}
                                        </span>
                                    </div>

                                    {/* External Link Icon */}
                                    <ExternalLink
                                        size={12}
                                        className="flex-shrink-0 text-muted-foreground/50 group-hover:text-accent-foreground/70 transition-colors mt-1"
                                    />
                                </motion.a>
                            ))}
                        </div>

                    </div>

                </div>

            </div>
        </WorkspacePanel>
    );
}
