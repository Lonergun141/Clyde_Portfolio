import { motion } from 'framer-motion';
import { Database, Code, Rocket, Briefcase } from 'lucide-react';
import { Project } from '@/lib/types/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StatItem = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: number, color: string }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5"
    >
        <div className={`p-3 rounded-lg ${color} bg-opacity-20`}>
            <Icon size={20} className={color.replace('bg-', 'text-')} />
        </div>
        <div>
            <div className="text-2xl font-bold font-mono">{value}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
        </div>
    </motion.div>
);

export default function AdminStats({ projects }: { projects: Project[] }) {
    const stats = {
        total: projects.length,
        professional: projects.filter(p => p.period === 'current').length,
        personal: projects.filter(p => p.period === 'personal').length,
        academic: projects.filter(p => p.period === 'university').length,
        creative: projects.filter(p => p.period === 'creative').length
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatItem label="Total Projects" value={stats.total} icon={Database} color="bg-blue-500" />
            <StatItem label="Professional" value={stats.professional} icon={Code} color="bg-purple-500" />
            <StatItem label="Personal" value={stats.personal} icon={Rocket} color="bg-emerald-500" />
            <StatItem label="Academic" value={stats.academic} icon={Briefcase} color="bg-orange-500" />
        </div>
    );
}
