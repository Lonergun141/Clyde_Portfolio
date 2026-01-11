'use client';

import { useState } from 'react';
import CertificateCard from './CertificateCard';
import CertificateModal from './CertificateModal';
import { formatCount, type Certificate } from '@/lib/utils/certificates';

type GridVariant = 'mobile' | 'tablet' | 'desktop';

interface CertificatesGridProps {
    certificates: Certificate[];
    variant?: GridVariant;
    showHeader?: boolean;
}

const gridStyles = {
    mobile: 'p-3 space-y-2',
    tablet: 'grid grid-cols-2 gap-3',
    desktop: 'grid grid-cols-2 gap-3',
};

export default function CertificatesGrid({
    certificates,
    variant = 'desktop',
    showHeader = true
}: CertificatesGridProps) {
    const isMobile = variant === 'mobile';
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

    return (
        <>
            <div className={isMobile ? '' : 'p-6 lg:p-12'}>
                {/* Section Header */}
                {showHeader && !isMobile && (
                    <div className="flex items-center gap-3 mb-4 lg:mb-6 border-b border-border pb-3">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                            01
                        </span>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
                            All Credentials
                        </h2>
                        <span className="text-[10px] font-mono text-muted-foreground ml-auto">
                            [{formatCount(certificates.length)}]
                        </span>
                    </div>
                )}

                {/* Grid/List */}
                <div className={isMobile ? gridStyles.mobile : gridStyles[variant]}>
                    {certificates.map((cert, index) => (
                        <CertificateCard
                            key={cert.title}
                            certificate={cert}
                            index={index}
                            variant={variant}
                            onClick={() => setSelectedCertificate(cert)}
                        />
                    ))}
                </div>
            </div>

            {/* Modal */}
            <CertificateModal
                certificate={selectedCertificate}
                onClose={() => setSelectedCertificate(null)}
            />
        </>
    );
}
