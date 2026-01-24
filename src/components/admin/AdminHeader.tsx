import { Search, Terminal, Plus, ArrowLeft, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

interface AdminHeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    showForm: boolean;
    setShowForm: (show: boolean) => void;
}

export default function AdminHeader({ searchTerm, setSearchTerm, showForm, setShowForm }: AdminHeaderProps) {
    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-0">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#FF6B35]/10 rounded-sm border border-[#FF6B35]/20 shadow-[0_0_15px_-3px_rgba(255,107,53,0.3)]">
                        <LayoutDashboard size={20} className="text-[#FF6B35]" />
                    </div>
                    <h1 className="text-xl font-bold uppercase tracking-wider text-zinc-100">
                        Admin <span className="text-zinc-500 font-light">Console</span>
                    </h1>
                </div>
                <p className="text-zinc-500 text-[10px] tracking-[0.2em] pl-11">
                    SYSTEM V2.0 <span className="text-[#FF6B35] mx-2">•</span> ENCRYPTED
                </p>
            </div>

            <div className="flex items-center gap-3">
                <div className="relative hidden md:block group">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#FF6B35] transition-colors" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="SEARCH ARCHIVES..."
                        className="bg-black/20 border border-white/10 rounded-sm pl-9 pr-4 py-2 text-[10px] font-mono focus:border-[#FF6B35]/50 focus:bg-[#FF6B35]/5 focus:outline-none w-64 transition-all uppercase placeholder:text-zinc-700"
                    />
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className={`
                        flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm border
                        ${showForm
                            ? 'bg-red-500/10 border-red-500/50 text-red-500 hover:bg-red-500/20'
                            : 'bg-[#FF6B35] border-[#FF6B35] text-white hover:bg-[#FF6B35]/90 hover:shadow-[0_0_20px_-5px_#FF6B35]'
                        }
                    `}
                >
                    {showForm ? <Terminal size={14} /> : <Plus size={14} />}
                    {showForm ? 'Abort' : 'Initialize'}
                </button>

                <Link
                    href="/"
                    className="p-2 bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 rounded-sm transition-all hover:border-white/20"
                    title="Return to Root"
                >
                    <ArrowLeft size={16} />
                </Link>
            </div>
        </header>
    );
}
