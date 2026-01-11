import { certificates } from '@/lib/constants/constants';

// Certificate type definition
export interface Certificate {
    title: string;
    issuer: string;
    platform: string;
    date: string;
    logo: string;
    link: string;
}

// Get unique issuers count
export const getUniqueIssuersCount = (certs: Certificate[]): number => {
    return new Set(certs.map(c => c.issuer)).size;
};

// Get the latest year from certificates
export const getLatestYear = (certs: Certificate[]): string => {
    const years = certs.map(c => parseInt(c.date)).filter(y => !isNaN(y));
    return years.length > 0 ? Math.max(...years).toString() : new Date().getFullYear().toString();
};

// Format count with padding
export const formatCount = (count: number, padding: number = 2): string => {
    return String(count).padStart(padding, '0');
};

// Get certificate stats
export const getCertificateStats = (certs: Certificate[] = certificates) => {
    return {
        total: certs.length,
        uniqueIssuers: getUniqueIssuersCount(certs),
        latestYear: getLatestYear(certs),
    };
};
