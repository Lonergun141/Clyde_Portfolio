import { motion } from 'framer-motion';
import { Terminal, Lock, AlertCircle, CheckCircle } from 'lucide-react';

interface AdminAuthProps {
    adminKey: string;
    setAdminKey: (key: string) => void;
    handleAuth: (e: React.FormEvent) => void;
    authError: string;
}

export default function AdminAuth({ adminKey, setAdminKey, handleAuth, authError }: AdminAuthProps) {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative"
            >
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 bg-[#FF6B35]/5 blur-3xl rounded-full" />

                <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 p-8 shadow-2xl rounded-sm">
                    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                        <div className="p-2 bg-[#FF6B35]/10 rounded-sm">
                            <Terminal size={20} className="text-[#FF6B35]" />
                        </div>
                        <div>
                            <h1 className="text-sm font-mono uppercase tracking-[0.2em] text-foreground font-bold">
                                System Access
                            </h1>
                            <p className="text-[10px] text-muted-foreground font-mono mt-1">
                                Restricted Area
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground mb-2">
                                Admin Authorization Key
                            </label>
                            <input
                                type="password"
                                value={adminKey}
                                onChange={(e) => setAdminKey(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 px-4 py-3 text-sm font-mono text-foreground focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]/50 transition-all rounded-sm placeholder:text-muted-foreground/30"
                                placeholder="Enter secure key..."
                            />
                        </div>

                        {authError && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 text-xs font-mono text-red-400 bg-red-400/10 border border-red-400/20 px-3 py-2 rounded-sm"
                            >
                                <AlertCircle size={14} />
                                {authError}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-[#FF6B35] text-white font-mono text-xs uppercase tracking-[0.15em] py-3.5 hover:bg-[#FF6B35]/90 transition-all hover:shadow-lg hover:shadow-[#FF6B35]/20 rounded-sm flex items-center justify-center gap-2 group"
                        >
                            <Lock size={14} className="group-hover:hidden" />
                            <CheckCircle size={14} className="hidden group-hover:block" />
                            Authenticate
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
