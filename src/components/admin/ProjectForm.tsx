import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

interface ProjectFormProps {
    showForm: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formData: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData: (data: any) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

interface FormInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    placeholder?: string;
    minimal?: boolean;
}

const FormInput = ({ label, value, onChange, required, placeholder, minimal }: FormInputProps) => (
    <div className="w-full">
        {!minimal && (
            <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                {label} {required && <span className="text-[#FF6B35]">*</span>}
            </label>
        )}
        <input
            type="text"
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full bg-black/20 border border-white/10 px-4 py-3 text-sm focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]/50 outline-none transition-all rounded-sm placeholder:text-muted-foreground/30 ${minimal ? 'text-xs py-2' : ''}`}
            placeholder={placeholder}
        />
        {minimal && <span className="text-[9px] uppercase tracking-widest text-muted-foreground mt-1 block pl-1">{label}</span>}
    </div>
);

interface FormSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { label: string; value: string }[];
}

const FormSelect = ({ label, value, onChange, options }: FormSelectProps) => (
    <div className="w-full">
        <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
            {label}
        </label>
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-black/20 border border-white/10 px-4 py-3 text-sm focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]/50 outline-none transition-all rounded-sm appearance-none cursor-pointer"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-zinc-900">{opt.label}</option>
                ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                ↓
            </div>
        </div>
    </div>
);

export default function ProjectForm({ showForm, formData, setFormData, handleSubmit }: ProjectFormProps) {
    return (
        <AnimatePresence>
            {showForm && (
                <motion.div
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: 48 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="overflow-hidden"
                >
                    <div className="bg-white/5 border border-white/10 p-8 rounded-sm relative group">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#FF6B35]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                            <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                                <Plus size={16} className="text-[#FF6B35]" />
                                Initialize New Project
                            </h2>
                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                Database Ready
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <FormInput label="Project Title" value={formData.title || ''}
                                onChange={v => setFormData({ ...formData, title: v })} required placeholder="e.g. Project Aquila" />

                            <FormSelect label="Period Category" value={formData.period || 'current'}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onChange={v => setFormData({ ...formData, period: v as any })}
                                options={[
                                    { label: 'Professional Work', value: 'current' },
                                    { label: 'Personal Project', value: 'personal' },
                                    { label: 'Academic Project', value: 'university' },
                                    { label: 'Media & Creative', value: 'creative' },
                                ]}
                            />

                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                                    Description
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.description || ''}
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    onChange={(e) => setFormData((prev: any) => ({ ...prev, description: e.target.value }))}
                                    className="w-full bg-black/20 border border-white/10 px-4 py-3 text-sm focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]/50 outline-none transition-all rounded-sm resize-none"
                                    placeholder="System operational capabilities..."
                                />
                            </div>

                            <FormInput label="Technologies (comma-separated)" value={formData.technologies || ''}
                                onChange={v => setFormData({ ...formData, technologies: v })} required placeholder="React, Node.js, TensorFlow" />

                            <FormInput label="Categories (comma-separated)" value={formData.categories || ''}
                                onChange={v => setFormData({ ...formData, categories: v })} required placeholder="Web Dev, AI, CyberSec" />

                            <FormInput label="Year / Timeline" value={formData.year || ''}
                                onChange={v => setFormData({ ...formData, year: v })} placeholder="2025 - Present" />

                            <FormInput label="Cover Image URL" value={formData.image || ''}
                                onChange={v => setFormData({ ...formData, image: v })} placeholder="Leave empty for auto-placeholder" />

                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
                                <FormInput label="GitHub" value={formData.github || ''} onChange={v => setFormData({ ...formData, github: v })} placeholder="https://github.com/..." minimal />
                                <FormInput label="Figma" value={formData.figma || ''} onChange={v => setFormData({ ...formData, figma: v })} placeholder="https://figma.com/..." minimal />
                                <FormInput label="Live Demo" value={formData.live || ''} onChange={v => setFormData({ ...formData, live: v })} placeholder="https://..." minimal />
                                <FormInput label="Other" value={formData.other || ''} onChange={v => setFormData({ ...formData, other: v })} placeholder="https://..." minimal />
                            </div>

                            <div className="md:col-span-2 pt-6">
                                <button
                                    type="submit"
                                    className="w-full bg-[#FF6B35] text-white font-bold text-xs uppercase tracking-[0.2em] py-4 rounded-sm hover:bg-[#FF6B35]/90 hover:shadow-lg hover:shadow-[#FF6B35]/20 transition-all"
                                >
                                    Confirm Deployment
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
