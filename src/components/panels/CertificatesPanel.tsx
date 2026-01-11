'use client';

import WorkspacePanel from '@/components/spatial/WorkspacePanel';
import { certificates } from '@/lib/constants/constants';
import { getCertificateStats } from '@/lib/utils/certificates';
import {
    CertificatesSummary,
    CertificatesMobileHeader,
    CertificatesTabletHeader,
    CertificatesGrid
} from '@/components/certificates';

export default function CertificatesPanel() {
    const stats = getCertificateStats(certificates);

    return (
        <WorkspacePanel panelId="certificates" title="Credentials Registry">
            <div className="h-full overflow-y-auto">

                {/* ========== MOBILE LAYOUT (< md) ========== */}
                <div className="block md:hidden">
                    <CertificatesMobileHeader totalCount={stats.total} />
                    <CertificatesGrid
                        certificates={certificates}
                        variant="mobile"
                        showHeader={false}
                    />
                </div>

                {/* ========== TABLET LAYOUT (md to lg) ========== */}
                <div className="hidden md:block lg:hidden">
                    <CertificatesTabletHeader
                        totalCount={stats.total}
                        latestYear={stats.latestYear}
                        uniqueIssuers={stats.uniqueIssuers}
                    />
                    <CertificatesGrid
                        certificates={certificates}
                        variant="tablet"
                    />
                </div>

                {/* ========== DESKTOP LAYOUT (lg+) ========== */}
                <div className="hidden lg:grid lg:grid-cols-12 h-full">
                    <CertificatesSummary
                        totalCount={stats.total}
                        latestYear={stats.latestYear}
                        uniqueIssuers={stats.uniqueIssuers}
                    />
                    <div className="lg:col-span-8 overflow-y-auto">
                        <CertificatesGrid
                            certificates={certificates}
                            variant="desktop"
                        />
                    </div>
                </div>

            </div>
        </WorkspacePanel>
    );
}
