'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, Award } from 'lucide-react';
import type { Certificate } from '@/lib/utils/certificates';
import { useEffect } from 'react';


interface CertificateModalProps {
    certificate: Certificate | null;
    onClose: () => void;
}

function getEmbedUrl(url: string): string {
    try {
        if (url.includes('drive.google.com/file/d/')) {
            return url.replace('/view', '/preview');
        }
        if (url.includes('docs.google.com/document/d/')) {
            return url.replace('/edit', '/preview');
        }
    } catch (e) {
        console.error('Error generating embed URL:', e);
    }
    return url;
}

export default function CertificateModal({ certificate, onClose }: CertificateModalProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const embedUrl = certificate ? getEmbedUrl(certificate.link) : '';

    return (
        <AnimatePresence>
            {certificate && (
                <>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
                    />

                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-5xl h-[85vh] bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col md:flex-row"
                        >

                            <div className="relative bg-black/20 flex flex-col h-[250px] md:h-auto md:flex-1 shrink-0">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="animate-pulse text-muted-foreground/20">Loading Preview...</div>
                                </div>
                                <iframe
                                    src={embedUrl}
                                    className="relative w-full h-full border-none z-10"
                                    allow="autoplay"
                                    title={`${certificate.title} Preview`}
                                />
                            </div>


                            <div className="w-full md:w-80 lg:w-96 flex flex-col border-t md:border-t-0 md:border-l border-white/10 bg-card/95 flex-1 md:flex-none min-h-0">

                                <div className="flex items-center justify-between p-4 border-b border-white/5 shrink-0">
                                    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                                        Credential Details
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                    <div className="flex justify-center py-4">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={certificate.logo}
                                            alt={certificate.issuer}
                                            className="h-20 object-contain drop-shadow-md dark:invert opacity-80"
                                        />
                                    </div>

                                    <div className="space-y-2 text-center">
                                        <h2 className="text-lg font-bold leading-tight text-foreground">
                                            {certificate.title}
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            Issued by <span className="text-foreground font-medium">{certificate.issuer}</span>
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="bg-white/5 rounded-lg p-3 flex items-center gap-3 border border-white/5">
                                            <Calendar className="w-4 h-4 text-accent" />
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Date Issued</span>
                                                <span className="font-mono text-xs font-medium">{certificate.date}</span>
                                            </div>
                                        </div>
                                        <div className="bg-white/5 rounded-lg p-3 flex items-center gap-3 border border-white/5">
                                            <Award className="w-4 h-4 text-accent" />
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Platform</span>
                                                <span className="font-mono text-xs font-medium truncate" title={certificate.platform}>
                                                    {certificate.platform}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="p-4 border-t border-white/5 space-y-3 bg-background/20 shrink-0">
                                    <a
                                        href={certificate.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent text-accent-foreground font-medium hover:brightness-110 active:scale-[0.98] transition-all duration-200 text-sm"
                                    >
                                        <span>Open Original</span>
                                        <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
