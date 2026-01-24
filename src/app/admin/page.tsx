'use client';

import { useEffect, useState } from 'react';
import { Database, Code, Rocket, Briefcase, ArrowRight, Activity } from 'lucide-react';
import Link from 'next/link';
import { Project } from '@/lib/types/types';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        total: 0,
        professional: 0,
        personal: 0,
        academic: 0
    });

    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const projects = data.projects;
                    setStats({
                        total: projects.length,
                        professional: projects.filter((p: Project) => p.period === 'current').length,
                        personal: projects.filter((p: Project) => p.period === 'personal').length,
                        academic: projects.filter((p: Project) => p.period === 'university').length,
                    });
                }
            });
    }, []);

    return (
        <div className="flex-1 overflow-y-auto p-8 pt-12 custom-scrollbar">
            <header className="mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-2">Global Overview</h1>
                <p className="text-zinc-500">Live system metrics and activity.</p>
            </header>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatsCard
                    label="Total Projects"
                    value={stats.total}
                    icon={Database}
                    trend="+12%"
                    color="bg-zinc-800"
                    iconColor="text-zinc-400"
                />
                <StatsCard
                    label="Professional"
                    value={stats.professional}
                    icon={Code}
                    trend="Active"
                    color="bg-purple-500/10"
                    iconColor="text-purple-400"
                />
                <StatsCard
                    label="Personal"
                    value={stats.personal}
                    icon={Rocket}
                    trend="Shipped"
                    color="bg-emerald-500/10"
                    iconColor="text-emerald-400"
                />
                <StatsCard
                    label="Academic"
                    value={stats.academic}
                    icon={Briefcase}
                    trend="Archived"
                    color="bg-blue-500/10"
                    iconColor="text-blue-400"
                />
            </div>

            {/* Quick Actions / Bento Highlights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-96">

                {/* Large Action Card */}
                <div className="lg:col-span-2 bg-[#181818] rounded-[2rem] p-8 border border-white/5 relative overflow-hidden group flex flex-col justify-between">
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center mb-6 text-black">
                            <Activity size={24} />
                        </div>
                        <h2 className="text-3xl font-bold mb-4 max-w-md">Manage your Project Database</h2>
                        <p className="text-zinc-500 mb-8 max-w-sm">
                            Add, edit, or remove project entries. Updates are reflected instantly on the live site.
                        </p>
                        <Link href="/admin/projects">
                            <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2">
                                Go to Projects <ArrowRight size={18} />
                            </button>
                        </Link>
                    </div>
                    <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
                </div>

                {/* System Status / Mini List */}
                <div className="bg-[#181818] rounded-[2rem] p-8 border border-white/5 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-zinc-300">System Status</h3>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    </div>

                    <div className="flex-1 space-y-4">
                        <StatusItem label="Database" status="Operational" />
                        <StatusItem label="API Gateway" status="Operational" />
                        <StatusItem label="Storage" status="Operational" />
                        <StatusItem label="CDN" status="Operational" />
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/5">
                        <div className="flex items-center justify-between text-xs text-zinc-500">
                            <span>Last check:</span>
                            <span>Just now</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StatsCard({ label, value, icon: Icon, trend, color, iconColor }: { label: string, value: number, icon: any, trend: string, color: string, iconColor: string }) {
    return (
        <div className="bg-[#181818] p-6 rounded-[2rem] border border-white/5 flex flex-col justify-between h-48 hover:bg-[#202020] transition-colors group">
            <div className="flex justify-between items-start">
                <div className={`p-3 ${color} ${iconColor} rounded-2xl group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                </div>
                <span className={`text-xs font-bold px-3 py-1 bg-white/5 rounded-full ${trend.includes('+') ? 'text-emerald-400' : 'text-zinc-500'}`}>
                    {trend}
                </span>
            </div>
            <div>
                <span className="text-4xl font-light block mb-1 tracking-tighter">{value}</span>
                <span className="text-sm text-zinc-500 font-bold">{label}</span>
            </div>
        </div>
    )
}

function StatusItem({ label, status }: { label: string, status: string }) {
    return (
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
            <span className="text-sm font-medium text-zinc-400">{label}</span>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">{status}</span>
        </div>
    )
}
