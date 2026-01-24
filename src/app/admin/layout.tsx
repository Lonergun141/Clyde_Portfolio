'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Database, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import AdminAuth from '@/components/admin/AdminAuth';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [adminKey, setAdminKey] = useState('');
    const [authError, setAuthError] = useState('');
    const pathname = usePathname();

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        if (adminKey.length < 10) {
            setAuthError('Invalid admin key');
            return;
        }
        setIsAuthenticated(true);
        setAuthError('');
    };

    if (!isAuthenticated) {
        return (
            <AdminAuth
                adminKey={adminKey}
                setAdminKey={setAdminKey}
                handleAuth={handleAuth}
                authError={authError}
            />
        );
    }

    return (
        <div className="h-screen w-full bg-[#121212] text-zinc-100 font-sans selection:bg-[#FF6B35]/30 overflow-hidden flex p-4 lg:p-6 gap-6">
            {/* SHARED SIDEBAR */}
            <div className="w-20 bg-[#1A1A1A] rounded-[2rem] flex flex-col items-center py-8 gap-8 border border-white/5 shrink-0 h-full">
                <div className="w-10 h-10 bg-[#FF6B35] rounded-full flex items-center justify-center font-black text-black">
                    N.
                </div>
                <div className="flex flex-col gap-6 w-full items-center flex-1">
                    <Link href="/admin">
                        <button className={`p-3 rounded-xl transition-colors ${pathname === '/admin' ? 'bg-white/10 text-zinc-100' : 'text-zinc-500 hover:text-white'}`}>
                            <LayoutDashboard size={20} />
                        </button>
                    </Link>
                    <Link href="/admin/projects">
                        <button className={`p-3 rounded-xl transition-colors ${pathname === '/admin/projects' ? 'bg-white/10 text-zinc-100' : 'text-zinc-500 hover:text-white'}`}>
                            <Database size={20} />
                        </button>
                    </Link>
                    <button className="p-3 text-zinc-500 hover:text-white transition-colors">
                        <Settings size={20} />
                    </button>
                </div>
                <button onClick={() => setIsAuthenticated(false)} className="p-3 text-zinc-500 hover:text-red-500 transition-colors" title="Log Out">
                    <LogOut size={20} />
                </button>
            </div>

            {/* PAGE CONTENT */}
            <div className="flex-1 bg-[#1E1E1E] rounded-[2.5rem] overflow-hidden border border-white/5 flex flex-col relative">
                {children}
            </div>
        </div>
    );
}
